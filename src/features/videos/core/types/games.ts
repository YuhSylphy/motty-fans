export type MasteryLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type GameDef = {
	id: string;
	gameTitle: string;
	platform: string | null;
	tags: string[];
	releasedIn: number | string | null;
	masteryLevel: MasteryLevel;
};

export type GamesJson = {
	items: GameDef[];
};
