import getTag from './getTag';
import isObject from './isObject';

export default function isFunction(value: unknown): value is Function {
  if (!isObject(value)) return false;
  
  const tag = getTag(value);
  
  return (
    tag === "[object Function]" ||
    tag === "[object GeneratorFunction]" ||
    tag === "[object AsyncFunction]" ||
    tag === "[object Proxy]"
  );
}