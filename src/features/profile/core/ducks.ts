import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LinkExpression {
	href: string;
	label: string;
}

export interface HistoryItemProps {
	date: string;
	link?: LinkExpression | LinkExpression[];
	text: string;
}

export interface HistoryProps {
	key: string;
	header: string;
	items: HistoryItemProps[];
}

export interface ProfileDefinitionProps {
	updatedAt: string;
	description: string[];
	history: HistoryProps[];
}

export type ProfileState = {
	defs: ProfileDefinitionProps;
};

const profileSlice = createSlice({
	name: 'profile',
	initialState: {
		defs: { description: [], updatedAt: '', history: [] },
	} as ProfileState,
	reducers: {
		init: () => {},
		setDefs: (draft, action: PayloadAction<ProfileState['defs']>) => {
			draft.defs = action.payload;
		},
	},
});

export const { actions, reducer } = profileSlice;
export type ProfileAction = ReturnType<typeof actions[keyof typeof actions]>;
