import WorkExperience from '../resume-cards/workExperience';
import Education from '../resume-cards/education';
import Skills from '../resume-cards/skills';
import Section from '../section';

export default function Resume({ resumeUrl, skillsVariant } = {}) {
	return (
		<Section>
			<div>
				<WorkExperience resumeUrl={resumeUrl} />
				<Education />
				<Skills variant={skillsVariant} />
			</div>
		</Section>
	);
}
