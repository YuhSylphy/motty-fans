import * as React from 'react';
import { useMemo } from 'react';
import { Dialog, DialogTitle, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'src/util';

import { lineMap } from 'src/features/horse-defs';

import { pedigreeActions } from '..';
import { PedigreeTable } from './PedigreeTable';

export const PedigreeDialog: React.FC = () => {
	const dispatch = useAppDispatch();
	const { displays } = useAppSelector((state) => state.pedigree);
	const open = useMemo(() => displays.length > 0, [displays]);
	const defs = useAppSelector((state) => state.horseDefs.list);
	const def = useMemo(
		() =>
			displays.length > 0
				? defs.find((def) => def.name === displays[displays.length - 1])
				: void 0,
		[defs, displays]
	);

	const handleClose = useMemo(
		() => () => {
			dispatch(pedigreeActions.clear());
		},
		[dispatch]
	);

	return def ? (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>
				<Typography variant="h5">血統表: {def.name}</Typography>
				{def.line !== 'Uk' ? (
					<Typography variant="h6" style={{ paddingLeft: '1em' }}>
						大系統: {lineMap[def.line].label}系
					</Typography>
				) : null}
			</DialogTitle>
			<PedigreeTable def={def} />
		</Dialog>
	) : null;
};
