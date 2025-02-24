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
							<strong>Jace</strong> is a former digital marketer
							and newly minted React developer and a recent
							graduate of The Ohio State University&apos;s Full
							Stack Development Bootcamp , where he honed his
							skills in building responsive, dynamic web
							applications with a focus on React. Combining a
							strong foundation in modern JavaScript frameworks
							with a passion for clean, efficient code, Jace has
							cultivated the technical and problem-solving skills
							necessary to excel in the fast-paced world of web
							app development.
						</p>
						<br />
						<p>
							His former experience in the world of marketing
							gives him a unique perspective on user behavior and
							how to create applications that not only look great
							but also provide a seamless user experience. He
							understands that sometimes the needs of the
							marketing team are not always what an engineer would
							think is ideal, and can use this perspective to find
							solutions that are ideal for both marketing goals
							while not sacrificing engineering principles.
						</p>
						<br />
						<p>
							Beyond coding, what sets Jace apart is his skills in
							leveraging advanced AI tools like ChatGPT from his
							unique interdisciplinary background in subjects such
							as communication, psychology, and bias. Also,
							advanced English language topics such as
							linguistics, the roots of language, how children
							learn language, and whether or not language is
							hardwired into the human brain. His constant
							curiosity in researching these subjects increases
							his ability to understand not only user behavior,
							but also how to communicate effectively with AI
							models.
						</p>
						<br />
						<p>
							Jace is eager to bring these diverse talents to a
							collaborative team. He is actively exploring
							opportunities in web development, AI, or any roles
							that benefit from his blend of technical skills and
							marketing insight, with a particular interest in the
							emerging field of prompt engineering. He is prepared
							to apply his new skills to any appropriate project,
							opportunities, or internships, and is excited to
							contribute to your team&apos;s success.
						</p>
					</div>
				</div>
			</main>
		</Section>
	);
}
