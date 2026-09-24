import { projects } from '@/data/projects';

export default function handler(req, res) {
	// Projects flagged `hidden` are excluded from every public listing, the
	// slug lookup and the `all` feed below — the record stays in
	// src/data/projects.js so nothing is lost, it's just not reachable from the site.
	const visibleProjects = projects.filter((p) => !p.hidden);

	// For pagination if needed
	const total = visibleProjects.length;
	const page = req.query.page || 1;
	const startIndex = (page - 1) * 3;
	const endIndex = page * 3;
	const results = visibleProjects.slice(startIndex, endIndex);

	// Shared full list for the terminal and the live screenshot transition.
	if (req.query.all) {
		return res.status(200).json({
			total,
			results: visibleProjects.map(
				({ slug, title, snippet, image, github, app }) => ({
					slug,
					title,
					snippet,
					image,
					github,
					app,
				})
			),
		});
	}

	// You can now easily find a project by slug using Array.find()
	if (req.query.slug) {
		const project = visibleProjects.find((p) => p.slug === req.query.slug);
		return res.status(200).json(project || null);
	}

	res.status(200).json({
		total,
		page,
		results,
	});
}
