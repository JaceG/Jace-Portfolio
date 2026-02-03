const fs = require('fs');

// Parse XML to extract book data
function parseGoodreadsXML(xmlContent) {
	const books = [];
	const itemRegex = /<item>([\s\S]*?)<\/item>/g;
	let match;

	while ((match = itemRegex.exec(xmlContent)) !== null) {
		const item = match[1];

		const getField = (field) => {
			const regex = new RegExp(
				`<${field}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${field}>|<${field}>([^<]*)<\\/${field}>`
			);
			const m = item.match(regex);
			return m ? (m[1] || m[2] || '').trim() : '';
		};

		const title = getField('title');
		const author = getField('author_name');
		let cover =
			getField('book_large_image_url') ||
			getField('book_medium_image_url') ||
			getField('book_image_url');
		const rating = parseInt(getField('user_rating')) || 0;
		const bookId = getField('book_id');

		// Clean up cover URL - remove size suffix for larger image
		if (cover) {
			cover = cover.replace(/\._S[XY]\d+_?\./, '.');
		}

		if (title && author) {
			books.push({ title, author, cover, rating, bookId });
		}
	}

	return books;
}

// Read all XML files
let allGoodreadsBooks = [];
for (let page = 1; page <= 5; page++) {
	const filename = `goodreads_page${page}.xml`;
	if (fs.existsSync(filename)) {
		const content = fs.readFileSync(filename, 'utf8');
		const books = parseGoodreadsXML(content);
		console.log(`Page ${page}: ${books.length} books`);
		allGoodreadsBooks = allGoodreadsBooks.concat(books);
	}
}

console.log(`\nTotal Goodreads books found: ${allGoodreadsBooks.length}`);

// Dedupe Goodreads books by title (in case same book appears on multiple pages)
const seenTitles = new Set();
const uniqueGoodreadsBooks = [];
allGoodreadsBooks.forEach((book) => {
	const normalizedTitle = book.title.toLowerCase().trim();
	if (!seenTitles.has(normalizedTitle)) {
		seenTitles.add(normalizedTitle);
		uniqueGoodreadsBooks.push(book);
	}
});

console.log(`Unique Goodreads books: ${uniqueGoodreadsBooks.length}`);

// Read existing library
const libraryPath = './data/library.1770053848388.js';
let libraryContent = fs.readFileSync(libraryPath, 'utf8');

const jsonMatch = libraryContent.match(
	/window\.libraryJSON\s*=\s*(\[[\s\S]*\]);?/
);
if (!jsonMatch) {
	console.error('Could not find libraryJSON in file');
	process.exit(1);
}

const library = JSON.parse(jsonMatch[1]);

// Remove existing Goodreads imports
const audibleBooks = library.filter(
	(book) => !book.asin?.startsWith('goodreads-')
);
console.log(`\nAudible books in library: ${audibleBooks.length}`);

// Normalize title for comparison
function normalizeTitle(title) {
	return title
		.toLowerCase()
		.replace(/[^\w\s]/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

// Create set of Audible titles
const audibleTitles = new Map();
audibleBooks.forEach((book) => {
	const normalized = normalizeTitle(book.title);
	audibleTitles.set(normalized, book.title);

	if (book.titleShort && book.titleShort !== book.title) {
		audibleTitles.set(normalizeTitle(book.titleShort), book.titleShort);
	}
});

// Check for duplicates - require more strict matching
function isDuplicate(goodreadsTitle) {
	const normalized = normalizeTitle(goodreadsTitle);

	// Exact match
	if (audibleTitles.has(normalized)) {
		return { isDup: true, match: audibleTitles.get(normalized) };
	}

	// Check if titles share significant common substring (at least 25 chars)
	for (const [audibleNorm, audibleTitle] of audibleTitles) {
		// Skip short titles to avoid false positives
		if (audibleNorm.length < 15 || normalized.length < 15) continue;

		// Check if one contains the other
		if (normalized.includes(audibleNorm) && audibleNorm.length >= 20) {
			return { isDup: true, match: audibleTitle };
		}
		if (audibleNorm.includes(normalized) && normalized.length >= 20) {
			return { isDup: true, match: audibleTitle };
		}

		// Check if first 25 chars match (for subtitles)
		if (normalized.length >= 25 && audibleNorm.length >= 25) {
			if (normalized.substring(0, 25) === audibleNorm.substring(0, 25)) {
				return { isDup: true, match: audibleTitle };
			}
		}
	}

	return { isDup: false, match: null };
}

// Filter out duplicates
const duplicates = [];
const nonDuplicates = [];

uniqueGoodreadsBooks.forEach((book) => {
	const result = isDuplicate(book.title);
	if (result.isDup) {
		duplicates.push({ goodreads: book.title, audible: result.match });
	} else {
		nonDuplicates.push(book);
	}
});

console.log(`\nDuplicates found: ${duplicates.length}`);
console.log(`Unique Goodreads books to add: ${nonDuplicates.length}`);

// Show some duplicates
console.log(`\n=== Sample Duplicates ===`);
duplicates.slice(0, 10).forEach((d) => {
	console.log(`  "${d.goodreads}" => "${d.audible}"`);
});
if (duplicates.length > 10) {
	console.log(`  ... and ${duplicates.length - 10} more`);
}

// Find max added value
let maxAdded = 0;
audibleBooks.forEach((book) => {
	if (book.added > maxAdded) maxAdded = book.added;
});

// Create new entries
const newBooks = nonDuplicates.map((book, index) => ({
	added: maxAdded + index + 1,
	asin: `goodreads-${book.bookId || index}`,
	authors: [{ name: book.author, url: '' }],
	blurb: '',
	categories: [{ name: 'Goodreads Import', url: '' }],
	cover: book.cover,
	format: 'Goodreads Book',
	isNew: false,
	language: 'English',
	length: '',
	narrators: [],
	progress: 100,
	publishers: [],
	rating: book.rating,
	ratings: 0,
	releaseDate: '',
	series: null,
	storePageMissing: true,
	subtitle: '',
	tags: [{ name: 'Goodreads', url: '' }],
	title: book.title,
	titleShort:
		book.title.length > 50
			? book.title.substring(0, 47) + '...'
			: book.title,
}));

// Combine and save
const updatedLibrary = [...audibleBooks, ...newBooks];

const newContent = `window.libraryJSON = ${JSON.stringify(updatedLibrary)};`;
fs.writeFileSync(libraryPath, newContent);

console.log(`\n=== FINAL RESULTS ===`);
console.log(`Audible books: ${audibleBooks.length}`);
console.log(`Goodreads books added: ${newBooks.length}`);
console.log(`Total library size: ${updatedLibrary.length}`);

// Cleanup XML files
for (let page = 1; page <= 6; page++) {
	const filename = `goodreads_page${page}.xml`;
	if (fs.existsSync(filename)) {
		fs.unlinkSync(filename);
	}
}
console.log(`\nCleaned up temporary XML files.`);
