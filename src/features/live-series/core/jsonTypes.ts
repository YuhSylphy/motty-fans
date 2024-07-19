export type LiveStyle = '生配信' | '動画';

export type LiveDef = {
	id: string;
	liveStyle: LiveStyle | null;
	liveSeriesId: string | null;
	tags: string[];
};

export type LivesJson = {
	items: LiveDef[];
};
