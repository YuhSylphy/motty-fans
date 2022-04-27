import { Box, Link as Anchor } from '@mui/material';
import { styled } from '@mui/material/styles';

import React from 'react';

const FooterBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'flex-end',
	margin: theme.spacing(0.2),
}));

export function Footer() {
	return (
		<FooterBox>
			<Anchor
				href="https://www.youtube.com/user/MOTTYGAMES/"
				target="__blank"
				referrerPolicy="no-referrer"
			>
				MOTTV
			</Anchor>
		</FooterBox>
	);
}
