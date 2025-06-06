/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

export default function Card({
	children,
	title,
	description,
	image,
	github,
	isCenter = false,
}) {
	function toSlug(text) {
		return text.toLowerCase().replace(/ /g, '-');
	}

	const slug = toSlug(title);
	return (
		<div
			className={`w-[330px] h-[540px] sm:w-[460px] sm:h-[480px] border-[11px] border-white relative ${
				isCenter ? '3xl:mt-60' : ''
			}`}>
			<div className='bg-white w-full h-full absolute bottom-8 left-8'>
				<div className='p-8'>
					<Link href={`/case-study/${slug}`}>
						<img
							src={image}
							alt={title}
							className='mb-2 h-[198px] w-[400px] object-cover cursor-pointer'
						/>
					</Link>
					<h2 className='sm:text-4xl text-2xl font-bold text-black uppercase mb-2'>
						{title}
					</h2>
					<p className='text-tertiary text-base leading-6'>
						{description}
					</p>
					<div className='relative w-full flex flex-row items-center py-4 text-center text-base gap-4 text-white'>
						<Link
							href={`/case-study/${slug}`}
							className='relative rounded bg-[#39bb6a] p-3 tracking-[-0.04em] block w-[140px] uppercase font-black'>
							Case Study
						</Link>
						<a
							href={github}
							target='_blank'
							className='relative rounded border-4 border-[rgba(57,187,106,0.5)] box-border w-[80px] flex flex-row items-center justify-center py-3 px-5 text-center text-base text-[#39bb6a]'>
							<span className='relative tracking-[-0.04em] uppercase font-black'>{`</>`}</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
