export function getOffsetLeft(element: HTMLElement): number {
  const position = getElementPosition(element);
  const ownerDocument = element.ownerDocument;
  const defaultView = ownerDocument.defaultView ?? ownerDocument.parentWindow;
  const scrollLeft = getScrollLeft(defaultView);
  
  return position.left + scrollLeft;
}

interface Position {
  left: number;
  top: number;
}

function getElementPosition(element: HTMLElement): Position {
  const ownerDocument = element.ownerDocument;
  const body = ownerDocument.body;
  const documentElement = ownerDocument?.documentElement;
  const boundingRect = element.getBoundingClientRect();
  
  let left = boundingRect.left;
  let top = boundingRect.top;
  
  const clientLeft = documentElement?.clientLeft ?? body.clientLeft ?? 0;
  const clientTop = documentElement?.clientTop ?? body.clientTop ?? 0;
  
  left -= clientLeft;
  top -= clientTop;
  
  return { left, top };
}

function getScrollLeft(view: Window | null): number {
  if (!view) {
    return 0;
  }
  
  let scrollLeft = view.pageXOffset;
  
  if (typeof scrollLeft !== "number") {
    const document = view.document;
    scrollLeft = document.documentElement.scrollLeft;
    
    if (typeof scrollLeft !== "number") {
      scrollLeft = document.body.scrollLeft;
    }
  }
  
  return scrollLeft;
}