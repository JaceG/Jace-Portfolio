// TEMPORARY experiment: pulls a section's letters, images and boxes into the
// black hole. Pieces are page-space copies in an overlay, so the real section
// (and React) is never touched; it is only hidden while the copies are out.

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = (a, b, v) => {
	const t = clamp01((v - a) / (b - a));
	return t * t * (3 - 2 * t);
};
const rand = (a, b) => a + Math.random() * (b - a);
const SVG_NS = 'http://www.w3.org/2000/svg';

// Nothing thins out until it is this close to the hole's centre (about 1.8 inches).
const THIN_RADIUS = 170;
// Paint order in the overlay, matching the real section.
// Letters tumble down whole instead of being peeled and stretched.
const TUMBLERS = new Set(['letter', 'name', 'hidden']);
const LAYER = { hidden: 1, frame: 1, photo: 2, item: 3, letter: 3, arrow: 4, name: 5 };

function visible(el) {
	if (!el.checkVisibility) return true;
	return el.checkVisibility({ opacityProperty: true, visibilityProperty: true });
}

function pagePoint(x, y) {
	return { x: x + window.scrollX, y: y + window.scrollY };
}

// Elements that travel as one piece instead of letter by letter.
function isWhole(el) {
	if (el.matches('img, .social-icon')) return true;
	if (el.tagName === 'A') {
		const bg = getComputedStyle(el).backgroundColor;
		return !!bg && bg !== 'transparent' && !/^rgba\(.*,\s*0\)$/.test(bg);
	}
	return false;
}

function place(overlay, el, rect, kind) {
	const p = pagePoint(rect.left, rect.top);
	Object.assign(el.style, {
		position: 'absolute',
		left: `${p.x}px`,
		top: `${p.y}px`,
		width: `${rect.width}px`,
		height: `${rect.height}px`,
		// The site caps images at 100% of their container, and the overlay is 0 wide.
		maxWidth: 'none',
		maxHeight: 'none',
		margin: '0',
		zIndex: String(LAYER[kind]),
		willChange: 'transform, opacity',
	});
	overlay.append(el);
	return { el, kind, x: p.x, y: p.y, w: rect.width, h: rect.height };
}

// The photo, its frame and the buttons are drawn onto one canvas so they can be
// warped smoothly, row by row. Each gets its own picture of itself at 2x.
const RES = 2;

function warpedPiece(kind, rect) {
	const p = pagePoint(rect.left, rect.top);
	const src = document.createElement('canvas');
	src.width = Math.max(1, Math.round(rect.width * RES));
	src.height = Math.max(1, Math.round(rect.height * RES));
	const ctx = src.getContext('2d');
	ctx.scale(RES, RES);
	return { kind, src, ctx, warped: true, ready: null, x: p.x, y: p.y, w: rect.width, h: rect.height };
}

function roundedRect(ctx, w, h, r) {
	ctx.beginPath();
	ctx.roundRect(0, 0, w, h, Math.min(r, w / 2, h / 2));
}

// The photo, cropped the way object-fit: cover shows it. Loaded fresh, because
// the page's <img> reports half its real size for its 2x source.
function rasterPhoto(piece, el) {
	const img = new Image();
	img.src = el.currentSrc || el.src;
	return img.decode().then(() => {
		const nw = img.naturalWidth;
		const nh = img.naturalHeight;
		const scale = Math.max(piece.w / nw, piece.h / nh);
		const sw = piece.w / scale;
		const sh = piece.h / scale;
		piece.ctx.drawImage(img, (nw - sw) / 2, (nh - sh) / 2, sw, sh, 0, 0, piece.w, piece.h);
	}).catch(() => {});
}

function rasterFrame(piece, cs) {
	const bw = parseFloat(cs.borderTopWidth);
	piece.ctx.strokeStyle = cs.borderTopColor;
	piece.ctx.lineWidth = bw;
	piece.ctx.strokeRect(bw / 2, bw / 2, piece.w - bw, piece.h - bw);
}

