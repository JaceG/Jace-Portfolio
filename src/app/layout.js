'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import { useEffect } from 'react';
import Hotjar from '@hotjar/browser';
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

const structuredData = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: 'Jace Galloway',
	url: 'https://jacegalloway.com',
	jobTitle: 'Full-Stack Software Engineer',
	description:
		'Full-stack software engineer specializing in React, Node.js, TypeScript, and modern web development.',
	knowsAbout: [
		'JavaScript',
		'TypeScript',
		'React',
		'Node.js',
		'Express.js',
		'MongoDB',
		'Next.js',
		'React Native',
		'Full-Stack Development',
		'Web Development',
		'Mobile Development',
		'AI Integration',
		'OpenAI',
		'RESTful APIs',
		'GraphQL',
		'Git',
		'Agile Development',
	],
	sameAs: [
		'https://github.com/JaceG',
		'https://linkedin.com/in/jacegalloway',
		// Add other social profiles
	],
};

export default function RootLayout({ children }) {
	useEffect(() => {
		Hotjar.init(5320763, 6);
	}, []);

	return (
		<html lang='en'>
			<head>
				{/* Preconnect to external domains for performance */}
				<link
					rel='preconnect'
					href='https://fonts.googleapis.com'
				/>
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='anonymous'
				/>
				<link
					rel='preconnect'
					href='https://player.vimeo.com'
				/>
				<link
					rel='preconnect'
					href='https://github.com'
				/>

				{/* DNS Prefetch for additional performance */}
				<link
					rel='dns-prefetch'
					href='https://www.googletagmanager.com'
				/>

				{/* Structured Data */}
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(structuredData),
					}}
				/>

				{/* Theme Color for mobile browsers */}
				<meta
					name='theme-color'
					content='#0A0E27'
				/>
				<meta
					name='msapplication-TileColor'
					content='#39BD6D'
				/>
			</head>
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
