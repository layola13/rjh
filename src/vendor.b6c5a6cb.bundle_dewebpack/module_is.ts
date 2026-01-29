function isMatch(selector: string | Element | Element[]): boolean {
  const normalizedSelector = typeof selector === "string" && k.test(selector) 
    ? b(selector) 
    : selector || [];
  
  const matchedElements = O(this, normalizedSelector, false);
  
  return matchedElements.length > 0;
}