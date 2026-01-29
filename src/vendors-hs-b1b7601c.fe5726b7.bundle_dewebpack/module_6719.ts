import baseIsTypedArray from './baseIsTypedArray';
import baseUnary from './baseUnary';
import nodeUtil from './nodeUtil';

const isTypedArray = nodeUtil && nodeUtil.isTypedArray 
  ? baseUnary(nodeUtil.isTypedArray) 
  : baseIsTypedArray;

export default isTypedArray;