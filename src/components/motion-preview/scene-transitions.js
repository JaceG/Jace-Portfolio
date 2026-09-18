'use client';

import { useEffect, useRef } from 'react';
import styles from './scene-transitions.module.css';

const SCENES = [
	{ id: 'github', immersive: true, source: 'me-journey' },
];
const clamp = (n) => Math.max(0, Math.min(1, n));
const smooth = (a, b, n) => { const t = clamp((n - a) / (b - a)); return t * t * (3 - 2 * t); };

/** Seedance films scrub with native scrolling; ME has its own opt-in scroll interval. */
export default function SceneTransitions({ running, onJourneyReady }) {
	const rootRef = useRef(null);

	useEffect(() => {
		if (!running) return;
		const root = rootRef.current;
		const entries = SCENES.map(({ id, ink, immersive, source }) => ({
			id, ink, immersive, source,
			section: document.getElementById(id),
			space: document.querySelector(`[data-transition-track="${id}"]`),
			video: root.querySelector(`[data-film="${id}"]`),
			top: 0, target: 0, loaded: false, failed: false,
		})).filter((entry) => entry.section);
		let frame = 0, active = null, replay = null;
		let previousY = window.scrollY;
		let scrolling = false;
		let suppressUntil = performance.now() + 500;
		const clear = () => {
			root.style.visibility = 'hidden';
			root.dataset.transitionState = 'idle';
			root.dataset.progress = '0';
			for (const entry of entries) entry.video.style.opacity = '0';
			active = null;
		};
		const measure = () => {
			for (const entry of entries) {
				entry.top = entry.section.getBoundingClientRect().top + window.scrollY;
				const bounds = entry.space?.getBoundingClientRect();
				entry.start = bounds ? bounds.top + window.scrollY - window.innerHeight * .94 : 0;
				entry.end = bounds ? bounds.bottom + window.scrollY - 64 : 0;
			}
		};
		const load = (entry) => {
			if (entry.loaded || entry.failed) return;
			entry.loaded = true;
			entry.mobileSource = entry.immersive && window.innerWidth < 768;
			const mobile = entry.mobileSource ? '-mobile' : '';
			entry.video.src = `/motion/transitions/${entry.source || entry.id}${mobile}.mp4`;
			entry.video.load();
		};
		const seek = (entry) => {
			const video = entry.video;
			if (entry.failed || video.readyState < 2 || video.seeking || !Number.isFinite(video.duration)) return;
			const time = entry.target * Math.max(0, video.duration - .05);
			if (Math.abs(video.currentTime - time) > 1 / 30) video.currentTime = time;
		};
		const draw = (entry, progress, isReplay) => {
			if (active !== entry) { clear(); active = entry; }
			load(entry);
			entry.target = progress;
			const hasFrame = entry.video.readyState >= 2;
			seek(entry);
			if (entry.failed || !hasFrame) return;
			root.style.visibility = 'visible';
			root.dataset.transitionState = isReplay ? 'replay' : 'scroll';
			root.dataset.section = entry.id;
			root.dataset.ink = String(Boolean(entry.ink));
			root.dataset.immersive = String(Boolean(entry.immersive));
			root.dataset.progress = progress.toFixed(3);
			// Constrain every film to its own interval in the page. Neither the
			// preceding paragraph nor the incoming heading can be covered by it.
			const bounds = entry.space?.getBoundingClientRect();
			const top = isReplay || !bounds ? 0 : Math.max(0, bounds.top - 64);
			const bottom = isReplay || !bounds ? 0 : Math.max(0, window.innerHeight - bounds.bottom);
			root.style.clipPath = `inset(${top}px 0 ${bottom}px 0)`;
			if (entry.immersive) {
				// The new ME film occupies the frame in its original colors, at full strength.
				root.style.opacity = String(smooth(0, .09, progress) * (1 - smooth(.91, 1, progress)));
				entry.video.style.opacity = '1';
			} else {
				root.style.opacity = '1';
				entry.video.style.opacity = String(smooth(0, .12, progress) * (1 - smooth(.79, 1, progress)));
			}
		};
		const update = (now) => {
			frame = 0;
			if (document.hidden) { clear(); return; }
			if (replay) {
				if (replay.entry.failed) { replay = null; clear(); return; }
				// Start the clock only once the film can show its opening frame.
				if (replay.start === null && replay.entry.video.readyState >= 2) replay.start = now;
				const duration = replay.entry.immersive ? 9000 : 3600;
				const progress = replay.start === null ? 0 : (now - replay.start) / duration;
				if (progress >= 1) { replay = null; scrolling = false; clear(); return; }
				draw(replay.entry, progress, true);
				frame = requestAnimationFrame(update);
				return;
			}
			if (!scrolling) { clear(); return; }
			const candidate = entries.map((entry) => ({
				entry,
				progress: (window.scrollY - entry.start) / Math.max(1, entry.end - entry.start),
			})).find(({ progress }) => progress > 0 && progress < 1);
			if (!candidate) { clear(); return; }
			draw(candidate.entry, candidate.progress, false);
		};
		const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
		const dismiss = () => { replay = null; scrolling = false; clear(); };
		const onScroll = () => {
			const distance = Math.abs(window.scrollY - previousY);
			previousY = window.scrollY;
			if (performance.now() < suppressUntil) { dismiss(); return; }
			if (distance > window.innerHeight * 1.5) dismiss();
			else if (distance > 0) { scrolling = true; replay = null; }
			schedule();
		};
		const onResize = () => {
			for (const entry of entries) {
				if (entry.immersive && entry.loaded && entry.mobileSource !== (window.innerWidth < 768)) {
					entry.loaded = false;
					if (active === entry) clear();
					load(entry);
				}
			}
			measure(); schedule();
		};
		const onReplay = (event) => {
			if (document.hidden || !entries.length) return;
			const entry = entries.find((entry) => entry.id === event.detail?.section) || entries.reduce((best, entry) => Math.abs(entry.top - window.scrollY) < Math.abs(best.top - window.scrollY) ? entry : best, entries[0]);
			load(entry);
			replay = { entry, start: null };
			schedule();
		};
		const onHashChange = () => {
			if (window.location.hash === '#me-transition-space') {
				measure(); scrolling = true; suppressUntil = 0; schedule();
			} else { suppressUntil = performance.now() + 600; dismiss(); }
		};
		const onNavigation = (event) => {
			// Let existing smooth anchor navigation land cleanly.
			if (event.target.closest('a[href*="#"]')) { suppressUntil = performance.now() + 1800; dismiss(); }
		};
		const onKeyDown = (event) => { if (event.key === 'Escape') dismiss(); };
		const onVisibility = () => { if (document.hidden) dismiss(); };
		const mediaListeners = entries.map((entry) => {
			const onReady = () => {
				if (entry.immersive) {
					onJourneyReady(true);
					if (window.location.hash === '#me-transition-space') scrolling = true;
				}
				seek(entry); schedule();
			};
			const onSeeked = () => { seek(entry); if (active === entry) schedule(); };
			const onError = () => { entry.failed = true; if (entry.immersive) onJourneyReady(false); if (active === entry) dismiss(); };
			entry.video.addEventListener('loadeddata', onReady);
			entry.video.addEventListener('seeked', onSeeked);
			entry.video.addEventListener('error', onError);
			return () => {
				entry.video.removeEventListener('loadeddata', onReady);
				entry.video.removeEventListener('seeked', onSeeked);
				entry.video.removeEventListener('error', onError);
			};
		});
		measure();
		const nearby = new IntersectionObserver((observed) => {
			for (const observation of observed) {
				if (observation.isIntersecting) load(entries.find((entry) => (entry.space || entry.section) === observation.target));
			}
		}, { rootMargin: '1400px' });
		entries.forEach((entry) => nearby.observe(entry.space || entry.section));
		const resizeObserver = new ResizeObserver(onResize);
		const main = document.querySelector('[data-motion-page]');
		if (main) resizeObserver.observe(main);
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onResize);
		window.addEventListener('portfolio:replay-transition', onReplay);
		window.addEventListener('hashchange', onHashChange);
		window.addEventListener('keydown', onKeyDown);
		document.addEventListener('click', onNavigation);
		document.addEventListener('visibilitychange', onVisibility);
		main?.addEventListener('focusin', dismiss);
		return () => {
			cancelAnimationFrame(frame);
			nearby.disconnect();
			resizeObserver.disconnect();
			mediaListeners.forEach((remove) => remove());
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
			window.removeEventListener('portfolio:replay-transition', onReplay);
			window.removeEventListener('hashchange', onHashChange);
			window.removeEventListener('keydown', onKeyDown);
			document.removeEventListener('click', onNavigation);
			document.removeEventListener('visibilitychange', onVisibility);
			main?.removeEventListener('focusin', dismiss);
			clear();
			onJourneyReady(false);
		};
	}, [running, onJourneyReady]);

	if (!running) return null;
	return <div ref={rootRef} className={styles.scene} data-section-transition aria-hidden='true'>
		{SCENES.map(({ id }) => <video
			key={id}
			data-film={id}
			className={styles.film}
			preload='none' muted playsInline disablePictureInPicture tabIndex={-1}
		/>)}
	</div>;
}
