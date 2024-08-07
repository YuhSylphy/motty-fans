import { LiveStyle } from './liveStyles';
import { VideoTagUnion } from './tags';

export type YouTubeId = {
	kind: 'youtube#video';
	videoId: string;
};

export type Resolution = 'default' | 'medium' | 'high';

export type Thumbnail = {
	url: string;
	width: number;
	height: number;
};

export type Thumbnails = {
	[key in Resolution]: Thumbnail;
};

export type YouTubeSnippet = {
	publishedAt: string;
	channelId: string;
	title: string;
	description: string;
	thumbnails: Thumbnails;
	channelTitle: string;
	liveBroadcastContent: string;
	publishTime: string;
};

export type JsonVideoDef = {
	kind: 'youtube#searchResult';
	etag: string;
	id: YouTubeId;
	snippet: YouTubeSnippet;
	tags?: VideoTagUnion[];
	'tags.bak'?: string[];
	liveSeriesId: string | null;
	liveStyle: LiveStyle | null;
};

export type VideosJson = {
	items: JsonVideoDef[];
};
