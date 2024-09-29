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
	t?: string[] | undefined;
	d?:
		| {
				f?: number | null | undefined;
				t?: number | null | undefined;
		  }
		| undefined;
};

export const normalizeVideoFinderCondition = ({
	d,
	t,
}: VideoFinderConditionMinimized): VideoFinderCondition => ({
	tags: t ?? [],
	dateSpan: {
		from: d?.f ?? null,
		to: d?.t ?? null,
	},
});

export const minimizeVideoFinderCondition = ({
	tags,
	dateSpan: { from, to },
}: VideoFinderCondition): VideoFinderConditionMinimized => ({
	...(tags.length === 0 ? {} : { t: tags }),
	...(from != null && to != null
		? {}
		: {
				d: {
					...(from != null ? {} : { f: from }),
					...(to != null ? {} : { t: to }),
				},
			}),
});

export function isVideoFinderConditionMinimized(
	arg: unknown
): arg is VideoFinderConditionMinimized {
	if (!arg || typeof arg !== 'object') return false;

	if ('t' in arg) {
		const { t } = arg;
		if (!Array.isArray(t)) return false;
		if (t.length > 0 && typeof t[0] !== 'string') return false;
	}
	if ('d' in arg) {
		const { d } = arg;
		if (d === null || typeof d !== 'object') return false;

		if ('f' in d) {
			const { f } = d;
			if (f !== null && typeof f !== 'number') return false;
		}
		if ('t' in d) {
			const { t } = d;
			if (t !== null && typeof t !== 'number') return false;
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
