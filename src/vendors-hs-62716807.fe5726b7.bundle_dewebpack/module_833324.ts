import type { PropertyDescriptor } from './types';

const hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';
const hasProto = Object.prototype.hasOwnProperty.call(Object.prototype, '__proto__');

const FunctionConstructor = Function;

const getConstructorOf = (value: unknown): unknown => {
  try {
    return FunctionConstructor('"use strict"; return (' + value + ').constructor;')();
  } catch {
    return undefined;
  }
};

const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
const defineProperty = Object.defineProperty;
const getPrototypeOf = Object.getPrototypeOf;

const throwTypeError = function (): never {
  throw new TypeError();
};

const getThrowTypeError = getOwnPropertyDescriptor
  ? (function (): (() => never) {
      try {
        return throwTypeError;
      } catch {
        try {
          return getOwnPropertyDescriptor(arguments, 'callee')!.get as (() => never);
        } catch {
          return throwTypeError;
        }
      }
    })()
  : throwTypeError;

const INTRINSICS_MARKER = {};

const typedArrayPrototype =
  typeof Uint8Array !== 'undefined' && getPrototypeOf
    ? getPrototypeOf(Uint8Array)
    : undefined;

interface IntrinsicsMap {
  [key: string]: unknown;
}

const INTRINSICS: IntrinsicsMap = {
  __proto__: null!,
  '%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
  '%Array%': Array,
  '%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
  '%ArrayIteratorPrototype%':
    hasSymbols && getPrototypeOf ? getPrototypeOf([][Symbol.iterator]()) : undefined,
  '%AsyncFromSyncIteratorPrototype%': undefined,
  '%AsyncFunction%': INTRINSICS_MARKER,
  '%AsyncGenerator%': INTRINSICS_MARKER,
  '%AsyncGeneratorFunction%': INTRINSICS_MARKER,
  '%AsyncIteratorPrototype%': INTRINSICS_MARKER,
  '%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
  '%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
  '%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
  '%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
  '%Boolean%': Boolean,
  '%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
  '%Date%': Date,
  '%decodeURI%': decodeURI,
  '%decodeURIComponent%': decodeURIComponent,
  '%encodeURI%': encodeURI,
  '%encodeURIComponent%': encodeURIComponent,
  '%Error%': Error,
  '%eval%': eval,
  '%EvalError%': EvalError,
  '%Float16Array%': typeof Float16Array === 'undefined' ? undefined : Float16Array,
  '%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
  '%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
  '%FinalizationRegistry%':
    typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
  '%Function%': FunctionConstructor,
  '%GeneratorFunction%': INTRINSICS_MARKER,
  '%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
  '%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
  '%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
  '%isFinite%': isFinite,
  '%isNaN%': isNaN,
  '%IteratorPrototype%':
    hasSymbols && getPrototypeOf ? getPrototypeOf(getPrototypeOf([][Symbol.iterator]())) : undefined,
  '%JSON%': typeof JSON === 'object' ? JSON : undefined,
  '%Map%': typeof Map === 'undefined' ? undefined : Map,
  '%MapIteratorPrototype%':
    typeof Map !== 'undefined' && hasSymbols && getPrototypeOf
      ? getPrototypeOf(new Map()[Symbol.iterator]())
      : undefined,
  '%Math%': Math,
  '%Number%': Number,
  '%Object%': Object,
  '%Object.getOwnPropertyDescriptor%': getOwnPropertyDescriptor,
  '%parseFloat%': parseFloat,
  '%parseInt%': parseInt,
  '%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
  '%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
  '%RangeError%': RangeError,
  '%ReferenceError%': ReferenceError,
  '%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
  '%RegExp%': RegExp,
  '%Set%': typeof Set === 'undefined' ? undefined : Set,
  '%SetIteratorPrototype%':
    typeof Set !== 'undefined' && hasSymbols && getPrototypeOf
      ? getPrototypeOf(new Set()[Symbol.iterator]())
      : undefined,
  '%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
  '%String%': String,
  '%StringIteratorPrototype%':
    hasSymbols && getPrototypeOf ? getPrototypeOf(''[Symbol.iterator]()) : undefined,
  '%Symbol%': hasSymbols ? Symbol : undefined,
  '%SyntaxError%': SyntaxError,
  '%ThrowTypeError%': getThrowTypeError,
  '%TypedArray%': typedArrayPrototype,
  '%TypeError%': TypeError,
  '%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
  '%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
  '%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
  '%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
  '%URIError%': URIError,
  '%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
  '%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
  '%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
  '%Function.prototype.call%': Function.prototype.call,
  '%Function.prototype.apply%': Function.prototype.apply,
  '%Object.defineProperty%': defineProperty,
  '%Object.getPrototypeOf%': getPrototypeOf,
  '%Math.abs%': Math.abs,
  '%Math.floor%': Math.floor,
  '%Math.max%': Math.max,
  '%Math.min%': Math.min,
  '%Math.pow%': Math.pow,
  '%Math.round%': Math.round,
  '%Math.sign%': Math.sign,
  '%Reflect.getPrototypeOf%': typeof Reflect !== 'undefined' ? Reflect.getPrototypeOf : undefined,
};

