import hasOwnProperty from './hasOwnProperty';
import symbolFor from './symbolFor';
import symbolWithoutSetter from './symbolWithoutSetter';
import uniqueId from './uniqueId';
import sharedStore from './sharedStore';
import supportsNativeSymbol from './supportsNativeSymbol';

const globalSymbol: SymbolConstructor | undefined = (typeof Symbol !== 'undefined') ? Symbol : undefined;
const wellKnownSymbolsCache = sharedStore<Record<string, symbol>>('wks');

const createSymbol = supportsNativeSymbol
  ? (symbolFor ?? globalSymbol)
  : (globalSymbol?.withoutSetter ?? uniqueId);

/**
 * Returns a well-known symbol for the given key.
 * Creates and caches the symbol if it doesn't exist.
 * 
 * @param key - The well-known symbol name (e.g., "iterator", "toStringTag")
 * @returns The corresponding symbol
 */
export default function getWellKnownSymbol(key: string): symbol {
  if (!hasOwnProperty(wellKnownSymbolsCache, key)) {
    wellKnownSymbolsCache[key] = 
      supportsNativeSymbol && hasOwnProperty(globalSymbol as any, key)
        ? (globalSymbol as any)[key]
        : createSymbol(`Symbol.${key}`);
  }
  
  return wellKnownSymbolsCache[key];
}