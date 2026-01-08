export default async function sitemap() {
	// Fetch all projects to generate dynamic URLs
	const baseUrl = 'https://jacegalloway.com';

	// Import projects data
	const projectsModule = await import('@/pages/api/projects.js');

	// Create a mock request/response to get projects
	const projects = [
		{ slug: 'dating-tool-app' },
		{ slug: 'react-learning-stories' },
		{ slug: 'the-vegan-aisle' },
		{ slug: 'company-hunter' },
		{ slug: 'pd-wonder-kit' },
		{ slug: 'sports-betting-charts' },
		{ slug: 'spotify-playlist-ai' },
		{ slug: 'marketing-email-api' },
		{ slug: 'random-movie-generator' },
		{ slug: 'showfinder' },
		{ slug: 'book-search-engine' },
		{ slug: 'weather-dashboard' },
		{ slug: 'piano-player' },
		{ slug: 'github-candidate-search' },
		{ slug: 'github-ci-cd' },
		{ slug: 'employee-tracker' },
		{ slug: 'vehicle-builder-cli' },
	];

	// Generate project URLs
	const projectUrls = projects.map((project) => ({
		url: `${baseUrl}/case-study/${project.slug}`,
		lastModified: new Date(),
		changeFrequency: 'monthly',
		priority: 0.8,
	}));

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		},
		...projectUrls,
	];
}
