import { v35 as createV3Hash } from './v35';
import md5 from './md5';

const v3 = createV3Hash('v3', 48, md5);

export default v3;