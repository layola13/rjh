const hasNativeBind = typeof Function.prototype.bind === 'function';

const nativeBind = hasNativeBind 
  ? Function.prototype.bind.bind(Function.prototype.call, Function.prototype.call)
  : null;

type AnyFunction = (...args: any[]) => any;

function createBoundCall<T extends AnyFunction>(fn: T): T {
  return ((...args: any[]) => {
    return Function.prototype.call.apply(fn, args);
  }) as T;
}

export default hasNativeBind && nativeBind 
  ? nativeBind 
  : createBoundCall;