import ListCache from './ListCache';
import stackClear from './stackClear';
import stackDelete from './stackDelete';
import stackGet from './stackGet';
import stackHas from './stackHas';
import stackSet from './stackSet';

/**
 * Creates a stack cache object to store key-value pairs.
 * A stack is a data structure that uses a ListCache for smaller collections
 * and upgrades to a MapCache for larger collections for better performance.
 */
class Stack<K = any, V = any> {
  /** Internal data storage using ListCache or MapCache */
  __data__: ListCache<K, V>;
  
  /** The number of key-value pairs in the stack */
  size: number;

  /**
   * Creates a new Stack instance.
   * @param entries - Optional array of key-value pairs to initialize the stack
   */
  constructor(entries?: Array<[K, V]>) {
    this.__data__ = new ListCache<K, V>(entries);
    this.size = this.__data__.size;
  }

  /** Removes all key-value pairs from the stack */
  clear = stackClear;

  /** Removes a key-value pair from the stack */
  delete = stackDelete;

  /** Gets the value associated with a key */
  get = stackGet;

  /** Checks if a key exists in the stack */
  has = stackHas;

  /** Sets a key-value pair in the stack */
  set = stackSet;
}

export default Stack;