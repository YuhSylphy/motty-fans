import { registerEpic } from 'src/app';
import { Family } from './components/Family';
import { epic } from 'src/features/horse-defs/core/epic';

registerEpic(epic);

export default Family;
