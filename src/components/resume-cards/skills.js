export default function Skills() {
	return (
		<div className='flex flex-col items-center justify-center'>
			{/* Skills Header */}
			<div className='3xl:w-[730px] xl:w-[730px] lg:w-[730px] md:w-[600px]  flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-8'>
				<h2 className='w-[336px] text-[56px] tracking-[-0.04em] leading-[52px] uppercase font-black text-white text-left mb-6'>
					Skills
				</h2>
			</div>
			{/* Skills Border Container with matching size */}
			<div className='border-8 border-white w-[300px] sm:w-[600px] lg:w-[800px] 3xl:h-[470px] lg:h-[475px] md:h-[610px] sm:h-[750px] h-[1080px] relative'>
				{/* Inner white container offset relative to the border */}
				<div className='w-full h-full absolute bottom-10 left-[21px]'>
					{/* Skills Rows Container with padding and gap */}
					<div className='flex flex-col gap-2'>
						{/* Row 1: Frontend Development Skills */}
						<div className='bg-white p-4 shadow-md sm:w-[590px] lg:w-[790px] w-[300px]'>
							<div className='flex flex-wrap flex-col md:flex-row gap-[18px]'>
								<div className='shrink-0 uppercase font-bold text-black text-lg'>
									Frontend Development
								</div>
								<div className='flex-grow flex justify-end'>
									<div className='flex flex-row flex-wrap gap-2 text-sm text-[#13692d]'>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												HTML
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												CSS
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												JS
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												React
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												React Native
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												TypeScript
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Next
											</span>
										</div>
									</div>
								</div>
								{/* <div className='flex-grow flex justify-end'>
									<div className='flex flex-row gap-2 text-sm text-[#13692d]'>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												
											</span>
										</div>
									</div>
								</div> */}
							</div>
						</div>
						{/* Row 2: Backend Development Skills */}
						<div className='bg-white p-4 shadow-md sm:w-[590px] lg:w-[790px] w-[300px]'>
							<div className='flex flex-wrap flex-col md:flex-row gap-[18px]'>
								<div className='shrink-0 uppercase font-bold text-black text-lg'>
									Backend Development
								</div>
								<div className='flex-grow flex justify-end'>
									<div className='flex flex-row flex-wrap gap-2 text-sm text-[#13692d]'>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Node.js
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Object-Oriented Programming
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Servers
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												APIs
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Python
											</span>
										</div>
									</div>
								</div>
								{/* <div className='flex-grow flex justify-end'>
									<div className='flex flex-row gap-2 text-sm text-[#13692d]'>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												
											</span>
										</div>
									</div>
								</div> */}
							</div>
						</div>
						{/* Row 3: Database Skills */}
						<div className='bg-white p-4 shadow-md sm:w-[590px] lg:w-[790px] w-[300px]'>
							<div className='flex flex-wrap flex-col md:flex-row gap-[18px]'>
								<div className='shrink-0 uppercase font-bold text-black text-lg'>
									Database Skills
								</div>
								<div className='flex-grow flex justify-end'>
									<div className='flex flex-row flex-wrap gap-2 text-sm text-[#13692d]'>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												PostgreSQL
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												MongoDB
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												MongoDB Atlas
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Mongoose
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Express
											</span>
										</div>
									</div>
								</div>
								{/* <div className='flex-grow flex justify-end'>
									<div className='flex flex-row gap-2 text-sm text-[#13692d]'>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>

											</span>
										</div>
									</div>
								</div> */}
							</div>
						</div>

						{/* Row 4: Tools and Technologies */}
						<div className='bg-white p-4 shadow-md sm:w-[590px] lg:w-[790px] w-[300px]'>
							<div className='flex flex-wrap flex-col md:flex-row gap-[18px]'>
								<div className='shrink-0 uppercase font-bold text-black text-lg'>
									Tools and Technologies
								</div>
								<div className='flex-grow flex justify-end'>
									<div className='flex flex-row flex-wrap gap-2 text-sm text-[#13692d]'>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Git
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Github
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Postman
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Electron
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Github Actions
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Render
											</span>
										</div>
									</div>
								</div>
								{/* <div className='flex-grow flex justify-end'>
									<div className='flex flex-row gap-2 text-sm text-[#13692d]'>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												
											</span>
										</div>
									</div>
								</div> */}
							</div>
						</div>

						{/* Row 5: Additional Skills */}
						<div className='bg-white p-4 shadow-md sm:w-[590px] lg:w-[790px] w-[300px]'>
							<div className='flex flex-wrap flex-col md:flex-row gap-[18px]'>
								<div className='shrink-0 uppercase font-bold text-black text-lg'>
									Additional Skills
								</div>
								<div className='flex-grow flex justify-end'>
									<div className='flex flex-row flex-wrap gap-2 text-sm text-[#13692d]'>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												ChatGPT
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Copilot
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												v0
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Cursor
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Replit
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Claude MCP Servers
											</span>
										</div>
									</div>
								</div>
								{/* <div className='flex-grow flex justify-end'>
									<div className='flex flex-row gap-2 text-sm text-[#13692d]'>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												
											</span>
										</div>
									</div>
								</div> */}
							</div>
						</div>
						{/* Row 6: Soft Skills */}
						<div className='bg-white p-4 shadow-md sm:w-[590px] lg:w-[790px] w-[300px]'>
							<div className='flex flex-wrap flex-col md:flex-row gap-[18px]'>
								<div className='shrink-0 uppercase font-bold text-black text-lg'>
									Soft Skills
								</div>
								<div className='flex-grow flex justify-end'>
									<div className='flex flex-row flex-wrap gap-2 text-sm text-[#13692d]'>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Self Awareness
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Tact
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Patience
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Active Listening
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Adaptability
											</span>
										</div>
									</div>
								</div>
								{/* <div className='flex-grow flex justify-end'>
									<div className='flex flex-row gap-2 text-sm text-[#13692d]'>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												
											</span>
										</div>
									</div>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
