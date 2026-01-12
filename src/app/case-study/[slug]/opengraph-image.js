import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'Project Screenshot';
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = 'image/png';

// Map slugs to OG image paths
const ogImageMap = {
	'dating-tool-app': '/og-dating-tool-app.png',
	'react-learning-stories': '/og-react-learning-stories.png',
	'the-vegan-aisle': '/og-the-vegan-aisle.png',
	'company-hunter': '/og-company-hunter.png',
	'pdf-wonder-kit': '/og-pdf-wonder-kit.png',
	'bet-data-app': '/og-bet-data-app.png',
	'spotify-playlist-ai': '/og-spotify-playlist-ai.png',
	'marketing-email-api': '/og-image.png', // fallback to homepage
	'random-movie-generator': '/og-random-movie-generator.png',
	'showfinder': '/og-showfinder.png',
	'book-search-engine': '/og-book-search-engine.png',
	'weather-dashboard': '/og-weather-dashboard.png',
	'piano-player': '/og-piano-player.png',
	'github-candidate-search': '/og-github-candidate-search.png',
	'github-ci-cd': '/og-github-ci-cd.png',
	'employee-tracker': '/og-image.png', // CLI app, use homepage fallback
	'vehicle-builder-cli': '/og-image.png', // CLI app, use homepage fallback
};

// Project titles for fallback
const projectTitles = {
	'dating-tool-app': 'Dating Tool App',
	'react-learning-stories': 'React Learning Stories',
	'the-vegan-aisle': 'The Vegan Aisle',
	'company-hunter': 'Company Hunter',
	'pdf-wonder-kit': 'PDF Wonder Kit',
	'bet-data-app': 'Sports Bet App',
	'spotify-playlist-ai': 'Spotify Playlist AI',
	'marketing-email-api': 'Marketing Email API',
	'random-movie-generator': 'Random Movie Generator',
	'showfinder': 'ShowFinder',
	'book-search-engine': 'Book Search Engine',
	'weather-dashboard': 'Weather Dashboard',
	'piano-player': 'Piano Player',
	'github-candidate-search': 'Github Candidate Search',
	'github-ci-cd': 'Github CI-CD',
	'employee-tracker': 'Employee Tracker',
	'vehicle-builder-cli': 'Vehicle Builder CLI',
};

export default async function Image({ params }) {
	const { slug } = await params;
	const ogImagePath = ogImageMap[slug];
	const title = projectTitles[slug] || 'Project';

	// Try to fetch the actual screenshot image
	if (ogImagePath && ogImagePath !== '/og-image.png') {
		try {
			const imageUrl = `https://hirejace.com${ogImagePath}`;

			return new ImageResponse(
				(
					<div
						style={{
							width: '100%',
							height: '100%',
							display: 'flex',
							position: 'relative',
						}}>
						<img
							src={imageUrl}
							alt={title}
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
							}}
						/>
						{/* Overlay with project title */}
						<div
							style={{
								position: 'absolute',
								bottom: 0,
								left: 0,
								right: 0,
								background:
									'linear-gradient(transparent, rgba(0,0,0,0.8))',
								padding: '40px 30px 30px',
								display: 'flex',
								alignItems: 'flex-end',
							}}>
							<div
								style={{
									color: 'white',
									fontSize: 36,
									fontWeight: 'bold',
									textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
								}}>
								{title} - Jace Galloway
							</div>
						</div>
					</div>
				),
				{ ...size }
			);
		} catch (error) {
			// Fallback to text-based OG image if screenshot fails
			console.error('Error loading screenshot:', error);
		}
	}

	// Fallback: Generate text-based OG image
	return new ImageResponse(
		(
			<div
				style={{
					fontSize: 48,
					background: '#0A0E27',
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					color: 'white',
					fontFamily: 'sans-serif',
				}}>
				<div
					style={{
						fontSize: 64,
						fontWeight: 'bold',
						marginBottom: 20,
						color: '#39BD6D',
					}}>
					{title}
				</div>
				<div
					style={{
						fontSize: 32,
						color: '#E0E0E0',
					}}>
					Case Study by Jace Galloway
				</div>
				<div
					style={{
						fontSize: 24,
						color: '#A0A0A0',
						marginTop: 30,
					}}>
					Full-Stack Developer Portfolio
				</div>
			</div>
		),
		{ ...size }
	);
}
