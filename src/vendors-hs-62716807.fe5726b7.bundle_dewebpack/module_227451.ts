interface StringIteratorState {
  type: string;
  string: string;
  index: number;
}

type IteratorResult<T> = {
  value: T;
  done: boolean;
};

const STRING_ITERATOR_TYPE = "String Iterator";

class StringIterator implements Iterator<string> {
  private state: StringIteratorState;

  constructor(value: unknown) {
    this.state = {
      type: STRING_ITERATOR_TYPE,
      string: String(value),
      index: 0
    };
  }

  next(): IteratorResult<string | undefined> {
    const { string, index } = this.state;

    if (index >= string.length) {
      return createIteratorResult(undefined, true);
    }

    const char = getCharAt(string, index);
    this.state.index += char.length;
    
    return createIteratorResult(char, false);
  }
}

function getCharAt(str: string, index: number): string {
  return str.charAt(index);
}

function createIteratorResult<T>(value: T, done: boolean): IteratorResult<T> {
  return { value, done };
}

export { StringIterator };