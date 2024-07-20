import { JsonVideoDef, VideosJson } from 'src/features/videos/core/jsonTypes';
import { GameDef, GamesJson, LiveSeriesDef, LiveSeriesJson } from './jsonTypes';

const videosJson = `${process.env.PUBLIC_URL}/assets/videos/videos.json`;
const liveSeriesJson = `${process.env.PUBLIC_URL}/assets/live-series/liveSeries.json`;
const gamesJson = `${process.env.PUBLIC_URL}/assets/live-series/games.json`;

export async function fetchVideosJson(): Promise<VideosJson> {
	const res = await fetch(videosJson);
	const ret = await res.json();
	return ret;
}

export async function fetchLiveSeriesJson(): Promise<LiveSeriesJson> {
	const res = await fetch(liveSeriesJson);
	const ret = await res.json();
	return ret;
}

export async function fetchGamesJson(): Promise<GamesJson> {
	const res = await fetch(gamesJson);
	const ret = await res.json();
	return ret;
}

export type LiveSeries = LiveSeriesDef & {
	lives: JsonVideoDef[];
	game: GameDef | null;
};

export async function fetchLiveSeries(): Promise<LiveSeries[]> {
	const [videosMap, liveSeries, gamesMap] = await Promise.all([
		(async () => {
			// FIXME: JSONのままだと日付の処理とかが面倒なので、使う要素だけ変換しつつ抜き出す
			const videosJson = await fetchVideosJson();
			return Object.groupBy(
				videosJson.items.filter(({ liveSeriesId }) => liveSeriesId != null),
				({ liveSeriesId }: JsonVideoDef) => liveSeriesId ?? ''
			);
		})(),
		(async () => {
			const liveSeriesJson = await fetchLiveSeriesJson();
			return liveSeriesJson.items;
		})(),
		(async () => {
			const gamesJson = await fetchGamesJson();
			return new Map(gamesJson.items.map((x) => [x.id, x] as const));
		})(),
	] as const);

	return liveSeries.map((x) => ({
		...x,
		lives: x.id in videosMap ? (videosMap[x.id] ?? []) : [],
		game:
			x.gameId && gamesMap.has(x.gameId)
				? (gamesMap.get(x.gameId) ?? null)
				: null,
	}));
}
