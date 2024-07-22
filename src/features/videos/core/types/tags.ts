const tagStyles = ['none'] as const;

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

export const defaultStyledTag = (tag: VideoTagUnion): VideoTag => {
	if (typeof tag === 'string') {
		return {
			style: 'none',
			label: tag,
		};
	} else {
		return tag;
	}
};

export function convertTags(
	lhs: (string | VideoTag)[] | undefined,
	rhs: string[] | undefined
): VideoTag[] {
	// def.tags && def.tags.length > 0 ? [...def.tags] : ['no tags']
	const convertedLhs = lhs?.map(defaultStyledTag) ?? [];
	const convertedRhs = rhs?.map(defaultStyledTag) ?? [];
	const merged = [...convertedLhs, ...convertedRhs].filter(
		({ label: lhs }, _, array) =>
			array.find(({ label: rhs }) => lhs == rhs) != null
	);
	return merged.length > 0 ? merged : [defaultStyledTag('no tags')];
}
