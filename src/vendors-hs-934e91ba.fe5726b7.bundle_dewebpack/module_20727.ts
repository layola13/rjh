import isSet from './module_434143';
import baseUnary from './module_602788';
import nodeUtil from './module_420242';

const nativeIsSet = nodeUtil?.isSet;

export default nativeIsSet ? baseUnary(nativeIsSet) : isSet;