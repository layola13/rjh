import baseIsMap from './baseIsMap';
import baseUnary from './baseUnary';
import nodeUtil from './nodeUtil';

const nodeIsMap = nodeUtil?.isMap;

const isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

export default isMap;