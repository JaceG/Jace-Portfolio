export default function handler(req, res) {
	const projects = [
		{
			slug: 'random-movie-generator',
			title: 'Random Movie Generator',
			snippet:
				'A Random Movie Generator that allows users to discover movies tailored to their preferences.',
			description:
				'The "Pick Flick" app is an innovative Random Movie Generator designed to enhance the movie discovery experience for users. By allowing users to select their preferred genres, specify a year range, set runtime preferences, and choose a language, the app tailors movie suggestions to individual tastes. This personalized approach ensures that users can find movies that align with their specific interests, making the process of selecting a movie both enjoyable and efficient. The app\'s user-friendly interface, combined with its robust filtering options, provides a seamless experience for movie enthusiasts looking to explore new films.<br><br>In addition to its core functionality, "Pick Flick" incorporates user authentication features, enabling users to register and log in securely. Once logged in, users can generate movie suggestions based on their inputs and view detailed information about the recommended movies, such as titles, synopses, streaming services, and cast members. This feature not only enhances the user experience by providing comprehensive movie details but also allows users to save and manage their movie preferences. The app\'s integration with streaming services ensures that users can easily access the movies they are interested in, further streamlining the movie-watching process.<br><br>The app\'s design is responsive and adapts to different devices, ensuring a consistent user experience across platforms. With a focus on both light and dark modes, "Pick Flick" caters to user preferences and enhances readability in various lighting conditions. The app\'s backend is powered by a robust server setup, utilizing modern technologies to handle user requests efficiently. By leveraging APIs to fetch movie data, the app provides up-to-date information and a dynamic user experience. Overall, "Pick Flick" is a comprehensive tool for movie lovers, offering a personalized and engaging way to discover and enjoy films.',
			image: 'https://github.com/JaceG/Pick-Flick/raw/main/assets/img/homepage.png',
			link: 'https://github.com/JaceG/Pick-Flick',
			source: 'https://pickflick.app',
		},
		{
			slug: 'showfinder',
			title: 'ShowFinder',
			snippet:
				'An app that allows users to discover live shows in their area.',
			description:
				'ShowFinder is a comprehensive web application designed to help users discover local music events and concerts in their area. The application integrates multiple APIs to provide users with detailed event information, including music previews, weather forecasts, and venue details. Users can search for events by city, filter by genre, and sort by date, making it a versatile tool for music enthusiasts. The application also offers user authentication, allowing users to save their favorite events for easy access later. With a responsive design, ShowFinder ensures a seamless experience across different devices.<br><br>The tech stack for ShowFinder is robust and modern, utilizing both frontend and backend technologies. The frontend is built with React.js, leveraging Material-UI for a sleek and responsive user interface. React Router is used for efficient client-side routing, ensuring smooth navigation throughout the application. The backend is powered by Node.js and Express, providing a solid foundation for handling API requests and managing data. MongoDB is used as the database, offering a flexible and scalable solution for storing user and event data. The application also integrates several APIs, including Ticketmaster, Spotify, OpenWeather, and Google Maps, to enrich the user experience with real-time data and interactive features.<br><br>One of the challenging aspects of developing ShowFinder was integrating multiple APIs and ensuring seamless data flow between the frontend and backend. Handling asynchronous operations and managing state in React required careful planning and implementation. Additionally, implementing user authentication and authorization was a critical component, involving secure handling of JWT tokens and user data. The application also needed to handle various edge cases, such as API rate limits and network errors, to provide a robust and reliable user experience.<br><br>Overall, ShowFinder showcases my ability to design and develop a full-stack application from scratch, utilizing a wide range of technologies and tools. The project highlights my skills in frontend development with React, backend development with Node.js and Express, and database management with MongoDB. It also demonstrates my proficiency in integrating third-party APIs and handling complex data interactions. This project not only reflects my technical capabilities but also my problem-solving skills and attention to detail in delivering a high-quality product.',
			image: 'https://github.com/JaceG/ShowFinder/raw/main/assets/homepage.png',
			link: 'https://github.com/JaceG/ShowFinder',
			source: 'https://showfinder-mnz5.onrender.com',
		},
		{
			slug: 'book-search-engine',
			title: 'Book Search Engine',
			snippet:
				'A MERN stack app that lets users search and save books from Google Books API.',
			description:
				'This Book Search Engine is a full-stack application that enables users to search for books using the Google Books API and maintain a personalized reading list. Users can create accounts, search for books by title or author, view detailed book information including cover images and descriptions, and save their favorite books to their profile. The application provides a seamless user experience with a clean, intuitive interface that allows users to manage their saved books collection efficiently through a secure authentication system.<br><br>The application is built using the MERN stack (MongoDB, Express.js, React, Node.js) with TypeScript for enhanced type safety and code reliability. It leverages GraphQL with Apollo Server/Client for efficient data fetching and state management, replacing the traditional RESTful API architecture. The frontend is bootstrapped with Vite for optimal development experience and build performance, while utilizing React Bootstrap for responsive design components. JWT (JSON Web Token) authentication secures user sessions and protected routes. The application integrates with the Google Books API for comprehensive book data and MongoDB Atlas for persistent data storage, with the backend deployed on Render for reliable cloud hosting.',
			image: 'https://github.com/JaceG/Book-Search-Engine/raw/main/client/public/Book-Search-Engine-Screenshot.jpg',
			link: 'https://github.com/JaceG/Book-Search-Engine',
			source: 'https://book-search-engine-ejds.onrender.com',
		},
		{
			slug: 'weather-dashboard',
			title: 'Weather Dashboard',
			snippet:
				'A weather dashboard that lets users search for weather by city and a 5-day forecast.',
			description:
				'"The Weather Dashboard is a dynamic web application that provides users with real-time weather information and forecasting capabilities. Users can search for any city worldwide to view current weather conditions including temperature, wind speed, and humidity, along with a 5-day forecast. The application features a clean, intuitive interface with weather icons for visual representation and maintains a searchable history of previously viewed cities. Each city in the search history can be quickly accessed again or removed as needed, making it efficient for users to track multiple locations.<br><br>Built with TypeScript and Express, the Weather Dashboard implements a modern tech stack with a clear separation between frontend and backend services. The frontend utilizes Vite for build optimization and employs a responsive design system for seamless viewing across all devices. The backend integrates with the OpenWeather API to fetch accurate weather data and implements a RESTful API architecture for handling weather queries and search history management. The application uses a file-based storage system for maintaining search history and implements error handling for invalid city names or API failures. The project is deployed on Render and follows TypeScript\'s strict type checking for enhanced code reliability and maintainability."',
			image: 'https://github.com/JaceG/Weather-Dashboard/raw/main/Assets/Screenshot.png',
			link: 'https://github.com/JaceG/Weather-Dashboard',
			source: 'https://weather-dashboard-g7bd.onrender.com',
		},
		{
			slug: 'piano-player',
			title: 'Piano Player',
			snippet:
				'A virtual piano that allows users to create and playback musical sequences directly in their web browser.',
			description:
				"The Piano Player Web App is an interactive virtual piano that allows users to create and playback musical sequences directly in their web browser. This engaging application features a responsive piano interface with both white and black keys spanning multiple octaves (F4 to E6), complete with real-time sound synthesis and visual feedback. Users can click piano keys to play notes, record their sequences, and play them back using an intuitive transport control system. The application also maintains persistence of played notes between sessions, allowing users to return to their previously recorded sequences.<br><br>Built using vanilla JavaScript, HTML5, and CSS3, the application leverages modern web technologies without relying on heavy frameworks. The sound synthesis is powered by Tone.js, a robust Web Audio framework that provides high-quality musical note generation and precise timing control. The styling is enhanced using Tailwind CSS (via CDN) for responsive design and custom CSS for piano key layouts and animations. Data persistence is implemented using the browser's localStorage API, enabling seamless state management between sessions. The application's architecture follows a modular approach with separate files for core functionality (index.js), user data management (userdata.js), and styling (template.css), making it maintainable and scalable.",
			image: '/Piano-Player-Screenshot.png',
			link: 'https://github.com/Apgash/Piano-Project',
			source: 'https://apgash.github.io/Piano-Project/',
		},
		// {
		// 	slug: 'project-6',
		// 	title: 'Project 6',
		// 	snippet: 'Description 6',
		// 	description: 'Description 6',
		// 	image: 'https://via.placeholder.com/150',
		// 	link: 'https://www.google.com',
		// 	source: 'https://www.google.com',
		// },
		// {
		// 	slug: 'project-7',
		// 	title: 'Project 7',
		// 	snippet: 'Description 7',
		// 	description: 'Description 7',
		// 	image: 'https://via.placeholder.com/150',
		// 	link: 'https://www.google.com',
		// 	source: 'https://www.google.com',
		// },
		// {
		// 	slug: 'project-8',
		// 	title: 'Project 8',
		// 	snippet: 'Description 8',
		// 	description: 'Description 8',
		// 	image: 'https://via.placeholder.com/150',
		// 	link: 'https://www.google.com',
		// 	source: 'https://www.google.com',
		// },
		// {
		// 	slug: 'project-9',
		// 	title: 'Project 9',
		// 	snippet: 'Description 9',
		// 	description: 'Description 9',
		// 	image: 'https://via.placeholder.com/150',
		// 	link: 'https://www.google.com',
		// 	source: 'https://www.google.com',
		// },
		// {
		// 	slug: 'project-10',
		// 	title: 'Project 10',
		// 	snippet: 'Description 10',
		// 	description: 'Description 10',
		// 	image: 'https://via.placeholder.com/150',
		// 	link: 'https://www.google.com',
		// 	source: 'https://www.google.com',
		// },
		// {
		// 	slug: 'project-11',
		// 	title: 'Project 11',
		// 	snippet: 'Description 11',
		// 	description: 'Description 11',
		// 	image: 'https://via.placeholder.com/150',
		// 	link: 'https://www.google.com',
		// 	source: 'https://www.google.com',
		// },
		// {
		// 	slug: 'project-12',
		// 	title: 'Project 12',
		// 	snippet: 'Description 12',
		// 	description: 'Description 12',
		// 	image: 'https://via.placeholder.com/150',
		// 	link: 'https://www.google.com',
		// 	source: 'https://www.google.com',
		// },
	];

	// For pagination if needed
	const total = projects.length;
	const page = req.query.page || 1;
	const startIndex = (page - 1) * 3;
	const endIndex = page * 3;
	const results = projects.slice(startIndex, endIndex);

	// You can now easily find a project by slug using Array.find()
	if (req.query.slug) {
		const project = projects.find((p) => p.slug === req.query.slug);
		return res.status(200).json(project || null);
	}

	res.status(200).json({
		total,
		page,
		results,
	});
}
