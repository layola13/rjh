interface PromiseCapability<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

function race<T>(this: PromiseConstructor, iterable: Iterable<T | PromiseLike<T>>): Promise<Awaited<T>> {
  const constructor = this;
  const capability = createPromiseCapability<Awaited<T>>(constructor);
  const reject = capability.reject;
  
  const result = executeWithErrorHandling(() => {
    const resolveFunction = getResolveFunction(constructor.resolve);
    
    iterateOver(iterable, (item) => {
      resolveFunction.call(constructor, item).then(capability.resolve, reject);
    });
  });
  
  if (result.error) {
    reject(result.value);
  }
  
  return capability.promise;
}

function createPromiseCapability<T>(constructor: PromiseConstructor): PromiseCapability<T> {
  // Implementation would create and return a new PromiseCapability
  throw new Error('Implementation required');
}

function getResolveFunction(resolve: any): Function {
  // Implementation would validate and return the resolve function
  throw new Error('Implementation required');
}

function executeWithErrorHandling(fn: () => void): { error: boolean; value?: any } {
  try {
    fn();
    return { error: false };
  } catch (error) {
    return { error: true, value: error };
  }
}

function iterateOver<T>(iterable: Iterable<T>, callback: (item: T) => void): void {
  for (const item of iterable) {
    callback(item);
  }
}