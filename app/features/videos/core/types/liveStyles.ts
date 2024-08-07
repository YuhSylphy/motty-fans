const liveStyles = ['video', 'broadcast', 'short'] as const;
const liveStyleLabels = ['動画', '生配信', 'ショート'] as const;

export type LiveStyle = (typeof liveStyles)[number];
export type LiveStyleLabel = (typeof liveStyleLabels)[number];

export function isLiveStyle(
	value: string | undefined | null
): value is LiveStyle {
	return !!value && (liveStyles as readonly string[]).includes(value);
}

export function isLiveStyleLabel(
	label: string | undefined | null
): label is LiveStyleLabel {
	return !!label && (liveStyleLabels as readonly string[]).includes(label);
}

export function convertLiveStyleFromLabel(
	label: string | undefined | null
): LiveStyle | null {
	if (!isLiveStyleLabel(label)) return null;
	switch (label) {
		case '動画':
			return 'video';
		case '生配信':
			return 'broadcast';
		case 'ショート':
			return 'short';
		default: {
			const _exhaust: never = label;
			throw Error(label);
		}
	}
}

export function convertLiveStyleToLabel(
	value: string | undefined | null
): LiveStyleLabel | null {
	if (!isLiveStyle(value)) return null;
	switch (value) {
		case 'video':
			return '動画';
		case 'broadcast':
			return '生配信';
		case 'short':
			return 'ショート';
		default: {
			const _exhaust: never = value;
			throw Error(value);
		}
	}
}
