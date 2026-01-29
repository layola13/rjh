import hasToStringTag from './module_55287';
import isCallable from './module_52530';
import classof from './module_97303';
import getWellKnownSymbol from './module_46976';

const toStringTagSymbol = getWellKnownSymbol('toStringTag');
const ObjectConstructor = Object;

const isArgumentsObject = classof(function () {
  return arguments;
}()) === 'Arguments';

/**
 * Gets the type tag of a value as a string.
 * Falls back to internal [[Class]] when Symbol.toStringTag is not available.
 */
function getTypeTag(value: unknown): string {
  if (value === undefined) {
    return 'Undefined';
  }
  
  if (value === null) {
    return 'Null';
  }
  
  const wrappedValue = ObjectConstructor(value);
  const toStringTagValue = tryGetProperty(wrappedValue, toStringTagSymbol);
  
  if (typeof toStringTagValue === 'string') {
    return toStringTagValue;
  }
  
  if (isArgumentsObject) {
    return classof(wrappedValue);
  }
  
  const internalClass = classof(wrappedValue);
  
  if (internalClass === 'Object' && isCallable(wrappedValue.callee)) {
    return 'Arguments';
  }
  
  return internalClass;
}

function tryGetProperty(target: any, property: symbol): unknown {
  try {
    return target[property];
  } catch {
    return undefined;
  }
}

export default hasToStringTag ? classof : getTypeTag;