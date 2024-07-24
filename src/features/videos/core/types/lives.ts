import { LiveStyle } from './liveStyles';

export type LiveDef = {
	id: string;
	liveStyle: LiveStyle | null;
	liveSeriesId: string | null;
	tags: string[];
};

export type LivesJson = {
	items: LiveDef[];
};
