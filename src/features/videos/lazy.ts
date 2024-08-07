import { registerEpic } from 'src/app';
import { Videos } from './component/Videos';
import { epic } from './core/epic';

registerEpic(epic);
export default Videos;
