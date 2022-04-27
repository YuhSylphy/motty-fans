import React, {
	Suspense,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';

import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Chip,
	Container,
	Grid,
	Tooltip,
	Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

import { DateTime } from 'luxon';

import { useAppDispatch, useAppSelector } from 'src/util';
import { videosActions } from '..';
import { VideoDef } from '../core/fetch';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Box } from '@mui/system';

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

type TagsProps = {
	tags: string[];
};

const VideoTagsBox = styled(Box)({
	// justifyContent: 'right',
});

const TagChip = styled(Chip)({
	fontSize: '.4rem',
});

function VideoTags({ tags }: TagsProps) {
	return (
		<VideoTagsBox>
			{tags.map((tag) => (
				<TagChip
					key={tag}
					label={tag}
					size="small"
					icon={<SearchIcon />}
					clickable
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
	const thumb = def.thumbnails.default;
	const publishedAt = useMemo(
		() =>
			DateTime.fromMillis(def.publishedAt)
				.setZone('Asia/Tokyo')
				.toFormat('yyyy-MM-dd HH:mm:ss'),
		[def.publishedAt]
	);
	return (
		<Card>
			<VideoThumbnail imageUrl={thumb.url} alt={def.title} videoId={def.id} />
			<CardContent>
				<VideoTags tags={def.tags} />
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

type VideoBodyProps = {
	defs: VideoDef[];
};

const steps = 20;
function VideoBody({ defs }: VideoBodyProps) {
	const [loaded, setLoaded] = useState<VideoDef[]>([]);

	const fetchNext = useCallback(() => {
		const next = loaded.length + steps;
		if (defs.length > next) {
			setLoaded(defs.slice(0, next));
		} else {
			setLoaded([...defs]);
		}
	}, [loaded, steps, setLoaded, defs]);

	useEffect(() => {
		fetchNext(); // 初回
	}, [defs]);

	return (
		<Container>
			<InfiniteScroll
				dataLength={loaded.length}
				next={fetchNext}
				hasMore={loaded.length < defs.length}
				loader={<Loader />}
			>
				<Grid container spacing={2}>
					{loaded.map((def) => (
						<Grid item xs={4} md={3} key={def.id}>
							<VideoCard def={def} />
						</Grid>
					))}
				</Grid>
			</InfiniteScroll>
		</Container>
	);
}

const useVideoContainerHooks = () => {
	const dispatch = useAppDispatch();
	const {
		list,
		condition: {
			tags,
			dateSpan: { from, to },
		},
	} = useAppSelector((state) => state.videos);

	const loading = list.length === 0;

	useEffect(() => {
		if (loading) {
			dispatch(videosActions.init());
		}
	}, [list]);

	const defs = useMemo(
		() =>
			[
				...list.filter(
					(d) =>
						// タグ判定
						(tags.length === 0 ||
							d.tags.find((tag) => tags.includes(tag)) !== void 0) &&
						// 公開日範囲
						(from === null || from <= d.publishedAt) &&
						(to === null || d.publishedAt <= to)
				),
			]
				// 公開日降順
				.sort((lhs, rhs) => -(lhs.publishedAt - rhs.publishedAt)),
		[list, tags, from, to]
	);

	return { loading, defs };
};

function VideoContainer() {
	const { loading, defs } = useVideoContainerHooks();
	return loading ? <Loader /> : <VideoBody defs={defs} />;
}

export function Videos() {
	return (
		<Suspense fallback={<Loader />}>
			<VideoContainer />
		</Suspense>
	);
}
