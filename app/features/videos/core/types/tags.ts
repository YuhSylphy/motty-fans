const tagStyles = [
	'none',
	'lives',
	'series',
	'games',
	'broadcast',
	'video',
	'short',
] as const;

export type TagStyle = (typeof tagStyles)[number];

export type VideoTag = {
	style: TagStyle;
	label: string;
};

export type VideoTagUnion = string | VideoTag;

export function isVideoTag(arg: unknown | undefined): arg is VideoTag {
	if (arg == null || typeof arg !== 'object') return false;
	if (!('label' in arg) || typeof arg.label !== 'string') return false;
	if (
		!('style' in arg) ||
		typeof arg.style !== 'string' ||
		tagStyles.includes(arg.style as TagStyle)
	)
		return false;
	return true;
}

export const defaultStyledTag =
	<T extends TagStyle>(defaultStyle: T) =>
	(tag: VideoTagUnion): VideoTag => {
		if (typeof tag === 'string') {
			return {
				style: defaultStyle,
				label: tag,
			};
		} else {
			return tag;
		}
	};
