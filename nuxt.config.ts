// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	build: { transpile: ["trpc-nuxt"] },
	devtools: { enabled: true },
	modules: ["@nuxtjs/tailwindcss", '@nuxtjs/color-mode', "@pinia/nuxt"],
	colorMode: {
		preference: "system", // default theme
		dataValue: "theme", // activate data-theme in <html> tag
		classSuffix: "",
	},
});