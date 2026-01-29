interface PromiseConstructor {
  prototype: Promise<any>;
}

interface PromisePrototype {
  catch?: unknown;
  finally?: unknown;
}

const SPECIES_SYMBOL = Symbol.species;

const globalThis = (typeof window !== 'undefined' ? window : global) as any;

function isNativeCode(fn: Function): boolean {
  return /native code/.test(Function.prototype.toString.call(fn));
}

function getClassName(Constructor: any): string {
  return Function.prototype.toString.call(Constructor);
}

function isCallable(value: unknown): value is Function {
  return typeof value === 'function';
}

function checkVersion(version: number): number {
  return version;
}

function hasPromiseRejectionEvent(): boolean {
  return typeof globalThis.PromiseRejectionEvent === 'function';
}

const NativePromise: PromiseConstructor | undefined = globalThis.Promise;
const nativePrototype: PromisePrototype | undefined = NativePromise?.prototype;
const SPECIES = SPECIES_SYMBOL;
let subclassingSupported = false;
const hasRejectionEvent = hasPromiseRejectionEvent();
const engineVersion = checkVersion(0);
const isCordova = false;
const isNode = false;

function isPromiseConstructorBroken(): boolean {
  if (!NativePromise) return true;

  const className = getClassName(NativePromise);
  const isNotStringified = className !== String(NativePromise);

  if (!isNotStringified && engineVersion === 66) {
    return true;
  }

  if (isCordova && (!nativePrototype?.catch || !nativePrototype?.finally)) {
    return true;
  }

  if (!engineVersion || engineVersion < 51 || !isNativeCode(NativePromise)) {
    const testPromise = new NativePromise((resolve) => {
      resolve(1);
    });

    const SubclassConstructor = function (
      executor: (resolve: (value?: any) => void, reject: (reason?: any) => void) => void
    ) {
      executor(() => {}, () => {});
    };

    const promiseConstructor: any = {};
    promiseConstructor[SPECIES] = SubclassConstructor;
    testPromise.constructor = promiseConstructor;

    subclassingSupported = testPromise.then(() => {}) instanceof SubclassConstructor;

    if (!subclassingSupported) {
      return true;
    }
  }

  return !isNotStringified && (isCordova || isNode) && !hasRejectionEvent;
}

interface PromisePolyfillStatus {
  CONSTRUCTOR: boolean;
  REJECTION_EVENT: boolean;
  SUBCLASSING: boolean;
}

export const promiseStatus: PromisePolyfillStatus = {
  CONSTRUCTOR: isPromiseConstructorBroken(),
  REJECTION_EVENT: hasRejectionEvent,
  SUBCLASSING: subclassingSupported,
};