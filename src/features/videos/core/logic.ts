import { DateTime } from 'luxon';

type YouTubeId = {
	kind: 'youtube#video';
	videoId: string;
};

type Resolution = 'default' | 'medium' | 'high';

type Thumbnail = {
	url: string;
	width: number;
	height: number;
};

type Thumbnails = {
	[key in Resolution]: Thumbnail;
};

type YouTubeSnippet = {
	publishedAt: string;
	channelId: string;
	title: string;
	description: string;
	thumbnails: Thumbnails;
	channelTitle: string;
	liveBroadcastContent: string;
	publishTime: string;
};

type JsonVideoDef = {
	kind: 'youtube#searchResult';
	etag: string;
	id: YouTubeId;
	snippet: YouTubeSnippet;
};

type JsonType = {
	items: JsonVideoDef[];
};

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
	tags: string[];
};

export const fetchVideoDefs = (): Promise<VideoDef[]> =>
	fetch(`${process.env.PUBLIC_URL}/assets/videos/videos.json`)
		.then((res) => res.json())
		.then(
			({ items }: JsonType) =>
				!(items && items.length > 0)
					? [dummy]
					: items
							.map((def) => ({
								id: def.id.videoId,
								publishedAt: DateTime.fromISO(
									def.snippet.publishedAt
								).toMillis(),
								title: def.snippet.title,
								description: def.snippet.description,
								thumbnails: def.snippet.thumbnails,
								tags: [],
							}))
							.slice(0, 20) // tentative
		)
		.catch((e) => [{ ...dummy, description: e }]);
