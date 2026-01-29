import getNative from './getNative';
import root from './root';

const Promise = getNative(root, 'Promise');

export default Promise;