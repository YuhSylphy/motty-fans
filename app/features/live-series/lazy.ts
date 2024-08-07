import { registerEpic } from '~/core';
import { LiveSeries } from './component/LiveSeries';
import { epic } from './core/epic';

registerEpic(epic);
export default LiveSeries;
