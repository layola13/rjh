export function closest(element: Element, selector: string, boundary: Element | null): Element | null {
  let current: Element | null = element;
  
  while (current && boundary) {
    const isBoundary = current === boundary || current === document.body;
    
    if (isBoundary || (current.nodeType === 1 && current.matches(selector))) {
      if (isBoundary) {
        current = null;
      }
      break;
    }
    
    current = current.parentNode as Element | null;
  }
  
  return current;
}

export function getScrollElement(element: Element): Element | null {
  let current: Element | null = element;
  
  if (!current) {
    return null;
  }
  
  do {
    const overflowStyle = window.getComputedStyle(current).overflow;
    
    if (
      (overflowStyle === 'auto' || overflowStyle === 'scroll') &&
      current &&
      current.nodeType &&
      (current.offsetWidth < current.scrollWidth || current.offsetHeight < current.scrollHeight)
    ) {
      break;
    }
    
    if (!current || !current.nodeType || current === document.body) {
      current = null;
      break;
    }
    
    current = current.parentNode as Element | null;
  } while (current);
  
  return current;
}

export function getDomIndex(element: Element, excludeSelector: string): number {
  if (!element.parentNode) {
    return -1;
  }
  
  return Array.from(element.parentNode.children).filter((child) => {
    return excludeSelector === '' || !child.matches(excludeSelector);
  }).indexOf(element);
}