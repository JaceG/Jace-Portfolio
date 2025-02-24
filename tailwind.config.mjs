/** @type {import('tailwindcss').Config} */
const config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			spacing: {
				section: '100px',
			},
			colors: {
				primary: '#39BD6D',
				secondary: '#fff',
				tertiary: '#4c4d50',
			},
			screens: {
				'3xl': '1572px',
			},
		},
	},
	plugins: [],
};

export default config;
