export function addEventListener(
  element: HTMLElement | Document | Window,
  eventType: string,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions
): void {
  if (element.addEventListener) {
    element.addEventListener(eventType, handler, options);
  } else if ('attachEvent' in element) {
    (element as any).attachEvent(`on${eventType}`, handler);
  }
}

export function removeEventListener(
  element: HTMLElement | Document | Window,
  eventType: string,
  handler: EventListener,
  options?: boolean | EventListenerOptions
): void {
  if (element.removeEventListener) {
    element.removeEventListener(eventType, handler, options);
  } else if ('detachEvent' in element) {
    (element as any).detachEvent(`on${eventType}`, handler);
  }
}

export function dataToArray<T>(data: T | T[]): T[] {
  if (Array.isArray(data)) {
    return data;
  }
  return [data];
}

export function transformArguments<T>(
  argument: T | ((value: T) => T | T[]),
  value: T
): T[] {
  const result = typeof argument === 'function' ? argument(value) : argument;
  
  if (Array.isArray(result)) {
    return result.length === 2 ? result : [result[0], result[1]];
  }
  
  return [result];
}

const transitionEndEvents: Record<string, string> = {
  transition: 'transitionend',
  WebkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  OTransition: 'oTransitionEnd otransitionend'
};

export const transitionStr: string = Object.keys(transitionEndEvents).filter((eventName) => {
  if (typeof document === 'undefined') {
    return false;
  }
  
  const htmlElement = document.getElementsByTagName('html')[0];
  const style = htmlElement ? htmlElement.style : {};
  
  return eventName in style;
})[0];

export const transitionEnd: string = transitionEndEvents[transitionStr];

export function isNumeric(value: unknown): boolean {
  return !isNaN(parseFloat(value as string)) && isFinite(value as number);
}

export const windowIsUndefined: boolean = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export function getTouchParentScroll(
  element: HTMLElement,
  currentNode: HTMLElement | Document | null,
  deltaX: number,
  deltaY: number
): boolean {
  if (!currentNode || currentNode === document || currentNode instanceof Document) {
    return false;
  }
  
  if (currentNode === element.parentNode) {
    return true;
  }
  
  const maxDelta = Math.max(Math.abs(deltaX), Math.abs(deltaY));
  const isVerticalScroll = maxDelta === Math.abs(deltaY);
  const isHorizontalScroll = maxDelta === Math.abs(deltaX);
  
  const scrollableHeight = currentNode.scrollHeight - currentNode.clientHeight;
  const scrollableWidth = currentNode.scrollWidth - currentNode.clientWidth;
  
  const computedStyle = document.defaultView!.getComputedStyle(currentNode);
  const hasVerticalOverflow = computedStyle.overflowY === 'auto' || computedStyle.overflowY === 'scroll';
  const hasHorizontalOverflow = computedStyle.overflowX === 'auto' || computedStyle.overflowX === 'scroll';
  
  const canScrollVertically = scrollableHeight && hasVerticalOverflow;
  const canScrollHorizontally = scrollableWidth && hasHorizontalOverflow;
  
  const isVerticalScrollBlocked =
    isVerticalScroll &&
    (!canScrollVertically ||
      (canScrollVertically &&
        ((currentNode.scrollTop >= scrollableHeight && deltaY < 0) ||
          (currentNode.scrollTop <= 0 && deltaY > 0))));
  
  const isHorizontalScrollBlocked =
    isHorizontalScroll &&
    (!canScrollHorizontally ||
      (canScrollHorizontally &&
        ((currentNode.scrollLeft >= scrollableWidth && deltaX < 0) ||
          (currentNode.scrollLeft <= 0 && deltaX > 0))));
  
  if (isVerticalScrollBlocked || isHorizontalScrollBlocked) {
    return getTouchParentScroll(element, currentNode.parentNode as HTMLElement, deltaX, deltaY);
  }
  
  return false;
}