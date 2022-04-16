import React from 'react';
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { HorseDefsContainer } from 'src/features/horse-defs';

import { MareLineTree } from './MareLineTree';

const StyledPaper = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
}));

export function MareLine() {
	return (
		<HorseDefsContainer>
			<Typography variant="h4">牝系図</Typography>
			<StyledPaper>
				<MareLineTree />
			</StyledPaper>
		</HorseDefsContainer>
	);
}
