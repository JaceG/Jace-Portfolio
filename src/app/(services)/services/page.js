import ServicesHeader from '@/components/services/header';
import ServicesFooter from '@/components/services/footer';
import { BookButton, Container, Eyebrow, SectionTitle } from '@/components/services/ui';
import {
	BOOKING_EMBED_URL,
	BOOKING_URL,
	FAQS,
	INCLUDED,
	PAINS,
	PILLARS,
	STEPS,
} from '@/constants/services';

const DESCRIPTION =
	'I rebuild small-business websites to be fast, mobile-friendly and easy to update, then hand over the domain, hosting and code, all in your name.';

export const metadata = {
	title: { absolute: 'Jace Galloway — Website Modernization for Small Businesses' },
	description: DESCRIPTION,
	alternates: { canonical: '/services' },
	openGraph: {
		type: 'website',
		url: '/services',
		siteName: 'Jace Galloway Web Development',
		title: 'Your website, rebuilt for today. Owned by you.',
		description: DESCRIPTION,
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Your website, rebuilt for today. Owned by you.',
		description: DESCRIPTION,
	},
};

const structuredData = {
	'@context': 'https://schema.org',
	'@type': 'ProfessionalService',
	name: 'Jace Galloway Web Development',
	url: 'https://www.hirejace.com/services',
	description: DESCRIPTION,
	founder: { '@type': 'Person', name: 'Jace Galloway' },
	serviceType: 'Website modernization',
};

