import {
	red,
	pink,
	lightBlue,
	blueGrey,
	amber,
	deepOrange,
} from '@mui/material/colors';
import { PaletteColorOptions, createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface PaletteOptions {
		chipTagsFromLives: PaletteColorOptions;
		chipTagsFromSeries: PaletteColorOptions;
		chipTagsFromGames: PaletteColorOptions;

		chipLiveStylesVideo: PaletteColorOptions;
		chipLiveStylesBroadcast: PaletteColorOptions;
		chipLiveStylesShort: PaletteColorOptions;
	}
}

declare module '@mui/material/Chip' {
	interface ChipPropsColorOverrides {
		chipTagsFromLives: true;
		chipTagsFromSeries: true;
		chipTagsFromGames: true;

		chipLiveStylesVideo: true;
		chipLiveStylesBroadcast: true;
		chipLiveStylesShort: true;
	}
}

const {
	palette: { augmentColor },
} = createTheme({});

export const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: red,
		secondary: pink,

		chipTagsFromLives: augmentColor({ color: lightBlue }),
		chipTagsFromSeries: augmentColor({ color: blueGrey }),
		chipTagsFromGames: augmentColor({ color: amber }),

		chipLiveStylesVideo: augmentColor({ color: deepOrange }),
		chipLiveStylesBroadcast: augmentColor({ color: deepOrange }),
		chipLiveStylesShort: augmentColor({ color: deepOrange }),
	},
});
