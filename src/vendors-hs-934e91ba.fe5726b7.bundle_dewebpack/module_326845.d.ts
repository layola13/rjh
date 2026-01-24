/**
 * Immutable.js - Immutable persistent data collections for JavaScript
 * This module provides immutable data structures including Map, List, Set, Stack, and Record
 */

declare module 'immutable' {
  /**
   * Type representing any value that can be used as a key
   */
  type Key = string | number | symbol;

  /**
   * Base interface for all iterable collections
   */
  export interface Iterable<K, V> {
    readonly size: number | undefined;
    
    /** Converts the collection to a JavaScript array */
    toArray(): Array<V> | Array<[K, V]>;
    
    /** Converts to an indexed sequence */
    toIndexedSeq(): Seq.Indexed<V>;
    
    /** Deep conversion to plain JavaScript objects/arrays */
    toJS(): any;
    
    /** Converts to JSON-serializable format */
    toJSON(): any;
    
    /** Converts to a keyed sequence */
    toKeyedSeq(): Seq.Keyed<K, V>;
    
    /** Converts to a Map */
    toMap(): Map<K, V>;
    
    /** Converts to a plain JavaScript object */
    toObject(): { [key: string]: V };
    
    /** Converts to an OrderedMap */
    toOrderedMap(): OrderedMap<K, V>;
    
    /** Converts to an OrderedSet */
    toOrderedSet(): OrderedSet<V>;
    
    /** Converts to a Set */
    toSet(): Set<V>;
    
    /** Converts to a set sequence */
    toSetSeq(): Seq.Set<V>;
    
    /** Converts to a sequence */
    toSeq(): Seq<K, V>;
    
    /** Converts to a Stack */
    toStack(): Stack<V>;
    
    /** Converts to a List */
    toList(): List<V>;
    
    /** String representation of the collection */
    toString(): string;
    
    /** Concatenates with other iterables */
    concat(...iterables: Array<Iterable<K, V>>): Iterable<K, V>;
    
    /** Checks if the collection contains a value */
    includes(value: V): boolean;
    
    /** Returns an iterator of [key, value] entries */
    entries(): IterableIterator<[K, V]>;
    
    /** Tests whether all elements pass the predicate */
    every(predicate: (value: V, key: K, iter: this) => boolean, context?: unknown): boolean;
    
    /** Filters elements that pass the predicate */
    filter(predicate: (value: V, key: K, iter: this) => boolean, context?: unknown): this;
    
    /** Finds the first value matching the predicate */
    find(predicate: (value: V, key: K, iter: this) => boolean, context?: unknown, notSetValue?: V): V | undefined;
    
    /** Executes a function for each element */
    forEach(sideEffect: (value: V, key: K, iter: this) => void, context?: unknown): number;
    
    /** Joins all elements into a string */
    join(separator?: string): string;
    
    /** Returns an iterator of keys */
    keys(): IterableIterator<K>;
    
    /** Maps elements to a new collection */
    map<M>(mapper: (value: V, key: K, iter: this) => M, context?: unknown): Iterable<K, M>;
    
    /** Reduces the collection to a single value */
    reduce<R>(reducer: (reduction: R, value: V, key: K, iter: this) => R, initialReduction: R, context?: unknown): R;
    
    /** Reduces from right to left */
    reduceRight<R>(reducer: (reduction: R, value: V, key: K, iter: this) => R, initialReduction: R, context?: unknown): R;
    
    /** Returns a reversed collection */
    reverse(): this;
    
    /** Returns a slice of the collection */
    slice(begin?: number, end?: number): this;
    
    /** Tests whether any element passes the predicate */
    some(predicate: (value: V, key: K, iter: this) => boolean, context?: unknown): boolean;
    
    /** Sorts the collection */
    sort(comparator?: (valueA: V, valueB: V) => number): this;
    
    /** Returns an iterator of values */
    values(): IterableIterator<V>;
    
    /** Returns all but the last element */
    butLast(): this;
    
    /** Checks if the collection is empty */
    isEmpty(): boolean;
    
    /** Counts elements, optionally matching a predicate */
    count(predicate?: (value: V, key: K, iter: this) => boolean, context?: unknown): number;
    
    /** Groups elements by a key function */
    countBy<G>(grouper: (value: V, key: K, iter: this) => G, context?: unknown): Map<G, number>;
    
    /** Deep equality comparison */
    equals(other: unknown): boolean;
    
