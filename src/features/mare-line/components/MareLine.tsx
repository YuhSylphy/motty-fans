import React from 'react';
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { MareLineTree } from './MareLineTree';

const StyledPaper = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
}));

export function MareLine() {
	return (
		<React.Fragment>
			<Typography variant="h4">牝系図</Typography>
			<StyledPaper>
				<MareLineTree />
			</StyledPaper>
		</React.Fragment>
	);
}
