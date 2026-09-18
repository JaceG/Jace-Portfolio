'use client';

import TransitionSpace from './transition-space';

// An opt-in scroll interval between the existing biography and GitHub sections.
export default function MeTransitionSpace() {
	return <TransitionSpace section='github' id='me-transition-space' travel='180svh' />;
}
