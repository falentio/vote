const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ["class"],
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		require('path').join(
			require.resolve('@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	theme: {
		extend: {
			fontFamily: {
				"dm-sans": ['DM Sans', ...fontFamily.serif]
			}
		}
	},
	plugins: [
		...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()
	]
};

export default config;
