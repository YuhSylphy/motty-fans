import { Box, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { FamilyDiagram } from './FamilyDiagram';

export const Family: React.FC = () => {
	return (
		<Box>
			<Typography variant="h4">系図</Typography>
			<Paper>
				<FamilyDiagram />
			</Paper>
		</Box>
	);
};
