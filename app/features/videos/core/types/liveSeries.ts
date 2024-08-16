export type LiveSeriesDef = {
	id: string;
	seriesTitle: string;
	tags: string[];
	gameId: string | null;
	remarks: string;
	videosHash: string | null;
};

export type LiveSeriesJson = {
	items: LiveSeriesDef[];
};
