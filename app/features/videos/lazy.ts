import { registerEpic } from '~/core';
import { Videos } from './component/Videos';
import { epic } from './core/epic';

registerEpic(epic);
export default Videos;