    /** Computes a hash code for the collection */
    hashCode(): number;
    
    /** Returns the first element */
    first(): V | undefined;
    
    /** Flattens nested collections */
    flatten(depth?: number | boolean): Iterable<unknown, unknown>;
    
    /** Gets a value by key */
    get(key: K, notSetValue?: V): V | undefined;
    
    /** Gets a nested value by path */
    getIn(keyPath: Iterable<unknown, unknown>, notSetValue?: unknown): unknown;
    
    /** Checks if a key exists */
    has(key: K): boolean;
    
    /** Checks if a nested path exists */
    hasIn(keyPath: Iterable<unknown, unknown>): boolean;
    
    /** Returns the last element */
    last(): V | undefined;
    
    /** Finds the maximum value */
    max(comparator?: (valueA: V, valueB: V) => number): V | undefined;
    
    /** Finds the minimum value */
    min(comparator?: (valueA: V, valueB: V) => number): V | undefined;
    
    /** Skips the first n elements */
    skip(amount: number): this;
    
    /** Skips the last n elements */
    skipLast(amount: number): this;
    
    /** Skips elements while predicate is true */
    skipWhile(predicate: (value: V, key: K, iter: this) => boolean, context?: unknown): this;
    
    /** Takes the first n elements */
    take(amount: number): this;
    
    /** Takes the last n elements */
    takeLast(amount: number): this;
    
    /** Takes elements while predicate is true */
    takeWhile(predicate: (value: V, key: K, iter: this) => boolean, context?: unknown): this;
  }

  /**
   * Immutable Map - Persistent key-value collection
   */
  export interface Map<K, V> extends Iterable<K, V> {
    readonly size: number;
    
    get(key: K, notSetValue?: V): V | undefined;
    set(key: K, value: V): Map<K, V>;
    remove(key: K): Map<K, V>;
    delete(key: K): Map<K, V>;
    clear(): Map<K, V>;
    update(key: K, updater: (value: V) => V): Map<K, V>;
    merge(...iterables: Array<Iterable<K, V>>): Map<K, V>;
    mergeDeep(...iterables: Array<Iterable<K, V>>): Map<K, V>;
    setIn(keyPath: Iterable<unknown, unknown>, value: unknown): Map<K, V>;
    deleteIn(keyPath: Iterable<unknown, unknown>): Map<K, V>;
    updateIn(keyPath: Iterable<unknown, unknown>, updater: (value: unknown) => unknown): Map<K, V>;
    withMutations(mutator: (mutable: Map<K, V>) => void): Map<K, V>;
    asMutable(): Map<K, V>;
    asImmutable(): Map<K, V>;
  }

  export namespace Map {
    function isMap(maybeMap: unknown): maybeMap is Map<unknown, unknown>;
    function of<K, V>(...keyValues: Array<unknown>): Map<K, V>;
  }

  export function Map<K, V>(collection?: Iterable<K, V> | { [key: string]: V }): Map<K, V>;

  /**
   * Immutable List - Persistent indexed sequence
   */
  export interface List<T> extends Iterable<number, T> {
    readonly size: number;
    
    get(index: number, notSetValue?: T): T | undefined;
    set(index: number, value: T): List<T>;
    remove(index: number): List<T>;
    delete(index: number): List<T>;
    insert(index: number, value: T): List<T>;
    clear(): List<T>;
    push(...values: Array<T>): List<T>;
    pop(): List<T>;
    unshift(...values: Array<T>): List<T>;
    shift(): List<T>;
    update(index: number, updater: (value: T) => T): List<T>;
    merge(...iterables: Array<Iterable<number, T>>): List<T>;
    setSize(size: number): List<T>;
    withMutations(mutator: (mutable: List<T>) => void): List<T>;
    asMutable(): List<T>;
    asImmutable(): List<T>;
  }

  export namespace List {
    function isList(maybeList: unknown): maybeList is List<unknown>;
    function of<T>(...values: Array<T>): List<T>;
  }

  export function List<T>(collection?: Iterable<unknown, T> | ArrayLike<T>): List<T>;

  /**
   * Immutable Set - Persistent unique value collection
   */
  export interface Set<T> extends Iterable<T, T> {
    readonly size: number;
    
