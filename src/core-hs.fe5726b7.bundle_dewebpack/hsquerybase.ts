abstract class HSQueryBase<T> {
  protected finish: boolean = false;
  protected innerBuffer: T[] = [];

  includes(value: T): boolean {
    return this.some((item) => item === value);
  }

  convert<U>(reducer: (accumulator: U, current: T) => U, initialValue: U): U {
    if (!this.finish) {
      this.traverseTheRest(undefined, true);
    }
    return this.innerBuffer.reduce(reducer, initialValue);
  }

  filter(predicate: (value: T) => boolean): T[] {
    const filtered = this.innerBuffer.filter(predicate);
    
    if (!this.finish) {
      this.traverseTheRest((item) => {
        if (predicate(item)) {
          filtered.push(item);
        }
      }, true);
    }
    
    return filtered;
  }

  find(predicate: (value: T) => boolean): T | undefined {
    let result = this.innerBuffer.find(predicate);
    
    if (!result && !this.finish) {
      this.traverseTheRest((item) => {
        if (predicate(item)) {
          result = item;
          return true;
        }
        return false;
      }, false);
    }
    
    return result;
  }

  isEmpty(): boolean {
    let hasItems = false;
    
    if (!this.finish) {
      this.traverseTheRest((item) => {
        hasItems = true;
        return true;
      }, false);
    }
    
    return hasItems;
  }

  toArray(): T[] {
    if (!this.finish) {
      this.traverseTheRest(undefined, true);
    }
    return this.innerBuffer.slice();
  }

  some(predicate: (value: T) => boolean): boolean {
    let found = this.innerBuffer.some(predicate);
    
    if (!found && !this.finish) {
      this.traverseTheRest((item) => {
        predicate(item);
        found = true;
      }, false);
    }
    
    return found;
  }

  forEach(callback: (value: T) => void): void {
    this.innerBuffer.forEach(callback);
    
    if (!this.finish) {
      this.traverseTheRest(callback, true);
    }
  }

  protected abstract traverseTheRest(
    callback: ((value: T) => boolean | void) | undefined,
    consumeAll: boolean
  ): void;
}

class HSArrayQuery<T> extends HSQueryBase<T> {
  constructor(array: T[]) {
    super();
    this.finish = true;
    this.innerBuffer = array;
  }

  protected traverseTheRest(
    callback: ((value: T) => boolean | void) | undefined,
    consumeAll: boolean
  ): void {
    // Array is already fully loaded, no traversal needed
  }
}

class HSIterableQuery<T> extends HSQueryBase<T> {
  private _iterator: Iterator<T>;

  constructor(iterator: Iterator<T>) {
    super();
    this._iterator = iterator;
  }

  protected traverseTheRest(
    callback: ((value: T) => boolean | void) | undefined,
    consumeAll: boolean
  ): void {
    if (callback) {
      let iteratorResult = this._iterator.next();
      
      while (!iteratorResult.done) {
        const currentValue = iteratorResult.value;
        this.innerBuffer.push(currentValue);
        
        if (callback(currentValue)) {
          if (consumeAll) {
            iteratorResult = this._iterator.next();
            continue;
          }
          return;
        }
        
        iteratorResult = this._iterator.next();
      }
    } else {
      for (const value of this._iterator) {
        this.innerBuffer.push(value);
      }
    }
    
    this.finish = true;
  }
}

export { HSQueryBase, HSArrayQuery, HSIterableQuery };