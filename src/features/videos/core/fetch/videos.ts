import { DateTime } from 'luxon';
import type { Thumbnails, VideoTag } from '../types';
import { defaultStyledTag } from '../types/utils';
import { fetchGamesJson, fetchLiveSeriesJson, fetchVideosJson } from './base';

export type VideoDef = {
	id: string;
	publishedAt: number;
	title: string;
	description: string;
	thumbnails: Thumbnails;
	// DONE : タグを一部色付きに？ どこ由来のタグか仕分ける: WIP(スタイル指定の型だけつけた)
	// TODO: タグを一部色付きに？ どこ由来のタグか仕分ける: スタイル指定のパターンを新規追加する
	tags: VideoTag[];
};

// TODO: データ整理ができたら旧タグを削除

export async function fetchVideoDefs(): Promise<VideoDef[]> {
	const [noneTag, livesTag, seriesTag, gamesTag] = (
		['none', 'lives', 'series', 'games'] as const
	).map(defaultStyledTag);
	const [videos, liveSeries, games] = await Promise.all([
		(async () => {
			const { items: videos } = await fetchVideosJson();
			return videos && videos.length > 0
				? videos.map(({ liveStyle, ...def }) => ({
						id: def.id.videoId,
						publishedAt: DateTime.fromISO(def.snippet.publishedAt).toMillis(),
						title: def.snippet.title,
						description: def.snippet.description,
						thumbnails: def.snippet.thumbnails,
						liveSeriesId: def.liveSeriesId,
						tags: [
							...(liveStyle ? [noneTag(liveStyle)] : []),
							...(def.tags?.map(livesTag) ?? []),
						],
						'tags.bak': def['tags.bak']?.map(noneTag) ?? [],
					}))
				: [];
		})(),
		(async () => {
			const { items: liveSeries } = await fetchLiveSeriesJson();
			return liveSeries.map(({ id, gameId, seriesTitle, tags }) => ({
				id,
				gameId,
				tags: [seriesTag(seriesTitle), ...tags.map(seriesTag)],
			}));
		})(),
		(async () => {
			const { items: games } = await fetchGamesJson();
			return games.map(({ id, platform, gameTitle, tags }) => ({
				id,
				tags: [
					...(platform ? [gamesTag(platform)] : []),
					gamesTag(gameTitle),
					...tags.map(gamesTag),
				],
			}));
		})(),
	] as const);

	const gameMap = new Map(games.map((e) => [e.id, e] as const));
	const seriesMap = new Map(
		liveSeries.map(
			(e) =>
				[
					e.id,
					{
						...e,
						tags: [
							...e.tags,
							...(!e.gameId ? [] : (gameMap.get(e.gameId)?.tags ?? [])),
						],
					},
				] as const
		)
	);
	const ret: VideoDef[] = videos.map(
		({ ['tags.bak']: bak, tags, liveSeriesId, ...rest }) => ({
			...rest,
			tags: ((xs) => (xs.length > 0 ? xs : [noneTag('no tags')]))(
				[
					...tags,
					...(liveSeriesId ? (seriesMap.get(liveSeriesId)?.tags ?? []) : []),
					...bak,
				].filter(
					({ label: lhs }, ix, array) =>
						// ignores リストに入るものは除外
						!ignores.includes(lhs) &&
						// 重複ラベルは後ろ側を削除
						array.slice(0, ix).find(({ label: rhs }) => lhs == rhs) == null
				)
			),
		})
	);

	return ret;
}

const ignores = ['―', 'live', 'taped'];
