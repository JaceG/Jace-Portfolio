// GTM-ordered rows for the SourceCo page. Same markup as the rows below.
const SC_ROWS = [
	{
		title: 'Automation & Outreach',
		items: ['n8n', 'Keap (Infusionsoft)', 'Klaviyo', 'Postmark', 'Twilio', 'Zapier', 'IFTTT', 'Webhooks', 'Stripe Billing', 'Direct Mail API'],
	},
	{
		title: 'Data & Enrichment',
		items: ['Web Scraping (Axios + Cheerio)', 'Google Places API', 'Lead Dedup', 'CSV Import / Export', 'Result Caching', 'Rate Limiting', 'SHA-256 Fingerprinting'],
	},
	{
		title: 'AI & Agents',
		items: ['Claude Code', 'Claude MCP Servers', 'OpenAI API (GPT-4)', 'ChatGPT', 'Cursor', 'Copilot', 'v0', 'Replit'],
	},
	{
		title: 'Integrations',
		items: ['Shopify', 'WordPress Plugins', 'GitHub REST API', 'Spotify Web API', 'Google Maps', 'Ticketmaster', 'OpenWeather', 'OAuth 2.0 (PKCE)', 'GraphQL + Apollo'],
	},
	{ title: 'Backend Development', items: ['Node.js', 'Express', 'REST APIs', 'Python', 'WebSockets', 'JWT + Magic-Link Auth', 'Payload CMS', 'Java'] },
	{ title: 'Database Skills', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'MongoDB Atlas', 'Mongoose'] },
	{ title: 'Frontend Development', items: ['React', 'React Native', 'Expo', 'Next', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'Zustand', 'Zod', 'Chart.js', 'three.js', 'JS', 'HTML', 'CSS'] },
	{ title: 'Testing & Monitoring', items: ['Playwright', 'Vitest', 'Jest', 'Cypress', 'React Testing Library', 'Sentry'] },
	{ title: 'Tools and Technologies', items: ['Git', 'Github', 'Github Actions', 'EAS + OTA Updates', 'Postman', 'Render', 'Vite', 'Blender (Python)', 'Swift', 'Electron'] },
	{ title: 'Soft Skills', items: ['Self Awareness', 'Tact', 'Patience', 'Active Listening', 'Adaptability'] },
];

