
import {defineConfig} from 'vitest/config'
import paths from 'vite-tsconfig-paths'

export default defineConfig({
	test: {
		include: ['**/*.unit.ts', '**/*.unit.tsx'],
		environment: 'jsdom',
		globals: true,
		root: './',
		setupFiles: ['./src/setupTests.ts'],
	},
	plugins: [
		paths(),
	],

})
