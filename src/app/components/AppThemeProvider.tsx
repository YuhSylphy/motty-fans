import { red, pink } from '@mui/material/colors';
import {
	createTheme,
	ThemeProvider,
	StyledEngineProvider,
} from '@mui/material/styles';
import React, { ReactNode } from 'react';

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: red,
		secondary: pink,
	},
});

export type AppThemeProviderProps = {
	children: ReactNode;
};

export function AppThemeProvider({ children }: AppThemeProviderProps) {
	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</StyledEngineProvider>
	);
}
