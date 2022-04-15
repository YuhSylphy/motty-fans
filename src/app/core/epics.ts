import { registerEpic } from './store';

import { horseDefsEpic } from 'src/features/horse-defs';
import { changeLogEpic } from 'src/features/changelog';

export const igniteEpics = () => registerEpic(horseDefsEpic, changeLogEpic);
