const hasNativeSymbolSupport: boolean = (() => {
  if (!Object.getOwnPropertySymbols) {
    return false;
  }

  try {
    const testSymbol = Symbol();
    
    if (!String(testSymbol)) {
      return false;
    }
    
    if (!(Object(testSymbol) instanceof Symbol)) {
      return false;
    }
    
    const engineVersion = getEngineVersion();
    if (!Symbol.sham && engineVersion && engineVersion < 41) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
})();

function getEngineVersion(): number | undefined {
  // Implementation depends on module 638077
  return undefined;
}

export default hasNativeSymbolSupport;