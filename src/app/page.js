import Hero from '@/components/hero';
import { FIZZLE_VH, HOLD_VH, NAV_HEIGHT } from '@/components/hero/constants';
import Me from '@/components/me';
import GithubWork from '@/components/github-work';
import Projects from '@/components/projects';
import Resume from '@/components/resume';
import Connect from '@/components/connect';
import Books from '@/components/books';

export default function Home() {
	return (
		<main>
			{/* Fixed, full-viewport hero that fizzles out over the first
			    FIZZLE_VH viewport-heights of scroll. */}
			<Hero />

			{/* The intro section is pinned for that same scroll distance so the
			    hero dissolves into it in place, then holds for HOLD_VH more so it
			    can be seen cleanly before the page moves on. The trailing spacer
			    is the total pin length (sticky elements can only travel within
			    the parent's content box, so it must be a real element, not
			    padding). The #me anchor marks the point where the hero is gone. */}
			<div className='relative'>
				<div
					id='me'
					aria-hidden='true'
					className='absolute left-0 h-px w-px'
					style={{ top: `calc(${FIZZLE_VH * 100}vh - ${NAV_HEIGHT}px)` }}
				/>
				<section
					aria-label='About Jace Galloway'
					className='sticky pb-24 md:pb-section'
					style={{ top: NAV_HEIGHT }}>
					<Me />
				</section>
				<div
					aria-hidden='true'
					style={{ height: `${(FIZZLE_VH + HOLD_VH) * 100}vh` }}
				/>
			</div>
			<section
				id='github'
				aria-label='Live GitHub activity'>
				<GithubWork />
			</section>
			<section
				id='projects'
				aria-label='Portfolio Projects'>
				<Projects />
			</section>
			<section
				id='resume'
				aria-label='Resume and Experience'>
				<Resume />
			</section>
			<section
				id='books'
				aria-label='Books and Learning'>
				<Books />
			</section>
			<section
				id='connect'
				aria-label='Contact Information'>
				<Connect />
			</section>
		</main>
	);
}
