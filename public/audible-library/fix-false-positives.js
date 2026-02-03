const fs = require('fs');

// Books that were incorrectly removed as false positives
const falsePositives = [
	{
		title: 'The Unwritten Rules of Social Relationships',
		author: 'Temple Grandin',
		cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1416179886l/222891.jpg',
		rating: 5,
	},
	{
		title: 'Nonzero: The Logic of Human Destiny',
		author: 'Robert Wright',
		cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1488342903l/34434983.jpg',
		rating: 5,
	},
	{
		title: 'The Copyright Wars: Three Centuries of Trans-Atlantic Battle',
		author: 'Peter Baldwin',
		cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1539814555l/42380708._SX318_.jpg',
		rating: 5,
	},
	{
		title: 'Cognitive Behavioral Therapy',
		author: 'Jason M. Satterfield',
		cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1529151033l/40169286._SX318_.jpg',
		rating: 5,
	},
];

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

// Find highest added value
let maxAdded = 0;
library.forEach((book) => {
	if (book.added > maxAdded) maxAdded = book.added;
});

// Find highest goodreads index
let maxGoodreadsIndex = -1;
library.forEach((book) => {
	if (book.asin?.startsWith('goodreads-')) {
		const idx = parseInt(book.asin.replace('goodreads-', ''));
		if (idx > maxGoodreadsIndex) maxGoodreadsIndex = idx;
	}
});

// Add false positives back
const newBooks = falsePositives.map((book, index) => ({
	added: maxAdded + index + 1,
	asin: `goodreads-${maxGoodreadsIndex + index + 1}`,
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

const updatedLibrary = [...library, ...newBooks];

const newContent = `window.libraryJSON = ${JSON.stringify(updatedLibrary)};`;
fs.writeFileSync(libraryPath, newContent);

console.log(`Added back ${newBooks.length} false positives.`);
console.log(`Total books now: ${updatedLibrary.length}`);
