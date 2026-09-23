import { RESUME_DOWNLOAD_URL } from '@/constants/me';

export default function WorkExperience() {
	return (
		<div className='flex flex-col items-center justify-center'>
			<div className='3xl:w-[730px] lg:w-[730px] md:w-[600px] flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-8'>
				<div data-motion='heading' className='w-[336px] relative text-[56px] tracking-[-0.04em] leading-[52px] uppercase font-black text-white text-left mb-6'>
					<p className='m-0'>Work</p>
					<p className='m-0'>Experience</p>
				</div>
				<div className='mb-8'>
					<a
						href={RESUME_DOWNLOAD_URL}
						className='rounded-sm bg-black flex items-center justify-center py-4 px-10 box-border text-center text-base text-white tracking-[-0.04em] uppercase font-black mt-4'>
						Download Resume
					</a>
				</div>
			</div>
			{/* The card sets the height and the frame follows it, so longer wraps
			    (wider fonts, larger text settings) grow the block instead of
			    spilling into the next section. */}
			<div className='w-[300px] sm:w-[600px] lg:w-[800px] relative'>
				<div className='absolute inset-0 border-8 border-white' aria-hidden='true' />
				<div data-motion='card' className='w-full bg-white text-black relative bottom-8 left-7 pb-8'>
					<ul>
						<li data-motion='row' className='px-8 pt-8'>
							<h3 className='sm:text-2xl text-xl font-bold uppercase'>
								Developer &amp; Project Manager
							</h3>
							<p className='text-sm text-tertiary sm:block'>
								<span className='font-bold text-black'>
									REMI / MAXI Oil Change
								</span>{' '}
								- Columbus, OH
							</p>
							<p className='text-sm text-tertiary hidden sm:block'>
								Single-handedly built the REMI field-service platform (backend API, technician and customer mobile apps, franchise dashboard) in four months. Technicians and franchise owners use it every day in the field. I migrated the franchise&apos;s full history in from their previous shop software, then hired and led the team of developers who took it over.
							</p>
						</li>
						<li data-motion='row' className='px-8 pt-8'>
							<h3 className='sm:text-2xl text-xl font-bold uppercase'>
								Freelance Developer
							</h3>
							<p className='text-sm text-tertiary sm:block'>
								<span className='font-bold text-black'>
									Self-Employed
								</span>{' '}
								- Remote
							</p>
							<p className='text-sm text-tertiary hidden sm:block'>
								Built Company Hunter, a public lead-generation tool on the Google Places API that landed me interviews job boards never did, plus data scrapers, automated email campaigns, websites and mobile apps for clients.
							</p>
						</li>
						<li data-motion='row' className='px-8 pt-8'>
							<h3 className='sm:text-2xl text-xl font-bold uppercase'>
								Marketing &amp; Data Entry Specialist
							</h3>
							<p className='text-sm text-tertiary sm:block'>
								<span className='font-bold text-black'>
									Fix Your Funnel
								</span>{' '}
								- San Diego, CA
							</p>
							<p className='text-sm text-tertiary hidden sm:block'>
								Keap (formerly Infusionsoft) CRM automation for email and text message campaigns, data process automation and customer support.
							</p>
						</li>
						<li data-motion='row' className='px-8 pt-8'>
							<h3 className='sm:text-2xl text-xl font-bold uppercase'>
								Quality Assurance Analyst
							</h3>
							<p className='text-sm text-tertiary sm:block'>
								<span className='font-bold text-black'>
									Sony
								</span>{' '}
								- San Diego, CA
							</p>
							<p className='text-sm text-tertiary hidden sm:block'>
								Quality assurance for Sony&apos;s MLB The Show: testing, documenting bugs and verifying fixes with developers.
							</p>
						</li>
						<li data-motion='row' className='px-8 pt-8'>
							<h3 className='sm:text-2xl text-xl font-bold uppercase'>
								Marketing Manager
							</h3>
							<p className='text-sm text-tertiary sm:block'>
								<span className='font-bold text-black'>
									ADventures
								</span>{' '}
								- San Diego, CA
							</p>
							<p className='text-sm text-tertiary hidden sm:block'>
								Keap (formerly Infusionsoft) CRM automation for email and text message campaigns, and management of the ads team.
							</p>
						</li>
						<li data-motion='row' className='px-8 pt-8'>
							<h3 className='sm:text-2xl text-xl font-bold uppercase'>
								Insurance Broker
							</h3>
							<p className='text-sm text-tertiary sm:block'>
								<span className='font-bold text-black'>
									Independent
								</span>{' '}
								- Tampa, FL
							</p>
							<p className='text-sm text-tertiary hidden sm:block'>
								Sales and customer service for health and life insurance products.
							</p>
						</li>
						<li data-motion='row' className='px-8 pt-8'>
							<h3 className='sm:text-2xl text-xl font-bold uppercase'>
								Driver
							</h3>
							<p className='text-sm text-tertiary sm:block'>
								<span className='font-bold text-black'>
									Uber &amp; Lyft
								</span>{' '}
								- San Diego, California, / Tampa, Florida, / Columbus, Ohio
							</p>
							<p className='text-sm text-tertiary hidden sm:block'>
								I probably don&apos;t need to describe the responsibilities of this one.
							</p>
						</li>
						<li data-motion='row' className='px-8 pt-8'>
							<h3 className='sm:text-2xl text-xl font-bold uppercase'>
								Earlier Experience
							</h3>
							<p className='text-sm text-tertiary hidden sm:block'>
								Customer support, QA testing and teaching people how to use technology, plus my own computer repair and custom gaming PC business.
							</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
