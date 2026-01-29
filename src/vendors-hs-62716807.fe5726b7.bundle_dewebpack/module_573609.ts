export function isStyleSupport(property: string | string[]): boolean {
  if (typeof window !== "undefined" && window.document && window.document.documentElement) {
    const properties = Array.isArray(property) ? property : [property];
    const documentElement = window.document.documentElement;
    
    return properties.some((prop) => prop in documentElement.style);
  }
  
  return false;
}

export const isFlexSupported = isStyleSupport(["flex", "webkitFlex", "Flex", "msFlex"]);