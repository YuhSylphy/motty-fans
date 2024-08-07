import React from 'react';
import { MetaFunction } from '@remix-run/react';
import { findPageDef } from '~/core/logics/menu-defs';

const { title, Page } = findPageDef('/mare-line');

export const meta: MetaFunction = () => {
	return [{ title }, { name: 'description', content: title }];
};

export default function MareLinePage() {
	return <Page />;
}
