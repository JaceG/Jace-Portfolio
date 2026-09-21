export default function Education() {
	return (
		<div className='flex flex-col items-center justify-center py-8'>
			<div className='3xl:w-[730px] xl:w-[730px] lg:w-[730px] md:w-[600px]  flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-8'>
				<div data-motion='heading' className='w-[336px] text-[56px] tracking-[-0.04em] leading-[52px] uppercase font-black text-white text-left mb-6'>
					<p className='m-0'>Education</p>
				</div>
			</div>
			<div className='w-[300px] sm:w-[600px] lg:w-[800px] relative'>
				<div className='absolute inset-0 border-8 border-white' aria-hidden='true' />
				<div data-motion='card' className='w-full min-h-[160px] bg-white text-black relative bottom-8 left-7 pb-8'>
					<ul>
						<li data-motion='row' className='px-8 pt-8'>
							<h3 className='sm:text-2xl text-xl font-bold uppercase'>
								The Ohio State University
							</h3>
							<p className='text-sm text-tertiary'>Columbus, OH</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
