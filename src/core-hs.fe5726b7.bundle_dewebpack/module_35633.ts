import { call } from './utils/function-call';
import { getBuiltIn } from './utils/get-built-in';
import { functionApply } from './utils/function-apply';
import { functionCall } from './utils/function-call';
import { functionUncurryThis } from './utils/function-uncurry-this';
import { fails } from './utils/fails';
import { isCallable } from './utils/is-callable';
import { isSymbol } from './utils/is-symbol';
import { toIndexedObject } from './utils/to-indexed-object';
import { getReplacedUnicodeEscape } from './utils/get-replaced-unicode-escape';
import { NATIVE_SYMBOL } from './utils/native-symbol';
import { exportToGlobal } from './utils/export';

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
interface JSONObject {
  [key: string]: JSONValue;
}
interface JSONArray extends Array<JSONValue> {}

type Replacer = ((key: string, value: unknown) => unknown) | Array<string | number> | null;
type StringifyArgs = [value: unknown, replacer?: Replacer, space?: string | number];

const nativeStringify = getBuiltIn<(...args: StringifyArgs) => string | undefined>('JSON', 'stringify');
const regExpExec = functionUncurryThis(/./.exec);
const stringCharAt = functionUncurryThis(''.charAt);
const stringCharCodeAt = functionUncurryThis(''.charCodeAt);
const stringReplace = functionUncurryThis(''.replace);
const numberToString = functionUncurryThis((1).toString);

const SURROGATE_PAIR_REGEX = /[\uD800-\uDFFF]/g;
const HIGH_SURROGATE_REGEX = /^[\uD800-\uDBFF]$/;
const LOW_SURROGATE_REGEX = /^[\uDC00-\uDFFF]$/;

const INCORRECT_SYMBOL_HANDLING = !NATIVE_SYMBOL || fails(() => {
  const symbol = getBuiltIn('Symbol')();
  return '[null]' !== nativeStringify([symbol]) ||
         '{}' !== nativeStringify({ a: symbol }) ||
         '{}' !== nativeStringify(Object(symbol));
});

const INCORRECT_SURROGATE_PAIR_HANDLING = fails(() => {
  return '"\\udf06\\ud834"' !== nativeStringify('\udf06\ud834') ||
         '"\\udead"' !== nativeStringify('\udead');
});

const fixedStringify = function(value: unknown, replacer?: Replacer, space?: string | number): string | undefined {
  const args = toIndexedObject(arguments) as unknown[];
  const validatedReplacer = getReplacedUnicodeEscape(replacer);
  
  if (isCallable(validatedReplacer) || (value !== undefined && !isSymbol(value))) {
    args[1] = function(this: unknown, key: string, val: unknown): unknown {
      if (isCallable(validatedReplacer)) {
        val = functionCall(validatedReplacer, this, String(key), val);
      }
      if (!isSymbol(val)) {
        return val;
      }
    };
    return functionApply(nativeStringify, null, args);
  }
};

const escapeSurrogatePair = function(char: string, index: number, str: string): string {
  const prevChar = stringCharAt(str, index - 1);
  const nextChar = stringCharAt(str, index + 1);
  
  const isUnpairedHighSurrogate = regExpExec(HIGH_SURROGATE_REGEX, char) && !regExpExec(LOW_SURROGATE_REGEX, nextChar);
  const isUnpairedLowSurrogate = regExpExec(LOW_SURROGATE_REGEX, char) && !regExpExec(HIGH_SURROGATE_REGEX, prevChar);
  
  if (isUnpairedHighSurrogate || isUnpairedLowSurrogate) {
    return '\\u' + numberToString(stringCharCodeAt(char, 0), 16);
  }
  return char;
};

if (nativeStringify) {
  exportToGlobal({
    target: 'JSON',
    stat: true,
    arity: 3,
    forced: INCORRECT_SYMBOL_HANDLING || INCORRECT_SURROGATE_PAIR_HANDLING
  }, {
    stringify: function stringify(value: unknown, replacer?: Replacer, space?: string | number): string | undefined {
      const args = toIndexedObject(arguments) as unknown[];
      const result = functionApply(
        INCORRECT_SYMBOL_HANDLING ? fixedStringify : nativeStringify,
        null,
        args
      );
      
      if (INCORRECT_SURROGATE_PAIR_HANDLING && typeof result === 'string') {
        return stringReplace(result, SURROGATE_PAIR_REGEX, escapeSurrogatePair);
      }
      return result;
    }
  });
}