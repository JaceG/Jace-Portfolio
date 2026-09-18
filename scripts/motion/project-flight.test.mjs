import test from 'node:test';
import assert from 'node:assert/strict';
import { flightPanels } from '../../src/components/motion-preview/project-flight.mjs';
import projectsHandler from '../../src/pages/api/projects.js';

test('the full catalog supplies the same screenshots as the project cards', () => {
	let catalog, firstPage;
	const response = (save) => ({ status() { return this; }, json: save });
	projectsHandler({ query: { all: '1' } }, response((data) => { catalog = data; }));
	projectsHandler({ query: {} }, response((data) => { firstPage = data; }));
	assert.equal(catalog.results.length, catalog.total);
	assert.ok(catalog.total > firstPage.results.length);
	assert.ok(catalog.results.every((project) => project.slug && project.image));
	for (const project of firstPage.results) {
		assert.equal(catalog.results.find((item) => item.slug === project.slug).image, project.image);
	}
});

test('every project gets a visible pass as the catalog grows, with bounded drawing work', () => {
	for (const count of [1, 2, 21, 22, 101, 1000]) {
		const seen = new Set();
		const samples = count * 24 + 100;
		for (let step = 0; step <= samples; step++) {
			const panels = flightPanels(count, step / samples, 1280, 656);
			assert.ok(panels.length <= 6);
			for (const panel of panels) {
				assert.ok(panel.index >= 0 && panel.index < count);
				assert.ok(Number.isFinite(panel.x) && Number.isFinite(panel.y));
				if (panel.opacity > .9 && panel.width > 250 && panel.x > 0 && panel.x < 1280) seen.add(panel.index);
			}
		}
		assert.equal(seen.size, count);
	}
});

test('scrolling backward returns the same composition and the exit clears', () => {
	for (const width of [393, 1280]) {
		const forward = [.1, .3, .7].map((progress) => flightPanels(21, progress, width, 720));
		const reverse = [.7, .3, .1].map((progress) => flightPanels(21, progress, width, 720)).reverse();
		assert.deepEqual(forward, reverse);
		assert.deepEqual(flightPanels(21, 0, width, 720).map((panel) => panel.index), [0, 1]);
		assert.deepEqual(flightPanels(21, 1, width, 720), []);
	}
	assert.deepEqual(flightPanels(0, .5, 1280, 720), []);
});
