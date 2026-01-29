interface IteratorPrototype {
  [key: string | symbol]: any;
}

interface IteratorExports {
  IteratorPrototype: IteratorPrototype;
  BUGGY_SAFARI_ITERATORS: boolean;
}

import fails from './fails';
import isCallable from './isCallable';
import isObject from './isObject';
import createObject from './createObject';
import getPrototypeOf from './getPrototypeOf';
import defineProperty from './defineProperty';
import wellKnownSymbol from './wellKnownSymbol';
import isPure from './isPure';

const iteratorSymbol: symbol = wellKnownSymbol('iterator');
let buggySafariIterators = false;
let iteratorPrototype: IteratorPrototype | undefined;

const arrayKeysIterator = [].keys();

if (arrayKeysIterator) {
  if ('next' in arrayKeysIterator) {
    const prototype = getPrototypeOf(getPrototypeOf(arrayKeysIterator));
    
    if (prototype !== Object.prototype) {
      iteratorPrototype = prototype;
    }
  } else {
    buggySafariIterators = true;
  }
}

if (!isObject(iteratorPrototype) || fails(() => {
  const testObject = {};
  return iteratorPrototype![iteratorSymbol].call(testObject) !== testObject;
})) {
  iteratorPrototype = {};
} else if (isPure) {
  iteratorPrototype = createObject(iteratorPrototype);
}

if (!isCallable(iteratorPrototype[iteratorSymbol])) {
  defineProperty(iteratorPrototype, iteratorSymbol, function(this: any): any {
    return this;
  });
}

const exports: IteratorExports = {
  IteratorPrototype: iteratorPrototype,
  BUGGY_SAFARI_ITERATORS: buggySafariIterators
};

export default exports;
export { iteratorPrototype as IteratorPrototype, buggySafariIterators as BUGGY_SAFARI_ITERATORS };