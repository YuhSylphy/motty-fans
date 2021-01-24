import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IndicatorState = {
	awaits: { [key: string]: number };
};

const slice = createSlice({
	name: 'indicator',
	initialState: { awaits: {} } as IndicatorState,
	reducers: {
		set: (draft, action: PayloadAction<IndicatorState['awaits']>) => {
			draft.awaits = action.payload;
		},
		open: (draft, { payload: key }: PayloadAction<string>) => {
			draft.awaits = {
				...draft.awaits,
				[key]: 1 + (key in draft.awaits ? draft.awaits[key] : 0),
			};
		},
		close: (draft, { payload: key }: PayloadAction<string>) => {
			if (!(key in draft.awaits)) {
				console.warn(`there isnt key [${key}] in `);
				return;
			}
			const { [key]: target, ...rest } = draft.awaits;
			draft.awaits = {
				...rest,
				...(target > 1 ? { [key]: target - 1 } : {}),
			};
		},
	},
});

export const { actions, reducer } = slice;
export type IndicatorAction = ReturnType<typeof actions[keyof typeof actions]>;
