'use client';

import {
	createContext,
	useContext,
	useEffect,
	useState,
	useSyncExternalStore,
} from 'react';
import { useChoreography } from './choreography';
import SceneTransitions from './scene-transitions';
import HardwareReveal from './hardware-reveal';
import styles from './motion.module.css';

const MotionContext = createContext({ active: false, paused: true, journeyReady: false, hardwareReady: false });
export const useMotionPreview = () => useContext(MotionContext);

// The debug panel is derived from the URL, which only exists in the browser, so
// it is read as an external store rather than synced into state from an effect.
// It never changes after load, hence the no-op subscribe.
const subscribeToNothing = () => () => {};
const getDebugFlag = () =>
	process.env.NODE_ENV !== 'production' &&
	new URLSearchParams(window.location.search).get('motion') === '1';
const getDebugFlagOnServer = () => false;

// A context provider only: no new layout element around the existing page.
//
// The motion plays for every visitor by default (subject to their
// prefers-reduced-motion setting). In local dev only, ?motion=1 additionally
// surfaces a small on/off/pause debug panel so the effect can be iterated on
// without devtools; that panel must never reach production visitors.
export default function MotionPreview({ children }) {
	const [enabled, setEnabled] = useState(true);
	const debug = useSyncExternalStore(
		subscribeToNothing,
		getDebugFlag,
		getDebugFlagOnServer
	);
	const [visible, setVisible] = useState(true);
	const [paused, setPaused] = useState(true);
	const [reduced, setReduced] = useState(true);
	const [journeyReady, setJourneyReady] = useState(false);
	const [hardwareReady, setHardwareReady] = useState(false);

	useEffect(() => {
		const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
		const update = () => {
			setReduced(preference.matches);
			setPaused(preference.matches);
		};
		update();
		preference.addEventListener('change', update);
		return () => preference.removeEventListener('change', update);
	}, []);

	const active = enabled && visible;
	useChoreography(active && !paused && !reduced);

	return (
		<MotionContext.Provider value={{ active, paused, journeyReady, hardwareReady }}>
			{children}
			<HardwareReveal running={active && !paused && !reduced} onReady={setHardwareReady} />
			<SceneTransitions running={active && !paused && !reduced} onJourneyReady={setJourneyReady} />
			{debug && (
				<div className={styles.controls} aria-label='Motion preview controls'>
					<span>MOTION</span>
					<button type='button' onClick={() => setVisible((v) => !v)} aria-pressed={visible} aria-label='Toggle added motion'>
						{visible ? 'On' : 'Off'}
					</button>
					{visible && (
						<><button type='button' onClick={() => setPaused((v) => !v)} aria-label={paused ? 'Play added motion' : 'Pause added motion'}>
							{paused ? 'Play' : 'Pause'}
						</button>
						{!paused && !reduced && <button type='button' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label='Back to intro'>Intro ↑</button>}</>
					)}
				</div>
			)}
		</MotionContext.Provider>
	);
}
