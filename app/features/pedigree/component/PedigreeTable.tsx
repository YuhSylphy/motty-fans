import {
	TableContainer,
	Table,
	TableBody,
	TableRow,
	TableCell,
	Typography,
	Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useMemo } from 'react';

import { useAppSelector } from '~/util';
import { HorseDef, Line, lineMap } from '~/features/horse-defs';
export interface PedigreeTableProps {
	def: HorseDef;
}

type PedigreeNode = {
	name: string;
	generation: number;
	show: boolean;
	line: Line;
};

const StyledTable = styled(Table)(({ theme }) => ({
	'& .cell': {
		backgroundColor: 'gray',
		'&.empty': {
			backgroundColor: 'lightgray',
		},
		'&.Ec': {
			backgroundColor: '#ffffff',
		},
		'&.Ph': {
			backgroundColor: '#cfe8ff',
		},
		'&.Ns': {
			backgroundColor: '#00bb00',
		},
		'&.Ro': {
			backgroundColor: '#ffb4c8',
		},
		'&.Ne': {
			backgroundColor: '#fdf488',
		},
		'&.Na': {
			backgroundColor: '#52d8fd',
		},
		'&.Fa': {
			backgroundColor: '#ffc943',
		},
		'&.To': {
			backgroundColor: '#ff9d4b',
		},
		'&.Te': {
			color: theme.palette.primary.contrastText,
			backgroundColor: '#9e57ff',
		},
		'&.Sw': {
			backgroundColor: '#ffe0e1',
		},
		'&.Ha': {
			backgroundColor: '#90ee71',
		},
		'&.Hi': {
			color: theme.palette.primary.contrastText,
			backgroundColor: '#2c6aff',
		},
		'&.St': {
			backgroundColor: '#9e93ff',
		},
		'&.Ma': {
			backgroundColor: '#c5b2fe',
		},
		'&.He': {
			backgroundColor: '#b9f8ff',
		},
		'&.mother': {
			color: theme.palette.primary.contrastText,
			backgroundColor: '#dd7165',
		},
	},
}));

/** 対象世代の限界点 */
const limit = 5;
const construct =
	(map: Map<string, HorseDef>) =>
	(def: HorseDef): PedigreeNode[][] => {
		const table = new Array<PedigreeNode[]>();

		for (let row = 0; row < 2 ** (limit - 1); ++row) {
			const cols = new Array<PedigreeNode>();
			for (let col = 0; col < limit; ++col) {
				cols.push({ name: 'empty', generation: col, show: false, line: 'Uk' });
			}
			table.push(cols);
		}

		const mapPedigree = (row: number, col: number, def: HorseDef) => {
			table[row][col] = {
				name: def.name,
				generation: col,
				show: !!def.show,
				line: def.line,
			};

			if (col + 1 < limit) {
				if (def.fatherName) {
					const father = map.get(def.fatherName);
					if (father) {
						mapPedigree(row, col + 1, father);
					} else {
						mapPedigree(row, col + 1, {
							name: def.fatherName,
							sex: 'male',
							line: 'Uk',
							listed: false,
							show: true,
							owned: false,
							memo: ['未定義'],
						});
					}
				}
				if (def.motherName) {
					const mother = map.get(def.motherName);
					if (mother) {
						mapPedigree(row + 2 ** (limit - col - 2), col + 1, mother);
					} else {
						mapPedigree(row + 2 ** (limit - col - 2), col + 1, {
							name: def.motherName,
							sex: 'female',
							line: 'Uk',
							listed: false,
							show: true,
							owned: false,
							memo: ['未定義'],
						});
					}
				}
			}
		};

		mapPedigree(0, 0, def);
		return table;
	};

const renderCell = (
	row: number,
	col: number,
	cell: PedigreeNode
): JSX.Element => {
	const threshold = 2 ** (limit - col - 2);
	const className = [
		'cell',
		!cell.show ? 'empty' : cell.line,
		col === 0 && row === 2 ** (limit - 2) ? ['mother'] : [],
	]
		.flatMap((x) => x)
		.join(' ');
	return (
		<React.Fragment key={`col-${col}`}>
			{row % threshold === 0 ? (
				<TableCell rowSpan={threshold} className={className}>
					{cell.show ? (
						<Typography variant="body2">{cell.name}</Typography>
					) : null}
				</TableCell>
			) : null}
		</React.Fragment>
	);
};

const renderLine = (line: Line): JSX.Element => {
	return line !== 'Uk' ? (
		<TableCell
			key={`col-line`}
			className={['cell', line].join(' ')}
			rowSpan={2}
		>
			<Typography variant="body2">{lineMap[line].label}系</Typography>
		</TableCell>
	) : (
		<TableCell
			key={`col-line`}
			className={['cell', 'empty'].join(' ')}
			rowSpan={2}
		/>
	);
};

const render = (data: PedigreeNode[][]): JSX.Element => {
	return (
		<React.Fragment>
			{data.map((cols, row) => (
				<TableRow key={`row-${row}`}>
					{cols
						.filter((_, ix) => ix > 0)
						.map((cell, col) => renderCell(row, col, cell))}
					{row % 2 === 0 ? renderLine(cols[cols.length - 1].line) : null}
				</TableRow>
			))}
		</React.Fragment>
	);
};

export const PedigreeTable: React.FC<PedigreeTableProps> = ({ def }) => {
	const defs = useAppSelector((state) => state.horseDefs.list);
	const map = useMemo(
		() =>
			defs.reduce(
				(map, def) => map.set(def.name, def),
				new Map<string, (typeof defs)[number]>()
			),
		[defs]
	);

	const array = construct(map)(def);

	return (
		<TableContainer component={Paper}>
			<StyledTable size="small">
				<TableBody>{render(array)}</TableBody>
			</StyledTable>
		</TableContainer>
	);
};
