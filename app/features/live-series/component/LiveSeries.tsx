import React, {
	ComponentProps,
	Suspense,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';

import {
	AppBar,
	Box,
	Container,
	Divider,
	Grid,
	IconButton,
	InputAdornment,
	Link,
	List,
	ListItem,
	ListItemText,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Theme,
	// Theme,
	Typography,
	styled,
	// useMediaQuery,
} from '@mui/material';
import { Search as SearchIcon, Link as LinkIcon } from '@mui/icons-material';

import { useAppDispatch, useAppSelector, useValueWithMediaQuery } from '~/util';

import { liveSeriesActions } from '..';
import { Thumbnail } from '~/features/videos/core/types/videos';
import { LiveStyle } from '~/features/videos/core/types';
import { convertLiveStyleToLabel } from '~/features/videos/core/types/utils';
import { LiveSeriesRecord } from '../core/logic';

// TODO: レイアウト調整

function Loader() {
	return <div>Loading...</div>;
}

const convertMasteryLevelToLabel = (
	masteryLevel: LiveSeriesRecord['masteryLevel']
) =>
	[
		// 0~5
		'★'.repeat(masteryLevel),
		'☆'.repeat(5 - masteryLevel),
	]
		.join('')
		.trim();

interface LiveSeriesListProps {
	defs: LiveSeriesRecord[];
}

interface ThumbsProps {
	href: string;
	alt: string;
	thumbnail: Thumbnail;
}

const ThumbsStyledImg = styled('img')((_theme) => ({
	objectFit: 'cover',
}));

function Thumbs({ thumbnail: { url, width, height }, href, alt }: ThumbsProps) {
	const additional = useValueWithMediaQuery({
		xs: (theme: Theme) => ({ maxHeight: theme.spacing(9) }),
		sm: (theme: Theme) => ({ maxHeight: theme.spacing(9) }),
		md: (theme: Theme) => ({ maxHeight: theme.spacing(6) }),
		lg: (theme: Theme) => ({ maxHeight: theme.spacing(6) }),
		xl: (theme: Theme) => ({ maxHeight: theme.spacing(6) }),
	} as const);
	const aspectRatio = useMemo(() => `${width} / ${height}`, [width, height]);
	return (
		<Link
			href={href}
			sx={(theme) => ({
				width: '100%',
				height: '100%',
				overflow: 'hidden',

				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				alignContent: 'center',

				...additional(theme),
			})}
			target="_blank"
			rel="noopener noreferrer"
		>
			<ThumbsStyledImg sx={{ aspectRatio }} alt={alt} src={url} />
		</Link>
	);
}
function convertStylesToLabel(styles: (LiveStyle | null)[]) {
	const converted = styles.map(convertLiveStyleToLabel);
	switch (converted.length) {
		case 0:
			return null;
		case 1:
			return converted[0];
		default:
			return converted.map((x) => x?.slice(0, 1)).join(' / ');
	}
}

const useLiveSeriesListItemHooks = ({
	styles,
	masteryLevel,
	part1,
	href,
}: Pick<LiveSeriesRecord, 'styles' | 'masteryLevel' | 'part1' | 'href'>) => {
	const liveStyleLabel = useMemo(() => convertStylesToLabel(styles), [styles]);
	const masteryLevelLabel = useMemo(
		() => convertMasteryLevelToLabel(masteryLevel),
		[masteryLevel]
	);

	const iconButtonAdditionalProps =
		href !== null
			? { href, target: '_blank', rel: 'noopener noreferrer' }
			: part1 !== null && part1.url != null
				? { href: part1.url, target: '_blank', rel: 'noopener noreferrer' }
				: {};

	return { liveStyleLabel, masteryLevelLabel, iconButtonAdditionalProps };
};

function LiveSeriesListItem({
	id,
	platform,
	title,
	titleReleasedIn,
	styles,
	amount,
	masteryLevel,
	part1,
	remarks,
	href,
}: LiveSeriesRecord) {
	const { liveStyleLabel, masteryLevelLabel, iconButtonAdditionalProps } =
		useLiveSeriesListItemHooks({
			styles,
			masteryLevel,
			part1,
			href,
		});

	const Details = useCallback(
		() => (
			<Grid container>
				<Grid item xs={6}>
					<Typography>{liveStyleLabel}</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography>{masteryLevelLabel}</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography>{platform}</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography>実況: {part1?.publishedIn ?? '(未設定)'}</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography>配信数: {amount}</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography>発売: {titleReleasedIn ?? '(未設定)'}</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography>{remarks}</Typography>
				</Grid>
			</Grid>
		),
		[
			liveStyleLabel,
			masteryLevelLabel,
			platform,
			part1?.publishedIn,
			amount,
			titleReleasedIn,
			remarks,
		]
	);

	return (
		<ListItem
			key={id}
			secondaryAction={
				<IconButton edge="end" {...iconButtonAdditionalProps}>
					<LinkIcon />
				</IconButton>
			}
		>
			<Grid container>
				<Grid item xs={12}>
					<ListItemText primary={title} />
				</Grid>
				<Grid item xs={4}>
					{part1 == null || !iconButtonAdditionalProps.href ? (
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							height="100%"
						>
							<Typography>(未設定)</Typography>
						</Box>
					) : (
						<Thumbs
							thumbnail={part1.thumbnail}
							alt={part1.title}
							{...iconButtonAdditionalProps}
						/>
					)}
				</Grid>
				<Grid item xs={8}>
					<Details />
				</Grid>
			</Grid>
		</ListItem>
	);
}

function LiveSeriesList({ defs }: LiveSeriesListProps) {
	return (
		<Paper>
			<List sx={{ width: '100%' }}>
				{defs
					.map(LiveSeriesListItem)
					// 間に挟み込む
					.flatMap((li, ix) =>
						ix === 0
							? [li]
							: [
									<Divider
										key={`divider-${ix}`}
										variant="inset"
										component="li"
										sx={{ marginLeft: 0 }}
									/>,
									li,
								]
					)}
			</List>
		</Paper>
	);
}

interface LiveSeriesTableProps {
	defs: LiveSeriesRecord[];
}

function LiveSeriesTableRow(
	{
		id,
		platform,
		title,
		titleReleasedIn,
		styles,
		amount,
		masteryLevel,
		part1,
		remarks,
		href,
	}: LiveSeriesRecord,
	ix: number
) {
	const liveStyleLabel = useMemo(() => convertStylesToLabel(styles), [styles]);

	const UrlLinkColumn = useCallback(
		() =>
			!part1 ? (
				<TableCell align="center">
					<Typography>(未設定)</Typography>
				</TableCell>
			) : (
				<TableCell
					align="center"
					sx={(theme) => ({
						padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
					})}
				>
					<Thumbs
						thumbnail={part1.thumbnail}
						alt={title}
						href={href ? href : part1.url}
					/>
				</TableCell>
			),
		[part1, title, href]
	);

	return (
		<TableRow
			key={id}
			sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
		>
			<TableCell component="th" scope="row" align="center">
				<Typography>{ix + 1}</Typography>
			</TableCell>
			<UrlLinkColumn />
			<TableCell align="center">
				<Typography>{platform}</Typography>
			</TableCell>
			<TableCell>
				<Typography>{title}</Typography>
			</TableCell>
			<TableCell align="center">
				<Typography>{part1?.publishedIn ?? '(未設定)'}</Typography>
			</TableCell>
			<TableCell align="center">
				<Typography>{titleReleasedIn ?? '(未設定)'}</Typography>
			</TableCell>
			<TableCell align="center">
				<Typography>{liveStyleLabel}</Typography>
			</TableCell>
			<TableCell align="center">
				<Typography>{amount}</Typography>
			</TableCell>
			<TableCell align="center">
				<Typography>{convertMasteryLevelToLabel(masteryLevel)}</Typography>
			</TableCell>
			<TableCell>
				<Typography>{remarks}</Typography>
			</TableCell>
		</TableRow>
	);
}

function LiveSeriesTable({ defs }: LiveSeriesTableProps) {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						{[
							'#',
							'Part 1.',
							'機種',
							'タイトル',
							'実況年',
							'発売年',
							'実況形式',
							'実況本数',
							'やりこみ評価',
							'備考',
						].map((title, ix) => (
							<TableCell key={ix} component="th" scope="row" align="center">
								{title}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>{defs.map(LiveSeriesTableRow)}</TableBody>
			</Table>
		</TableContainer>
	);
}

function LiveSeriesHeader() {
	return (
		<AppBar position="static" color="primary" enableColorOnDark>
			<Typography variant="subtitle1">MOTTYのゲーム実況シリーズ一覧</Typography>
		</AppBar>
	);
}

const useLiveSeriesBodyHooks = () => {
	const { displayRecords: defs } = useAppSelector((state) => state.liveSeries);

	const viewMode = useValueWithMediaQuery({
		xs: 'list',
		sm: 'list',
		md: 'table',
		lg: 'table',
		xl: 'table',
	} as const);

	return { viewMode, defs };
};

function LiveSeriesBody() {
	const { viewMode, defs } = useLiveSeriesBodyHooks();
	const Body = useCallback(() => {
		switch (viewMode) {
			case 'list':
				return <LiveSeriesList defs={defs} />;
			case 'table':
				return <LiveSeriesTable defs={defs} />;
			default: {
				const _exhaust: never = viewMode;
				throw _exhaust;
			}
		}
	}, [viewMode, defs]);

	return (
		<React.Fragment>
			<LiveSeriesHeader />
			<Body />
		</React.Fragment>
	);
}

const LiveSeriesConditionFormPaper = styled(Paper)(({ theme }) => ({
	marginTop: theme.spacing(1),
	marginBottom: theme.spacing(1),
	padding: theme.spacing(1),
}));

const useLiveSeriesConditionFormHooks = () => {
	const dispatch = useAppDispatch();
	const [conditionTextInput, setConditionTextInput] = useState<string>('');

	const updateTextInput = useCallback<
		Exclude<ComponentProps<typeof TextField>['onChange'], undefined>
	>(
		({ target: { value: conditionText } }) => {
			setConditionTextInput(conditionText);
			dispatch(liveSeriesActions.setConditionText({ conditionText }));
		},
		[dispatch]
	);

	return { conditionTextInput, updateTextInput };
};

function LiveSeriesConditionForm() {
	// TODO: 絞り込み/並べ替え機能実装
	const { conditionTextInput, updateTextInput } =
		useLiveSeriesConditionFormHooks();
	return (
		<Container>
			<LiveSeriesConditionFormPaper>
				<TextField
					id="live-series-condition-input"
					label="find"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
					variant="standard"
					fullWidth
					value={conditionTextInput}
					onChange={updateTextInput}
				/>
			</LiveSeriesConditionFormPaper>
		</Container>
	);
}

/**
 * コンテナ用user hooks
 */
const useLiveSeriesContainerHooks = () => {
	const [intialized, setInitialized] = useState(false);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (intialized) return;

		dispatch(liveSeriesActions.init());
		setInitialized(true);
	}, [intialized, setInitialized, dispatch]);

	const { records } = useAppSelector((state) => state.liveSeries);
	const loading = useMemo(() => !records || records.length === 0, [records]);

	return { loading };
};

/**
 * 実況シリーズ一覧コンテナ
 */
function LiveSeriesContainer() {
	const { loading } = useLiveSeriesContainerHooks();
	return loading ? (
		<Loader />
	) : (
		<React.Fragment>
			<LiveSeriesConditionForm />
			<LiveSeriesBody />
		</React.Fragment>
	);
}

/**
 * 実況シリーズ一覧ページ
 */
export function LiveSeries() {
	return (
		<Suspense fallback={<Loader />}>
			<LiveSeriesContainer />
		</Suspense>
	);
}
