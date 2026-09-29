import { NAV, SERVICES_BASE } from '@/constants/services';
import { BookButton } from './ui';

export default function ServicesHeader() {
	return (
		<header className='sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur'>
			<div className='mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6'>
				<a href={SERVICES_BASE} className='flex flex-col leading-tight'>
					<span className='font-display text-xl font-semibold tracking-tight'>
						Jace Galloway
					</span>
					<span className='text-xs font-medium uppercase tracking-[0.14em] text-muted'>
						Web Development
					</span>
				</a>
				<nav aria-label='Sections' className='hidden md:block'>
					<ul className='flex gap-6 text-sm font-medium text-muted'>
						{NAV.map(([id, label]) => (
							<li key={id}>
								<a href={`#${id}`} className='transition-colors hover:text-ink'>
									{label}
								</a>
							</li>
						))}
					</ul>
				</nav>
				<BookButton href='#schedule' size='sm'>
					Book a call
				</BookButton>
			</div>
		</header>
	);
}
