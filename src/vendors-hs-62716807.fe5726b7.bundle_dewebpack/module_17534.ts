type ReflectType = typeof Reflect | undefined;

function getReflectApply(): <T, A extends any[], R>(
  target: (this: T, ...args: A) => R,
  thisArgument: T,
  argumentsList: A
) => R {
  const reflectType: string = typeof Reflect === "undefined" ? "undefined" : typeof Reflect;
  
  if (reflectType === "object" && Reflect?.apply) {
    return Reflect.apply;
  }
  
  const functionPrototype = Function.prototype;
  const nativeApply = functionPrototype.apply;
  const nativeCall = functionPrototype.call;
  
  const hasBindSupport = typeof nativeCall.bind === "function";
  
  if (hasBindSupport) {
    return nativeCall.bind(nativeApply);
  }
  
  return function applyPolyfill<T, A extends any[], R>(
    target: (this: T, ...args: A) => R,
    thisArgument: T,
    argumentsList: A
  ): R {
    return nativeCall.apply(nativeApply, arguments as any);
  };
}

export default getReflectApply();