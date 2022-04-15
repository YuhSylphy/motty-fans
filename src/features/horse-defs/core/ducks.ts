import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HorseDef } from './horse';

export type HorseDefState = {
	list: HorseDef[];
};

const horseDefsSlice = createSlice({
	name: 'horseDefs',
	initialState: { list: [] as HorseDef[] },
	reducers: {
		init: () => {},
		set: (draft, action: PayloadAction<HorseDefState>) => {
			draft.list = action.payload.list;
		},
	},
});

export const { actions, reducer } = horseDefsSlice;
export type HorseDefsAction = ReturnType<typeof actions[keyof typeof actions]>;
