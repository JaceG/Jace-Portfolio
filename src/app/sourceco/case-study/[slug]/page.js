import { notFound } from 'next/navigation';
import CaseStudyView from '@/components/case-study-view';
import TerminalBridge from '@/components/sourceco/terminal-bridge';
import { getScProject, getScProjects } from '@/components/sourceco/data';
import { SC_PAGE_ATTRS, SC_ROBOTS } from '../../nav';

// Only projects listed on the SourceCo page exist here; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
	return getScProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const project = getScProject(slug);
	return {
		title: { absolute: project ? `${project.title} — Jace Galloway` : 'Not found' },
		description: project?.snippet,
		robots: SC_ROBOTS,
		alternates: { canonical: null },
		openGraph: null,
	};
}

export default async function ScCaseStudy({ params }) {
	const { slug } = await params;
	const project = getScProject(slug);
	if (!project) notFound();
	return (
		<div {...SC_PAGE_ATTRS}>
			<TerminalBridge />
			<CaseStudyView project={project} structuredData={false} />
		</div>
	);
}
