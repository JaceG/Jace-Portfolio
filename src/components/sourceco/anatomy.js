/* eslint-disable @next/next/no-img-element */
import Section from '../section';

const SRC = '/sourceco/anatomy.jpg';

export default function Anatomy() {
	return (
		<Section>
			<div className='pb-24 flex flex-col items-center'>
				<h1 className='text-center sm:text-9xl text-6xl font-bold text-white uppercase mb-12'>
					Anatomy
				</h1>
				<div className='relative w-[calc(100vw-72px)] max-w-[1000px]'>
					<div className='absolute inset-0 border-8 border-white' aria-hidden='true' />
					<a
						href={SRC}
						target='_blank'
						rel='noopener noreferrer'
						className='relative block bottom-6 left-6 bg-[#f7f6f2]'>
						<img
							src={SRC}
							width={1800}
							height={1697}
							alt="SourceCo's GTM stack drawn as a body: the database is the brain, n8n the nervous system, the owner record the heart, with sourcing, enrichment, outreach channels and deliverability around it."
							className='block w-full h-auto'
						/>
					</a>
				</div>
				<a
					href={SRC}
					target='_blank'
					rel='noopener noreferrer'
					className='mt-10 text-sm font-bold uppercase tracking-[-0.02em] text-white underline'>
					Open full size
				</a>
			</div>
		</Section>
	);
}
