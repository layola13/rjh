interface ElementWrapper {
  nativeElement: HTMLElement | SVGElement;
}

function isDOM(element: unknown): element is HTMLElement | SVGElement {
  return element instanceof HTMLElement || element instanceof SVGElement;
}

function getDOM(element: unknown): HTMLElement | SVGElement | null {
  if (element && typeof element === 'object' && isDOM((element as ElementWrapper).nativeElement)) {
    return (element as ElementWrapper).nativeElement;
  }
  return isDOM(element) ? element : null;
}

function findDOMElement(element: unknown): HTMLElement | SVGElement | null {
  const domElement = getDOM(element);
  if (domElement) {
    return domElement;
  }
  
  // Check if element is a React Component instance
  if (element && typeof element === 'object' && 'isReactComponent' in element.constructor) {
    // Use ReactDOM.findDOMNode if available
    if (typeof ReactDOM !== 'undefined' && ReactDOM.findDOMNode) {
      return ReactDOM.findDOMNode(element as React.Component) as HTMLElement | SVGElement | null;
    }
  }
  
  return null;
}

export { getDOM, isDOM };
export default findDOMElement;