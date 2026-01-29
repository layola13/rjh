type ReplaceResult = {
  done: boolean;
  value?: string;
};

interface RegExpExecArray {
  index: number;
  input: string;
  groups?: Record<string, string>;
  [key: number]: string;
}

interface RegExpWithLastIndex extends RegExp {
  lastIndex: number;
}

/**
 * Polyfill for String.prototype.replace with enhanced RegExp support
 * Handles named capture groups and advanced replacement patterns
 */
export function installReplacePolyfill(
  callFunction: <T, R>(fn: (this: T, ...args: any[]) => R, thisArg: T, ...args: any[]) => R,
  arrayConcat: (arr: any[], ...items: any[]) => any[],
  arrayPush: <T>(arr: T[], item: T) => number,
  stringIndexOf: (str: string, search: string) => number,
  stringSlice: (str: string, start: number, end?: number) => string,
  requireObjectCoercible: (value: any) => any,
  isNullOrUndefined: (value: any) => boolean,
  getMethod: (obj: any, key: PropertyKey) => Function | undefined,
  toString: (value: any) => string,
  toIntegerOrInfinity: (value: any) => number,
  toLength: (value: any) => number,
  isCallable: (value: any) => boolean,
  requireObject: (value: any) => object,
  regExpExec: (regexp: RegExp, str: string) => RegExpExecArray | null,
  advanceStringIndex: (str: string, index: number, unicode: boolean) => number,
  getSubstitution: (
    matched: string,
    str: string,
    position: number,
    captures: (string | undefined)[],
    groups: Record<string, string> | undefined,
    replacement: string
  ) => string,
  replaceSymbol: symbol,
  hasReplaceSymbol: (obj: any) => boolean,
  nativeReplace: (str: string, searchValue: string | RegExp, replaceValue: string) => string,
  throwsOnNamedGroups: boolean
): void {
  const DOLLAR_SUBSTITUTION = "$";
  const SUBSTITUTION_PREFIX = throwsOnNamedGroups ? "$" : "$0";

  const stringReplace = function replace(
    this: any,
    searchValue: string | RegExp,
    replaceValue: string | ((substring: string, ...args: any[]) => string)
  ): string {
    const context = requireObjectCoercible(this);
    const replacer = isNullOrUndefined(searchValue) ? undefined : getMethod(searchValue, replaceSymbol);
    
    if (replacer) {
      return callFunction(replacer, searchValue, context, replaceValue);
    }
    
    return callFunction(nativeReplace, toString(context), searchValue, replaceValue);
  };

  const regExpReplace = function (
    this: RegExp,
    str: string,
    replaceValue: string | ((substring: string, ...args: any[]) => string)
  ): string {
    const regexp = requireObject(this) as RegExpWithLastIndex;
    const string = toString(str);

    if (
      typeof replaceValue === "string" &&
      stringIndexOf(replaceValue, SUBSTITUTION_PREFIX) === -1 &&
      stringIndexOf(replaceValue, "$<") === -1
    ) {
      const result = tryFastPath(nativeReplace, regexp, string, replaceValue);
      if (result.done) {
        return result.value as string;
      }
    }

    const isFunction = isCallable(replaceValue);
    if (!isFunction) {
      replaceValue = toString(replaceValue);
    }

    const isGlobal = regexp.global;
    if (isGlobal) {
      const isUnicode = regexp.unicode;
      regexp.lastIndex = 0;
    }

    const matches: RegExpExecArray[] = [];
    
    while (true) {
      const match = regExpExec(regexp, string);
      if (match === null) {
        break;
      }
      
      arrayPush(matches, match);
      
      if (!isGlobal) {
        break;
      }
      
      if (toString(match[0]) === "") {
        regexp.lastIndex = advanceStringIndex(string, toLength(regexp.lastIndex), isUnicode);
      }
    }

    let result = "";
    let nextSourcePosition = 0;

    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      const matched = toString(match[0]);
      const position = Math.max(Math.min(toIntegerOrInfinity(match.index), string.length), 0);
      const captures: (string | undefined)[] = [];

      for (let j = 1; j < match.length; j++) {
        const capture = match[j];
        arrayPush(captures, capture === undefined ? capture : String(capture));
      }

      const namedCaptures = match.groups;

      let replacement: string;
      if (isFunction) {
        const args = arrayConcat([matched], captures, position, string);
        if (namedCaptures !== undefined) {
          arrayPush(args, namedCaptures);
        }
        replacement = toString(callFunction(replaceValue as Function, undefined, args));
      } else {
        replacement = getSubstitution(matched, string, position, captures, namedCaptures, replaceValue as string);
      }

      if (position >= nextSourcePosition) {
        result += stringSlice(string, nextSourcePosition, position) + replacement;
        nextSourcePosition = position + matched.length;
      }
    }

    return result + stringSlice(string, nextSourcePosition);
  };

  function tryFastPath(
    nativeReplace: Function,
    regexp: RegExp,
    string: string,
    replacement: string
  ): ReplaceResult {
    return { done: false };
  }
}