export const clamp = (n) => Math.max(0, Math.min(1, n));
export const smooth = (a, b, n) => {
	const t = clamp((n - a) / (b - a));
	return t * t * (3 - 2 * t);
};

// A bounded moving window through the complete catalog: adding projects adds
// another pair of panels, without hand-authored positions or a new video.
export function flightPanels(count, progress, width, height) {
	if (!count || progress < 0 || progress > 1) return [];
	const waves = Math.ceil(count / 2);
	// Hold the first two screenshots in view as the stage enters, then travel
	// through the catalog. The final frame clears completely for the section.
	const cursor = .6 + progress * (waves + .8);
	const first = Math.max(0, Math.floor(cursor - 2.4) * 2);
	const last = Math.min(count, Math.ceil(cursor + 1) * 2);
	const panels = [];
	for (let index = first; index < last; index++) {
		const wave = Math.floor(index / 2);
		const t = (cursor - wave) / 2.4;
		if (t <= 0 || t >= 1) continue;
		const side = index % 2 ? 1 : -1;
		const bend = Math.sin(t * Math.PI);
		const scale = .13 + 1.8 * t * t;
		const mobile = width < 768;
		panels.push({
			index, depth: t,
			x: width * (.5 + side * (.1 + 1.65 * t ** 3) + bend * .06 * Math.sin(wave * 1.7)),
			y: height * (.36 + (wave % 3) * .13 + (t - .4) * .52 + side * bend * .12),
			width: width * (mobile ? .98 : .76) * scale,
			rotation: side * (-.2 + t * .4) + Math.sin(wave * 2) * bend * .07,
			shear: -side * .12 * (1 - t),
			opacity: smooth(0, .14, t) * (1 - smooth(.93, 1, t)),
		});
	}
	return panels.sort((a, b) => a.depth - b.depth);
}
