import * as dom from './dom-utils';

export function toInt(value: string | number): number {
  return parseInt(String(value), 10) || 0;
}

export function isEditable(element: Element): boolean {
  return (
    dom.matches(element, 'input, [contenteditable]') ||
    dom.matches(element, 'select, [contenteditable]') ||
    dom.matches(element, 'textarea, [contenteditable]') ||
    dom.matches(element, 'button, [contenteditable]')
  );
}

export function removePsClasses(element: Element): void {
  for (let i = 0; i < element.classList.length; i++) {
    const className = element.classList[i];
    if (className.indexOf('ps-') === 0) {
      element.classList.remove(className);
    }
  }
}

export function outerWidth(element: Element): number {
  return (
    toInt(dom.css(element, 'width')) +
    toInt(dom.css(element, 'paddingLeft')) +
    toInt(dom.css(element, 'paddingRight')) +
    toInt(dom.css(element, 'borderLeftWidth')) +
    toInt(dom.css(element, 'borderRightWidth'))
  );
}

function getScrollingClasses(axis?: string): string[] {
  return ['ps--in-scrolling'].concat(
    axis === undefined ? ['ps--x', 'ps--y'] : [`ps--${axis}`]
  );
}

export function startScrolling(element: Element, axis?: string): void {
  const classes = getScrollingClasses(axis);
  for (let i = 0; i < classes.length; i++) {
    element.classList.add(classes[i]);
  }
}

export function stopScrolling(element: Element, axis?: string): void {
  const classes = getScrollingClasses(axis);
  for (let i = 0; i < classes.length; i++) {
    element.classList.remove(classes[i]);
  }
}

export interface Environment {
  isWebKit: boolean;
  supportsTouch: boolean;
  supportsIePointer: boolean;
}

export const env: Environment = {
  isWebKit:
    typeof document !== 'undefined' &&
    'WebkitAppearance' in document.documentElement.style,
  supportsTouch:
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch)),
  supportsIePointer:
    typeof window !== 'undefined' && window.navigator.msMaxTouchPoints !== null,
};