import { call } from './47730';
import { defineWellKnownSymbolMethod } from './45381';
import { requireObjectCoercible } from './77064';
import { isNullOrUndefined } from './61656';
import { toObject } from './39943';
import { strictEquals } from './73115';
import { toString } from './24200';
import { getMethod } from './9087';
import { regExpExec } from './18243';

const SEARCH_SYMBOL = Symbol.search;

defineWellKnownSymbolMethod('search', (
  symbol: symbol,
  nativeSearch: (searchValue: RegExp) => number,
  regExpSearch: (regexp: RegExp, string: string) => { done: boolean; value?: number }
): [(searchValue: unknown) => number, (str: string) => number] => {
  return [
    function search(this: unknown, searchValue: unknown): number {
      const target = toObject(this);
      const searchMethod = isNullOrUndefined(searchValue) ? undefined : getMethod(searchValue, symbol);
      
      if (searchMethod) {
        return call(searchMethod, searchValue, target);
      }
      
      return new RegExp(searchValue as string | RegExp)[symbol](toString(target));
    },
    
    function regExpSearch(this: RegExp, str: string): number {
      const regexp = requireObjectCoercible(this) as RegExp;
      const searchString = toString(str);
      const result = regExpSearch(nativeSearch, regexp, searchString);
      
      if (result.done) {
        return result.value!;
      }
      
      const previousLastIndex = regexp.lastIndex;
      
      if (!strictEquals(previousLastIndex, 0)) {
        regexp.lastIndex = 0;
      }
      
      const matchResult = regExpExec(regexp, searchString);
      
      if (!strictEquals(regexp.lastIndex, previousLastIndex)) {
        regexp.lastIndex = previousLastIndex;
      }
      
      return matchResult === null ? -1 : matchResult.index;
    }
  ];
});