function ScSkills() {
	return (
		<div className='flex flex-col items-center justify-center'>
			<div className='3xl:w-[730px] xl:w-[730px] lg:w-[730px] md:w-[600px]  flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-8'>
				<h2 className='w-[336px] text-[56px] tracking-[-0.04em] leading-[52px] uppercase font-black text-white text-left mb-6'>
					Skills
				</h2>
			</div>
			<div className='w-[300px] sm:w-[600px] lg:w-[800px] relative'>
				<div className='absolute inset-0 border-8 border-white' aria-hidden='true' />
				<div className='w-full relative bottom-10 left-[21px]'>
					<div className='flex flex-col gap-2'>
						{SC_ROWS.map((row) => (
							<div key={row.title} className='bg-white p-4 shadow-md sm:w-[590px] lg:w-[790px] w-[300px]'>
								<div className='flex flex-wrap flex-col md:flex-row gap-[18px]'>
									<div className='shrink-0 uppercase font-bold text-black text-lg'>
										{row.title}
									</div>
									<div className='grow flex justify-end'>
										<div className='flex flex-row flex-wrap gap-2 text-sm text-[#13692d]'>
											{row.items.map((item) => (
												<div key={item} className='bg-[#d0f1da] flex items-center justify-center p-2'>
													<span className='leading-6'>{item}</span>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default function Skills({ variant } = {}) {
	if (variant === 'sc') return <ScSkills />;

	return (
		<div className='flex flex-col items-center justify-center'>
			{/* Skills Header */}
			<div className='3xl:w-[730px] xl:w-[730px] lg:w-[730px] md:w-[600px]  flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-8'>
				<h2 data-motion='heading' className='w-[336px] text-[56px] tracking-[-0.04em] leading-[52px] uppercase font-black text-white text-left mb-6'>
					Skills
				</h2>
			</div>
			{/* Skills border frame, sized by the rows it holds */}
			<div className='w-[300px] sm:w-[600px] lg:w-[800px] relative'>
				<div className='absolute inset-0 border-8 border-white' aria-hidden='true' />
				{/* Rows offset relative to the border */}
				<div className='w-full relative bottom-10 left-[21px]'>
					{/* Skills Rows Container with padding and gap */}
					<div className='flex flex-col gap-2'>
						{/* Row 1: Frontend Development Skills */}
						<div data-motion='row' className='bg-white p-4 shadow-md sm:w-[590px] lg:w-[790px] w-[300px]'>
							<div className='flex flex-wrap flex-col md:flex-row gap-[18px]'>
								<div className='shrink-0 uppercase font-bold text-black text-lg'>
									Frontend Development
								</div>
								<div className='grow flex justify-end'>
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
								{/* <div className='grow flex justify-end'>
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
						<div data-motion='row' className='bg-white p-4 shadow-md sm:w-[590px] lg:w-[790px] w-[300px]'>
							<div className='flex flex-wrap flex-col md:flex-row gap-[18px]'>
								<div className='shrink-0 uppercase font-bold text-black text-lg'>
									Backend Development
								</div>
								<div className='grow flex justify-end'>
									<div className='flex flex-row flex-wrap gap-2 text-sm text-[#13692d]'>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Node.js
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Express
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Java
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
								{/* <div className='grow flex justify-end'>
									<div className='flex flex-row gap-2 text-sm text-[#13692d]'>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												
											</span>
										</div>
									</div>
								</div> */}
							</div>
						</div>
						{/* Row: Automation & Outreach */}
						<div data-motion='row' className='bg-white p-4 shadow-md sm:w-[590px] lg:w-[790px] w-[300px]'>
							<div className='flex flex-wrap flex-col md:flex-row gap-[18px]'>
								<div className='shrink-0 uppercase font-bold text-black text-lg'>
									Automation &amp; Outreach
								</div>
								<div className='grow flex justify-end'>
									<div className='flex flex-row flex-wrap gap-2 text-sm text-[#13692d]'>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Keap (Infusionsoft)
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Klaviyo
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Postmark
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Twilio
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Zapier
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												IFTTT
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Webhooks
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Web Scraping
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												Google Places API
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												OpenAI API
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* Row 3: Database Skills */}
						<div data-motion='row' className='bg-white p-4 shadow-md sm:w-[590px] lg:w-[790px] w-[300px]'>
							<div className='flex flex-wrap flex-col md:flex-row gap-[18px]'>
								<div className='shrink-0 uppercase font-bold text-black text-lg'>
									Database Skills
								</div>
								<div className='grow flex justify-end'>
									<div className='flex flex-row flex-wrap gap-2 text-sm text-[#13692d]'>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												PostgreSQL
											</span>
										</div>
										<div className='bg-[#d0f1da] flex items-center justify-center p-2'>
											<span className='leading-6'>
												MySQL
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
									</div>
								</div>
								{/* <div className='grow flex justify-end'>
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
						<div data-motion='row' className='bg-white p-4 shadow-md sm:w-[590px] lg:w-[790px] w-[300px]'>
							<div className='flex flex-wrap flex-col md:flex-row gap-[18px]'>
								<div className='shrink-0 uppercase font-bold text-black text-lg'>
									Tools and Technologies
								</div>
								<div className='grow flex justify-end'>
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
								{/* <div className='grow flex justify-end'>
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
						<div data-motion='row' className='bg-white p-4 shadow-md sm:w-[590px] lg:w-[790px] w-[300px]'>
							<div className='flex flex-wrap flex-col md:flex-row gap-[18px]'>
								<div className='shrink-0 uppercase font-bold text-black text-lg'>
									Additional Skills
								</div>
								<div className='grow flex justify-end'>
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
												Claude Code
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
								{/* <div className='grow flex justify-end'>
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
						<div data-motion='row' className='bg-white p-4 shadow-md sm:w-[590px] lg:w-[790px] w-[300px]'>
							<div className='flex flex-wrap flex-col md:flex-row gap-[18px]'>
								<div className='shrink-0 uppercase font-bold text-black text-lg'>
									Soft Skills
								</div>
								<div className='grow flex justify-end'>
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
								{/* <div className='grow flex justify-end'>
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
