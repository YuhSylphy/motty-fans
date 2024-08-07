import { registerEpic } from '~/core';
import { MareLine } from './components/MareLine';
import { epic } from '~/features/horse-defs/core/epic';

registerEpic(epic);

export default MareLine;
