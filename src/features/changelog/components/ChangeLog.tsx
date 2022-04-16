import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect } from 'react';
import Markdown from 'react-markdown';
import 'github-markdown-css';

import { useAppDispatch, useAppSelector } from 'src/util';

import { changeLogActions } from '..';

const StyledPaper = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(1),
}));

export const ChangeLog: React.FC = () => {
	const dispatch = useAppDispatch();

	const { article } = useAppSelector((state) => state.changeLog);
	useEffect(() => {
		dispatch(changeLogActions.init());
	}, [dispatch]);

	return (
		<StyledPaper>
			<Markdown className="markdown-body">{article}</Markdown>
		</StyledPaper>
	);
};
