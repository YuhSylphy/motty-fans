import { Stack, Link as Anchor, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import React from 'react';

const StyledStack = styled(Stack)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'flex-end',
	margin: theme.spacing(0.2),
	paddingRight: theme.spacing(1),
	color: theme.palette.text.secondary,
	fontSize: '8rem',
}));

const FooterBox = (props: React.ComponentProps<typeof Stack>) => (
	<StyledStack
		direction="column"
		justifyContent="center"
		alignItems="flex-end"
		{...props}
	/>
);

export function Footer() {
	return (
		<FooterBox>
			<Typography variant="body1">
				<Anchor
					href="https://www.youtube.com/user/MOTTYGAMES/"
					target="__blank"
					referrerPolicy="no-referrer"
				>
					<FontAwesomeIcon icon={faArrowUpRightFromSquare} /> MOTTV
				</Anchor>
			</Typography>
			<Typography variant="body2">MOTTY fans by YuhSylphy</Typography>
		</FooterBox>
	);
}
