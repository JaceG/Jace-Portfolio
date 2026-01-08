'use client';

/* eslint-disable @next/next/no-img-element */
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';

async function fetchProjectData(slug) {
	const res = await fetch(`/api/projects?slug=${slug}`);
	const project = await res.json();
	return project;
}

export default function CaseStudy() {
	const pathname = usePathname();
	const slug = pathname.split('/').pop(); // Extract the slug from the pathname
	const projectImageRef = useRef(null);
	const [project, setProject] = useState(null);
	const [loading, setLoading] = useState(true);
	const [projectImageWidth, setProjectImageWidth] = useState(0);
	const [projectImageHeight, setProjectImageHeight] = useState(0);

	useEffect(() => {
		window.addEventListener('resize', () => {
			if (projectImageRef.current) {
				setProjectImageWidth(projectImageRef.current.clientWidth);
				setProjectImageHeight(projectImageRef.current.clientHeight);
			}
		});
	}, []);

	useEffect(() => {
		if (projectImageRef.current) {
			setProjectImageWidth(projectImageRef.current.clientWidth);
			setProjectImageHeight(projectImageRef.current.clientHeight);
		}
	}, [
		projectImageRef,
		projectImageRef?.current?.clientWidth,
		projectImageRef?.current?.clientHeight,
	]);

	useEffect(() => {
		async function loadProject() {
			const data = await fetchProjectData(slug);
			setProject(data);
			setLoading(false);
		}
		loadProject();
	}, [slug]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!project) {
		return <div>Project not found</div>;
	}

	// Generate structured data for the project
	const projectStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: project.title,
		description: project.snippet,
		applicationCategory: 'WebApplication',
		author: {
			'@type': 'Person',
			name: 'Jace Galloway',
			url: 'https://hirejace.com',
		},
		url: project.app || project.github,
		screenshot: project.image,
		...(project.github && {
			codeRepository: project.github,
		}),
	};

	// Breadcrumb structured data for better navigation in search results
	const breadcrumbStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: 'https://hirejace.com',
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: 'Projects',
				item: 'https://hirejace.com/#projects',
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: project.title,
				item: `https://hirejace.com/case-study/${slug}`,
			},
		],
	};

	// Extract plain text from HTML description for meta tags
	const plainTextDescription =
		project.description
			?.replace(/<[^>]*>/g, '')
			.substring(0, 160)
			.trim() + '...' || project.snippet;

	return (
		<>
			<Head>
				<title>{`${project.title} - Case Study | Jace Galloway`}</title>
				<meta name='description' content={plainTextDescription} />
				<meta
					name='keywords'
					content={`${project.title}, web development, portfolio, Jace Galloway, React, Node.js, full-stack`}
				/>

				{/* Open Graph */}
				<meta property='og:type' content='article' />
				<meta
					property='og:title'
					content={`${project.title} - Case Study`}
				/>
				<meta
					property='og:description'
					content={plainTextDescription}
				/>
				<meta property='og:image' content={project.image} />
				<meta
					property='og:url'
					content={`https://hirejace.com/case-study/${slug}`}
				/>

				{/* Twitter Card */}
				<meta name='twitter:card' content='summary_large_image' />
				<meta
					name='twitter:title'
					content={`${project.title} - Case Study`}
				/>
				<meta
					name='twitter:description'
					content={plainTextDescription}
				/>
				<meta name='twitter:image' content={project.image} />

				{/* Structured Data - Project */}
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(projectStructuredData),
					}}
				/>

				{/* Structured Data - Breadcrumbs */}
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(breadcrumbStructuredData),
					}}
				/>
			</Head>
			<div className='bg-white'>
				<div className='max-w-[1560px] mx-auto pt-[60px] flex md:flex-row flex-col'>
					<div className='flex md:flex-1 md:mt-0 mt-60 md:h-screen items-center justify-center'>
						<div>
							<div
								ref={projectImageRef}
								className='border-[11px] border-primary relative lg:w-[600px] lg:h-[300px] md:w-[400px] h-[200px] w-[300px] ml-2 md:ml-0'>
								<div className='absolute z-10 lg:left-[700px] md:left-[450px] left-0 lg:bottom-[200px] bottom-[100px]'>
									<h1 className='text-primary 2xl:text-[112px] lg:text-[72px] text-[52px] font-black uppercase 2xl:leading-[102px] lg:leading-[72px] leading-[52px]'>
										{project.title}
									</h1>
									<div className='relative lg:right-[100px] right-[50px] 2xl:w-[925px] lg:w-[600px] w-[450px] hidden md:block'>
										<svg
											width='100%'
											height='60'
											viewBox='0 0 925 60'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'>
											<path
												d='M1.17157 27.1716C-0.390524 28.7337 -0.390524 31.2663 1.17157 32.8284L26.6274 58.2843C28.1895 59.8464 30.7222 59.8464 32.2843 58.2843C33.8464 56.7222 33.8464 54.1895 32.2843 52.6274L9.65685 30L32.2843 7.37258C33.8464 5.81049 33.8464 3.27783 32.2843 1.71573C30.7222 0.153631 28.1895 0.153631 26.6274 1.71573L1.17157 27.1716ZM925 26H4V34H925V26Z'
												fill='#39BD6D'
											/>
										</svg>
									</div>
									<div className='block md:hidden mb-20'>
										<svg
											width='200'
											height='100'
											viewBox='0 0 158 143'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'>
											<path
												id='Line 2'
												d='M125.172 141.828C126.734 143.391 129.266 143.391 130.828 141.828L156.284 116.373C157.846 114.81 157.846 112.278 156.284 110.716C154.722 109.154 152.19 109.154 150.627 110.716L128 133.343L105.373 110.716C103.81 109.154 101.278 109.154 99.7157 110.716C98.1536 112.278 98.1536 114.81 99.7157 116.373L125.172 141.828ZM0 8H113V0H0V8ZM124 19V139H132V19H124ZM113 8C119.075 8 124 12.9249 124 19H132C132 8.50659 123.493 0 113 0V8Z'
												fill='#39BD6D'
											/>
										</svg>
									</div>
								</div>
								{project.video ? (
									<iframe
										src={project.video}
										className='bg-black'
										width={projectImageWidth}
										height={projectImageHeight}
										allow='autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media'
										style={{
											position: 'absolute',
											bottom: 30,
											left: 30,
										}}
										title={`${project.title} Demo`}
									/>
								) : (
									<img
										src={project.image}
										alt={`${project.title} Screenshot`}
										className='w-full h-full object-cover absolute bottom-8 left-8'
									/>
								)}
							</div>

							<div className='flex md:flex-row flex-col md:flex-rowjustify-end gap-4 my-4'>
								{project.app && (
									<a
										href={project.app}
										className='relativ rounded bg-primary flex items-center justify-center py-4 px-10 box-border text-center text-base text-white tracking-[-0.04em] uppercase font-black'
										target='_blank'>
										App Link
									</a>
								)}
								<a
									href={project.github}
									className='relative rounded bg-white flex items-center justify-center py-4 px-10 box-border text-center text-base text-primary border-4 border-primary border-opacity-50 tracking-[-0.04em] uppercase font-black'
									target='_blank'>
									{'<Source Code/>'}
								</a>
							</div>
						</div>
					</div>

					<div className='flex md:flex-1 justify-center items-center'>
						<div className='md:mt-[450px] p-6 flex-1 text-black'>
							<div
								dangerouslySetInnerHTML={{
									__html: project.description,
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
