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
					<strong>Jace</strong> is a recent graduate of The Ohio State
					University&apos;s Full Stack Development Bootcamp, where he
					specialized in React and modern JavaScript frameworks. His
					unique background in digital marketing and sales provides
					him with valuable insights into user behavior and business
					needs, allowing him to bridge the gap between technical
					requirements and marketing objectives while building
					responsive, user-focused web applications.
				</p>
				<br />
				<p>
					What sets Jace apart is his soft skills developed through
					his previous career. His experience has cultivated
					exceptional self-awareness, tact, patience, and active
					listening abilities - qualities that make him an effective
					team member. While he may be new to development, his ability
					to understand both business and technical perspectives
					positions him uniquely to contribute meaningful solutions to
					any development team.
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
		label: 'AI Expert',
		selected: false,
		children: (
			<div
				className='text-fade-in'
				style={{
					textAlign: 'justify',
				}}>
				<p>
					<strong>Jace</strong> is a recent AI Expert graduate of The
					Ohio State University&apos;s Full Stack Development
					Bootcamp, where he specialized in React and modern
					JavaScript frameworks. His unique background in digital
					marketing and sales provides him with valuable insights into
					user behavior and business needs, allowing him to bridge the
					gap between technical requirements and marketing objectives
					while building responsive, user-focused web applications.
				</p>
				<br />
				<p>
					What sets Jace apart is his soft skills developed through
					his previous career. His experience has cultivated
					exceptional self-awareness, tact, patience, and active
					listening abilities - qualities that make him an effective
					team member. While he may be new to development, his ability
					to understand both business and technical perspectives
					positions him uniquely to contribute meaningful solutions to
					any development team.
				</p>
			</div>
		),
	},
];
