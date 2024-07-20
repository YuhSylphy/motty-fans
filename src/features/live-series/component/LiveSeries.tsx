import React, {
	Suspense,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import {
	useAppDispatch,
	useAppSelector,
	useValueWithMediaQuery,
} from 'src/util';
import { liveSeriesActions } from '..';
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
	// Theme,
	Typography,
	styled,
	// useMediaQuery,
} from '@mui/material';
import { Search as SearchIcon, Link as LinkIcon } from '@mui/icons-material';
import { LiveStyle, convertLiveStyleToLabel } from '../core/jsonTypes';
import { Thumbnail } from 'src/features/videos/core/jsonTypes';

function Loader() {
	return <div>Loading...</div>;
}

interface LiveSeriesRecord {
	id: string;
	platform: string;
	title: string;
	titleReleasedIn: number | string | null;
	style: LiveStyle | null;
	amount: number;
	masteryLevel: 0 | 1 | 2 | 3 | 4 | 5;
	part1: {
		publishedIn: number;
		url: string;
		thumbnail: Thumbnail;
		title: string;
	} | null;
	remarks: string;
}

const masteryLevelLabel = (masteryLevel: LiveSeriesRecord['masteryLevel']) =>
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

function Thumbs({ thumbnail: { url, width, height }, href, alt }: ThumbsProps) {
	return (
		<Link
			href={href}
			sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
			target="_blank"
			rel="noopener noreferrer"
		>
			<Box
				component="img"
				alt={alt}
				src={url}
				sx={(_theme) => ({
					maxHeight: '100%',
					aspectRatio: `${width} / ${height}`,
					display: 'block',
				})}
			/>
		</Link>
	);
}

function LiveSeriesListItem({
	id,
	platform,
	title,
	titleReleasedIn,
	style,
	amount,
	masteryLevel,
	part1,
	remarks,
}: LiveSeriesRecord) {
	const Details = useCallback(
		() => (
			<Grid container>
				<Grid item xs={6}>
					<Typography>{convertLiveStyleToLabel(style)}</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography>{masteryLevelLabel(masteryLevel)}</Typography>
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
		[amount, masteryLevel, part1, platform, remarks, style, titleReleasedIn]
	);

	return (
		<ListItem
			key={id}
			secondaryAction={
				<IconButton edge="end" {...(part1 !== null ? { href: part1.url } : {})}>
					<LinkIcon />
				</IconButton>
			}
		>
			<Grid container>
				<Grid item xs={12}>
					<ListItemText primary={title} />
				</Grid>
				<Grid item xs={4}>
					{part1 == null ? null : (
						<Thumbs
							thumbnail={part1.thumbnail}
							href={part1.url}
							alt={part1.title}
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
		style,
		amount,
		masteryLevel,
		part1,
		remarks,
	}: LiveSeriesRecord,
	ix: number
) {
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
					<Thumbs thumbnail={part1.thumbnail} alt={title} href={part1.url} />
				</TableCell>
			),
		[part1, title]
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
				<Typography>{convertLiveStyleToLabel(style)}</Typography>
			</TableCell>
			<TableCell align="center">
				<Typography>{amount}</Typography>
			</TableCell>
			<TableCell align="center">
				<Typography>{masteryLevelLabel(masteryLevel)}</Typography>
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
	const { series } = useAppSelector((state) => state.liveSeries);
	const defs = useMemo(
		() =>
			series.map(
				({ id, game, seriesTitle, lives, remarks }) =>
					({
						id,
						platform: game?.platform,
						title: seriesTitle,
						titleReleasedIn: game?.releasedIn || null,
						style:
							lives.map(({ liveStyle }) => liveStyle).find((_) => true) ?? null,
						amount: lives.length,
						masteryLevel: game?.masteryLevel,
						part1:
							lives.length === 0
								? null
								: lives
										.slice(0, 1)
										.map(({ publishedAt, url, thumbnail, title }) => ({
											publishedIn: publishedAt.year,
											url,
											thumbnail,
											title,
										}))[0],
						remarks,
					}) as LiveSeriesRecord
			),
		[series]
	);

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

// const useLiveSeriesConditionFormHooks = () => {
// };

function LiveSeriesConditionForm() {
	// const {} = useLiveSeriesConditionFormHooks();
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

	const { series } = useAppSelector((state) => state.liveSeries);
	const loading = useMemo(() => !series || series.length === 0, [series]);

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
