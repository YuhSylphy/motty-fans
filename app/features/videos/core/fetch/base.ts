import { GamesJson, LiveSeriesJson, VideosJson } from '../types';

const videosJson = `${import.meta.env.BASE_URL}/assets/videos/videos.json`;
const liveSeriesJson = `${import.meta.env.BASE_URL}/assets/live-series/liveSeries.json`;
const gamesJson = `${import.meta.env.BASE_URL}/assets/live-series/games.json`;

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
