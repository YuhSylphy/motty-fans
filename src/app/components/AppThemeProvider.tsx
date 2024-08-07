import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import React, { ReactNode } from 'react';

import { theme } from '../core/appTheme';

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
