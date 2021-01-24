import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PedigreeState = {
	displays: string[];
};

const slice = createSlice({
	name: 'pedigree',
	initialState: { displays: [] } as PedigreeState,
	reducers: {
		set: (draft, action: PayloadAction<PedigreeState['displays']>) => {
			draft.displays = action.payload;
		},
		push: (draft, { payload: key }: PayloadAction<string>) => {
			draft.displays.push(key);
		},
		pop: (draft, _: PayloadAction<void>) => {
			if (draft.displays.length <= 0) {
				console.warn(`pedigree list is empty`);
				return;
			}
			draft.displays.pop();
		},
		clear: (draft, _: PayloadAction<void>) => {
			draft.displays = [];
		},
	},
});

export const { actions, reducer } = slice;
export type PedigreeAction = ReturnType<typeof actions[keyof typeof actions]>;
