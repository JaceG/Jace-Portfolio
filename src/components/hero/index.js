'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { RESUME_DOWNLOAD_URL } from '@/constants/me';
import HeroFilm from './film';
import { useMotionPreview } from '../motion-preview';
import monitorStyles from './monitor.module.css';
import {
	NAV_HEIGHT,
	FIZZLE_VH,
	HOLD_VH,
} from './constants';

const ROLES = [
	'Full-Stack Developer',
	'Software Engineer',
	'React & Node.js',
	'AI-Powered Solutions',
];
const NAME_TOP = 'JACE';
const NAME_BOTTOM = 'GALLOWAY';
const STACK = [
	'React',
	'TypeScript',
	'Node.js',
	'Next.js',
	'React Native',
	'PostgreSQL',
	'AWS',
	'Python',
	'GraphQL',
	'Tailwind',
];
const SOCIALS = [
	{ label: 'GitHub', href: 'https://github.com/JaceG' },
	{ label: 'LinkedIn', href: 'https://linkedin.com/in/jace-galloway-6833a4249' },
	{ label: 'Stack Overflow', href: 'https://stackoverflow.com/users/1450474/jace' },
];
// Whispered in the background, visible only inside the orb's light.
const SECRETS = [
	{ text: '<- drag & throw me', style: { right: 'calc(12% + 26px)', top: 'calc(22% - 8px)' } },
	{ text: '> you found the light', style: { left: '46%', top: '30%' } },
	{ text: '// TODO: hire jace', style: { left: '42%', top: '13%' } },
	{ text: 'git commit -m "ship it"', style: { left: '58%', top: '50%' } },
	{ text: 'while (alive) { build(); }', style: { left: '28%', top: '68%' } },
	{ text: 'const passion = true;', style: { left: '72%', top: '78%' } },
	{ text: 'npm run dream', style: { left: '10%', top: '86%' } },
];
const BOOT_LINES = [
	'> power cycle detected',
	'> reloading hirejace.com ... ok',
	'> restoring hero',
];

// The narrowest screen shape that still reads as a monitor (16:10).
const MONITOR_MIN_ASPECT = 1.6;

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smoothstep = (a, b, x) => {
	const t = clamp01((x - a) / (b - a));
	return t * t * (3 - 2 * t);
};

/**
 * Renders a word one glyph at a time and randomly fires short one-shot CRT
 * glitches (static blotch, flicker, chromatic tear, or a rare full-word
 * flicker). At rest there are 4–11s of idle time between events; `storm`
 * (0..1) ramps that down to a near-continuous barrage. Bumping `burst`
 * fires an immediate full-word flicker followed by a chromatic tear.
 */
function GlitchWord({ text, className, style, storm = 0, burst = 0 }) {
	// Memoised so the glitch scheduler below can depend on it honestly: text is
	// a module constant, so this keeps a stable identity and the effect still
	// only restarts when storm changes.
	const chars = useMemo(() => [...text], [text]);
	const [glitches, setGlitches] = useState({});
	const fireRef = useRef(null);

	useEffect(() => {
		let timer;
		const lifeTimers = new Set();
		const randBand = () => {
			const top = Math.floor(Math.random() * 55);
			const height = 12 + Math.floor(Math.random() * 40);
			return `inset(${top}% 0 ${Math.max(0, 100 - top - height)}% 0)`;
		};
		const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
		const calm = ['static', 'static', 'static', 'flicker', 'flicker', 'chroma', 'full'];
		const wild = ['static', 'static', 'flicker', 'chroma', 'chroma', 'full', 'full'];
		const fire = (forced, reschedule = true) => {
			const profile = forced || pick(storm > 0.3 ? wild : calm);
			const indices = new Set();
			if (profile === 'full') {
				chars.forEach((_, i) => indices.add(i));
			} else {
				const count = 1 + Math.floor(Math.random() * (storm > 0 || forced ? 3 : 2));
				while (indices.size < Math.min(count, chars.length)) {
					indices.add(Math.floor(Math.random() * chars.length));
				}
			}
			const type = profile === 'full' ? 'flicker' : profile;
			setGlitches((prev) => {
				const next = { ...prev };
				indices.forEach((i) => {
					next[i] = {
						type,
						band: type === 'static' ? randBand() : undefined,
					};
				});
				return next;
			});
			const life =
				type === 'static'
					? 220 + Math.random() * 220
					: 260 + Math.random() * 180;
			const t = setTimeout(() => {
				lifeTimers.delete(t);
				setGlitches((prev) => {
					const next = { ...prev };
					indices.forEach((i) => delete next[i]);
					return next;
				});
			}, life);
			lifeTimers.add(t);
			if (reschedule) schedule();
		};
		const schedule = () => {
			const gap =
				storm > 0
					? 40 + Math.random() * (60 + 240 * (1 - storm))
					: 4000 + Math.random() * 7000;
			timer = setTimeout(() => fire(), gap);
		};
		fireRef.current = fire;
		schedule();
		return () => {
			fireRef.current = null;
			clearTimeout(timer);
			lifeTimers.forEach((t) => clearTimeout(t));
			setGlitches({});
		};
	}, [storm, chars]);

	useEffect(() => {
		if (!burst) return;
		fireRef.current?.('full', false);
		const t = setTimeout(() => fireRef.current?.('chroma', false), 140);
		return () => clearTimeout(t);
	}, [burst]);

	return (
		<span className={className} style={style}>
			{chars.map((ch, i) => {
				const g = glitches[i];
				const display = ch === ' ' ? ' ' : ch;
				return (
					<span
						key={i}
						data-ch={display}
						className={
							'glitch-char' +
							(g?.type === 'static' ? ' g-static' : '') +
							(g?.type === 'flicker' ? ' g-flicker' : '') +
							(g?.type === 'chroma' ? ' g-chroma' : '')
						}
						style={g?.band ? { '--band': g.band } : undefined}>
						{display}
					</span>
				);
			})}
		</span>
	);
}

