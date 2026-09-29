// Content for the web-development services site at /services. Separate from
// the portfolio: nothing here is imported by the portfolio routes.

export const SERVICES_BASE = '/services';
export const BOOKING_URL = 'https://calendar.app.google/41yENtbW1Afy4zB4A';
// The same schedule as BOOKING_URL; `gv=true` is Google's inline-embed view.
export const BOOKING_EMBED_URL =
	'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3LWY-qYCVeFABAsUDBWawE-nG-6tr6nmKqVZMraCe7ONnZgLDhTJyUSIFOupiOfaBkMY-4qdD8?gv=true';
export const PORTFOLIO_URL = '/';

export const NAV = [
	['own', 'Yours to keep'],
	['included', "What's included"],
	['process', 'How it works'],
	['faq', 'FAQ'],
];

export const PAINS = [
	'The person who built it moved on, and nobody has the login.',
	'Changing your hours means emailing someone and waiting.',
	'It looks fine on a computer and falls apart on a phone.',
	"You pay a monthly platform fee for a site you can't take with you.",
	"It's slow, and customers leave before it loads.",
];

export const PILLARS = [
	{
		title: 'Own it',
		body: 'The domain, the hosting and the code sit in accounts registered to you. If we stop working together, nothing leaves with me.',
	},
	{
		title: 'Control it',
		body: 'You change text, photos, hours and prices yourself, from a simple editor. No tickets, no waiting on anyone.',
	},
	{
		title: 'Maintain it',
		body: 'You get written documentation and a walkthrough, so you, someone on your staff or any developer can keep it running.',
	},
];

export const INCLUDED = [
	['Mobile-first redesign', 'Built for the phone first, keeping the brand your customers already know.'],
	['Fast pages', 'Pages load quickly on a phone signal, not just on office Wi-Fi.'],
	['Your content, moved over', 'Pages, photos and copy from the old site carried across and cleaned up.'],
	['Search rankings protected', 'Old page addresses redirect to the new ones, so Google keeps sending people.'],
	['Search basics done right', 'Page titles, descriptions and business details search engines can read.'],
	['Accessible', 'Readable contrast, keyboard navigation and image descriptions.'],
	['Forms that reach you', 'Contact and booking requests land in your inbox.'],
	['Secure hosting', 'HTTPS everywhere, on hosting you hold the account for.'],
];

export const STEPS = [
	{
		title: 'Intro call',
		body: "Tell me about the business and what isn't working with the site today.",
	},
	{
		title: 'Audit and plan',
		body: "I review the current site for speed, mobile, search and what's worth keeping. You get a written plan and a quote before any work starts.",
	},
	{
		title: 'Rebuild',
		body: 'The new site is built on a preview link you can check at any point. Nothing changes on your live site until you approve it.',
	},
	{
		title: 'Launch and handoff',
		body: 'It goes live on your domain. You get every login, the documentation and a walkthrough of how to update it.',
	},
];

export const FAQS = [
	{
		q: 'Do I need to be technical?',
		a: "No. If you can edit a document, you can update the site. The walkthrough covers the things you'll actually change.",
	},
	{
		q: 'Will I lose my place on Google?',
		a: 'The rebuild keeps your existing page addresses working with redirects, so the links search engines already know still land somewhere.',
	},
	{
		q: 'What does it cost?',
		a: 'It depends on the size of the site and what it needs to do. After the audit you get a quote in writing, before any work starts.',
	},
	{
		q: 'What if I want help after launch?',
		a: "You can reach out for updates or bigger changes whenever you like. You never have to, though. That's the point.",
	},
	{
		q: 'What do you need from me?',
		a: 'Access to your current site and wherever your domain is registered, your logo and photos, and some time on a call.',
	},
];
