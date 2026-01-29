const wellKnownSymbol = (name: string): symbol => {
  return Symbol.for(name);
};

interface Iterators {
  Array?: symbol;
}

const iterators: Iterators = {
  Array: wellKnownSymbol('Array.iterator')
};

const iteratorSymbol: symbol = wellKnownSymbol('iterator');
const arrayPrototype: unknown[] = Array.prototype;

export function isArrayIterator(value: unknown): boolean {
  return (
    value !== undefined &&
    (iterators.Array === value || arrayPrototype[iteratorSymbol as keyof typeof arrayPrototype] === value)
  );
}