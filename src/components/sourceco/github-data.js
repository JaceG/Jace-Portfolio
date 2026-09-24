// Server-only (imported only by server components): reads GitHub with GITHUB_TOKEN (a read-only, public-access
// token) so the token never reaches the browser. Cached for an hour.
// Returns null when the token is missing or GitHub fails, so the page can
// fall back to the plain client-side stats.

const USER = 'JaceG';
const HOUR = 3600;

const QUERY = `query($login: String!) {
  user(login: $login) {
    createdAt
    location
    repositories(ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC, first: 100) {
      totalCount
      nodes { languages(first: 10, orderBy: { field: SIZE, direction: DESC }) { edges { size node { name } } } }
    }
    contributionsCollection {
      totalCommitContributions
      restrictedContributionsCount
      contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } }
    }
  }
}`;

async function gh(path, init = {}) {
	const res = await fetch(`https://api.github.com${path}`, {
		...init,
		headers: {
			Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
			'User-Agent': 'hirejace',
			...(init.headers || {}),
		},
		next: { revalidate: HOUR },
	});
	if (!res.ok) throw new Error(`GitHub ${res.status}`);
	return res.json();
}

function streaks(days) {
	let longest = 0;
	let run = 0;
	for (const d of days) {
		run = d.count > 0 ? run + 1 : 0;
		longest = Math.max(longest, run);
	}
	// Current streak may end yesterday: today often has no pushes yet.
	let i = days.length - 1;
	if (i >= 0 && days[i].count === 0) i--;
	let current = 0;
	for (; i >= 0 && days[i].count > 0; i--) current++;
	return { longest, current };
}

function languageMix(nodes, top = 5) {
	const bytes = {};
	nodes.forEach((r) =>
		r.languages.edges.forEach((e) => {
			bytes[e.node.name] = (bytes[e.node.name] || 0) + e.size;
		})
	);
	const total = Object.values(bytes).reduce((a, b) => a + b, 0) || 1;
	const sorted = Object.entries(bytes).sort((a, b) => b[1] - a[1]);
	const rows = sorted.slice(0, top).map(([name, size]) => ({ name, pct: (size / total) * 100 }));
	const rest = sorted.slice(top).reduce((a, [, s]) => a + s, 0);
	if (rest > 0) rows.push({ name: 'Other', pct: (rest / total) * 100 });
	return rows;
}

// Public events only (GitHub keeps about 90 days). One row per repo and
// kind, newest first, with how many times it happened; no branch names.
function recentActivity(events, limit = 6) {
	const rows = new Map();
	for (const e of events) {
		const repo = e.repo?.name?.replace(`${USER}/`, '');
		const date = e.created_at?.slice(0, 10);
		let kind = null;
		let text = null;
		if (e.type === 'PushEvent') [kind, text] = ['push', `Pushed to ${repo}`];
		else if (e.type === 'ReleaseEvent') [kind, text] = ['release', `Released ${repo}`];
		else if (e.type === 'CreateEvent' && e.payload?.ref_type === 'repository') [kind, text] = ['create', `Created ${repo}`];
		else if (e.type === 'PullRequestEvent' && e.payload?.action === 'opened') [kind, text] = ['pr', `Pull request in ${repo}`];
		if (!kind) continue;
		const key = `${kind}:${repo}`;
		const row = rows.get(key);
		if (row) row.times += 1;
		else rows.set(key, { text, repo, date, times: 1 });
	}
	// Events arrive newest first, so each row's date is its latest.
	return [...rows.values()].slice(0, limit);
}

export async function getGithubStats() {
	if (!process.env.GITHUB_TOKEN) return null;
	try {
		const [gql, events] = await Promise.all([
			gh('/graphql', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query: QUERY, variables: { login: USER } }),
			}),
			gh(`/users/${USER}/events/public?per_page=100`),
		]);
		const u = gql?.data?.user;
		if (!u) return null;
		const cc = u.contributionsCollection;
		const weeks = cc.contributionCalendar.weeks.map((w) =>
			w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount }))
		);
		const days = weeks.flat();
		return {
			account: {
				since: new Date(u.createdAt).getUTCFullYear(),
				location: u.location || '',
				publicRepos: u.repositories.totalCount,
			},
			contributions: {
				total: cc.contributionCalendar.totalContributions,
				private: cc.restrictedContributionsCount,
				activeDays: days.filter((d) => d.count > 0).length,
				...streaks(days),
				weeks,
			},
			weekly: weeks.map((w) => ({
				start: w[0].date,
				count: w.reduce((a, d) => a + d.count, 0),
			})),
			languages: languageMix(u.repositories.nodes),
			activity: Array.isArray(events) ? recentActivity(events) : [],
		};
	} catch {
		return null;
	}
}
