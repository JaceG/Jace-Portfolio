const fs = require('fs');
const path = require('path');

const libraryFile = path.join(
	__dirname,
	'public/audible-library/data/library.1770053848388.js'
);

console.log('Reading library data...');
const libraryContent = fs.readFileSync(libraryFile, 'utf8');

// Extract the JSON array
const jsonMatch = libraryContent.match(/window\.libraryJSON = (\[.*\]);/s);
if (!jsonMatch) {
	console.error('Could not find libraryJSON');
	process.exit(1);
}

console.log('Parsing JSON...');
const booksArray = JSON.parse(jsonMatch[1]);
console.log(`Total books: ${booksArray.length}`);

// Separate Audible from Goodreads
const audibleBooks = booksArray.filter(
	(book) => !book.asin.startsWith('goodreads-')
);
const goodreadsBooks = booksArray.filter((book) =>
	book.asin.startsWith('goodreads-')
);

console.log(`Audible books: ${audibleBooks.length}`);
console.log(`Goodreads books: ${goodreadsBooks.length}`);

// Audible first, then Goodreads
const reordered = [...audibleBooks, ...goodreadsBooks];

console.log('Writing reordered data...');
const newContent = 'window.libraryJSON = ' + JSON.stringify(reordered) + ';';
fs.writeFileSync(libraryFile, newContent, 'utf8');

console.log('✅ Done! Audible books now appear first.');
