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

export const blankProfile: ProfileDefinitionProps = {
	description: [],
	history: [],
	updatedAt: '',
};

export const fetchProfileDefs = (): Promise<ProfileDefinitionProps> =>
	fetch(`${process.env.PUBLIC_URL}/assets/profile/profile.json`)
		.then((res) => res.json())
		.catch((e) => ({ ...blankProfile, description: e }));
