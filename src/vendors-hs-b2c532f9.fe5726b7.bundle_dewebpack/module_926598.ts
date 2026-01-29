import { getType } from './utils/type';
import { getSentinelValue } from './utils/sentinel';
import * as utils from './utils/encode';
import * as formats from './formats';

const hasOwnProperty = Object.prototype.hasOwnProperty;

interface ArrayFormatFunction {
  (key: string, index?: number): string;
}

type ArrayFormat = 'indices' | 'brackets' | 'repeat' | 'comma';

const arrayPrefixGenerators: Record<string, ArrayFormatFunction | string> = {
  brackets: (key: string): string => `${key}[]`,
  comma: 'comma',
  indices: (key: string, index: number): string => `${key}[${index}]`,
  repeat: (key: string): string => key
};

const isArray = Array.isArray;
const push = Array.prototype.push;

const pushToArray = <T>(target: T[], source: T | T[]): void => {
  push.apply(target, isArray(source) ? source : [source]);
};

const toISOString = Date.prototype.toISOString;
const defaultFormat = formats.default;

type FilterFunction = (prefix: string, value: unknown) => unknown;
type Filter = FilterFunction | string[];

type EncoderFunction = (
  value: string,
  defaultEncoder: EncoderFunction,
  charset: string,
  type: 'key' | 'value',
  format: string
) => string;

type SerializeDateFunction = (date: Date) => string;
type SortFunction = (a: string, b: string) => number;

interface StringifyOptions {
  addQueryPrefix?: boolean;
  allowDots?: boolean;
  allowEmptyArrays?: boolean;
  arrayFormat?: ArrayFormat;
  charset?: 'utf-8' | 'iso-8859-1';
  charsetSentinel?: boolean;
  commaRoundTrip?: boolean;
  delimiter?: string;
  encode?: boolean;
  encodeDotInKeys?: boolean;
  encoder?: EncoderFunction;
  encodeValuesOnly?: boolean;
  filter?: Filter;
  format?: string;
  formatter?: (value: string) => string;
  indices?: boolean;
  serializeDate?: SerializeDateFunction;
  skipNulls?: boolean;
  sort?: SortFunction;
  strictNullHandling?: boolean;
}

interface NormalizedOptions {
  addQueryPrefix: boolean;
  allowDots: boolean;
  allowEmptyArrays: boolean;
  arrayFormat: ArrayFormat;
  charset: 'utf-8' | 'iso-8859-1';
  charsetSentinel: boolean;
  commaRoundTrip: boolean;
  delimiter: string;
  encode: boolean;
  encodeDotInKeys: boolean;
  encoder: EncoderFunction;
  encodeValuesOnly: boolean;
  filter: Filter | undefined;
  format: string;
  formatter: (value: string) => string;
  serializeDate: SerializeDateFunction;
  skipNulls: boolean;
  sort: SortFunction | null;
  strictNullHandling: boolean;
}

const defaultOptions: NormalizedOptions = {
  addQueryPrefix: false,
  allowDots: false,
  allowEmptyArrays: false,
  arrayFormat: 'indices',
  charset: 'utf-8',
  charsetSentinel: false,
  commaRoundTrip: false,
  delimiter: '&',
  encode: true,
  encodeDotInKeys: false,
  encoder: utils.encode,
  encodeValuesOnly: false,
  filter: undefined,
  format: defaultFormat,
  formatter: formats.formatters[defaultFormat],
  serializeDate: (date: Date): string => toISOString.call(date),
  skipNulls: false,
  strictNullHandling: false,
  sort: null
};

const sentinelKey = {};

type Primitive = string | number | boolean | symbol | bigint;

interface SerializeContext {
  get(key: unknown): unknown;
  set(key: unknown, value: unknown): void;
}

/**
 * Recursively serializes an object into query string parts
 */
