import { makeStyles, createStyles, Theme, IconButton } from '@material-ui/core';
import { TreeItem, TreeView } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import RemoveIcon from '@material-ui/icons/Remove';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faQuestion, faVenus } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'src/app';
import { withIndicatorSync } from 'src/util';

import { HorseDef } from 'src/features/horse-defs';
import { pedigreeActions } from 'src/features/pedigree';

type Datum = {
	id: string;
	label: JSX.Element;
	className?: string;
	children: Datum[];
	fatherName?: string;
	motherName?: string;
	owned: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& .name': {
				marginLeft: theme.spacing(0.5),
			},
			'& .father': {
				marginLeft: theme.spacing(1),
			},
			'& .male': {
				color: '#2196f3',
			},
			'& .female': {
				color: '#f44336',
			},
			'& .unknown': {
				color: '#888888',
			},
		},
	})
);

const InformationIcon: React.FC<{ name: string }> = ({ name }) => {
	const dispatch = useDispatch();
	const handleClick = useMemo(
		() => () => {
			dispatch(pedigreeActions.push(name));
		},
		[dispatch, name]
	);

	return (
		<IconButton aria-label="horse info" size="small" onClick={handleClick}>
			<InfoOutlinedIcon fontSize="inherit" />
		</IconButton>
	);
};

const setNodeProperty = (node: Datum, def: HorseDef) => {
	node.owned = node.owned || def.owned;
	node.className = [def.sex].join(' ');
	node.label = (
		<React.Fragment>
			{(() => {
				switch (def.sex) {
					case 'male':
						return <FontAwesomeIcon icon={faMars} />;
					case 'female':
						return <FontAwesomeIcon icon={faVenus} />;
					case 'unknown':
						return <FontAwesomeIcon icon={faQuestion} />;
					default: {
						const __exhaust: never = def.sex; // eslint-disable-line @typescript-eslint/no-unused-vars
					}
				}
			})()}
			<span className="name">
				{def.name}
				<InformationIcon name={def.name} />
			</span>
			{def.fatherName ? (
				<React.Fragment>
					(
					<span className="father male">
						{def.fatherName}
						<InformationIcon name={def.fatherName} />
					</span>
					)
				</React.Fragment>
			) : null}
		</React.Fragment>
	);
	node.fatherName = def.fatherName ?? node.fatherName;
	node.motherName = def.motherName ?? node.fatherName;
};

const construct = (defs: HorseDef[]): { nodes: Datum[]; ids: string[] } => {
	const map = new Map<string, Datum>();

	const fetchOrCreateNode = (id: string) =>
		map.get(id) ??
		(() => {
			// 新規
			const created: Datum = {
				id,
				label: <React.Fragment />,
				children: [],
				owned: false,
			};
			map.set(id, created);
			return created;
		})();

	const append = (def: HorseDef) => {
		const node = fetchOrCreateNode(def.name);

		setNodeProperty(node, def);

		if (def.motherName) {
			const mother = fetchOrCreateNode(def.motherName);
			mother.children.push(node);
		}
	};

	defs.forEach(append);
	return {
		nodes: Array.from(map.values()).filter(
			(value) =>
				// 所有場であることは絶対条件
				value.owned &&
				// 母の名前がわからないか
				(!value.motherName ||
					// 母が登録されていないか
					!map.has(value.motherName) ||
					// 母はいるけど所有場でないか
					(map.has(value.motherName) && !map.get(value.motherName)?.owned))
		),
		ids: Array.from(map.keys()),
	};
};

const renderTree = (toggleExpand: (node: Datum) => React.MouseEventHandler) =>
	function MareLineTreeNode(node: Datum) {
		return (
			<TreeItem
				className={node.className}
				key={node.id}
				nodeId={node.id}
				label={node.label}
				onIconClick={toggleExpand(node)}
			>
				{node.children.map(renderTree(toggleExpand))}
			</TreeItem>
		);
	};

export const MareLineTree: React.FC = function MareLineTree() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [expanded, setExpanded] = useState<string[]>([]);

	const defs = useSelector((state: RootState) => state.horseDefs.list);
	const { nodes, ids } = useMemo(() => {
		if (defs.length > 0) {
			return withIndicatorSync(dispatch)('mare-line/init')(() =>
				construct(defs)
			);
		} else {
			return { nodes: [], ids: [] };
		}
	}, [dispatch, defs]);

	useEffect(() => {
		setExpanded(ids);
	}, [setExpanded, ids]);

	const toggleExpand = useMemo<(node: Datum) => React.MouseEventHandler>(
		() => (node) => (_event) => {
			setExpanded(
				expanded.includes(node.id)
					? expanded.filter((id) => id !== node.id)
					: [...expanded, node.id]
			);
		},
		[expanded, setExpanded]
	);

	return (
		<React.Fragment>
			<TreeView
				className={classes.root}
				expanded={expanded}
				defaultCollapseIcon={<ExpandMoreIcon />}
				defaultExpandIcon={<ChevronRightIcon />}
				defaultEndIcon={<RemoveIcon />}
			>
				{nodes.map(renderTree(toggleExpand))}
			</TreeView>
		</React.Fragment>
	);
};
