/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './film.module.css';
import { FIZZLE_VH } from './constants';
import { useMotionPreview } from '../motion-preview';

/** An additive artwork preview. It never changes the existing hero layout. */
export default function HeroFilm() {
	const videoRef = useRef(null);
	const { active, paused } = useMotionPreview();
	const [failed, setFailed] = useState(false);

	useEffect(() => {
		const video = videoRef.current;
		if (!video || !active || paused || failed) { video?.pause(); return; }
		const update = () => {
			// The existing hero is fixed; pause after its scroll dissolution.
			if (document.hidden || window.scrollY >= window.innerHeight * FIZZLE_VH) video.pause();
			else video.play().catch(() => {});
		};
		update();
		window.addEventListener('scroll', update, { passive: true });
		document.addEventListener('visibilitychange', update);
		return () => {
			video.pause();
			window.removeEventListener('scroll', update);
			document.removeEventListener('visibilitychange', update);
		};
	}, [active, paused, failed]);

	if (!active) return null;
	return (
		<>
			<div className={styles.art} aria-hidden='true'>
				{failed ? <img className={styles.film} src='/motion/emerald-poster.jpg' alt='' /> :
					<video ref={videoRef} className={styles.film} src='/motion/emerald-loop.mp4' poster='/motion/emerald-poster.jpg' muted loop playsInline preload='metadata' onError={() => setFailed(true)} />}
			</div>
		</>
	);
}
