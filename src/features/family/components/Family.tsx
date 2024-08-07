import { Box, Paper } from '@mui/material';
import React from 'react';

import { HorseDefsContainer } from 'src/features/horse-defs';

import { FamilyDiagram } from './FamilyDiagram';

export const Family: React.FC = () => {
	return (
		<HorseDefsContainer>
			<Box>
				<Paper>
					<FamilyDiagram />
				</Paper>
			</Box>
		</HorseDefsContainer>
	);
};
