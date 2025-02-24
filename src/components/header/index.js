'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
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

	return (
		<header className='w-full sticky top-0 z-20 bg-primary'>
			<nav className='flex justify-end items-center p-4'>
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
	);
}
