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
			// The film is 16:9 with hardware in its outer thirds and an open
			// center. Never stretch it to the viewport: match the canvas to the
			// frame's aspect and choose what to show instead.
			const vw = video.videoWidth;
			const vh = video.videoHeight;
			const aspect = root.clientWidth / Math.max(1, root.clientHeight);
			const wide = aspect >= vw / vh;
			const cw = wide ? vw : Math.max(2, Math.round(vh * aspect));
			const ch = wide ? Math.max(2, Math.round(vw / aspect)) : vh;
			if (canvas.width !== cw || canvas.height !== ch) {
				canvas.width = cw;
				canvas.height = ch;
			}
			// When the cut reaches into the hardware bands (phones), the CSS
			// fades the center so the two halves never meet in a hard seam.
			root.dataset.narrow = String(aspect < (vw / vh) * .6);
			// One atomic replacement, including alpha: clear and redraw inside
			// this single task, so the canvas is never presented empty. Do not
			// rely on the 'copy' composite mode to erase the previous frame;
			// iOS WebKit ignores it for video with alpha, so transparent pixels
			// kept the old artwork and every moving part left a trail of copies.
			context.globalCompositeOperation = 'source-over';
			context.clearRect(0, 0, cw, ch);
			if (wide) {
				// Wider than the film: full width, trimmed evenly top and bottom.
				context.drawImage(video, 0, Math.round((vh - ch) / 2), vw, ch, 0, 0, cw, ch);
			} else {
				// Narrower: keep the left and right bands at the screen edges and
				// drop the middle, which is open space until the viewport is tall.
				const left = Math.ceil(cw / 2);
				const right = cw - left;
				context.drawImage(video, 0, 0, left, vh, 0, 0, left, vh);
				context.drawImage(video, vw - right, 0, right, vh, left, 0, right, vh);
			}
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
		const onResize = () => { schedule(); schedulePaint(); };
		window.addEventListener('resize', onResize);
		document.addEventListener('visibilitychange', onVisibility);
		// WebKit (Safari, and every browser on iOS) cannot composite the alpha
		// plane of a VP9 WebM, so it gets the same film as HEVC-with-alpha.
		// GestureEvent only exists in WebKit. Checked here, after the listeners
		// are attached, so the first loadeddata cannot be missed.
		const webkit = 'GestureEvent' in window && video.canPlayType('video/mp4; codecs="hvc1"') !== '';
		video.src = `/motion/transitions/hardware-reveal.${webkit ? 'mp4' : 'webm'}`;
		video.load();
		// iOS does not fetch or decode media for a video that has never played,
		// so seeking would have nothing to present. A muted inline play/pause
		// opens the decoder; scroll position still drives every visible frame.
		if (webkit) video.play().then(() => video.pause()).catch(() => {});
		if (video.readyState >= 2) schedulePaint();
		update();
		return () => {
			cancelAnimationFrame(frame);
			cancelAnimationFrame(paintFrame);
			video.removeEventListener('loadeddata', schedulePaint);
			video.removeEventListener('seeked', schedulePaint);
			video.removeEventListener('error', onError);
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', onResize);
			document.removeEventListener('visibilitychange', onVisibility);
			video.removeAttribute('src');
			video.load();
			onReady(false);
		};
	}, [running, onReady]);

	if (!running) return null;
	return <div ref={rootRef} className={styles.frame} data-hardware-reveal aria-hidden='true'>
		<canvas ref={canvasRef} className={styles.film} />
		<video ref={videoRef} className={styles.decoder}
			muted playsInline preload='auto' disablePictureInPicture tabIndex={-1} />
	</div>;
}
