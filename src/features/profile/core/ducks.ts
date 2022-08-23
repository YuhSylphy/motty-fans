import {
	createSlice,
	// PayloadAction
} from '@reduxjs/toolkit';

export type ProfileState = Record<string, never>;

const profileSlice = createSlice({
	name: 'profile',
	initialState: {} as ProfileState,
	reducers: {
		init: () => {},
		// setList: (draft, action: PayloadAction<ProfileState['list']>) => {
		// 	draft.list = action.payload;
		// },
	},
});

export const { actions, reducer } = profileSlice;
export type ProfileAction = ReturnType<typeof actions[keyof typeof actions]>;