function useTypewriter(words) {
	const [text, setText] = useState('');
	const [wordIndex, setWordIndex] = useState(0);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		const current = words[wordIndex % words.length];
		const done = !deleting && text === current;
		const empty = deleting && text === '';
		const timer = setTimeout(
			() => {
				if (done) setDeleting(true);
				else if (empty) {
					setDeleting(false);
					setWordIndex((i) => i + 1);
				} else {
					setText(
						current.slice(
							0,
							deleting ? text.length - 1 : text.length + 1
						)
					);
				}
			},
			done ? 1600 : empty ? 260 : deleting ? 34 : 66
		);
		return () => clearTimeout(timer);
	}, [text, deleting, wordIndex, words]);

	return text;
}

/** Terminal-style boot lines shown between a CRT power-off and power-on. */
function BootSequence({ onDone }) {
	const [shown, setShown] = useState(0);
	// Keep the latest callback without re-running the timer effect: the parent
	// re-renders constantly (typewriter), and restarting the timers on every
	// render would stall the sequence.
	const onDoneRef = useRef(onDone);
	useEffect(() => {
		onDoneRef.current = onDone;
	}, [onDone]);

	useEffect(() => {
		const timers = BOOT_LINES.map((_, i) =>
			setTimeout(() => setShown(i + 1), 120 + i * 380)
		);
		timers.push(
			setTimeout(
				() => onDoneRef.current(),
				120 + BOOT_LINES.length * 380 + 320
			)
		);
		return () => timers.forEach(clearTimeout);
	}, []);

	return (
		<div className='absolute inset-0 flex items-center justify-center px-6'>
			<div className='font-geist-mono text-sm text-white/80 sm:text-base'>
				{BOOT_LINES.slice(0, shown).map((line, i) => (
					<div key={i} className='hero-bootline'>
						{line}
						{i === shown - 1 && (
							<span
								className='ml-1 inline-block h-[1em] w-[0.55em] translate-y-[2px] bg-primary'
								style={{ animation: 'caret-blink 0.7s step-end infinite' }}
							/>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

/**
 * A grab-and-throw orb. Drag it, flick it, and it flies with momentum,
 * bounces off the hero's edges, leaves a comet trail, glitches any name
 * glyph it crosses, and carries the aurora glow with it. Its position is
 * published as --orb-x/--orb-y on the root so the hidden messages layer can
 * mask itself around it. Everything here is imperative (no React state per
 * frame).
 */
function Orb({ rootRef, onDock, onUndock, ejectRef }) {
	const elRef = useRef(null);
	const trailRef = useRef(null);
	// The hero re-renders constantly for the typewriter, so these props are new
	// functions each time. They are read through refs to keep them out of the
	// physics effect's dependencies -- that effect owns the orb's position and
	// velocity, and re-running it would reset the orb mid-flight.
	const onDockRef = useRef(onDock);
	const onUndockRef = useRef(onUndock);
	useEffect(() => {
		onDockRef.current = onDock;
		onUndockRef.current = onUndock;
	}, [onDock, onUndock]);

	useEffect(() => {
		const root = rootRef.current;
		const el = elRef.current;
		if (!root || !el) return;
		const R = 14; // half of the hit area
		const s = {
			x: 0,
			y: 0,
			vx: 0,
			vy: 0,
			dragging: false,
			samples: [],
			raf: null,
			last: 0,
			lastTrail: 0,
			glyphs: [],
			glyphStamp: 0,
			hits: new Map(),
			moved: false,
			docked: false,
			port: null, // the pill's status dot, in root coords
			portStamp: 0,
		};
		const DOCK_RANGE = 110; // px: magnet + proximity feedback radius
		const DOCK_SNAP = 18; // px: capture radius
		const bounds = () => ({ w: root.clientWidth, h: root.clientHeight });
		const setVars = () => {
			root.style.setProperty('--orb-x', `${s.x}px`);
			root.style.setProperty('--orb-y', `${s.y}px`);
		};
		const apply = () => {
			el.style.transform = `translate3d(${s.x - R}px, ${s.y - R}px, 0)`;
			setVars();
		};
		const home = () => {
			const b = bounds();
			s.x = b.w * 0.88;
			s.y = b.h * 0.22;
			s.vx = 0;
			s.vy = 0;
			apply();
		};
		const glow = () => {
			const b = bounds();
			root.style.setProperty('--glow-x', `${(s.x / b.w) * 100}%`);
			root.style.setProperty('--glow-y', `${(s.y / b.h) * 100}%`);
		};
		const spawnTrail = () => {
			const dot = document.createElement('span');
			dot.className = 'hero-trail';
			dot.style.left = `${s.x}px`;
			dot.style.top = `${s.y}px`;
			dot.addEventListener('animationend', () => dot.remove());
			trailRef.current?.appendChild(dot);
		};
		const refreshGlyphs = (now) => {
			if (now - s.glyphStamp < 400) return;
			s.glyphStamp = now;
			const rr = root.getBoundingClientRect();
			s.glyphs = [...root.querySelectorAll('.glitch-char')].map((g) => {
				const r = g.getBoundingClientRect();
				return {
					el: g,
					l: r.left - rr.left - 4,
					t: r.top - rr.top - 4,
					r: r.right - rr.left + 4,
					b: r.bottom - rr.top + 4,
				};
			});
		};
		const refreshPort = (now) => {
			if (s.port && now - s.portStamp < 400) return;
			s.portStamp = now;
			const dot = root.querySelector('.hero-pill-dot');
			if (!dot) {
				s.port = null;
				return;
			}
			const rr = root.getBoundingClientRect();
			const r = dot.getBoundingClientRect();
			s.port = {
				x: r.left - rr.left + r.width / 2,
				y: r.top - rr.top + r.height / 2,
			};
		};
		const setNear = (v) => root.style.setProperty('--pill-near', v.toFixed(3));
		const dock = () => {
			s.docked = true;
			s.vx = 0;
			s.vy = 0;
			s.x = s.port.x;
			s.y = s.port.y;
			apply();
			glow();
			setNear(1);
			el.classList.add('is-docked');
			el.classList.remove('is-moving');
			onDockRef.current?.(s.x, s.y);
		};
		const eject = () => {
			el.classList.remove('is-docked');
			if (s.docked) {
				s.docked = false;
				const a = -Math.PI / 2 + (Math.random() - 0.5) * 1.6; // mostly upward
				s.vx = Math.cos(a) * 1.5;
				s.vy = Math.sin(a) * 1.5;
				run();
			}
			onUndockRef.current?.();
		};
		if (ejectRef) ejectRef.current = eject;
		// Magnetic pull toward the pill dot, with proximity feedback; docks
		// once inside the capture radius.
		const magnet = (now, dt) => {
			refreshPort(now);
			if (!s.port) return;
			const dx = s.port.x - s.x;
			const dy = s.port.y - s.y;
			const dist = Math.hypot(dx, dy) || 0.001;
			const near = Math.max(0, 1 - dist / DOCK_RANGE);
			setNear(near);
			if (s.dragging) return;
			if (dist < DOCK_SNAP) {
				dock();
				return;
			}
			if (near > 0) {
				const a = 0.0045 * (0.3 + near);
				s.vx += (dx / dist) * a * dt;
				s.vy += (dy / dist) * a * dt;
			}
		};
		const hitGlyphs = (now) => {
			refreshGlyphs(now);
			for (const g of s.glyphs) {
				if (s.x < g.l || s.x > g.r || s.y < g.t || s.y > g.b) continue;
				if (s.hits.has(g.el)) continue;
				g.el.classList.add('g-chroma');
				s.hits.set(
					g.el,
					setTimeout(() => {
						g.el.classList.remove('g-chroma');
						s.hits.delete(g.el);
					}, 320)
				);
			}
		};
		const step = (now) => {
			s.raf = null;
			const dt = Math.min(32, s.last ? now - s.last : 16);
			s.last = now;
			if (!s.dragging) {
				s.x += s.vx * dt;
				s.y += s.vy * dt;
				const b = bounds();
				const minX = R;
				const maxX = b.w - R;
				const minY = NAV_HEIGHT + R;
				const maxY = b.h - R;
				if (s.x < minX) {
					s.x = minX;
					s.vx = -s.vx * 0.82;
				} else if (s.x > maxX) {
					s.x = maxX;
					s.vx = -s.vx * 0.82;
				}
				if (s.y < minY) {
					s.y = minY;
					s.vy = -s.vy * 0.82;
				} else if (s.y > maxY) {
					s.y = maxY;
					s.vy = -s.vy * 0.82;
				}
				const friction = Math.pow(0.994, dt / 16.67);
				s.vx *= friction;
				s.vy *= friction;
			}
			magnet(now, dt);
			if (s.docked) return;
			apply();
			const speed = s.dragging ? 1 : Math.hypot(s.vx, s.vy);
			if (speed > 0.12 && now - s.lastTrail > 22) {
				spawnTrail();
				s.lastTrail = now;
			}
			if (speed > 0.04) {
				hitGlyphs(now);
				glow();
			}
			if (s.dragging || speed > 0.01) {
				s.raf = requestAnimationFrame(step);
			} else {
				s.vx = 0;
				s.vy = 0;
				s.last = 0;
				el.classList.remove('is-moving');
			}
		};
		const run = () => {
			if (s.docked) return;
			el.classList.add('is-moving');
			if (s.raf == null) s.raf = requestAnimationFrame(step);
		};
		const toLocal = (e) => {
			const rr = root.getBoundingClientRect();
			return { x: e.clientX - rr.left, y: e.clientY - rr.top };
		};
		const onDown = (e) => {
			if (e.button !== 0 || s.docked) return;
			e.preventDefault();
			e.stopPropagation();
			try {
				el.setPointerCapture(e.pointerId);
			} catch {
				/* synthetic events have no capturable pointer */
			}
			s.dragging = true;
			s.moved = false;
			s.vx = 0;
			s.vy = 0;
			const p = toLocal(e);
			s.samples = [{ ...p, t: performance.now() }];
			run();
		};
		const onMove = (e) => {
			if (!s.dragging) return;
			e.stopPropagation();
			const p = toLocal(e);
			s.x = p.x;
			s.y = p.y;
			s.moved = true;
			const now = performance.now();
			s.samples.push({ ...p, t: now });
			s.samples = s.samples.filter((q) => now - q.t < 90);
		};
		const onUp = (e) => {
			if (!s.dragging) return;
			e.stopPropagation();
			s.dragging = false;
			try {
				el.releasePointerCapture(e.pointerId);
			} catch {
				/* not captured */
			}
			const now = performance.now();
			const first = s.samples[0];
			const last = s.samples[s.samples.length - 1];
			if (first && last && last.t > first.t && now - last.t < 120) {
				const dt = last.t - first.t;
				const cap = 2.6;
				s.vx = Math.max(-cap, Math.min(cap, (last.x - first.x) / dt));
				s.vy = Math.max(-cap, Math.min(cap, (last.y - first.y) / dt));
			}
			if (!s.moved) {
				// A plain tap on the orb gives it a nudge in a random direction.
				const a = Math.random() * Math.PI * 2;
				s.vx = Math.cos(a) * 1.2;
				s.vy = Math.sin(a) * 1.2;
			}
			run();
		};
		const onResize = () => {
			const b = bounds();
			s.x = Math.min(Math.max(R, s.x), b.w - R);
			s.y = Math.min(Math.max(NAV_HEIGHT + R, s.y), b.h - R);
			apply();
		};

		// `orb` from the site terminal: kick it off in a random direction.
		const onCommand = (e) => {
			if (e.detail !== 'launch') return;
			if (s.docked) eject();
			const a = Math.random() * Math.PI * 2;
			s.vx = Math.cos(a) * 2.2;
			s.vy = Math.sin(a) * 2.2;
			run();
		};
		window.addEventListener('hero:command', onCommand);

		home();
		el.addEventListener('pointerdown', onDown);
		el.addEventListener('pointermove', onMove);
		el.addEventListener('pointerup', onUp);
		el.addEventListener('pointercancel', onUp);
		window.addEventListener('resize', onResize);
		return () => {
			el.removeEventListener('pointerdown', onDown);
			el.removeEventListener('pointermove', onMove);
			el.removeEventListener('pointerup', onUp);
			el.removeEventListener('pointercancel', onUp);
			window.removeEventListener('resize', onResize);
			window.removeEventListener('hero:command', onCommand);
			if (s.raf != null) cancelAnimationFrame(s.raf);
			s.hits.forEach((t) => clearTimeout(t));
			if (ejectRef) ejectRef.current = null;
			root.style.removeProperty('--orb-x');
			root.style.removeProperty('--orb-y');
			root.style.removeProperty('--pill-near');
		};
	}, [rootRef, ejectRef]);

	return (
		<>
			<div ref={trailRef} aria-hidden='true' className='pointer-events-none absolute inset-0' />
			<div
				ref={elRef}
				role='button'
				aria-label='Throwable orb'
				title='Drag & throw'
				className='hero-orb absolute left-0 top-0 z-20 flex h-7 w-7 items-center justify-center'>
				<span className='hero-orb-dot block h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_30px_8px_rgba(57,189,109,0.5)]' />
			</div>
		</>
	);
}

/**
 * Fixed full-viewport hero. Scrolling the first FIZZLE_VH viewport-heights of
 * the page drives a CRT-style fizzle: glitches storm, static and scanlines
 * swell, the content blurs and lifts away, and the whole panel fades to
 * reveal the original intro section pinned underneath it.
 *
 * Interaction: a click/tap on the background fires a pulse (rings, sparks,
 * grid shock, glitch burst); a double click/tap power-cycles the panel like
 * an old CRT and reboots it.
 */
export default function Hero() {
	const { active, paused, hardwareReady } = useMotionPreview();
	const [monitorReady, setMonitorReady] = useState(false);
	const hardwareReveal = active && !paused && hardwareReady && monitorReady;
	const role = useTypewriter(ROLES);
	const rootRef = useRef(null);
	const monitorRef = useRef(null);
	const contentRef = useRef(null);
	const gridRef = useRef(null);
	const staticRef = useRef(null);
	const scanRef = useRef(null);
	const rollRef = useRef(null);
	const blackoutRef = useRef(null);
	const frameRef = useRef(null);
	const progressRef = useRef(0);
	const lastTapRef = useRef({ t: 0, x: 0, y: 0 });
	const fxIdRef = useRef(0);
	const cycleRef = useRef('idle');
	const [storm, setStorm] = useState(0);
	const [burst, setBurst] = useState(0);
	const [fx, setFx] = useState([]);
	const [cycle, setCycle] = useState('idle'); // idle | off | boot | on
	const [screenKey, setScreenKey] = useState(0);
	const [docked, setDocked] = useState(false);
	const ejectRef = useRef(null);
	const dockTimerRef = useRef(null);

	// Cursor-tracking aurora + parallax, written straight to CSS variables on
	// the root (no React re-render per move). The orb overrides the glow
	// while it is in flight.
	useEffect(() => {
		const el = rootRef.current;
		if (!el) return;
		const onMove = (e) => {
			if (frameRef.current) return;
			frameRef.current = requestAnimationFrame(() => {
				frameRef.current = null;
				const rect = el.getBoundingClientRect();
				const x = (e.clientX - rect.left) / rect.width;
				const y = (e.clientY - rect.top) / rect.height;
				el.style.setProperty('--glow-x', `${x * 100}%`);
				el.style.setProperty('--glow-y', `${y * 100}%`);
				el.style.setProperty('--px', `${(x - 0.5) * -14}px`);
				el.style.setProperty('--py', `${(y - 0.5) * -14}px`);
			});
		};
		el.addEventListener('pointermove', onMove);
		return () => {
			el.removeEventListener('pointermove', onMove);
			if (frameRef.current) cancelAnimationFrame(frameRef.current);
		};
	}, []);

	// Scroll-driven fizzle. Native scrolling owns the position throughout;
	// snapping on scroll-end traps small wheel/trackpad gestures at the boundaries.
	//
	// Zones (y = scrollY, vh = innerHeight):
	//   fizzle  0 .. FIZZLE_VH*vh   static/glitch build, then the hero tears away.
	//   hold    .. + HOLD_VH*vh     Me is pinned and the drag hint flashes.
	//   free    beyond              normal scrolling.
	useEffect(() => {
		const root = rootRef.current;
		const monitor = monitorRef.current;
		if (!root) return;
		let raf = null;
		const dims = () => {
			const vh = Math.max(1, window.innerHeight);
			return { d1: vh * FIZZLE_VH, d2: vh * HOLD_VH };
		};

		const render = () => {
			raf = null;
			const { d1, d2 } = dims();
			const y = window.scrollY;
			const t = clamp01(y / d1);
			progressRef.current = t;

			// The panel holds its shape for the first stretch (resistance) while
			// the feedback layers ramp up immediately, then tears away.
			const panelOpacity = 1 - smoothstep(0.6, 0.98, t);
			// In the hardware study the whole screen physically lifts upward.
			// The independently layered film remains behind it and falls downward.
			root.style.opacity = hardwareReveal ? '1' : String(panelOpacity);
			// Pull out of the screen far enough to identify the complete monitor,
			// then carry its casing and the live hero upward as one physical object.
			const pullback = smoothstep(0, .3, t);
			const lift = smoothstep(.3, 1, t);
			// The casing's opening is fitted to the screen it surrounds. On a tall
			// viewport that would stretch it into a portrait tower, so the screen
			// narrows to a landscape window around the name as the camera pulls
			// back, and the casing is fitted to that window instead. Landscape
			// viewports already satisfy the ratio and are unchanged.
			const vw = window.innerWidth;
			const vh = Math.max(1, window.innerHeight);
			const windowHeight = Math.min(vh, vw / MONITOR_MIN_ASPECT);
			const portrait = windowHeight < vh;
			let windowTop = 0;
			if (portrait && hardwareReveal) {
				// offsetTop is unaffected by the transforms applied below.
				const name = root.querySelector('h1');
				let center = vh * .45;
				if (name) {
					center = name.offsetHeight / 2;
					for (let el = name; el && el !== root; el = el.offsetParent) center += el.offsetTop;
				}
				windowTop = Math.max(0, Math.min(vh - windowHeight, center - windowHeight / 2));
			}
			const clipTop = windowTop * pullback;
			const clipBottom = (vh - windowTop - windowHeight) * pullback;
			// A small landscape monitor can stay larger on a narrow screen.
			const shrink = portrait ? .2 : .45;
			const screenTransform = `translateY(${vh * (.16 * pullback - 1.2 * lift)}px) scale(${1 - shrink * pullback})`;
			root.style.transformOrigin = hardwareReveal ? '50% 0' : '';
			root.style.transform = hardwareReveal ? screenTransform : '';
			root.style.clipPath = hardwareReveal && portrait ? `inset(${clipTop}px 0 ${clipBottom}px 0)` : '';
			if (monitor) {
				monitor.style.top = `${clipTop}px`;
				monitor.style.bottom = `${clipBottom}px`;
				// Scale about the viewport's top edge, exactly like the hero.
				monitor.style.transformOrigin = `50% ${-clipTop}px`;
				monitor.style.transform = screenTransform;
				monitor.style.visibility = hardwareReveal && y > 0 && t < 1 ? 'visible' : 'hidden';
			}
			// The site nav reads this to fade its ink overlay out in step with
			// the hero (see components/header).
			document.documentElement.style.setProperty(
				'--hero-ink',
				panelOpacity.toFixed(3)
			);
			root.style.visibility = t >= 1 ? 'hidden' : 'visible';
			root.style.pointerEvents = t > 0.5 ? 'none' : 'auto';

			const content = contentRef.current;
			if (content) {
				content.style.opacity = String(1 - smoothstep(0.45, 0.85, t));
				content.style.transform = hardwareReveal ? '' : `translateY(${-(t * t) * 90}px) scale(${
					1 + t * 0.03
				})`;
				const blur = Math.max(0, t - 0.35) * 5;
				content.style.filter =
					t > 0
						? `blur(${blur.toFixed(2)}px) contrast(${1 + t * 0.6})`
						: '';
				content.classList.toggle('hero-jitter', t > 0.2 && t < 1);
			}

			// These layers live inside the transformed hero, so the original CRT
			// breakup travels within the monitor screen. Keep it running beneath
			// the screen's fade to black as the monitor recedes.
			const noiseProgress = hardwareReveal ? Math.min(t, .5) : t;
			const noise = Math.pow(Math.sin(noiseProgress * Math.PI), 0.7);
			staticRef.current.style.opacity = String(noise * 0.75);
			scanRef.current.style.opacity = String(noise * 0.55);
			rollRef.current.style.opacity = String(noise);
			// Dim the complete display, including the CRT effects, without fading
			// the casing or exposing the page through the screen.
			blackoutRef.current.style.opacity = hardwareReveal
				? String(smoothstep(.24, .6, t))
				: '0';

			const s = t >= 1 ? 0 : Math.round(clamp01(t / 0.6) * 10) / 10;
			setStorm((prev) => (prev === s ? prev : s));

			const zone =
				y <= 1 ? 'hero' : y < d1 ? 'fizzle' : y < d1 + d2 ? 'hold' : 'free';
			document.documentElement.dataset.heroZone = zone;
		};

		const onScroll = () => {
			if (raf == null) raf = requestAnimationFrame(render);
		};

		render();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
			if (raf != null) cancelAnimationFrame(raf);
			delete document.documentElement.dataset.heroZone;
			document.documentElement.style.removeProperty('--hero-ink');
			root.style.transform = '';
			root.style.transformOrigin = '';
			root.style.clipPath = '';
			if (monitor) {
				monitor.style.visibility = 'hidden';
				monitor.style.top = '';
				monitor.style.bottom = '';
				monitor.style.transformOrigin = '';
			}
		};
	}, [hardwareReveal]);

	// ---- Click / tap interactions -------------------------------------------

	const removeFx = (id) => setFx((prev) => prev.filter((f) => f.id !== id));

	const pulse = (x, y, reduced) => {
		setBurst((b) => b + 1);
		if (reduced) return;
		const base = ++fxIdRef.current * 100;
		const sparks = Array.from({ length: 12 }, (_, i) => {
			const angle = Math.random() * Math.PI * 2;
			const dist = 60 + Math.random() * 150;
			return {
				id: base + i,
				kind: 'spark',
				x,
				y,
				dx: Math.cos(angle) * dist,
				dy: Math.sin(angle) * dist,
				size: 3 + Math.random() * 5,
				dur: 500 + Math.random() * 450,
			};
		});
		setFx((prev) =>
			[
				...prev,
				{ id: base + 50, kind: 'flash', x, y },
				{ id: base + 51, kind: 'ring-3', x, y },
				{ id: base + 52, kind: 'ring2', x, y },
				...sparks,
			].slice(-120)
		);
		const grid = gridRef.current;
		if (grid) {
			grid.classList.remove('hero-shock');
			void grid.offsetWidth; // restart the animation
			grid.classList.add('hero-shock');
		}
	};

	// ---- Orb docking into the status pill --------------------------------------

	const handleDock = (x, y) => {
		setDocked(true);
		pulse(
			x,
			y,
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		);
		clearTimeout(dockTimerRef.current);
		dockTimerRef.current = setTimeout(() => ejectRef.current?.(), 8000);
	};

	const handleUndock = () => {
		clearTimeout(dockTimerRef.current);
		setDocked(false);
	};

	useEffect(() => () => clearTimeout(dockTimerRef.current), []);

	const powerCycle = () => {
		cycleRef.current = 'off';
		setCycle('off');
	};

	// Commands from the site terminal (`reboot`, `glitch` → pulse). The orb
	// handles `launch` itself.
	useEffect(() => {
		const onCommand = (e) => {
			if (e.detail === 'reboot') {
				window.scrollTo({ top: 0, behavior: 'instant' });
				if (cycleRef.current === 'idle') powerCycle();
			} else if (e.detail === 'pulse') {
				const r = rootRef.current?.getBoundingClientRect();
				if (r) pulse(r.width / 2, r.height / 2, false);
			}
		};
		window.addEventListener('hero:command', onCommand);
		return () => window.removeEventListener('hero:command', onCommand);
	}, []);

	const onScreenAnimationEnd = (e) => {
		if (e.target !== e.currentTarget) return;
		if (cycleRef.current === 'off') {
			cycleRef.current = 'boot';
			setCycle('boot');
		} else if (cycleRef.current === 'on') {
			cycleRef.current = 'idle';
			setCycle('idle');
		}
	};

	const onBootDone = () => {
		clearTimeout(dockTimerRef.current);
		setDocked(false);
		cycleRef.current = 'on';
		setScreenKey((k) => k + 1); // remount so the entrance animations replay
		setCycle('on');
	};

	const onPointerUp = (e) => {
		if (e.button !== 0) return;
		if (e.target.closest('a, button, .hero-orb')) return;
		if (cycleRef.current !== 'idle') return;
		if (progressRef.current > 0.05) return; // only while the hero is solid
		const rect = rootRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const now = performance.now();
		const last = lastTapRef.current;
		const isDouble =
			now - last.t < 320 && Math.hypot(x - last.x, y - last.y) < 40;
		lastTapRef.current = { t: isDouble ? 0 : now, x, y };
		const reduced = window.matchMedia(
			'(prefers-reduced-motion: reduce)'
		).matches;
		pulse(x, y, reduced);
		if (isDouble && !reduced) powerCycle();
	};

	// Capped by viewport height too, so short windows don't overflow.
	const nameSize = 'text-[min(clamp(3.5rem,14vw,11rem),16vh)]';

	const screenClass =
		cycle === 'off' || cycle === 'boot'
			? 'hero-crt-off'
			: cycle === 'on'
			? 'hero-crt-on'
			: '';

	return (
		<>
		{active && <div ref={monitorRef} className={monitorStyles.casing} aria-hidden='true'>
			{/* Generated illustration with a transparent opening for the live hero. */}
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src='/motion/monitor-casing.png' alt='' draggable='false'
				// This image is in the server-rendered HTML, so it can finish
				// loading (always, once cached) before React attaches onLoad.
				ref={(img) => { if (img?.complete && img.naturalWidth > 0) setMonitorReady(true); }}
				onLoad={() => setMonitorReady(true)} onError={() => setMonitorReady(false)} />
		</div>}
		<div
			ref={rootRef}
			onPointerUp={onPointerUp}
			className='hero-root fixed inset-0 z-10 select-none overflow-clip bg-ink font-geist text-white antialiased'>
			{/* Everything that "powers off" during a CRT cycle lives in here. */}
			<div
				key={screenKey}
				className={`absolute inset-0 ${screenClass}`}
				onAnimationEnd={onScreenAnimationEnd}>
				{/* Cursor-tracking aurora glow */}
				<div
					aria-hidden='true'
					className='pointer-events-none absolute -inset-40 opacity-70 blur-3xl'
					style={{
						animation: 'aurora-drift 18s ease-in-out infinite',
						background:
							'radial-gradient(45% 45% at var(--glow-x, 50%) var(--glow-y, 50%), rgba(57,189,109,0.45), transparent 70%), radial-gradient(35% 35% at 80% 20%, rgba(57,189,109,0.22), transparent 70%)',
					}}
				/>
				{/* Optional video artwork, behind the existing hero content. */}
				<HeroFilm />
				{/* Panning technical grid */}
				<div
					ref={gridRef}
					aria-hidden='true'
					className='pointer-events-none absolute inset-0 opacity-[0.14]'
					style={{
						animation: 'grid-pan 8s linear infinite',
						backgroundImage:
							'linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)',
						backgroundSize: '56px 56px',
						maskImage:
							'radial-gradient(120% 80% at 50% 0%, black, transparent 78%)',
						WebkitMaskImage:
							'radial-gradient(120% 80% at 50% 0%, black, transparent 78%)',
					}}
				/>
				{/* Hidden messages, revealed only inside the orb's light */}
				<div
					aria-hidden='true'
					className='hero-secrets pointer-events-none absolute inset-0 font-geist-mono text-xs tracking-[0.15em] text-white/80'>
					{SECRETS.map((sec) => (
						<span
							key={sec.text}
							className='absolute whitespace-nowrap'
							style={sec.style}>
							{sec.text}
						</span>
					))}
				</div>
				{/* Throwable orb + a small decorative one */}
				<Orb
					rootRef={rootRef}
					onDock={handleDock}
					onUndock={handleUndock}
					ejectRef={ejectRef}
				/>
				<div
					aria-hidden='true'
					className='pointer-events-none absolute left-[10%] top-[64%] h-1.5 w-1.5 rounded-full bg-primary/70 shadow-[0_0_20px_6px_rgba(57,189,109,0.4)]'
					style={{ animation: 'float-orb 8s ease-in-out infinite 1s' }}
				/>
				{/* Vignette */}
				<div
					aria-hidden='true'
					className='pointer-events-none absolute inset-0'
					style={{
						background:
							'radial-gradient(80% 60% at 50% 40%, transparent, rgba(8,9,11,0.85))',
					}}
				/>

				<div
					ref={contentRef}
					className='relative mx-auto flex h-full max-w-7xl flex-col px-6 will-change-transform sm:px-10'
					style={{ paddingTop: NAV_HEIGHT }}>
					<header
						className='hero-head flex items-center justify-between py-7'
						style={{ animation: 'fade-up 0.7s ease-out both' }}>
						<span className='font-geist-mono text-sm font-medium tracking-tight text-white'>
							hire<span className='text-primary'>jace</span>
						</span>
						<span className='hidden font-geist-mono text-xs uppercase tracking-[0.25em] text-white/45 sm:inline'>
							Columbus, Ohio
						</span>
					</header>

					{/* my-auto centers the block but, unlike justify-center, lets it
					    align to the top instead of overflowing when space is short. */}
					<div className='hero-body relative flex min-h-0 flex-1 flex-col pb-10 pt-6 sm:pb-20'>
						<div
							className='my-auto'
							style={{ transform: 'translate3d(var(--px, 0px), var(--py, 0px), 0)' }}>
							{/* Status pill */}
							<div
								className={`hero-pill mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/3 px-4 py-1.5 backdrop-blur-sm ${
									docked ? 'is-docked' : ''
								}`}
								style={{ animation: 'fade-up 0.7s ease-out 0.1s both' }}>
								<span className='relative flex h-2 w-2'>
									<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75' />
									<span className='hero-pill-dot relative inline-flex h-2 w-2 rounded-full bg-primary' />
								</span>
								{docked ? (
									<a
										href='#connect'
										className='hero-pill-link font-geist-mono text-xs tracking-wide text-primary'>
										signal received · let&apos;s talk →
									</a>
								) : (
									<span className='font-geist-mono text-xs tracking-wide text-white/70'>
										Available for new work
									</span>
								)}
							</div>

							{/* Name */}
							<h1 className='font-geist font-black leading-[0.86] tracking-tight'>
								<span className='block overflow-hidden'>
									<GlitchWord
										text={NAME_TOP}
										storm={storm}
										burst={burst}
										className={`block ${nameSize}`}
										style={{
											animation:
												'rise-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s both',
										}}
									/>
								</span>
								<span className='block overflow-hidden'>
									<GlitchWord
										text={NAME_BOTTOM}
										storm={storm}
										burst={burst}
										className={`block bg-linear-to-r from-primary via-emerald-300 to-primary bg-size-[200%_auto] bg-clip-text text-transparent ${nameSize}`}
										style={{
											animation:
												'rise-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s both, sheen 6s linear infinite',
										}}
									/>
								</span>
							</h1>

							{/* Typewriter role */}
							<div
								className='hero-role mt-7 flex items-center gap-3 font-geist-mono text-lg text-white/80 sm:text-2xl'
								style={{ animation: 'fade-up 0.7s ease-out 0.55s both' }}>
								<span className='text-primary'>&gt;</span>
								<span>{role}</span>
								<span
									className='inline-block h-[1.1em] w-[3px] translate-y-[2px] bg-primary'
									style={{ animation: 'caret-blink 1s step-end infinite' }}
								/>
							</div>

							<p
								className='hero-blurb mt-7 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg'
								style={{ animation: 'fade-up 0.7s ease-out 0.7s both' }}>
								I build web apps, mobile apps, and AI-powered products
								end to end — from clean React interfaces to resilient
								Node.js services.
							</p>

							{/* CTAs */}
							<div
								className='hero-ctas mt-10 flex flex-wrap items-center gap-4'
								style={{ animation: 'fade-up 0.7s ease-out 0.85s both' }}>
								<a
									href='#projects'
									className='group relative overflow-hidden rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5'>
									<span className='relative z-10'>View Work</span>
									<span
										aria-hidden='true'
										className='absolute inset-0 z-0'
										style={{
											animation: 'sheen 3.5s linear infinite',
											background:
												'linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.55) 50%, transparent 80%) 0% 0% / 200% 100%',
										}}
									/>
								</a>
								<a
									href={RESUME_DOWNLOAD_URL}
									className='rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/85 transition-colors duration-200 hover:border-primary/60 hover:text-white'>
									Download Resume
								</a>
								<div className='ml-1 flex items-center gap-5'>
									{SOCIALS.map((s) => (
										<a
											key={s.label}
											href={s.href}
											target='_blank'
											rel='noopener noreferrer'
											className='font-geist-mono text-xs uppercase tracking-[0.15em] text-white/45 underline-offset-4 transition-colors hover:text-primary hover:underline'>
											{s.label}
										</a>
									))}
								</div>
							</div>
						</div>

						{/* Interaction hint */}
						<div
							aria-hidden='true'
							className='pointer-events-none absolute bottom-3 right-0 hidden font-geist-mono text-[10px] uppercase tracking-[0.2em] text-white/30 sm:block'
							style={{ animation: 'fade-up 0.7s ease-out 1.3s both' }}>
							click · pulse &nbsp;/&nbsp; double-tap · reboot &nbsp;/&nbsp; orb · throw
						</div>
					</div>

					{/* Tech stack marquee */}
					<div
						className='relative -mx-6 overflow-hidden border-t border-white/10 py-5 sm:-mx-10'
						style={{ animation: 'fade-up 0.7s ease-out 1s both' }}>
						<div
							aria-hidden='true'
							className='pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-ink to-transparent'
						/>
						<div
							aria-hidden='true'
							className='pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-ink to-transparent'
						/>
						<div
							className='flex w-max gap-10 whitespace-nowrap font-geist-mono text-sm uppercase tracking-[0.2em] text-white/40'
							style={{ animation: 'marquee 26s linear infinite' }}>
							{[...STACK, ...STACK].map((item, i) => (
								<span key={i} className='flex items-center gap-10'>
									{item}
									<span className='text-primary/60'>/</span>
								</span>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Boot sequence between power-off and power-on */}
			{cycle === 'boot' && <BootSequence onDone={onBootDone} />}

			{/* Click pulse effects */}
			<div
				aria-hidden='true'
				className='pointer-events-none absolute inset-0 z-20 overflow-hidden'>
				{fx.map((f) => (
					<span
						key={f.id}
						className={`hero-fx hero-fx-${f.kind}`}
						style={{
							left: f.x,
							top: f.y,
							'--dx': f.dx != null ? `${f.dx}px` : undefined,
							'--dy': f.dy != null ? `${f.dy}px` : undefined,
							'--s': f.size != null ? `${f.size}px` : undefined,
							'--d': f.dur != null ? `${f.dur}ms` : undefined,
						}}
						onAnimationEnd={() => removeFx(f.id)}
					/>
				))}
			</div>

			{/* CRT fizzle layers (opacity driven by scroll) */}
			<div
				ref={scanRef}
				aria-hidden='true'
				className='hero-scanlines pointer-events-none absolute inset-0 z-20 opacity-0'
			/>
			<div
				ref={rollRef}
				aria-hidden='true'
				className='hero-roll pointer-events-none absolute inset-x-0 z-20 opacity-0'
			/>
			<div
				ref={staticRef}
				aria-hidden='true'
				className='hero-static pointer-events-none absolute inset-0 z-30 opacity-0'
			/>
			<div
				ref={blackoutRef}
				aria-hidden='true'
				className='hero-screen-blackout pointer-events-none absolute inset-0 z-40 bg-black opacity-0'
			/>
		</div>
		</>
	);
}
