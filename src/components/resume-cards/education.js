export default function Education() {
	return (
		<div className='flex flex-col items-center justify-center py-8'>
			<div className='3xl:w-[730px] xl:w-[730px] lg:w-[730px] md:w-[600px]  flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-8'>
				<div className='w-[336px] relative text-[56px] tracking-[-0.04em] leading-[52px] uppercase font-black text-white text-left mb-6'>
					<p className='m-0'>Education</p>
				</div>
			</div>
			<div className='border-8 h-[375px] sm:h-[300px] md:h-[300px] lg:h-[275px] border-white w-[300px] sm:w-[600px] lg:w-[800px] relative'>
				<div className='w-full h-full bg-white text-black absolute bottom-8 left-7'>
					<ul>
						<li className='px-8 pt-8'>
							<h3 className='sm:text-2xl text-xl font-bold uppercase'>
								Full Stack React Web Development Bootcamp
								Certification
							</h3>
							<p className='text-sm text-tertiary'>
								<span className='font-bold text-black'>
									The Ohio State University
								</span>{' '}
								- Columbus, OH
							</p>
						</li>
						<li className='px-8 pt-8'>
							<h3 className='sm:text-2xl text-xl font-bold uppercase'>
								Digital Marketing Bootcamp Certification
							</h3>
							<p className='text-sm text-tertiary'>
								<span className='font-bold text-black'>
									Thinkful.com
								</span>{' '}
								- Online
							</p>
							<p className='text-sm text-tertiary'>
								Thinkful is now Chegg Skills
							</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
