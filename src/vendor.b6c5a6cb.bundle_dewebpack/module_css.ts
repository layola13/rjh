function css(element: HTMLElement, property: string | string[], value?: string | number): string | Record<string, string> | void {
  if (Array.isArray(property)) {
    const styles = getComputedStyle(element);
    const result: Record<string, string> = {};
    const length = property.length;
    
    for (let index = 0; index < length; index++) {
      const prop = property[index];
      result[prop] = getCssValue(element, prop, false, styles);
    }
    
    return result;
  }
  
  if (value !== undefined) {
    return setStyle(element, property, value);
  }
  
  return getCssValue(element, property);
}

function getCssValue(
  element: HTMLElement,
  property: string,
  forceComputed: boolean = false,
  computedStyles?: CSSStyleDeclaration
): string {
  const styles = computedStyles ?? getComputedStyle(element);
  return styles.getPropertyValue(property);
}

function setStyle(
  element: HTMLElement,
  property: string,
  value: string | number
): void {
  element.style.setProperty(property, String(value));
}