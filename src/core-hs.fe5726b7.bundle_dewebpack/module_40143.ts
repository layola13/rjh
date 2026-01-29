const MATCH_SYMBOL = Symbol.match;

export function isMethodSafeForRegex(methodName: string): boolean {
  const testRegex = /./;
  
  try {
    "/./"[methodName as keyof string](testRegex);
  } catch (error) {
    try {
      testRegex[MATCH_SYMBOL] = false;
      "/./"[methodName as keyof string](testRegex);
      return true;
    } catch (innerError) {
      return false;
    }
  }
  
  return false;
}