    add(value: T): Set<T>;
    remove(value: T): Set<T>;
    delete(value: T): Set<T>;
    clear(): Set<T>;
    union(...iterables: Array<Iterable<unknown, T>>): Set<T>;
    intersect(...iterables: Array<Iterable<unknown, T>>): Set<T>;
    subtract(...iterables: Array<Iterable<unknown, T>>): Set<T>;
    merge(...iterables: Array<Iterable<unknown, T>>): Set<T>;
    withMutations(mutator: (mutable: Set<T>) => void): Set<T>;
    asMutable(): Set<T>;
    asImmutable(): Set<T>;
  }

  export namespace Set {
    function isSet(maybeSet: unknown): maybeSet is Set<unknown>;
    function of<T>(...values: Array<T>): Set<T>;
    function fromKeys<K>(iterable: Iterable<K, unknown>): Set<K>;
  }

  export function Set<T>(collection?: Iterable<unknown, T> | ArrayLike<T>): Set<T>;

  /**
   * OrderedMap - Map that maintains insertion order
   */
  export interface OrderedMap<K, V> extends Map<K, V> {}

  export namespace OrderedMap {
    function isOrderedMap(maybeOrderedMap: unknown): maybeOrderedMap is OrderedMap<unknown, unknown>;
    function of<K, V>(...keyValues: Array<unknown>): OrderedMap<K, V>;
  }

  export function OrderedMap<K, V>(collection?: Iterable<K, V>): OrderedMap<K, V>;

  /**
   * OrderedSet - Set that maintains insertion order
   */
  export interface OrderedSet<T> extends Set<T> {}

  export namespace OrderedSet {
    function isOrderedSet(maybeOrderedSet: unknown): maybeOrderedSet is OrderedSet<unknown>;
    function of<T>(...values: Array<T>): OrderedSet<T>;
    function fromKeys<K>(iterable: Iterable<K, unknown>): OrderedSet<K>;
  }

  export function OrderedSet<T>(collection?: Iterable<unknown, T>): OrderedSet<T>;

  /**
   * Stack - LIFO (Last-In-First-Out) collection
   */
  export interface Stack<T> extends Iterable<number, T> {
    readonly size: number;
    
    peek(): T | undefined;
    push(...values: Array<T>): Stack<T>;
    pop(): Stack<T>;
    unshift(...values: Array<T>): Stack<T>;
    shift(): Stack<T>;
    clear(): Stack<T>;
    withMutations(mutator: (mutable: Stack<T>) => void): Stack<T>;
    asMutable(): Stack<T>;
    asImmutable(): Stack<T>;
  }

  export namespace Stack {
    function isStack(maybeStack: unknown): maybeStack is Stack<unknown>;
    function of<T>(...values: Array<T>): Stack<T>;
  }

  export function Stack<T>(collection?: Iterable<unknown, T>): Stack<T>;

  /**
   * Record - Typed immutable object with default values
   */
  export interface Record<TProps> {
    get<K extends keyof TProps>(key: K, notSetValue?: TProps[K]): TProps[K];
    set<K extends keyof TProps>(key: K, value: TProps[K]): this;
    remove<K extends keyof TProps>(key: K): this;
    clear(): this;
    toObject(): TProps;
    toJSON(): TProps;
  }

  export namespace Record {
    interface Factory<TProps> {
      new (values?: Partial<TProps>): Record<TProps> & Readonly<TProps>;
      (values?: Partial<TProps>): Record<TProps> & Readonly<TProps>;
    }
  }

  export function Record<TProps>(defaultValues: TProps, name?: string): Record.Factory<TProps>;

  /**
   * Seq - Lazy iterable sequence
   */
  export namespace Seq {
    interface Keyed<K, V> extends Iterable<K, V> {}
    interface Indexed<T> extends Iterable<number, T> {}
    interface Set<T> extends Iterable<T, T> {}
  }

  export function Seq<K, V>(collection: Iterable<K, V>): Seq.Keyed<K, V>;
  export function Seq<T>(collection: Iterable<number, T>): Seq.Indexed<T>;

  /**
   * Range - Lazy sequence of numbers
   */
  export function Range(start?: number, end?: number, step?: number): Seq.Indexed<number>;

  /**
   * Repeat - Lazy sequence of repeated values
   */
  export function Repeat<T>(value: T, times?: number): Seq.Indexed<T>;

  /**
   * Deep equality comparison
   */
  export function is(first: unknown, second: unknown): boolean;

  /**
   * Converts nested plain JS objects/arrays to Immutable collections
   */
  export function fromJS(json: unknown, reviver?: (key: string | number, sequence: Iterable<unknown, unknown>) => unknown): unknown;
}