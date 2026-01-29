import typeofCheck from './module_194243';
import getBuiltIn from './module_738380';
import isCallable from './module_170452';
import objectIsPrototypeOf from './module_862730';
import nativeSymbolSupport from './module_262889';

function isSymbol(value: unknown): value is symbol {
  if (nativeSymbolSupport) {
    return typeofCheck(value) === 'symbol';
  }

  const SymbolConstructor = getBuiltIn('Symbol');
  return (
    isCallable(SymbolConstructor) &&
    objectIsPrototypeOf(SymbolConstructor.prototype, Object(value))
  );
}

export default isSymbol;