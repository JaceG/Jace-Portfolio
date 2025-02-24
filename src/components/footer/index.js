import { SocialIcon } from 'react-social-icons';
import Section from '../section';

export default function Footer() {
	const socialLinks = [
		{
			url: 'https://github.com/JaceG',
			label: 'GitHub',
			style: { filter: 'invert(1)' },
		},
		{
			url: 'https://linkedin.com/in/jace-galloway-6833a4249',
			label: 'LinkedIn',
		},
		{
			url: 'https://stackoverflow.com/users/1450474/jace',
			label: 'StackOverflow',
		},
	];
	return (
		<Section>
			<footer className='w-full'>
				<div className='flex sm:flex-row flex-col max-w-[1024px] mx-auto items-center justify-between'>
					<p>© 2025 Jace Galloway</p>
					<div className='flex justify-between my-4'>
						<div className='flex gap-4'>
							{socialLinks.map((link, index) => (
								<SocialIcon
									key={link.label + index}
									url={link.url}
									target='_blank'
									rel='noopener noreferrer'
									style={{
										height: 60,
										width: 60,
										...(link.style || {}),
									}}
								/>
							))}
						</div>
					</div>
				</div>
			</footer>
		</Section>
	);
}
