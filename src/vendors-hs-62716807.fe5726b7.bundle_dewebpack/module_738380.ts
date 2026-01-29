import globalObject from './339192';
import isCallable from './170452';

export default function getBuiltIn(target: string, property?: string): unknown {
  if (arguments.length < 2) {
    const value = globalObject[target];
    return isCallable(value) ? value : undefined;
  }
  
  return globalObject[target]?.[property];
}