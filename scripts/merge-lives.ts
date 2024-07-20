import { readFile, writeFile } from 'fs/promises';
import path from 'path';

import '../src/util/scoped';

import type { VideosJson } from '../src/features/videos/core/jsonTypes';
import type { LivesJson } from '../src/features/live-series/core/jsonTypes';

const livesPath = './public/assets/live-series/lives.json';
const videosPath = './public/assets/videos/videos.json';

async function loadLives(): Promise<LivesJson> {
	return await load(livesPath);
}

async function loadVideos(): Promise<VideosJson> {
	return await load(videosPath);
}

async function load<R>(targetPath: string): Promise<R> {
	const buf = await readFile(path.resolve(targetPath));
	const json = buf.toString('utf-8');
	const ret = JSON.parse(json) as R;
	return ret;
}

async function saveVideos(videos: VideosJson): Promise<void> {
	await writeFile(path.resolve(videosPath), JSON.stringify(videos));
}

async function main() {
	const lives = await loadLives();
	const videos = await loadVideos();

	const livesMap = lives.items
		.map((e) => [e.id, e] as const)
		.let((xs) => new Map(xs));

	const updated: VideosJson = {
		items: videos.items.map((item) => {
			const {
				id: { videoId },
			} = item;
			if (!livesMap.has(videoId)) return item;
			const { liveSeriesId, liveStyle, tags } = livesMap.get(videoId)!;

			const tagsMerged = (item.tags ?? [])
				.filter((x) => !['live', 'taped'].includes(x))
				.let((ts) => tags.reduce((ret, e) => ret, ts));

			return {
				...item,
				tags: tagsMerged,
				liveSeriesId,
				liveStyle,
			};
		}),
	};

	await saveVideos(updated);
}

main()
	.catch((e) => {
		console.error(e);
	})
	.finally(() => {
		console.info('done');
	});
