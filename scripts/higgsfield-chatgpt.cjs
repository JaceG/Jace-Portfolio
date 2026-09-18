#!/usr/bin/env node
// Pass a Keychain credential directly to a child process; never print it.
const { execFileSync, spawnSync } = require('node:child_process');
const { userInfo } = require('node:os');

const args = process.argv.slice(2);
const service = 'ai.higgsfield.api.chatgpt';
const account = userInfo().username;

if (args.length === 1 && args[0] === '--setup') {
	console.error('Enter the Higgsfield credential created for ChatGPT as key-id:key-secret at the hidden password prompt.');
	// The final -w makes security prompt privately instead of taking a secret
	// in command-line arguments or shell history. The user types it locally.
	const saved = spawnSync('/usr/bin/security', [
		'add-generic-password', '-U', '-a', account, '-s', service,
		'-l', 'Higgsfield API — ChatGPT', '-w',
	], { stdio: 'inherit' });
	process.exit(saved.status ?? 1);
}

if (!args.length) {
	console.error('Usage: higgsfield-chatgpt COMMAND [ARGS...] | --check | --setup');
	process.exit(1);
}

let credentials;
try {
	credentials = execFileSync('/usr/bin/security', [
		'find-generic-password', '-a', account, '-s', service, '-w',
	], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
} catch {
	console.error('The ChatGPT Higgsfield credential is unavailable in Keychain. Run ~/.local/bin/higgsfield-chatgpt --setup locally.');
	process.exit(1);
}

if (!/^[^\s:]+:[^\s:]+$/.test(credentials)) {
	console.error('The Keychain entry must contain key-id:key-secret. Run --setup locally to correct it.');
	process.exit(1);
}

if (args.length === 1 && args[0] === '--check') {
	console.error('The ChatGPT Higgsfield credential is available in Keychain. No API request was made.');
	process.exit(0);
}

const result = spawnSync(args[0], args.slice(1), {
	stdio: 'inherit',
	env: { ...process.env, HF_CREDENTIALS: credentials, HF_KEY: credentials },
});
if (result.error) console.error('Could not start the requested command.');
process.exit(result.status ?? 1);
