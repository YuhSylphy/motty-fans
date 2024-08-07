import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoDef } from './fetch/videos';

export type VideoFinderCondition = {
	tags: string[];
	dateSpan: {
		from: number | null;
		to: number | null;
	};
};

export type VideosState = {
	loaded: boolean;
	list: VideoDef[];
	condition: VideoFinderCondition;
};

const videoSlice = createSlice({
	name: 'videos',
	initialState: {
		loaded: false,
		list: [],
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
			draft.loaded = true;
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
		setConditionDateFrom: (
			draft,
			{ payload }: PayloadAction<Date | number>
		) => {
			draft.condition.dateSpan.from =
				payload instanceof Date ? payload.getMilliseconds() : payload;
		},
		clearConditionDateFrom: (draft, _action: PayloadAction) => {
			draft.condition.dateSpan.from = null;
		},
		setConditionDateTo: (draft, { payload }: PayloadAction<Date | number>) => {
			draft.condition.dateSpan.to =
				payload instanceof Date ? payload.getMilliseconds() : payload;
		},
		clearConditionDateTo: (draft, _action: PayloadAction) => {
			draft.condition.dateSpan.to = null;
		},
	},
});

export const { actions, reducer } = videoSlice;
export type VideosAction = ReturnType<(typeof actions)[keyof typeof actions]>;