export default function Services() {
	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
			<ServicesHeader />
			<main>
				{/* Hero */}
				<section className='pb-20 pt-12 sm:pb-28 sm:pt-16'>
					<Container className='grid items-start gap-12 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-16'>
						<div className='lg:pt-10'>
							<Eyebrow>Website modernization for small businesses</Eyebrow>
							<h1 className='mt-4 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl'>
								Your website, rebuilt for today.{' '}
								<span className='text-accent'>Owned by you.</span>
							</h1>
							<p className='mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl'>
								I take the business website you already have and rebuild it
								to be fast, mobile-friendly and easy to update. Then I hand
								you the keys: the domain, the hosting and the code, all in
								your name.
							</p>
							<p className='mt-8 font-semibold'>
								Pick a time for an intro call
								<span aria-hidden='true' className='lg:hidden'> ↓</span>
								<span aria-hidden='true' className='hidden lg:inline'> →</span>
							</p>
							<a
								href='#process'
								className='mt-3 inline-block text-muted underline-offset-4 hover:text-ink hover:underline'>
								Or see how it works first
							</a>
						</div>

						{/* Google Calendar's appointment page, embedded. */}
						<div id='schedule'>
							<div className='overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_60px_-30px_rgba(22,24,29,0.35)]'>
								<iframe
									src={BOOKING_EMBED_URL}
									title='Book an intro call with Jace Galloway'
									className='block h-[600px] w-full border-0'
								/>
							</div>
							<p className='mt-3 text-center text-sm text-muted'>
								Calendar not loading?{' '}
								<a
									href={BOOKING_URL}
									target='_blank'
									rel='noopener noreferrer'
									className='font-medium text-accent underline-offset-4 hover:underline'>
									Open the booking page
								</a>
							</p>
						</div>
					</Container>
				</section>

				{/* Sound familiar */}
				<section aria-labelledby='pains-title' className='border-y border-line bg-card py-20'>
					<Container>
						<Eyebrow>Sound familiar?</Eyebrow>
						<SectionTitle>
							<span id='pains-title'>
								A lot of business websites are rented, not owned.
							</span>
						</SectionTitle>
						<ul className='mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
							{PAINS.map((pain) => (
								<li
									key={pain}
									className='rounded-2xl border border-line bg-paper p-6 text-lg leading-snug'>
									{pain}
								</li>
							))}
						</ul>
					</Container>
				</section>

				{/* Own / control / maintain */}
				<section id='own' aria-labelledby='own-title' className='py-20 sm:py-28'>
					<Container>
						<Eyebrow>Yours to keep</Eyebrow>
						<SectionTitle>
							<span id='own-title'>
								You own it, you control it, you can maintain it.
							</span>
						</SectionTitle>
						<div className='mt-12 grid gap-10 md:grid-cols-3'>
							{PILLARS.map((pillar, i) => (
								<div key={pillar.title} className='border-t-2 border-ink pt-6'>
									<p className='font-display text-sm text-muted'>0{i + 1}</p>
									<h3 className='mt-2 font-display text-3xl font-semibold'>
										{pillar.title}
									</h3>
									<p className='mt-3 text-lg leading-relaxed text-muted'>
										{pillar.body}
									</p>
								</div>
							))}
						</div>
					</Container>
				</section>

				{/* What's included */}
				<section
					id='included'
					aria-labelledby='included-title'
					className='bg-ink py-20 text-paper sm:py-28'>
					<Container>
						<p className='text-sm font-semibold uppercase tracking-[0.14em] text-[#f0a17e]'>
							What&apos;s included
						</p>
						<h2
							id='included-title'
							className='mt-3 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl'>
							Everything a modern site needs, nothing you have to rent.
						</h2>
						<dl className='mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4'>
							{INCLUDED.map(([term, detail]) => (
								<div key={term}>
									<dt className='font-semibold'>{term}</dt>
									<dd className='mt-2 leading-relaxed text-paper/70'>{detail}</dd>
								</div>
							))}
						</dl>
					</Container>
				</section>

				{/* Process */}
				<section id='process' aria-labelledby='process-title' className='py-20 sm:py-28'>
					<Container>
						<Eyebrow>How it works</Eyebrow>
						<SectionTitle>
							<span id='process-title'>Four steps, and you see every one.</span>
						</SectionTitle>
						<ol className='mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
							{STEPS.map((step, i) => (
								<li
									key={step.title}
									className='rounded-2xl border border-line bg-card p-6'>
									<span className='flex size-10 items-center justify-center rounded-full bg-accent font-display text-lg font-semibold text-white'>
										{i + 1}
									</span>
									<h3 className='mt-5 text-xl font-semibold'>{step.title}</h3>
									<p className='mt-2 leading-relaxed text-muted'>{step.body}</p>
								</li>
							))}
						</ol>
					</Container>
				</section>

				{/* FAQ */}
				<section
					id='faq'
					aria-labelledby='faq-title'
					className='faq border-t border-line bg-card py-20 sm:py-28'>
					<Container className='grid gap-10 lg:grid-cols-[1fr_2fr]'>
						<div>
							<Eyebrow>FAQ</Eyebrow>
							<SectionTitle>
								<span id='faq-title'>Questions people ask first.</span>
							</SectionTitle>
						</div>
						<div className='divide-y divide-line border-y border-line'>
							{FAQS.map((item) => (
								<details key={item.q} className='group py-5'>
									<summary className='flex cursor-pointer items-center justify-between gap-6 text-lg font-semibold'>
										{item.q}
										<span
											aria-hidden='true'
											className='faq-mark font-display text-2xl text-accent'>
											+
										</span>
									</summary>
									<p className='mt-3 max-w-2xl leading-relaxed text-muted'>{item.a}</p>
								</details>
							))}
						</div>
					</Container>
				</section>

				{/* Closing call to action */}
				<section id='book' aria-labelledby='book-title' className='py-24 sm:py-32'>
					<Container className='text-center'>
						<h2
							id='book-title'
							className='mx-auto max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl'>
							Let&apos;s look at your site together.
						</h2>
						<p className='mx-auto mt-5 max-w-xl text-lg text-muted'>
							Pick a time on my calendar. Bring the link to your current site
							and what you wish it did better.
						</p>
						<div className='mt-10'>
							<BookButton href={BOOKING_URL}>Book a call</BookButton>
						</div>
					</Container>
				</section>
			</main>
			<ServicesFooter />
		</>
	);
}
