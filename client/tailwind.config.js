
/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		screens: {
			'sm': '640px',
			'md': '768px',
			'lg': '1026px', // Adjusted lg breakpoint
			'xl': '1280px',
			'2xl': '1536px',
		  },
		  extend: {
			animation: {
			  'slide-in': 'slideIn 0.3s ease-out forwards',
			  'fade-in': 'fadeIn 0.2s ease-out forwards',
			},
			keyframes: {
			  slideIn: {
				'0%': { opacity: '0', transform: 'translateY(20px)' },
				'100%': { opacity: '1', transform: 'translateY(0)' },
			  },
			  fadeIn: {
				'0%': { opacity: '0' },
				'100%': { opacity: '1' },
			  },
			},
			
		  },
		  
		},
	variants: {
		extend: {
			display: ['print'],
		},
	},
}
