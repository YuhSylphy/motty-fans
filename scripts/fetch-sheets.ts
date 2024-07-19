/*
curl https://sheets.googleapis.com/v4/spreadsheets/1aGNBpMi2K-q_JLGTTynAOM-EAHX6FMh3-alCPCu_2F8/values/%E5%8B%95%E7%94%BB%E4%B8%80%E8%A6%A7?key=AIzaSyATv3vggAfDC2NUU4fTB1m2FSoTqq_Zl54 -o work/videos.json
curl https://sheets.googleapis.com/v4/spreadsheets/1aGNBpMi2K-q_JLGTTynAOM-EAHX6FMh3-alCPCu_2F8/values/%E5%AE%9F%E6%B3%81%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA%E4%B8%80%E8%A6%A7?key=AIzaSyATv3vggAfDC2NUU4fTB1m2FSoTqq_Zl54 -o work/live-series.json
curl https://sheets.googleapis.com/v4/spreadsheets/1aGNBpMi2K-q_JLGTTynAOM-EAHX6FMh3-alCPCu_2F8/values/%E5%AE%9F%E6%B3%81%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA%E4%B8%80%E8%A6%A7?key=AIzaSyATv3vggAfDC2NUU4fTB1m2FSoTqq_Zl54 -o work/live-series.json
*/

import { writeFile } from 'fs/promises';

import './libs/scoped';
import path from 'path';

const outputDir = './public/assets/live-series/';

const endpoint = 'https://sheets.googleapis.com/v4/spreadsheets';
const bookId = '1aGNBpMi2K-q_JLGTTynAOM-EAHX6FMh3-alCPCu_2F8';

const sheetNames = {
	lives: '実況一覧',
	liveSeries: '実況シリーズ一覧',
	games: 'ゲームタイトル一覧',
} as const;

type Sheets = {
	[K in keyof typeof sheetNames]: Sheet;
};

interface Sheet {
	range: string;
	majorDimension: string;
	values: string[][];
}

const apiKey =
	process.env.GOOGLE_API_KEY ??
	(() => {
		throw Error(`API KEY NOT FOUND ${process.env.GOOGLE_API_KEY}`);
	})();

async function fetchSheets() {
	return (
		await Object.entries(sheetNames)
			.map(async ([key, value]) => {
				const encoded = encodeURIComponent(value);
				const url = `${endpoint}/${bookId}/values/${encoded}?${new URLSearchParams(
					{
						key: apiKey,
					}
				)}`;

				const response = await fetch(url);
				if (response.ok) {
					const result = await response.json();

					return [key, result] as const;
				} else {
					throw response;
				}
			})
			.let((xs) => Promise.all(xs))
	).let((entries) => Object.fromEntries(entries) as Sheets);
}

function constructLives(lives: Sheet) {
	return lives.values
		.slice(1)
		.map(
			([
				no,
				id,
				publishedAt,
				liveTitle,
				publishedIn,
				liveStyle,
				liveSeriesTitle,
				...tags
			]) => ({
				no,
				id,
				publishedAt,
				liveTitle: liveTitle ?? null,
				publishedIn,
				liveStyle: liveStyle ?? null,
				liveSeriesTitle: liveSeriesTitle ?? null,
				tags: (tags ?? [])?.takeWhile((tag) => !!tag),
			})
		)
		.filter(({ id }) => !!id)
		.map(({ no, publishedIn, publishedAt, ...rest }) => ({
			...rest,
		}));
}

function constructLiveSeries(liveSeries: Sheet) {
	return liveSeries.values
		.slice(1)
		.map(([no, id, seriesTitle, gameTitle, lives, publishedFrom, ...tags]) => ({
			no,
			id,
			seriesTitle,
			gameTitle,
			lives,
			publishedFrom,
			tags: (tags ?? [])?.takeWhile((tag) => !!tag),
		}))
		.filter(({ id }) => !!id)
		.map(({ no, lives, publishedFrom, ...rest }) => ({
			...rest,
		}));
}

function constructGameTitles(games: Sheet) {
	return games.values
		.slice(1)
		.map(
			([
				no,
				id,
				gameTitle,
				platform,
				releasedIn,
				masteryLevel,
				lives,
				...tags
			]) => ({
				no,
				id,
				gameTitle,
				platform: platform ?? null,
				releasedIn: releasedIn ?? null,
				masteryLevel: masteryLevel ?? '',
				lives,
				tags: (tags ?? [])?.takeWhile((tag) => !!tag),
			})
		)
		.filter(({ id }) => !!id)
		.map(({ no, releasedIn, masteryLevel, lives, ...rest }) => ({
			...rest,
			releasedIn: ((x, o) => (Number.isSafeInteger(x) ? x : o))(
				Number.parseInt(releasedIn, 10),
				releasedIn
			),
			masteryLevel: (masteryLevel.match(/★/g) || []).length,
		}));
}

async function write(data: Record<string, unknown>) {
	await Object.entries(data)
		.map(async ([key, value]) => {
			const filepath = path.resolve(outputDir, `${key}.json`);
			await writeFile(filepath, JSON.stringify(value));
			console.info(`${filepath} written.`);
		})
		.let((xs) => Promise.all(xs));
}

async function main() {
	const sheets = await fetchSheets();

	const lives = constructLives(sheets.lives);
	const liveSeries = constructLiveSeries(sheets.liveSeries);
	const games = constructGameTitles(sheets.games);

	await write({ lives, liveSeries, games });

	console.info('lives: ', lives.slice(-3));
}

main()
	.catch((e) => {
		console.error(e);
	})
	.finally(() => {
		console.info('done');
	});
