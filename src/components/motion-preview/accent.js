/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionPreview } from './index';
import styles from './motion.module.css';

/** A film layer in existing whitespace, never part of document flow. */
export default function MotionAccent({ tone = 'light', variant = 'ribbon', reverse = false }) {
	const { active, paused } = useMotionPreview();
	const rootRef = useRef(null);
	const videoRef = useRef(null);
	const [near, setNear] = useState(false);
	const [failed, setFailed] = useState(false);

	useEffect(() => {
		if (!active || !rootRef.current) return;
		const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { rootMargin: '100px' });
		observer.observe(rootRef.current);
		return () => observer.disconnect();
	}, [active]);

	useEffect(() => {
		const video = videoRef.current;
		const root = rootRef.current;
		if (!active || !near || paused || failed || !video) {
			video?.pause();
			if (root) root.style.translate = '0 0';
			return;
		}
		let frame = 0;
		const position = () => {
			frame = 0;
			const rect = root.getBoundingClientRect();
			const progress = Math.max(-1, Math.min(1, (rect.top - window.innerHeight * .45) / window.innerHeight));
			root.style.translate = `${progress * (reverse ? -28 : 28)}px 0`;
		};
		const onScroll = () => { if (!frame) frame = requestAnimationFrame(position); };
		const playback = () => {
			if (document.hidden) video.pause();
			else video.play().catch(() => {});
		};
		playback();
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		document.addEventListener('visibilitychange', playback);
		return () => {
			video.pause();
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', onScroll);
			document.removeEventListener('visibilitychange', playback);
		};
	}, [active, near, paused, failed, reverse]);

	if (!active) return null;
	const name = variant === 'corner' ? 'emerald' : 'ribbon';
	return (
		<div className={`${styles.accentClip} ${tone === 'ink' ? styles.ink : ''}`} aria-hidden='true'>
			<div ref={rootRef} className={`${styles.accent} ${styles[variant]} ${reverse ? styles.reverse : ''}`}>
				{failed || !near ? <img src={`/motion/${name}-poster.jpg`} alt='' /> : (
					<video ref={videoRef} src={`/motion/${name}-loop.mp4`} poster={`/motion/${name}-poster.jpg`} muted loop playsInline preload='metadata' onError={() => setFailed(true)} />
				)}
			</div>
		</div>
	);
}
