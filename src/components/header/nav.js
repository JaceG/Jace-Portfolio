import { useSyncExternalStore } from 'react';

// A page can re-home the nav by rendering `data-page-base` (and optionally
// `data-page-nav`, "id:LABEL,id:LABEL") on an element. Everything else gets
// the portfolio's own sections.
export const DEFAULT_NAV = [
	['me', 'ME'],
	['projects', 'WORK'],
	['books', 'BOOKS'],
	['connect', 'CONTACT'],
];

const noopSubscribe = () => () => {};

// A string snapshot (not an object) so useSyncExternalStore can compare it.
function readNavKey() {
	const el = document.querySelector('[data-page-base]');
	if (!el) return '';
	return `${el.getAttribute('data-page-base') || ''}|${el.getAttribute('data-page-nav') || ''}`;
}

export function parseNav(key) {
	if (!key) return { base: '', items: DEFAULT_NAV };
	const [base, custom] = key.split('|');
	return {
		base,
		items: custom ? custom.split(',').map((pair) => pair.split(':')) : DEFAULT_NAV,
	};
}

/**
 * Current page's nav. Read from the DOM, re-read on every render (the header
 * re-renders on route change) and re-checked by React after commit, so it
 * picks up the new page's attributes.
 */
export function usePageNav() {
	return parseNav(useSyncExternalStore(noopSubscribe, readNavKey, () => ''));
}

/** Scroll to the section when it's on this page, otherwise navigate to it. */
export function navTo(e, navigation) {
	e.preventDefault();
	const href = e.currentTarget.getAttribute('href');
	const element = document.getElementById(href.split('#')[1]);
	if (element) element.scrollIntoView({ behavior: 'smooth' });
	else navigation.push(href);
}
