import { exportToGlobal } from './utils/export';
import { callFunction } from './utils/function';
import { isIteratorPrototype } from './utils/prototype';
import { getProperConfig } from './config';
import { isCallable } from './utils/callable';
import { createIteratorPrototype } from './iterator/prototype';
import { getPrototypeOf } from './utils/object';
import { setPrototypeOf } from './utils/setPrototype';
import { setToStringTag } from './utils/toStringTag';
import { defineProperty } from './utils/property';
import { redefine } from './utils/redefine';
import { getWellKnownSymbol } from './utils/symbols';
import { getIterators } from './iterator/registry';
import { IteratorStep } from './iterator/step';

const PROPER = getProperConfig();
const CONFIGURABLE = getProperConfig('CONFIGURABLE');
const IteratorPrototype = IteratorStep.IteratorPrototype;
const BUGGY_SAFARI_ITERATORS = IteratorStep.BUGGY_SAFARI_ITERATORS;
const ITERATOR_SYMBOL = getWellKnownSymbol('iterator');
const KEYS = 'keys';
const VALUES = 'values';
const ENTRIES = 'entries';

const returnThis = function (this: unknown): unknown {
  return this;
};

interface IteratorMethods<T> {
  values: () => Iterator<T>;
  keys: () => Iterator<PropertyKey>;
  entries: () => Iterator<[PropertyKey, T]>;
}

type IteratorKind = typeof KEYS | typeof VALUES | typeof ENTRIES;

export default function defineIterator<T>(
  Constructor: new (...args: any[]) => T,
  name: string,
  IteratorConstructor: new (target: T, kind: string) => Iterator<any>,
  defaultIteratorKind: IteratorKind,
  iteratorKind: IteratorKind | undefined,
  isDefaultIteratorMethod: boolean,
  forced: boolean
): IteratorMethods<any> {
  createIteratorPrototype(IteratorConstructor, name, defaultIteratorKind);

  let defaultIterator: (() => Iterator<any>) | undefined;
  let kindIterator: (() => Iterator<any>) | undefined;
  let methodName: string | undefined;

  const getIterationMethod = (kind: IteratorKind | undefined): (() => Iterator<any>) => {
    if (kind === iteratorKind && nativeIterator) {
      return nativeIterator;
    }
    if (!BUGGY_SAFARI_ITERATORS && kind && kind in prototype) {
      return (prototype as any)[kind];
    }
    switch (kind) {
      case KEYS:
      case VALUES:
      case ENTRIES:
        return function (this: T): Iterator<any> {
          return new IteratorConstructor(this, kind);
        };
    }
    return function (this: T): Iterator<any> {
      return new IteratorConstructor(this, kind ?? '');
    };
  };

  const iteratorName = `${name} Iterator`;
  let incorrectNativeName = false;
  const prototype = Constructor.prototype;
  const nativeIteratorMethod = 
    (prototype as any)[ITERATOR_SYMBOL] || 
    (prototype as any)['@@iterator'] || 
    (iteratorKind && (prototype as any)[iteratorKind]);
  const nativeIterator = !BUGGY_SAFARI_ITERATORS && nativeIteratorMethod || getIterationMethod(iteratorKind);
  const anyNativeIterator = name === 'Array' && prototype.entries || nativeIteratorMethod;

  if (anyNativeIterator) {
    defaultIterator = getPrototypeOf(anyNativeIterator.call(new Constructor()));
    if (defaultIterator !== Object.prototype && defaultIterator.next) {
      if (!isIteratorPrototype || getPrototypeOf(defaultIterator) === IteratorPrototype || 
          (setPrototypeOf ? setPrototypeOf(defaultIterator, IteratorPrototype) : 
           isCallable((defaultIterator as any)[ITERATOR_SYMBOL]) || 
           redefine(defaultIterator, ITERATOR_SYMBOL, returnThis)
          )
      ) {
        setToStringTag(defaultIterator, iteratorName, true, true);
      }
      if (isIteratorPrototype) {
        getIterators()[iteratorName] = returnThis;
      }
    }
  }

  if (PROPER && iteratorKind === VALUES && nativeIteratorMethod && nativeIteratorMethod.name !== VALUES) {
    if (!isIteratorPrototype && CONFIGURABLE) {
      defineProperty(prototype, 'name', VALUES);
    } else {
      incorrectNativeName = true;
      nativeIterator = function (this: T): Iterator<any> {
        return callFunction(nativeIteratorMethod, this);
      };
    }
  }

  let methods: IteratorMethods<any> | undefined;
  if (iteratorKind) {
    kindIterator = getIterationMethod(VALUES);
    methods = {
      values: kindIterator,
      keys: isDefaultIteratorMethod ? nativeIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    
    if (forced) {
      for (methodName in methods) {
        if (BUGGY_SAFARI_ITERATORS || incorrectNativeName || !(methodName in prototype)) {
          redefine(prototype, methodName, (methods as any)[methodName]);
        }
      }
    } else {
      exportToGlobal({
        target: name,
        proto: true,
        forced: BUGGY_SAFARI_ITERATORS || incorrectNativeName
      }, methods);
    }
  }

  if (!isIteratorPrototype && !forced || (prototype as any)[ITERATOR_SYMBOL] === nativeIterator || 
      redefine(prototype, ITERATOR_SYMBOL, nativeIterator, { name: iteratorKind })
  ) {
    // Iterator set
  }
  
  getIterators()[name] = nativeIterator;
  
  return methods!;
}