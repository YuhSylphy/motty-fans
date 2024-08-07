import { registerEpic } from 'src/app';
import { MareLine } from './components/MareLine';
import { epic } from 'src/features/horse-defs/core/epic';

registerEpic(epic);

export default MareLine;
