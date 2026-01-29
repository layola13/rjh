import baseIsMap from './baseIsMap';
import baseUnary from './baseUnary';
import nodeUtil from './nodeUtil';

const isMap = nodeUtil && nodeUtil.isMap 
  ? baseUnary(nodeUtil.isMap) 
  : baseIsMap;

export default isMap;