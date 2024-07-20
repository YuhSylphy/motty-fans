import { createSlice } from '@reduxjs/toolkit';

export type LiveSeriesState = {
	// no props
};

const videoSlice = createSlice({
	name: 'liveSeries',
	initialState: {} as LiveSeriesState,
	reducers: {
		init: () => {
			/* noop */
		},
	},
});

export const { actions, reducer } = videoSlice;
export type LiveSeriesAction = ReturnType<
	(typeof actions)[keyof typeof actions]
>;
