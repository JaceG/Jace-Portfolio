import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Sidebar({ onSidebarClose }) {
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

	const handleBackdropClicked = () => {
		onSidebarClose();
	};

	return (
		<div
			onClick={handleBackdropClicked}
			className='w-full h-screen bg-[rgba(0,0,0,0.3)] block sm:hidden fixed top-0 left-0 z-30'>
			<div className='fixed top-0 left-0 w-[calc(100vw-100px)] h-screen bg-primary z-50'>
				<ul className='text-2xl p-4'>
					<li className='pb-4'>
						<Link onClick={smoothScroll} href='/#me'>
							HOME
						</Link>
					</li>
					<li className='pb-4'>
						<Link onClick={smoothScroll} href='/#projects'>
							WORK
						</Link>
					</li>
					<li className='pb-4'>
						<Link onClick={smoothScroll} href='/#connect'>
							CONTACT
						</Link>
					</li>
					{/* <li>
						<a href='#learn'>LEARN</a>
					</li> */}
				</ul>
			</div>
		</div>
	);
}

export default Sidebar;
