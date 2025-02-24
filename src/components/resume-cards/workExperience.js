export default function WorkExperience() {
	return (
		<div className='flex flex-col items-center justify-center'>
			<div className='3xl:w-[730px] lg:w-[730px] md:w-[600px] flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-8'>
				<div className='w-[336px] relative text-[56px] tracking-[-0.04em] leading-[52px] uppercase font-black text-white text-left mb-6'>
					<p className='m-0'>Work</p>
					<p className='m-0'>Experience</p>
				</div>
				<div className='mb-8'>
					<a
						href='https://drive.google.com/uc?export=download&id=1lvE1VHpLcgTLfk86HLCBhHR5ShVrwHI1'
						className='relative rounded bg-black flex items-center justify-center py-4 px-10 box-border text-center text-base text-white tracking-[-0.04em] uppercase font-black mt-4'>
						Download Resume
					</a>
				</div>
			</div>
			<div className='border-8 h-[575px] border-white w-[300px] sm:w-[600px] lg:w-[800px] relative'>
				<div className='w-full h-full bg-white text-black absolute bottom-8 left-7'>
					<ul>
						<li className='px-8 pt-8'>
							<h3 className='sm:text-2xl text-xl font-bold uppercase'>
								Insurance Broker
							</h3>
							<p className='text-sm text-tertiary hidden sm:block'>
								<span className='font-bold text-black'>
									Independant
								</span>{' '}
								- Tampa, FL
							</p>
							<p className='text-sm text-tertiary hidden sm:block'>
								Sales and customer service for health and life
								insurance products.
							</p>
						</li>
						<li className='px-8 pt-8'>
							<h3 className='sm:text-2xl text-xl font-bold uppercase'>
								Driver
							</h3>
							<p className='text-sm text-tertiary'>
								<span className='font-bold text-black'>
									Uber &amp; Lyft
								</span>{' '}
								- San Diego, California, / Tampa, Florida, /
								Columbus, Ohio
							</p>
							<p className='text-sm text-tertiary hidden sm:block'>
								I probably don&apos;t need to describe the
								responsibilities of this one.
							</p>
						</li>
						<li className='px-8 pt-8'>
							<h3 className='sm:text-2xl text-xl font-bold uppercase'>
								Marketing Manager
							</h3>
							<p className='text-sm text-tertiary'>
								<span className='font-bold text-black'>
									ADventures
								</span>{' '}
								- San Diego, CA
							</p>
							<p className='text-sm text-tertiary hidden sm:block'>
								Digital marketing automation implementation and
								management of ads team.
							</p>
						</li>
						<li className='px-8 pt-8'>
							<h3 className='sm:text-2xl text-xl font-bold uppercase'>
								Marketing &amp; Data Entry Specialist
							</h3>
							<p className='text-sm text-tertiary'>
								<span className='font-bold text-black'>
									Fix Your Funnel
								</span>{' '}
								- San Diego, CA
							</p>
							<p className='text-sm text-tertiary hidden sm:block'>
								Digital marketing automation implementation and
								customer support.
							</p>
						</li>
						<li className='px-8 pt-8'>
							<h3 className='sm:text-2xl text-xl font-bold uppercase'>
								Quality Assurance Analyst
							</h3>
							<p className='text-sm text-tertiary'>
								<span className='font-bold text-black'>
									Sony
								</span>{' '}
								- San Diego, CA
							</p>
							<p className='text-sm text-tertiary hidden sm:block'>
								Quality assurance for Sony&apos;s MLB The Show.
							</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
