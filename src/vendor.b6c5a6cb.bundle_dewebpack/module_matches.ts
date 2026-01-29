function matches(element: Element, selector: string): boolean | undefined {
  if (element.matches !== undefined) {
    return element.matches(selector);
  }
  
  const elementWithLegacy = element as Element & {
    matchesSelector?: (selector: string) => boolean;
    webkitMatchesSelector?: (selector: string) => boolean;
    mozMatchesSelector?: (selector: string) => boolean;
    msMatchesSelector?: (selector: string) => boolean;
  };
  
  if (elementWithLegacy.matchesSelector !== undefined) {
    return elementWithLegacy.matchesSelector(selector);
  }
  
  if (elementWithLegacy.webkitMatchesSelector !== undefined) {
    return elementWithLegacy.webkitMatchesSelector(selector);
  }
  
  if (elementWithLegacy.mozMatchesSelector !== undefined) {
    return elementWithLegacy.mozMatchesSelector(selector);
  }
  
  if (elementWithLegacy.msMatchesSelector !== undefined) {
    return elementWithLegacy.msMatchesSelector(selector);
  }
  
  return undefined;
}

export default matches;