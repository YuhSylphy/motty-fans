import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LiveSeries } from './fetch';

export type LiveSeriesState = {
	series: LiveSeries[];
};

const liveSeriesSlice = createSlice({
	name: 'live-series',
	initialState: {
		series: [],
	} as LiveSeriesState,
	reducers: {
		init: () => {},
		setSeries: (draft, action: PayloadAction<{ series: LiveSeries[] }>) => {
			draft.series = action.payload.series;
		},
	},
});

export const { actions, reducer } = liveSeriesSlice;
export type LiveSeriesAction = ReturnType<
	(typeof actions)[keyof typeof actions]
>;
