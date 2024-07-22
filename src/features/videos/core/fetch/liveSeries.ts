import { DateTime } from 'luxon';
import type {
	GameDef,
	JsonVideoDef,
	LiveSeriesDef,
	LiveStyle,
	Thumbnail,
	VideoTag,
} from '../types';
import { defaultStyledTag } from '../types/utils';
import { fetchGamesJson, fetchLiveSeriesJson, fetchVideosJson } from './base';

export type LiveSeries = LiveSeriesDef & {
	lives: LiveSeriesVideo[];
	game: GameDef | null;
};

export type LiveSeriesVideo = {
	id: string;
	description: string;
	publishedAt: DateTime;
	title: string;
	thumbnail: Thumbnail;
	liveSeriesId: string | null;
	liveStyle: LiveStyle | null;
	tags: VideoTag[];
	url: string;
};

const convertVideoDefFromJson = (
	{
		id: { videoId: id },
		snippet: { description, publishedAt, title, thumbnails },
		liveSeriesId,
		liveStyle,
		tags,
	}: JsonVideoDef,
	_ix: number,
	_array: JsonVideoDef[]
): LiveSeriesVideo => {
	return {
		id,
		description,
		publishedAt: DateTime.fromISO(publishedAt),
		title,
		thumbnail: thumbnails.default,
		liveSeriesId: liveSeriesId,
		liveStyle,
		tags: tags?.map(defaultStyledTag) ?? [],
		url: `https://www.youtube.com/watch?v=${id}`,
	};
};

export async function fetchLiveSeries(): Promise<LiveSeries[]> {
	const [videosMap, liveSeries, gamesMap] = await Promise.all([
		(async () => {
			const videosJson = await fetchVideosJson();
			return Object.groupBy(
				videosJson.items
					.filter(({ liveSeriesId }) => liveSeriesId != null)
					.map(convertVideoDefFromJson),
				({ liveSeriesId }) =>
					liveSeriesId ??
					(() => {
						throw new Error('unexpected video record having no live-series id');
					})()
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
