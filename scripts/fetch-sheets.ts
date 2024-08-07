/*
curl https://sheets.googleapis.com/v4/spreadsheets/1aGNBpMi2K-q_JLGTTynAOM-EAHX6FMh3-alCPCu_2F8/values/%E5%8B%95%E7%94%BB%E4%B8%80%E8%A6%A7?key=AIzaSyATv3vggAfDC2NUU4fTB1m2FSoTqq_Zl54 -o work/videos.json
curl https://sheets.googleapis.com/v4/spreadsheets/1aGNBpMi2K-q_JLGTTynAOM-EAHX6FMh3-alCPCu_2F8/values/%E5%AE%9F%E6%B3%81%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA%E4%B8%80%E8%A6%A7?key=AIzaSyATv3vggAfDC2NUU4fTB1m2FSoTqq_Zl54 -o work/live-series.json
curl https://sheets.googleapis.com/v4/spreadsheets/1aGNBpMi2K-q_JLGTTynAOM-EAHX6FMh3-alCPCu_2F8/values/%E5%AE%9F%E6%B3%81%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA%E4%B8%80%E8%A6%A7?key=AIzaSyATv3vggAfDC2NUU4fTB1m2FSoTqq_Zl54 -o work/live-series.json
*/

import { writeFile } from 'fs/promises';

import { from } from 'rxjs';
import { retry } from 'rxjs/operators';

import '~/util/scoped';
import path from 'path';
import { GameDef, LiveDef, LiveSeriesDef } from '~/features/videos/core/types';
import { convertLiveStyleFromLabel } from '~/features/videos/core/types/utils';

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
		.map(
			({
				no: _no,
				liveTitle: _liveTitle,
				publishedIn: _publishedIn,
				publishedAt: _publishedAt,
				liveStyle,
				...rest
			}) => ({
				...rest,
				liveStyle: convertLiveStyleFromLabel(liveStyle),
			})
		);
}

function constructLiveSeries(liveSeries: Sheet) {
	return liveSeries.values
		.slice(1)
		.map(
			([
				no,
				id,
				seriesTitle,
				gameTitle,
				remarks,
				lives,
				publishedFrom,
				...tags
			]) => ({
				no,
				id,
				seriesTitle,
				remarks,
				gameTitle: gameTitle ?? null,
				lives,
				publishedFrom,
				tags: (tags ?? [])?.takeWhile((tag) => !!tag),
			})
		)
		.filter((record) => {
			const { id } = record;
			if (id === '読み込んでいます...') {
				throw Error('ID読込中。要リロード / ' + JSON.stringify(record));
			}
			return !!id;
		})
		.map(
			({ no: _no, lives: _lives, publishedFrom: _publishedFrom, ...rest }) => ({
				...rest,
			})
		);
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
		.filter((record) => {
			const { id } = record;
			if (id in ['読み込んでいます...', '#NAME?']) {
				throw Error('ID読込中。要リロード / ' + JSON.stringify(record));
			}
			return !!id;
		})
		.map(
			({ no: _no, lives: _lives, releasedIn, masteryLevel, ...rest }) =>
				({
					...rest,
					releasedIn: ((x, o) => (Number.isSafeInteger(x) ? x : o))(
						Number.parseInt(releasedIn, 10),
						releasedIn
					),
					masteryLevel: (masteryLevel.match(/★/g) || []).length,
				}) as GameDef
		);
}

function linkIds(
	livesLoaded: ReturnType<typeof constructLives>,
	liveSeriesLoaded: ReturnType<typeof constructLiveSeries>,
	gamesLoaded: ReturnType<typeof constructGameTitles>
) {
	const gamesMap = gamesLoaded
		.map((e) => [e.gameTitle, e] as const)
		.let((xs) => new Map(xs));
	const liveSeriesMap = liveSeriesLoaded
		.map((e) => [e.seriesTitle, e] as const)
		.let((xs) => new Map(xs));

	const games: GameDef[] = gamesLoaded;
	const liveSeries: LiveSeriesDef[] = liveSeriesLoaded.map(
		({ gameTitle, ...rest }) => ({
			...rest,
			gameId:
				!!gameTitle && gamesMap.has(gameTitle)
					? (gamesMap.get(gameTitle)?.id ?? null)
					: null,
		})
	);

	const lives: LiveDef[] = livesLoaded.map(({ liveSeriesTitle, ...rest }) => ({
		...rest,
		liveSeriesId:
			!!liveSeriesTitle && liveSeriesMap.has(liveSeriesTitle)
				? (liveSeriesMap.get(liveSeriesTitle)?.id ?? null)
				: null,
	}));

	return {
		lives,
		liveSeries,
		games,
	} as const;
}

async function write(data: Record<string, unknown>) {
	await Object.entries(data)
		.map(async ([name, items]) => {
			const filepath = path.resolve(outputDir, `${name}.json`);
			await writeFile(filepath, JSON.stringify({ items }));
			console.info(`${filepath} written.`);
		})
		.let((xs) => Promise.all(xs));
}

async function main() {
	const sheets = await fetchSheets();

	const livesLoaded = constructLives(sheets.lives);
	const liveSeriesLoaded = constructLiveSeries(sheets.liveSeries);
	const gamesLoaded = constructGameTitles(sheets.games);

	const { lives, liveSeries, games } = linkIds(
		livesLoaded,
		liveSeriesLoaded,
		gamesLoaded
	);

	await write({ lives, liveSeries, games });
}

from(main())
	.pipe(retry(3))
	.subscribe({
		error: (e) => {
			console.error(e);
		},
		complete: () => {
			console.info('done');
		},
	});
