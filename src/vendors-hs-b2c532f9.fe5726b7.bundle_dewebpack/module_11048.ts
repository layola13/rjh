import * as utils from './utils';

interface ParseOptions {
  allowDots?: boolean;
  allowEmptyArrays?: boolean;
  allowPrototypes?: boolean;
  allowSparse?: boolean;
  arrayLimit?: number;
  charset?: 'utf-8' | 'iso-8859-1';
  charsetSentinel?: boolean;
  comma?: boolean;
  decodeDotInKeys?: boolean;
  decoder?: (value: string, decoder: DecoderFunction, charset: string, type: 'key' | 'value') => any;
  delimiter?: string | RegExp;
  depth?: number | false;
  duplicates?: 'combine' | 'first' | 'last';
  ignoreQueryPrefix?: boolean;
  interpretNumericEntities?: boolean;
  parameterLimit?: number;
  parseArrays?: boolean;
  plainObjects?: boolean;
  strictDepth?: boolean;
  strictNullHandling?: boolean;
  throwOnLimitExceeded?: boolean;
}

interface NormalizedOptions {
  allowDots: boolean;
  allowEmptyArrays: boolean;
  allowPrototypes: boolean;
  allowSparse: boolean;
  arrayLimit: number;
  charset: 'utf-8' | 'iso-8859-1';
  charsetSentinel: boolean;
  comma: boolean;
  decodeDotInKeys: boolean;
  decoder: DecoderFunction;
  delimiter: string | RegExp;
  depth: number;
  duplicates: 'combine' | 'first' | 'last';
  ignoreQueryPrefix: boolean;
  interpretNumericEntities: boolean;
  parameterLimit: number;
  parseArrays: boolean;
  plainObjects: boolean;
  strictDepth: boolean;
  strictNullHandling: boolean;
  throwOnLimitExceeded: boolean;
}

type DecoderFunction = (value: string, decoder: any, charset: string, type: string) => any;

type ParsedObject = Record<string, any>;

const DEFAULT_OPTIONS: NormalizedOptions = {
  allowDots: false,
  allowEmptyArrays: false,
  allowPrototypes: false,
  allowSparse: false,
  arrayLimit: 20,
  charset: 'utf-8',
  charsetSentinel: false,
  comma: false,
  decodeDotInKeys: false,
  decoder: utils.decode,
  delimiter: '&',
  depth: 5,
  duplicates: 'combine',
  ignoreQueryPrefix: false,
  interpretNumericEntities: false,
  parameterLimit: 1000,
  parseArrays: true,
  plainObjects: false,
  strictDepth: false,
  strictNullHandling: false,
  throwOnLimitExceeded: false
};

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Interprets HTML numeric entities (e.g., &#100;) and converts them to characters
 */
function interpretNumericEntities(value: string): string {
  return value.replace(/&#(\d+);/g, (match: string, code: string): string => {
    return String.fromCharCode(parseInt(code, 10));
  });
}

/**
 * Validates array value and splits comma-separated values if needed
 */
function validateArrayValue(
  value: any,
  options: NormalizedOptions,
  currentArrayLength: number
): any {
  if (value && typeof value === 'string' && options.comma && value.indexOf(',') > -1) {
    return value.split(',');
  }

  if (options.throwOnLimitExceeded && currentArrayLength >= options.arrayLimit) {
    const elementWord = options.arrayLimit === 1 ? 'element' : 'elements';
    throw new RangeError(
      `Array limit exceeded. Only ${options.arrayLimit} ${elementWord} allowed in an array.`
    );
  }

  return value;
}

/**
 * Parses a key path and builds nested object structure
 */
