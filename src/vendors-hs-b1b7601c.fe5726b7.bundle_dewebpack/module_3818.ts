import { getNative } from './getNative';
import root from './root';

const PromiseConstructor = getNative(root, 'Promise');

export default PromiseConstructor;