import GithubWork from '../github-work';
import { getGithubStats } from './github-data';

const GREEN = '#39bb6a';
// One hue, light to dark: empty, then four activity levels.
const RAMP = ['#eef1ef', '#c6ecd3', '#8fd9a8', GREEN, '#1a7a42'];
const INK_MUTED = '#6b7280';
const fmt = (n) => n.toLocaleString('en-US');
const day = (iso, opts = { month: 'short', day: 'numeric' }) =>
	new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { ...opts, timeZone: 'UTC' });

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

function Panel({ title, caption, children, className = '' }) {
	return (
		<section className={`w-full border-8 border-[#39bb6a] p-6 sm:p-8 ${className}`}>
			<h2 className='text-2xl font-black uppercase tracking-[-0.04em]'>{title}</h2>
			{caption && <p className='mt-1 text-sm text-tertiary'>{caption}</p>}
			<div className='mt-6'>{children}</div>
		</section>
	);
}

// Month label wherever a new month starts. The partial first month's label
// gives way when the next month begins within three weeks.
function monthTicks(starts) {
	const ticks = [];
	starts.forEach((iso, i) => {
		if (i > 0 && iso.slice(5, 7) === starts[i - 1].slice(5, 7)) return;
		const tick = { i, label: day(iso, { month: 'short' }) };
		const prev = ticks[ticks.length - 1];
		if (prev && i - prev.i < 3) {
			if (prev.i === 0) ticks[ticks.length - 1] = tick;
			return;
		}
		ticks.push(tick);
	});
	return ticks;
}

function levels(weeks) {
	const counts = weeks.flat().map((d) => d.count).filter((c) => c > 0).sort((a, b) => a - b);
	const q = (p) => counts[Math.floor((counts.length - 1) * p)] || 1;
	const cuts = [q(0.25), q(0.5), q(0.75)];
	return (c) => (c === 0 ? 0 : c <= cuts[0] ? 1 : c <= cuts[1] ? 2 : c <= cuts[2] ? 3 : 4);
}

function Heatmap({ weeks, level }) {
	const S = 14;
	const C = 11;
	const top = 16;
	const ticks = monthTicks(weeks.map((w) => w[0].date));
	return (
		<svg viewBox={`0 0 ${weeks.length * S} ${top + 7 * S}`} className='block h-auto w-full' role='img' aria-label='Daily contributions, past year'>
			{ticks.map((t) => (
				<text key={t.i} x={t.i * S} y={10} fontSize='10' fill={INK_MUTED}>
					{t.label}
				</text>
			))}
			{weeks.map((w, x) =>
				w.map((d) => {
					const y = new Date(`${d.date}T00:00:00Z`).getUTCDay();
					return (
						<rect key={d.date} x={x * S} y={top + y * S} width={C} height={C} rx='2' fill={RAMP[level(d.count)]}>
							<title>{`${fmt(d.count)} contribution${d.count === 1 ? '' : 's'} on ${day(d.date, { month: 'short', day: 'numeric', year: 'numeric' })}`}</title>
						</rect>
					);
				})
			)}
		</svg>
	);
}

function WeeklyBars({ weekly }) {
	const S = 16;
	const W = 11;
	const H = 110;
	const bottom = 16;
	const max = Math.max(1, ...weekly.map((w) => w.count));
	const ticks = monthTicks(weekly.map((w) => w.start));
	return (
		<svg viewBox={`0 0 ${weekly.length * S} ${H + bottom}`} className='block h-auto w-full' role='img' aria-label='Contributions per week, past year'>
			<line x1='0' x2={weekly.length * S} y1={H + 0.5} y2={H + 0.5} stroke='#e5e7eb' />
			{weekly.map((w, i) => {
				const h = w.count ? Math.max(3, (w.count / max) * (H - 4)) : 0;
				return (
					<g key={w.start}>
						{/* Hit target is the full column, bigger than the bar. */}
						<rect x={i * S} y='0' width={S} height={H} fill='transparent'>
							<title>{`Week of ${day(w.start)}: ${fmt(w.count)} contributions`}</title>
						</rect>
						{h > 0 && (
							<path
								d={`M${i * S},${H} v${-(h - 2)} q0,-2 2,-2 h${W - 4} q2,0 2,2 v${h - 2} z`}
								fill={GREEN}
								pointerEvents='none'
							/>
						)}
					</g>
				);
			})}
			{ticks.map((t) => (
				<text key={t.i} x={t.i * S} y={H + 13} fontSize='10' fill={INK_MUTED}>
					{t.label}
				</text>
			))}
		</svg>
	);
}

function Legend() {
	return (
		<div className='mt-3 flex items-center justify-end gap-1 text-xs text-tertiary'>
			<span className='mr-1'>Less</span>
			{RAMP.map((c) => (
				<span key={c} className='inline-block h-3 w-3 rounded-[2px]' style={{ background: c }} />
			))}
			<span className='ml-1'>More</span>
		</div>
	);
}

