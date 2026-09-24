'use client';
import { useState } from 'react';
import Card from '../project-card';

const PER_PAGE = 3;
// Inverted from the portfolio's green section: white background, green ink.
const BTN =
	'relative rounded-sm bg-white border-2 border-[#39bb6a] text-[#39bb6a] lg:w-[450px] w-[300px] p-3 tracking-[-0.04em] block uppercase font-black';

/** Same layout and paging as the portfolio's Projects section. */
export default function ProjectList({ cards }) {
	const [page, setPage] = useState(1);
	const shown = cards.slice(0, page * PER_PAGE);

	return (
		<>
			<div className='flex flex-col items-center justify-center lg:mb-16 mb-24'>
				<h1 className='sm:text-9xl text-6xl font-bold text-[#39bb6a] uppercase mb-4'>
					Projects
				</h1>
				{/* public/line-curved.svg, recolored green for the white background */}
				<svg
					width='910'
					height='146'
					viewBox='0 0 910 146'
					fill='none'
					aria-hidden='true'
					className='about-img transform hidden lg:block'>
					<path
						d='M27.1716 144.828C28.7337 146.391 31.2663 146.391 32.8284 144.828L58.2843 119.373C59.8464 117.81 59.8464 115.278 58.2843 113.716C56.7222 112.154 54.1895 112.154 52.6274 113.716L30 136.343L7.37258 113.716C5.81049 112.154 3.27783 112.154 1.71573 113.716C0.153631 115.278 0.153631 117.81 1.71573 119.373L27.1716 144.828ZM910 0H70V8H910V0ZM26 44V142H34V44H26ZM70 0C45.6995 0 26 19.6995 26 44H34C34 24.1178 50.1178 8 70 8V0Z'
						fill='#39bb6a'
					/>
				</svg>
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
							variant='inverted'
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
