import { registerEpic } from '~/core';
import { ChangeLog } from './components/ChangeLog';
import { epic } from './core/epic';

registerEpic(epic);

export default ChangeLog;
