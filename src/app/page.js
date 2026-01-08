import Me from '@/components/me';
import Projects from '@/components/projects';
import Resume from '@/components/resume';
import Connect from '@/components/connect';
import Books from '@/components/books';

export default function Home() {
	return (
		<main>
			<section
				id='me'
				aria-label='About Jace Galloway'>
				<Me />
			</section>
			<section
				id='projects'
				aria-label='Portfolio Projects'>
				<Projects />
			</section>
			<section
				id='resume'
				aria-label='Resume and Experience'>
				<Resume />
			</section>
			<section
				id='books'
				aria-label='Books and Learning'>
				<Books />
			</section>
			<section
				id='connect'
				aria-label='Contact Information'>
				<Connect />
			</section>
		</main>
	);
}
