import type { HorseDefsAction } from '../features/horse-defs';
import type { IndicatorAction } from '../features/indicator';
import type { PedigreeAction } from '../features/pedigree';
import type { ChangeLogAction } from '../features/changelog';

export type AppAction =
	| HorseDefsAction
	| IndicatorAction
	| PedigreeAction
	| ChangeLogAction;
