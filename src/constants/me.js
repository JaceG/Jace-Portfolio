export const tabsContents = [
	{
		key: '1',
		label: 'Developer',
		selected: true,
		children: (
			<div
				className='text-fade-in'
				style={{
					textAlign: 'justify',
				}}>
				<p>
					I am a recent graduate of The Ohio State University, where I
					specialized in React and modern JavaScript frameworks but
					have since moved on to learn mobile and software development
					through native, expo, Java, Python etc. My unique background
					in digital marketing and sales provides me with valuable
					insights into user behavior and business needs, allowing me
					to bridge the gap between technical requirements and
					marketing objectives while building responsive, user-focused
					web applications.
				</p>
				<br />
				<p>
					What sets me apart is my soft skills developed through my
					previous career. My experience has cultivated exceptional
					self-awareness, tact, patience, and active listening
					abilities - qualities that make me an effective team member.
					While I may be new to development, my ability to understand
					both business and technical perspectives positions me
					uniquely to contribute meaningful solutions to any
					development team.
				</p>
			</div>
		),
	},
	{
		key: '2',
		label: '',
		selected: false,
		children: null,
		type: 'textSwitch',
		onTab: '1',
		offTab: '3',
	},
	{
		key: '3',
		label: 'AI Engineer',
		selected: false,
		children: (
			<div
				className='text-fade-in'
				style={{
					textAlign: 'justify',
				}}>
				<p>
					I&apos;m positioned at the forefront of the next evolution
					in software development as an <strong>AI Engineer</strong>.
					While traditional coding skills remain valuable, I
					understand that the future belongs to professionals who can
					bridge human intent and machine capability through
					sophisticated prompt design and AI orchestration. My
					background in digital marketing and sales provides crucial
					insights into user psychology and business
					objectives—essential skills for crafting prompts that
					deliver meaningful results.
				</p>
				{/* <br />
				<p>
					What distinguishes Jace is his commitment to intellectual
					breadth, demonstrated through his curated collection of
					books spanning psychology, philosophy, history, science, and
					communication. This interdisciplinary foundation enables him
					to understand the complex interplay between human cognition,
					business context, and AI capabilities. As the industry
					shifts toward engineers taking more supervisory
					roles—designing systems rather than writing every line of
					code—Jace is prepared to be a strategic architect of
					AI-human collaboration.
				</p> */}
				<br />
				<p>
					My approach to prompt engineering combines technical
					precision with humanistic understanding, recognizing that
					effective AI communication requires not just knowing what to
					ask, but understanding why and how to frame those requests.
					Check out the books section to see the intellectual
					foundation that informs my perspective on the future of
					human-AI collaboration.
				</p>
			</div>
		),
	},
];
