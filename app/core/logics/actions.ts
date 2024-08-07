import type { CoreAction } from '~/core/logics/ducks';
import type { HorseDefsAction } from '~/features/horse-defs';
import type { IndicatorAction } from '~/features/indicator';
import type { PedigreeAction } from '~/features/pedigree';
import type { ChangeLogAction } from '~/features/changelog';
import type { VideosAction } from '~/features/videos';
import type { ProfileAction } from '~/features/profile';
import type { LiveSeriesAction } from '~/features/live-series';

export type AppAction =
	| CoreAction
	| HorseDefsAction
	| IndicatorAction
	| PedigreeAction
	| ChangeLogAction
	| VideosAction
	| ProfileAction
	| LiveSeriesAction;
