import Image from 'next/image';
import Me from '@/components/me';
import Projects from '@/components/projects';
import Resume from '@/components/resume';
import Connect from '@/components/connect';

export default function Home() {
	return (
		<div>
			<div id='me'>
				<Me />
			</div>
			<div id='projects'>
				<Projects />
			</div>
			<div id='resume'>
				<Resume />
			</div>
			<div id='connect'>
				<Connect />
			</div>
		</div>
	);
}
