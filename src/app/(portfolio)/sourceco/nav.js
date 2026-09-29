import { SC_BASE } from '@/constants/sourceco';

// Attributes that re-home the header nav and terminal to this page.
export const SC_PAGE_ATTRS = {
	'data-page-base': SC_BASE,
	'data-page-nav': 'me:ME,projects:WORK,pitch:DECK,connect:CALL',
};

export const SC_ROBOTS = {
	index: false,
	follow: false,
	nocache: true,
	googleBot: { index: false, follow: false, noimageindex: true },
};
