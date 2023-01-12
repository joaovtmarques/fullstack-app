/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./pages/js,jsx,ts,tsx}',
		'./src/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		fontFamily: {
			sans: ['Poppins', 'sans-serif'],
		},
		extend: {
			backgroundImage: {
				gradient:
					'linear-gradient(18.66deg, #6E28E050 6.55%, #EB2F9350 98.12%)',
				'gradient/20':
					'linear-gradient(18.66deg, #6E28E020 6.55%, #EB2F9320 98.12%)',
				border: 'linear-gradient(18.66deg, #6E28E0 6.55%, #EB2F93 98.12%)',
			},
			boxShadow: {
				button: '0px 0px 55px rgba(113, 45, 224, 0.45)',
			},
		},
		colors: {
			brandPurple: '#712DE0',
			brandPink: '#EB2F93',
			white: '#FFFFFF',
			white2: '#FFFFFF50',
			gray1: '#B3B0B8',
			gray2: '#7C7A80',
			black0: '#000000',
			black1: '#101114',
			black2: '#1E1F24',
			black3: '#2B2C33',
			black4: '#454652',
		},
	},
	plugins: [],
};
