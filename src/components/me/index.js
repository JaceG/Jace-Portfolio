/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import me from '@/assets/me.png';
import { SocialIcon } from 'react-social-icons';
import Section from '../section';

export default function Me() {
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
			<main className='flex md:flex-row flex-col'>
				<div className='md:flex-1 flex md:justify-end justify-center md:mt-0 mt-32'>
					<div className='xl:mr-[75px] md:mr-[60px] w-full md:w-auto'>
						<div className='xl:h-[800px] xl:w-[600px] md:h-[475px] md:w-[350px] h-[450px] w-[calc(100%-50px)] m-auto md:m-0 border-[11px] border-white relative -translate-x-[10px] md:translate-x-0'>
							<div className='absolute z-10 xl:left-[580px] md:left-[330px] -top-52 md:top-0'>
								<h1 className='text-white xl:text-[112px] md:text-[72px] font-black uppercase xl:leading-[102px] md:leading-[72px] text-[52px]'>
									Jace
								</h1>
								<h1 className='text-white xl:text-[112px] md:text-[72px] font-black uppercase xl:leading-[102px] md:leading-[72px] text-[52px] leading-[42px]'>
									Galloway
								</h1>
								<img
									src={'/line.svg'}
									alt='Line'
									className='about-img relative xl:right-[315px] md:right-[175px] xl:w-[925px] md:w-[550px] hidden md:block'
								/>
								<img
									src={'/line-curved-2.svg'}
									alt='Line'
									className='about-img relative xl:right-[300px] md:right-[150px] xl:w-[925px] md:w-[550px] md:hidden block top-8'
								/>
							</div>
							<Image
								src={me}
								alt='Me'
								className='md:max-w-auto object-cover absolute md:left-5 md:bottom-[30px] bottom-[25px] left-6 xl:w-[600px] xl:h-[800px] md:w-[360px] h-full w-full'
							/>
						</div>
						<div className='flex md:justify-between justify-center items-center md:flex-row flex-col md:mt-[50px] mt-8'>
							<div className='flex xl:gap-4 md:gap-2 gap-10'>
								{socialLinks.map((link, index) => (
									<SocialIcon
										key={link.label + index}
										url={link.url}
										target='_blank'
										className='xl:!w-[60px] xl:!h-[60px] md:!w-[40px] md:!h-[40px] !h-20 !w-20'
										rel='noopener noreferrer'
									/>
								))}
							</div>
							<a
								href='https://drive.google.com/uc?export=download&id=1lvE1VHpLcgTLfk86HLCBhHR5ShVrwHI1'
								className='relative rounded bg-black flex items-center justify-center xl:py-4 xl:px-10 md:py-2 md:px-6 my-16 md:my-0 py-6 px-12 box-border text-center text-base text-white tracking-[-0.04em] uppercase font-black'>
								Download Resume
							</a>
						</div>
					</div>
				</div>
				<div className='md:flex-1 md:px-0 px-10 md:text-left text-center'>
					<div className='xl:max-w-[715px] md:pr-24 text-[20px] leading-[32px]'>
						<p className='xl:mt-[275px] md:mt-[200px]'>
							<strong>Jace</strong> is a recent graduate of The
							Ohio State University&apos;s Full Stack Development
							Bootcamp, where he specialized in React and modern
							JavaScript frameworks. His unique background in
							digital marketing and sales provides him with
							valuable insights into user behavior and business
							needs, allowing him to bridge the gap between
							technical requirements and marketing objectives
							while building responsive, user-focused web
							applications.
						</p>
						<br />
						<p>
							What sets Jace apart is his combination of technical
							skills and strong soft skills developed through his
							previous career. His experience has cultivated
							exceptional self-awareness, tact, patience, and
							active listening abilities - qualities that make him
							an effective team member and quick learner. While he
							may be new to development, his ability to understand
							both business and technical perspectives positions
							him uniquely to contribute meaningful solutions to
							any development team.
						</p>
					</div>
				</div>
			</main>
		</Section>
	);
}
