'use client';

/** Small footer affordance that opens the site terminal. */
export default function TerminalHint() {
	return (
		<button
			type='button'
			onClick={() => window.dispatchEvent(new Event('terminal:open'))}
			className='mt-2 font-mono text-xs tracking-wide text-white/60 transition-colors hover:text-white'>
			&gt;_ double-tap the background for a terminal
		</button>
	);
}
