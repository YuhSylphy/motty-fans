import React, { Suspense, useEffect, useMemo } from 'react';

import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Tooltip,
	Typography,
} from '@mui/material';
import { Masonry } from '@mui/lab';
import { styled } from '@mui/styles';

import { DateTime } from 'luxon';

import { useAppDispatch, useAppSelector } from 'src/util';
import { videosActions } from '..';
import { VideoDef } from '../core/logic';

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
});

function DescriptionTypography(props: React.ComponentProps<typeof Typography>) {
	return (
		<Tooltip title={props.children ?? ''}>
			<DescriptionStyledTypography {...props} variant="body2" />
		</Tooltip>
	);
}

type LinkToMovieButtonProps = {
	id: string;
};
function LinkToMovieButton({ id }: LinkToMovieButtonProps) {
	return (
		<Button href={`https://www.youtube.com/watch?v=${id}`} target="_blank">
			Watch
		</Button>
	);
}

const RightAlignedCardActions = styled(CardActions)({
	justifyContent: 'right',
});

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
			<CardMedia component="img" image={thumb.url} alt={def.title} />
			<CardContent>
				<TitleTypography>{def.title}</TitleTypography>
				<PublishedAtTypography>{publishedAt}</PublishedAtTypography>
				<DescriptionTypography>{def.description}</DescriptionTypography>
			</CardContent>
			<RightAlignedCardActions>
				<LinkToMovieButton id={def.id} />
			</RightAlignedCardActions>
		</Card>
	);
}

type VideoBodyProps = {
	defs: VideoDef[];
};

function VideoBody({ defs }: VideoBodyProps) {
	// tentative
	return (
		<Masonry>
			{defs.map((def) => (
				<VideoCard key={def.id} def={def} />
			))}
		</Masonry>
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

	return defs.length === 0 ? <Loader /> : <VideoBody defs={defs} />;
}

export function Videos() {
	return (
		<Suspense fallback={<Loader />}>
			<VideoContainer />
		</Suspense>
	);
}
