import { SC_CONCEPTS_URL } from '@/constants/sourceco';

// White, and flush with the deck above it (no Section spacer), so the page's
// alternating backgrounds stay intact.
export default function Concepts() {
	return (
		<div className='relative -mt-px bg-white flex flex-col items-center px-8 pb-28 pt-2 text-center'>
			<h1 className='sm:text-9xl text-6xl font-bold text-[#39bb6a] uppercase mb-4'>
				Concepts
			</h1>
			<p className='max-w-xl text-lg text-black/70'>
				Working concepts for SourceCo, each built from something on your
				site today.
			</p>
			<a
				href={SC_CONCEPTS_URL}
				target='_blank'
				rel='noopener noreferrer'
				className='mt-10 rounded-sm bg-black px-10 py-4 text-base font-black uppercase tracking-[-0.04em] text-white'>
				See the concepts ↗
			</a>
		</div>
	);
}
