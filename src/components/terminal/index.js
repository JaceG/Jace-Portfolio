'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { RESUME_DOWNLOAD_URL } from '@/constants/me';

const PROMPT = 'guest@hirejace:~$';
const GH_USER = 'JaceG';
const SECTIONS = {
	me: 'About me',
	github: 'Live GitHub activity',
	projects: 'Selected work',
	resume: 'Resume & experience',
	books: 'Books',
	connect: 'Contact',
};
const STACK =
	'React · Next.js · React Native · TypeScript · Node · Express · PostgreSQL · MongoDB · GraphQL · AWS · Python · Tailwind';
const BOOT_AT = typeof performance !== 'undefined' ? performance.now() : 0;

const L = (kind, text) => ({ kind, text });
const out = (text) => L('out', text);
const dim = (text) => L('dim', text);
const ok = (text) => L('ok', text);
const err = (text) => L('err', text);
const pre = (text) => L('pre', text);

function cowsay(text) {
	const msg = text || 'moo';
	const bar = '-'.repeat(msg.length + 2);
	return [
		` ${bar}`,
		`< ${msg} >`,
		` ${bar}`,
		'        \\   ^__^',
		'         \\  (oo)\\_______',
		'            (__)\\       )\\/\\',
		'                ||----w |',
		'                ||     ||',
	].join('\n');
}

function uptime() {
	const ms = performance.now() - BOOT_AT;
	const s = Math.floor(ms / 1000);
	const m = Math.floor(s / 60);
	const h = Math.floor(m / 60);
	return h ? `${h}h ${m % 60}m ${s % 60}s` : m ? `${m}m ${s % 60}s` : `${s}s`;
}

function relativeTime(iso) {
	const days = Math.floor((Date.now() - new Date(iso).getTime()) / 864e5);
	if (days <= 0) return 'today';
	if (days === 1) return 'yesterday';
	if (days < 30) return `${days}d ago`;
	return `${Math.floor(days / 30)}mo ago`;
}

const NEOFETCH_ART = [
	'      ██╗ ',
	'      ██║ ',
	'      ██║ ',
	' ██   ██║ ',
	' ╚█████╔╝ ',
	'  ╚════╝  ',
];

/** Matrix rain easter egg: full-screen canvas for ~12s, then fades out. */
function MatrixRain({ onDone }) {
	const ref = useRef(null);
	const [fading, setFading] = useState(false);
	// onDone is passed as an inline arrow, so it is a new function on every
	// parent render -- and the terminal re-renders on each keystroke. Read it
	// through a ref so the rain is set up once instead of restarting.
	const onDoneRef = useRef(onDone);
	useEffect(() => {
		onDoneRef.current = onDone;
	}, [onDone]);

	useEffect(() => {
		const canvas = ref.current;
		const ctx = canvas.getContext('2d');
		const glyphs = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>/{}[]=+*#$%';
		let w, h, cols, drops;
		const size = () => {
			w = canvas.width = window.innerWidth;
			h = canvas.height = window.innerHeight;
			cols = Math.floor(w / 16);
			drops = Array.from({ length: cols }, () => Math.random() * -50);
		};
		size();
		window.addEventListener('resize', size);
		const timer = setInterval(() => {
			ctx.fillStyle = 'rgba(8, 9, 11, 0.09)';
			ctx.fillRect(0, 0, w, h);
			ctx.font = '15px "Geist Mono", ui-monospace, monospace';
			for (let i = 0; i < cols; i++) {
				const ch = glyphs[Math.floor(Math.random() * glyphs.length)];
				ctx.fillStyle = Math.random() < 0.08 ? '#d8ffe6' : '#39bd6d';
				ctx.fillText(ch, i * 16, drops[i] * 16);
				if (drops[i] * 16 > h && Math.random() > 0.975) drops[i] = 0;
				drops[i]++;
			}
		}, 45);
		const fade = setTimeout(() => setFading(true), 11000);
		const done = setTimeout(() => onDoneRef.current(), 12500);
		return () => {
			clearInterval(timer);
			clearTimeout(fade);
			clearTimeout(done);
			window.removeEventListener('resize', size);
		};
	}, []);

	return (
		<canvas
			ref={ref}
			aria-hidden='true'
			className='pointer-events-none fixed inset-0 z-45 bg-ink transition-opacity duration-1500'
			style={{ opacity: fading ? 0 : 1 }}
		/>
	);
}

