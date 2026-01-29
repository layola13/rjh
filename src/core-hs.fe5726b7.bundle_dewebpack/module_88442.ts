import getBuiltIn from './module_13270';
import functionUncurryThis from './module_61259';
import getOwnPropertyNamesModule from './module_66547';
import getOwnPropertySymbolsModule from './module_32218';
import anObject from './module_77064';

const concat = functionUncurryThis([].concat);

const ownKeys = getBuiltIn("Reflect", "ownKeys") || function (target: object): PropertyKey[] {
  const keys = getOwnPropertyNamesModule.f(anObject(target));
  const getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(target)) : keys;
};

export default ownKeys;