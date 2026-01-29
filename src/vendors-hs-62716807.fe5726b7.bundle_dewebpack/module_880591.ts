interface IteratorPrototypeDescriptor {
  value?: unknown;
  writable?: boolean;
  enumerable?: boolean;
  configurable?: boolean;
}

interface IteratorObject<T = unknown> {
  next(): IteratorResult<T>;
  [Symbol.iterator](): IteratorObject<T>;
}

interface IteratorResult<T> {
  done: boolean;
  value: T;
}

type IteratorPrototype = object;

type CreatePropertyDescriptor = (enumerable: number, value: unknown) => PropertyDescriptor;

type ObjectCreate = (proto: object, properties: Record<string, PropertyDescriptor>) => object;

type SetToStringTag = (target: object, tag: string, enumerable: boolean, configurable: boolean) => void;

type Iterators = Record<string, () => IteratorObject>;

const iteratorPrototype: IteratorPrototype = {} as IteratorPrototype;
const objectCreate: ObjectCreate = Object.create;
const createPropertyDescriptor: CreatePropertyDescriptor = (enumerable, value) => ({
  value,
  writable: true,
  enumerable: Boolean(enumerable),
  configurable: true
});
const setToStringTag: SetToStringTag = (target, tag) => {
  Object.defineProperty(target, Symbol.toStringTag, {
    value: tag,
    configurable: true
  });
};
const iterators: Iterators = {} as Iterators;

function returnThis(this: IteratorObject): IteratorObject {
  return this;
}

function defineIterator<T extends new (...args: unknown[]) => IteratorObject>(
  IteratorConstructor: T,
  name: string,
  nextValue: unknown,
  isEnumerable?: boolean
): T {
  const iteratorName = `${name} Iterator`;
  
  IteratorConstructor.prototype = objectCreate(iteratorPrototype, {
    next: createPropertyDescriptor(+!isEnumerable, nextValue)
  });
  
  setToStringTag(IteratorConstructor, iteratorName, false, true);
  
  iterators[iteratorName] = returnThis;
  
  return IteratorConstructor;
}

export default defineIterator;