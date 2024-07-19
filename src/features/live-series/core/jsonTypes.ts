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

export type LiveSeriesDef = {
	id: string;
	seriesTitle: string;
	tags: string[];
	gameId: string | null;
};

export type LiveSeriesJson = {
	items: LiveSeriesDef[];
};

export type MasteryLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type GamesDef = {
	id: string;
	gameTitle: string;
	platform: string | null;
	tags: string[];
	releasedIn: number | string | null;
	masteryLevel: MasteryLevel;
};

export type GamesJson = {
	items: GamesDef[];
};
