'use client';
import { useEffect } from 'react';
import { SC_BASE } from '@/constants/sourceco';
import { buildCommands, welcome } from './terminal-commands';

/**
 * Hands the SourceCo commands to the global terminal while this page is
 * mounted. The terminal only knows about `window.__terminalExt`, so the main
 * site's code never references this page.
 */
export default function TerminalBridge() {
	useEffect(() => {
		window.__terminalExt = { base: SC_BASE, welcome, buildCommands };
		window.dispatchEvent(new Event('terminal:ext'));
		return () => {
			delete window.__terminalExt;
			window.dispatchEvent(new Event('terminal:ext'));
		};
	}, []);
	return null;
}
