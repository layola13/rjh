import isTypedArray from './module_8749';
import baseUnary from './module_1717';
import coreJsData from './module_1167';

const nodeIsTypedArray = coreJsData?.isTypedArray;

const typedArrayCheck = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : isTypedArray;

export default typedArrayCheck;