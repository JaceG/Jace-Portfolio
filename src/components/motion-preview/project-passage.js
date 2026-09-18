'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionPreview } from './index';
import TransitionSpace from './transition-space';
import { clamp, flightPanels, smooth } from './project-flight.mjs';
import styles from './project-passage.module.css';

function mix(a, b, t) {
	return `rgb(${a.map((value, i) => Math.round(value + (b[i] - value) * t)).join(',')})`;
}

// Cache the real screenshot inside a simple window frame. No generated or
// hard-coded screenshot list, no image readback, and no runtime 3D scene.
function screenshotPanel(image, title) {
	const panel = document.createElement('canvas');
	panel.width = 1000;
	panel.height = 650;
	const ctx = panel.getContext('2d');
	ctx.fillStyle = '#f3f3eb';
	ctx.beginPath(); ctx.roundRect(0, 0, 1000, 650, 10); ctx.fill();
	ctx.fillStyle = '#c4d0c5';
	for (let i = 0; i < 3; i++) {
		ctx.beginPath(); ctx.arc(25 + i * 16, 23, 4, 0, Math.PI * 2); ctx.fill();
	}
	ctx.fillStyle = '#e6eae5'; ctx.fillRect(14, 43, 972, 540);
	const scale = Math.min(972 / image.naturalWidth, 540 / image.naturalHeight);
	const w = image.naturalWidth * scale, h = image.naturalHeight * scale;
	ctx.drawImage(image, 14 + (972 - w) / 2, 43 + (540 - h) / 2, w, h);
	ctx.fillStyle = '#12281c';
	ctx.font = 'bold 24px sans-serif';
	ctx.fillText(title, 24, 625, 910);
	ctx.strokeStyle = '#adc3b2'; ctx.lineWidth = 2;
	ctx.strokeRect(1, 1, 998, 648);
	return panel;
}

