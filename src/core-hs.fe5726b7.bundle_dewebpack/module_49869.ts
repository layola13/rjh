import call from './47730';
import isCallable from './52530';
import isObject from './17029';

export default function toPrimitive(input: unknown, hint?: 'string' | 'number' | 'default'): string | number | boolean | symbol | null | undefined | bigint {
  let method: unknown;
  let result: unknown;

  if (hint === 'string' && isCallable(method = (input as any).toString) && !isObject(result = call(method, input))) {
    return result as string | number | boolean | symbol | null | undefined | bigint;
  }

  if (isCallable(method = (input as any).valueOf) && !isObject(result = call(method, input))) {
    return result as string | number | boolean | symbol | null | undefined | bigint;
  }

  if (hint !== 'string' && isCallable(method = (input as any).toString) && !isObject(result = call(method, input))) {
    return result as string | number | boolean | symbol | null | undefined | bigint;
  }

  throw new TypeError("Can't convert object to primitive value");
}