/**
 * The SourceCo page's GitHub section: the same title and stat strip as the
 * portfolio, plus contributions, weekly pace, language mix and recent
 * activity, read on the server. Falls back to the plain client-side strip
 * if GitHub or the token is unavailable.
 */
export default async function ScGithub() {
	const stats = await getGithubStats();
	if (!stats) return <GithubWork compact />;
	const { account, contributions: c, weekly, languages, activity } = stats;
	const level = levels(c.weeks);
	const recentWeeks = c.weeks.slice(-26);
	const recentWeekly = weekly.slice(-26);
	const peak = weekly.reduce((a, w) => (w.count > a.count ? w : a), weekly[0]);
	const topPct = Math.max(...languages.map((l) => l.pct));

	return (
		<div className='bg-white py-24 text-black'>
			<div className='mx-auto flex max-w-[1100px] flex-col items-center px-6 sm:px-10'>
				<h1 className='mb-2 text-center text-6xl font-bold uppercase text-[#39bb6a] sm:text-9xl'>
					GitHub
				</h1>
				<p className='text-center text-[16px] font-black uppercase tracking-[-0.04em] text-tertiary sm:text-[20px]'>
					On GitHub since {account.since}
					{account.location ? ` · ${account.location}` : ''} · {fmt(account.publicRepos)} public repos
				</p>

				{/* Stat strip, same frame as the portfolio's */}
				<div className='mt-10 w-full pr-6 pt-6'>
					<div className='relative h-[300px] w-full border-8 border-[#39bb6a] sm:h-[160px]'>
						<div className='absolute bottom-6 left-6 grid h-full w-full grid-cols-2 divide-x-0 divide-y-4 divide-white/30 bg-[#39bb6a] text-white sm:grid-cols-4 sm:divide-x-4 sm:divide-y-0'>
							<Stat value={fmt(c.total)} label='Contributions, past year' />
							<Stat value={fmt(c.private)} label='In private repos' />
							<Stat value={fmt(c.activeDays)} label='Active days' />
							<Stat value={`${fmt(c.longest)} days`} label='Longest streak' />
						</div>
					</div>
				</div>

				<div className='mt-16 flex w-full flex-col gap-10'>
					<Panel
						title='Contributions'
						caption={`Every day of the past year. ${fmt(c.private)} of the ${fmt(c.total)} are in private repos, so they show as counts only.`}>
						<div className='hidden sm:block'>
							<Heatmap weeks={c.weeks} level={level} />
						</div>
						<div className='sm:hidden'>
							<Heatmap weeks={recentWeeks} level={level} />
						</div>
						<Legend />
					</Panel>

					<Panel
						title='Weekly pace'
						caption={`Contributions per week. Busiest: ${fmt(peak.count)} in the week of ${day(peak.start)}.`}>
						<div className='hidden sm:block'>
							<WeeklyBars weekly={weekly} />
						</div>
						<div className='sm:hidden'>
							<WeeklyBars weekly={recentWeekly} />
						</div>
					</Panel>

					<div className='grid w-full gap-10 lg:grid-cols-2'>
						<Panel title='Language mix' caption='Share of code across my public repos.'>
							<ul className='flex flex-col gap-3'>
								{languages.map((l) => (
									<li key={l.name} className='grid grid-cols-[6.5rem_1fr_3.5rem] items-center gap-3 text-sm'>
										<span className='truncate font-bold'>{l.name}</span>
										<span className='h-3 rounded-sm bg-[#eef1ef]'>
											<span
												className='block h-3 rounded-sm bg-[#39bb6a]'
												style={{ width: `${Math.max(2, (l.pct / topPct) * 100)}%` }}
											/>
										</span>
										<span className='text-right tabular-nums text-tertiary'>
											{l.pct < 1 ? '<1' : Math.round(l.pct)}%
										</span>
									</li>
								))}
							</ul>
						</Panel>

						<Panel title='Recent activity' caption='Public repos, last 90 days, newest first.'>
							{activity.length ? (
								<ul className='flex flex-col divide-y divide-black/10'>
									{activity.map((a, i) => (
										<li key={`${a.date}-${i}`} className='flex items-baseline justify-between gap-4 py-2.5 text-sm'>
											<a
												href={`https://github.com/JaceG/${a.repo}`}
												target='_blank'
												rel='noopener noreferrer'
												className='min-w-0 truncate font-bold hover:text-[#39bb6a]'>
												{a.text}
												{a.times > 1 && <span className='font-normal text-tertiary'> · {a.times} times</span>}
											</a>
											<span className='shrink-0 tabular-nums text-tertiary'>{day(a.date)}</span>
										</li>
									))}
								</ul>
							) : (
								<p className='text-sm text-tertiary'>No public activity in the last 90 days.</p>
							)}
						</Panel>
					</div>
				</div>
			</div>
		</div>
	);
}
