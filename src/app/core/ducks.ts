import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CoreState = {
	title: string;
};

const slice = createSlice({
	name: 'core',
	initialState: { title: 'MOTTY fans' } as CoreState,
	reducers: {
		setTitle: (draft, action: PayloadAction<CoreState['title']>) => {
			draft.title = action.payload;
		},
	},
});

export const { actions: coreActions, reducer: coreReducer } = slice;
export type CoreAction = ReturnType<
	(typeof coreActions)[keyof typeof coreActions]
>;