function ScreenshotFlight({ projects }) {
	const rootRef = useRef(null);
	const canvasRef = useRef(null);
	const videoRef = useRef(null);
	useEffect(() => {
		const root = rootRef.current, canvas = canvasRef.current, video = videoRef.current;
		const ctx = canvas.getContext('2d', { alpha: false });
		if (!ctx) return;
		const track = root.closest('[data-transition-track]');
		const page = document.querySelector('[data-motion-page]');
		const film = document.createElement('canvas');
		const filmContext = film.getContext('2d');
		const images = new Map();
		let frame = 0, disposed = false, filmLoaded = false, filmReady = false;
		let width = 0, height = 0, start = 0, distance = 1, target = 0;
		const measure = () => {
			const rect = root.getBoundingClientRect();
			width = rect.width; height = rect.height;
			const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
			const w = Math.round(width * ratio), h = Math.round(height * ratio);
			if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
			const bounds = track.getBoundingClientRect();
			start = bounds.top + window.scrollY - 64;
			// Continue the final outward sweep as the sticky stage leaves, so
			// the reading buffer is clear space rather than a whole empty screen.
			distance = Math.max(1, bounds.height - height * .2);
		};
		const requestImage = (index) => {
			if (images.has(index)) return;
			const image = new Image();
			const entry = { image, panel: null, failed: false };
			images.set(index, entry);
			image.decoding = 'async';
			image.onload = () => {
				if (disposed || images.get(index) !== entry) return;
				entry.panel = screenshotPanel(image, projects[index].title);
				entry.image = null;
				schedule();
			};
			image.onerror = () => { entry.failed = true; schedule(); };
			image.src = projects[index].image;
		};
		const seek = () => {
			if (!filmLoaded || video.readyState < 2 || video.seeking || !Number.isFinite(video.duration)) return;
			const time = target * Math.max(0, video.duration - .05);
			if (Math.abs(video.currentTime - time) > 1 / 30) video.currentTime = time;
		};
		const paint = () => {
			frame = 0;
			if (disposed || document.hidden || !width || !height) return;
			const relative = window.scrollY - start;
			if (relative < -window.innerHeight * 2 || relative > distance + window.innerHeight * 2) return;
			target = clamp(relative / distance);
			const panels = flightPanels(projects.length, target, width, height);
			// Keep at most a handful of decoded panels in memory even for a large
			// catalog. Preload the next wave; scroll-back can reload previous waves.
			const center = Math.floor(.6 + target * (Math.ceil(projects.length / 2) + .8)) * 2;
			const first = Math.max(0, center - 8), last = Math.min(projects.length, center + 8);
			for (let i = first; i < last; i++) requestImage(i);
			for (const [index, entry] of images) {
				if (index < first - 2 || index > last + 2) {
					if (entry.image) { entry.image.onload = null; entry.image.onerror = null; entry.image.src = ''; }
					images.delete(index);
				}
			}
			if (!filmLoaded) { filmLoaded = true; video.src = '/motion/transitions/projects.mp4'; video.load(); }
			ctx.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
			const entry = smooth(0, .14, target), exit = smooth(.8, 1, target);
			const dark = [9, 27, 20], green = [57, 189, 109];
			const base = target < .5 ? mix([255, 255, 255], dark, entry) : mix(dark, green, exit);
			ctx.fillStyle = base; ctx.fillRect(0, 0, width, height);
			if (filmReady) {
				ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = .4 * entry * (1 - exit);
				const scale = Math.max(width / film.width, height / film.height);
				ctx.drawImage(film, (width - film.width * scale) / 2, (height - film.height * scale) / 2, film.width * scale, film.height * scale);
				ctx.restore();
			}
			const shown = [];
			for (const panel of panels) {
				const picture = images.get(panel.index)?.panel;
				if (!picture) continue;
				ctx.save();
				ctx.globalAlpha = panel.opacity;
				ctx.translate(panel.x, panel.y); ctx.rotate(panel.rotation);
				ctx.transform(1, panel.shear, 0, 1, 0, 0);
				ctx.shadowColor = '#00000065'; ctx.shadowBlur = 30 * panel.depth;
				ctx.shadowOffsetY = 16 * panel.depth;
				ctx.drawImage(picture, -panel.width / 2, -panel.width * .65 / 2, panel.width, panel.width * .65);
				ctx.restore();
				shown.push(projects[panel.index].slug);
			}
			root.dataset.progress = target.toFixed(3);
			root.dataset.visibleProjects = shown.join(',');
			root.dataset.cachedPanels = String(images.size);
			seek();
		};
		const schedule = () => { if (!disposed && !frame) frame = requestAnimationFrame(paint); };
		const captureFilm = () => {
			if (disposed || video.seeking || video.readyState < 2) return;
			if (film.width !== video.videoWidth) { film.width = video.videoWidth; film.height = video.videoHeight; }
			filmContext.drawImage(video, 0, 0); filmReady = true;
			schedule();
		};
		const resize = () => { measure(); schedule(); };
		const observer = new ResizeObserver(resize);
		observer.observe(root); observer.observe(page);
		video.addEventListener('loadeddata', captureFilm);
		video.addEventListener('seeked', captureFilm);
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', resize);
		document.addEventListener('visibilitychange', schedule);
		measure(); schedule();
		return () => {
			disposed = true; cancelAnimationFrame(frame); observer.disconnect();
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', resize);
			document.removeEventListener('visibilitychange', schedule);
			video.removeEventListener('loadeddata', captureFilm);
			video.removeEventListener('seeked', captureFilm);
			video.removeAttribute('src'); video.load();
			for (const entry of images.values()) if (entry.image) { entry.image.onload = null; entry.image.onerror = null; entry.image.src = ''; }
			images.clear();
		};
	}, [projects]);
	return <div ref={rootRef} className={styles.stage} data-project-passage data-project-count={projects.length}>
		<canvas ref={canvasRef} className={styles.canvas} />
		<video ref={videoRef} className={styles.decoder} preload='none' muted playsInline disablePictureInPicture tabIndex={-1} />
	</div>;
}

export default function ProjectPassage() {
	const { active, paused } = useMotionPreview();
	const [projects, setProjects] = useState([]);
	useEffect(() => {
		if (!active) return;
		const controller = new AbortController();
		fetch('/api/projects?all=1', { signal: controller.signal })
			.then((response) => response.ok ? response.json() : Promise.reject())
			.then((data) => {
				if (!controller.signal.aborted) setProjects((data.results || []).filter((project) => project.slug && project.image));
			})
			.catch(() => {});
		return () => controller.abort();
	}, [active]);
	const travel = Math.min(300, 180 + Math.ceil(projects.length / 2) * 8);
	return <TransitionSpace section='projects' id='projects-transition-space' ready={projects.length > 0}
		travel={`calc(100svh - 64px + ${travel}svh)`}>
		{active && !paused && <ScreenshotFlight projects={projects} />}
	</TransitionSpace>;
}
