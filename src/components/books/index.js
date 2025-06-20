/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import Section from '../section';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

const categories = [
	{ key: 'psychology', name: 'Psychology', apiCategory: 'psychology' },
	{ key: 'philosophy', name: 'Philosophy', apiCategory: 'philosophy' },
	{ key: 'history', name: 'History', apiCategory: 'history' },
	{ key: 'science', name: 'Science', apiCategory: 'science' },
	{
		key: 'englishWriting',
		name: 'English Writing',
		apiCategory: 'english-writing',
	},
];

const Books = () => {
	const [bookData, setBookData] = useState({});
	const booksPerPage = 4;

	async function fetchBooks() {
		const promises = categories.map((cat) =>
			fetch(`/api/books?category=${cat.apiCategory}`).then((res) =>
				res.json()
			)
		);

		const results = await Promise.all(promises);

		const newBookData = {};
		categories.forEach((cat, index) => {
			newBookData[cat.key] = {
				allBooks: results[index].results,
				displayedBooks: results[index].results.slice(0, booksPerPage),
				total: results[index].total,
				page: 1,
			};
		});

		setBookData(newBookData);
	}

	useEffect(() => {
		fetchBooks();
	}, []);

	const handleShowMore = (categoryKey) => {
		setBookData((prev) => {
			const category = prev[categoryKey];
			const nextPage = category.page + 1;
			const endIndex = nextPage * booksPerPage;

			return {
				...prev,
				[categoryKey]: {
					...category,
					displayedBooks: category.allBooks.slice(0, endIndex),
					page: nextPage,
				},
			};
		});
	};

	const handleShowLess = (categoryKey) => {
		setBookData((prev) => {
			const category = prev[categoryKey];
			const prevPage = category.page - 1;
			const endIndex = prevPage * booksPerPage;

			return {
				...prev,
				[categoryKey]: {
					...category,
					displayedBooks: category.allBooks.slice(0, endIndex),
					page: prevPage,
				},
			};
		});
	};

	const groupBooksIntoRows = (books) => {
		const rows = [];
		for (let i = 0; i < books.length; i += booksPerPage) {
			rows.push(books.slice(i, i + booksPerPage));
		}
		return rows;
	};

	const BookSection = ({ category }) => {
		const data = bookData[category.key];
		if (!data) return null;

		const bookRows = groupBooksIntoRows(data.displayedBooks);

		return (
			<>
				<h1 className='flex-1 text-center sm:text-5xl text-4xl font-bold text-[#39bb6a] uppercase mb-4 mt-8'>
					{category.name}
				</h1>

				{bookRows.map((row, rowIndex) => (
					<div
						key={`${category.key}-${rowIndex}`}
						className='flex flex-wrap justify-center p-4 gap-4 mb-4'>
						{row.map((book) => (
							<div
								key={`${category.key}-${book.id}`}
								className='border-[20px] border-[#39bb6a]'>
								{book.pageUrl ? (
									<Link href={book.pageUrl} target='_blank'>
										<Image
											src={book.coverUrl}
											width={200}
											height={200}
											alt='Book cover'
										/>
									</Link>
								) : (
									<Image
										src={book.coverUrl}
										width={200}
										height={200}
										alt='Book cover'
									/>
								)}
							</div>
						))}
					</div>
				))}

				<div className='flex flex-col sm:flex-row justify-center items-center gap-4 mt-16 mb-8'>
					{data.page > 1 && (
						<button
							onClick={() => handleShowLess(category.key)}
							className='relative rounded bg-[#ffffff] border-2 border-[#39bb6a] text-[#39bb6a] lg:w-[450px] w-[300px] p-3 tracking-[-0.04em] block uppercase font-black'>
							See Less
						</button>
					)}

					{data.page * booksPerPage < data.total && (
						<button
							onClick={() => handleShowMore(category.key)}
							className='relative rounded bg-[#ffffff] border-2 border-[#39bb6a] text-[#39bb6a] lg:w-[450px] w-[300px] p-3 tracking-[-0.04em] block uppercase font-black'>
							See More Books
						</button>
					)}
				</div>
			</>
		);
	};

	return (
		<Section>
			<div className='flex flex-col items-center justify-center 3xl:mb-0 mb-24 bg-white'>
				<main className='flex justify-center items-center mb-2'>
					<h1 className='flex-1 text-center sm:text-9xl text-6xl font-bold text-[#39bb6a] uppercase mb-4 mt-8'>
						Books
					</h1>
				</main>

				{/* Twitter Embeds */}
				<div className='flex justify-center items-center mb-8'>
					<div className='w-full lg:max-w-xl xl:max-w-2xl'>
						<blockquote
							className='twitter-tweet'
							data-theme='light'
							data-dnt='true'>
							<p lang='en' dir='ltr'>
								College is mostly a scam at this point. <br />
								<br />
								You pay $200k+ to get a piece of paper that says
								you can follow instructions and sit still for 4
								years. <br />
								<br />
								Meanwhile, the most successful people I know
								either dropped out or never went.
							</p>
							&mdash; Amjad Masad (@amasad)
							<a href='https://twitter.com/amasad/status/1905103640089825788?ref_src=twsrc%5Etfw'>
								September 23, 2024
							</a>
						</blockquote>
					</div>
				</div>

				<div className='flex justify-center items-center mb-8'>
					<div className='w-full lg:max-w-xl xl:max-w-2xl'>
						<blockquote
							className='twitter-tweet'
							data-theme='light'
							data-dnt='true'>
							<p lang='en' dir='ltr'>
								The fundamental issue is that most universities
								have become massive real estate portfolios with
								bloated administrations that happen to also run
								schools on the side. <br />
								<br />
								The education part has become secondary to the
								business of managing endowments and facilities.
							</p>
							&mdash; Chamath Palihapitiya (@chamath)
							<a href='https://twitter.com/chamath/status/1905270472947704141?ref_src=twsrc%5Etfw'>
								September 24, 2024
							</a>
						</blockquote>
					</div>
				</div>

				<div className='flex justify-center items-center mb-8'>
					<div className='w-full lg:max-w-xl xl:max-w-2xl'>
						<blockquote
							className='twitter-tweet'
							data-theme='light'
							data-dnt='true'>
							<p lang='en' dir='ltr'>
								I no longer think college is worth it for most
								people. <br />
								<br />
								The value prop is completely broken:
								<br />
								<br />
								- Crippling debt
								<br />
								- Outdated curriculums
								<br />
								- Professors disconnected from reality
								<br />
								- Woke ideology prioritized over critical
								thinking
								<br />
								<br />
								Learn a skill. Start a business. Skip the debt.
							</p>
							&mdash; Chamath Palihapitiya (@chamath)
							<a href='https://twitter.com/chamath/status/1905286323977720285?ref_src=twsrc%5Etfw'>
								September 24, 2024
							</a>
						</blockquote>
					</div>
				</div>

				<Script
					src='https://platform.twitter.com/widgets.js'
					strategy='lazyOnload'
				/>

				<style jsx>{`
					:global(.twitter-tweet) {
						margin: 0 auto !important;
					}

					@media (min-width: 768px) {
						:global(.twitter-tweet) {
							max-width: 550px !important;
							width: 550px !important;
						}
					}

					@media (min-width: 1024px) {
						:global(.twitter-tweet) {
							max-w: 600px !important;
							width: 600px !important;
						}
					}
				`}</style>

				{categories.map((category) => (
					<BookSection key={category.key} category={category} />
				))}
			</div>
		</Section>
	);
};

export default Books;
