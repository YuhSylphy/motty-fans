import * as React from 'react';
import { Paper, Typography } from '@mui/material';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';

import { MareLineTree } from './MareLineTree';

const useStyles = makeStyles((theme) =>
	createStyles({
		paper: {
			padding: theme.spacing(2),
		},
	})
);

export const MareLine: React.FC = () => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Typography variant="h4">牝系図</Typography>
			<Paper className={classes.paper}>
				<MareLineTree />
			</Paper>
		</React.Fragment>
	);
};
