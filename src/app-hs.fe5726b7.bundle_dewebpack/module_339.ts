import baseIsSet from './baseIsSet';
import nodeIsSet from './nodeIsSet';

const nodeUtil = typeof process !== 'undefined' && process.versions?.node ? require('util') : null;
const isSet = nodeUtil?.types?.isSet ? nodeIsSet(nodeUtil.types.isSet) : baseIsSet;

export default isSet;