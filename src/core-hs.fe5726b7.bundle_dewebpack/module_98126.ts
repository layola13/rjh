const CHROME_VERSION = 41;

function hasWorkingSymbolSupport(): boolean {
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
    if (!Symbol.sham && engineVersion && engineVersion < CHROME_VERSION) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

function getEngineVersion(): number | undefined {
  // Implementation would depend on module 89675
  // Placeholder for V8/engine version detection
  return undefined;
}

export default hasWorkingSymbolSupport();