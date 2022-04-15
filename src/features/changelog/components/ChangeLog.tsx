import { Paper } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import * as React from 'react';
import { useEffect } from 'react';
import Markdown from 'react-markdown';
import 'github-markdown-css';

import { useAppDispatch, useAppSelector } from 'src/util';

import { changeLogActions } from '..';

const useStyles = makeStyles((theme) =>
	createStyles({
		paper: {
			padding: theme.spacing(1),
		},
	})
);

export const ChangeLog: React.FC = () => {
	const classes = useStyles();
	const dispatch = useAppDispatch();

	const { article } = useAppSelector((state) => state.changeLog);
	useEffect(() => {
		dispatch(changeLogActions.init());
	}, [dispatch]);

	return (
		<React.Fragment>
			<Paper className={classes.paper}>
				<Markdown className="markdown-body">{article}</Markdown>
			</Paper>
		</React.Fragment>
	);
};
