import Pako from 'pako';
import {
	isVideoFinderConditionMinimized,
	minimizeVideoFinderCondition,
	normalizeVideoFinderCondition,
	VideoFinderCondition,
} from './ducks';
import { DateTime } from 'luxon';

export function base64encode(data: Uint8Array) {
	return btoa(String.fromCharCode(...data));
}

export function base64decode(data: string) {
	return Uint8Array.from(atob(data), (s) => s.charCodeAt(0));
}

export function base64ToBase64Url(base64: string) {
	return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=*$/g, '');
}

export function base64UrlToBase64(base64url: string) {
	const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
	const padding = base64.length % 4;
	if (padding > 0) {
		return base64 + '===='.slice(padding);
	}
	return base64;
}

export function encodeConditionsHash(condition: VideoFinderCondition) {
	const minimized = minimizeVideoFinderCondition(condition);
	const json = JSON.stringify(minimized);
	const compressed = Pako.deflateRaw(json, { raw: true });
	const base64 = base64encode(compressed);
	const base64url = base64ToBase64Url(base64);
	return base64url;
}

export function decodeConditionsHash(hash: string) {
	try {
		const base64 = base64UrlToBase64(hash);
		const decoded = base64decode(base64);
		const decompressed = Pako.inflateRaw(decoded, { to: 'string', raw: true });
		const data: unknown = JSON.parse(decompressed);
		if (!isVideoFinderConditionMinimized(data))
			throw Error(
				`content is not a VideoFinderCondition: ${JSON.stringify(data)}`
			);
		const normalized = normalizeVideoFinderCondition(data);
		return normalized;
	} catch (cause) {
		throw Error('failed to decode conditions hash', { cause });
	}
}

export function createDefaultConditionHash() {
	return encodeConditionsHash(createDefaultCondition());
}

export function createDefaultCondition(): VideoFinderCondition {
	return {
		tags: [],
		dateSpan: {
			from: DateTime.now().minus({ months: 3 }).toMillis(),
			to: null,
		},
	};
}

export function setHashToQueryParams(hash: string) {
	const m = location.href.match(
		/^(https?:\/\/[^/]+\/[^/]+\/videos)(?:\/([^/]*))?$/
	);
	if (!m || m.length === 0) {
		console.warn(`hash set in unexpected url: ${location.href}`);
		return;
	}
	const [, base, current] = m;
	if (hash !== current) {
		history.pushState('', '', `${base}/${hash}`);
	}
}
