type PrimitiveConversionHint = 'string' | 'number' | 'default';

interface ToPrimitive {
  (hint: PrimitiveConversionHint): string | number | boolean | symbol | null | undefined;
}

interface ValueOf {
  (): string | number | boolean | symbol | null | undefined;
}

interface ToString {
  (): string;
}

interface ObjectWithConversionMethods {
  toString?: ToString;
  valueOf?: ValueOf;
}

function call<T, R>(fn: (this: T) => R, context: T): R {
  return fn.call(context);
}

function isCallable(value: unknown): value is Function {
  return typeof value === 'function';
}

function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

export function toPrimitive(
  input: ObjectWithConversionMethods,
  hint: PrimitiveConversionHint
): string | number | boolean | symbol | null | undefined {
  let method: ToString | ValueOf | undefined;
  let result: unknown;

  if (hint === 'string' && isCallable(method = input.toString) && !isObject(result = call(method, input))) {
    return result;
  }

  if (isCallable(method = input.valueOf) && !isObject(result = call(method, input))) {
    return result;
  }

  if (hint !== 'string' && isCallable(method = input.toString) && !isObject(result = call(method, input))) {
    return result;
  }

  throw new TypeError("Can't convert object to primitive value");
}