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
	Container,
	Grid,
	Tooltip,
	Typography,
} from '@mui/material';
import { styled } from '@mui/styles';

import { DateTime } from 'luxon';

import { useAppDispatch, useAppSelector } from 'src/util';
import { videosActions } from '..';
import { VideoDef } from '../core/fetch';
import InfiniteScroll from 'react-infinite-scroll-component';

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
	display: 'box',
	overflow: 'hidden',
	lineClamp: 2,
	boxOrient: 'vertical',
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
	display: 'box',
	overflow: 'hidden',
	lineClamp: 3,
	boxOrient: 'vertical',
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
		<Button href={createVideoUrl(videoId)} target="_blank">
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
		<CardActionArea href={createVideoUrl(videoId)}>
			<CardMedia component="img" src={showImage ? imageUrl : ''} alt={alt} />
		</CardActionArea>
	);
}

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

function VideoContainer() {
	const dispatch = useAppDispatch();
	const defs = useAppSelector((state) => state.videos.list);

	useEffect(() => {
		if (defs.length === 0) {
			dispatch(videosActions.init());
		}
	}, [defs]);

	const sorted = useMemo(
		() => [...defs].sort((lhs, rhs) => -(lhs.publishedAt - rhs.publishedAt)),
		[defs]
	);

	return defs.length === 0 ? <Loader /> : <VideoBody defs={sorted} />;
}

export function Videos() {
	return (
		<Suspense fallback={<Loader />}>
			<VideoContainer />
		</Suspense>
	);
}
