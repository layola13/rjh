import baseIsTypedArray from './baseIsTypedArray';
import baseUnary from './baseUnary';
import nodeUtil from './nodeUtil';

const nodeIsTypedArray = nodeUtil?.isTypedArray;

const isTypedArray = nodeIsTypedArray 
  ? baseUnary(nodeIsTypedArray) 
  : baseIsTypedArray;

export default isTypedArray;