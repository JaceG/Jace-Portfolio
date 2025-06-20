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
			keyframes: {
				// shake: {
				// 	'0%, 100%': { transform: 'translateX(0)' },
				// 	'25%': { transform: 'translateX(-4px)' },
				// 	'75%': { transform: 'translateX(4px)' },
				// },
				flash: {
					'10%, 100%': { opacity: '1' },
					'70%': { opacity: '0' },
				},
			},
			animation: {
				// shake: 'shake 1s ease-in-out 1',
				flash: 'flash 10s ease-in-out',
			},
		},
	},
	plugins: [],
};

export default config;