export default function Terminal() {
	const router = useRouter();
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const [lines, setLines] = useState([]);
	const [input, setInput] = useState('');
	const [history, setHistory] = useState([]);
	const [histIdx, setHistIdx] = useState(-1);
	const [busy, setBusy] = useState(false);
	const [matrix, setMatrix] = useState(false);
	const [flash, setFlash] = useState(false);
	const inputRef = useRef(null);
	const scrollRef = useRef(null);
	const vimRef = useRef(false);
	const lastTapRef = useRef({ t: 0, x: 0, y: 0 });
	const idRef = useRef(0);
	// Page-specific commands a route can register via window.__terminalExt.
	const [ext, setExt] = useState(null);
	const extRef = useRef(null);
	useEffect(() => {
		const sync = () => {
			const next = window.__terminalExt || null;
			extRef.current = next;
			setExt(next);
		};
		sync();
		window.addEventListener('terminal:ext', sync);
		return () => window.removeEventListener('terminal:ext', sync);
	}, []);

	const push = useCallback((...items) => {
		setLines((prev) =>
			[...prev, ...items.map((l) => ({ ...l, id: ++idRef.current }))].slice(-400)
		);
	}, []);

	const openTerminal = useCallback(() => {
		setOpen(true);
		setLines((prev) =>
			prev.length
				? prev
				: (extRef.current?.welcome
						? extRef.current.welcome({ ok, dim })
						: [
								L('ok', 'hirejace terminal v1.0.0'),
								L('dim', 'type /help for options · esc to close'),
								L('dim', 'tip: try neofetch, matrix, or sudo hire jace'),
						  ]
				  ).map((l) => ({ ...l, id: ++idRef.current }))
		);
	}, []);

	const closeTerminal = useCallback(() => setOpen(false), []);

	// ---- Open triggers: double-tap on the page background (not the hero),
	//      the backtick key, or a `terminal:open` event.
	useEffect(() => {
		const isBackground = (el) => {
			if (!el || !(el instanceof Element)) return false;
			if (
				el.closest(
					'.hero-root, .terminal-root, a, button, input, textarea, select, label, img, svg, iframe, video, [contenteditable], [data-no-terminal]'
				)
			) {
				return false;
			}
			const TEXT = [
				'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'SPAN', 'STRONG', 'EM',
				'B', 'I', 'CODE', 'PRE', 'BLOCKQUOTE', 'TD', 'TH', 'SMALL',
			];
			return !TEXT.includes(el.tagName);
		};
		const onUp = (e) => {
			if (e.button !== 0) return;
			if (!isBackground(e.target)) return;
			const now = performance.now();
			const last = lastTapRef.current;
			const isDouble =
				now - last.t < 350 &&
				Math.hypot(e.clientX - last.x, e.clientY - last.y) < 40;
			lastTapRef.current = {
				t: isDouble ? 0 : now,
				x: e.clientX,
				y: e.clientY,
			};
			if (isDouble) {
				// A double-click may have selected nearby text; drop it.
				window.getSelection?.()?.removeAllRanges?.();
				openTerminal();
			}
		};
		const onKey = (e) => {
			const typing = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);
			if (e.key === '`' && !typing) {
				e.preventDefault();
				setOpen((o) => {
					if (!o) openTerminal();
					return !o;
				});
			}
		};
		const onOpenEvent = () => openTerminal();
		document.addEventListener('pointerup', onUp);
		window.addEventListener('keydown', onKey);
		window.addEventListener('terminal:open', onOpenEvent);
		return () => {
			document.removeEventListener('pointerup', onUp);
			window.removeEventListener('keydown', onKey);
			window.removeEventListener('terminal:open', onOpenEvent);
		};
	}, [openTerminal]);

	// Focus + scroll to bottom whenever the terminal opens or prints
	useEffect(() => {
		if (!open) return;
		inputRef.current?.focus({ preventScroll: true });
		const el = scrollRef.current;
		if (el) el.scrollTop = el.scrollHeight;
	}, [open, lines]);

	// ---- Navigation helpers ------------------------------------------------

	const goto = (id) => {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		} else {
			router.push(`${ext?.base || ''}/#${id}`);
		}
	};
	const heroCommand = (name) =>
		window.dispatchEvent(new CustomEvent('hero:command', { detail: name }));
	const openUrl = (url) => window.open(url, '_blank', 'noopener,noreferrer');

	// ---- Commands ----------------------------------------------------------

	const BASE_COMMANDS = {
		help: {
			desc: 'list commands',
			run: () => [
				ok('available commands'),
				...Object.entries(COMMANDS)
					.filter(([, c]) => !c.hidden)
					.map(([name, c]) => dim(`  ${name.padEnd(12)} ${c.desc}`)),
				dim('  ↑/↓ history · tab to complete · esc to close'),
			],
		},
		about: {
			desc: 'who is this guy',
			run: () => [
				out('Jace Galloway — full-stack software engineer in Columbus, Ohio.'),
				out('Web + mobile, end to end: React, Next.js, React Native, Node, TypeScript.'),
				dim('Been taking computers apart since I was a kid. Still at it.'),
			],
		},
		ls: {
			desc: 'list the sections of this site',
			run: () => [
				...Object.entries(SECTIONS).map(([id, label]) =>
					out(`  ${id.padEnd(10)} ${label}`)
				),
				dim('  cd <section> to jump there'),
			],
		},
		cd: {
			desc: 'jump to a section, e.g. cd projects',
			run: ([id]) => {
				if (!id || id === '~' || id === '/') {
					window.scrollTo({ top: 0, behavior: 'smooth' });
					return [ok('~')];
				}
				const key = id.replace(/^#/, '').toLowerCase();
				if (!SECTIONS[key]) return [err(`cd: no such section: ${id}`), dim('try: ls')];
				goto(key);
				return [ok(`→ ${SECTIONS[key]}`)];
			},
		},
		projects: {
			desc: 'list my projects (open <n> to view one)',
			run: async () => {
				const res = await fetch('/api/projects?all=1').then((r) => r.json());
				window.__terminalProjects = res.results;
				return [
					ok(`${res.total} projects`),
					...res.results.map((p, i) =>
						out(`  ${String(i + 1).padStart(2)}. ${p.title}`)
					),
					dim('  open <n> for the case study'),
				];
			},
		},
		open: {
			desc: 'open <n> | open github | open resume',
			run: async ([what]) => {
				if (!what) return [err('open what? try: projects')];
				if (what === 'github') {
					openUrl(`https://github.com/${GH_USER}`);
					return [ok('opening github…')];
				}
				if (what === 'resume') {
					openUrl(RESUME_DOWNLOAD_URL);
					return [ok('downloading resume…')];
				}
				if (SECTIONS[what]) {
					goto(what);
					return [ok(`→ ${SECTIONS[what]}`)];
				}
				const n = parseInt(what, 10);
				if (Number.isNaN(n)) return [err(`open: unknown target: ${what}`)];
				let list = window.__terminalProjects;
				if (!list) {
					list = (await fetch('/api/projects?all=1').then((r) => r.json())).results;
					window.__terminalProjects = list;
				}
				const p = list[n - 1];
				if (!p) return [err(`open: no project #${n}`), dim('try: projects')];
				router.push(`/case-study/${p.slug}`);
				return [ok(`opening ${p.title}…`)];
			},
		},
		resume: {
			desc: 'download my resume',
			run: () => {
				openUrl(RESUME_DOWNLOAD_URL);
				return [ok('downloading resume…'), dim('(or cd resume to read it here)')];
			},
		},
		stack: {
			desc: 'what I build with',
			run: () => [out(STACK)],
		},
		gh: {
			desc: 'live github stats',
			run: async () => {
				const [p, repos] = await Promise.all([
					fetch(`https://api.github.com/users/${GH_USER}`).then((r) => r.json()),
					fetch(
						`https://api.github.com/users/${GH_USER}/repos?sort=pushed&per_page=5`
					).then((r) => r.json()),
				]);
				if (typeof p?.public_repos !== 'number' || !Array.isArray(repos)) {
					return [err('github api unreachable (rate limited?)'), dim('try: open github')];
				}
				return [
					ok(`@${GH_USER}`),
					out(`  public repos  ${p.public_repos}`),
					out(`  followers     ${p.followers}`),
					out(`  last push     ${relativeTime(repos[0].pushed_at)}`),
					dim('  recent:'),
					...repos.map((r) =>
						dim(`    ${r.name.padEnd(24)} ${relativeTime(r.pushed_at)}`)
					),
				];
			},
		},
		contact: {
			desc: 'get in touch',
			run: () => {
				goto('connect');
				return [ok('→ contact form'), dim('I read everything.')];
			},
		},
		hire: {
			desc: 'the important one',
			run: () => {
				goto('connect');
				return [ok('excellent decision.'), out('→ contact form is right there.')];
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
						dim('[sudo] password for recruiter: ********'),
						ok('permission granted.'),
						out('escalating to contact form…'),
					];
				}
				return [err(`${args[0] || ''}: not in the sudoers file. this incident will be reported.`)];
			},
		},
		neofetch: {
			desc: 'system info',
			run: () => {
				const info = [
					`guest@hirejace`,
					`──────────────`,
					`OS        hirejace.com v2 (Next.js 15)`,
					`Host      Columbus, Ohio`,
					`Kernel    React 19 · TypeScript`,
					`Uptime    ${uptime()}`,
					`Shell     terminal v1.0.0`,
					`Editor    VS Code · Claude Code`,
					`Stack     Node · Express · PostgreSQL · MongoDB`,
					`Mobile    React Native · Expo`,
					`Status    available for new work`,
				];
				return [
					pre(
						NEOFETCH_ART.map((a, i) => `${a}   ${info[i] || ''}`)
							.concat(info.slice(NEOFETCH_ART.length).map((l) => `${' '.repeat(10)}   ${l}`))
							.join('\n')
					),
				];
			},
		},
		matrix: {
			desc: 'follow the white rabbit',
			run: () => {
				setMatrix(true);
				return [ok('wake up, neo…')];
			},
		},
		glitch: {
			desc: 'kick the tv',
			run: () => {
				setFlash(true);
				setTimeout(() => setFlash(false), 600);
				heroCommand('pulse');
				return [ok('*thump*')];
			},
		},
		reboot: {
			desc: 'power-cycle the hero',
			run: () => {
				heroCommand('reboot');
				return [ok('rebooting hero…'), dim('(scroll to the top to watch)')];
			},
		},
		orb: {
			desc: 'launch the hero orb',
			run: () => {
				heroCommand('launch');
				return [ok('orb launched.'), dim('it likes the status pill, by the way.')];
			},
		},
		secret: {
			desc: 'hints',
			run: () => [
				dim('· the orb on the hero can be thrown. drop it on the green status dot.'),
				dim('· its light reveals messages hidden in the background.'),
				dim('· double-tap the hero to reboot it. click for a pulse.'),
				dim('· the photo on the intro section drags. try it.'),
				dim('· vim is a trap.'),
			],
		},
		cowsay: {
			desc: 'cowsay <text>',
			run: (args) => [pre(cowsay(args.join(' ')))],
		},
		coffee: {
			desc: '☕',
			run: async () => {
				await new Promise((r) => setTimeout(r, 700));
				return [pre('   ( (\n    ) )\n  ........\n  |      |]\n  \\      /\n   `----´'), ok('brewed. back to work.')];
			},
		},
		hack: {
			desc: 'hack the planet',
			run: async () => {
				await new Promise((r) => setTimeout(r, 900));
				return [
					dim('accessing mainframe…    [████████████] 100%'),
					dim('bypassing firewall…     [████████████] 100%'),
					dim('downloading the internet… [██████░░░░] 61%'),
					ok('just kidding. but I do write secure code.'),
				];
			},
		},
		vim: {
			desc: 'do not',
			run: () => {
				vimRef.current = true;
				return [out('~'), out('~'), out('~'), dim('-- INSERT --'), err('you are now stuck in vim.')];
			},
		},
		echo: { desc: 'echo <text>', run: (args) => [out(args.join(' '))] },
		date: { desc: 'current date', run: () => [out(new Date().toString())] },
		uptime: { desc: 'time on this page', run: () => [out(`up ${uptime()}`)] },
		history: {
			desc: 'command history',
			run: () => history.map((h, i) => dim(`  ${i + 1}  ${h}`)),
		},
		clear: { desc: 'clear the screen', run: () => 'clear' },
		exit: { desc: 'close the terminal', run: () => 'exit' },
		whoami: { hidden: true, run: () => [out('guest'), dim('(but you could be a future collaborator)')] },
		pwd: { hidden: true, run: () => [out(`/hirejace${pathname === '/' ? '' : pathname}`)] },
		rm: {
			hidden: true,
			run: (args) =>
				args.join(' ').includes('-rf')
					? [err('nice try. this portfolio is immutable.')]
					: [err('rm: permission denied')],
		},
		'/help': { hidden: true, run: () => COMMANDS.help.run() },
		'?': { hidden: true, run: () => COMMANDS.help.run() },
		close: { hidden: true, run: () => 'exit' },
		quit: { hidden: true, run: () => 'exit' },
		goto: { hidden: true, run: (a) => COMMANDS.cd.run(a) },
		skills: { hidden: true, run: () => COMMANDS.stack.run() },
		github: { hidden: true, run: () => COMMANDS.open.run(['github']) },
		email: { hidden: true, run: () => COMMANDS.contact.run() },
		stats: { hidden: true, run: () => COMMANDS.gh.run() },
		konami: { hidden: true, run: () => [ok('↑ ↑ ↓ ↓ ← → ← → B A'), dim('respect.')] },
	};
	const COMMANDS = ext
		? {
				...BASE_COMMANDS,
				...ext.buildCommands({ ok, out, dim, err, pre, goto, openUrl, router, uptime }),
		  }
		: BASE_COMMANDS;

	const run = async (raw) => {
		const text = raw.trim();
		push(L('in', text));
		if (!text) return;
		setHistory((h) => [...h, text].slice(-100));
		setHistIdx(-1);

		if (vimRef.current) {
			if (/^:(q!?|wq|x)$/.test(text)) {
				vimRef.current = false;
				push(ok('phew.'));
			} else {
				push(dim('-- INSERT --'), err('still stuck. try :q'));
			}
			return;
		}

		const [name, ...args] = text.split(/\s+/);
		const cmd = COMMANDS[name.toLowerCase()];
		if (!cmd) {
			push(err(`command not found: ${name}`), dim('type /help for options'));
			return;
		}
		setBusy(true);
		try {
			const result = await cmd.run(args);
			if (result === 'clear') setLines([]);
			else if (result === 'exit') closeTerminal();
			else if (Array.isArray(result)) push(...result);
		} catch (e) {
			push(err(`error: ${e?.message || e}`));
		} finally {
			setBusy(false);
		}
	};

	const onKeyDown = (e) => {
		if (e.key === 'Escape' || (e.key === '`' && input === '')) {
			// Esc always closes; a backtick on an empty prompt toggles it shut
			// (the same key that opened it).
			e.preventDefault();
			closeTerminal();
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (!history.length) return;
			const idx = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1);
			setHistIdx(idx);
			setInput(history[idx]);
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (histIdx < 0) return;
			const idx = histIdx + 1;
			if (idx >= history.length) {
				setHistIdx(-1);
				setInput('');
			} else {
				setHistIdx(idx);
				setInput(history[idx]);
			}
		} else if (e.key === 'Tab') {
			e.preventDefault();
			const [head] = input.split(/\s+/);
			if (!head) return;
			const matches = Object.keys(COMMANDS).filter(
				(c) => !COMMANDS[c].hidden && c.startsWith(head.toLowerCase())
			);
			if (matches.length === 1) setInput(matches[0] + ' ');
			else if (matches.length > 1) push(dim(matches.join('  ')));
		} else if (e.key === 'l' && e.ctrlKey) {
			e.preventDefault();
			setLines([]);
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (busy) return;
		const value = input;
		setInput('');
		run(value);
	};

	const lineClass = {
		in: 'text-white',
		out: 'text-white/85',
		dim: 'text-white/45',
		ok: 'text-primary',
		err: 'text-red-400',
		pre: 'whitespace-pre text-primary',
	};

	return (
		<>
			{matrix && <MatrixRain onDone={() => setMatrix(false)} />}
			{flash && (
				<div aria-hidden='true' className='pointer-events-none fixed inset-0 z-45'>
					<div className='hero-static absolute inset-0' style={{ opacity: 0.85 }} />
					<div className='hero-scanlines absolute inset-0' style={{ opacity: 0.6 }} />
				</div>
			)}
			{open && (
				// Top-anchored on phones so the on-screen keyboard doesn't cover it;
				// bottom-docked on larger screens.
				<div className='terminal-root pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:inset-x-0 sm:bottom-0 sm:top-auto sm:px-6 sm:pb-6 sm:pt-0'>
					<div
						role='dialog'
						aria-label='Site terminal'
						className='terminal-panel pointer-events-auto w-full max-w-[760px] overflow-hidden rounded-2xl border border-white/10 bg-ink/95 font-geist-mono text-[13px] text-white shadow-[0_0_70px_rgba(57,189,109,0.18)] backdrop-blur-sm sm:text-sm'>
						<div className='flex items-center gap-2 border-b border-white/10 px-4 py-2.5'>
							<span className='h-3 w-3 rounded-full bg-[#ff5f57]' />
							<span className='h-3 w-3 rounded-full bg-[#febc2e]' />
							<span className='h-3 w-3 rounded-full bg-[#28c840]' />
							<span className='ml-3 text-xs text-white/50'>guest@hirejace: ~</span>
							<button
								type='button'
								onClick={closeTerminal}
								aria-label='Close terminal'
								className='ml-auto rounded-sm px-2 text-white/50 transition-colors hover:text-white'>
								✕
							</button>
						</div>
						<div
							ref={scrollRef}
							onClick={() => inputRef.current?.focus({ preventScroll: true })}
							className='terminal-scroll h-[38vh] max-h-[380px] cursor-text overflow-y-auto px-4 py-3 leading-6 sm:h-[46vh]'>
							{lines.map((l) => (
								<div key={l.id} className={`terminal-line ${lineClass[l.kind] || ''}`}>
									{l.kind === 'in' ? (
										<>
											<span className='text-primary'>{PROMPT}</span> {l.text}
										</>
									) : (
										l.text
									)}
								</div>
							))}
							<form onSubmit={onSubmit} className='flex items-center gap-2'>
								<span className='text-primary'>{PROMPT}</span>
								<input
									ref={inputRef}
									value={input}
									onChange={(e) => setInput(e.target.value)}
									onKeyDown={onKeyDown}
									disabled={busy}
									autoComplete='off'
									autoCapitalize='off'
									autoCorrect='off'
									spellCheck={false}
									aria-label='Terminal input'
									className='terminal-input min-w-0 flex-1 bg-transparent text-white caret-primary outline-hidden placeholder:text-white/25'
									placeholder={busy ? '' : 'type /help'}
								/>
								{busy && <span className='animate-pulse text-primary'>…</span>}
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
