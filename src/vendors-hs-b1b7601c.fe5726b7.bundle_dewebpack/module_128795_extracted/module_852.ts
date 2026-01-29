import isNative from './isNative';
import getProperty from './getProperty';

function getBaseFunction<T>(object: any, key: string | symbol): T | undefined {
  const value = getProperty(object, key);
  return isNative(value) ? value : undefined;
}

export default getBaseFunction;