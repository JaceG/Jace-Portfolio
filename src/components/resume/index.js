import WorkExperience from '../resume-cards/workExperience';
import Education from '../resume-cards/education';
import Skills from '../resume-cards/skills';
import Section from '../section';

export default function Resume() {
	return (
		<Section>
			<div className='h-[2600px] sm:h-auto'>
				<WorkExperience />
				<Education />
				<Skills />
			</div>
		</Section>
	);
}
