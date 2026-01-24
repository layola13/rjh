/**
 * Get intrinsic (built-in) JavaScript objects and functions by their canonical names.
 * This module provides a safe way to access JavaScript intrinsics that may be overridden
 * or unavailable in certain environments.
 */

/**
 * A map of intrinsic names to their values.
 * Includes built-in constructors, prototypes, and utility functions.
 */
interface IntrinsicsMap {
  readonly '%AggregateError%'?: typeof AggregateError;
  readonly '%Array%': typeof Array;
  readonly '%ArrayBuffer%'?: typeof ArrayBuffer;
  readonly '%ArrayIteratorPrototype%'?: IterableIterator<any>;
  readonly '%AsyncFromSyncIteratorPrototype%'?: any;
  readonly '%AsyncFunction%'?: Function;
  readonly '%AsyncGenerator%'?: AsyncGenerator<any, any, any>;
  readonly '%AsyncGeneratorFunction%'?: GeneratorFunction;
  readonly '%AsyncIteratorPrototype%'?: AsyncIterableIterator<any>;
  readonly '%Atomics%'?: typeof Atomics;
  readonly '%BigInt%'?: typeof BigInt;
  readonly '%BigInt64Array%'?: typeof BigInt64Array;
  readonly '%BigUint64Array%'?: typeof BigUint64Array;
  readonly '%Boolean%': typeof Boolean;
  readonly '%DataView%'?: typeof DataView;
  readonly '%Date%': typeof Date;
  readonly '%decodeURI%': typeof decodeURI;
  readonly '%decodeURIComponent%': typeof decodeURIComponent;
  readonly '%encodeURI%': typeof encodeURI;
  readonly '%encodeURIComponent%': typeof encodeURIComponent;
  readonly '%Error%': typeof Error;
  readonly '%eval%': typeof eval;
  readonly '%EvalError%': typeof EvalError;
  readonly '%Float16Array%'?: any;
  readonly '%Float32Array%'?: typeof Float32Array;
  readonly '%Float64Array%'?: typeof Float64Array;
  readonly '%FinalizationRegistry%'?: typeof FinalizationRegistry;
  readonly '%Function%': typeof Function;
  readonly '%GeneratorFunction%'?: GeneratorFunction;
  readonly '%Int8Array%'?: typeof Int8Array;
  readonly '%Int16Array%'?: typeof Int16Array;
  readonly '%Int32Array%'?: typeof Int32Array;
  readonly '%isFinite%': typeof isFinite;
  readonly '%isNaN%': typeof isNaN;
  readonly '%IteratorPrototype%'?: Iterator<any, any, any>;
  readonly '%JSON%'?: typeof JSON;
  readonly '%Map%'?: typeof Map;
  readonly '%MapIteratorPrototype%'?: IterableIterator<any>;
  readonly '%Math%': typeof Math;
  readonly '%Number%': typeof Number;
  readonly '%Object%': typeof Object;
  readonly '%Object.getOwnPropertyDescriptor%'?: typeof Object.getOwnPropertyDescriptor;
  readonly '%parseFloat%': typeof parseFloat;
  readonly '%parseInt%': typeof parseInt;
  readonly '%Promise%'?: typeof Promise;
  readonly '%Proxy%'?: typeof Proxy;
  readonly '%RangeError%': typeof RangeError;
  readonly '%ReferenceError%': typeof ReferenceError;
  readonly '%Reflect%'?: typeof Reflect;
  readonly '%RegExp%': typeof RegExp;
  readonly '%Set%'?: typeof Set;
  readonly '%SetIteratorPrototype%'?: IterableIterator<any>;
  readonly '%SharedArrayBuffer%'?: typeof SharedArrayBuffer;
  readonly '%String%': typeof String;
  readonly '%StringIteratorPrototype%'?: IterableIterator<string>;
  readonly '%Symbol%'?: typeof Symbol;
  readonly '%SyntaxError%': typeof SyntaxError;
  readonly '%ThrowTypeError%': () => never;
  readonly '%TypedArray%'?: any;
  readonly '%TypeError%': typeof TypeError;
  readonly '%Uint8Array%'?: typeof Uint8Array;
  readonly '%Uint8ClampedArray%'?: typeof Uint8ClampedArray;
  readonly '%Uint16Array%'?: typeof Uint16Array;
  readonly '%Uint32Array%'?: typeof Uint32Array;
  readonly '%URIError%': typeof URIError;
  readonly '%WeakMap%'?: typeof WeakMap;
  readonly '%WeakRef%'?: typeof WeakRef;
  readonly '%WeakSet%'?: typeof WeakSet;
  readonly '%Function.prototype.call%': typeof Function.prototype.call;
  readonly '%Function.prototype.apply%': typeof Function.prototype.apply;
  readonly '%Object.defineProperty%'?: typeof Object.defineProperty;
  readonly '%Object.getPrototypeOf%'?: typeof Object.getPrototypeOf;
  readonly '%Math.abs%': typeof Math.abs;
  readonly '%Math.floor%': typeof Math.floor;
  readonly '%Math.max%': typeof Math.max;
  readonly '%Math.min%': typeof Math.min;
  readonly '%Math.pow%': typeof Math.pow;
  readonly '%Math.round%': typeof Math.round;
  readonly '%Math.sign%': typeof Math.sign;
  readonly '%Reflect.getPrototypeOf%'?: typeof Reflect.getPrototypeOf;
  readonly '%Error.prototype%'?: typeof Error.prototype;
  [key: string]: any;
}

/**
 * Alias mappings for commonly used intrinsic paths.
 * Maps shorthand names to their full property paths.
 */
interface AliasMap {
  readonly [key: string]: readonly string[];
}

/**
 * Result of looking up an intrinsic value.
 */
interface IntrinsicResult {
  /** Alias path if the intrinsic name was an alias */
  readonly alias?: readonly string[];
  /** Canonical name of the intrinsic (e.g., '%Array%') */
  readonly name: string;
  /** The actual intrinsic value */
  readonly value: any;
}

/**
 * Get a JavaScript intrinsic by name.
 * 
 * @param name - The intrinsic name, optionally wrapped in '%' (e.g., '%Array%' or 'Array')
 * @param allowMissing - If true, returns undefined for missing intrinsics instead of throwing
 * @returns The intrinsic value
 * @throws {TypeError} If the name is invalid or arguments are malformed
 * @throws {SyntaxError} If the intrinsic syntax is incorrect
 * @throws {TypeError} If the intrinsic doesn't exist and allowMissing is false
 * 
 * @example
 *