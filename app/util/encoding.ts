import { Buffer } from 'buffer';
import pako from 'pako';

const compress = async (content: string) => {
	const gziped = pako.gzip(content);
	return Buffer.from(gziped);
};

const decompress = async (content: Buffer) => {
	const gziped = Uint8Array.from(content);
	const binary = pako.ungzip(gziped);
	return Buffer.from(binary).toString('utf-8');
};

const encodeBase64Url = (buffer: Buffer) =>
	buffer
		.toString('base64')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/g, '');

const decodeBase64Url = (base64url: string) =>
	Buffer.from(base64url.replace(/-/g, '+').replace(/_/g, '/'), 'base64');

export const encode = async <T>(rawObject: T): Promise<string> => {
	const jsonString = JSON.stringify(rawObject);
	const compressed = await compress(jsonString);
	const base64url = encodeBase64Url(compressed);
	return base64url;
};

export const decode = async <T>(base64url: string): Promise<T> => {
	const buffer = decodeBase64Url(base64url);
	const decompressed = await decompress(buffer);
	if (typeof decompressed === 'string') {
		return JSON.parse(decompressed);
	} else {
		throw new Error(
			`decompressed result is not a valid UTF-8 text: ${decompressed}`
		);
	}
};
