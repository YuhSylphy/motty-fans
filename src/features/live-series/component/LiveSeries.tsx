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
	Container,
	Divider,
	Grid,
	IconButton,
	InputAdornment,
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
import { DateTime } from 'luxon';

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
		publishedAt: DateTime;
		url: string;
		thumbnail: Thumbnail;
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

function LiveSeriesList({ defs }: LiveSeriesListProps) {
	return (
		<Paper>
			<List sx={{ width: '100%' }}>
				{defs
					.map(
						({
							id,
							platform,
							title,
							titleReleasedIn,
							style,
							amount,
							masteryLevel,
							part1,
							remarks,
						}) => (
							<ListItem
								key={id}
								secondaryAction={
									<IconButton
										edge="end"
										{...(part1 !== null ? { href: part1.url } : {})}
									>
										<LinkIcon />
									</IconButton>
								}
							>
								<ListItemText
									primary={title}
									secondary={
										<Grid container>
											<Grid item xs={4}>
												<Typography>
													{convertLiveStyleToLabel(style)}
												</Typography>
											</Grid>
											<Grid item xs={4}>
												<Typography>{platform}</Typography>
											</Grid>
											<Grid item xs={4}>
												<Typography>配信数: {amount}</Typography>
											</Grid>
											<Grid item xs={4}>
												<Typography>
													{masteryLevelLabel(masteryLevel)}
												</Typography>
											</Grid>
											<Grid item xs={4}>
												<Typography>
													実況: {part1?.publishedAt?.year}
												</Typography>
											</Grid>
											<Grid item xs={4}>
												<Typography>発売: {titleReleasedIn}</Typography>
											</Grid>
											<Grid item xs={12}>
												<Typography>{remarks}</Typography>
											</Grid>
										</Grid>
									}
								/>
							</ListItem>
						)
					)
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

function LiveSeriesTable({ defs }: LiveSeriesTableProps) {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell component="th" scope="row">
							#
						</TableCell>
						<TableCell>機種</TableCell>
						<TableCell>タイトル</TableCell>
						<TableCell>実況年</TableCell>
						<TableCell>発売年</TableCell>
						<TableCell>形式</TableCell>
						<TableCell>本数</TableCell>
						<TableCell>やりこみ</TableCell>
						<TableCell>Part1 URL</TableCell>
						<TableCell>備考</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{defs.map(
						(
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
							},
							ix
						) => (
							<TableRow
								key={id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{ix + 1}
								</TableCell>
								<TableCell>{platform}</TableCell>
								<TableCell>{title}</TableCell>
								<TableCell>{part1?.publishedAt?.year}</TableCell>
								<TableCell>{titleReleasedIn}</TableCell>
								<TableCell>{convertLiveStyleToLabel(style)}</TableCell>
								<TableCell>{amount}</TableCell>
								<TableCell>{masteryLevelLabel(masteryLevel)}</TableCell>
								<TableCell>{part1?.url}</TableCell>
								<TableCell>{remarks}</TableCell>
							</TableRow>
						)
					)}
				</TableBody>
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
	// const dummy = useMemo<LiveSeriesRecord>(
	// 	() => ({
	// 		id: 'dummy',
	// 		platform: 'Switch',
	// 		title: 'ソリティ馬 Ride On!',
	// 		livePublishedIn: 2024,
	// 		titleReleasedIn: 2024,
	// 		style: 'broadcast',
	// 		amount: 29,
	// 		masteryLevel: 3,
	// 		partOneUrl: 'https://foo.bar.example.com/awesomeHash',
	// 		remarks: 'ゲーフリ',
	// 	}),
	// 	[]
	// );

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
								: lives.slice(0, 1).map(({ publishedAt, url, thumbnail }) => ({
										publishedAt,
										url,
										thumbnail,
									}))[0],
						remarks,
					}) as LiveSeriesRecord
			),
		[series]
	);

	console.info(defs);

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
		console.info('debug', intialized);
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
