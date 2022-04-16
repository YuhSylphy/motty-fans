import { IconButton } from '@mui/material';
import { TreeItem, TreeView } from '@mui/lab';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RemoveIcon from '@mui/icons-material/Remove';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faQuestion, faVenus } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector, withIndicatorSync } from 'src/util';

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

const StyledTreeView = styled(TreeView)(({ theme }) => ({
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
}));

const InformationIcon: React.FC<{ name: string }> = ({ name }) => {
	const dispatch = useAppDispatch();
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
				// 所有馬であることは絶対条件
				value.owned &&
				// 母の名前がわからないか
				(!value.motherName ||
					// 母が登録されていないか
					!map.has(value.motherName) ||
					// 母はいるけど所有馬でないか
					(map.has(value.motherName) && !map.get(value.motherName)?.owned))
		),
		ids: Array.from(map.keys()),
	};
};

type MareLineTreeNodeProps = {
	node: Datum;
	toggleExpand: (node: Datum) => React.MouseEventHandler;
};

function MareLineTreeNode({ node, toggleExpand }: MareLineTreeNodeProps) {
	const onIconClick = toggleExpand(node);
	return (
		<TreeItem
			className={node.className}
			key={node.id}
			nodeId={node.id}
			label={node.label}
			collapseIcon={<ExpandMoreIcon onClick={onIconClick} />}
			expandIcon={<ChevronRightIcon onClick={onIconClick} />}
			endIcon={<RemoveIcon />}
		>
			{node.children
				.map((node) => ({ node, toggleExpand }))
				.map(MareLineTreeNode)}
		</TreeItem>
	);
}

export const MareLineTree: React.FC = function MareLineTree() {
	const dispatch = useAppDispatch();
	const [expanded, setExpanded] = useState<string[]>([]);

	const defs = useAppSelector((state) => state.horseDefs.list);
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
		<StyledTreeView
			expanded={expanded}
			defaultCollapseIcon={<ExpandMoreIcon />}
			defaultExpandIcon={<ChevronRightIcon />}
			defaultEndIcon={<RemoveIcon />}
		>
			{nodes.map((node) => ({ node, toggleExpand })).map(MareLineTreeNode)}
		</StyledTreeView>
	);
};