function parseKey(
  key: string,
  value: any,
  options: NormalizedOptions,
  isArrayValue: boolean
): any {
  if (!key) {
    return;
  }

  const processedKey = options.allowDots ? key.replace(/\.([^.[]+)/g, '[$1]') : key;
  const bracketPattern = /(\[[^[\]]*])/g;
  const firstBracket = options.depth > 0 && bracketPattern.exec(processedKey);
  const segment = firstBracket ? processedKey.slice(0, firstBracket.index) : processedKey;
  const keys: string[] = [];

  if (segment) {
    if (!options.plainObjects && hasOwnProperty.call(Object.prototype, segment) && !options.allowPrototypes) {
      return;
    }
    keys.push(segment);
  }

  let depthCounter = 0;
  let bracketMatch = firstBracket;

  while (options.depth > 0 && (bracketMatch = bracketPattern.exec(processedKey)) !== null && depthCounter < options.depth) {
    depthCounter += 1;

    const bracketContent = bracketMatch[1].slice(1, -1);
    if (!options.plainObjects && hasOwnProperty.call(Object.prototype, bracketContent) && !options.allowPrototypes) {
      return;
    }

    keys.push(bracketMatch[1]);
  }

  if (bracketMatch) {
    if (options.strictDepth === true) {
      throw new RangeError(
        `Input depth exceeded depth option of ${options.depth} and strictDepth is true`
      );
    }
    keys.push('[' + processedKey.slice(bracketMatch.index) + ']');
  }

  return buildNestedObject(keys, value, options, isArrayValue);
}

/**
 * Builds a nested object from an array of keys
 */
function buildNestedObject(
  keys: string[],
  value: any,
  options: NormalizedOptions,
  isArrayValue: boolean
): any {
  let arrayIndex = 0;

  if (keys.length > 0 && keys[keys.length - 1] === '[]') {
    const arrayKey = keys.slice(0, -1).join('');
    arrayIndex = Array.isArray(value) && value[arrayKey] ? value[arrayKey].length : 0;
  }

  const processedValue = isArrayValue ? value : validateArrayValue(value, options, arrayIndex);
  let result = processedValue;

  for (let i = keys.length - 1; i >= 0; --i) {
    const currentKey = keys[i];
    let obj: any;

    if (currentKey === '[]' && options.parseArrays) {
      const shouldCreateEmptyArray =
        options.allowEmptyArrays &&
        (result === '' || (options.strictNullHandling && result === null));
      obj = shouldCreateEmptyArray ? [] : utils.combine([], result);
    } else {
      obj = options.plainObjects ? { __proto__: null } : {};

      const isArrayNotation = currentKey.charAt(0) === '[' && currentKey.charAt(currentKey.length - 1) === ']';
      const cleanKey = isArrayNotation ? currentKey.slice(1, -1) : currentKey;
      const decodedKey = options.decodeDotInKeys ? cleanKey.replace(/%2E/g, '.') : cleanKey;
      const index = parseInt(decodedKey, 10);

      if (!options.parseArrays || decodedKey !== '') {
        const isValidArrayIndex =
          !isNaN(index) &&
          currentKey !== decodedKey &&
          String(index) === decodedKey &&
          index >= 0 &&
          options.parseArrays &&
          index <= options.arrayLimit;

        if (isValidArrayIndex) {
          obj = [];
          obj[index] = result;
        } else if (decodedKey !== '__proto__') {
          obj[decodedKey] = result;
        }
      } else {
        obj = { 0: result };
      }
    }

    result = obj;
  }

  return result;
}

/**
 * Parses a query string into key-value pairs
 */
function parseQueryString(queryString: string, options: NormalizedOptions): ParsedObject {
  const result: ParsedObject = { __proto__: null };
  const cleanQuery = options.ignoreQueryPrefix ? queryString.replace(/^\?/, '') : queryString;
  const normalizedQuery = cleanQuery.replace(/%5B/gi, '[').replace(/%5D/gi, ']');

  const limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
  const maxParts = options.throwOnLimitExceeded ? (limit ?? 0) + 1 : limit;
  const parts = normalizedQuery.split(options.delimiter as string, maxParts);

  if (options.throwOnLimitExceeded && parts.length > (limit ?? 0)) {
    const parameterWord = limit === 1 ? 'parameter' : 'parameters';
    throw new RangeError(`Parameter limit exceeded. Only ${limit} ${parameterWord} allowed.`);
  }

  let charsetSentinelIndex = -1;
  let detectedCharset: 'utf-8' | 'iso-8859-1' = options.charset;

  if (options.charsetSentinel) {
    for (let i = 0; i < parts.length; ++i) {
      if (parts[i].indexOf('utf8=') === 0) {
        if (parts[i] === 'utf8=%E2%9C%93') {
          detectedCharset = 'utf-8';
        } else if (parts[i] === 'utf8=%26%2310003%3B') {
          detectedCharset = 'iso-8859-1';
        }
        charsetSentinelIndex = i;
        break;
      }
    }
  }

  for (let i = 0; i < parts.length; ++i) {
    if (i === charsetSentinelIndex) {
      continue;
    }

    const part = parts[i];
    const bracketEqualsIndex = part.indexOf(']=');
    const equalsIndex = bracketEqualsIndex === -1 ? part.indexOf('=') : bracketEqualsIndex + 1;

    let parsedKey: string;
    let parsedValue: any;

    if (equalsIndex === -1) {
      parsedKey = options.decoder(part, DEFAULT_OPTIONS.decoder, detectedCharset, 'key');
      parsedValue = options.strictNullHandling ? null : '';
    } else {
      parsedKey = options.decoder(part.slice(0, equalsIndex), DEFAULT_OPTIONS.decoder, detectedCharset, 'key');
      const rawValue = part.slice(equalsIndex + 1);
      const existingValueLength = Array.isArray(result[parsedKey]) ? result[parsedKey].length : 0;
      const validatedValue = validateArrayValue(rawValue, options, existingValueLength);

      parsedValue = utils.maybeMap(validatedValue, (val: string) => {
        return options.decoder(val, DEFAULT_OPTIONS.decoder, detectedCharset, 'value');
      });
    }

    if (parsedValue && options.interpretNumericEntities && detectedCharset === 'iso-8859-1') {
      parsedValue = interpretNumericEntities(String(parsedValue));
    }

    if (part.indexOf('[]=') > -1) {
      parsedValue = Array.isArray(parsedValue) ? [parsedValue] : parsedValue;
    }

    const hasExistingKey = hasOwnProperty.call(result, parsedKey);

    if (hasExistingKey && options.duplicates === 'combine') {
      result[parsedKey] = utils.combine(result[parsedKey], parsedValue);
    } else if (!hasExistingKey || options.duplicates === 'last') {
      result[parsedKey] = parsedValue;
    }
  }

  return result;
}

/**
 * Normalizes and validates parse options
 */
function normalizeOptions(userOptions?: ParseOptions): NormalizedOptions {
  if (!userOptions) {
    return DEFAULT_OPTIONS;
  }

  if (userOptions.allowEmptyArrays !== undefined && typeof userOptions.allowEmptyArrays !== 'boolean') {
    throw new TypeError('`allowEmptyArrays` option can only be `true` or `false`, when provided');
  }

  if (userOptions.decodeDotInKeys !== undefined && typeof userOptions.decodeDotInKeys !== 'boolean') {
    throw new TypeError('`decodeDotInKeys` option can only be `true` or `false`, when provided');
  }

  if (userOptions.decoder !== null && userOptions.decoder !== undefined && typeof userOptions.decoder !== 'function') {
    throw new TypeError('Decoder has to be a function.');
  }

  if (userOptions.charset !== undefined && userOptions.charset !== 'utf-8' && userOptions.charset !== 'iso-8859-1') {
    throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
  }

  if (userOptions.throwOnLimitExceeded !== undefined && typeof userOptions.throwOnLimitExceeded !== 'boolean') {
    throw new TypeError('`throwOnLimitExceeded` option must be a boolean');
  }

  const charset = userOptions.charset === undefined ? DEFAULT_OPTIONS.charset : userOptions.charset;
  const duplicates = userOptions.duplicates === undefined ? DEFAULT_OPTIONS.duplicates : userOptions.duplicates;

  if (duplicates !== 'combine' && duplicates !== 'first' && duplicates !== 'last') {
    throw new TypeError('The duplicates option must be either combine, first, or last');
  }

  return {
    allowDots: userOptions.allowDots === undefined 
      ? (userOptions.decodeDotInKeys === true || DEFAULT_OPTIONS.allowDots)
      : !!userOptions.allowDots,
    allowEmptyArrays: typeof userOptions.allowEmptyArrays === 'boolean' 
      ? !!userOptions.allowEmptyArrays 
      : DEFAULT_OPTIONS.allowEmptyArrays,
    allowPrototypes: typeof userOptions.allowPrototypes === 'boolean' 
      ? userOptions.allowPrototypes 
      : DEFAULT_OPTIONS.allowPrototypes,
    allowSparse: typeof userOptions.allowSparse === 'boolean' 
      ? userOptions.allowSparse 
      : DEFAULT_OPTIONS.allowSparse,
    arrayLimit: typeof userOptions.arrayLimit === 'number' 
      ? userOptions.arrayLimit 
      : DEFAULT_OPTIONS.arrayLimit,
    charset,
    charsetSentinel: typeof userOptions.charsetSentinel === 'boolean' 
      ? userOptions.charsetSentinel 
      : DEFAULT_OPTIONS.charsetSentinel,
    comma: typeof userOptions.comma === 'boolean' 
      ? userOptions.comma 
      : DEFAULT_OPTIONS.comma,
    decodeDotInKeys: typeof userOptions.decodeDotInKeys === 'boolean' 
      ? userOptions.decodeDotInKeys 
      : DEFAULT_OPTIONS.decodeDotInKeys,
    decoder: typeof userOptions.decoder === 'function' 
      ? userOptions.decoder 
      : DEFAULT_OPTIONS.decoder,
    delimiter: typeof userOptions.delimiter === 'string' || utils.isRegExp(userOptions.delimiter) 
      ? userOptions.delimiter 
      : DEFAULT_OPTIONS.delimiter,
    depth: typeof userOptions.depth === 'number' || userOptions.depth === false 
      ? +userOptions.depth 
      : DEFAULT_OPTIONS.depth,
    duplicates,
    ignoreQueryPrefix: userOptions.ignoreQueryPrefix === true,
    interpretNumericEntities: typeof userOptions.interpretNumericEntities === 'boolean' 
      ? userOptions.interpretNumericEntities 
      : DEFAULT_OPTIONS.interpretNumericEntities,
    parameterLimit: typeof userOptions.parameterLimit === 'number' 
      ? userOptions.parameterLimit 
      : DEFAULT_OPTIONS.parameterLimit,
    parseArrays: userOptions.parseArrays !== false,
    plainObjects: typeof userOptions.plainObjects === 'boolean' 
      ? userOptions.plainObjects 
      : DEFAULT_OPTIONS.plainObjects,
    strictDepth: typeof userOptions.strictDepth === 'boolean' 
      ? !!userOptions.strictDepth 
      : DEFAULT_OPTIONS.strictDepth,
    strictNullHandling: typeof userOptions.strictNullHandling === 'boolean' 
      ? userOptions.strictNullHandling 
      : DEFAULT_OPTIONS.strictNullHandling,
    throwOnLimitExceeded: typeof userOptions.throwOnLimitExceeded === 'boolean' && userOptions.throwOnLimitExceeded
  };
}

/**
 * Parses a query string into an object
 */
export default function parse(queryString: string, userOptions?: ParseOptions): ParsedObject {
  const options = normalizeOptions(userOptions);

  if (queryString === '' || queryString == null) {
    return options.plainObjects ? { __proto__: null } : {};
  }

  const parsedQuery = typeof queryString === 'string' 
    ? parseQueryString(queryString, options) 
    : queryString;

  const result: ParsedObject = options.plainObjects ? { __proto__: null } : {};
  const keys = Object.keys(parsedQuery);

  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];
    const isStringInput = typeof queryString === 'string';
    const parsedValue = parseKey(key, parsedQuery[key], options, isStringInput);
    const mergedValue = utils.merge(result, parsedValue, options);
    result[key] = mergedValue[key];
  }

  return options.allowSparse === true ? result : utils.compact(result);
}