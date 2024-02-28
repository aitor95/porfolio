/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				linkedin: "#0a66c2",
				instagram: "#f56040",
				accent: "rgb(var(--color-accent))",
				content: "rgb(var(--color-content) / <alpha-value>)"
			}
		},
	},
	plugins: [],
};
