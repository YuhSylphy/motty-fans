import { Backdrop, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useMemo } from 'react';

import { useAppSelector } from 'src/util';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
	zIndex: theme.zIndex.drawer + 1,
	color: '#fff',
}));

export function Indicator() {
	const { awaits } = useAppSelector((state) => state.indicator);

	const waiting = useMemo(
		() => Object.values(awaits).some((x) => x > 0),
		[awaits]
	);

	return (
		<StyledBackdrop open={waiting}>
			<CircularProgress color="inherit" />
		</StyledBackdrop>
	);
}
