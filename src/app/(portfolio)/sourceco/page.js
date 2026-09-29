import Hero from '@/components/hero';
import Me from '@/components/me';
import Resume from '@/components/resume';
import Books from '@/components/books';
import ScGithub from '@/components/sourceco/github';
import ScProjects from '@/components/sourceco/projects';
import Anatomy from '@/components/sourceco/anatomy';
import Deck from '@/components/sourceco/deck';
import Concepts from '@/components/sourceco/concepts';
import Call from '@/components/sourceco/call';
import TerminalBridge from '@/components/sourceco/terminal-bridge';
import {
	SC_BIO,
	SC_BLURB,
	SC_RESUME_URL,
	SC_ROLES,
	SC_STACK,
} from '@/constants/sourceco';
import { SC_PAGE_ATTRS, SC_ROBOTS } from './nav';

// GitHub stats are read on the server and refreshed at most hourly.
export const revalidate = 3600;

const SHARE_IMAGE = {
	url: '/sourceco/og.png',
	width: 1200,
	height: 630,
	alt: 'Jace Galloway to SourceCo',
};

// Unlisted: not in the nav, the sitemap or search results.
export const metadata = {
	title: { absolute: 'Jace Galloway — GTM Engineer' },
	description:
		'Jace Galloway: outbound automation, data pipelines, n8n and Claude Code.',
	robots: SC_ROBOTS,
	alternates: { canonical: null },
	// Link previews (iMessage, Facebook, Slack, LinkedIn): Jace's J mark
	// pointing to the SourceCo logo on black.
	openGraph: {
		type: 'website',
		url: '/sourceco',
		title: 'Jace Galloway — GTM Engineer',
		description: 'Outbound automation, data pipelines, n8n and Claude Code.',
		images: [SHARE_IMAGE],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Jace Galloway — GTM Engineer',
		description: 'Outbound automation, data pipelines, n8n and Claude Code.',
		images: [SHARE_IMAGE.url],
	},
};

// Each hint stays on one line; narrow screens wrap between them.
const HINTS = (
	<>
		<span className='whitespace-nowrap'>orb · throw it</span> &nbsp;/&nbsp;{' '}
		<span className='whitespace-nowrap'>double-tap · reboot</span> &nbsp;/&nbsp;{' '}
		<span className='whitespace-nowrap'>double-tap below · terminal</span>
	</>
);

export default function SourceCo() {
	return (
		<main {...SC_PAGE_ATTRS}>
			<TerminalBridge />
			<Hero
				still
				roles={SC_ROLES}
				blurb={SC_BLURB}
				stack={SC_STACK}
				resumeUrl={SC_RESUME_URL}
				hints={HINTS}
			/>
			<section id='me' aria-label='About Jace Galloway' className='relative pb-24 md:pb-section'>
				<Me bioContent={SC_BIO} resumeUrl={SC_RESUME_URL} />
			</section>
			<section id='github' className='relative' aria-label='Live GitHub activity'>
				<ScGithub />
			</section>
			<section id='projects' className='relative' aria-label='Projects'>
				<ScProjects />
			</section>
			<section id='resume' className='relative' aria-label='Resume and skills'>
				<Resume resumeUrl={SC_RESUME_URL} skillsVariant='sc' />
			</section>
			<section id='books' className='relative' aria-label='Books'>
				<Books hideTwitter />
			</section>
			<section id='anatomy' className='relative' aria-label="SourceCo's GTM stack as a body">
				<Anatomy />
			</section>
			<section id='pitch' className='relative' aria-label='The n8n library deck'>
				<Deck />
			</section>
			<section id='concepts' className='relative' aria-label='Concepts for SourceCo'>
				<Concepts />
			</section>
			<section id='connect' className='relative' aria-label='Call or text'>
				<Call />
			</section>
		</main>
	);
}
