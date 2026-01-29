import { getNative } from './getNative';
import root from './root';

const DataView = getNative(root, 'DataView');

export default DataView;