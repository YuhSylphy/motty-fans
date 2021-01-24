import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ChangeLogState = {
	article: string;
};

const slice = createSlice({
	name: 'change-log',
	initialState: { article: '' } as ChangeLogState,
	reducers: {
		init: () => {},
		set: (draft, action: PayloadAction<ChangeLogState['article']>) => {
			draft.article = action.payload;
		},
	},
});

export const { actions, reducer } = slice;
export type ChangeLogAction = ReturnType<typeof actions[keyof typeof actions]>;
