import defineGlobalProperty from './79227';
import globalThis from './81482';
import setPrototypeOf from './65076';
import isCallable from './52530';
import defineProperty from './71154';
import testCallability from './87524';
import hasOwnProperty from './98324';
import getWellKnownSymbol from './46976';
import { IteratorPrototype } from './30036';
import shouldUseNativeIterator from './28808';

const toStringTag = getWellKnownSymbol("toStringTag");
const NativeIterator = globalThis.Iterator;

const shouldPolyfillIterator = 
  shouldUseNativeIterator || 
  !isCallable(NativeIterator) || 
  NativeIterator.prototype !== IteratorPrototype || 
  !testCallability(() => {
    NativeIterator({});
  });

class IteratorConstructor {
  constructor() {
    setPrototypeOf(this, IteratorPrototype);
  }
}

if (!hasOwnProperty(IteratorPrototype, toStringTag)) {
  defineProperty(IteratorPrototype, toStringTag, "Iterator");
}

if (
  !shouldPolyfillIterator && 
  hasOwnProperty(IteratorPrototype, "constructor") && 
  IteratorPrototype.constructor !== Object
) {
  // Constructor already exists and is not Object
} else {
  defineProperty(IteratorPrototype, "constructor", IteratorConstructor);
}

IteratorConstructor.prototype = IteratorPrototype;

defineGlobalProperty(
  {
    global: true,
    constructor: true,
    forced: shouldPolyfillIterator
  },
  {
    Iterator: IteratorConstructor
  }
);