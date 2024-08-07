import { registerEpic } from '~/core';
import { Profile } from './component/Profile';
import { epic } from './core/epic';

registerEpic(epic);
export default Profile;
