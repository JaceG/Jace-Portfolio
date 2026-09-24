'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from './sidebar';
import { navTo, usePageNav } from './nav';
import { useState } from 'react';

export default function Header() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const navigation = useRouter();
	// Subscribing to the pathname re-renders the header on navigation, which
	// re-reads the page's nav attributes.
	usePathname();
	const nav = usePageNav();
	const smoothScroll = (e) => navTo(e, navigation);

	const handleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<>
			{isSidebarOpen && <Sidebar onSidebarClose={handleSidebar} nav={nav} />}
			<header className='w-full sticky top-0 z-20 bg-primary relative'>
				{/* Ink overlay: fully opaque while the home-page hero is solid,
				    fades out as the hero fizzles (driven by --hero-ink), and is
				    absent on every other page so the nav stays green. */}
				<div
					aria-hidden='true'
					className='pointer-events-none absolute inset-0 bg-ink'
					style={{ opacity: 'var(--hero-ink, 0)' }}
				/>
				<button
					onClick={handleSidebar}
					className='relative flex justify-center items-center m-auto p-4 sm:hidden'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='white'
						className='size-8'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
						/>
					</svg>
				</button>
				<nav className='relative hidden sm:flex justify-end items-center p-4'>
					<ul className='flex space-x-4 text-2xl'>
						{nav.items.map(([id, label]) => (
							<li key={id}>
								<Link onClick={smoothScroll} href={`${nav.base}/#${id}`}>
									{label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</header>
		</>
	);
}
