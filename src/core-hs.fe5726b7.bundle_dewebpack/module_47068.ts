import isCallable from './isCallable';
import isObject from './isObject';
import setPrototypeOf from './setPrototypeOf';

/**
 * Sets the prototype of an object if the constructor's prototype differs from the expected prototype.
 * 
 * @param target - The target object to set the prototype on
 * @param constructor - The constructor function that created the target
 * @param expectedConstructor - The expected constructor function
 * @returns The target object with potentially modified prototype
 */
export default function inheritPrototype<T extends object>(
  target: T,
  constructor: unknown,
  expectedConstructor: unknown
): T {
  let actualConstructor: unknown;
  let constructorPrototype: unknown;

  if (
    setPrototypeOf &&
    isCallable(actualConstructor = (constructor as any).constructor) &&
    actualConstructor !== expectedConstructor &&
    isObject(constructorPrototype = (actualConstructor as any).prototype) &&
    constructorPrototype !== (expectedConstructor as any).prototype
  ) {
    setPrototypeOf(target, constructorPrototype);
  }

  return target;
}