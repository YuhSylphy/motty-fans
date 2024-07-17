import React, { Suspense } from 'react';


function Loader() {
	return <div>Loading...</div>;
}
function LiveSeriesContainer() {
	return null;
}

export function LiveSeries() {
	return (
		<Suspense fallback={<Loader />}>
			<LiveSeriesContainer />
		</Suspense>
	);
}
