import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { blankProfile, ProfileDefinitionProps } from './fetch';

export type ProfileState = {
	defs: ProfileDefinitionProps;
};

const profileSlice = createSlice({
	name: 'profile',
	initialState: { defs: blankProfile } as ProfileState,
	reducers: {
		init: () => {},
		setDefs: (draft, action: PayloadAction<ProfileState['defs']>) => {
			draft.defs = action.payload;
		},
	},
});

export const { actions, reducer } = profileSlice;
export type ProfileAction = ReturnType<(typeof actions)[keyof typeof actions]>;
