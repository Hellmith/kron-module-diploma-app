/* eslint-disable @typescript-eslint/ban-ts-comment */
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import environmentPlugin from 'vite-plugin-environment'
// import pugPlugin from 'vite-plugin-pug'
import tsconfigPaths from 'vite-tsconfig-paths'

import vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [
		// pugPlugin(undefined, undefined),
		vue(),
		checker({ typescript: true, vueTsc: true }),
		environmentPlugin('all', { prefix: 'VITE_' }),
		tsconfigPaths()
	],

	css: {
		preprocessorOptions: {
			pug: {
				doctype: 'html'
			}
		}
	},

	cacheDir: '../../node_modules/.vite/client-side',

	server: {
		fs: {
			allow: ['../../node_modules/primeicons', '../../node_modules/primevue']
		},

		port: 3000,
		host: 'localhost'
	},
	preview: {
		port: 5000,
		host: 'localhost'
	},

	define: {
		'import.meta.vitest': undefined
	},

	test: {
		globals: true,

		cache: {
			dir: '../../node_modules/.vitest'
		},

		environment: 'jsdom',

		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}'],
		includeSource: ['src/**/*.{js,mjs,cjs,ts,mts,cts}']
	}
})
