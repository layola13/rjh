interface CSSProperties {
  [key: string]: string | number;
}

function create(tagName: string, className: string): HTMLElement {
  const element = document.createElement(tagName);
  element.className = className;
  return element;
}

function appendTo(element: HTMLElement, parent: HTMLElement): HTMLElement {
  parent.appendChild(element);
  return element;
}

function css(element: HTMLElement, property: string, value?: string | number): string | HTMLElement;
function css(element: HTMLElement, properties: CSSProperties): HTMLElement;
function css(element: HTMLElement, propertyOrProperties: string | CSSProperties, value?: string | number): string | HTMLElement {
  if (typeof propertyOrProperties === 'object') {
    for (const key in propertyOrProperties) {
      let val = propertyOrProperties[key];
      if (typeof val === 'number') {
        val = `${val}px`;
      }
      element.style[key as any] = val;
    }
    return element;
  }

  if (value === undefined) {
    return window.getComputedStyle(element)[propertyOrProperties as any];
  }

  let finalValue = value;
  if (typeof finalValue === 'number') {
    finalValue = `${finalValue}px`;
  }
  element.style[propertyOrProperties as any] = finalValue;
  return element;
}

function matches(element: Element, selector: string): boolean {
  if (element.matches !== undefined) {
    return element.matches(selector);
  }
  return (element as any).msMatchesSelector(selector);
}

function remove(element: HTMLElement): void {
  if (element.remove !== undefined) {
    element.remove();
  } else if (element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

function queryChildren(parent: HTMLElement, selector: string): Element[] {
  return Array.prototype.filter.call(parent.childNodes, (node: Node) => {
    return matches(node as Element, selector);
  });
}

export { create, appendTo, css, matches, remove, queryChildren };