'use client';
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Card from '../project-card';

const PER_PAGE = 3;
const BTN =
	'relative rounded-sm bg-[#39bb6a] border-2 border-white lg:w-[450px] w-[300px] p-3 tracking-[-0.04em] block uppercase font-black';

/** Same layout and paging as the portfolio's Projects section. */
export default function ProjectList({ cards }) {
	const [page, setPage] = useState(1);
	const shown = cards.slice(0, page * PER_PAGE);

	return (
		<>
			<div className='flex flex-col items-center justify-center lg:mb-16 mb-24'>
				<h1 className='sm:text-9xl text-6xl font-bold text-white uppercase mb-4'>
					Projects
				</h1>
				<img
					src={'/line-curved.svg'}
					alt=''
					aria-hidden='true'
					className='about-img transform hidden lg:block'
				/>
			</div>
			<div className='flex justify-center items-center'>
				<div className='flex flex-col lg:flex-row justify-center items-center lg:gap-24 gap-24 flex-wrap max-w-[1572px] pr-8'>
					{shown.map((project, index) => (
						<Card
							key={project.slug}
							title={project.title}
							description={project.snippet}
							image={project.image}
							github={project.github}
							href={project.href}
							isCenter={index % 3 === 1}
						/>
					))}
				</div>
			</div>
			<div className='flex justify-center items-center mt-16'>
				{cards.length > page * PER_PAGE ? (
					<button type='button' onClick={() => setPage(page + 1)} className={BTN}>
						See More Projects
					</button>
				) : null}
				{page > 1 ? (
					<button type='button' onClick={() => setPage(page - 1)} className={BTN}>
						See Less
					</button>
				) : null}
			</div>
		</>
	);
}
