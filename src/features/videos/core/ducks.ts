import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoDef } from './logic';

export type VideosState = {
	list: VideoDef[];
};

const videoSlice = createSlice({
	name: 'videos',
	initialState: { list: [] as VideoDef[] },
	reducers: {
		init: () => {},
		set: (draft, action: PayloadAction<VideosState['list']>) => {
			draft.list = action.payload;
		},
	},
});

export const { actions, reducer } = videoSlice;
export type VideosAction = ReturnType<typeof actions[keyof typeof actions]>;
