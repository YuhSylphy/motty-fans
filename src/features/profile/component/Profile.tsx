import {
	Avatar,
	Container,
	Link,
	List,
	ListItem,
	Paper,
	Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import React, { Suspense, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'src/util';
import { profileActions } from '..';
import { HistoryItemProps, LinkExpression } from '../core/fetch';

import avatarImage from './media/avatar.jpeg';

function Loader() {
	return <div>Loading...</div>;
}

const CenteringBox = styled(Box)({
	display: 'flex',
	justifyContent: 'center',
});

const RightAlignedBox = styled(Box)({
	display: 'flex',
	justifyContent: 'right',
});

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
	width: theme.spacing(24),
	height: theme.spacing(24),
}));

const MarginedPaper = styled(Paper)(({ theme }) => ({
	marginBottom: theme.spacing(1),
	overflow: 'hidden',
}));

function Description() {
	const {
		description: { header, body },
	} = useAppSelector((state) => state.profile.defs);
	return (
		<MarginedPaper>
			<CenteringBox>
				<ProfileAvatar alt="MOTTY" src={avatarImage} />
			</CenteringBox>
			<CenteringBox>
				<Typography variant="h4">{header}</Typography>
			</CenteringBox>
			<CenteringBox>
				<Typography paragraph sx={{ whiteSpace: 'pre-line' }}>
					{body.join('\n')}
				</Typography>
			</CenteringBox>
		</MarginedPaper>
	);
}

function LastUpdated() {
	const { updatedAt } = useAppSelector((state) => state.profile.defs);
	return (
		<RightAlignedBox>
			<MarginedPaper>
				<Typography>最終更新: {updatedAt}</Typography>
			</MarginedPaper>
		</RightAlignedBox>
	);
}

function HistoryLink(link: LinkExpression) {
	return (
		<Link href={link.href} target="_blank" referrerPolicy="no-referrer">
			<Typography>{link.label}</Typography>
		</Link>
	);
}

const HistoryItemDateBox = styled(CenteringBox)(({ theme: _theme }) => ({
	// width: theme.spacing(20),
	flexBasis: '15%',
}));
const HistoryItemLinkBox = styled(CenteringBox)(({ theme: _theme }) => ({
	// width: theme.spacing(24),
	flexBasis: '15%',
}));
const HistoryItemTextBox = styled(CenteringBox)(({ theme: _theme }) => ({
	// width: 'auto',
	flexBasis: '70%',
	display: 'flex',
	justifyContent: 'left',
}));

function HistoryItem({ date, link, text }: HistoryItemProps) {
	// useMediaQuery() でモバイル用レイアウトを構成したい
	return (
		<ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
			<HistoryItemDateBox className="date">
				<Typography>{date}</Typography>
			</HistoryItemDateBox>
			<HistoryItemLinkBox>
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
			</HistoryItemLinkBox>
			<HistoryItemTextBox>
				<Typography>{text}</Typography>
			</HistoryItemTextBox>
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

const HistoryHeaderTypography = styled(Typography)(({ theme }) => ({
	backgroundColor: theme.palette.primary.dark,
}));

function HistoryHeader({ children }: { children: string }) {
	return (
		<HistoryHeaderTypography variant="h6">{children}</HistoryHeaderTypography>
	);
}

function Histories() {
	const { history } = useAppSelector((state) => state.profile.defs);

	return (
		<React.Fragment>
			{history.map(({ key, header, items }) => (
				<MarginedPaper key={key}>
					<HistoryHeader>{header}</HistoryHeader>
					<HistoryList items={items} />
				</MarginedPaper>
			))}
		</React.Fragment>
	);
}

const ProfileStyledContainer = styled(Container)(() => ({}));

function ProfileContainer() {
	const initializedRef = useRef(false);
	const dispatch = useAppDispatch();
	useEffect(() => {
		console.info('useEffect in Profile Container', initializedRef);
		if (!initializedRef.current) {
			initializedRef.current = true;
			dispatch(profileActions.init());
		}
	}, [initializedRef]);

	return (
		<ProfileStyledContainer id="profile">
			<Description />
			<LastUpdated />
			<Histories />
		</ProfileStyledContainer>
	);
}

export function Profile() {
	return (
		<Suspense fallback={<Loader />}>
			<ProfileContainer />
		</Suspense>
	);
}
