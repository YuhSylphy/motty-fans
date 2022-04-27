import type { CoreAction } from 'src/app/core/ducks';
import type { HorseDefsAction } from 'src/features/horse-defs';
import type { IndicatorAction } from 'src/features/indicator';
import type { PedigreeAction } from 'src/features/pedigree';
import type { ChangeLogAction } from 'src/features/changelog';
import type { VideosAction } from 'src/features/videos';

export type AppAction =
	| CoreAction
	| HorseDefsAction
	| IndicatorAction
	| PedigreeAction
	| ChangeLogAction
	| VideosAction;
