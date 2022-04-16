import type { HorseDefsAction } from 'src/features/horse-defs';
import type { IndicatorAction } from 'src/features/indicator';
import type { PedigreeAction } from 'src/features/pedigree';
import type { ChangeLogAction } from 'src/features/changelog';

export type AppAction =
	| HorseDefsAction
	| IndicatorAction
	| PedigreeAction
	| ChangeLogAction;
