import { projects } from '@/data/projects';
import { SC_PROJECTS } from '@/constants/sourceco';

// Server-only helper: the six SourceCo projects, in page order, with the
// SourceCo snippet/image overrides applied. REMI is only reachable through
// here and the /sourceco case-study route.
export function getScProjects() {
	return SC_PROJECTS.map(({ slug, title, ...overrides }) => {
		const project = projects.find((p) => p.slug === slug);
		return project ? { ...project, ...overrides } : null;
	}).filter(Boolean);
}

export function getScProject(slug) {
	return getScProjects().find((p) => p.slug === slug) || null;
}
