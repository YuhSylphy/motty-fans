import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoDef } from './fetch/videos';

export type VideoFinderCondition = {
	tags: string[];
	dateSpan: {
		from: number | null;
		to: number | null;
	};
};

export type VideoFinderConditionMinimized = {
	tags?: string[] | undefined;
	dateSpan?:
		| {
				from?: number | null | undefined;
				to?: number | null | undefined;
		  }
		| undefined;
};

export const normalizeVideoFinderCondition = ({
	dateSpan,
	tags,
}: VideoFinderConditionMinimized): VideoFinderCondition => ({
	tags: tags ?? [],
	dateSpan: {
		from: dateSpan?.from ?? null,
		to: dateSpan?.to ?? null,
	},
});

export const minimizeVideoFinderCondition = ({
	tags,
	dateSpan: { from, to },
}: VideoFinderCondition): VideoFinderConditionMinimized => ({
	...(tags.length === 0 ? {} : { tags }),
	...(from != null && to != null
		? {}
		: {
				dateSpan: {
					...(from != null ? {} : { from }),
					...(to != null ? {} : { to }),
				},
			}),
});

// TODO: {"dateSpan": { "to": null }} がエラーになる
export function isVideoFinderConditionMinimized(
	arg: unknown
): arg is VideoFinderConditionMinimized {
	if (!arg || typeof arg !== 'object') return false;

	if ('tags' in arg) {
		const { tags } = arg;
		if (!Array.isArray(tags)) return false;
		if (tags.length > 0 && typeof tags[0] !== 'string') return false;
	}
	if ('dateSpan' in arg) {
		const { dateSpan } = arg;
		if (dateSpan === null || typeof dateSpan !== 'object') return false;

		console.info(3);
		if ('from' in dateSpan) {
			const { from } = dateSpan;
			if (from !== null && typeof from !== 'number') return false;
		}
		if ('to' in dateSpan) {
			const { to } = dateSpan;
			if (to !== null && typeof to !== 'number') return false;
		}
	}

	return true;
}

export function isVideoFinderCondition(
	arg: unknown
): arg is VideoFinderCondition {
	if (!arg || typeof arg !== 'object') return false;

	if (!('tags' in arg) || !('dateSpan' in arg)) return false;
	const { tags, dateSpan } = arg;

	if (!Array.isArray(tags)) return false;
	if (tags.length > 0 && typeof tags[0] !== 'string') return false;

	if (!dateSpan || typeof dateSpan !== 'object') return false;
	if (!('from' in dateSpan) || !('to' in dateSpan)) return false;
	const { from, to } = dateSpan;

	if (!(from === null || typeof from === 'number')) return false;
	if (!(to === null || typeof to === 'number')) return false;

	return true;
}

export type VideosState = {
	loaded: boolean;
	list: VideoDef[];
	condition: VideoFinderCondition;
	hash: string | null;
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
		hash: null,
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
		acceptHash: (
			_draft,
			_action: PayloadAction<Pick<VideosState, 'hash'>>
		) => {},
		setHash: (
			draft,
			{ payload: { hash } }: PayloadAction<Pick<VideosState, 'hash'>>
		) => {
			draft.hash = hash;
		},
		setConitionFromAccepted: (
			draft,
			{
				payload: { condition, hash },
			}: PayloadAction<Pick<VideosState, 'condition' | 'hash'>>
		) => {
			draft.condition = condition;
			draft.hash = hash;
		},
	},
});

export const { actions, reducer } = videoSlice;
export type VideosAction = ReturnType<(typeof actions)[keyof typeof actions]>;