if (getPrototypeOf) {
  try {
    (null as any).error;
  } catch (error) {
    const errorPrototype = getPrototypeOf(getPrototypeOf(error));
    INTRINSICS['%Error.prototype%'] = errorPrototype;
  }
}

const doEval = (name: string): unknown => {
  let result: unknown;

  if (name === '%AsyncFunction%') {
    result = getConstructorOf('async function () {}');
  } else if (name === '%GeneratorFunction%') {
    result = getConstructorOf('function* () {}');
  } else if (name === '%AsyncGeneratorFunction%') {
    result = getConstructorOf('async function* () {}');
  } else if (name === '%AsyncGenerator%') {
    const asyncGeneratorFunction = doEval('%AsyncGeneratorFunction%');
    if (asyncGeneratorFunction) {
      result = (asyncGeneratorFunction as any).prototype;
    }
  } else if (name === '%AsyncIteratorPrototype%') {
    const asyncGenerator = doEval('%AsyncGenerator%');
    if (asyncGenerator && getPrototypeOf) {
      result = getPrototypeOf((asyncGenerator as any).prototype);
    }
  }

  INTRINSICS[name] = result;
  return result;
};

const LEGACY_ALIASES: Record<string, string[]> = {
  __proto__: null!,
  '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
  '%ArrayPrototype%': ['Array', 'prototype'],
  '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
  '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
  '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
  '%ArrayProto_values%': ['Array', 'prototype', 'values'],
  '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
  '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
  '%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
  '%BooleanPrototype%': ['Boolean', 'prototype'],
  '%DataViewPrototype%': ['DataView', 'prototype'],
  '%DatePrototype%': ['Date', 'prototype'],
  '%ErrorPrototype%': ['Error', 'prototype'],
  '%EvalErrorPrototype%': ['EvalError', 'prototype'],
  '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
  '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
  '%FunctionPrototype%': ['Function', 'prototype'],
  '%Generator%': ['GeneratorFunction', 'prototype'],
  '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
  '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
  '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
  '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
  '%JSONParse%': ['JSON', 'parse'],
  '%JSONStringify%': ['JSON', 'stringify'],
  '%MapPrototype%': ['Map', 'prototype'],
  '%NumberPrototype%': ['Number', 'prototype'],
  '%ObjectPrototype%': ['Object', 'prototype'],
  '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
  '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
  '%PromisePrototype%': ['Promise', 'prototype'],
  '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
  '%Promise_all%': ['Promise', 'all'],
  '%Promise_reject%': ['Promise', 'reject'],
  '%Promise_resolve%': ['Promise', 'resolve'],
  '%RangeErrorPrototype%': ['RangeError', 'prototype'],
  '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
  '%RegExpPrototype%': ['RegExp', 'prototype'],
  '%SetPrototype%': ['Set', 'prototype'],
  '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
  '%StringPrototype%': ['String', 'prototype'],
  '%SymbolPrototype%': ['Symbol', 'prototype'],
  '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
  '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
  '%TypeErrorPrototype%': ['TypeError', 'prototype'],
  '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
  '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
  '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
  '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
  '%URIErrorPrototype%': ['URIError', 'prototype'],
  '%WeakMapPrototype%': ['WeakMap', 'prototype'],
  '%WeakSetPrototype%': ['WeakSet', 'prototype'],
};

const callBind = Function.prototype.call.bind;
const arrayConcat = callBind(Array.prototype.concat);
const arraySplice = callBind(Array.prototype.splice);
const stringReplace = callBind(String.prototype.replace);
const stringSlice = callBind(String.prototype.slice);
const regexExec = callBind(RegExp.prototype.exec);

const PROPERTY_ACCESS_REGEX = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
const ESCAPE_REGEX = /\\(\\)?/g;

