import { registerEpic } from '~/core';
import { Family } from './components/Family';
import { epic } from '~/features/horse-defs/core/epic';

registerEpic(epic);

export default Family;
