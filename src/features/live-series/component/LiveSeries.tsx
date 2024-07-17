import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector, useValueWithMediaQuery } from 'src/util';
import { liveSeriesActions } from '..';
import { AppBar, Container, Divider, Grid, IconButton, InputAdornment, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Theme, Typography, styled, useMediaQuery } from '@mui/material';
import {
	Search as SearchIcon,
	Link as LinkIcon,
} from '@mui/icons-material';


function Loader() {
	return <div>Loading...</div>;
}

interface LiveSeriesRecord {
	id: string;
	platform: string;
	title: string;
	livePublishedIn: number;
	titleSoldIn: number;
	style: 'video' | 'broadcast';
	amount: number;
	masteryLevel: 0|1|2|3|4|5;
	partOneUrl: string;
	remarks: string;
}

const styleLabel = (style: LiveSeriesRecord['style']) => {
	switch(style) {
		case 'broadcast': return '生配信';
		case 'video': return '動画';
		default: const _exhaust: never = style; throw style;
	}
};

const masteryLevelLabel = (masteryLevel: LiveSeriesRecord['masteryLevel']) => [
	// FIXME: 範囲外ケア
	"★".repeat(masteryLevel),
	"☆".repeat(5 - masteryLevel),
].join("").trim();

interface LiveSeriesListProps {
	defs: LiveSeriesRecord[]
}

function LiveSeriesList({ defs }: LiveSeriesListProps) {
	return (
		<Paper>
			<List sx={{ width: '100%' }}>
				{
					defs.map(({ id, platform, title, livePublishedIn, titleSoldIn, style, amount, masteryLevel, partOneUrl, remarks }, ix) =>
						<ListItem
							key={id}
							secondaryAction={
								<IconButton edge="end" href={partOneUrl}>
									<LinkIcon />
								</IconButton>
							}
						>
							<ListItemText
								primary={title}
								secondary={
									<Grid container>
										<Grid item xs={4}><Typography>{styleLabel(style)}</Typography></Grid>
										<Grid item xs={4}><Typography>{platform}</Typography></Grid>
										<Grid item xs={4}><Typography>配信数: {amount}</Typography></Grid>
										<Grid item xs={4}><Typography>{masteryLevelLabel(masteryLevel)}</Typography></Grid>
										<Grid item xs={4}><Typography>実況: {livePublishedIn}</Typography></Grid>
										<Grid item xs={4}><Typography>発売: {titleSoldIn}</Typography></Grid>
										<Grid item xs={12}><Typography>{remarks}</Typography></Grid>
									</Grid>
								}
							/>
						</ListItem>
					)
						// 間に挟み込む
						.flatMap((li, ix) => ix === 0 ? [li] : [<Divider variant="inset" component="li" sx={{marginLeft: 0}}/>, li])
				}
			</List>
		</Paper>
	);
}

interface LiveSeriesTableProps {
	defs: LiveSeriesRecord[]
}

function LiveSeriesTable({ defs }: LiveSeriesTableProps) {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
							<TableCell component="th" scope="row">#</TableCell>
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
					{defs.map(({ id, platform, title, livePublishedIn, titleSoldIn, style, amount, masteryLevel, partOneUrl, remarks }, ix) => (
						<TableRow
							key={id}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">{ix + 1}</TableCell>
							<TableCell>{platform}</TableCell>
							<TableCell>{title}</TableCell>
							<TableCell>{livePublishedIn}</TableCell>
							<TableCell>{titleSoldIn}</TableCell>
							<TableCell>{styleLabel(style)}</TableCell>
							<TableCell>{amount}</TableCell>
							<TableCell>{masteryLevelLabel(masteryLevel)}</TableCell>
							<TableCell>{partOneUrl}</TableCell>
							<TableCell>{remarks}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

function LiveSeriesHeader() {
	return <AppBar position="static" color="primary" enableColorOnDark>
		<Typography variant='subtitle1'>MOTTYのゲーム実況シリーズ一覧</Typography>
	</AppBar>
}

const useLiveSeriesBodyHooks = () => {
	const dummy = useMemo<LiveSeriesRecord>(() => ({
		id: "dummy",
		platform: 'Switch',
		title: "ソリティ馬 Ride On!",
		livePublishedIn: 2024,
		titleSoldIn: 2024,
		style: 'broadcast',
		amount: 29,
		masteryLevel: 3,
		partOneUrl: "https://foo.bar.example.com/awesomeHash",
		remarks: "ゲーフリ",
	}), []);
	const defs = useMemo(() => [dummy, dummy, dummy], [dummy]);

	const mode = useValueWithMediaQuery({
		'xs': 'list',
		'sm': 'list',
		'md': 'table',
		'lg': 'table',
		'xl': 'table',
	} as const);

	return { mode, defs };
}

function LiveSeriesBody() {
	const { mode, defs } = useLiveSeriesBodyHooks();
	const body = useMemo(() => {
		switch (mode) {
			case 'list': return <LiveSeriesList defs={defs} />
			case 'table': return <LiveSeriesTable defs={defs} />
			default: const _exhaust: never = mode; throw _exhaust;
		}
	}, [mode, defs]);

	return <React.Fragment>
		<LiveSeriesHeader />
		{body}
	</React.Fragment>;
}

const LiveSeriesConditionFormPaper = styled(Paper)(({ theme }) => ({
	marginTop: theme.spacing(1),
	marginBottom: theme.spacing(1),
	padding: theme.spacing(1),
}));

const useLiveSeriesConditionFormHooks = () => {
	return {};
}

function LiveSeriesConditionForm() {
	const {} = useLiveSeriesConditionFormHooks();
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
	const [toBeInitialized, setToBeInitialized] = useState(true);

	const dispatch = useAppDispatch();
	const {
		loaded,
		list,
	} = useAppSelector((state) => state.videos);

	useEffect(() => {
		if (toBeInitialized) {
			dispatch(liveSeriesActions.init());
			setToBeInitialized(false);
		}
	}, [toBeInitialized, setToBeInitialized, dispatch]);

	const loading = useMemo(() => false, []);

	return { loading };
}

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
