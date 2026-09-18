'use client';

import { useEffect, useRef } from 'react';
import { FIZZLE_VH, HOLD_VH } from '../hero/constants';
import styles from './hardware-reveal.module.css';

/** A transparent Seedance film behind the lifting hero and in front of ME. */
export default function HardwareReveal({ running, onReady }) {
	const rootRef = useRef(null);
	const videoRef = useRef(null);
	const canvasRef = useRef(null);

	useEffect(() => {
		if (!running) return;
		const root = rootRef.current;
		const video = videoRef.current;
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d', { alpha: true });
		if (!context) return;
		let frame = 0;
		let paintFrame = 0;
		let failed = false;
		let ready = false;
		let target = 0;
		const seek = () => {
			// Finish presenting a decoded frame before asking the decoder to move.
			if (failed || paintFrame || video.readyState < 2 || video.seeking || !Number.isFinite(video.duration)) return;
			const time = target * Math.max(0, video.duration - .05);
			if (Math.abs(video.currentTime - time) > 1 / 30) video.currentTime = time;
		};
		const update = () => {
			frame = 0;
			const progress = window.scrollY / (Math.max(1, window.innerHeight) * (FIZZLE_VH + HOLD_VH));
			target = Math.max(0, Math.min(1, progress));
			root.dataset.progress = target.toFixed(3);
			// The canvas retains a complete frame throughout every pending seek.
			root.style.visibility = !document.hidden && !failed && ready && progress > 0 && progress < 1 ? 'visible' : 'hidden';
			seek();
		};
		const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
		const paint = () => {
			paintFrame = 0;
			if (failed || document.hidden || video.seeking || video.readyState < 2) return;
			// A direct ME link can load the media partway through the intro.
			// Decode that position before making the artwork visible for the first time.
			const wanted = target * Math.max(0, video.duration - .05);
			if (!ready && Math.abs(video.currentTime - wanted) > 1 / 30) { seek(); return; }
			if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;
			}
			// One atomic replacement, including alpha. Never clear the visible
			// canvas while waiting for a video frame or display the seeking video.
			context.globalCompositeOperation = 'copy';
			context.drawImage(video, 0, 0, canvas.width, canvas.height);
			root.dataset.frameTime = video.currentTime.toFixed(3);
			if (!ready) { ready = true; onReady(true); }
			update();
		};
		const schedulePaint = () => { if (!paintFrame) paintFrame = requestAnimationFrame(paint); };
		const onVisibility = () => { schedule(); if (!document.hidden) schedulePaint(); };
		const onError = () => { failed = true; onReady(false); root.style.visibility = 'hidden'; };
		video.addEventListener('loadeddata', schedulePaint);
		video.addEventListener('seeked', schedulePaint);
		video.addEventListener('error', onError);
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);
		document.addEventListener('visibilitychange', onVisibility);
		if (video.readyState >= 2) schedulePaint();
		update();
		return () => {
			cancelAnimationFrame(frame);
			cancelAnimationFrame(paintFrame);
			video.removeEventListener('loadeddata', schedulePaint);
			video.removeEventListener('seeked', schedulePaint);
			video.removeEventListener('error', onError);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
			document.removeEventListener('visibilitychange', onVisibility);
			onReady(false);
		};
	}, [running, onReady]);

	if (!running) return null;
	return <div ref={rootRef} className={styles.frame} data-hardware-reveal aria-hidden='true'>
		<canvas ref={canvasRef} className={styles.film} />
		<video ref={videoRef} className={styles.decoder}
			src='/motion/transitions/hardware-reveal.webm'
			muted playsInline preload='auto' disablePictureInPicture tabIndex={-1} />
	</div>;
}
