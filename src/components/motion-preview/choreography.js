'use client';

import { useEffect, useRef } from 'react';

const ease = 'cubic-bezier(.16,1,.3,1)';
const entrances = {
	heading: [{ opacity: 0.15, translate: '0 30px', clipPath: 'inset(0 0 95% 0)' }, { opacity: 1, translate: '0 0', clipPath: 'inset(0 0 0% 0)' }],
	card: [{ opacity: 0.15, translate: '-18px 32px', rotate: '-1deg' }, { opacity: 1, translate: '0 0', rotate: '0deg' }],
	book: [{ opacity: 0.15, translate: '0 28px', rotate: '2deg' }, { opacity: 1, translate: '0 0', rotate: '0deg' }],
	line: [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)' }],
	row: [{ opacity: 0.2, translate: '20px 0' }, { opacity: 1, translate: '0 0' }],
	copy: [{ opacity: 0.15, translate: '0 20px' }, { opacity: 1, translate: '0 0' }],
};

export function useChoreography(running) {
	const completedKeys = useRef(new Set());
	useEffect(() => {
		if (!running) return;
		const root = document.querySelector('[data-motion-page]');
		if (!root) return;
		const seen = new Set();
		const pending = new Map();
		const hoverAnimations = new Map();
		const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

		const finish = (element) => {
			pending.get(element)?.cancel();
			pending.delete(element);
			element.dataset.motionState = 'complete';
			if (element.dataset.motionKey) completedKeys.current.add(element.dataset.motionKey);
		};
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				const element = entry.target;
				observer.unobserve(element);
				const animation = pending.get(element);
				if (!animation) continue;
				element.dataset.motionState = 'entering';
				animation.play();
				animation.onfinish = () => finish(element);
			}
		}, { rootMargin: '0px 0px -6% 0px', threshold: 0 });

		const register = (element) => {
			if (seen.has(element)) return;
			seen.add(element);
			const frames = entrances[element.dataset.motion];
			// Previously viewed content stays settled when Play/On is used again.
			if (!frames) return;
			if (element.dataset.motionState === 'complete' || completedKeys.current.has(element.dataset.motionKey) || element.getBoundingClientRect().bottom < 64) {
				finish(element);
				return;
			}
			const animation = element.animate(frames, {
				duration: element.dataset.motion === 'line' ? 1150 : 900,
				delay: Math.min(Number(element.dataset.motionDelay) || 0, 300),
				easing: ease,
				fill: 'both',
			});
			animation.pause();
			pending.set(element, animation);
			element.dataset.motionState = 'waiting';
			observer.observe(element);
		};
		const scan = (node) => {
			if (!(node instanceof Element)) return;
			if (node.matches('[data-motion]')) register(node);
			node.querySelectorAll('[data-motion]').forEach(register);
		};
		scan(root);
		const mutations = new MutationObserver((records) => {
			for (const record of records) record.addedNodes.forEach(scan);
			// Pagination can remove nodes before their entrance starts.
			for (const [element, animation] of pending) {
				if (!element.isConnected) { animation.cancel(); pending.delete(element); }
			}
			for (const [element, animation] of hoverAnimations) {
				if (!element.isConnected) { animation.cancel(); hoverAnimations.delete(element); }
			}
		});
		mutations.observe(root, { childList: true, subtree: true });

		const onFocus = (event) => {
			let element = event.target.closest('[data-motion]');
			while (element) {
				finish(element);
				element = element.parentElement?.closest('[data-motion]');
			}
		};
		const hover = (event, entering) => {
			if (!finePointer.matches || event.pointerType === 'touch') return;
			const element = event.target.closest('[data-motion-hover]');
			if (!element || element.contains(event.relatedTarget)) return;
			// Animate the existing inner sheet, leaving the offset frame in place.
			const target = element.querySelector('[data-motion-sheet]') || element;
			if (pending.has(element)) finish(element);
			const from = getComputedStyle(target).translate;
			hoverAnimations.get(target)?.cancel();
			const animation = target.animate(
				[{ translate: from }, { translate: entering ? '0 -7px' : '0 0' }],
				{ duration: 380, easing: ease, fill: 'forwards' }
			);
			hoverAnimations.set(target, animation);
			if (!entering) animation.onfinish = () => { animation.cancel(); hoverAnimations.delete(target); };
		};
		const onOver = (event) => hover(event, true);
		const onOut = (event) => hover(event, false);
		root.addEventListener('focusin', onFocus);
		root.addEventListener('pointerover', onOver);
		root.addEventListener('pointerout', onOut);
		return () => {
			observer.disconnect();
			mutations.disconnect();
			pending.forEach((animation, element) => {
				animation.cancel();
				// Pending elements must be allowed to enter after resuming.
				delete element.dataset.motionState;
			});
			hoverAnimations.forEach((animation) => animation.cancel());
			root.removeEventListener('focusin', onFocus);
			root.removeEventListener('pointerover', onOver);
			root.removeEventListener('pointerout', onOut);
		};
	}, [running]);
}
