'use client';
import { useEffect, useRef, useState } from 'react';

const GH_USER = 'JaceG';

function relativeTime(iso) {
	const diff = Date.now() - new Date(iso).getTime();
	const days = Math.floor(diff / 864e5);
	if (days <= 0) return 'today';
	if (days === 1) return 'yesterday';
	if (days < 30) return `${days}d ago`;
	const months = Math.floor(days / 30);
	if (months < 12) return `${months}mo ago`;
	return `${Math.floor(months / 12)}y ago`;
}

function useGithub() {
	const [profile, setProfile] = useState(null);
	const [repos, setRepos] = useState(null);
	const [failed, setFailed] = useState(false);

	useEffect(() => {
		let alive = true;
		Promise.all([
			fetch(`https://api.github.com/users/${GH_USER}`).then((r) => r.json()),
			fetch(
				`https://api.github.com/users/${GH_USER}/repos?sort=pushed&per_page=100`
			).then((r) => r.json()),
		])
			.then(([p, rs]) => {
				if (!alive) return;
				if (p && typeof p.public_repos === 'number') setProfile(p);
				else setFailed(true);
				if (Array.isArray(rs)) setRepos(rs.filter((r) => !r.fork));
				else setFailed(true);
			})
			.catch(() => alive && setFailed(true));
		return () => {
			alive = false;
		};
	}, []);

	return { profile, repos, failed };
}

/** Fades children up into place the first time they scroll into view. */
function Reveal({ children, delay = 0, className }) {
	const ref = useRef(null);
	const [shown, setShown] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setShown(true);
					io.disconnect();
				}
			},
			{ threshold: 0.15 }
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			className={className}
			style={{
				opacity: shown ? 1 : 0,
				transform: shown ? 'translateY(0)' : 'translateY(24px)',
				transition: `opacity 0.7s ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
			}}>
			{children}
		</div>
	);
}

/**
 * The site's offset double-frame: a green outline with a filled green panel
 * shifted up and to the left (see the Books callout and project cards).
 */
function Frame({ children, className = '', innerClassName = '' }) {
	return (
		<div className={`relative border-8 border-[#39bb6a] ${className}`}>
			<div
				className={`absolute bottom-6 left-6 h-full w-full bg-[#39bb6a] text-white ${innerClassName}`}>
				{children}
			</div>
		</div>
	);
}

function Stat({ value, label }) {
	return (
		<div className='flex min-w-0 flex-col items-center justify-center px-3 py-5 text-center'>
			<div className='max-w-full text-3xl font-black leading-none tracking-[-0.04em] md:text-[2rem]'>
				{value}
			</div>
			<div className='mt-3 text-xs font-black uppercase tracking-[-0.04em] text-white/80 sm:text-sm'>
				{label}
			</div>
		</div>
	);
}

function RepoCard({ repo }) {
	return (
		<Frame className='h-[280px]' innerClassName='p-6 flex flex-col'>
			<a
				href={repo.html_url}
				target='_blank'
				rel='noopener noreferrer'
				className='group flex h-full flex-col'>
				<div className='flex items-start justify-between gap-3'>
					<h3 className='text-xl font-bold uppercase leading-tight tracking-[-0.02em] transition-opacity group-hover:opacity-80'>
						{repo.name}
					</h3>
					<span
						aria-hidden='true'
						className='shrink-0 text-2xl font-black leading-none transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5'>
						↗
					</span>
				</div>
				<p className='mt-3 line-clamp-4 text-base leading-6 text-white/90'>
					{repo.description || 'No description provided.'}
				</p>
				<div className='mt-auto flex items-center justify-between pt-4 text-sm font-black uppercase tracking-[-0.04em] text-white/80'>
					<span>{repo.language || 'Code'}</span>
					<span>{relativeTime(repo.pushed_at)}</span>
				</div>
			</a>
		</Frame>
	);
}

function SkeletonCard() {
	return (
		<Frame className='h-[280px]' innerClassName='animate-pulse opacity-40' />
	);
}

export default function GithubWork() {
	const { profile, repos, failed } = useGithub();

	const topLanguage = (() => {
		if (!repos) return null;
		const counts = {};
		repos.forEach((r) => {
			if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
		});
		return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
	})();
	const lastPush = repos?.[0]?.pushed_at;
	const featured = repos?.slice(0, 6);
	const dash = '—';

	return (
		<div className='bg-white py-24 text-black'>
			<div className='mx-auto flex max-w-[1100px] flex-col items-center px-6 sm:px-10'>
				<h1 className='mb-2 text-center text-6xl font-bold uppercase text-[#39bb6a] sm:text-9xl'>
					GitHub
				</h1>
				<p className='mb-12 text-center text-[20px] font-black uppercase tracking-[-0.04em] text-tertiary'>
					Live from my public repos
				</p>

				{/* Stat strip */}
				<Reveal className='mb-20 w-full pr-6 pt-6'>
					<Frame
						className='h-[300px] w-full sm:h-[160px]'
						innerClassName='grid grid-cols-2 sm:grid-cols-4 divide-x-0 sm:divide-x-4 divide-y-4 sm:divide-y-0 divide-white/30'>
						<Stat
							value={failed ? dash : profile?.public_repos ?? dash}
							label='Public repos'
						/>
						<Stat
							value={failed ? dash : profile?.followers ?? dash}
							label='Followers'
						/>
						<Stat
							value={failed ? dash : topLanguage ?? dash}
							label='Top language'
						/>
						<Stat
							value={failed || !lastPush ? dash : relativeTime(lastPush)}
							label='Last push'
						/>
					</Frame>
				</Reveal>

				{/* Recent repos */}
				<Reveal className='mb-10 flex w-full flex-col items-center justify-between gap-6 sm:flex-row sm:items-end'>
					<div className='text-center sm:text-left'>
						<div className='mb-1 text-base font-black uppercase tracking-[-0.04em] text-tertiary'>
							Sorted by last push
						</div>
						<h2 className='text-3xl font-bold uppercase text-black sm:text-5xl'>
							Recent commits
						</h2>
					</div>
					<a
						href={`https://github.com/${GH_USER}?tab=repositories`}
						target='_blank'
						rel='noopener noreferrer'
						className='relative block w-[220px] rounded bg-[#39bb6a] p-3 text-center text-base font-black uppercase tracking-[-0.04em] text-white'>
						View all repos
					</a>
				</Reveal>

				{failed && !featured?.length ? (
					<Reveal>
						<p className='text-center text-lg text-tertiary'>
							GitHub is unreachable right now.{' '}
							<a
								href={`https://github.com/${GH_USER}`}
								target='_blank'
								rel='noopener noreferrer'
								className='font-black uppercase tracking-[-0.04em] text-[#39bb6a] underline'>
								Browse my projects directly
							</a>
						</p>
					</Reveal>
				) : (
					<div className='grid w-full grid-cols-1 gap-x-12 gap-y-14 pr-6 pt-6 md:grid-cols-2 lg:grid-cols-3'>
						{featured
							? featured.map((repo, i) => (
									<Reveal key={repo.id} delay={(i % 3) * 90}>
										<RepoCard repo={repo} />
									</Reveal>
							  ))
							: Array.from({ length: 6 }).map((_, i) => (
									<SkeletonCard key={i} />
							  ))}
					</div>
				)}
			</div>
		</div>
	);
}
