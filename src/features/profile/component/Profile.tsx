import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import {
	Avatar,
	Container,
	IconButton,
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

const youtubeUrl = 'https://www.youtube.com/user/MOTTYGAMES';
const twitterUrl = 'https://twitter.com/MottyMusume';
const nicoUrl = 'https://live.nicovideo.jp/watch/user/2264536';
const email = 'mottymusume@gmail.com';

const PerfectCircleButton = styled(IconButton)(() => ({
	width: '40px',
	height: '40px',
}));

interface SocialMediaLinkProps {
	children: JSX.Element;
	href: string;
}
function SocialMediaLink({ children, href }: SocialMediaLinkProps) {
	return (
		<a href={href} target="_blank" rel="noreferrer">
			<PerfectCircleButton>{children}</PerfectCircleButton>
		</a>
	);
}

function YoutubeLink() {
	return (
		<SocialMediaLink href={youtubeUrl}>
			<Box sx={{ color: '#FF0000' }}>
				<FontAwesomeIcon icon={faYoutube} />
			</Box>
		</SocialMediaLink>
	);
}

function TwitterLink() {
	return (
		<SocialMediaLink href={twitterUrl}>
			<Box sx={{ color: '#FFFFFF' }}>
				<FontAwesomeIcon icon={faXTwitter} />
			</Box>
		</SocialMediaLink>
	);
}

/**
 * from a path on public domain
 * @see https://ja.wikipedia.org/wiki/%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB:Niconico_Channel_logo.svg
 */
function NicoIcon() {
	return (
		<svg
			aria-hidden="true"
			focusable="false"
			data-prefix="fab"
			data-icon="nico"
			className="svg-inline--fa"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
		>
			<path
				fill="currentColor"
				d="M 466.24924,97.071125 H 317.35186 l 61.12891,-57.623981 c 8.44088,-7.96387 8.92825,-21.37179 1.068,-29.9370903 -7.84981,-8.57568002 -21.07106,-9.05268002 -29.52232,-1.08881 L 255.99482,97.071125 161.97347,8.4212437 c -8.46161,-7.96387002 -21.67251,-7.48687002 -29.53268,1.08881 -7.86017,8.5653003 -7.3728,21.9732203 1.07844,29.9370903 l 61.11854,57.623981 H 45.7715 C 20.531848,97.071125 -5.0000001e-7,117.5926 -5.0000001e-7,142.93596 V 418.02124 C -5.0000001e-7,443.37498 20.531848,463.92756 45.7715,463.92756 h 57.99729 l 34.56195,40.27561 c 5.76551,6.72987 15.13964,6.72987 20.91552,0 l 34.55158,-40.27561 h 124.39397 l 34.55157,40.27561 c 5.78624,6.72987 15.15002,6.72987 20.92589,0 l 34.56194,-40.27561 h 58.01803 C 491.56149,463.92756 512,443.37498 512,418.02124 V 142.93596 C 512,117.5926 491.56149,97.071125 466.24924,97.071125"
			/>
		</svg>
	);
}

function NicoVideoLink() {
	return (
		<SocialMediaLink href={nicoUrl}>
			<Box sx={{ color: '#FFFFFF' }}>
				<NicoIcon />
			</Box>
		</SocialMediaLink>
	);
}

const ExternalBox = styled(CenteringBox)(({ theme }) => ({
	padding: theme.spacing(1),
	display: 'flex',
	flexDirection: 'row',
}));

function SocialMedia() {
	return (
		<ExternalBox>
			<TwitterLink />
			<YoutubeLink />
			<NicoVideoLink />
		</ExternalBox>
	);
}

const EMailLink = styled(Link)(() => ({
	display: 'flex',
	alignItems: 'center',
}));

const MarginedFontAwesomeIcon = styled(FontAwesomeIcon)(({ theme }) => ({
	margin: theme.spacing(1),
}));

function EMail() {
	return (
		<ExternalBox>
			<EMailLink href={`mailto:${email}`}>
				<MarginedFontAwesomeIcon icon={faEnvelope} />
				<Typography>{email}</Typography>
			</EMailLink>
		</ExternalBox>
	);
}

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
			<SocialMedia />
			<EMail />
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
		if (!initializedRef.current) {
			initializedRef.current = true;
			dispatch(profileActions.init());
		}
	}, [dispatch, initializedRef]);

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
