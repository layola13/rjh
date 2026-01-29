import { findInArray, int, isFunction } from './utils';
import * as browserPrefix from './browserPrefix';

const matchesSelectorFunc = '';

export interface Position {
  x: number;
  y: number;
}

export interface PositionOffset {
  x: number | string;
  y: number | string;
}

export interface EventListenerOptions {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
}

export function matchesSelector(element: Element, selector: string): boolean {
  if (!matchesSelectorFunc) {
    const func = findInArray(
      ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'],
      (method) => isFunction((element as any)[method])
    );
    if (func) {
      (matchesSelectorFunc as any) = func;
    }
  }
  
  return isFunction((element as any)[matchesSelectorFunc]) && (element as any)[matchesSelectorFunc](selector);
}

export function getTranslation(position: Position, positionOffset?: PositionOffset | null, unitSuffix?: string): string {
  const { x, y } = position;
  const unit = unitSuffix ?? '';
  let transform = `translate(${x}${unit}, ${y}${unit})`;
  
  if (positionOffset) {
    const offsetX = typeof positionOffset.x === 'string' ? positionOffset.x : `${positionOffset.x}${unit}`;
    const offsetY = typeof positionOffset.y === 'string' ? positionOffset.y : `${positionOffset.y}${unit}`;
    transform = `translate(${offsetX}, ${offsetY})` + transform;
  }
  
  return transform;
}

export function removeUserSelectStyles(doc: Document): void {
  if (!doc) return;
  
  try {
    if (doc.body) {
      removeClassName(doc.body, 'react-draggable-transparent-selection');
    }
    
    if ((doc as any).selection) {
      (doc as any).selection.empty();
    } else {
      const selection = (doc.defaultView ?? window).getSelection();
      if (selection && selection.type !== 'Caret') {
        selection.removeAllRanges();
      }
    }
  } catch (error) {
    // Silently handle errors
  }
}

export function addClassName(element: HTMLElement, className: string): void {
  if (element.classList) {
    element.classList.add(className);
  } else if (!element.className.match(new RegExp(`(?:^|\\s)${className}(?!\\S)`))) {
    element.className += ` ${className}`;
  }
}

export function removeClassName(element: HTMLElement, className: string): void {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    element.className = element.className.replace(new RegExp(`(?:^|\\s)${className}(?!\\S)`, 'g'), '');
  }
}

export function addEvent(
  element: Element | null | undefined,
  eventName: string,
  handler: EventListener,
  options?: EventListenerOptions
): void {
  if (!element) return;
  
  const eventOptions: EventListenerOptions = {
    capture: true,
    ...options
  };
  
  if ((element as any).addEventListener) {
    element.addEventListener(eventName, handler, eventOptions);
  } else if ((element as any).attachEvent) {
    (element as any).attachEvent(`on${eventName}`, handler);
  } else {
    (element as any)[`on${eventName}`] = handler;
  }
}

export function removeEvent(
  element: Element | null | undefined,
  eventName: string,
  handler: EventListener,
  options?: EventListenerOptions
): void {
  if (!element) return;
  
  const eventOptions: EventListenerOptions = {
    capture: true,
    ...options
  };
  
  if ((element as any).removeEventListener) {
    element.removeEventListener(eventName, handler, eventOptions);
  } else if ((element as any).detachEvent) {
    (element as any).detachEvent(`on${eventName}`, handler);
  } else {
    (element as any)[`on${eventName}`] = null;
  }
}

export function addUserSelectStyles(doc: Document): void {
  if (!doc) return;
  
  let styleElement = doc.getElementById('react-draggable-style-el') as HTMLStyleElement | null;
  
  if (!styleElement) {
    styleElement = doc.createElement('style');
    styleElement.type = 'text/css';
    styleElement.id = 'react-draggable-style-el';
    styleElement.innerHTML = '.react-draggable-transparent-selection *::-moz-selection {all: inherit;}\n';
    styleElement.innerHTML += '.react-draggable-transparent-selection *::selection {all: inherit;}\n';
    doc.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  
  if (doc.body) {
    addClassName(doc.body, 'react-draggable-transparent-selection');
  }
}

export function scheduleRemoveUserSelectStyles(doc: Document): void {
  if (window.requestAnimationFrame) {
    window.requestAnimationFrame(() => {
      removeUserSelectStyles(doc);
    });
  } else {
    removeUserSelectStyles(doc);
  }
}

export function createCSSTransform(position: Position, positionOffset?: PositionOffset | null): Record<string, string> {
  const translation = getTranslation(position, positionOffset, 'px');
  return {
    [browserPrefix.browserPrefixToKey('transform', browserPrefix.default)]: translation
  };
}

export function createSVGTransform(position: Position, positionOffset?: PositionOffset | null): string {
  return getTranslation(position, positionOffset, '');
}

export function getTouch(event: TouchEvent, identifier: number): Touch | undefined {
  return (event.targetTouches && findInArray(event.targetTouches, (touch) => identifier === touch.identifier)) ||
         (event.changedTouches && findInArray(event.changedTouches, (touch) => identifier === touch.identifier));
}

export function getTouchIdentifier(event: TouchEvent): number | undefined {
  if (event.targetTouches?.[0]) return event.targetTouches[0].identifier;
  if (event.changedTouches?.[0]) return event.changedTouches[0].identifier;
}

export function offsetXYFromParent(event: MouseEvent | TouchEvent, offsetParent: HTMLElement, scale: number): Position {
  const rect = offsetParent === offsetParent.ownerDocument.body
    ? { left: 0, top: 0 }
    : offsetParent.getBoundingClientRect();
  
  const clientX = (event as MouseEvent).clientX ?? ((event as TouchEvent).touches?.[0]?.clientX ?? 0);
  const clientY = (event as MouseEvent).clientY ?? ((event as TouchEvent).touches?.[0]?.clientY ?? 0);
  
  const x = (clientX + offsetParent.scrollLeft - rect.left) / scale;
  const y = (clientY + offsetParent.scrollTop - rect.top) / scale;
  
  return { x, y };
}

export function innerWidth(element: HTMLElement): number {
  let width = element.clientWidth;
  const styles = element.ownerDocument.defaultView!.getComputedStyle(element);
  width -= int(styles.paddingLeft);
  width -= int(styles.paddingRight);
  return width;
}

export function innerHeight(element: HTMLElement): number {
  let height = element.clientHeight;
  const styles = element.ownerDocument.defaultView!.getComputedStyle(element);
  height -= int(styles.paddingTop);
  height -= int(styles.paddingBottom);
  return height;
}

export function outerWidth(element: HTMLElement): number {
  let width = element.clientWidth;
  const styles = element.ownerDocument.defaultView!.getComputedStyle(element);
  width += int(styles.borderLeftWidth);
  width += int(styles.borderRightWidth);
  return width;
}

export function outerHeight(element: HTMLElement): number {
  let height = element.clientHeight;
  const styles = element.ownerDocument.defaultView!.getComputedStyle(element);
  height += int(styles.borderTopWidth);
  height += int(styles.borderBottomWidth);
  return height;
}

export function matchesSelectorAndParentsTo(element: Element, selector: string, baseNode: Element): boolean {
  let currentElement: Element | null = element;
  
  do {
    if (matchesSelector(currentElement, selector)) return true;
    if (currentElement === baseNode) return false;
    currentElement = currentElement.parentNode as Element | null;
  } while (currentElement);
  
  return false;
}