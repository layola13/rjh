import typeofCheck from './module_194243';
import symbolIteratorCheck from './module_564924';

const nativeSymbol = typeof Symbol !== 'undefined' ? Symbol : undefined;

export default function hasNativeSymbolSupport(): boolean {
  return (
    typeof nativeSymbol === 'function' &&
    typeof Symbol === 'function' &&
    typeofCheck(nativeSymbol('foo')) === 'symbol' &&
    typeofCheck(Symbol('bar')) === 'symbol' &&
    symbolIteratorCheck()
  );
}