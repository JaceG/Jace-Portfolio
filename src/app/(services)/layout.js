import { Fraunces, Instrument_Sans } from 'next/font/google';
import './services.css';

// Root layout for the services site. It is a separate root from the
// portfolio's (see app/(portfolio)/layout.js), so none of the portfolio's
// header, footer, terminal or analytics load here.

const fraunces = Fraunces({
	variable: '--font-fraunces',
	subsets: ['latin'],
});

const instrument = Instrument_Sans({
	variable: '--font-instrument',
	subsets: ['latin'],
});

export const metadata = {
	metadataBase: new URL('https://www.hirejace.com'),
	title: {
		default: 'Jace Galloway — Website Modernization',
		template: '%s | Jace Galloway Web Development',
	},
	authors: [{ name: 'Jace Galloway' }],
	creator: 'Jace Galloway',
	formatDetection: { email: false, address: false, telephone: false },
	icons: {
		icon: [
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
		],
		apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
	},
};

export const viewport = {
	themeColor: '#f7f4ee',
};

export default function ServicesRootLayout({ children }) {
	return (
		<html lang='en'>
			<body
				className={`${fraunces.variable} ${instrument.variable} font-sans antialiased`}>
				{children}
			</body>
		</html>
	);
}
