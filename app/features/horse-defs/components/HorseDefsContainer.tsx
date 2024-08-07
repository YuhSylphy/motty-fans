import React, { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/util';
import { horseDefsActions } from '..';

type HorseDefProps = {
	children: ReactNode;
};

export function HorseDefsContainer({ children }: HorseDefProps) {
	const dispatch = useAppDispatch();
	const list = useAppSelector((state) => state.horseDefs.list);

	useEffect(() => {
		if (list.length == 0) {
			dispatch(horseDefsActions.init());
		}
	}, [dispatch, list.length]);

	return <React.Fragment>{children}</React.Fragment>;
}
