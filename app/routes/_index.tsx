import { type MetaFunction } from '@remix-run/node';
// import { defaultRoute } from '~/core/logics/menu-defs';

export const meta: MetaFunction = () => {
	return [
		{ title: 'MOTTY fans' },
		{ name: 'description', content: 'MOTTY fans' },
	];
};

export default function RootPage() {
	return null; //redirect(defaultRoute);
}
