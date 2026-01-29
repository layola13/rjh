import ListCache from './ListCache';
import clear from './clear';
import deleteKey from './delete';
import get from './get';
import has from './has';
import set from './set';

/**
 * Creates a stack cache object to store key-value pairs.
 */
class Stack<K = any, V = any> {
  __data__: ListCache<K, V>;
  size: number;

  /**
   * Creates a new Stack instance.
   * @param entries - Optional array of key-value pairs to initialize the stack
   */
  constructor(entries?: Array<[K, V]>) {
    const cache = new ListCache<K, V>(entries);
    this.__data__ = cache;
    this.size = cache.size;
  }

  clear: () => void;
  delete: (key: K) => boolean;
  get: (key: K) => V | undefined;
  has: (key: K) => boolean;
  set: (key: K, value: V) => this;
}

Stack.prototype.clear = clear;
Stack.prototype.delete = deleteKey;
Stack.prototype.get = get;
Stack.prototype.has = has;
Stack.prototype.set = set;

export default Stack;