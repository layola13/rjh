type SetLike<T> = {
  size: number;
  has: (value: T) => boolean;
  keys: () => Iterator<T>;
};

class SetAdapter<T> {
  private readonly set: SetLike<T>;
  public readonly size: number;
  private readonly has: (value: T) => boolean;
  private readonly keys: () => Iterator<T>;

  constructor(
    set: SetLike<T>,
    size: number,
    has: (value: T) => boolean,
    keys: () => Iterator<T>
  ) {
    this.set = set;
    this.size = size;
    this.has = has;
    this.keys = keys;
  }

  getIterator(): Iterator<T> {
    const keysIterator = this.keys.call(this.set);
    if (typeof keysIterator !== 'object' || keysIterator === null) {
      throw new TypeError('keys must return an iterator');
    }
    return keysIterator;
  }

  includes(value: T): boolean {
    return this.has.call(this.set, value);
  }
}

function validateCallable<T extends Function>(fn: unknown): T {
  if (typeof fn !== 'function') {
    throw new TypeError('Argument is not callable');
  }
  return fn as T;
}

function toIntegerOrInfinity(value: number): number {
  const number = Number(value);
  if (Number.isNaN(number)) {
    return 0;
  }
  if (number === 0 || !Number.isFinite(number)) {
    return number;
  }
  return Math.trunc(number);
}

export default function createSetAdapter<T>(setLike: SetLike<T>): SetAdapter<T> {
  validateCallable(setLike);

  const sizeValue = Number(setLike.size);
  if (Number.isNaN(sizeValue)) {
    throw new TypeError('Invalid size');
  }

  const normalizedSize = Math.max(toIntegerOrInfinity(sizeValue), 0);
  const hasMethod = validateCallable<(value: T) => boolean>(setLike.has);
  const keysMethod = validateCallable<() => Iterator<T>>(setLike.keys);

  return new SetAdapter<T>(setLike, normalizedSize, hasMethod, keysMethod);
}