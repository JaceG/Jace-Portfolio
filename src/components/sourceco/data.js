import { projects } from '@/data/projects';
import { SC_PROJECTS } from '@/constants/sourceco';

// Server-only helpers for the SourceCo page. The six SourceCo picks come
// first, in order, with their snippet/image overrides; every other public
// project follows in the portfolio's own order. REMI is only reachable here
// and through the /sourceco case-study route.
export function getScProjects() {
	const picks = SC_PROJECTS.map(({ slug, title, ...overrides }) => {
		const project = projects.find((p) => p.slug === slug);
		return project ? { ...project, ...overrides } : null;
	}).filter(Boolean);
	const picked = new Set(picks.map((p) => p.slug));
	const rest = projects.filter((p) => !p.hidden && !picked.has(p.slug));
	return [...picks, ...rest];
}

export function getScProject(slug) {
	return getScProjects().find((p) => p.slug === slug) || null;
}
