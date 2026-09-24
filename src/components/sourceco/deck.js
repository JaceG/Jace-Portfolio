'use client';
/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from 'react';
import Section from '../section';
import { SC_DECK } from '@/constants/sourceco';

const SLIDES = SC_DECK.map((alt, i) => ({
	src: `/sourceco/deck/slide-${i + 1}.jpg`,
	alt,
}));
const SWIPE_PX = 40;

function Arrow({ dir }) {
	return (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={3} className='size-6' aria-hidden='true'>
			<path strokeLinecap='round' strokeLinejoin='round' d={dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
		</svg>
	);
}

/**
 * The slide strip. Follows the finger while dragging, snaps on release.
 * `axis` is 'y' when the viewer is CSS-rotated, so a sideways swipe on the
 * turned phone still reads as horizontal on the slide.
 */
function Strip({ index, setIndex, axis = 'x', fit = 'width' }) {
	const ref = useRef(null);
	const start = useRef(null);
	// Drag distance in px (for the swipe threshold) and as a % of the strip.
	const [drag, setDrag] = useState({ px: 0, pct: 0 });

	const onDown = (e) => {
		start.current = { x: e.clientX, y: e.clientY, id: e.pointerId, locked: null };
	};
	const onMove = (e) => {
		const s = start.current;
		if (!s || s.id !== e.pointerId) return;
		const dx = e.clientX - s.x;
		const dy = e.clientY - s.y;
		const along = axis === 'x' ? dx : dy;
		const across = axis === 'x' ? dy : dx;
		if (s.locked === null && Math.hypot(dx, dy) > 8) {
			s.locked = Math.abs(along) > Math.abs(across);
			if (s.locked) ref.current?.setPointerCapture?.(e.pointerId);
		}
		if (s.locked) {
			// offsetWidth is the pre-transform width, i.e. the slide's own x
			// axis, whether or not the viewer is rotated.
			const width = ref.current?.offsetWidth || 1;
			setDrag({ px: along, pct: (along / width) * 100 });
		}
	};
	const onUp = (e) => {
		const s = start.current;
		start.current = null;
		if (!s || s.id !== e.pointerId || !s.locked) return setDrag({ px: 0, pct: 0 });
		if (drag.px <= -SWIPE_PX) setIndex((i) => Math.min(SLIDES.length - 1, i + 1));
		else if (drag.px >= SWIPE_PX) setIndex((i) => Math.max(0, i - 1));
		setDrag({ px: 0, pct: 0 });
	};

	return (
		<div
			ref={ref}
			onPointerDown={onDown}
			onPointerMove={onMove}
			onPointerUp={onUp}
			onPointerCancel={onUp}
			className='relative h-full w-full overflow-hidden select-none'
			style={{ touchAction: axis === 'x' ? 'pan-y' : 'none' }}>
			<div
				className='flex h-full'
				style={{
					transform: `translateX(${-index * 100 + drag.pct}%)`,
					transition: drag.px ? 'none' : 'transform 180ms ease-out',
				}}>
				{SLIDES.map((s, i) => (
					<div key={s.src} className='flex h-full w-full shrink-0 items-center justify-center'>
						<img
							src={s.src}
							alt={s.alt}
							draggable={false}
							loading={i < 2 ? 'eager' : 'lazy'}
							className={fit === 'width' ? 'block w-full h-auto' : 'block max-h-full max-w-full object-contain'}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

function Controls({ index, setIndex, dark, children }) {
	const btn = `flex size-11 items-center justify-center rounded-sm ${
		dark ? 'bg-white/15 text-white' : 'bg-[#39bb6a] text-white'
	} disabled:opacity-30`;
	return (
		<div className='flex items-center justify-center gap-4'>
			<button type='button' className={btn} aria-label='Previous slide' disabled={index === 0} onClick={() => setIndex((i) => Math.max(0, i - 1))}>
				<Arrow dir='prev' />
			</button>
			<span className={`min-w-14 text-center font-black tabular-nums ${dark ? 'text-white' : 'text-[#39bb6a]'}`} aria-live='polite'>
				{index + 1} / {SLIDES.length}
			</span>
			<button type='button' className={btn} aria-label='Next slide' disabled={index === SLIDES.length - 1} onClick={() => setIndex((i) => Math.min(SLIDES.length - 1, i + 1))}>
				<Arrow dir='next' />
			</button>
			{children}
		</div>
	);
}

export default function Deck() {
	const [index, setIndex] = useState(0);
	const [full, setFull] = useState(false);
	// CSS rotation is the fallback for browsers (iPhone Safari) that can't
	// lock orientation. It only applies while the phone is held upright;
	// turning the phone for real hands control back to the OS.
	const [cssTurn, setCssTurn] = useState(false);
	const [vp, setVp] = useState({ w: 0, h: 0 });
	const overlayRef = useRef(null);
	const sectionRef = useRef(null);

	useEffect(() => {
		const size = () => setVp({ w: window.innerWidth, h: window.innerHeight });
		size();
		window.addEventListener('resize', size);
		window.addEventListener('orientationchange', size);
		return () => {
			window.removeEventListener('resize', size);
			window.removeEventListener('orientationchange', size);
		};
	}, []);

	const close = useCallback(async () => {
		setFull(false);
		setCssTurn(false);
		try {
			screen.orientation?.unlock?.();
		} catch {}
		try {
			if (document.fullscreenElement) await document.exitFullscreen();
		} catch {}
	}, []);

	const openFull = () => {
		// Touch devices get the CSS turn right away. It only applies while the
		// screen is portrait, so where the orientation lock below works
		// (Android) the screen goes landscape and the turn switches itself off.
		// iPhone Safari can't lock (and its fullscreen request may never
		// settle), which is why nothing waits on it.
		const touch =
			navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
		setCssTurn(touch);
		setFull(true);
		requestAnimationFrame(() => {
			const el = overlayRef.current;
			if (!el?.requestFullscreen) return;
			el.requestFullscreen({ navigationUI: 'hide' })
				.then(() => screen.orientation?.lock?.('landscape'))
				.catch(() => {});
		});
	};

	// Leaving browser fullscreen (Esc, back gesture) closes the viewer too.
	const wasFullscreen = useRef(false);
	useEffect(() => {
		const onFs = () => {
			if (document.fullscreenElement) wasFullscreen.current = true;
			else if (wasFullscreen.current) {
				wasFullscreen.current = false;
				close();
			}
		};
		document.addEventListener('fullscreenchange', onFs);
		return () => document.removeEventListener('fullscreenchange', onFs);
	}, [close]);

	// Arrow keys work while the deck is on screen or open full screen.
	useEffect(() => {
		const onKey = (e) => {
			if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
			if (!full) {
				const r = sectionRef.current?.getBoundingClientRect();
				if (!r || r.bottom < 0 || r.top > window.innerHeight) return;
			}
			if (e.key === 'ArrowRight') setIndex((i) => Math.min(SLIDES.length - 1, i + 1));
			else if (e.key === 'ArrowLeft') setIndex((i) => Math.max(0, i - 1));
			else if (e.key === 'Escape' && full) close();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [full, close]);

	// Lock page scroll behind the viewer.
	useEffect(() => {
		if (!full) return;
		const prev = document.documentElement.style.overflow;
		document.documentElement.style.overflow = 'hidden';
		return () => {
			document.documentElement.style.overflow = prev;
		};
	}, [full]);

	const turned = cssTurn && vp.h > vp.w;
	const stage = turned
		? {
				position: 'fixed',
				top: 0,
				left: 0,
				width: vp.h,
				height: vp.w,
				transformOrigin: 'top left',
				transform: `translateX(${vp.w}px) rotate(90deg)`,
		  }
		: { position: 'fixed', inset: 0 };

	return (
		<Section>
			<div ref={sectionRef} className='bg-white py-24 flex flex-col items-center'>
				<h1 className='text-center sm:text-9xl text-6xl font-bold text-[#39bb6a] uppercase mb-4'>
					Deck
				</h1>
				<p className='mb-12 px-8 text-center text-lg text-black/70'>
					An n8n library for SourceCo&apos;s GTM stack. Swipe through it.
				</p>

				<div className='relative w-[calc(100vw-72px)] max-w-[1000px]'>
					<div className='absolute inset-0 border-8 border-[#39bb6a]' aria-hidden='true' />
					<div className='relative bottom-6 left-6 bg-[#2d3a2e]' data-no-terminal>
						<Strip index={index} setIndex={setIndex} />
					</div>
				</div>

				<div className='mt-10 flex flex-col items-center gap-6'>
					<Controls index={index} setIndex={setIndex} />
					<button
						type='button'
						onClick={openFull}
						className='flex items-center gap-3 rounded-sm bg-black px-8 py-4 text-base font-black uppercase tracking-[-0.04em] text-white'>
						<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} className='size-5' aria-hidden='true'>
							<rect x='6' y='2.5' width='12' height='19' rx='2' />
							<path strokeLinecap='round' d='M2.5 9a8 8 0 0 1 3-5.5M21.5 15a8 8 0 0 1-3 5.5' />
						</svg>
						<span className='sm:hidden'>Turn sideways</span>
						<span className='hidden sm:inline'>Full screen</span>
					</button>
				</div>
			</div>

			{full && (
				<div ref={overlayRef} className='fixed inset-0 z-50 bg-black' data-no-terminal role='dialog' aria-modal='true' aria-label='Deck, full screen'>
					<div style={stage} className='flex flex-col'>
						<div className='min-h-0 flex-1'>
							<Strip index={index} setIndex={setIndex} axis={turned ? 'y' : 'x'} fit='contain' />
						</div>
						<div className='flex items-center justify-center gap-4 py-3'>
							<Controls index={index} setIndex={setIndex} dark>
								<button type='button' onClick={close} className='ml-4 rounded-sm bg-white px-5 py-2.5 font-black uppercase tracking-[-0.04em] text-black'>
									Close
								</button>
							</Controls>
						</div>
					</div>
				</div>
			)}
		</Section>
	);
}
