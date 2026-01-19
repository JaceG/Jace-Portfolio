// Project data for metadata generation
const projects = {
	'dating-tool-app': {
		title: 'Dating Tool App',
		description:
			'A React Expo mobile app for tracking relationship red-flags using a kanban board interface.',
		image: '/og-dating-tool-app.png',
	},
	'react-learning-stories': {
		title: 'React Learning Stories',
		description:
			'An interactive learning platform for React through storytelling and hands-on exercises.',
		image: '/og-react-learning-stories.png',
	},
	'the-vegan-aisle': {
		title: 'The Vegan Aisle',
		description:
			'An online marketplace database of vegan grocery items and store availability.',
		image: '/og-the-vegan-aisle.png',
	},
	'positive-postcards': {
		title: 'Positive Postcards',
		description:
			'A subscription site that delivers affirmation postcards to your mailboxes.',
		image: '/og-positive-postcards.png',
	},
	'company-hunter': {
		title: 'Company Hunter',
		description:
			'A business search application with AI-powered search suggestions and caching.',
		image: '/og-company-hunter.png',
	},
	'pdf-wonder-kit': {
		title: 'PDF Wonder Kit',
		description:
			'A browser-based application for extracting page ranges from PDF documents with secure client-side processing.',
		image: '/og-pdf-wonder-kit.png',
	},
	'sports-betting-charts': {
		title: 'Sports Betting Charts',
		description:
			'A sports betting balance tracker with analytics and profit calculators.',
		image: '/og-sports-betting-charts.png',
	},
	'spotify-playlist-ai': {
		title: 'Spotify Playlist AI',
		description:
			'AI-powered personalized Spotify playlist generator using OpenAI and Spotify Web API.',
		image: '/og-spotify-playlist-ai.png',
	},
	'marketing-email-api': {
		title: 'Marketing Email API',
		description:
			'A data scraper with email automation, Shopify & WordPress integrations.',
		image: '/og-image.png',
	},
	'random-movie-generator': {
		title: 'Random Movie Generator',
		description:
			'A Random Movie Generator that allows users to discover movies tailored to their preferences.',
		image: '/og-random-movie-generator.png',
	},
	showfinder: {
		title: 'ShowFinder',
		description:
			'An app that allows users to discover live shows in their area.',
		image: '/og-showfinder.png',
	},
	'book-search-engine': {
		title: 'Book Search Engine',
		description:
			'A MERN stack app that lets users search and save books from Google Books API.',
		image: '/og-book-search-engine.png',
	},
	'weather-dashboard': {
		title: 'Weather Dashboard',
		description:
			'A weather dashboard that lets users search for weather by city and a 5-day forecast.',
		image: '/og-weather-dashboard.png',
	},
	'piano-player': {
		title: 'Piano Player',
		description:
			'A virtual piano that allows users to create and playback musical sequences directly in their web browser.',
		image: '/og-piano-player.png',
	},
	'github-candidate-search': {
		title: 'Github Candidate Search',
		description:
			'A Tinder-like app that allows users to search for potential candidates on GitHub.',
		image: '/og-github-candidate-search.png',
	},
	'github-ci-cd': {
		title: 'Github CI-CD',
		description:
			'A full-stack quiz app with a CI/CD pipeline using GitHub Actions and automated testing.',
		image: '/og-github-ci-cd.png',
	},
	'employee-tracker': {
		title: 'Employee Tracker',
		description:
			'A command-line application to manage employee data using Node.js and MySQL.',
		image: '/og-image.png',
	},
	'vehicle-builder-cli': {
		title: 'Vehicle Builder CLI',
		description: 'A command-line application to manage vehicle data.',
		image: '/og-image.png',
	},
};

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const project = projects[slug];

	if (!project) {
		return {
			title: 'Project Not Found | Jace Galloway',
		};
	}

	const imageUrl = `https://www.hirejace.com${project.image}`;

	return {
		title: `${project.title} - Case Study | Jace Galloway`,
		description: project.description,
		keywords: [
			project.title,
			'web development',
			'portfolio',
			'Jace Galloway',
			'React',
			'Node.js',
			'full-stack',
			'case study',
		],
		openGraph: {
			type: 'article',
			title: `${project.title} - Case Study`,
			description: project.description,
			url: `https://www.hirejace.com/case-study/${slug}`,
			siteName: 'Jace Galloway Portfolio',
			images: [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt: `${project.title} Screenshot`,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: `${project.title} - Case Study`,
			description: project.description,
			images: [imageUrl],
			creator: '@jacegalloway',
		},
	};
}

export default function CaseStudyLayout({ children }) {
	return <>{children}</>;
}
