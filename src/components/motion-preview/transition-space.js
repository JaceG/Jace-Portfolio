'use client';

import { useMotionPreview } from './index';
import styles from './scene-transitions.module.css';

/** Decorative transitions get their own interval, with clear reading room on both sides. */
export default function TransitionSpace({ section, id, ready = true, travel = '90svh', children }) {
	const { active, paused } = useMotionPreview();
	const enabled = active && !paused && ready;
	return <div id={id} className={styles.transitionSpace} aria-hidden='true'
		data-transition-space={section} data-enabled={String(enabled)}
		style={{ '--transition-travel': travel }}>
		<div className={styles.readingRoom} data-transition-buffer='before' />
		<div className={styles.transitionTrack} data-transition-track={section}>{enabled && children}</div>
		<div className={styles.readingRoom} data-transition-buffer='after' />
	</div>;
}
