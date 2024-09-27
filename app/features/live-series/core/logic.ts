import { DateTime } from 'luxon';

import { LiveSeries } from '~/features/videos/core/fetch/liveSeries';
import { LiveStyle, Thumbnail } from '~/features/videos/core/types';

export interface LiveSeriesRecord {
	id: string;
	platform: string;
	title: string;
	titleReleasedIn: number | string | null;
	styles: [LiveStyle];
	amount: number;
	masteryLevel: 0 | 1 | 2 | 3 | 4 | 5;
	part1: {
		publishedIn: number;
		url: string;
		thumbnail: Thumbnail;
		title: string;
	} | null;
	remarks: string;
	href: string | null;
}

export const mapLiveSeriesToRecord = ({
	id,
	game,
	seriesTitle,
	lives,
	remarks,
	videosHash,
}: LiveSeries) =>
	({
		id,
		platform: game?.platform,
		title: seriesTitle,
		titleReleasedIn: game?.releasedIn || null,
		styles: ((set) => Array.from(set))(
			lives
				.map(({ liveStyle }) => liveStyle)
				.reduce((s, e) => s.add(e), new Set())
		),
		amount: lives.length,
		masteryLevel: game?.masteryLevel,
		part1:
			lives.length === 0
				? null
				: lives.slice(0, 1).map(({ publishedAt, url, thumbnail, title }) => ({
						publishedIn: DateTime.fromMillis(publishedAt, {
							zone: 'JST',
						}).year,
						url,
						thumbnail,
						title,
					}))[0],
		remarks,
		href: videosHash ? `${import.meta.env.BASE_URL}videos/${videosHash}` : null,
	}) as LiveSeriesRecord;
