import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';

import tsPlugin from 'typescript-eslint';

import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';

// import airbnb from 'eslint-config-airbnb';
// import airbnbHooks from 'eslint-config-airbnb/hooks';
// import airbnbTypescript from 'eslint-config-airbnb-typescript';

// import importPlugin from "eslint-plugin-import";
import prettier from 'eslint-plugin-prettier';

import path from 'path';
import { fileURLToPath } from 'url';
import globals from 'globals';

// console.info(importPlugin);
// console.info(tsPlugin.configs?.recommended);

const project = './tsconfig.json';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: tsPlugin.configs.recommended,
});

/**
 * @param {string} name the pugin name
 * @param {string} alias the plugin alias
 * @returns {import("eslint").ESLint.Plugin}
 */
function legacyPlugin(name, alias = name) {
	const plugin = compat.plugins(name)[0]?.plugins?.[alias];

	if (!plugin) {
		throw new Error(`Unable to resolve plugin ${name} and/or alias ${alias}`);
	}

	return fixupPluginRules(plugin);
}

const baseConf = {
	files: ['**/*.{js,ts,mjs,mts,cjs,cts,jsx,tsx}'],
	ignores: [
		'**/dist/**',
		'**/build/**',
		'**/node_modules/**',
		'.config/*',
		'*',
		'**/react-app-env.d.ts',
		'**/serviceWorker.ts',
	],
	languageOptions: {
		globals: {
			...globals.browser,
		},
		parser: tsPlugin.parser,
		parserOptions: {
			parser: tsPlugin.parser,
			ecmaVersion: 'latest',
			sourceType: 'module',
			project: ['./tsconfig.json'],
		},
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};

export default [
	...tsPlugin.configs.recommended.map((conf) => ({
		...baseConf,
		...conf,
	})),
	{
		...baseConf,
		plugins: {
			react: reactPlugin,
			'react-hooks': hooksPlugin,
			// airbnb,
			// airbnbHooks,
			// airbnbTypescript,
			prettier,
			// import: importPlugin,
		},
		rules: {
			// ...tsPlugin.configs.recommended.rules,
			...reactPlugin.configs.recommended.rules,
			...hooksPlugin.configs.recommended.rules,
			// ...airbnb.rules,
			// ...airbnbHooks.rules,
			// ...airbnbTypescript.rules,
			...prettier.configs?.recommended?.rules,
			// ...importPlugin.configs.recommended.rules,
			...{
				'@typescript-eslint/no-unused-vars': [
					'error',
					{
						// _始まりの変数は未使用でも無視
						argsIgnorePattern: '^_',
						varsIgnorePattern: '^_',
						caughtErrorsIgnorePattern: '^_',
						destructuredArrayIgnorePattern: '^_',
					},
				],
				'no-warning-comments': [
					'warn',
					{
						// キーワード入りコメントを警告に出す
						terms: ['todo', 'fixme', 'xxx'],
						location: 'anywhere',
					},
				],
			},
		},
	},
	{
		...baseConf,
		settings: {
			'import/resolver': {
				typescript: {
					alwaysTryTypes: true,
					project,
				},
			},
		},
		plugins: {
			import: legacyPlugin('eslint-plugin-import', 'import'),
			// ...rest of plugins
		},
		rules: {
			// your rules here....
		},
	},
];
