const fs = require('fs');

// Read existing library
const libraryPath = './data/library.1770053848388.js';
let libraryContent = fs.readFileSync(libraryPath, 'utf8');

// Extract the JSON array
const jsonMatch = libraryContent.match(
	/window\.libraryJSON\s*=\s*(\[[\s\S]*\]);?/
);
if (!jsonMatch) {
	console.error('Could not find libraryJSON in file');
	process.exit(1);
}

const library = JSON.parse(jsonMatch[1]);

// Normalize title for comparison
function normalizeTitle(title) {
	return title
		.toLowerCase()
		.replace(/[^\w\s]/g, '') // remove punctuation
		.replace(/\s+/g, ' ') // normalize whitespace
		.trim();
}

// Separate Audible books (original) from Goodreads imports
const audibleBooks = library.filter(
	(book) => !book.asin?.startsWith('goodreads-')
);
const goodreadsBooks = library.filter((book) =>
	book.asin?.startsWith('goodreads-')
);

console.log(`Audible books: ${audibleBooks.length}`);
console.log(`Goodreads books: ${goodreadsBooks.length}`);

// Create a set of normalized Audible titles for fast lookup
const audibleTitles = new Set();
const audibleTitleMap = {};

audibleBooks.forEach((book) => {
	const normalized = normalizeTitle(book.title);
	audibleTitles.add(normalized);
	audibleTitleMap[normalized] = book.title;

	// Also add short title if different
	if (book.titleShort && book.titleShort !== book.title) {
		const normalizedShort = normalizeTitle(book.titleShort);
		audibleTitles.add(normalizedShort);
		audibleTitleMap[normalizedShort] = book.titleShort;
	}
});

// Also check by author + partial title match
const audibleAuthorTitles = new Map();
audibleBooks.forEach((book) => {
	if (book.authors && book.authors.length > 0) {
		const authorKey = book.authors[0].name.toLowerCase();
		if (!audibleAuthorTitles.has(authorKey)) {
			audibleAuthorTitles.set(authorKey, []);
		}
		audibleAuthorTitles.get(authorKey).push({
			title: book.title,
			normalized: normalizeTitle(book.title),
		});
	}
});

// Find duplicates
const duplicates = [];
const uniqueGoodreads = [];

goodreadsBooks.forEach((book) => {
	const normalized = normalizeTitle(book.title);
	let isDuplicate = false;
	let matchedWith = null;

	// Check exact title match
	if (audibleTitles.has(normalized)) {
		isDuplicate = true;
		matchedWith = audibleTitleMap[normalized];
	}

	// Check if Goodreads title contains or is contained by an Audible title
	if (!isDuplicate) {
		for (const audibleTitle of audibleTitles) {
			// Check if one title contains the other (for subtitles, etc.)
			if (
				normalized.includes(audibleTitle) ||
				audibleTitle.includes(normalized)
			) {
				// Make sure it's a significant match (not just a short word)
				if (audibleTitle.length > 10 || normalized.length > 10) {
					isDuplicate = true;
					matchedWith = audibleTitleMap[audibleTitle];
					break;
				}
			}
		}
	}

	// Check by same author with similar title
	if (!isDuplicate && book.authors && book.authors.length > 0) {
		const authorKey = book.authors[0].name.toLowerCase();
		if (audibleAuthorTitles.has(authorKey)) {
			const authorBooks = audibleAuthorTitles.get(authorKey);
			for (const audibleBook of authorBooks) {
				// Check for partial match (first 20 chars)
				const shortNorm = normalized.substring(0, 20);
				const shortAudible = audibleBook.normalized.substring(0, 20);
				if (shortNorm === shortAudible && shortNorm.length > 10) {
					isDuplicate = true;
					matchedWith = audibleBook.title;
					break;
				}
			}
		}
	}

	if (isDuplicate) {
		duplicates.push({ goodreads: book.title, audible: matchedWith });
	} else {
		uniqueGoodreads.push(book);
	}
});

console.log(`\n=== DUPLICATES FOUND: ${duplicates.length} ===`);
duplicates.forEach((d) => {
	console.log(`  Goodreads: "${d.goodreads}"`);
	console.log(`  Audible:   "${d.audible}"`);
	console.log('');
});

console.log(`\n=== UNIQUE GOODREADS BOOKS: ${uniqueGoodreads.length} ===`);

// Re-number the unique Goodreads books
let maxAdded = 0;
audibleBooks.forEach((book) => {
	if (book.added > maxAdded) maxAdded = book.added;
});

uniqueGoodreads.forEach((book, index) => {
	book.added = maxAdded + index + 1;
	book.asin = `goodreads-${index}`;
});

// Combine and save
const updatedLibrary = [...audibleBooks, ...uniqueGoodreads];

const newContent = `window.libraryJSON = ${JSON.stringify(updatedLibrary)};`;
fs.writeFileSync(libraryPath, newContent);

console.log(`\nLibrary updated:`);
console.log(`  Audible books: ${audibleBooks.length}`);
console.log(
	`  Goodreads books (after removing duplicates): ${uniqueGoodreads.length}`
);
console.log(`  Total: ${updatedLibrary.length}`);
