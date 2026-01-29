import globalObject from './module_81482';
import isCallable from './module_52530';

export default function getBuiltIn<T = unknown>(
  namespace: string,
  property?: string
): T | undefined {
  if (arguments.length < 2) {
    const value = globalObject[namespace];
    return isCallable(value) ? value : undefined;
  }
  
  return globalObject[namespace]?.[property];
}