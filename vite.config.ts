import { vitePlugin as remix } from '@remix-run/dev';
import { copyFileSync } from 'fs';
import { join } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const repositoryName = '/motty-fans/';

export default defineConfig({
	base: repositoryName,
	plugins: [
		remix({
			ssr: false,
			basename: repositoryName,
			future: {
				v3_fetcherPersist: true,
				v3_relativeSplatPath: true,
				v3_throwAbortReason: true,
			},
			buildEnd(args) {
				if (!args.viteConfig.isProduction) return;
				const buildPath = args.viteConfig.build.outDir;
				copyFileSync(
					join(buildPath, 'index.html'),
					join(buildPath, '404.html')
				);
			},
		}),
		tsconfigPaths(),
	],
	ssr: {
		noExternal: [
			'react-helmet-async',
			...(process.env.NODE_ENV === 'production' ? [/^@mui\//] : []),
		],
	},
});
