import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { navTo } from '../nav';

// The mobile menu keeps its own short list on the portfolio; a page that
// re-homes the nav (see Header) gets its own items here too.
const DEFAULT_ITEMS = [
	['me', 'HOME'],
	['projects', 'WORK'],
	['connect', 'CONTACT'],
];

function Sidebar({ onSidebarClose, nav }) {
	const navigation = useRouter();
	const smoothScroll = (e) => navTo(e, navigation);
	const base = nav?.base || '';
	const items = base ? nav.items : DEFAULT_ITEMS;

	const handleBackdropClicked = () => {
		onSidebarClose();
	};

	return (
		<div
			onClick={handleBackdropClicked}
			className='w-full h-screen bg-[rgba(0,0,0,0.3)] block sm:hidden fixed top-0 left-0 z-30'>
			<div className='fixed top-0 left-0 w-[calc(100vw-100px)] h-screen bg-primary z-50'>
				<ul className='text-2xl p-4'>
					{items.map(([id, label]) => (
						<li key={id} className='pb-4'>
							<Link onClick={smoothScroll} href={`${base}/#${id}`}>
								{label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Sidebar;
