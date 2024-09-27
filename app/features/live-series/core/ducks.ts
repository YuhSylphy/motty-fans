import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LiveSeriesRecord } from './logic';

export type LiveSeriesState = {
	records: LiveSeriesRecord[];
	displayRecords: LiveSeriesRecord[];
};

const liveSeriesSlice = createSlice({
	name: 'live-series',
	initialState: {
		records: [],
		displayRecords: [],
	} as LiveSeriesState,
	reducers: {
		init: () => {},
		setRecords: (
			draft,
			action: PayloadAction<{ records: LiveSeriesRecord[] }>
		) => {
			draft.records = action.payload.records;
		},
		setDisplayRecords: (
			draft,
			action: PayloadAction<{ displayRecords: LiveSeriesRecord[] }>
		) => {
			draft.displayRecords = action.payload.displayRecords;
		},
		setConditionText: (
			_draft,
			_action: PayloadAction<{ conditionText: string }>
		) => void 0,
	},
});

export const { actions, reducer } = liveSeriesSlice;
export type LiveSeriesAction = ReturnType<
	(typeof actions)[keyof typeof actions]
>;
