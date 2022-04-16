import {
	createTheme,
	ThemeProvider,
	StyledEngineProvider,
} from '@mui/material/styles';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './app/core/mui-codemod';
import './index.css';

import { App, store } from './app';
import { igniteEpics } from './app/core/epics';

import * as serviceWorker from './serviceWorker';

const theme = createTheme({});

const target = document.getElementById('root');

if (!target) throw new Error('root div not found');
const root = createRoot(target);

igniteEpics();
root.render(
	<React.StrictMode>
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<App />
				</Provider>
			</ThemeProvider>
		</StyledEngineProvider>
	</React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
