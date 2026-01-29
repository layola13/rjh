import { call } from './47730';
import { defineWellKnownSymbolMethod } from './45381';
import { requireObjectCoercible } from './77064';
import { isNullOrUndefined } from './61656';
import { toLength } from './98745';
import { toString } from './24200';
import { advanceStringIndex } from './20352';
import { getMethod } from './9087';
import { regExpExec } from './18243';

defineWellKnownSymbolMethod('match', (
  symbolMatch: symbol,
  nativeMatch: (pattern: string | RegExp) => RegExpMatchArray | null,
  maybeCallNative: (method: Function, regexp: RegExp, str: string) => { done: boolean; value: unknown }
): [(pattern: unknown) => RegExpMatchArray | null, (str: string) => RegExpMatchArray | null] => {
  return [
    function match(this: unknown, pattern: unknown): RegExpMatchArray | null {
      const target = requireObjectCoercible(this);
      const matcher = isNullOrUndefined(pattern) ? undefined : getMethod(pattern, symbolMatch);
      return matcher 
        ? call(matcher, pattern, target) 
        : new RegExp(pattern)[symbolMatch](toString(target));
    },
    function matchPolyfill(this: RegExp, str: string): RegExpMatchArray | null {
      const regexp = requireObjectCoercible(this) as RegExp;
      const string = toString(str);
      const result = maybeCallNative(nativeMatch, regexp, string);
      
      if (result.done) {
        return result.value as RegExpMatchArray | null;
      }
      
      if (!regexp.global) {
        return regExpExec(regexp, string);
      }
      
      const unicode = regexp.unicode;
      regexp.lastIndex = 0;
      
      const matches: string[] = [];
      let matchIndex = 0;
      let match: RegExpExecArray | null;
      
      while ((match = regExpExec(regexp, string)) !== null) {
        const matchStr = toString(match[0]);
        matches[matchIndex] = matchStr;
        
        if (matchStr === '') {
          regexp.lastIndex = advanceStringIndex(string, toLength(regexp.lastIndex), unicode);
        }
        
        matchIndex++;
      }
      
      return matchIndex === 0 ? null : matches;
    }
  ];
});