type AnyFunction = (...args: any[]) => any;

const hasNativeBind: boolean = (function(): boolean {
  try {
    return typeof Function.prototype.bind === 'function';
  } catch {
    return false;
  }
})();

const functionPrototype = Function.prototype;
const call = functionPrototype.call;
const nativeBoundCall = hasNativeBind && functionPrototype.bind.bind(call, call);

export default hasNativeBind
  ? nativeBoundCall
  : function bindCall<T extends AnyFunction>(fn: T): T {
      return function(this: any, ...args: any[]): any {
        return call.apply(fn, arguments);
      } as T;
    };