import {
	red,
	pink,
	lightBlue,
	deepOrange,
	indigo,
	teal,
	lime,
	brown,
} from '@mui/material/colors';
import { PaletteColorOptions, createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface PaletteOptions {
		chipTagsFromLives: PaletteColorOptions;
		chipTagsFromSeries: PaletteColorOptions;
		chipTagsFromGames: PaletteColorOptions;

		chipLiveStylesBroadcast: PaletteColorOptions;
		chipLiveStylesVideo: PaletteColorOptions;
		chipLiveStylesShort: PaletteColorOptions;
	}
}

declare module '@mui/material/Chip' {
	interface ChipPropsColorOverrides {
		chipTagsFromLives: true;
		chipTagsFromSeries: true;
		chipTagsFromGames: true;

		chipLiveStylesBroadcast: true;
		chipLiveStylesVideo: true;
		chipLiveStylesShort: true;
	}
}

const {
	palette: { augmentColor },
} = createTheme({});

// TODO: 色味調整
export const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: red,
		secondary: pink,

		chipTagsFromLives: augmentColor({ color: brown }),
		chipTagsFromSeries: augmentColor({ color: lime }),
		chipTagsFromGames: augmentColor({ color: lightBlue }),

		chipLiveStylesBroadcast: augmentColor({ color: deepOrange }),
		chipLiveStylesVideo: augmentColor({ color: teal }),
		chipLiveStylesShort: augmentColor({ color: indigo }),
	},
});
