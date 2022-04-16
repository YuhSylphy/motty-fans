import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

import { HorseDefsContainer } from 'src/features/horse-defs';

import { FamilyDiagram } from './FamilyDiagram';

export const Family: React.FC = () => {
	return (
		<HorseDefsContainer>
			<Box>
				<Typography variant="h4">系図</Typography>
				<Paper>
					<FamilyDiagram />
				</Paper>
			</Box>
		</HorseDefsContainer>
	);
};