interface IntrinsicLookupResult {
  alias?: string[];
  name: string;
  value: unknown;
}

const getBaseIntrinsic = (name: string, allowMissing: boolean): IntrinsicLookupResult => {
  let intrinsicName = name;
  let alias: string[] | undefined;

  if (Object.prototype.hasOwnProperty.call(LEGACY_ALIASES, intrinsicName)) {
    alias = LEGACY_ALIASES[intrinsicName];
    intrinsicName = '%' + alias[0] + '%';
  }

  if (Object.prototype.hasOwnProperty.call(INTRINSICS, intrinsicName)) {
    let value = INTRINSICS[intrinsicName];

    if (value === INTRINSICS_MARKER) {
      value = doEval(intrinsicName);
    }

    if (value === undefined && !allowMissing) {
      throw new TypeError(
        `intrinsic ${name} exists, but is not available. Please file an issue!`
      );
    }

    return {
      alias,
      name: intrinsicName,
      value,
    };
  }

  throw new SyntaxError(`intrinsic ${name} does not exist!`);
};

const parseIntrinsicName = (name: string): string[] => {
  const firstChar = stringSlice(name, 0, 1);
  const lastChar = stringSlice(name, -1);

  if (firstChar === '%' && lastChar !== '%') {
    throw new SyntaxError('invalid intrinsic syntax, expected closing `%`');
  }

  if (lastChar === '%' && firstChar !== '%') {
    throw new SyntaxError('invalid intrinsic syntax, expected opening `%`');
  }

  const parts: string[] = [];

  stringReplace(name, PROPERTY_ACCESS_REGEX, (match: string, index: string, quote: string, subString: string) => {
    parts[parts.length] = subString ? stringReplace(subString, ESCAPE_REGEX, '$1') : index || match;
    return '';
  });

  return parts;
};

export const getIntrinsic = (name: string, allowMissing?: boolean): unknown => {
  if (typeof name !== 'string' || name.length === 0) {
    throw new TypeError('intrinsic name must be a non-empty string');
  }

  if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
    throw new TypeError('"allowMissing" argument must be a boolean');
  }

  if (regexExec(/^%?[^%]*%?$/, name) === null) {
    throw new SyntaxError(
      '`%` may not be present anywhere but at the beginning and end of the intrinsic name'
    );
  }

  const parts = parseIntrinsicName(name);
  const baseIntrinsicName = parts.length > 0 ? parts[0] : '';
  const intrinsicResult = getBaseIntrinsic('%' + baseIntrinsicName + '%', !!allowMissing);

  let intrinsicRealName = intrinsicResult.name;
  let value = intrinsicResult.value;
  let skipFurtherCaching = false;
  const alias = intrinsicResult.alias;

  if (alias) {
    arraySplice(parts, arrayConcat([0, 1], alias));
  }

  for (let index = 1, isOwn = true; index < parts.length; index += 1) {
    const part = parts[index];
    const firstChar = stringSlice(part, 0, 1);
    const lastChar = stringSlice(part, -1);

    if (
      (firstChar === '"' || firstChar === "'" || firstChar === '`' ||
       lastChar === '"' || lastChar === "'" || lastChar === '`') &&
      firstChar !== lastChar
    ) {
      throw new SyntaxError('property names with quotes must have matching quotes');
    }

    if (part === 'constructor' || !isOwn) {
      skipFurtherCaching = true;
    }

    intrinsicRealName = '%' + (baseIntrinsicName + '.' + part) + '%';

    if (Object.prototype.hasOwnProperty.call(INTRINSICS, intrinsicRealName)) {
      value = INTRINSICS[intrinsicRealName];
    } else if (value != null) {
      if (!(part in (value as object))) {
        if (!allowMissing) {
          throw new TypeError(
            `base intrinsic for ${name} exists, but the property is not available.`
          );
        }
        return undefined;
      }

      if (getOwnPropertyDescriptor && index + 1 >= parts.length) {
        const descriptor = getOwnPropertyDescriptor(value, part);
        isOwn = !!descriptor;

        value =
          isOwn && 'get' in descriptor && !('originalValue' in descriptor.get!)
            ? descriptor.get
            : (value as any)[part];
      } else {
        isOwn = Object.prototype.hasOwnProperty.call(value, part);
        value = (value as any)[part];
      }

      if (isOwn && !skipFurtherCaching) {
        INTRINSICS[intrinsicRealName] = value;
      }
    }
  }

  return value;
};

export default getIntrinsic;