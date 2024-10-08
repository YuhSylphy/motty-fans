import React, {
	Suspense,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useParams } from 'react-router';

import {
	Autocomplete,
	Box,
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Chip,
	Container,
	Grid,
	IconButton,
	Paper,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/';

import SearchIcon from '@mui/icons-material/Search';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { DateTime } from 'luxon';
import InfiniteScroll from 'react-infinite-scroll-component';
import { animateScroll } from 'react-scroll';

import { useAppDispatch, useAppSelector, useValueWithMediaQuery } from '~/util';

import { videosActions } from '..';
import { VideoDef } from '../core/fetch/videos';
import { VideoTag } from '../core/types';
import { defaultStyledTag } from '../core/types/utils';

const showImage = true;

const createVideoUrl = (videoId: string) =>
	`https://www.youtube.com/watch?v=${videoId}`;

function Loader() {
	return <div>Loading...</div>;
}

type VideoCardProps = {
	def: VideoDef;
};

const TitleStyledTypography = styled(Typography)({
	display: '-webkit-box',
	overflow: 'hidden',
	lineClamp: 2,
	WebkitLineClamp: 2,
	boxOrient: 'vertical',
	WebkitBoxOrient: 'vertical',
	fontSize: '.9rem',
});

function TitleTypography(props: React.ComponentProps<typeof Typography>) {
	return (
		<Tooltip title={props.children ?? ''}>
			<TitleStyledTypography {...props} gutterBottom variant="h6" />
		</Tooltip>
	);
}

function PublishedAtTypography(props: React.ComponentProps<typeof Typography>) {
	return (
		<Tooltip title={props.children ?? ''}>
			<Typography
				{...props}
				variant="body2"
				color="text.secondary"
				align="right"
			/>
		</Tooltip>
	);
}

const DescriptionStyledTypography = styled(Typography)({
	display: '-webkit-box',
	overflow: 'hidden',
	lineClamp: 3,
	WebkitLineClamp: 3,
	boxOrient: 'vertical',
	WebkitBoxOrient: 'vertical',
	fontSize: '.75rem',
});

function DescriptionTypography(props: React.ComponentProps<typeof Typography>) {
	return (
		<Tooltip title={props.children ?? ''}>
			<DescriptionStyledTypography {...props} variant="body2" />
		</Tooltip>
	);
}

type LinkToMovieButtonProps = {
	videoId: string;
};

function LinkToMovieButton({ videoId }: LinkToMovieButtonProps) {
	return (
		<Button
			href={createVideoUrl(videoId)}
			target="_blank"
			referrerPolicy="no-referrer"
		>
			Watch
		</Button>
	);
}

const RightAlignedCardActions = styled(CardActions)({
	justifyContent: 'right',
});

type VideoThumbnailProps = {
	alt: string;
	imageUrl: string;
	videoId: string;
};

function VideoThumbnail({ imageUrl, alt, videoId }: VideoThumbnailProps) {
	return (
		<CardActionArea
			href={createVideoUrl(videoId)}
			target="_blank"
			referrerPolicy="no-referrer"
		>
			<CardMedia component="img" src={showImage ? imageUrl : ''} alt={alt} />
		</CardActionArea>
	);
}

type VideoChipProps = {
	tag: VideoTag;
	deletable?: boolean;
	findable?: boolean;
};

const useVideoChipHooks = (
	{ label, style }: VideoTag,
	deletable?: boolean,
	findable?: boolean
) => {
	const dispatch = useAppDispatch();
	const findTag = useCallback(() => {
		dispatch(videosActions.addConditionTags([label]));
	}, [dispatch, label]);
	const deleteTag = useCallback(() => {
		dispatch(videosActions.removeConditionTags([label]));
	}, [dispatch, label]);

	const chipColor = useMemo(() => {
		switch (style) {
			case 'none':
				return 'default' as const;
			case 'lives':
				return 'chipTagsFromLives' as const;
			case 'series':
				return 'chipTagsFromSeries' as const;
			case 'games':
				return 'chipTagsFromGames' as const;
			case 'broadcast':
				return 'chipLiveStylesBroadcast' as const;
			case 'video':
				return 'chipLiveStylesVideo' as const;
			case 'short':
				return 'chipLiveStylesShort' as const;
			default: {
				const _exhaust: never = style;
				throw _exhaust;
			}
		}
	}, [style]);

	return {
		findTag: findable ? findTag : void 0,
		deleteTag: deletable ? deleteTag : void 0,
		chipColor,
	};
};

function VideoChip({ tag, deletable, findable }: VideoChipProps) {
	const { findTag, deleteTag, chipColor } = useVideoChipHooks(
		tag,
		deletable,
		findable
	);

	return (
		<TagChip
			label={tag.label}
			size="small"
			icon={findable ? <SearchIcon /> : void 0}
			clickable={findable}
			onClick={findTag}
			onDelete={deleteTag}
			color={chipColor}
		/>
	);
}

type VideoTagsProps = {
	tags: VideoTag[];
	deletable?: boolean;
	findable?: boolean;
};

const VideoTagsBox = styled(Box)({
	// justifyContent: 'right',
});

const TagChip = styled(Chip)({
	fontSize: '.6rem',
});

function VideoTags({ tags, deletable, findable }: VideoTagsProps) {
	return (
		<VideoTagsBox>
			{tags.map((tag) => (
				<VideoChip
					key={tag.label}
					tag={tag}
					deletable={deletable}
					findable={findable}
				/>
			))}
		</VideoTagsBox>
	);
}

const Spacer = styled('div')(({ theme }) => ({
	height: '0px',
	width: '100%',
	margin: `${theme.spacing(1)} 0`,
}));

function VideoCard({ def }: VideoCardProps) {
	const thumb = def.thumbnails.high;
	const publishedAt = useMemo(
		() =>
			DateTime.fromMillis(def.publishedAt)
				.setZone('Asia/Tokyo')
				.toFormat('yyyy-MM-dd HH:mm:ss'),
		[def.publishedAt]
	);
	const tags = useMemo(
		() =>
			def.tags.toSorted(
				({ label: { length: lhs } }, { label: { length: rhs } }) => lhs - rhs
			),
		[def.tags]
	);
	return (
		<Card>
			<VideoThumbnail imageUrl={thumb.url} alt={def.title} videoId={def.id} />
			<CardContent>
				<VideoTags tags={tags} findable />
				<Spacer />
				<TitleTypography>{def.title}</TitleTypography>
				<PublishedAtTypography>{publishedAt}</PublishedAtTypography>
				<DescriptionTypography>{def.description}</DescriptionTypography>
			</CardContent>
			<RightAlignedCardActions>
				<LinkToMovieButton videoId={def.id} />
			</RightAlignedCardActions>
		</Card>
	);
}

const steps = 20;

function ScrollToTop() {
	return (
		<Box display="flex" justifyContent="flex-end">
			<IconButton
				aria-label="scroll to top"
				component="span"
				onClick={animateScroll.scrollToTop}
			>
				<ArrowDropUpIcon />
			</IconButton>
		</Box>
	);
}

type VideoBodyProps = {
	defs: VideoDef[];
};

const useVideoBodyHooks = (defs: VideoBodyProps['defs']) => {
	const [loaded, setLoaded] = useState<VideoDef[]>([]);

	const fetchNext = useCallback(() => {
		if (loaded.length === defs.length) {
			return;
		}
		const next = loaded.length + steps;
		if (defs.length > next) {
			setLoaded(defs.slice(0, next));
		} else {
			setLoaded([...defs]);
		}
	}, [loaded, setLoaded, defs]);

	useEffect(() => {
		fetchNext(); // 初回
	}, [fetchNext]);

	const itemsPerRow = useValueWithMediaQuery({
		xs: 1,
		sm: 2,
		md: 3,
		lg: 4,
		xl: 4,
	});

	return { loaded, fetchNext, itemsPerRow };
};

const scrollToTopPerLines = 3;
function VideoBody({ defs }: VideoBodyProps) {
	const { loaded, fetchNext, itemsPerRow } = useVideoBodyHooks(defs);

	return (
		<Container>
			<InfiniteScroll
				dataLength={loaded.length}
				next={fetchNext}
				hasMore={loaded.length < defs.length}
				loader={<Loader />}
			>
				<Grid container spacing={2}>
					{loaded.map((def, ix) => (
						<React.Fragment key={def.id}>
							{ix === 0 ||
							ix % (itemsPerRow * scrollToTopPerLines) !== 0 ? null : (
								<Grid item xs={12}>
									<ScrollToTop />
								</Grid>
							)}
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<VideoCard def={def} />
							</Grid>
						</React.Fragment>
					))}
				</Grid>
			</InfiniteScroll>
		</Container>
	);
}

const VideoConditionFormPaper = styled(Paper)(({ theme }) => ({
	marginTop: theme.spacing(1),
	marginBottom: theme.spacing(1),
	padding: theme.spacing(1),
}));

const useVideoConditionFormHooks = () => {
	const dispatch = useAppDispatch();
	const {
		condition: {
			tags: tagLabels,
			dateSpan: { from: fromInstant, to: toInstant },
		},
	} = useAppSelector((state) => state.videos);

	const from = useMemo(
		() => (fromInstant !== null ? DateTime.fromMillis(fromInstant) : null),
		[fromInstant]
	);
	const to = useMemo(
		() => (toInstant !== null ? DateTime.fromMillis(toInstant) : null),
		[toInstant]
	);

	const onChangeFrom = useCallback<
		Exclude<React.ComponentProps<typeof DatePicker>['onChange'], undefined>
	>(
		(date) => {
			if (date === null) {
				dispatch(videosActions.clearConditionDateFrom());
			} else if (date instanceof DateTime) {
				dispatch(videosActions.setConditionDateFrom(date.toMillis()));
				// } else if (date instanceof Date) {
				// 	dispatch(videosActions.setConditionDateFrom(date));
			} else {
				console.error('from condition is not a date nor null', date);
			}
		},
		[dispatch]
	);

	const onChangeTo = useCallback<
		Exclude<React.ComponentProps<typeof DatePicker>['onChange'], undefined>
	>(
		(date) => {
			if (date === null) {
				dispatch(videosActions.clearConditionDateTo());
			} else if (date instanceof DateTime) {
				dispatch(videosActions.setConditionDateTo(date.toMillis()));
				// } else if (date instanceof Date) {
				// 	dispatch(videosActions.setConditionDateTo(date));
			} else {
				console.error('to condition is not a date nor null', date);
			}
		},
		[dispatch]
	);

	const [autocompleteValue, setAutocompleteValue] = useState<string>('');

	const renderTagAutocompleteInput = useCallback<
		React.ComponentProps<typeof Autocomplete>['renderInput']
	>((params) => <TextField {...params} label="タグ" variant="standard" />, []);

	const onChangeTag = useCallback<
		Exclude<React.ComponentProps<typeof Autocomplete>['onChange'], undefined>
	>(
		(_event, value, reason, _details) => {
			if (typeof value !== 'string') {
				return;
			}
			switch (reason) {
				case 'blur': {
					dispatch(videosActions.addConditionTags([value]));
					setAutocompleteValue('');
					return;
				}
			}
		},
		[dispatch, setAutocompleteValue]
	);

	const onInputChangeTag = useCallback<
		Exclude<
			React.ComponentProps<typeof Autocomplete>['onInputChange'],
			undefined
		>
	>(
		(_event, value, reason) => {
			if (typeof value !== 'string') {
				return;
			}
			switch (reason) {
				case 'input': {
					setAutocompleteValue(value);
					return;
				}
			}
		},
		[setAutocompleteValue]
	);

	const isOptionEqualToValue = useCallback<
		Exclude<
			React.ComponentProps<typeof Autocomplete>['isOptionEqualToValue'],
			undefined
		>
	>((option, value) => {
		// TODO: fix MUI: The value provided to Autocomplete is invalid.
		// None of the options match with `"Nintendo World Championships ファミコン世界大会"`.
		// You can use the `isOptionEqualToValue` prop to customize the equality test.
		return option === value;
	}, []);

	const tags = useMemo(
		() => tagLabels.map(defaultStyledTag('none')),
		[tagLabels]
	);

	return {
		tags,
		from,
		to,
		autocompleteValue,
		renderTagAutocompleteInput,
		onChangeFrom,
		onChangeTo,
		onChangeTag,
		onInputChangeTag,
		isOptionEqualToValue,
	};
};

type VideoConditionFormProps = {
	tagCandidates: string[];
};

function VideoConditionForm({ tagCandidates }: VideoConditionFormProps) {
	const {
		tags,
		from,
		to,
		autocompleteValue,
		renderTagAutocompleteInput,
		onChangeFrom,
		onChangeTo,
		onChangeTag,
		onInputChangeTag,
		isOptionEqualToValue,
	} = useVideoConditionFormHooks();
	return (
		<Container>
			<VideoConditionFormPaper>
				<Typography variant="caption">
					<SearchIcon />
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Autocomplete
							options={tagCandidates}
							renderInput={renderTagAutocompleteInput}
							isOptionEqualToValue={isOptionEqualToValue}
							autoHighlight
							autoSelect
							blurOnSelect
							clearOnBlur
							onChange={onChangeTag}
							onInputChange={onInputChangeTag}
							// onHighlightChange={(event, option, reason) => {
							// 	console.info('onInputchange', { event, option, reason });
							// }}
							// onClose={(event, reason) => {
							// 	console.info('onClose', { event, reason });
							// }}
							// onOpen={(event) => {
							// 	console.info('onOpen', { event });
							// }}
							// onInputChange={onChangeTag}
							inputValue={autocompleteValue}
						/>
						<VideoTags tags={tags} deletable />
					</Grid>
					<Grid item xs={12}>
						<DatePicker
							label="配信・投稿日(from)"
							format="yyyy-MM-dd"
							value={from}
							onChange={onChangeFrom}
							// renderInput={(params) => <TextField {...params} />}
							// clearable
							showDaysOutsideCurrentMonth
							// showTodayButton
							// showToolbar
							slotProps={{
								actionBar: { actions: ['clear', 'today', 'cancel', 'accept'] },
							}}
						/>
						<DatePicker
							label="配信・投稿日(to)"
							format="yyyy-MM-dd"
							value={to}
							onChange={onChangeTo}
							// renderInput={(params) => <TextField {...params} />}
							// clearable
							showDaysOutsideCurrentMonth
							// showTodayButton
							// showToolbar
							slotProps={{
								actionBar: { actions: ['clear', 'today', 'cancel', 'accept'] },
							}}
						/>
					</Grid>
				</Grid>
			</VideoConditionFormPaper>
		</Container>
	);
}

const useVideoContainerHooks = () => {
	const [toBeInitialized, setToBeInitialized] = useState(true);

	const dispatch = useAppDispatch();
	const {
		loaded,
		list,
		condition: {
			tags,
			dateSpan: { from, to },
		},
	} = useAppSelector((state) => state.videos);

	useEffect(() => {
		if (toBeInitialized) {
			dispatch(videosActions.init());
			setToBeInitialized(false);
		}
	}, [toBeInitialized, setToBeInitialized, dispatch]);

	const defs = useMemo(
		() =>
			[
				...list.filter(
					(d) =>
						// タグ判定
						(tags.length === 0 ||
							((labels: string[]) =>
								tags.every((selected) => labels.includes(selected)))(
								d.tags.map(({ label }) => label)
							)) &&
						// 公開日範囲
						(from === null || from <= d.publishedAt) &&
						(to === null || d.publishedAt <= to)
				),
			]
				// 公開日降順
				.sort((lhs, rhs) => -(lhs.publishedAt - rhs.publishedAt)),
		[list, tags, from, to]
	);

	const tagCandidates = Array.from(
		(() => {
			const ret = new Set(
				defs.flatMap(({ tags }) => tags.map(({ label }) => label))
			);

			tags.forEach((selected) => ret.delete(selected));
			return ret;
		})().keys()
	).sort();

	const { hash } = useParams();

	const loading = useMemo(() => !loaded, [loaded]);

	return { loading, defs, tagCandidates, hash };
};

function VideoContainer() {
	const { loading, defs, tagCandidates } = useVideoContainerHooks();
	return loading ? (
		<Loader />
	) : (
		<React.Fragment>
			<VideoConditionForm tagCandidates={tagCandidates} />
			<VideoBody defs={defs} />
		</React.Fragment>
	);
}

export function Videos() {
	return (
		<Suspense fallback={<Loader />}>
			<VideoContainer />
		</Suspense>
	);
}
