function addClass(element: Element, className: string): void {
  if (element.classList) {
    element.classList.add(className);
  } else if (!hasClass(element, className)) {
    if (typeof (element as HTMLElement).className === 'string') {
      (element as HTMLElement).className = `${(element as HTMLElement).className} ${className}`;
    } else {
      const baseClassName = ((element as SVGElement).className && (element as SVGElement).className.baseVal) || '';
      element.setAttribute('class', `${baseClassName} ${className}`);
    }
  }
}

function hasClass(element: Element, className: string): boolean {
  if (element.classList) {
    return element.classList.contains(className);
  }
  
  const elementClassName = typeof (element as HTMLElement).className === 'string'
    ? (element as HTMLElement).className
    : (element as SVGElement).className?.baseVal ?? '';
  
  return new RegExp(`(^|\\s)${className}(\\s|$)`).test(elementClassName);
}

export default addClass;