import { Avatar, Link, List, ListItem, Paper, Typography } from '@mui/material';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/util';
import { profileActions } from '..';
import { HistoryItemProps, LinkExpression } from '../core/ducks';

function Loader() {
	return <div>Loading...</div>;
}

function Description() {
	const { description } = useAppSelector((state) => state.profile.defs);
	const Descriptions = useCallback(
		() => (
			<React.Fragment>
				{description.map((body, ix) => (
					<Typography key={ix}>{body}</Typography>
				))}
			</React.Fragment>
		),
		[description]
	);
	return (
		<Paper>
			<Avatar />
			<Descriptions />
		</Paper>
	);
}

function LastUpdated() {
	const { updatedAt } = useAppSelector((state) => state.profile.defs);
	return (
		<Paper>
			<Typography>最終更新: {updatedAt}</Typography>
		</Paper>
	);
}

function HistoryLink(link: LinkExpression) {
	return (
		<Link href={link.href} target="_blank" referrerPolicy="no-referrer">
			<Typography>{link.label}</Typography>
		</Link>
	);
}

function HistoryItem({ date, link, text }: HistoryItemProps) {
	return (
		<ListItem>
			<Typography>{date}</Typography>
			<List>
				{link instanceof Array ? (
					link.map((l) => (
						<ListItem key={l.label}>
							<HistoryLink {...l} />
						</ListItem>
					))
				) : link ? (
					<ListItem>
						<HistoryLink {...link} />
					</ListItem>
				) : (
					<ListItem>
						<Typography>---------------</Typography>
					</ListItem>
				)}
			</List>
			<Typography>{text}</Typography>
		</ListItem>
	);
}

interface HistoryListProps {
	items: HistoryItemProps[];
}
function HistoryList({ items }: HistoryListProps) {
	return (
		<List>
			{items.map((item) => (
				<HistoryItem key={item.text} {...item} />
			))}
		</List>
	);
}

function Histories() {
	const { history } = useAppSelector((state) => state.profile.defs);

	return (
		<React.Fragment>
			{history.map(({ key, header, items }) => (
				<Paper key={key}>
					<Typography variant="h2">{header}</Typography>
					<HistoryList items={items} />
				</Paper>
			))}
		</React.Fragment>
	);
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

	return (
		<div id="profile">
			<Description />
			<LastUpdated />
			<Histories />
		</div>
	);
}

export function Profile() {
	return (
		<Suspense fallback={<Loader />}>
			<ProfileContainer />
		</Suspense>
	);
}