const serializeValue = (
  obj: unknown,
  prefix: string,
  generateArrayPrefix: ArrayFormatFunction | string,
  strictNullHandling: boolean,
  allowEmptyArrays: boolean,
  skipNulls: boolean,
  commaRoundTrip: boolean,
  encodeDotInKeys: boolean,
  encoder: EncoderFunction | null,
  filter: Filter | undefined,
  sort: SortFunction | null,
  allowDots: boolean,
  serializeDate: SerializeDateFunction,
  format: string,
  formatter: (value: string) => string,
  encodeValuesOnly: boolean,
  charset: string,
  context: SerializeContext
): string[] => {
  let value = obj;
  let currentContext: SerializeContext | undefined = context;
  let depth = 0;
  let hasCycle = false;

  while (currentContext?.get(sentinelKey) !== undefined && !hasCycle) {
    const detectedValue = currentContext.get(obj);
    depth += 1;

    if (detectedValue !== undefined) {
      if (detectedValue === depth) {
        throw new RangeError('Cyclic object value');
      }
      hasCycle = true;
    }

    if (currentContext.get(sentinelKey) === undefined) {
      depth = 0;
    }
  }

  if (typeof filter === 'function') {
    value = filter(prefix, value);
  } else if (value instanceof Date) {
    value = serializeDate(value);
  } else if (generateArrayPrefix === 'comma' && isArray(value)) {
    value = utils.maybeMap(value, (item: unknown) =>
      item instanceof Date ? serializeDate(item) : item
    );
  }

  if (value === null) {
    if (skipNulls) {
      return encoder && !encodeValuesOnly
        ? [encoder(prefix, defaultOptions.encoder, charset, 'key', format)]
        : [prefix];
    }
    value = '';
  }

  const valueType = getType(value);
  if (
    valueType === 'string' ||
    valueType === 'number' ||
    valueType === 'boolean' ||
    valueType === 'symbol' ||
    valueType === 'bigint' ||
    utils.isBuffer(value)
  ) {
    if (encoder) {
      const encodedKey = encodeValuesOnly
        ? prefix
        : encoder(prefix, defaultOptions.encoder, charset, 'key', format);
      return [
        formatter(encodedKey) +
          '=' +
          formatter(encoder(String(value), defaultOptions.encoder, charset, 'value', format))
      ];
    }
    return [formatter(prefix) + '=' + formatter(String(value))];
  }

  const values: string[] = [];

  if (value === undefined) {
    return values;
  }

  let keys: (string | { value: unknown })[];

  if (generateArrayPrefix === 'comma' && isArray(value)) {
    if (encodeValuesOnly && encoder) {
      value = utils.maybeMap(value, encoder);
    }
    keys = [{ value: (value as unknown[]).length > 0 ? (value as unknown[]).join(',') || null : undefined }];
  } else if (isArray(filter)) {
    keys = filter;
  } else {
    const objectKeys = Object.keys(value as Record<string, unknown>);
    keys = sort ? objectKeys.sort(sort) : objectKeys;
  }

  const adjustedPrefix = encodeDotInKeys
    ? String(prefix).replace(/\./g, '%2E')
    : String(prefix);

  const arrayPrefix =
    strictNullHandling && isArray(value) && (value as unknown[]).length === 1
      ? `${adjustedPrefix}[]`
      : adjustedPrefix;

  if (allowEmptyArrays && isArray(value) && (value as unknown[]).length === 0) {
    return [`${arrayPrefix}[]`];
  }

  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];
    const keyValue =
      typeof key === 'object' && key && key.value !== undefined
        ? key.value
        : (value as Record<string, unknown>)[key as string];

    if (commaRoundTrip || keyValue !== null) {
      const encodedKey = allowDots && encodeDotInKeys
        ? String(key).replace(/\./g, '%2E')
        : String(key);

      const newPrefix = isArray(value)
        ? typeof generateArrayPrefix === 'function'
          ? generateArrayPrefix(arrayPrefix, encodedKey)
          : arrayPrefix
        : `${arrayPrefix}${allowDots ? `.${encodedKey}` : `[${encodedKey}]`}`;

      context.set(obj, depth);
      const newContext = getSentinelValue();
      newContext.set(sentinelKey, context);

      pushToArray(
        values,
        serializeValue(
          keyValue,
          newPrefix,
          generateArrayPrefix,
          strictNullHandling,
          allowEmptyArrays,
          skipNulls,
          commaRoundTrip,
          encodeDotInKeys,
          generateArrayPrefix === 'comma' && encodeValuesOnly && isArray(value) ? null : encoder,
          filter,
          sort,
          allowDots,
          serializeDate,
          format,
          formatter,
          encodeValuesOnly,
          charset,
          newContext
        )
      );
    }
  }

  return values;
};

