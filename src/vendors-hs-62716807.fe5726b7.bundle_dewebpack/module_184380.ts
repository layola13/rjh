type AnyFunction = (...args: any[]) => any;

interface BindPolyFill {
  (this: AnyFunction, thisArg: any, ...boundArgs: any[]): AnyFunction;
}

const objectToString = Object.prototype.toString;
const mathMax = Math.max;

function concatenateArrays<T>(first: ArrayLike<T>, second: ArrayLike<T>): T[] {
  const result: T[] = [];
  
  for (let i = 0; i < first.length; i += 1) {
    result[i] = first[i];
  }
  
  for (let j = 0; j < second.length; j += 1) {
    result[j + first.length] = second[j];
  }
  
  return result;
}

function sliceArguments(args: IArguments, startIndex: number = 0): any[] {
  const result: any[] = [];
  
  for (let i = startIndex, j = 0; i < args.length; i += 1, j += 1) {
    result[j] = args[i];
  }
  
  return result;
}

function joinWithSeparator(items: string[], separator: string): string {
  let result = '';
  
  for (let i = 0; i < items.length; i += 1) {
    result += items[i];
    if (i + 1 < items.length) {
      result += separator;
    }
  }
  
  return result;
}

const bindPolyFill: BindPolyFill = function(this: AnyFunction, thisArg: any, ...args: any[]): AnyFunction {
  const targetFunction = this;
  
  if (typeof targetFunction !== 'function' || objectToString.apply(targetFunction) !== '[object Function]') {
    throw new TypeError(`Function.prototype.bind called on incompatible ${targetFunction}`);
  }
  
  const boundArgs = sliceArguments(arguments, 1);
  const remainingArgsCount = mathMax(0, targetFunction.length - boundArgs.length);
  
  const placeholders: string[] = [];
  for (let i = 0; i < remainingArgsCount; i++) {
    placeholders[i] = `$${i}`;
  }
  
  const boundFunction = Function(
    'binder',
    `return function (${joinWithSeparator(placeholders, ', ')}){ return binder.apply(this, arguments); }`
  )(function(this: any) {
    if (this instanceof boundFunction) {
      const result = targetFunction.apply(this, concatenateArrays(boundArgs, arguments));
      return Object(result) === result ? result : this;
    }
    return targetFunction.apply(thisArg, concatenateArrays(boundArgs, arguments));
  });
  
  if (targetFunction.prototype) {
    const EmptyConstructor = function(this: any) {};
    EmptyConstructor.prototype = targetFunction.prototype;
    boundFunction.prototype = new (EmptyConstructor as any)();
    EmptyConstructor.prototype = null;
  }
  
  return boundFunction;
};

export default bindPolyFill;