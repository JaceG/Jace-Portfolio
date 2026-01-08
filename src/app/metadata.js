export const metadata = {
	metadataBase: new URL('https://hirejace.com'),
	title: {
		default:
			'Jace Galloway - Full-Stack Developer & Software Engineer Portfolio',
		template: '%s | Jace Galloway',
	},
	description:
		'Full-stack software engineer specializing in React, Node.js, TypeScript, and modern web development. View my portfolio of innovative web applications, mobile apps, and AI-powered solutions.',
	keywords: [
		'Jace Galloway',
		'full-stack developer',
		'software engineer',
		'React developer',
		'Node.js developer',
		'TypeScript developer',
		'web development',
		'portfolio',
		'JavaScript',
		'MongoDB',
		'Express',
		'MERN stack',
		'Next.js',
		'mobile app development',
		'React Native',
		'AI development',
		'OpenAI integration',
		'web applications',
		'frontend developer',
		'backend developer',
	],
	authors: [{ name: 'Jace Galloway' }],
	creator: 'Jace Galloway',
	publisher: 'Jace Galloway',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://hirejace.com',
		title: 'Jace Galloway - Full-Stack Developer & Software Engineer',
		description:
			'Full-stack software engineer specializing in React, Node.js, TypeScript, and modern web development. View my portfolio of innovative web applications.',
		siteName: 'Jace Galloway Portfolio',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Jace Galloway - Full-Stack Developer Portfolio',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Jace Galloway - Full-Stack Developer & Software Engineer',
		description:
			'Full-stack software engineer specializing in React, Node.js, TypeScript, and modern web development.',
		images: ['/og-image.png'],
		creator: '@jacegalloway',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	icons: {
		icon: [
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
		],
		apple: [
			{
				url: '/apple-touch-icon.png',
				sizes: '180x180',
				type: 'image/png',
			},
		],
		other: [
			{
				rel: 'android-chrome-192x192',
				url: '/android-chrome-192x192.png',
			},
			{
				rel: 'android-chrome-512x512',
				url: '/android-chrome-512x512.png',
			},
		],
	},
	manifest: '/site.webmanifest',
	verification: {
		google: 'your-google-verification-code',
		// Add other verification codes as needed
	},
};
