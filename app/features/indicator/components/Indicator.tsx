import { Backdrop, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useMemo } from 'react';

import { useAppSelector } from '~/util';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
	zIndex: theme.zIndex.drawer + 1,
	color: '#fff',
}));

export const useIndicatorHooks = () => {
	const { awaits } = useAppSelector((state) => state.indicator);

	const waiting = useMemo(
		() => Object.values(awaits).some((x) => x > 0),
		[awaits]
	);

	return { waiting };
};

export function Indicator() {
	const { waiting } = useIndicatorHooks();
	return (
		<StyledBackdrop open={waiting}>
			<CircularProgress color="inherit" />
		</StyledBackdrop>
	);
}

export function FixedIndicator() {
	return (
		<StyledBackdrop open={true}>
			<CircularProgress color="inherit" />
		</StyledBackdrop>
	);
}
