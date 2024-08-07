import { registerEpic } from 'src/app';
import { Profile } from './component/Profile';
import { epic } from './core/epic';

registerEpic(epic);
export default Profile;
