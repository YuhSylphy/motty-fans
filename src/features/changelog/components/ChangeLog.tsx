import { Paper, createStyles, makeStyles } from '@material-ui/core';
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
				{article !== '' ? (
					<Markdown source={article} className="markdown-body" />
				) : null}
			</Paper>
		</React.Fragment>
	);
};
