interface IteratorPrototype {
  [key: string | symbol]: unknown;
}

interface IteratorExports {
  IteratorPrototype: IteratorPrototype;
  BUGGY_SAFARI_ITERATORS: boolean;
}

import fails from './fails';
import isCallable from './isCallable';
import isObject from './isObject';
import objectCreate from './objectCreate';
import getPrototypeOf from './getPrototypeOf';
import defineBuiltIn from './defineBuiltIn';
import wellKnownSymbol from './wellKnownSymbol';
import IS_PURE from './isPure';

const iteratorSymbol = wellKnownSymbol('iterator');
let buggySafariIterators = false;
let iteratorPrototype: IteratorPrototype;

const arrayIterator = [].keys();

if (arrayIterator) {
  if ('next' in arrayIterator) {
    const prototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    
    if (prototype !== Object.prototype) {
      iteratorPrototype = prototype;
    }
  } else {
    buggySafariIterators = true;
  }
}

if (
  !isObject(iteratorPrototype) ||
  fails(() => {
    const testObject: Record<string | symbol, unknown> = {};
    return iteratorPrototype[iteratorSymbol].call(testObject) !== testObject;
  })
) {
  iteratorPrototype = {};
} else if (IS_PURE) {
  iteratorPrototype = objectCreate(iteratorPrototype);
}

if (!isCallable(iteratorPrototype[iteratorSymbol])) {
  defineBuiltIn(iteratorPrototype, iteratorSymbol, function (this: unknown): unknown {
    return this;
  });
}

const exports: IteratorExports = {
  IteratorPrototype: iteratorPrototype,
  BUGGY_SAFARI_ITERATORS: buggySafariIterators
};

export default exports;
export { iteratorPrototype as IteratorPrototype, buggySafariIterators as BUGGY_SAFARI_ITERATORS };