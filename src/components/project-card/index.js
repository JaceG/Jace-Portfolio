/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

export default function Card({
	children,
	title,
	description,
	image,
	github,
	isCenter = false,
	motionDelay = 0,
	href,
	// 'inverted' is the green-on-white version for a white section.
	variant,
}) {
	function toSlug(text) {
		return text.toLowerCase().replace(/ /g, '-');
	}

	const slug = toSlug(title);
	const link = href || `/case-study/${slug}`;
	const inv = variant === 'inverted';
	return (
		<div
			data-motion='card'
			data-motion-hover
			data-motion-delay={motionDelay}
			className={`w-[330px] h-[540px] sm:w-[460px] sm:h-[480px] border-11 ${inv ? 'border-[#39bb6a]' : 'border-white'} relative ${
				isCenter ? '3xl:mt-60' : ''
			}`}>
			<div data-motion-sheet className={`${inv ? 'bg-[#39bb6a]' : 'bg-white'} w-full h-full absolute bottom-8 left-8`}>
				<div className='p-8'>
					<Link href={link}>
						<img
							src={image}
							alt={title}
							className='mb-2 h-[198px] w-[400px] object-cover cursor-pointer'
						/>
					</Link>
					<h2 className={`sm:text-4xl text-2xl font-bold ${inv ? 'text-white' : 'text-black'} uppercase mb-2`}>
						{title}
					</h2>
					<p className={`${inv ? 'text-white/90' : 'text-tertiary'} text-base leading-6`}>
						{description}
					</p>
					<div className='relative w-full flex flex-row items-center py-4 text-center text-base gap-4 text-white'>
						<Link
							href={link}
							className={`relative rounded-sm ${inv ? 'bg-white text-[#39bb6a]' : 'bg-[#39bb6a]'} p-3 tracking-[-0.04em] block w-[140px] uppercase font-black`}>
							See App
						</Link>
						{github && (
							<a
								href={github}
								target='_blank'
								className={`relative rounded-sm border-4 ${inv ? 'border-white/60 text-white' : 'border-[rgba(57,187,106,0.5)] text-[#39bb6a]'} box-border w-[80px] flex flex-row items-center justify-center py-3 px-5 text-center text-base`}>
								<span className='relative tracking-[-0.04em] uppercase font-black'>{`</>`}</span>
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
