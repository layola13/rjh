import isCallable from './isCallable';
import hasOwnProperty from './hasOwnProperty';
import NATIVE_SYMBOL from './nativeSymbol';

export default function isSymbol(value: unknown): value is symbol {
  if (NATIVE_SYMBOL) {
    return typeof value === "symbol";
  }
  
  const SymbolConstructor = globalThis.Symbol;
  return (
    isCallable(SymbolConstructor) &&
    hasOwnProperty(SymbolConstructor.prototype, Object(value))
  );
}