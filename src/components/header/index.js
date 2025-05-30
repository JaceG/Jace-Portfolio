'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Sidebar from './sidebar';
import { useState } from 'react';

export default function Header() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const navigation = useRouter();
	const smoothScroll = (e) => {
		e.preventDefault();
		const pathname = window.location.pathname;
		if (pathname === '/') {
			const target = e.target.href.split('#')[1];
			const element = document.getElementById(target);
			element.scrollIntoView({ behavior: 'smooth' });
		} else {
			navigation.push(e.target.href);
		}
	};

	const handleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<>
			{isSidebarOpen && <Sidebar onSidebarClose={handleSidebar} />}
			<header className='w-full sticky top-0 z-20 bg-primary'>
				<button
					onClick={handleSidebar}
					className='flex justify-center items-center m-auto p-4 sm:hidden'>
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
				<nav className='hidden sm:flex justify-end items-center p-4'>
					<ul className='flex space-x-4 text-2xl'>
						<li>
							<Link onClick={smoothScroll} href='/#me'>
								ME
							</Link>
						</li>
						<li>
							<Link onClick={smoothScroll} href='/#projects'>
								WORK
							</Link>
						</li>
						<li>
							<Link onClick={smoothScroll} href='/#books'>
								BOOKS
							</Link>
						</li>
						<li>
							<Link onClick={smoothScroll} href='/#connect'>
								CONTACT
							</Link>
						</li>
						{/* <li>
						<a href='#learn'>LEARN</a>
					</li> */}
					</ul>
				</nav>
			</header>
		</>
	);
}
