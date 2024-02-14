/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				linkedin: "#0a66c2",
				instagram: "#f56040",
				accent: "#4E4CA8",
			}
		},
	},
	plugins: [],
};
