function css<T extends Element>(
  element: T,
  prop: string | string[],
  value?: string | number
): string | Record<string, string> | void {
  if (Array.isArray(prop)) {
    const computedStyle = getComputedStyle(element);
    const result: Record<string, string> = {};
    const propertyCount = prop.length;
    
    for (let index = 0; index < propertyCount; index++) {
      const propertyName = prop[index];
      result[propertyName] = getCssProperty(element, propertyName, false, computedStyle);
    }
    
    return result;
  }
  
  if (value !== undefined) {
    return setStyle(element, prop, value);
  }
  
  return getCssProperty(element, prop);
}

function getCssProperty(
  element: Element,
  prop: string,
  forceComputed: boolean = false,
  computedStyle?: CSSStyleDeclaration
): string {
  const styles = computedStyle ?? getComputedStyle(element);
  return styles.getPropertyValue(prop);
}

function setStyle(
  element: Element,
  prop: string,
  value: string | number
): void {
  if (element instanceof HTMLElement) {
    element.style.setProperty(prop, String(value));
  }
}