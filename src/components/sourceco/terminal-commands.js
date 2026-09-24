// Terminal commands for the SourceCo page. Loaded with a dynamic import only
// when that page is open, so none of this ships with the main portfolio.
import {
	SC_BASE,
	SC_CALL_URL,
	SC_PROJECTS,
	SC_RESUME_URL,
	SC_STACK,
	SC_TEXT_URL,
} from '@/constants/sourceco';

export const SC_SECTIONS = {
	me: 'About me',
	github: 'Live GitHub activity',
	projects: 'Selected work',
	resume: 'Resume & skills',
	books: 'Books',
	anatomy: "SourceCo's GTM stack as a body",
	pitch: 'The n8n library deck',
	connect: 'Call or text',
};

const ART = [
	'      ██╗ ',
	'      ██║ ',
	'      ██║ ',
	' ██   ██║ ',
	' ╚█████╔╝ ',
	'  ╚════╝  ',
];

export function welcome({ ok, dim }) {
	return [
		ok('hirejace terminal v1.0.0 · sourceco build'),
		dim('type /help for options · esc to close'),
		dim('tip: try sourceco, n8n, or sudo hire jace'),
	];
}

export function buildCommands({ ok, out, dim, err, pre, goto, openUrl, router, uptime }) {
	const call = () => {
		window.location.href = SC_CALL_URL;
	};
	const text = () => {
		window.location.href = SC_TEXT_URL;
	};

	const openProject = (n) => {
		const p = SC_PROJECTS[n - 1];
		if (!p) return [err(`open: no project #${n}`), dim('try: projects')];
		router.push(`${SC_BASE}/case-study/${p.slug}`);
		return [ok(`opening ${p.title}…`)];
	};

	const cmds = {
		sourceco: {
			desc: 'what I would build for SourceCo',
			run: () => [
				ok('GTM Engineer · SourceCo'),
				out('  every signal resolves to one owner record'),
				out('  one reply pauses every other channel'),
				out('  nothing reaches a campaign unverified'),
				out('  a failure reaches a person in a minute'),
				dim('  n8n for the roadmap · cd pitch for the deck · call to talk'),
			],
		},
		n8n: {
			desc: 'the workflow library roadmap',
			run: () => [
				ok('eleven n8n workflows · stock install, no fork'),
				out('  now    resolve owner · classify reply · pause everywhere · log touch'),
				out('         health digest · failure alerts · lead cleanup'),
				out('  next   hot-owner alert · link transcript · propagate opt-out'),
				out('         push to campaign · verify contact · dedupe · enrich · weekly report'),
				out('  later  custom nodes: owner · campaign push · reply classifier'),
				dim('  each phase earns the next. cd pitch for the deck.'),
			],
		},
		about: {
			desc: 'who is this guy',
			run: () => [
				out('Jace Galloway. I build the systems outbound runs on.'),
				out('Keap automation at Fix Your Funnel and ADventures. Company Hunter.'),
				out('Sole developer and PM on REMI.'),
				dim('cd me for the long version.'),
			],
		},
		ls: {
			desc: 'list the sections of this page',
			run: () => [
				...Object.entries(SC_SECTIONS).map(([id, label]) => out(`  ${id.padEnd(10)} ${label}`)),
				dim('  cd <section> to jump there'),
			],
		},
		cd: {
			desc: 'jump to a section, e.g. cd pitch',
			run: ([id]) => {
				if (!id || id === '~' || id === '/') {
					window.scrollTo({ top: 0, behavior: 'smooth' });
					return [ok('~')];
				}
				const key = id.replace(/^#/, '').toLowerCase();
				const alias = { deck: 'pitch', call: 'connect', contact: 'connect', skills: 'resume' };
				const target = SC_SECTIONS[key] ? key : alias[key];
				if (!target) return [err(`cd: no such section: ${id}`), dim('try: ls')];
				goto(target);
				return [ok(`→ ${SC_SECTIONS[target]}`)];
			},
		},
		deck: { desc: 'jump to the deck', run: () => cmds.cd.run(['pitch']) },
		anatomy: { hidden: true, run: () => cmds.cd.run(['anatomy']) },
		projects: {
			desc: 'list my projects (open <n> to view one)',
			run: () => [
				ok(`${SC_PROJECTS.length} projects`),
				...SC_PROJECTS.map((p, i) => out(`  ${String(i + 1).padStart(2)}. ${p.title}`)),
				dim('  open <n> for the case study'),
			],
		},
		open: {
			desc: 'open <n> | open github | open resume',
			run: ([what]) => {
				if (!what) return [err('open what? try: projects')];
				if (what === 'github') {
					openUrl('https://github.com/JaceG');
					return [ok('opening github…')];
				}
				if (what === 'resume') return cmds.resume.run();
				if (SC_SECTIONS[what]) return cmds.cd.run([what]);
				const n = parseInt(what, 10);
				if (Number.isNaN(n)) return [err(`open: unknown target: ${what}`)];
				return openProject(n);
			},
		},
		resume: {
			desc: 'download my resume',
			run: () => {
				window.location.href = SC_RESUME_URL;
				return [ok('downloading resume…'), dim('(or cd resume to read it here)')];
			},
		},
		stack: { desc: 'what I build with', run: () => [out(SC_STACK.join(' · '))] },
		call: {
			desc: 'call me',
			run: () => {
				call();
				return [ok('calling jace…'), dim("if I don't pick up, text me and I'll call you back.")];
			},
		},
		text: {
			desc: 'text me',
			run: () => {
				text();
				return [ok('opening messages…')];
			},
		},
		contact: {
			desc: 'get in touch',
			run: () => {
				goto('connect');
				return [ok('→ call or text'), dim('or type: call')];
			},
		},
		hire: {
			desc: 'the important one',
			run: () => {
				goto('connect');
				return [ok('excellent decision.'), out('→ type call.')];
			},
		},
		sudo: {
			desc: 'sudo hire jace',
			run: async (args) => {
				const cmd = args.join(' ').toLowerCase();
				if (cmd.startsWith('hire')) {
					await new Promise((r) => setTimeout(r, 500));
					setTimeout(() => goto('connect'), 900);
					return [
						dim('[sudo] password for sourceco: ********'),
						ok('permission granted.'),
						out('escalating to a phone call…'),
					];
				}
				return [err(`${args[0] || ''}: not in the sudoers file. this incident will be reported.`)];
			},
		},
		neofetch: {
			desc: 'system info',
			run: () => {
				const info = [
					'guest@hirejace',
					'──────────────',
					'Role      GTM Engineer, SourceCo',
					'Host      Columbus, Ohio',
					`Uptime    ${uptime()}`,
					'Shell     terminal v1.0.0',
					'Editor    Claude Code',
					'Pipes     n8n · Webhooks · REST APIs',
					'Data      PostgreSQL · MongoDB',
					'Mobile    React Native · Expo',
					'Status    available for new work',
				];
				return [
					pre(
						ART.map((a, i) => `${a}   ${info[i] || ''}`)
							.concat(info.slice(ART.length).map((l) => `${' '.repeat(10)}   ${l}`))
							.join('\n')
					),
				];
			},
		},
		skills: { hidden: true, run: () => cmds.stack.run() },
		email: { hidden: true, run: () => cmds.contact.run() },
		phone: { hidden: true, run: () => cmds.call.run() },
		sms: { hidden: true, run: () => cmds.text.run() },
		pitch: { hidden: true, run: () => cmds.cd.run(['pitch']) },
	};
	return cmds;
}
