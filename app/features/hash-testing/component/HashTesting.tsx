import { Box, Grid, Paper, styled, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import {
	isVideoFinderCondition,
	isVideoFinderConditionMinimized,
	normalizeVideoFinderCondition,
} from '~/features/videos/core/ducks';
import { fetchLiveSeries } from '~/features/videos/core/fetch/liveSeries';
import {
	createDefaultCondition,
	decodeConditionsHash,
	encodeConditionsHash,
} from '~/features/videos/core/hash';

const StyledTextField = styled(TextField)(({}) => ({
	width: '100%',
}));

const stringify = (data: unknown) => JSON.stringify(data, null, '\t');
const defaultData = createDefaultCondition();

declare global {
	interface Window {
		hash: {
			decodeConditionsHash: typeof decodeConditionsHash;
			encodeConditionsHash: typeof encodeConditionsHash;
		};
	}
}

window.hash = {
	decodeConditionsHash,
	encodeConditionsHash,
};

const useTargetHashListString = () => {
	const [targetHashListString, setTargetHashListString] =
		useState<string>('loading...');

	useEffect(() => {
		const proc = async () => {
			const liveSeries = await fetchLiveSeries();

			const targetHashListString = liveSeries
				.map(({ seriesTitle }) => [
					seriesTitle,
					encodeConditionsHash({
						tags: [seriesTitle],
						dateSpan: { from: null, to: null },
					}),
				])
				.map((xs) => xs.join('\t'))
				.join('\n');

			setTargetHashListString(targetHashListString);
		};

		proc();
	}, [setTargetHashListString]);

	return targetHashListString;
};

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
			console.debug(newHash, data, normalized);
			setHash(newHash);
		} catch (cause) {
			console.error('', { cause });
		}
	}, [dataString, setHash]);

	const targetHashListString = useTargetHashListString();

	return {
		hash,
		dataString,
		targetHashListString,
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
		targetHashListString,
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
					<Grid item xs={12}>
						<StyledTextField
							id="data"
							multiline
							placeholder="data"
							value={targetHashListString}
							onChange={onDataStringChange}
							onBlur={onDataStringBlur}
							disabled
						/>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
}
