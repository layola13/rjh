import getTypeOf from './194243';
import hasNativeSymbolSupport from './906680';

export default hasNativeSymbolSupport && !Symbol.sham && getTypeOf(Symbol.iterator) === "symbol";