/**
 * Sets the prototype of one object to another, providing a polyfill for Object.setPrototypeOf
 * @param target - The object whose prototype will be set
 * @param prototype - The new prototype object
 * @returns The target object with its prototype set
 */
declare function setPrototypeOf<T extends object, P extends object>(
  target: T,
  prototype: P
): T & P;

export default setPrototypeOf;
export { setPrototypeOf };