/** Server-side example. Run: npm run higgsfield:video */
import { setTimeout as delay } from 'node:timers/promises';
import {
	config, higgsfield, AuthenticationError, CredentialsMissedError,
	NotEnoughCreditsError, TimeoutError, ValidationError, BadInputError, APIError,
} from '@higgsfield/client/v2';

const MODEL = 'bytedance/seedance-2.5/text-to-video';
const INPUT = {
	prompt: 'A cinematic scene at sunset',
	duration: 5,
	resolution: '720p',
	aspect_ratio: '16:9',
};
const REQUEST_ID = /^[a-zA-Z0-9_-]{1,128}$/;
const MAX_WAIT_MS = 15 * 60 * 1000;

type Generation = {
	status: string;
	request_id?: string;
	video?: { url?: string };
};

class ExampleError extends Error {}

function fail(message: string): never {
	throw new ExampleError(message);
}

async function waitForVideo(initial: Generation, requestId: string, credentials: string): Promise<string> {
	const deadline = Date.now() + MAX_WAIT_MS;
	let result = initial;
	let previousStatus = '';
	while (true) {
		switch (result.status) {
			case 'completed': {
				let url: URL;
				try { url = new URL(result.video?.url ?? ''); }
				catch { return fail('Request completed without a valid video URL.'); }
				if (url.protocol !== 'https:' || url.username || url.password) {
					fail('Request completed without a valid HTTPS video URL.');
				}
				return url.href;
			}
			case 'nsfw':
			case 'moderated':
				return fail('The request was moderated. No successful video result was returned.');
			case 'failed':
				return fail('Video generation failed.');
			case 'canceled':
			case 'cancelled':
				return fail('Video generation was canceled.');
			case 'queued':
			case 'in_progress':
				if (result.status !== previousStatus) console.log(`Status: ${result.status}`);
				previousStatus = result.status;
				break;
			default:
				return fail('The API returned an unrecognized status; success could not be verified.');
		}
		if (Date.now() >= deadline) {
			fail('Stopped waiting after 15 minutes. Use --resume with the request ID above to check it without submitting another generation.');
		}
		await delay(3000);
		let response: Response;
		try {
			// Keep credentials on the fixed API origin; do not follow returned URLs.
			response = await fetch(`https://api.higgsfield.ai/requests/${requestId}/status`, {
				headers: { Authorization: `Key ${credentials}` },
				redirect: 'error',
				signal: AbortSignal.timeout(30_000),
			});
		} catch {
			// Status GETs are safe to retry. Never repeat the billable POST.
			continue;
		}
		if (response.status === 429 || response.status >= 500) continue;
		if (response.status === 401 || response.status === 403) {
			fail('The status request was denied. Check the ChatGPT API credential and account access.');
		}
		if (!response.ok) fail('Could not retrieve the request status. Use --resume with the request ID above after checking the Higgsfield console.');
		try { result = await response.json(); }
		catch { fail('The status response was invalid. Success could not be verified.'); }
		if (!result || typeof result.status !== 'string') fail('The status response was missing its status.');
	}
}

async function main(): Promise<void> {
	const args = process.argv.slice(2);
	const resumeId = args[0] === '--resume' ? args[1] : undefined;
	const checkOnly = args.length === 1 && args[0] === '--check';
	if (args.length && !checkOnly && !(args.length === 2 && resumeId && REQUEST_ID.test(resumeId))) {
		fail('Usage: npm run higgsfield:video [-- --check | -- --resume REQUEST_ID]');
	}
	const credentials = process.env.HF_CREDENTIALS?.trim();
	if (!credentials || !/^[^\s:]+:[^\s:]+$/.test(credentials)) {
		fail('A key-id:key-secret credential is required. Run ~/.local/bin/higgsfield-chatgpt --setup locally, then npm run higgsfield:video.');
	}
	if (checkOnly) {
		console.log('Credential is available and formatted correctly. No API request was made.');
		return;
	}

	let initial: Generation;
	if (resumeId) {
		initial = { status: 'queued', request_id: resumeId };
	} else {
		// Avoid retrying a billable POST after an ambiguous failure.
		config({ credentials, maxRetries: 0 });
		console.log(`Submitting ${MODEL}`);
		console.log(`Prompt: ${INPUT.prompt}; ${INPUT.duration}s; ${INPUT.resolution}; ${INPUT.aspect_ratio}`);
		console.log('This submits one billable generation request.');
		// SDK 0.2.6 polling omits canceled as a terminal state. Subscribe without
		// built-in polling and wait here to handle every terminal state.
		initial = await higgsfield.subscribe(MODEL, { input: INPUT, withPolling: false });
	}
	const requestId = initial?.request_id;
	if (!requestId || !REQUEST_ID.test(requestId)) {
		fail('The API returned no valid request ID. Check the console before submitting again.');
	}
	console.log(`Request ID: ${requestId}`);
	const videoUrl = await waitForVideo(initial, requestId, credentials);
	console.log('Video generated successfully:');
	console.log(videoUrl);
}

main().catch((error: unknown) => {
	let message = 'The request could not be verified. Check the Higgsfield console before submitting again; a generation may already exist.';
	if (error instanceof ExampleError) message = error.message;
	else if (error instanceof CredentialsMissedError) message = 'The SDK could not find credentials.';
	else if (error instanceof AuthenticationError) message = 'Authentication failed. Check the ChatGPT Higgsfield credential stored in Keychain.';
	else if (error instanceof NotEnoughCreditsError) message = 'Higgsfield denied the request. Check account credits and model access.';
	else if (error instanceof TimeoutError) message = 'The SDK timed out. Check the console before submitting another billable request.';
	else if (error instanceof ValidationError || error instanceof BadInputError) message = 'Higgsfield rejected the request parameters. Check the current model reference.';
	else if (error instanceof APIError) message = 'Higgsfield returned an API error. Check the console before submitting again.';
	// Never log upstream errors: they may contain headers or credentials.
	console.error(message);
	process.exitCode = 1;
});
