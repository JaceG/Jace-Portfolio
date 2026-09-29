import { PORTFOLIO_URL } from '@/constants/services';
import { Container } from './ui';

export default function ServicesFooter() {
	return (
		<footer className='border-t border-line py-10 text-sm text-muted'>
			<Container className='flex flex-col items-center justify-between gap-3 sm:flex-row'>
				<p>© {new Date().getFullYear()} Jace Galloway</p>
				{/* A plain <a>: the portfolio is a different root layout, so
				    this is a full page load either way. */}
				<a href={PORTFOLIO_URL} className='underline-offset-4 hover:text-ink hover:underline'>
					Looking to hire me full-time? See my portfolio →
				</a>
			</Container>
		</footer>
	);
}
