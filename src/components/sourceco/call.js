import Section from '../section';
import { SC_CALL_URL, SC_TEXT_URL } from '@/constants/sourceco';

const BTN =
	'rounded-sm bg-black flex items-center justify-center py-5 w-[260px] text-center text-xl text-white tracking-[-0.04em] uppercase font-black';

export default function Call() {
	return (
		<Section>
			<div className='flex flex-col items-center justify-center pb-32 px-8'>
				<h1 className='text-center sm:text-9xl text-6xl font-bold text-white uppercase mb-10'>
					Connect
				</h1>
				<div className='max-w-[760px] text-center text-white'>
					<p className='text-2xl sm:text-3xl font-bold leading-snug'>
						Ask me how I&apos;d build SourceCo a mobile app that works as a
						lead magnet, a customer incubator and a client retention tool.
					</p>
					<p className='mt-6 text-lg sm:text-xl'>
						If I don&apos;t pick up, please text me so I know to call you
						back.
					</p>
				</div>
				<div className='mt-12 flex flex-col sm:flex-row gap-6'>
					<a href={SC_CALL_URL} className={BTN}>
						Call me
					</a>
					<a href={SC_TEXT_URL} className={BTN}>
						Text me
					</a>
				</div>
			</div>
		</Section>
	);
}
