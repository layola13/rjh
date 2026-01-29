import { exportToGlobal } from './utils/export';
import { global } from './global';
import { getMethod } from './utils/object';
import { isCallable } from './utils/type-check';
import { redefine } from './utils/redefine';
import { enableWeakMap } from './weak-map-enabler';
import { iterate } from './utils/iterate';
import { checkInstance } from './utils/check-instance';
import { fails } from './utils/fails';
import { isNullOrUndefined } from './utils/null-check';
import { isObject } from './utils/is-object';
import { tryToString } from './utils/try-to-string';
import { checkIterableObject } from './utils/check-iterable';
import { setToStringTag } from './utils/set-to-string-tag';
import { inheritPrototype } from './utils/inherit';

type CollectionName = 'Map' | 'Set' | 'WeakMap' | 'WeakSet';
type CollectionMethod = 'add' | 'set' | 'delete' | 'get' | 'has';

interface CollectionConstructor<T = any> {
  new (...args: any[]): T;
  prototype: T;
}

interface CollectionOptions {
  getConstructor: (
    wrapper: (...args: any[]) => void,
    name: string,
    isMap: boolean,
    adderName: string
  ) => CollectionConstructor;
  setStrong: (
    constructor: CollectionConstructor,
    name: string,
    isMap: boolean
  ) => void;
}

export default function defineCollection(
  collectionName: CollectionName,
  wrapper: (...args: any[]) => void,
  options: CollectionOptions
): CollectionConstructor {
  const isMap = collectionName.indexOf('Map') !== -1;
  const isWeak = collectionName.indexOf('Weak') !== -1;
  const adderName: CollectionMethod = isMap ? 'set' : 'add';
  const NativeConstructor = global[collectionName] as CollectionConstructor | undefined;
  const NativePrototype = NativeConstructor?.prototype;
  let Constructor = NativeConstructor;
  const exported: Record<string, CollectionConstructor> = {};

  const fixMethod = (methodName: CollectionMethod): void => {
    if (!NativePrototype) return;

    const originalMethod = getMethod(NativePrototype[methodName]);

    redefine(NativePrototype, methodName, 
      methodName === 'add'
        ? function add(value: any): any {
            return originalMethod(this, value === 0 ? 0 : value), this;
          }
        : methodName === 'delete'
        ? function deleteMethod(key: any): boolean {
            return isWeak && !isObject(key)
              ? false
              : originalMethod(this, key === 0 ? 0 : key);
          }
        : methodName === 'get'
        ? function get(key: any): any {
            return isWeak && !isObject(key)
              ? undefined
              : originalMethod(this, key === 0 ? 0 : key);
          }
        : methodName === 'has'
        ? function has(key: any): boolean {
            return isWeak && !isObject(key)
              ? false
              : originalMethod(this, key === 0 ? 0 : key);
          }
        : function set(key: any, value: any): any {
            return originalMethod(this, key === 0 ? 0 : key, value), this;
          }
    );
  };

  if (
    isCallable(collectionName, !fails(NativeConstructor) || !(
      isWeak ||
      (NativePrototype.forEach && !tryToString(() => {
        new NativeConstructor!().entries().next();
      }))
    ))
  ) {
    Constructor = options.getConstructor(wrapper, collectionName, isMap, adderName);
    enableWeakMap();
  } else if (isCallable(collectionName, true)) {
    const instance = new Constructor!();
    const hasBrokenZero = instance[adderName](isWeak ? {} : -0, 1) !== instance;
    const throwsOnInspection = fails(() => {
      instance.has(1);
    });
    const acceptsIterables = checkIterableObject((iterable: any) => {
      new NativeConstructor!(iterable);
    });
    const hasIncorrectNegativeZero = !isWeak && fails(() => {
      const testInstance = new NativeConstructor!();
      for (let i = 5; i--;) {
        testInstance[adderName](i, i);
      }
      return !testInstance.has(-0);
    });

    if (!acceptsIterables) {
      Constructor = wrapper(function CollectionWrapper(
        this: any,
        target: any,
        iterable?: any
      ): any {
        checkInstance(target, NativePrototype!);
        const newInstance = inheritPrototype(new NativeConstructor!(), target, Constructor!);
        if (!isNullOrUndefined(iterable)) {
          iterate(iterable, newInstance[adderName], {
            that: newInstance,
            AS_ENTRIES: isMap
          });
        }
        return newInstance;
      }) as any;
      Constructor!.prototype = NativePrototype;
      NativePrototype!.constructor = Constructor!;
    }

    if (throwsOnInspection || hasIncorrectNegativeZero) {
      fixMethod('delete');
      fixMethod('has');
      if (isMap) fixMethod('get');
    }

    if (hasIncorrectNegativeZero || hasBrokenZero) {
      fixMethod(adderName);
    }

    if (isWeak && NativePrototype!.clear) {
      delete NativePrototype!.clear;
    }
  }

  exported[collectionName] = Constructor!;

  exportToGlobal(
    {
      global: true,
      constructor: true,
      forced: Constructor !== NativeConstructor
    },
    exported
  );

  setToStringTag(Constructor!, collectionName);

  if (!isWeak) {
    options.setStrong(Constructor!, collectionName, isMap);
  }

  return Constructor!;
}