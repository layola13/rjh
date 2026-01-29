export interface PromisePolyfillCheck {
  CONSTRUCTOR: boolean;
  REJECTION_EVENT: boolean;
  SUBCLASSING: boolean;
}

const isCallable = (value: unknown): value is Function => {
  return typeof value === 'function';
};

const getBuiltIn = (name: string): any => {
  return (globalThis as any)[name];
};

const hasNativePromise = (): boolean => {
  return typeof Promise !== 'undefined';
};

const getPromiseConstructor = (): PromiseConstructor | undefined => {
  return hasNativePromise() ? Promise : undefined;
};

const getFunctionSource = (fn: Function): string => {
  return Function.prototype.toString.call(fn);
};

const wellKnownSymbol = (name: string): symbol => {
  return Symbol.for(name);
};

const IS_PURE = false;
const IS_BROWSER = typeof window !== 'undefined';
const ENGINE_V8_VERSION = getV8Version();

function getV8Version(): number {
  const match = navigator?.userAgent?.match(/Chrome\/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function checkPromiseRejectionEvent(): boolean {
  return typeof PromiseRejectionEvent === 'function';
}

function checkPromiseConstructor(): boolean {
  const PromiseConstructor = getPromiseConstructor();
  const promisePrototype = PromiseConstructor?.prototype;
  const speciesSymbol = wellKnownSymbol('species');
  
  let subclassingWorks = false;
  const hasRejectionEvent = checkPromiseRejectionEvent();
  
  if (!PromiseConstructor) {
    return true;
  }
  
  const constructorSource = getFunctionSource(PromiseConstructor);
  const isNativeConstructor = constructorSource === String(PromiseConstructor);
  
  if (!isNativeConstructor && ENGINE_V8_VERSION === 66) {
    return true;
  }
  
  if (IS_PURE && (!promisePrototype?.catch || !promisePrototype?.finally)) {
    return true;
  }
  
  if (!ENGINE_V8_VERSION || ENGINE_V8_VERSION < 51 || !/native code/.test(constructorSource)) {
    const testPromise = new PromiseConstructor((resolve: (value: number) => void) => {
      resolve(1);
    });
    
    const customConstructor = (
      executor: (
        resolve: () => void,
        reject: () => void
      ) => void
    ): void => {
      executor(() => {}, () => {});
    };
    
    (testPromise.constructor as any) = {};
    (testPromise.constructor as any)[speciesSymbol] = customConstructor;
    
    subclassingWorks = testPromise.then(() => {}) instanceof (customConstructor as any);
    
    if (!subclassingWorks) {
      return true;
    }
  }
  
  return !isNativeConstructor && (IS_BROWSER || IS_PURE) && !hasRejectionEvent;
}

const result: PromisePolyfillCheck = {
  CONSTRUCTOR: checkPromiseConstructor(),
  REJECTION_EVENT: checkPromiseRejectionEvent(),
  SUBCLASSING: false
};

export default result;