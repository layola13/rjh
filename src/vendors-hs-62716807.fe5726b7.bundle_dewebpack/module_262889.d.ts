/**
 * Checks if the environment supports native Symbol.iterator implementation.
 * 
 * This module determines whether the runtime environment has a genuine
 * (non-polyfilled) Symbol.iterator that returns a "symbol" type.
 * 
 * @module SymbolIteratorCheck
 * @returns {boolean} True if native Symbol.iterator is available and functional
 */

import typeOf from './type-of'; // Assumed from module 194243
import hasNativeSymbolSupport from './has-native-symbol-support'; // Assumed from module 906680

/**
 * Validates that Symbol.iterator is a native symbol implementation.
 * 
 * Criteria:
 * 1. Native Symbol support must be available (not polyfilled)
 * 2. Symbol.sham must not be truthy (indicates genuine implementation)
 * 3. typeof Symbol.iterator must equal "symbol"
 */
const hasNativeSymbolIterator: boolean = 
  hasNativeSymbolSupport && 
  !Symbol.sham && 
  typeOf(Symbol.iterator) === "symbol";

export default hasNativeSymbolIterator;