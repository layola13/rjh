import * as ReactDOM from 'react-dom';

interface Offset {
  top: number;
  left: number;
}

interface Position {
  left: number;
  top: number;
}

interface ElementWithScroll extends Element {
  scrollTop: number;
  scrollX: number;
}

interface WindowWithScroll extends Window {
  pageYOffset: number;
  pageXOffset: number;
}

function ownerDocument(element: Element | null): Document {
  const node = ReactDOM.findDOMNode(element);
  return (node && node.ownerDocument) || document;
}

function ownerWindow(element: Element | null): Window {
  const doc = ownerDocument(element);
  return (doc.defaultView || (doc as any).parentWindow) || window;
}

function scrollTop(element: Element | Window | null): number;
function scrollTop(element: Element | Window | null, value: number): void;
function scrollTop(element: Element | Window | null, value?: number): number | void {
  if (!element) {
    return;
  }

  const hasScrollTopProperty = 'scrollTop' in element;

  if (value === undefined) {
    return hasScrollTopProperty 
      ? (element as ElementWithScroll).scrollTop 
      : (element as WindowWithScroll).pageYOffset;
  }

  if (hasScrollTopProperty) {
    (element as ElementWithScroll).scrollTop = value;
  } else {
    (element as Window).scrollTo((element as Window).scrollX, value);
  }
}

function offset(element: Element | null): Offset | null {
  if (!element) {
    return null;
  }

  const rect = element.getBoundingClientRect();
  const body = document.body;
  const clientTop = (element as HTMLElement).clientTop || body.clientTop || 0;
  const clientLeft = (element as HTMLElement).clientLeft || body.clientLeft || 0;
  const scrollTopValue = window.pageYOffset || (element as HTMLElement).scrollTop;
  const scrollLeftValue = window.pageXOffset || (element as HTMLElement).scrollLeft;

  return {
    top: rect.top + scrollTopValue - clientTop,
    left: rect.left + scrollLeftValue - clientLeft
  };
}

function position(element: HTMLElement): Position {
  return {
    left: element.offsetLeft,
    top: element.offsetTop
  };
}

export {
  ownerDocument,
  ownerWindow,
  scrollTop,
  offset,
  position
};