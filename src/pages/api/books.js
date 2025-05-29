export default function handler(req, res) {
	const psychologyBooks = [
		{
			id: 1,
			category: 'psychology',
			coverUrl: '/books/psychology/A_Mind_for_Numbers.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 2,
			category: 'psychology',
			coverUrl:
				'/books/psychology/An_Illustrated_Book_of_Bad_Arguments.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 3,
			category: 'psychology',
			coverUrl: '/books/psychology/Braving_the_Wilderness.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 4,
			category: 'psychology',
			coverUrl: '/books/psychology/Capture.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 5,
			category: 'psychology',
			coverUrl:
				'/books/psychology/Civilization_and_Its_Discontents_Totem_and_Taboo.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 6,
			category: 'psychology',
			coverUrl: '/books/psychology/Dare_to_Lead.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 7,
			category: 'psychology',
			coverUrl: '/books/psychology/Daring_Greatly.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 8,
			category: 'psychology',
			coverUrl: '/books/psychology/Dollars_and_Sense.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 9,
			category: 'psychology',
			coverUrl: '/books/psychology/Emotional_Intelligence.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 10,
			category: 'psychology',
			coverUrl: '/books/psychology/Flow.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 11,
			category: 'psychology',
			coverUrl: '/books/psychology/Good_Habits_Bad_Habits.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 12,
			category: 'psychology',
			coverUrl: '/books/psychology/Hooked.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 13,
			category: 'psychology',
			coverUrl: '/books/psychology/How_to_Decide.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 14,
			category: 'psychology',
			coverUrl: '/books/psychology/I_Thought_It_Was_Just_Me.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 15,
			category: 'psychology',
			coverUrl: '/books/psychology/Indistractable.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 16,
			category: 'psychology',
			coverUrl: '/books/psychology/Influence.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 17,
			category: 'psychology',
			coverUrl: '/books/psychology/Irrationally_Yours.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 18,
			category: 'psychology',
			coverUrl: '/books/psychology/Mindset.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 19,
			category: 'psychology',
			coverUrl: '/books/psychology/Range.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 20,
			category: 'psychology',
			coverUrl:
				'/books/psychology/Shocking_Psychological_Studies_and_the_Lessons_They_Teach.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 21,
			category: 'psychology',
			coverUrl: '/books/psychology/Smarter_Faster_Better.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 22,
			category: 'psychology',
			coverUrl: '/books/psychology/The_Aging_Brain.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 23,
			category: 'psychology',
			coverUrl:
				'/books/psychology/The_Crowd-A_Study_of_the_Popular_Mind.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 24,
			category: 'psychology',
			coverUrl: '/books/psychology/The_Discomfort_Zone.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 25,
			category: 'psychology',
			coverUrl: '/books/psychology/The_Gifts_of_Imperfection.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 26,
			category: 'psychology',
			coverUrl: '/books/psychology/The_Great_Ideas_of_Psychology.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 27,
			category: 'psychology',
			coverUrl: '/books/psychology/The_Laws_of_Human_Nature.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 28,
			category: 'psychology',
			coverUrl: '/books/psychology/The_Pattern_Seekers.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 29,
			category: 'psychology',
			coverUrl: '/books/psychology/The_Power_of_Habit.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 30,
			category: 'psychology',
			coverUrl: '/books/psychology/The_Power_of_Vulnerability.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 31,
			category: 'psychology',
			coverUrl: '/books/psychology/The_Psychology_of_Performance.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 32,
			category: 'psychology',
			coverUrl:
				'/books/psychology/The_Psychopathology_of_Everyday_Life.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 33,
			category: 'psychology',
			coverUrl: '/books/psychology/The_Science_of_Evil.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 34,
			category: 'psychology',
			coverUrl: '/books/psychology/The_Startup_of_You.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 35,
			category: 'psychology',
			coverUrl: '/books/psychology/The_Upside_of_Irrationality.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 36,
			category: 'psychology',
			coverUrl: '/books/psychology/Think_Again.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 37,
			category: 'psychology',
			coverUrl: '/books/psychology/Thinking_Fast_and_Slow.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 38,
			category: 'psychology',
			coverUrl: '/books/psychology/Thinking_in_Bets.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 39,
			category: 'psychology',
			coverUrl: '/books/psychology/Tiny_Habits.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 40,
			category: 'psychology',
			coverUrl:
				'/books/psychology/Unwritten_Rules_of_Social_Relationships.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
	];

	const philosophyBooks = [
		{
			id: 41,
			category: 'philosophy',
			coverUrl: '/books/philosophy/Aristotle_for_Everybody.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 42,
			category: 'philosophy',
			coverUrl: '/books/philosophy/The_Prince.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 43,
			category: 'philosophy',
			coverUrl: '/books/philosophy/Meditations.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 44,
			category: 'philosophy',
			coverUrl: '/books/philosophy/The_Philosophers_Toolkit.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 45,
			category: 'philosophy',
			coverUrl: '/books/philosophy/Aristotle_in_90_Minutes.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 46,
			category: 'philosophy',
			coverUrl: '/books/philosophy/Kant_in_90_Minutes.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 47,
			category: 'philosophy',
			coverUrl: '/books/philosophy/Confucius_in_90_Minutes.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 48,
			category: 'philosophy',
			coverUrl: '/books/philosophy/Hume_in_90_Minutes.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 49,
			category: 'philosophy',
			coverUrl: '/books/philosophy/Socrates_in_90_Minutes.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 50,
			category: 'philosophy',
			coverUrl: '/books/philosophy/Thomas_Aquinas_in_90_Minutes.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 51,
			category: 'philosophy',
			coverUrl: '/books/philosophy/Plato_in_90_Minutes.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 52,
			category: 'philosophy',
			coverUrl: '/books/philosophy/Rousseau_in_90_Minutes.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 53,
			category: 'philosophy',
			coverUrl: '/books/philosophy/Descartes_in_90_Minutes.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 54,
			category: 'philosophy',
			coverUrl: '/books/philosophy/Nietzsche_in_90_Minutes.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 55,
			category: 'philosophy',
			coverUrl: '/books/philosophy/Spinoza_in_90_Minutes.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 56,
			category: 'philosophy',
			coverUrl: '/books/philosophy/Sartre_in_90_Minutes.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 57,
			category: 'philosophy',
			coverUrl: '/books/philosophy/Marx_in_90_Minutes.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 58,
			category: 'philosophy',
			coverUrl: '/books/philosophy/St_Augustine_in_90_Minutes.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 59,
			category: 'philosophy',
			coverUrl: '/books/philosophy/Hegel_in_90_Minutes.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 60,
			category: 'philosophy',
			coverUrl: '/books/philosophy/Heidegger_in_90_Minutes.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 61,
			category: 'philosophy',
			coverUrl: '/books/philosophy/Wittgenstein_in_90_Minutes.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 62,
			category: 'philosophy',
			coverUrl: '/books/philosophy/Kierkegaard_in_90_Minutes.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 63,
			category: 'philosophy',
			coverUrl: '/books/philosophy/Schopenhauer_in_90_Minutes.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 64,
			category: 'philosophy',
			coverUrl:
				'/books/philosophy/The_Economic_Consequences_of_the_Peace.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 65,
			category: 'philosophy',
			coverUrl: '/books/philosophy/Wherever_You_Go_There_You_Are.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 66,
			category: 'philosophy',
			coverUrl:
				'/books/philosophy/The_General_Theory_of_Employment_Interest_and_Money.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 67,
			category: 'philosophy',
			coverUrl: '/books/philosophy/Practical_Philosophy.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 68,
			category: 'philosophy',
			coverUrl:
				'/books/philosophy/Epicurus_of_Samos-His_Philosophy_and_Life.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 69,
			category: 'philosophy',
			coverUrl:
				'/books/philosophy/On_the_Principles_of_Political_Economy_and_Taxation.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 70,
			category: 'philosophy',
			coverUrl: '/books/philosophy/Early_Greek_Philosophy.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 71,
			category: 'philosophy',
			coverUrl: '/books/philosophy/The_Black_Swan.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 72,
			category: 'philosophy',
			coverUrl: '/books/philosophy/The_Enchiridion_Discourses.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 73,
			category: 'philosophy',
			coverUrl: '/books/philosophy/The_Theory_of_Moral_Sentiments.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 74,
			category: 'philosophy',
			coverUrl: '/books/philosophy/The_Big_Questions_of_Philosophy.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 75,
			category: 'philosophy',
			coverUrl: '/books/philosophy/The_Great_Ideas_of_Philosophy.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 76,
			category: 'philosophy',
			coverUrl:
				'/books/philosophy/Consciousness_and_Its_Implications.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 77,
			category: 'philosophy',
			coverUrl: '/books/philosophy/The_Hero_with_a_Thousand_Faces.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
	];

	const historyBooks = [
		{
			id: 78,
			category: 'history',
			coverUrl: '/books/history/Reminiscences_of_a_Stock_Operator.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 79,
			category: 'history',
			coverUrl: '/books/history/Flash_Boys.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 80,
			category: 'history',
			coverUrl: '/books/history/The_Undoing_Project.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 81,
			category: 'history',
			coverUrl: '/books/history/The_Attention_Merchants.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 82,
			category: 'history',
			coverUrl: '/books/history/Steve_Jobs.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 83,
			category: 'history',
			coverUrl: '/books/history/No_Rules_Rules.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 84,
			category: 'history',
			coverUrl: '/books/history/That_Will_Never_Work.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 85,
			category: 'history',
			coverUrl: '/books/history/How_Music_Got_Free.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 86,
			category: 'history',
			coverUrl: '/books/history/The_Everything_Store.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 87,
			category: 'history',
			coverUrl: '/books/history/The_Innovators.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 88,
			category: 'history',
			coverUrl: '/books/history/The_Copyright_Wars.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 89,
			category: 'history',
			coverUrl: '/books/history/The_Upstarts.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 90,
			category: 'history',
			coverUrl: '/books/history/The_Rise_of_Communism.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 91,
			category: 'history',
			coverUrl: '/books/history/Trillion_Dollar_Coach.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 92,
			category: 'history',
			coverUrl: '/books/history/America_After_the_Cold_War.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 93,
			category: 'history',
			coverUrl:
				'/books/history/The_Rise_and_Fall_of_Soviet_Communism.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 94,
			category: 'history',
			coverUrl: '/books/history/Zero_to_One.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 95,
			category: 'history',
			coverUrl: '/books/history/Democracy_of_Sound.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 96,
			category: 'history',
			coverUrl: '/books/history/The_Art_of_War.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 97,
			category: 'history',
			coverUrl: '/books/history/The_33_Strategies_of_War.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 98,
			category: 'history',
			coverUrl: '/books/history/Amazon_Unbound.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 99,
			category: 'history',
			coverUrl: '/books/history/The_Coddling_of_the_American_Mind.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 100,
			category: 'history',
			coverUrl: '/books/history/Mind_Fixers.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 101,
			category: 'history',
			coverUrl: '/books/history/Mastery.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 102,
			category: 'history',
			coverUrl: '/books/history/The_Iliad_of_Homer.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 103,
			category: 'history',
			coverUrl: '/books/history/The_Odyssey_of_Homer.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 104,
			category: 'history',
			coverUrl: '/books/history/When_the_Heavens_Went_on_Sale.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 105,
			category: 'history',
			coverUrl: '/books/history/The_Entrepreneurs_of_Silicon_Valley.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
	];

	const scienceBooks = [
		{
			id: 106,
			category: 'science',
			coverUrl: '/books/science/What_Algorithms_Want.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 107,
			category: 'science',
			coverUrl: '/books/science/Understanding_Complexity.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 108,
			category: 'science',
			coverUrl: '/books/science/Philosophy_of_Science.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 109,
			category: 'science',
			coverUrl: '/books/science/What_Einstein_Got_Wrong.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 110,
			category: 'science',
			coverUrl: '/books/science/What_Darwin_Didnt_Know.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 111,
			category: 'science',
			coverUrl: '/books/science/The_Science_of_Sci-Fi.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 112,
			category: 'science',
			coverUrl: '/books/science/Being_Human.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 113,
			category: 'science',
			coverUrl: '/books/science/The_Chaos_Imperative.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 114,
			category: 'science',
			coverUrl: '/books/science/Redefining_Reality.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 115,
			category: 'science',
			coverUrl: '/books/science/The_Addictive_Brain.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 116,
			category: 'science',
			coverUrl: '/books/science/How_to_Measure_Anything.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 117,
			category: 'science',
			coverUrl: '/books/science/The_Big_Questions_of_Neuroscience.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 118,
			category: 'science',
			coverUrl: '/books/science/Fooled_by_Randomness.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 119,
			category: 'science',
			coverUrl: '/books/science/Why_Is_Sex_Fun?.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 120,
			category: 'science',
			coverUrl: '/books/science/Antifragile.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 121,
			category: 'science',
			coverUrl: '/books/science/The_Soul_of_Science.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 122,
			category: 'science',
			coverUrl:
				'/books/science/The_Great_Questions_of_Philosophy_and_Physics.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 123,
			category: 'science',
			coverUrl: '/books/science/Zero.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 124,
			category: 'science',
			coverUrl: '/books/science/Science_Friction.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 125,
			category: 'science',
			coverUrl:
				'/books/science/A_Philosophical_Essay_on_Probabilities.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 126,
			category: 'science',
			coverUrl: '/books/science/The_Great_Mental_Models_3.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 127,
			category: 'science',
			coverUrl: '/books/science/The_Great_Mental_Models_2.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 128,
			category: 'science',
			coverUrl: '/books/science/The_Great_Mental_Models_4.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 129,
			category: 'science',
			coverUrl: '/books/science/The_Great_Mental_Models_1.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 130,
			category: 'science',
			coverUrl: '/books/science/Understanding_Economics.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 131,
			category: 'science',
			coverUrl: '/books/science/The_Theory_That_Would_Not_Die.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
	];

	const englishWritingBooks = [
		{
			id: 132,
			category: 'english-writing',
			coverUrl: '/books/english-writing/The_Lost_Art_of_Listening.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 133,
			category: 'english-writing',
			coverUrl:
				'/books/english-writing/The_Checklist_Manifesto_Audiobook_By_Atul_Gawande_cover_art_Sample_The_Checklist_Manifesto.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 134,
			category: 'english-writing',
			coverUrl: '/books/english-writing/Louder_Than_Words.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 135,
			category: 'english-writing',
			coverUrl: '/books/english-writing/Scrum.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 136,
			category: 'english-writing',
			coverUrl:
				'/books/english-writing/How_to_Have_Impossible_Conversations.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 137,
			category: 'english-writing',
			coverUrl:
				'/books/english-writing/Effective_Communication_Skills.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 138,
			category: 'english-writing',
			coverUrl:
				'/books/english-writing/Effective_Research_Methods_for_Any_Project.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 139,
			category: 'english-writing',
			coverUrl: '/books/english-writing/How_Conversation_Works.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 140,
			category: 'english-writing',
			coverUrl: '/books/english-writing/Do_the_Work.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 141,
			category: 'english-writing',
			coverUrl:
				'/books/english-writing/Myths_Lies_and_Half-Truths_of_Language_Usage.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 142,
			category: 'english-writing',
			coverUrl: '/books/english-writing/Fighting_Misinformation.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 143,
			category: 'english-writing',
			coverUrl:
				'/books/english-writing/Negotiating_the_Nonnegotiable.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 144,
			category: 'english-writing',
			coverUrl: '/books/english-writing/Language_A_to_Z.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 145,
			category: 'english-writing',
			coverUrl: '/books/english-writing/Language_and_the_Mind.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 146,
			category: 'english-writing',
			coverUrl:
				'/books/english-writing/Business_Law_Negligence_and_Torts.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 147,
			category: 'english-writing',
			coverUrl: '/books/english-writing/Business_Law_Contracts.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 148,
			category: 'english-writing',
			coverUrl:
				'/books/english-writing/Nobody_Wants_to_Read_Your_Sh*t.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
		{
			id: 149,
			category: 'english-writing',
			coverUrl: '/books/english-writing/What_the_F.jpg',
			pageUrl:
				'https://www.goodreads.com/book/show/9721527-the-psychedelic-explorer-s-guide',
		},
	];

	const allBooks = [
		...psychologyBooks,
		...philosophyBooks,
		...historyBooks,
		...scienceBooks,
		...englishWritingBooks,
	];

	// Handle category filtering
	const { category } = req.query;

	if (category === 'psychology') {
		return res.status(200).json({
			total: psychologyBooks.length,
			results: psychologyBooks,
		});
	}

	if (category === 'philosophy') {
		return res.status(200).json({
			total: philosophyBooks.length,
			results: philosophyBooks,
		});
	}

	if (category === 'history') {
		return res.status(200).json({
			total: historyBooks.length,
			results: historyBooks,
		});
	}

	if (category === 'science') {
		return res.status(200).json({
			total: scienceBooks.length,
			results: scienceBooks,
		});
	}

	if (category === 'english-writing') {
		return res.status(200).json({
			total: englishWritingBooks.length,
			results: englishWritingBooks,
		});
	}

	// You can find a specific book by slug if needed
	if (req.query.slug) {
		const book = allBooks.find((b) => b.slug === req.query.slug);
		return res.status(200).json(book || null);
	}

	// Return all books with total count
	res.status(200).json({
		total: allBooks.length,
		results: allBooks,
	});
}
