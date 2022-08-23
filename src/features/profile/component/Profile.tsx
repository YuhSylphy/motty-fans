import React, {
	Suspense,
	// useCallback,
	useEffect,
	// useMemo,
	useState,
} from 'react';
import { useAppDispatch } from 'src/util';
import { profileActions } from '..';

function Loader() {
	return <div>Loading...</div>;
}

function ProfileContainer() {
	const [notInitialized, setNotInitialized] = useState(true);
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (notInitialized) {
			dispatch(profileActions.init());
			setNotInitialized(false);
		}
	}, [notInitialized]);

	return <div>dummy</div>;
}

export function Profile() {
	return (
		<Suspense fallback={<Loader />}>
			<ProfileContainer />
		</Suspense>
	);
}
