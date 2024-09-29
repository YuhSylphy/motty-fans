import { Box, Grid, Paper, styled, TextField } from '@mui/material';
import Pako from 'pako';
import React, { useCallback, useState } from 'react';
import {
	isVideoFinderCondition,
	isVideoFinderConditionMinimized,
	minimizeVideoFinderCondition,
	normalizeVideoFinderCondition,
	VideoFinderCondition,
} from '~/features/videos/core/ducks';
import {
	base64decode,
	base64encode,
	base64ToBase64Url,
	base64UrlToBase64,
	createDefaultCondition,
} from '~/features/videos/core/hash';

const StyledTextField = styled(TextField)(({}) => ({
	width: '100%',
}));

const stringify = (data: unknown) => JSON.stringify(data, null, '\t');
const defaultData = createDefaultCondition();

export function encodeConditionsHash(condition: VideoFinderCondition) {
	let i = 0;
	console.info(`encode: ${i++}`, condition);
	const minimized = minimizeVideoFinderCondition(condition);
	console.info(`encode: ${i++}`, minimized);
	const json = JSON.stringify(minimized);
	console.info(`encode: ${i++}`, json);
	const compressed = Pako.deflateRaw(json, { raw: true });
	console.info(`encode: ${i++}`, compressed);
	const base64 = base64encode(compressed);
	console.info(`encode: ${i++}`, base64);
	const base64url = base64ToBase64Url(base64);
	console.info(`encode: ${i++}`, base64url);
	return base64url;
}

export function decodeConditionsHash(hash: string) {
	let i = 0;
	console.info(`decode: ${i++}`, hash);
	try {
		const base64 = base64UrlToBase64(hash);
		console.info(`decode: ${i++}`, base64);
		const decoded = base64decode(base64);
		console.info(`decode: ${i++}`, decoded);
		const decompressed = Pako.inflateRaw(decoded, { to: 'string', raw: true });
		console.info(`decode: ${i++}`, decompressed);
		const data: unknown = JSON.parse(decompressed);
		console.info(`decode: ${i++}`, data);
		if (!isVideoFinderConditionMinimized(data))
			throw Error(
				`content is not a VideoFinderCondition: ${JSON.stringify(data)}`
			);
		const normalized = normalizeVideoFinderCondition(data);
		console.info(`decode: ${i++}`, normalized);
		return normalized;
	} catch (cause) {
		throw Error('failed to decode conditions hash', { cause });
	}
}

const useHashTestingHooks = () => {
	const [dataString, setDataString] = useState(stringify(defaultData));
	const [hash, setHash] = useState(encodeConditionsHash(defaultData));

	const onHashChange = useCallback<
		Exclude<React.ComponentProps<typeof TextField>['onChange'], undefined>
	>(
		({ target: { value: newHash } }) => {
			setHash(newHash);
		},
		[setHash]
	);

	const onHashBlur = useCallback<
		Exclude<React.ComponentProps<typeof TextField>['onBlur'], undefined>
	>(() => {
		try {
			const newData = decodeConditionsHash(hash);
			setDataString(stringify(newData));
		} catch (cause) {
			console.error('failed to convert', { cause });
		}
	}, [hash, setDataString]);

	const onDataStringChange = useCallback<
		Exclude<React.ComponentProps<typeof TextField>['onChange'], undefined>
	>(
		({ target: { value: newDataString } }) => {
			setDataString(newDataString);
		},
		[setDataString]
	);

	const onDataStringBlur = useCallback<
		Exclude<React.ComponentProps<typeof TextField>['onBlur'], undefined>
	>(() => {
		try {
			const data: unknown = JSON.parse(dataString);

			const normalized = isVideoFinderCondition(data)
				? data
				: isVideoFinderConditionMinimized(data)
					? normalizeVideoFinderCondition(data)
					: (() => {
							throw Error(`failed to convert ${JSON.stringify(data)}`);
						})();

			const newHash = encodeConditionsHash(normalized);
			console.info(newHash, data, normalized);
			setHash(newHash);
		} catch (cause) {
			console.error('', { cause });
		}
	}, [dataString, setHash]);

	return {
		hash,
		dataString,
		onHashChange,
		onDataStringChange,
		onHashBlur,
		onDataStringBlur,
	};
};

export function HashTesting() {
	const {
		hash,
		dataString,
		onDataStringChange,
		onHashChange,
		onDataStringBlur,
		onHashBlur,
	} = useHashTestingHooks();

	return (
		<Box
			width="100%"
			height="100%"
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<Paper sx={{ width: '100%' }}>
				<Grid container>
					<Grid item xs={12}>
						<StyledTextField
							id="hash"
							placeholder="hash"
							value={hash}
							onChange={onHashChange}
							onBlur={onHashBlur}
						/>
					</Grid>
					<Grid item xs={12}>
						<StyledTextField
							id="data"
							multiline
							placeholder="data"
							value={dataString}
							onChange={onDataStringChange}
							onBlur={onDataStringBlur}
						/>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
}
