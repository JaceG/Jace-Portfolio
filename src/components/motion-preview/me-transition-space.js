'use client';

import { useEffect, useRef } from 'react';
import TransitionSpace from './transition-space';
import BlackHolePreview from './black-hole-preview';
import { createBlackHolePull } from './black-hole-pull';

// An opt-in scroll interval between the existing biography and GitHub sections.
export default function MeTransitionSpace() {
	return <TransitionSpace section='github' id='me-transition-space' travel='180svh'>
		{/* TEMPORARY: black hole experiment, just to view. */}
		<div className='absolute inset-x-0 bottom-[calc(100%+50svh)] h-[clamp(360px,75svh,820px)] [container-type:size]'>
			<BlackHolePreview />
			<HoleButton />
		</div>
	</TransitionSpace>;
}

// Click the centre of the black hole to pull the About section in; click again to release it.
function HoleButton() {
	const ref = useRef(null);
	const pullRef = useRef(null);

	useEffect(() => {
		const section = document.querySelector('section[aria-label="About Jace Galloway"]');
		if (section && ref.current) pullRef.current = createBlackHolePull(section, ref.current);
	}, []);

	const onClick = () => {
		const pull = pullRef.current;
		if (!pull || pull.isRunning()) return;
		if (pull.isPulled()) pull.release();
		else pull.pull();
	};

	// The canvas is a centred 16:9 box; its hole sits at (600, 350) of 1200 x 675.
	return <button
		ref={ref}
		type='button'
		tabIndex={-1}
		aria-label='Pull the About section into the black hole'
		onClick={onClick}
		className='pointer-events-auto absolute left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full'
		style={{
			top: 'calc(50% + min(100cqw, 100cqh * 16 / 9) * 9 / 16 * 12.5 / 675)',
			width: 'calc(min(100cqw, 100cqh * 16 / 9) * 0.2)',
		}}
	/>;
}
