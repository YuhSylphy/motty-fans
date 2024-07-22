import { DateTime } from 'luxon';
import type { Thumbnails, VideoTag } from '../types';
import { convertTags } from '../types/utils';
import { fetchVideosJson } from './base';

const dummy: VideoDef = {
	id: 'dummy',
	publishedAt: DateTime.fromISO('2014-09-07T00:00:00Z').toMillis(),
	title: 'dummy',
	description: 'no videos fetched',
	thumbnails: {
		default: {
			url: 'dummy',
			width: 120,
			height: 90,
		},
		medium: {
			url: 'dummy',
			width: 320,
			height: 180,
		},
		high: {
			url: 'dummy',
			width: 480,
			height: 360,
		},
	},
	tags: [],
};

export type VideoDef = {
	id: string;
	publishedAt: number;
	title: string;
	description: string;
	thumbnails: Thumbnails;
	tags: VideoTag[]; // TODO: タグを一部色付きに？ どこ由来のタグか仕分ける: WIP(スタイル指定の型だけつけた)
};

// TODO: liveSeries, gamesも取得して情報マージ -> 旧タグを整理
export const fetchVideoDefs = (): Promise<VideoDef[]> =>
	fetchVideosJson()
		.then(({ items }) =>
			!(items && items.length > 0)
				? [dummy]
				: items.map((def) => ({
						id: def.id.videoId,
						publishedAt: DateTime.fromISO(def.snippet.publishedAt).toMillis(),
						title: def.snippet.title,
						description: def.snippet.description,
						thumbnails: def.snippet.thumbnails,
						tags: convertTags(def.tags, def['tags.bak']),
					}))
		)
		.catch((e) => [{ ...dummy, description: e }]);
