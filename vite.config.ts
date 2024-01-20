import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'
import {resolve} from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		legacy(),
	],
	resolve: {
		alias: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'@': resolve(__dirname, './src'),
		},
	},
})
