/**
 * Creates a new promise-based wrapper for an asynchronous operation.
 * 
 * @param target - The target object or function to wrap
 * @param propertyKey - The property key to access on the target
 * @param descriptor - The property descriptor for the operation
 * @param options - Additional options for the operation
 * @param promiseConstructor - The Promise constructor to use (defaults to native Promise)
 * @returns A new promise wrapper instance
 */
declare function createAsyncWrapper<T = unknown>(
  target: unknown,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
  options: unknown,
  promiseConstructor?: PromiseConstructor
): Promise<T>;

export = createAsyncWrapper;
export default createAsyncWrapper;