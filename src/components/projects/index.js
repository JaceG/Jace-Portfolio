/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect } from 'react';
import Card from '../project-card';
import Section from '../section';
import Link from 'next/link';

async function fetchProjectsPage(page) {
	const res = await fetch(`/api/projects?page=${page}`);
	return res.json();
}

export default function Projects() {
	const [projects, setProjects] = useState([]);
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(1);

	useEffect(() => {
		let cancelled = false;

		async function loadFirstPage() {
			const data = await fetchProjectsPage(1);
			if (cancelled) return;
			setProjects(data.results);
			setTotal(data.total);
		}

		loadFirstPage();

		return () => {
			cancelled = true;
		};
	}, []);

	async function handleShowMore() {
		const nextPage = page + 1;
		setPage(nextPage);
		const data = await fetchProjectsPage(nextPage);
		// Append via the updater so a slow response can't overwrite newer state.
		setProjects((prev) => [...prev, ...data.results]);
		setTotal(data.total);
	}

	function handleShowLess() {
		setPage(page - 1);
		let startIndex = 0;
		if (projects.length % 3 === 0) {
			startIndex = projects.length - 3;
		} else {
			startIndex = projects.length - (projects.length % 3);
		}
		setProjects((prev) => prev.filter((_, i) => i < startIndex));
	}

	return (
		<Section>
			<div className='flex flex-col items-center justify-center lg:mb-16 mb-24'>
				<h1 data-motion='heading' className='sm:text-9xl text-6xl font-bold text-white uppercase mb-4'>
					Projects
				</h1>
				<img
					data-motion='line'
					src={'/line-curved.svg'}
					alt='Arrow 2'
					className='about-img transform hidden lg:block'
				/>
			</div>
			<div className='flex justify-center items-center'>
				<div className='flex flex-col lg:flex-row justify-center items-center lg:gap-24 gap-24 flex-wrap max-w-[1572px] pr-8'>
					{projects.map((project, index) => (
						<Card
							key={project.slug}
							title={project.title}
							description={project.snippet}
							image={project.image}
							github={project.github}
							motionDelay={(index % 3) * 100}
							isCenter={index % 3 === 1}>
							<Link
								href={`/case-study/${project.slug}`}
								className='relative rounded bg-[#39bb6a] p-3 tracking-[-0.04em] block w-[140px] uppercase font-black'>
								Case Study
							</Link>
						</Card>
					))}
				</div>
			</div>
			<div className='flex justify-center items-center mt-16'>
				{Math.ceil(total / 3) > page ? (
					<button
						onClick={handleShowMore}
						className='relative rounded bg-[#39bb6a] border-2 border-white lg:w-[450px] w-[300px] p-3 tracking-[-0.04em] block uppercase font-black'>
						See More Projects
					</button>
				) : null}

				{page > 1 ? (
					<button
						onClick={handleShowLess}
						className='relative rounded bg-[#39bb6a] border-2 border-white lg:w-[450px] w-[300px] p-3 tracking-[-0.04em] block uppercase font-black'>
						See Less
					</button>
				) : null}
			</div>
		</Section>
	);
}
