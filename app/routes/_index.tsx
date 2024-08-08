import { redirect, type MetaFunction } from '@remix-run/react';
import { defaultRoute } from '~/core/logics/menu-defs';

export const meta: MetaFunction = () => {
	return [
		{ title: 'MOTTY fans' },
		{ name: 'description', content: 'MOTTY fans' },
	];
};
export const clientLoader = async () => {
	return redirect(defaultRoute);
};

export default function RootPage() {
	return null;
}
