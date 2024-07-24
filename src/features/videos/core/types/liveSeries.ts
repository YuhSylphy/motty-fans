export type LiveSeriesDef = {
	id: string;
	seriesTitle: string;
	tags: string[];
	gameId: string | null;
	remarks: string;
};

export type LiveSeriesJson = {
	items: LiveSeriesDef[];
};
