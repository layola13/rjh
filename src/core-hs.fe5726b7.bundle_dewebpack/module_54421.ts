interface IteratorPrototypeConfig {
  next: PropertyDescriptor;
}

interface IteratorConstructor {
  new(): Iterator<unknown>;
  prototype: Iterator<unknown>;
}

type IteratorPrototype = Iterator<unknown>;

function createIteratorConstructor(
  constructor: IteratorConstructor,
  name: string,
  nextValue: unknown,
  writable: boolean
): IteratorConstructor {
  const iteratorName = `${name} Iterator`;
  
  const createObject = (proto: IteratorPrototype, properties: IteratorPrototypeConfig): Iterator<unknown> => {
    return Object.create(proto, properties);
  };

  const createPropertyDescriptor = (writable: boolean, value: unknown): PropertyDescriptor => {
    return {
      value,
      writable: !writable,
      enumerable: false,
      configurable: true
    };
  };

  const setToStringTag = (target: IteratorConstructor, tag: string): void => {
    Object.defineProperty(target, Symbol.toStringTag, {
      value: tag,
      writable: false,
      enumerable: false,
      configurable: true
    });
  };

  const returnThis = function (this: unknown): unknown {
    return this;
  };

  const iteratorPrototype: IteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));
  
  constructor.prototype = createObject(iteratorPrototype, {
    next: createPropertyDescriptor(writable, nextValue)
  });

  setToStringTag(constructor, iteratorName);
  
  const iterators: Record<string, () => unknown> = {};
  iterators[iteratorName] = returnThis;

  return constructor;
}

export default createIteratorConstructor;