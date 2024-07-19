import { DateTime } from 'luxon';
import { JsonType, Thumbnails } from './jsonTypes';

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
		.then(({ items }: JsonType) =>
			!(items && items.length > 0)
				? [dummy]
				: items.map((def) => ({
						id: def.id.videoId,
						publishedAt: DateTime.fromISO(def.snippet.publishedAt).toMillis(),
						title: def.snippet.title,
						description: def.snippet.description,
						thumbnails: def.snippet.thumbnails,
						tags: def.tags && def.tags.length > 0 ? [...def.tags] : ['no tags'],
				  }))
		)
		.catch((e) => [{ ...dummy, description: e }]);
