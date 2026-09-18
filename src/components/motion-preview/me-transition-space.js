'use client';

import { useMotionPreview } from './index';
import styles from './scene-transitions.module.css';

// An opt-in scroll interval between the existing biography and GitHub sections.
export default function MeTransitionSpace() {
	const { active, paused, journeyReady } = useMotionPreview();
	return <div id='me-transition-space' aria-hidden='true'
		className={styles.journeySpace}
		data-enabled={active && !paused && journeyReady ? 'true' : 'false'} />;
}
