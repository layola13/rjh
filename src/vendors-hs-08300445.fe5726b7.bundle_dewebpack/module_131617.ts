export interface Offset {
  left: number;
  top: number;
}

let uuidCounter = -1;

/**
 * Gets the motion name by combining prefix and suffix, or returns the provided name
 * @param prefix - The motion prefix
 * @param name - Optional motion name
 * @param suffix - Optional motion suffix
 * @returns The computed motion name
 */
export function getMotionName(prefix: string, name?: string, suffix?: string): string {
  let result = name;
  if (!result && suffix) {
    result = `${prefix}-${suffix}`;
  }
  return result as string;
}

/**
 * Generates a unique UUID by incrementing a counter
 * @returns A unique identifier
 */
export function getUUID(): number {
  uuidCounter += 1;
  return uuidCounter;
}

/**
 * Gets the offset position of an element relative to the document
 * @param element - The DOM element
 * @returns The offset containing left and top positions
 */
export function offset(element: HTMLElement): Offset {
  const rect = element.getBoundingClientRect();
  const position: Offset = {
    left: rect.left,
    top: rect.top
  };

  const doc = element.ownerDocument;
  const win = doc.defaultView ?? doc.parentWindow;

  if (win) {
    position.left += getScroll(win, false);
    position.top += getScroll(win, true);
  }

  return position;
}

/**
 * Gets the scroll offset of a window
 * @param win - The window object
 * @param isVertical - Whether to get vertical (Y) or horizontal (X) scroll
 * @returns The scroll offset value
 */
function getScroll(win: Window, isVertical: boolean): number {
  const pageOffsetProp = `page${isVertical ? 'Y' : 'X'}Offset` as 'pageYOffset' | 'pageXOffset';
  const scrollProp = `scroll${isVertical ? 'Top' : 'Left'}` as 'scrollTop' | 'scrollLeft';

  let scrollValue = win[pageOffsetProp];

  if (typeof scrollValue !== 'number') {
    const doc = win.document;
    scrollValue = doc.documentElement[scrollProp];

    if (typeof scrollValue !== 'number') {
      scrollValue = doc.body[scrollProp];
    }
  }

  return scrollValue;
}