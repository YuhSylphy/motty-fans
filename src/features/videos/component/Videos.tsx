import React, { Suspense, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/util';
import { videosActions } from '..';
import { VideoDef } from '../core/logic';

function Loader() {
	return <div>fallback</div>;
}

type VideoProps = {
	defs: VideoDef[];
};

function VideoBody({ defs }: VideoProps) {
	// tentative
	return (
		<div>
			<span>test</span>
			<ul>
				{defs.map((def, ix) => (
					<li key={ix}>{def.id}</li>
				))}
			</ul>
		</div>
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
