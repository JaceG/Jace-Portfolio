// Everything specific to the SourceCo page. Imported only by that route and
// the modules it loads, so none of this ships with the main portfolio.

export const SC_BASE = '/sourceco';
export const SC_CONCEPTS_URL = 'https://sourceco.hirejace.com';

export const SC_RESUME_URL =
	'https://drive.google.com/uc?export=download&id=1pUBTr0FUAc75I2qB5JK-p-zUKNHvvooi';

export const SC_PHONE = '+16193002902';
export const SC_CALL_URL = `tel:${SC_PHONE}`;
export const SC_TEXT_URL = `sms:${SC_PHONE}`;

export const SC_ROLES = [
	'Outbound Automation',
	'Data Pipelines',
	'n8n + Claude Code',
	'Full-Stack Developer',
];

export const SC_BLURB =
	'I build the systems outbound runs on: pipelines, enrichment, automation, and the apps around them.';

export const SC_STACK = [
	'n8n',
	'Claude Code',
	'Node.js',
	'TypeScript',
	'PostgreSQL',
	'Webhooks',
	'REST APIs',
	'Keap',
	'Twilio',
	'Postmark',
	'Google Places API',
	'React',
	'Next.js',
	'React Native',
];

// Order matters: the top three are the most relevant to the role; 4-6 are
// Jace's picks; the rest of the portfolio follows these on the page.
// `title` is for the terminal listing; the page uses the case-study data.
// `snippet` overrides the card text; `image` overrides the card/case-study art.
export const SC_PROJECTS = [
	{
		slug: 'company-hunter',
		title: 'Company Hunter',
		snippet:
			'Sources businesses from the Google Places API, with caching to cut API costs. I used it to cold-email my way into interviews.',
	},
	{
		slug: 'remi',
		title: 'REMI',
		image: '/sourceco/remi.jpg',
	},
	{
		slug: 'marketing-email-api',
		title: 'Marketing Email API',
		snippet:
			'Scrapes data and sends it out: email automation with Shopify and WordPress integrations.',
	},
	{
		slug: 'pdf-wonder-kit',
		title: 'PDF Wonder Kit',
	},
	{
		slug: 'imagedrop',
		title: 'ImageDrop',
	},
	{
		slug: 'dating-tool-app',
		title: 'Dating Tool App',
	},
	{
		slug: 'github-candidate-search',
		title: 'Github Candidate Search',
		snippet:
			'Sourcing on the GitHub API: search for candidates, then keep or pass, Tinder-style.',
	},
	{
		slug: 'spotify-playlist-ai',
		title: 'Spotify Playlist AI',
		snippet:
			'Two APIs and an LLM wired together: OpenAI picks the songs, the Spotify Web API builds the playlist.',
	},
	{
		slug: 'github-ci-cd',
		title: 'Github CI-CD',
		snippet:
			'A full-stack quiz app deployed through a GitHub Actions CI/CD pipeline with automated testing.',
	},
];

export const SC_DECK = [
	'Every signal ends at one owner record. Eleven n8n workflows, stock install, no fork.',
	'Four tools send signals and nobody knows who replied. Every signal resolves to one owner record.',
	'An owner replies and the other channels keep going. One reply stops everything else.',
	'Bad data burns the sending domains. Nothing reaches a campaign unverified.',
	'Automation fails quietly, sometimes for days. You hear about it in a minute.',
	'Nobody trusts automation that just starts acting. It suggests before it acts: shadow, assisted, automatic.',
	'A deck can claim anything. It runs today: the reply workflow open in n8n.',
	'Promising everything is how it goes wrong. Each phase earns the next: now, next, later.',
];

export const SC_BIO = (
	<div style={{ textAlign: 'justify' }}>
		<p>
			I spent the first part of my career programming CRMs to sell. At
			Fix Your Funnel and ADventures I ran Keap end to end: email and text
			campaigns, internal and external comms, wired up and running without
			a human in the loop.
		</p>
		<br />
		<p>
			When I needed interviews, I built Company Hunter to pull businesses
			from the Google Places API and cold-emailed my portfolio. It got me
			interviews LinkedIn and Indeed never did.
		</p>
		<br />
		<p>
			Today I&apos;m the sole developer and project manager on REMI, a
			field-service platform technicians use every day. For SourceCo I
			built an eleven-workflow n8n library around your stack. The deck is
			below.
		</p>
	</div>
);
