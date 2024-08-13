import pako from 'pako';
import { isVideoFinderCondition, VideoFinderCondition } from './ducks';
import { DateTime } from 'luxon';

function base64encode(data: Uint8Array) {
	return btoa(String.fromCharCode(...data));
}

function base64decode(data: string) {
	return Uint8Array.from(atob(data), (s) => s.charCodeAt(0));
}

function base64ToBase64Url(base64: string) {
	return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=*$/g, '');
}

function base64UrlToBase64(base64url: string) {
	const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
	const padding = base64.length % 4;
	if (padding > 0) {
		return base64 + '===='.slice(padding);
	}
	return base64;
}

function encodeAsBase64Url(data: Uint8Array) {
	const base64 = base64encode(data);
	const base64url = base64ToBase64Url(base64);
	return base64url;
}

function decodeBase64Url(base64url: string) {
	const base64 = base64UrlToBase64(base64url);
	const decoded = base64decode(base64);
	return decoded;
}

export function encodeConditionsHash(condition: VideoFinderCondition) {
	const json = JSON.stringify(condition);
	const compressed = pako.deflateRaw(json, { raw: true });
	const hash = encodeAsBase64Url(compressed);
	return hash;
}

export function decodeConditionsHash(hash: string) {
	try {
		const decoded = decodeBase64Url(hash);
		const decompressed = pako.inflateRaw(decoded, { to: 'string', raw: true });
		const data = JSON.parse(decompressed);
		if (!isVideoFinderCondition(data))
			throw Error(
				`content is not a VideoFinderCondition: ${JSON.stringify(data)}`
			);
		return data;
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
