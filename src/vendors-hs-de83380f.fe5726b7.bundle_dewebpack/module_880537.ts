import isNativeReflectConstruct from './module_654731';
import setPrototypeOf from './module_509441';

/**
 * Constructs an instance using the new operator with an array of arguments.
 * Falls back to Function.prototype.bind when Reflect.construct is not available.
 * 
 * @param Constructor - The constructor function to instantiate
 * @param args - Array of arguments to pass to the constructor
 * @param NewTarget - Optional new.target value for the constructor
 * @returns A new instance of the constructor
 */
export default function construct<T = any>(
  Constructor: new (...args: any[]) => T,
  args: readonly any[],
  NewTarget?: new (...args: any[]) => any
): T {
  if (isNativeReflectConstruct()) {
    return Reflect.construct(Constructor, args, NewTarget ?? Constructor);
  }

  const bindArgs: [null, ...any[]] = [null, ...args];
  const BoundConstructor = Constructor.bind.apply(Constructor, bindArgs) as new () => T;
  const instance = new BoundConstructor();

  if (NewTarget) {
    setPrototypeOf(instance, NewTarget.prototype);
  }

  return instance;
}