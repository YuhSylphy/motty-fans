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

export interface Description {
	header: string;
	body: string[];
}

export interface ProfileDefinitionProps {
	updatedAt: string;
	description: Description;
	history: HistoryProps[];
}

export const blankProfile: ProfileDefinitionProps = {
	description: { header: '', body: [] },
	history: [],
	updatedAt: '',
};

export const fetchProfileDefs = (): Promise<ProfileDefinitionProps> =>
	fetch(`${import.meta.env.BASE_URL}/assets/profile/profile.json`)
		.then((res) => res.json())
		.catch((e) => ({ ...blankProfile, description: e }));
