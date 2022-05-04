import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { VideoDef } from './fetch';

export type VideoFinderCondition = {
	tags: string[];
	dateSpan: {
		from: number | null;
		to: number | null;
	};
};

export type VideosState = {
	list: VideoDef[];
	tagCandidates: string[];
	condition: VideoFinderCondition;
};

const videoSlice = createSlice({
	name: 'videos',
	initialState: {
		list: [],
		tagCandidates: [],
		condition: {
			tags: [],
			dateSpan: {
				from: null,
				to: null,
			},
		},
	} as VideosState,
	reducers: {
		init: () => {},
		setList: (draft, action: PayloadAction<VideosState['list']>) => {
			draft.list = action.payload;
		},
		setTagCandidates: (
			draft,
			action: PayloadAction<VideosState['tagCandidates']>
		) => {
			draft.tagCandidates = action.payload;
		},
		addConditionTags: (
			draft,
			action: PayloadAction<VideosState['condition']['tags']>
		) => {
			draft.condition.tags = [
				...draft.condition.tags,
				...action.payload.filter((t) => !draft.condition.tags.includes(t)),
			];
		},
		removeConditionTags: (
			draft,
			action: PayloadAction<VideosState['condition']['tags']>
		) => {
			draft.condition.tags = [
				...draft.condition.tags.filter((t) => !action.payload.includes(t)),
			];
		},
		clearConditionTags: (draft, _action: PayloadAction) => {
			draft.condition.tags = [];
		},
		setConditionDateFrom: (draft, action: PayloadAction<Date>) => {
			draft.condition.dateSpan.from = action.payload.getMilliseconds();
		},
		clearConditionDateFrom: (draft, _action: PayloadAction) => {
			draft.condition.dateSpan.from = null;
		},
		setConditionDateTo: (draft, action: PayloadAction<Date>) => {
			draft.condition.dateSpan.to = action.payload.getMilliseconds();
		},
		clearConditionDateTo: (draft, _action: PayloadAction) => {
			draft.condition.dateSpan.to = null;
		},
	},
});

export const { actions, reducer } = videoSlice;
export type VideosAction = ReturnType<typeof actions[keyof typeof actions]>;
