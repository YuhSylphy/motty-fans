import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VideoDef } from './fetch';

export type VideosState = {
	list: VideoDef[];
};

const videoSlice = createSlice({
	name: 'videos',
	initialState: { list: [] as VideoDef[] },
	reducers: {
		init: () => {},
		setList: (draft, action: PayloadAction<VideosState['list']>) => {
			draft.list = action.payload;
		},
	},
});

export const { actions, reducer } = videoSlice;
export type VideosAction = ReturnType<typeof actions[keyof typeof actions]>;
