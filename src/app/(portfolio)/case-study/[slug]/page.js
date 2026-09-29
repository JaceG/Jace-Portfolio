'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import CaseStudyView from '@/components/case-study-view';

async function fetchProjectData(slug) {
	const res = await fetch(`/api/projects?slug=${slug}`);
	const project = await res.json();
	return project;
}

export default function CaseStudy() {
	const pathname = usePathname();
	const slug = pathname.split('/').pop(); // Extract the slug from the pathname
	const [project, setProject] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let cancelled = false;
		async function loadProject() {
			const data = await fetchProjectData(slug);
			if (cancelled) return;
			setProject(data);
			setLoading(false);
		}
		loadProject();
		return () => {
			cancelled = true;
		};
	}, [slug]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!project) {
		return <div>Project not found</div>;
	}

	return <CaseStudyView project={project} />;
}
