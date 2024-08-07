import React from 'react';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

import { HorseDefsContainer } from 'src/features/horse-defs';

import { MareLineTree } from './MareLineTree';

const StyledPaper = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
}));

export function MareLine() {
	return (
		<HorseDefsContainer>
			<StyledPaper>
				<MareLineTree />
			</StyledPaper>
		</HorseDefsContainer>
	);
}
