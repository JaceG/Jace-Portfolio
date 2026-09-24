/* eslint-disable @next/next/no-img-element */
import Card from '../project-card';
import Section from '../section';
import { SC_BASE } from '@/constants/sourceco';
import { getScProjects } from './data';

export default function ScProjects() {
	const projects = getScProjects();
	return (
		<Section>
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
			<div className='flex justify-center items-center pb-24'>
				<div className='flex flex-col lg:flex-row justify-center items-center lg:gap-24 gap-24 flex-wrap max-w-[1572px] pr-8'>
					{projects.map((project, index) => (
						<Card
							key={project.slug}
							title={project.title}
							description={project.snippet}
							image={project.image}
							github={project.github}
							href={`${SC_BASE}/case-study/${project.slug}`}
							isCenter={index % 3 === 1}
						/>
					))}
				</div>
			</div>
		</Section>
	);
}