// A plain button: its background, corners and label.
function rasterButton(piece, el, cs) {
	const { ctx, w, h } = piece;
	roundedRect(ctx, w, h, parseFloat(cs.borderTopLeftRadius) || 0);
	ctx.fillStyle = cs.backgroundColor;
	ctx.fill();
	ctx.font = cs.font;
	ctx.letterSpacing = cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing;
	ctx.fillStyle = cs.color;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	const text = cs.textTransform === 'uppercase' ? el.textContent.toUpperCase() : el.textContent;
	ctx.fillText(text.trim(), w / 2, h / 2 + 1);
}

// A social icon: its SVG, with the computed colours written in, drawn as an image.
function rasterIcon(piece, el) {
	const svg = el.querySelector('svg');
	if (!svg) return Promise.resolve();
	const copy = svg.cloneNode(true);
	const from = [svg, ...svg.querySelectorAll('*')];
	[copy, ...copy.querySelectorAll('*')].forEach((node, i) => {
		const cs = getComputedStyle(from[i]);
		node.setAttribute('fill', cs.fill);
		if (cs.display === 'none') node.setAttribute('display', 'none');
		node.removeAttribute('class');
	});
	copy.setAttribute('xmlns', SVG_NS);
	copy.setAttribute('width', String(piece.w));
	copy.setAttribute('height', String(piece.h));
	const img = new Image();
	img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(copy))}`;
	return img.decode().then(() => {
		piece.ctx.save();
		roundedRect(piece.ctx, piece.w, piece.h, piece.w / 2);
		piece.ctx.clip();
		piece.ctx.drawImage(img, 0, 0, piece.w, piece.h);
		piece.ctx.restore();
	}).catch(() => {});
}

// The arrow is redrawn as a line plus a point, so the shaft can stretch while
// the point stays sharp. The source art (public/line.svg) is 925 x 60 with the
// point at the left end.
function arrowPiece(overlay, rect) {
	const p = pagePoint(rect.left, rect.top);
	const s = rect.width / 925;
	const svg = document.createElementNS(SVG_NS, 'svg');
	Object.assign(svg.style, {
		position: 'absolute', left: '0', top: '0', width: '1px', height: '1px',
		overflow: 'visible', zIndex: String(LAYER.arrow),
	});
	const shaft = document.createElementNS(SVG_NS, 'path');
	const head = document.createElementNS(SVG_NS, 'path');
	for (const path of [shaft, head]) {
		path.setAttribute('fill', 'none');
		path.setAttribute('stroke', 'white');
	}
	shaft.setAttribute('stroke-width', String(8 * s));
	head.setAttribute('stroke-width', String(5.6 * s));
	head.setAttribute('stroke-linecap', 'round');
	head.setAttribute('stroke-linejoin', 'round');
	svg.append(shaft, head);
	overlay.append(svg);
	return {
		el: svg, kind: 'arrow', shaft, head, s,
		tail: { x: p.x + rect.width, y: p.y + rect.height / 2 },
		tip: { x: p.x + 3 * s, y: p.y + rect.height / 2 },
		len: rect.width - 3 * s,
		x: p.x, y: p.y, w: rect.width, h: rect.height,
	};
}

function collect(section, overlay) {
	const pieces = [];
	const wholes = [];
	let photoRect = null;

	for (const el of section.querySelectorAll('*')) {
		if (!visible(el) || wholes.some((w) => w.contains(el))) continue;
		const rect = el.getBoundingClientRect();
		if (rect.width < 1 || rect.height < 1) continue;
		if (isWhole(el)) {
			wholes.push(el);
			if (el.tagName === 'IMG' && rect.width > 4 * rect.height) {
				pieces.push(arrowPiece(overlay, rect));
				continue;
			}
			const cs = getComputedStyle(el);
			if (el.tagName === 'IMG') {
				photoRect = rect;
				const piece = warpedPiece('photo', rect);
				piece.ready = rasterPhoto(piece, el);
				pieces.push(piece);
			} else {
				const piece = warpedPiece('item', rect);
				if (el.matches('.social-icon')) piece.ready = rasterIcon(piece, el);
				else rasterButton(piece, el, cs);
				pieces.push(piece);
			}
			continue;
		}
		// Borders (the white photo frame) travel as an empty box.
		const cs = getComputedStyle(el);
		if (parseFloat(cs.borderTopWidth) >= 4 && cs.borderTopStyle === 'solid') {
			const piece = warpedPiece('frame', rect);
			rasterFrame(piece, cs);
			pieces.push(piece);
		}
	}

	// Letters: measured with Ranges, so no text in the real DOM is split.
	const walker = document.createTreeWalker(section, NodeFilter.SHOW_TEXT);
	const range = document.createRange();
	for (let node = walker.nextNode(); node; node = walker.nextNode()) {
		const parent = node.parentElement;
		if (!parent || !visible(parent) || wholes.some((w) => w.contains(parent))) continue;
		if (parent.closest('svg')) continue;
		const cs = getComputedStyle(parent);
		const isName = !!parent.closest('h1');
		const text = node.textContent;
		for (let i = 0; i < text.length; i++) {
			if (!text[i].trim()) continue;
			range.setStart(node, i);
			range.setEnd(node, i + 1);
			const rect = range.getClientRects()[0];
			if (!rect || rect.width < 0.5) continue;
			const cx = rect.left + rect.width / 2;
			const cy = rect.top + rect.height / 2;
			// Text hidden behind the photo ("Hire Me!") waits until the photo is gone.
			const hidden = !isName && photoRect && cx > photoRect.left && cx < photoRect.right &&
				cy > photoRect.top && cy < photoRect.bottom;
			const span = document.createElement('span');
			span.textContent = text[i];
			Object.assign(span.style, {
				font: cs.font,
				lineHeight: `${rect.height}px`,
				color: cs.color,
				textTransform: cs.textTransform,
				textDecoration: cs.textDecorationLine === 'underline' ? 'underline' : 'none',
				whiteSpace: 'pre',
			});
			pieces.push(place(overlay, span, rect, isName ? 'name' : hidden ? 'hidden' : 'letter'));
		}
	}
	return pieces;
}

// Per-kind feel. `rowMs` is the delay per pixel of height, bottom row first.
// `peel` is how far below itself a piece is dragged, in its own heights, while
// its top edge stays pinned. `hold` is how long it stays pinned.
const FEEL = {
	letter: { rowMs: 3.2, peel: 0, hold: 300, travel: [1300, 0.8] },
	hidden: { rowMs: 0.5, peel: 0, hold: 300, travel: [2600, 0.9] },
	item: { rowMs: 2, peel: 3, hold: 1200, travel: [1800, 0.9] },
	photo: { rowMs: 0, peel: 1, hold: 1800, travel: [1800, 0.9] },
	frame: { rowMs: 0, peel: 1, hold: 1600, travel: [1800, 0.9] },
	name: { rowMs: 6, peel: 4.5, hold: 2200, travel: [2000, 0.9] },
	arrow: { rowMs: 0, hold: 2400, travel: [1800, 0] },
};

function plan(pieces, hole) {
	for (const p of pieces) {
		const feel = FEEL[p.kind];
		p.hold = feel.hold * rand(0.9, 1.1);
		if (p.kind === 'arrow') {
			p.travel = feel.travel[0];
			continue;
		}
		if (p.el) p.el.style.transformOrigin = `${p.w / 2}px 0px`;
		p.top = { x: p.x + p.w / 2, y: p.y };
		p.bottom = { x: p.x + p.w / 2, y: p.y + p.h };
		const dist = Math.hypot(p.bottom.x - hole.x, p.bottom.y - hole.y) || 1;
		p.peel = Math.min(0.6, (feel.peel * p.h) / dist);
		p.bend = rand(0.5, 0.7);
		p.travel = feel.travel[0] + dist * feel.travel[1];
		// Warped pieces slim down steadily with distance from where they started.
		// Measured from the bottom edge (its nearest point), so nothing is thinned at rest.
		p.startDist = Math.max(THIN_RADIUS + 1, dist);
		// Shake frequencies (radians per second) and phases, used by the name.
		p.w1 = rand(18, 30);
		p.w2 = rand(20, 34);
		p.w3 = rand(14, 24);
		p.f1 = rand(0, 6.28);
		p.f2 = rand(0, 6.28);
		p.f3 = rand(0, 6.28);
		if (TUMBLERS.has(p.kind)) {
			p.el.style.transformOrigin = '50% 50%';
			p.center = { x: p.x + p.w / 2, y: p.y + p.h / 2 };
			// A slow spin, each its own speed and direction...
			p.spinRate = rand(30, 120) * (Math.random() < 0.5 ? -1 : 1);
			// ...and about one in four tumbles end over end in 3D.
			if (Math.random() < 0.25) {
				const phi = rand(0, 6.28);
				p.axis = [Math.cos(phi), Math.sin(phi), rand(-0.3, 0.3)].map((n) => n.toFixed(3));
			}
		}
	}

	const of = (...kinds) => pieces.filter((p) => kinds.includes(p.kind));
	const latest = (members, fn, fallback) =>
		members.length ? Math.max(...members.map(fn)) : fallback;
	// Within a group, the bottom row goes first.
	const stagger = (members, base) => {
		const lowest = Math.max(...members.map((p) => p.y + p.h));
		for (const p of members) {
			p.delay = base + (lowest - (p.y + p.h)) * FEEL[p.kind].rowMs + rand(0, 60);
		}
	};
	const letters = of('letter');
	stagger(letters, 0);
	// The buttons start as the top line of text starts to peel.
	const items = of('item');
	let cue = latest(letters, (p) => p.delay, 0);
	stagger(items, cue);
	// The photo starts once the buttons have all torn free.
	const photos = of('photo');
	cue = latest(items, (p) => p.delay + p.hold, cue);
	stagger(photos, cue);
	const photoStart = cue;
	// The frame starts as the photo's top lets go.
	const frames = of('frame');
	cue = latest(photos, (p) => p.delay + p.hold, cue);
	stagger(frames, cue);
	// The arrow starts peeling as the photo starts stretching.
	for (const p of of('arrow')) p.delay = photoStart + 200;
	// The name shakes and distorts in place, then is the last thing pulled in.
	const names = of('name');
	const release = latest(frames, (p) => p.delay + p.hold, cue) + 800;
	stagger(names, photoStart + 1000);
	for (const p of names) p.hold = Math.max(1500, release - p.delay + rand(-150, 150));
	// "Hire Me!" (hidden behind the photo) goes last, once the name has torn free.
	const hidden = of('hidden');
	if (hidden.length) stagger(hidden, latest(names, (p) => p.delay + p.hold, release) + 300);

	return Math.max(...pieces.map((p) => p.delay + p.hold + p.travel));
}

// A point on the funnel: mostly falling at first, curving in hard near the hole.
function pathPos(from, g, bend, hole) {
	return {
		x: hole.x + (from.x - hole.x) * Math.pow(1 - g, bend),
		y: hole.y + (from.y - hole.y) * (1 - g),
	};
}

const near = (d) => smooth(THIN_RADIUS, 0, d);

function frameArrow(p, t, hole) {
	const t0 = t - p.delay;
	const toHole = (pt) => Math.hypot(hole.x - pt.x, hole.y - pt.y);
	const aim = (pt) => {
		const d = toHole(pt) || 1;
		return { x: (hole.x - pt.x) / d, y: (hole.y - pt.y) / d };
	};
	const left = { x: -1, y: 0 };
	if (t0 <= 0) {
		p.shaft.setAttribute('d', `M${p.tail.x},${p.tail.y}L${p.tip.x},${p.tip.y}`);
		drawHead(p, p.tip, left, 1);
		p.el.style.opacity = '1';
		return;
	}
	const held = clamp01(t0 / p.hold);
	const moving = clamp01((t0 - p.hold) / p.travel);
	// Like tape: the point is dragged down and across into the hole, and the shaft
	// peels up behind it from the point back toward the tail, which stays stuck.
	const g = Math.pow(held, 1.7);
	const tip = { x: p.tip.x + (hole.x - p.tip.x) * g, y: p.tip.y + (hole.y - p.tip.y) * g };
	const peeled = smooth(0, 1, held);
	const peel = { x: p.tip.x + (p.tail.x - p.tip.x) * peeled, y: p.tip.y + (p.tail.y - p.tip.y) * peeled };
	// Once fully peeled, the tail lets go and slides in after the point.
	const m = Math.pow(moving, 1.8);
	const tail = { x: p.tail.x + (hole.x - p.tail.x) * m, y: p.tail.y + (hole.y - p.tail.y) * m };
	const from = moving > 0 ? tail : peel;
	p.shaft.setAttribute('d', moving > 0
		? `M${tail.x},${tail.y}L${tip.x},${tip.y}`
		: `M${p.tail.x},${p.tail.y}L${peel.x},${peel.y}L${tip.x},${tip.y}`);
	const mid = { x: (from.x + tip.x) / 2, y: (from.y + tip.y) / 2 };
	p.shaft.setAttribute('stroke-width', String(8 * p.s * (1 - 0.85 * near(toHole(mid)))));
	// The point turns to aim at the hole's centre as soon as it starts moving.
	const a = aim(tip);
	const turn = smooth(0, 0.12, held);
	const dir = { x: left.x + (a.x - left.x) * turn, y: left.y + (a.y - left.y) * turn };
	const dl = Math.hypot(dir.x, dir.y) || 1;
	drawHead(p, tip, { x: dir.x / dl, y: dir.y / dl }, smooth(0, 60, toHole(tip)));
	p.el.style.opacity = String(moving > 0 ? smooth(0, 25, toHole(tail)) : 1);
}

function drawHead(p, tip, dir, size) {
	const back = 30 * p.s * size;
	const wide = 27 * p.s * size;
	const bx = tip.x - dir.x * back;
	const by = tip.y - dir.y * back;
	const nx = -dir.y * wide;
	const ny = dir.x * wide;
	p.head.setAttribute('d', `M${bx + nx},${by + ny}L${tip.x},${tip.y}L${bx - nx},${by - ny}`);
	p.head.style.opacity = String(size);
}

function unit(x, y) {
	const d = Math.hypot(x, y);
	return d < 0.0001 ? { x: 0, y: 1 } : { x: x / d, y: y / d };
}

// Stretch along the unit vector (ux, uy) by sPar and across it by sPerp.
function stretch(ux, uy, sPar, sPerp) {
	const a = sPerp + (sPar - sPerp) * ux * ux;
	const b = (sPar - sPerp) * ux * uy;
	const d = sPerp + (sPar - sPerp) * uy * uy;
	return `matrix(${a},${b},${b},${d},0,0)`;
}

// Letters keep their shape and tumble slowly down the funnel. They only
// stretch and thin once they are within THIN_RADIUS of the hole.
function frameTumble(p, t, t0, heldLinear, moving, hole, reverse) {
	const g = Math.pow(moving, 1.8);
	const a = pathPos(p.center, g, p.bend, hole);
	const ahead = pathPos(p.center, Math.min(1, g + 0.01), p.bend, hole);
	const v = unit(ahead.x - a.x, ahead.y - a.y);
	const d = Math.hypot(a.x - hole.x, a.y - hole.y);
	const close = near(d);
	// The spin eases in once the letter lets go.
	const sec = Math.max(0, t0 - p.hold) / 1000;
	const spin = p.spinRate * (sec - 0.4 * (1 - Math.exp(-sec / 0.4)));
	const tumble = p.axis
		? `perspective(500px) rotate3d(${p.axis.join(',')},${spin}deg)`
		: `rotate(${spin}deg)`;
	// The name shakes in place while it holds on (but not on the way back out).
	let jx = 0;
	let jy = 0;
	let jr = 0;
	let dx = 1;
	let dy = 1;
	if (p.kind === 'name' && !reverse) {
		const now = t / 1000;
		const amount = smooth(0, 0.4, heldLinear) * (1 - smooth(0, 0.25, moving));
		const amp = 0.8 + 1.4 * heldLinear;
		jx = amount * amp * Math.sin(p.w1 * now + p.f1);
		jy = amount * amp * 0.7 * Math.sin(p.w2 * now + p.f2);
		jr = amount * 1.5 * Math.sin(p.w3 * now + p.f3);
		dx = 1 + amount * 0.035 * Math.sin(p.w2 * 0.7 * now + p.f1);
		dy = 1 + amount * 0.06 * Math.sin(p.w1 * 0.6 * now + p.f2);
	}
	p.el.style.transform =
		`translate(${a.x - p.center.x + jx}px,${a.y - p.center.y + jy}px) ` +
		`${stretch(v.x, v.y, 1 + 3 * close, 1 - 0.93 * Math.pow(close, 1.3))} ` +
		`${tumble} rotate(${jr}deg) scale(${dx},${dy})`;
	p.el.style.opacity = String(smooth(0, 25, d));
}

// Top and bottom edge positions for peeled pieces. The bottom edge leads: it is
// dragged out while the top is pinned, then goes into the hole first. The top
// lets go when the hold ends and follows, speeding up.
function edges(p, heldLinear, moving, hole) {
	// Visible from the start of the hold rather than easing in late.
	const held = Math.pow(heldLinear, 0.9);
	const gB = moving > 0
		? p.peel + (1 - p.peel) * Math.pow(clamp01(moving / 0.7), 1.7)
		: p.peel * held;
	const gA = Math.pow(moving, 1.9);
	return { a: pathPos(p.top, gA, p.bend, hole), b: pathPos(p.bottom, gB, p.bend, hole) };
}

// Photo, frame and buttons are warped as one continuous mesh on the GPU, so
// there are no rows or seams. While pulled, the sides narrow to a point at the
// bottom, and the middle is dragged further than the sides, so the top edge
// sags into a downward V the same way.
const WARP_VS = `
attribute vec2 aPos;
attribute vec2 aUV;
attribute float aAlpha;
uniform vec2 uView;
varying vec2 vUV;
varying float vAlpha;
void main() {
	vUV = aUV;
	vAlpha = aAlpha;
	gl_Position = vec4(aPos.x / uView.x * 2.0 - 1.0, 1.0 - aPos.y / uView.y * 2.0, 0.0, 1.0);
}`;
const WARP_FS = `
precision mediump float;
uniform sampler2D uTex;
varying vec2 vUV;
varying float vAlpha;
void main() {
	gl_FragColor = texture2D(uTex, vUV) * vAlpha;
}`;

function createWarpRenderer(canvas) {
	const gl = canvas.getContext('webgl', { premultipliedAlpha: true, antialias: true });
	if (!gl) return null;
	const shader = (type, source) => {
		const sh = gl.createShader(type);
		gl.shaderSource(sh, source);
		gl.compileShader(sh);
		return sh;
	};
	const program = gl.createProgram();
	gl.attachShader(program, shader(gl.VERTEX_SHADER, WARP_VS));
	gl.attachShader(program, shader(gl.FRAGMENT_SHADER, WARP_FS));
	gl.linkProgram(program);
	gl.useProgram(program);
	const aPos = gl.getAttribLocation(program, 'aPos');
	const aUV = gl.getAttribLocation(program, 'aUV');
	const aAlpha = gl.getAttribLocation(program, 'aAlpha');
	const uView = gl.getUniformLocation(program, 'uView');
	const buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	const indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, gridIndices(), gl.STATIC_DRAW);
	for (const [loc, size, offset] of [[aPos, 2, 0], [aUV, 2, 8], [aAlpha, 1, 16]]) {
		gl.enableVertexAttribArray(loc);
		gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 20, offset);
	}
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
	const textures = new Map();

	return {
		begin(width, height, cssWidth, cssHeight) {
			gl.viewport(0, 0, width, height);
			gl.clearColor(0, 0, 0, 0);
			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.uniform2f(uView, cssWidth, cssHeight);
		},
		draw(piece, vertices) {
			let tex = textures.get(piece);
			if (!tex) {
				tex = gl.createTexture();
				gl.bindTexture(gl.TEXTURE_2D, tex);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, piece.src);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				textures.set(piece, tex);
			}
			gl.bindTexture(gl.TEXTURE_2D, tex);
			gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STREAM_DRAW);
			gl.drawElements(gl.TRIANGLES, ROWS * COLS * 6, gl.UNSIGNED_SHORT, 0);
		},
		dispose() {
			gl.getExtension('WEBGL_lose_context')?.loseContext();
		},
	};
}

// The mesh is a fixed grid of ROWS x COLS cells over each piece.
const ROWS = 160;
const COLS = 16;

function gridIndices() {
	const out = new Uint16Array(ROWS * COLS * 6);
	let n = 0;
	for (let r = 0; r < ROWS; r++) {
		for (let c = 0; c < COLS; c++) {
			const i = r * (COLS + 1) + c;
			const j = i + COLS + 1;
			out.set([i, j, i + 1, i + 1, j, j + 1], n);
			n += 6;
		}
	}
	return out;
}

// How far the sides have narrowed at f (0 = top, 1 = the point): straight for
// the top half, like a sticker peeling, then curving inward (concave) into the
// point. The two halves meet with the same slope, so there is no kink.
const TAPER_CURVE = 1.8;
const TAPER_SLOPE = (2 * TAPER_CURVE) / (1 + TAPER_CURVE);
function sideTaper(f) {
	if (f <= 0.5) return TAPER_SLOPE * f;
	const start = TAPER_SLOPE * 0.5;
	return start + (1 - start) * (1 - Math.pow(1 - (f - 0.5) * 2, TAPER_CURVE));
}

// The grid's points for one piece. `view` is the scroll offset (page to viewport).
function warpMesh(p, t, hole, view) {
	const t0 = t - p.delay;
	const heldLinear = clamp01(t0 / p.hold);
	const moving = clamp01((t0 - p.hold) / p.travel);
	const { a, b } = t0 > 0
		? edges(p, heldLinear, moving, hole)
		: { a: p.top, b: p.bottom };
	const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
	const pull = clamp01((len / p.h - 1) / 2);
	// Grows over the hold: sides narrow to a point at the bottom...
	const pinch = t0 > 0 ? smooth(0, 1, heldLinear) : 0;
	// ...and the middle is dragged this much further than the sides (in path units).
	const sag = (0.3 * p.w * pinch) / len;
	// Lower parts take more of the stretch as the pull grows. Outside 0..1 it
	// carries straight on, so the sagging middle can run past the ends.
	const at = (f) => {
		const k = f < 0 || f > 1 ? f : f + (Math.pow(f, 1.8) - f) * pull;
		return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k };
	};
	// Once it lets go, the whole piece (the trailing top most noticeably) keeps
	// slimming as it falls, fastest at first, to about a quarter of its width.
	const falling = 1 - 0.75 * (1 - Math.pow(1 - moving, 2));
	const out = new Float32Array((ROWS + 1) * (COLS + 1) * 5);
	let n = 0;
	for (let r = 0; r <= ROWS; r++) {
		const f = r / ROWS;
		const narrow = 1 - pinch * sideTaper(f);
		for (let c = 0; c <= COLS; c++) {
			const u = c / COLS;
			// The top V's sides curve slightly inward too.
			const fu = f + sag * Math.pow(1 - Math.abs(2 * u - 1), 1.5);
			const centre = at(fu);
			const before = at(fu - 0.5 / ROWS);
			const after = at(fu + 0.5 / ROWS);
			const dir = unit(after.x - before.x, after.y - before.y);
			const d = Math.hypot(centre.x - hole.x, centre.y - hole.y);
			// Across the piece: u = 0 is its left edge when it points down the page.
			// Skinnier all the way down (to about a third by the time it is close),
			// then really skinny within THIN_RADIUS.
			// Eased in with the pinch, so a piece at rest keeps its exact shape.
			const slim = 1 - pinch * 0.65 * (1 - clamp01((d - THIN_RADIUS) / (p.startDist - THIN_RADIUS)));
			const across = (0.5 - u) * p.w * narrow * slim * falling * (1 - 0.93 * Math.pow(near(d), 1.3));
			out[n++] = centre.x - dir.y * across - view.x;
			out[n++] = centre.y + dir.x * across - view.y;
			out[n++] = u;
			out[n++] = f;
			out[n++] = smooth(0, 25, d);
		}
	}
	return out;
}

function frame(p, t, hole, reverse = false) {
	if (p.kind === 'arrow') return frameArrow(p, t, hole);
	if (p.warped) return;
	const t0 = t - p.delay;
	if (t0 <= 0) {
		p.el.style.transform = '';
		p.el.style.opacity = '1';
		return;
	}
	const heldLinear = clamp01(t0 / p.hold);
	const moving = clamp01((t0 - p.hold) / p.travel);
	frameTumble(p, t, t0, heldLinear, moving, hole, reverse);
}

function boost(detail) {
	window.dispatchEvent(new CustomEvent('blackhole:boost', { detail }));
}

/**
 * Returns { pull, release } for a section and a hole element. `pull` sucks
 * the section into the hole; `release` plays it back out. Both resolve when done.
 */
export function createBlackHolePull(section, holeEl) {
	let overlay = null;
	let canvas = null;
	let renderer = null;
	let pieces = [];
	let total = 0;
	let running = false;

	const holeCenter = () => {
		const r = holeEl.getBoundingClientRect();
		return pagePoint(r.left + r.width / 2, r.top + r.height / 2);
	};
	const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	// Sized to the viewport and redrawn every frame; page coordinates are
	// shifted by the scroll position, so scrolling mid-pull works.
	const drawCanvas = (t, hole) => {
		if (!renderer) return;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		const w = Math.round(window.innerWidth * dpr);
		const h = Math.round(window.innerHeight * dpr);
		if (canvas.width !== w || canvas.height !== h) {
			canvas.width = w;
			canvas.height = h;
		}
		renderer.begin(w, h, window.innerWidth, window.innerHeight);
		const view = { x: window.scrollX, y: window.scrollY };
		for (const p of pieces) if (p.warped) renderer.draw(p, warpMesh(p, t, hole, view));
	};

	const run = (forward, rate = 1) => new Promise((resolve) => {
		const start = performance.now();
		const tick = (now) => {
			const elapsed = Math.min(total, (now - start) * rate);
			const t = forward ? elapsed : total - elapsed;
			const hole = holeCenter();
			for (const p of pieces) frame(p, t, hole, !forward);
			drawCanvas(t, hole);
			if (elapsed < total) requestAnimationFrame(tick);
			else resolve();
		};
		requestAnimationFrame(tick);
	});

	async function pull() {
		if (running || overlay) return;
		running = true;
		if (reduced()) {
			await section.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' }).finished;
			overlay = 'faded';
			running = false;
			return;
		}
		overlay = document.createElement('div');
		overlay.setAttribute('aria-hidden', 'true');
		Object.assign(overlay.style, {
			position: 'absolute', top: '0', left: '0', width: '0', height: '0',
			zIndex: '15', pointerEvents: 'none',
		});
		canvas = document.createElement('canvas');
		Object.assign(canvas.style, {
			position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
			zIndex: String(LAYER.photo),
		});
		overlay.append(canvas);
		renderer = createWarpRenderer(canvas);
		document.body.append(overlay);
		pieces = collect(section, overlay);
		await Promise.all(pieces.map((p) => p.ready));
		total = plan(pieces, holeCenter());
		for (const p of pieces) frame(p, 0, holeCenter());
		drawCanvas(0, holeCenter());
		section.style.visibility = 'hidden';
		boost({ speed: 2.8, bloom: 0.8, exposure: 0.55 });
		await run(true);
		boost(null);
		running = false;
	}

	async function release() {
		if (running || !overlay) return;
		running = true;
		if (overlay === 'faded') {
			await section.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400 }).finished;
			section.getAnimations().forEach((a) => a.cancel());
			overlay = null;
			running = false;
			return;
		}
		boost({ speed: 2.8, bloom: 0.8, exposure: 0.55 });
		await run(false, 3);
		boost(null);
		section.style.visibility = '';
		renderer?.dispose();
		renderer = null;
		overlay.remove();
		overlay = null;
		pieces = [];
		running = false;
	}

	return { pull, release, isPulled: () => !!overlay && !running, isRunning: () => running };
}
