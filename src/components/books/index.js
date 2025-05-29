/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Section from '../section';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import Script from 'next/script';

const initialData = {
	name: '',
	email: '',
	message: '',
};

const Books = () => {
	const [psychologyBooks, setPsychologyBooks] = useState([]);
	const [philosophyBooks, setPhilosophyBooks] = useState([]);
	const [historyBooks, setHistoryBooks] = useState([]);
	const [scienceBooks, setScienceBooks] = useState([]);
	const [englishWritingBooks, setEnglishWritingBooks] = useState([]);
	const [displayedPsychologyBooks, setDisplayedPsychologyBooks] = useState(
		[]
	);
	const [displayedPhilosophyBooks, setDisplayedPhilosophyBooks] = useState(
		[]
	);
	const [displayedHistoryBooks, setDisplayedHistoryBooks] = useState([]);
	const [displayedScienceBooks, setDisplayedScienceBooks] = useState([]);
	const [displayedEnglishWritingBooks, setDisplayedEnglishWritingBooks] =
		useState([]);
	const [psychologyTotal, setPsychologyTotal] = useState(0);
	const [philosophyTotal, setPhilosophyTotal] = useState(0);
	const [historyTotal, setHistoryTotal] = useState(0);
	const [scienceTotal, setScienceTotal] = useState(0);
	const [englishWritingTotal, setEnglishWritingTotal] = useState(0);
	const [psychologyPage, setPsychologyPage] = useState(1);
	const [philosophyPage, setPhilosophyPage] = useState(1);
	const [historyPage, setHistoryPage] = useState(1);
	const [sciencePage, setSciencePage] = useState(1);
	const [englishWritingPage, setEnglishWritingPage] = useState(1);
	const booksPerPage = 4;

	async function fetchBooks() {
		const [
			psychologyRes,
			philosophyRes,
			historyRes,
			scienceRes,
			englishWritingRes,
		] = await Promise.all([
			fetch('/api/books?category=psychology'),
			fetch('/api/books?category=philosophy'),
			fetch('/api/books?category=history'),
			fetch('/api/books?category=science'),
			fetch('/api/books?category=english-writing'),
		]);

		const psychologyData = await psychologyRes.json();
		const philosophyData = await philosophyRes.json();
		const historyData = await historyRes.json();
		const scienceData = await scienceRes.json();
		const englishWritingData = await englishWritingRes.json();

		setPsychologyBooks(psychologyData.results);
		setPhilosophyBooks(philosophyData.results);
		setHistoryBooks(historyData.results);
		setScienceBooks(scienceData.results);
		setEnglishWritingBooks(englishWritingData.results);
		setPsychologyTotal(psychologyData.total);
		setPhilosophyTotal(philosophyData.total);
		setHistoryTotal(historyData.total);
		setScienceTotal(scienceData.total);
		setEnglishWritingTotal(englishWritingData.total);

		// Initially show first set of books for each category
		setDisplayedPsychologyBooks(
			psychologyData.results.slice(0, booksPerPage)
		);
		setDisplayedPhilosophyBooks(
			philosophyData.results.slice(0, booksPerPage)
		);
		setDisplayedHistoryBooks(historyData.results.slice(0, booksPerPage));
		setDisplayedScienceBooks(scienceData.results.slice(0, booksPerPage));
		setDisplayedEnglishWritingBooks(
			englishWritingData.results.slice(0, booksPerPage)
		);
	}

	useEffect(() => {
		fetchBooks();
	}, []);

	function handlePsychologyShowMore() {
		const nextPage = psychologyPage + 1;
		const endIndex = nextPage * booksPerPage;
		setDisplayedPsychologyBooks(psychologyBooks.slice(0, endIndex));
		setPsychologyPage(nextPage);
	}

	function handlePsychologyShowLess() {
		const prevPage = psychologyPage - 1;
		const endIndex = prevPage * booksPerPage;
		setDisplayedPsychologyBooks(psychologyBooks.slice(0, endIndex));
		setPsychologyPage(prevPage);
	}

	function handlePhilosophyShowMore() {
		const nextPage = philosophyPage + 1;
		const endIndex = nextPage * booksPerPage;
		setDisplayedPhilosophyBooks(philosophyBooks.slice(0, endIndex));
		setPhilosophyPage(nextPage);
	}

	function handlePhilosophyShowLess() {
		const prevPage = philosophyPage - 1;
		const endIndex = prevPage * booksPerPage;
		setDisplayedPhilosophyBooks(philosophyBooks.slice(0, endIndex));
		setPhilosophyPage(prevPage);
	}

	function handleHistoryShowMore() {
		const nextPage = historyPage + 1;
		const endIndex = nextPage * booksPerPage;
		setDisplayedHistoryBooks(historyBooks.slice(0, endIndex));
		setHistoryPage(nextPage);
	}

	function handleHistoryShowLess() {
		const prevPage = historyPage - 1;
		const endIndex = prevPage * booksPerPage;
		setDisplayedHistoryBooks(historyBooks.slice(0, endIndex));
		setHistoryPage(prevPage);
	}

	function handleScienceShowMore() {
		const nextPage = sciencePage + 1;
		const endIndex = nextPage * booksPerPage;
		setDisplayedScienceBooks(scienceBooks.slice(0, endIndex));
		setSciencePage(nextPage);
	}

	function handleScienceShowLess() {
		const prevPage = sciencePage - 1;
		const endIndex = prevPage * booksPerPage;
		setDisplayedScienceBooks(scienceBooks.slice(0, endIndex));
		setSciencePage(prevPage);
	}

	function handleEnglishWritingShowMore() {
		const nextPage = englishWritingPage + 1;
		const endIndex = nextPage * booksPerPage;
		setDisplayedEnglishWritingBooks(englishWritingBooks.slice(0, endIndex));
		setEnglishWritingPage(nextPage);
	}

	function handleEnglishWritingShowLess() {
		const prevPage = englishWritingPage - 1;
		const endIndex = prevPage * booksPerPage;
		setDisplayedEnglishWritingBooks(englishWritingBooks.slice(0, endIndex));
		setEnglishWritingPage(prevPage);
	}

	// Group books into rows of 4
	const groupBooksIntoRows = (books) => {
		const rows = [];
		for (let i = 0; i < books.length; i += booksPerPage) {
			rows.push(books.slice(i, i + booksPerPage));
		}
		return rows;
	};

	const psychologyBookRows = groupBooksIntoRows(displayedPsychologyBooks);
	const philosophyBookRows = groupBooksIntoRows(displayedPhilosophyBooks);
	const historyBookRows = groupBooksIntoRows(displayedHistoryBooks);
	const scienceBookRows = groupBooksIntoRows(displayedScienceBooks);
	const englishWritingBookRows = groupBooksIntoRows(
		displayedEnglishWritingBooks
	);

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
							max-width: 600px !important;
							width: 600px !important;
						}
					}
				`}</style>

				<h1 className='flex-1 text-center sm:text-5xl text-4xl font-bold text-[#39bb6a] uppercase mb-4 mt-8'>
					Psychology
				</h1>

				{/* Render Psychology books in rows */}
				{psychologyBookRows.map((row, rowIndex) => (
					<div
						key={rowIndex}
						className='flex flex-wrap justify-center p-4 gap-4 mb-4'>
						{row.map((book) => (
							<div
								key={book.id}
								className='border-[20px] border-[#39bb6a]'>
								<Link href={book.pageUrl} target='_blank'>
									<img
										src={book.coverUrl}
										width={200}
										height={200}
										alt='Book cover'
									/>
								</Link>
							</div>
						))}
					</div>
				))}

				{/* Pagination buttons for Psychology section */}
				<div className='flex justify-center items-center gap-4 mt-16 mb-8'>
					{psychologyPage > 1 && (
						<button
							onClick={handlePsychologyShowLess}
							className='relative rounded bg-[#ffffff] border-2 border-[#39bb6a] text-[#39bb6a] lg:w-[450px] w-[300px] p-3 tracking-[-0.04em] block uppercase font-black'>
							See Less
						</button>
					)}

					{psychologyPage * booksPerPage < psychologyTotal && (
						<button
							onClick={handlePsychologyShowMore}
							className='relative rounded bg-[#ffffff] border-2 border-[#39bb6a] text-[#39bb6a] lg:w-[450px] w-[300px] p-3 tracking-[-0.04em] block uppercase font-black'>
							See More
						</button>
					)}
				</div>

				<h1 className='flex-1 text-center sm:text-5xl text-6xl font-bold text-[#39bb6a] uppercase mb-4 mt-8'>
					Philosophy
				</h1>

				{/* Render Philosophy books in rows */}
				{philosophyBookRows.map((row, rowIndex) => (
					<div
						key={`philosophy-${rowIndex}`}
						className='flex flex-wrap justify-center p-4 gap-4 mb-4'>
						{row.map((book) => (
							<div
								key={`philosophy-${book.id}`}
								className='border-[20px] border-[#39bb6a]'>
								<Link href={book.pageUrl} target='_blank'>
									<img
										src={book.coverUrl}
										width={200}
										height={200}
										alt='Book cover'
									/>
								</Link>
							</div>
						))}
					</div>
				))}

				{/* Pagination buttons for Philosophy section */}
				<div className='flex justify-center items-center gap-4 mt-16 mb-8'>
					{philosophyPage > 1 && (
						<button
							onClick={handlePhilosophyShowLess}
							className='relative rounded bg-[#ffffff] border-2 border-[#39bb6a] text-[#39bb6a] lg:w-[450px] w-[300px] p-3 tracking-[-0.04em] block uppercase font-black'>
							See Less
						</button>
					)}

					{philosophyPage * booksPerPage < philosophyTotal && (
						<button
							onClick={handlePhilosophyShowMore}
							className='relative rounded bg-[#ffffff] border-2 border-[#39bb6a] text-[#39bb6a] lg:w-[450px] w-[300px] p-3 tracking-[-0.04em] block uppercase font-black'>
							See More
						</button>
					)}
				</div>

				<h1 className='flex-1 text-center sm:text-5xl text-6xl font-bold text-[#39bb6a] uppercase mb-4 mt-8'>
					History
				</h1>

				{/* Render History books in rows */}
				{historyBookRows.map((row, rowIndex) => (
					<div
						key={`history-${rowIndex}`}
						className='flex flex-wrap justify-center p-4 gap-4 mb-4'>
						{row.map((book) => (
							<div
								key={`history-${book.id}`}
								className='border-[20px] border-[#39bb6a]'>
								<Link href={book.pageUrl} target='_blank'>
									<img
										src={book.coverUrl}
										width={200}
										height={200}
										alt='Book cover'
									/>
								</Link>
							</div>
						))}
					</div>
				))}

				{/* Pagination buttons for History section */}
				<div className='flex justify-center items-center gap-4 mt-16 mb-8'>
					{historyPage > 1 && (
						<button
							onClick={handleHistoryShowLess}
							className='relative rounded bg-[#ffffff] border-2 border-[#39bb6a] text-[#39bb6a] lg:w-[450px] w-[300px] p-3 tracking-[-0.04em] block uppercase font-black'>
							See Less
						</button>
					)}

					{historyPage * booksPerPage < historyTotal && (
						<button
							onClick={handleHistoryShowMore}
							className='relative rounded bg-[#ffffff] border-2 border-[#39bb6a] text-[#39bb6a] lg:w-[450px] w-[300px] p-3 tracking-[-0.04em] block uppercase font-black'>
							See More
						</button>
					)}
				</div>

				<h1 className='flex-1 text-center sm:text-5xl text-6xl font-bold text-[#39bb6a] uppercase mb-4 mt-8'>
					Science
				</h1>

				{/* Render Science books in rows */}
				{scienceBookRows.map((row, rowIndex) => (
					<div
						key={`science-${rowIndex}`}
						className='flex flex-wrap justify-center p-4 gap-4 mb-4'>
						{row.map((book) => (
							<div
								key={`science-${book.id}`}
								className='border-[20px] border-[#39bb6a]'>
								<Link href={book.pageUrl} target='_blank'>
									<img
										src={book.coverUrl}
										width={200}
										height={200}
										alt='Book cover'
									/>
								</Link>
							</div>
						))}
					</div>
				))}

				{/* Pagination buttons for Science section */}
				<div className='flex justify-center items-center gap-4 mt-16 mb-8'>
					{sciencePage > 1 && (
						<button
							onClick={handleScienceShowLess}
							className='relative rounded bg-[#ffffff] border-2 border-[#39bb6a] text-[#39bb6a] lg:w-[450px] w-[300px] p-3 tracking-[-0.04em] block uppercase font-black'>
							See Less
						</button>
					)}

					{sciencePage * booksPerPage < scienceTotal && (
						<button
							onClick={handleScienceShowMore}
							className='relative rounded bg-[#ffffff] border-2 border-[#39bb6a] text-[#39bb6a] lg:w-[450px] w-[300px] p-3 tracking-[-0.04em] block uppercase font-black'>
							See More
						</button>
					)}
				</div>

				<h1 className='flex-1 text-center sm:text-5xl text-6xl font-bold text-[#39bb6a] uppercase mb-4 mt-8'>
					English Writing
				</h1>

				{/* Render English Writing books in rows */}
				{englishWritingBookRows.map((row, rowIndex) => (
					<div
						key={`english-writing-${rowIndex}`}
						className='flex flex-wrap justify-center p-4 gap-4 mb-4'>
						{row.map((book) => (
							<div
								key={`english-writing-${book.id}`}
								className='border-[20px] border-[#39bb6a]'>
								<Link href={book.pageUrl} target='_blank'>
									<img
										src={book.coverUrl}
										width={200}
										height={200}
										alt='Book cover'
									/>
								</Link>
							</div>
						))}
					</div>
				))}

				{/* Pagination buttons for English Writing section */}
				<div className='flex justify-center items-center gap-4 mt-16 mb-8'>
					{englishWritingPage > 1 && (
						<button
							onClick={handleEnglishWritingShowLess}
							className='relative rounded bg-[#ffffff] border-2 border-[#39bb6a] text-[#39bb6a] lg:w-[450px] w-[300px] p-3 tracking-[-0.04em] block uppercase font-black'>
							See Less
						</button>
					)}

					{englishWritingPage * booksPerPage <
						englishWritingTotal && (
						<button
							onClick={handleEnglishWritingShowMore}
							className='relative rounded bg-[#ffffff] border-2 border-[#39bb6a] text-[#39bb6a] lg:w-[450px] w-[300px] p-3 tracking-[-0.04em] block uppercase font-black'>
							See More
						</button>
					)}
				</div>
			</div>
		</Section>
	);
};

export default Books;