const normalizeOptions = (options?: StringifyOptions): NormalizedOptions => {
  if (!options) {
    return defaultOptions;
  }

  if (options.allowEmptyArrays !== undefined && typeof options.allowEmptyArrays !== 'boolean') {
    throw new TypeError('`allowEmptyArrays` option can only be `true` or `false`, when provided');
  }

  if (options.encodeDotInKeys !== undefined && typeof options.encodeDotInKeys !== 'boolean') {
    throw new TypeError('`encodeDotInKeys` option can only be `true` or `false`, when provided');
  }

  if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
    throw new TypeError('Encoder has to be a function.');
  }

  const charset = options.charset || defaultOptions.charset;
  if (options.charset !== undefined && options.charset !== 'utf-8' && options.charset !== 'iso-8859-1') {
    throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
  }

  let format = defaultFormat;
  if (options.format !== undefined) {
    if (!hasOwnProperty.call(formats.formatters, options.format)) {
      throw new TypeError('Unknown format option provided.');
    }
    format = options.format;
  }

  const formatter = formats.formatters[format];
  let filter = defaultOptions.filter;

  if (typeof options.filter === 'function' || isArray(options.filter)) {
    filter = options.filter;
  }

  let arrayFormat: ArrayFormat;
  if (options.arrayFormat && options.arrayFormat in arrayPrefixGenerators) {
    arrayFormat = options.arrayFormat;
  } else if ('indices' in options) {
    arrayFormat = options.indices ? 'indices' : 'repeat';
  } else {
    arrayFormat = defaultOptions.arrayFormat;
  }

  if ('commaRoundTrip' in options && typeof options.commaRoundTrip !== 'boolean') {
    throw new TypeError('`commaRoundTrip` must be a boolean, or absent');
  }

  const allowDots =
    options.allowDots === undefined
      ? options.encodeDotInKeys === true || defaultOptions.allowDots
      : !!options.allowDots;

  return {
    addQueryPrefix: typeof options.addQueryPrefix === 'boolean' ? options.addQueryPrefix : defaultOptions.addQueryPrefix,
    allowDots,
    allowEmptyArrays: typeof options.allowEmptyArrays === 'boolean' ? !!options.allowEmptyArrays : defaultOptions.allowEmptyArrays,
    arrayFormat,
    charset,
    charsetSentinel: typeof options.charsetSentinel === 'boolean' ? options.charsetSentinel : defaultOptions.charsetSentinel,
    commaRoundTrip: !!options.commaRoundTrip,
    delimiter: options.delimiter === undefined ? defaultOptions.delimiter : options.delimiter,
    encode: typeof options.encode === 'boolean' ? options.encode : defaultOptions.encode,
    encodeDotInKeys: typeof options.encodeDotInKeys === 'boolean' ? options.encodeDotInKeys : defaultOptions.encodeDotInKeys,
    encoder: typeof options.encoder === 'function' ? options.encoder : defaultOptions.encoder,
    encodeValuesOnly: typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaultOptions.encodeValuesOnly,
    filter,
    format,
    formatter,
    serializeDate: typeof options.serializeDate === 'function' ? options.serializeDate : defaultOptions.serializeDate,
    skipNulls: typeof options.skipNulls === 'boolean' ? options.skipNulls : defaultOptions.skipNulls,
    sort: typeof options.sort === 'function' ? options.sort : null,
    strictNullHandling: typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaultOptions.strictNullHandling
  };
};

/**
 * Stringify an object into a query string
 */
export const stringify = (object: Record<string, unknown>, options?: StringifyOptions): string => {
  let obj = object;
  const opts = normalizeOptions(options);

  if (typeof opts.filter === 'function') {
    obj = opts.filter('', obj) as Record<string, unknown>;
  }

  let keys: string[] | undefined;
  if (isArray(opts.filter)) {
    keys = opts.filter;
  }

  if (typeof obj !== 'object' || obj === null) {
    return '';
  }

  const arrayFormat = arrayPrefixGenerators[opts.arrayFormat] as ArrayFormatFunction | string;
  const commaRoundTrip = arrayFormat === 'comma' && opts.commaRoundTrip;

  if (!keys) {
    keys = Object.keys(obj);
  }

  if (opts.sort) {
    keys.sort(opts.sort);
  }

  const context = getSentinelValue();
  const values: string[] = [];

  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];
    const value = obj[key];

    if (opts.skipNulls && value === null) {
      continue;
    }

    pushToArray(
      values,
      serializeValue(
        value,
        key,
        arrayFormat,
        commaRoundTrip,
        opts.allowEmptyArrays,
        opts.strictNullHandling,
        opts.skipNulls,
        opts.encodeDotInKeys,
        opts.encode ? opts.encoder : null,
        opts.filter,
        opts.sort,
        opts.allowDots,
        opts.serializeDate,
        opts.format,
        opts.formatter,
        opts.encodeValuesOnly,
        opts.charset,
        context
      )
    );
  }

  const joined = values.join(opts.delimiter);
  let prefix = opts.addQueryPrefix === true ? '?' : '';

  if (opts.charsetSentinel) {
    if (opts.charset === 'iso-8859-1') {
      prefix += 'utf8=%26%2310003%3B&';
    } else {
      prefix += 'utf8=%E2%9C%93&';
    }
  }

  return joined.length > 0 ? prefix + joined : '';
};