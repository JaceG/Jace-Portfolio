import Section from '../section';
import { SC_BASE } from '@/constants/sourceco';
import { getScProjects } from './data';
import ProjectList from './project-list';

export default function ScProjects() {
	// Only what the cards need goes to the client, not the case-study text.
	const cards = getScProjects().map(({ slug, title, snippet, image, github }) => ({
		slug,
		title,
		snippet,
		image,
		github: github || '',
		href: `${SC_BASE}/case-study/${slug}`,
	}));
	return (
		// White from the top edge so it runs straight on from the GitHub strip.
		<div className='bg-white pb-24'>
			<Section>
				<ProjectList cards={cards} />
			</Section>
		</div>
	);
}
