import { exportToGlobal } from './14709';
import { call } from './948496';
import { isInternalMode } from './700846';
import { propertyDescriptor } from './702695';
import { isCallable } from './170452';
import { createIteratorPrototype } from './880591';
import { getPrototypeOf } from './711282';
import { setPrototypeOf } from './260934';
import { defineIteratorSymbol } from './823986';
import { defineProperty } from './716176';
import { redefineProperty } from './116605';
import { wellKnownSymbol } from './446898';
import { iterators } from './684964';
import { iteratorMetadata } from './253722';

const PROPER = propertyDescriptor.PROPER;
const CONFIGURABLE = propertyDescriptor.CONFIGURABLE;
const IteratorPrototype = iteratorMetadata.IteratorPrototype;
const BUGGY_SAFARI_ITERATORS = iteratorMetadata.BUGGY_SAFARI_ITERATORS;
const ITERATOR_SYMBOL = wellKnownSymbol('iterator');

const KEYS = 'keys';
const VALUES = 'values';
const ENTRIES = 'entries';

interface IteratorResult<T> {
  done: boolean;
  value: T;
}

interface Iterator<T> {
  next(): IteratorResult<T>;
}

interface Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
}

type IteratorKind = 'keys' | 'values' | 'entries';

const returnThis = function(this: unknown): unknown {
  return this;
};

export default function defineIterator<T>(
  target: new (...args: any[]) => T,
  name: string,
  IteratorConstructor: new (instance: T, kind: string) => Iterator<any>,
  defaultIteratorKind: IteratorKind,
  iteratorKind: IteratorKind,
  isKeyOnly: boolean,
  forced: boolean
): Record<string, () => Iterator<any>> {
  createIteratorPrototype(IteratorConstructor, name, defaultIteratorKind);

  const getIterationMethod = (kind: string): (() => Iterator<any>) => {
    if (kind === iteratorKind && defaultIterator) {
      return defaultIterator;
    }
    
    if (!BUGGY_SAFARI_ITERATORS && kind in prototype) {
      return prototype[kind];
    }
    
    switch (kind) {
      case KEYS:
      case VALUES:
      case ENTRIES:
        return function(this: T): Iterator<any> {
          return new IteratorConstructor(this, kind);
        };
    }
    
    return function(this: T): Iterator<any> {
      return new IteratorConstructor(this);
    };
  };

  const iteratorName = name + ' Iterator';
  let incorrectIterator = false;
  const prototype = target.prototype;
  const nativeIterator = prototype[ITERATOR_SYMBOL] || 
                         prototype['@@iterator'] || 
                         (iteratorKind && prototype[iteratorKind]);
  let defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || 
                         getIterationMethod(iteratorKind);
  const anyNativeIterator = name === 'Array' && prototype.entries || nativeIterator;

  // Fix native iterator prototype
  if (anyNativeIterator) {
    const currentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new target()));
    
    if (currentIteratorPrototype !== Object.prototype && currentIteratorPrototype.next) {
      if (!isInternalMode && getPrototypeOf(currentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(currentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(currentIteratorPrototype[ITERATOR_SYMBOL])) {
          redefineProperty(currentIteratorPrototype, ITERATOR_SYMBOL, returnThis);
        }
      }
      
      defineIteratorSymbol(currentIteratorPrototype, iteratorName, true, true);
      
      if (isInternalMode) {
        iterators[iteratorName] = returnThis;
      }
    }
  }

  // Fix iterator name for VALUES iterator
  if (PROPER && iteratorKind === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (!isInternalMode && CONFIGURABLE) {
      defineProperty(prototype, 'name', VALUES);
    } else {
      incorrectIterator = true;
      defaultIterator = function(this: T): Iterator<any> {
        return call(nativeIterator, this);
      };
    }
  }

  // Export iterator methods
  const methods: Record<string, () => Iterator<any>> = {
    values: getIterationMethod(VALUES),
    keys: isKeyOnly ? defaultIterator : getIterationMethod(KEYS),
    entries: getIterationMethod(ENTRIES)
  };

  if (forced) {
    for (const key in methods) {
      if (BUGGY_SAFARI_ITERATORS || incorrectIterator || !(key in prototype)) {
        redefineProperty(prototype, key, methods[key]);
      }
    }
  } else {
    exportToGlobal(
      {
        target: name,
        proto: true,
        forced: BUGGY_SAFARI_ITERATORS || incorrectIterator
      },
      methods
    );
  }

  // Set default iterator
  if ((isInternalMode && !forced) || prototype[ITERATOR_SYMBOL] === defaultIterator) {
    redefineProperty(prototype, ITERATOR_SYMBOL, defaultIterator, {
      name: iteratorKind
    });
  }

  iterators[name] = defaultIterator;

  return methods;
}