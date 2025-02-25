import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/components/header';
import './globals.css';
import Footer from '@/components/footer';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata = {
	title: 'Hire Jace',
	description: 'Seriously. Hire me.',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} bg-primary text-secondary antialiased !scroll-smooth`}>
				<Header></Header>
				{children}
				<Footer></Footer>
				<script
					src='https://player.vimeo.com/api/player.js'
					async></script>
			</body>
		</html>
	);
}
