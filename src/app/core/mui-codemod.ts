// @see https://mui.com/material-ui/guides/migration-v4/#types-property-quot-palette-quot-quot-spacing-quot-does-not-exist-on-type-defaulttheme
// it could be your App.tsx file or theme file that is included in your tsconfig.json
import { Theme } from '@mui/material/styles';

declare module '@mui/styles/defaultTheme' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface DefaultTheme extends Theme {}
}
