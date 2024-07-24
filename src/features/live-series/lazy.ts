import { registerEpic } from 'src/app';
import { LiveSeries } from './component/LiveSeries';
import { epic } from './core/epic';

registerEpic(epic);
export default LiveSeries;
