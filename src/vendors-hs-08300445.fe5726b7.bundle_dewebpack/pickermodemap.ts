/**
 * Picker utility types and helper functions for date/time picker components
 * @module PickerModeMap
 */

/**
 * Map of picker modes to their parent mode resolver functions
 */
export const PickerModeMap: Record<
  'year' | 'month' | 'quarter' | 'week' | 'time' | 'date',
  ((mode: string) => string) | null
> = {
  /**
   * Year picker mode resolver
   * @param mode - Current picker mode
   * @returns Resolved mode ('year' if mode is 'month' or 'date', otherwise original mode)
   */
  year: (mode: string): string => {
    return mode === 'month' || mode === 'date' ? 'year' : mode;
  },

  /**
   * Month picker mode resolver
   * @param mode - Current picker mode
   * @returns Resolved mode ('month' if mode is 'date', otherwise original mode)
   */
  month: (mode: string): string => {
    return mode === 'date' ? 'month' : mode;
  },

  /**
   * Quarter picker mode resolver
   * @param mode - Current picker mode
   * @returns Resolved mode ('quarter' if mode is 'month' or 'date', otherwise original mode)
   */
  quarter: (mode: string): string => {
    return mode === 'month' || mode === 'date' ? 'quarter' : mode;
  },

  /**
   * Week picker mode resolver
   * @param mode - Current picker mode
   * @returns Resolved mode ('week' if mode is 'date', otherwise original mode)
   */
  week: (mode: string): string => {
    return mode === 'date' ? 'week' : mode;
  },

  /** Time picker has no parent mode */
  time: null,

  /** Date picker has no parent mode */
  date: null,
};

/**
 * Keyboard event handler configuration
 */
export interface KeyDownHandlerConfig {
  /** Handler for left/right arrow keys */
  onLeftRight?: (direction: -1 | 1) => void;
  /** Handler for Ctrl+left/right arrow keys */
  onCtrlLeftRight?: (direction: -1 | 1) => void;
  /** Handler for up/down arrow keys */
  onUpDown?: (direction: -1 | 1) => void;
  /** Handler for Page Up/Down keys */
  onPageUpDown?: (direction: -1 | 1) => void;
  /** Handler for Enter key */
  onEnter?: () => void;
}

/**
 * Key codes enumeration
 */
const enum KeyCode {
  LEFT = 37,
  UP = 38,
  RIGHT = 39,
  DOWN = 40,
  PAGE_UP = 33,
  PAGE_DOWN = 34,
  ENTER = 13,
}

/**
 * Creates a keyboard event handler for picker navigation
 * @param event - Keyboard event
 * @param config - Handler configuration
 * @returns true if event was handled, false otherwise
 */
export function createKeyDownHandler(
  event: KeyboardEvent,
  config: KeyDownHandlerConfig
): boolean {
  const { onLeftRight, onCtrlLeftRight, onUpDown, onPageUpDown, onEnter } = config;
  const keyCode = event.which;
  const isCtrlOrMeta = event.ctrlKey || event.metaKey;

  switch (keyCode) {
    case KeyCode.LEFT:
      if (isCtrlOrMeta) {
        if (onCtrlLeftRight) {
          onCtrlLeftRight(-1);
          return true;
        }
      } else if (onLeftRight) {
        onLeftRight(-1);
        return true;
      }
      break;

    case KeyCode.RIGHT:
      if (isCtrlOrMeta) {
        if (onCtrlLeftRight) {
          onCtrlLeftRight(1);
          return true;
        }
      } else if (onLeftRight) {
        onLeftRight(1);
        return true;
      }
      break;

    case KeyCode.UP:
      if (onUpDown) {
        onUpDown(-1);
        return true;
      }
      break;

    case KeyCode.DOWN:
      if (onUpDown) {
        onUpDown(1);
        return true;
      }
      break;

    case KeyCode.PAGE_UP:
      if (onPageUpDown) {
        onPageUpDown(-1);
        return true;
      }
      break;

    case KeyCode.PAGE_DOWN:
      if (onPageUpDown) {
        onPageUpDown(1);
        return true;
      }
      break;

    case KeyCode.ENTER:
      if (onEnter) {
        onEnter();
        return true;
      }
      break;
  }

  return false;
}

/**
 * Checks if any element in the array contains the target element
 * @param elements - Array of elements to check
 * @param target - Target element to find
 * @returns true if any element contains the target
 */
export function elementsContains(
  elements: (HTMLElement | null)[],
  target: Node
): boolean {
  return elements.some((element) => element?.contains(target));
}

/**
 * Picker mode type
 */
export type PickerMode = 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year';

/**
 * Date formatter interface
 */
export interface DateFormatter {
  getNow(): Date;
}

/**
 * Gets default date/time format string based on picker mode
 * @param customFormat - Custom format string (if provided, returns as-is)
 * @param pickerMode - Picker mode
 * @param showTime - Whether to show time component
 * @param use12Hours - Whether to use 12-hour format
 * @returns Format string
 */
export function getDefaultFormat(
  customFormat: string | undefined,
  pickerMode: PickerMode,
  showTime: boolean,
  use12Hours: boolean
): string {
  if (customFormat) {
    return customFormat;
  }

  switch (pickerMode) {
    case 'time':
      return use12Hours ? 'hh:mm:ss a' : 'HH:mm:ss';
    case 'week':
      return 'gggg-wo';
    case 'month':
      return 'YYYY-MM';
    case 'quarter':
      return 'YYYY-[Q]Q';
    case 'year':
      return 'YYYY';
    default:
      return showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
  }
}

/**
 * Calculates input size based on picker mode and format
 * @param pickerMode - Picker mode
 * @param format - Format string or formatter function
 * @param formatter - Date formatter instance
 * @returns Calculated input size
 */
export function getInputSize(
  pickerMode: PickerMode,
  format: string | ((date: Date) => string),
  formatter: DateFormatter
): number {
  const baseSize = pickerMode === 'time' ? 8 : 10;
  const formatLength =
    typeof format === 'function'
      ? format(formatter.getNow()).length
      : format.length;
  return Math.max(baseSize, formatLength) + 2;
}

/**
 * Gets the actual target element from an event, handling shadow DOM
 * @param event - Event object
 * @returns Target element
 */
export function getTargetFromEvent(event: Event): EventTarget | null {
  const target = event.target as HTMLElement | null;
  const composedPath = (event as Event & { composedPath?: () => EventTarget[] })
    .composedPath;

  // Handle shadow DOM
  if (event.composed && target?.shadowRoot && composedPath) {
    return composedPath.call(event)[0] ?? target;
  }

  return target;
}

/** Map to store active scroll animations */
const scrollAnimationMap = new Map<HTMLElement, number>();

/**
 * Smoothly scrolls an element to a target position
 * @param element - Element to scroll
 * @param targetScrollTop - Target scroll position
 * @param duration - Animation duration in milliseconds
 */
export function scrollTo(
  element: HTMLElement,
  targetScrollTop: number,
  duration: number
): void {
  const animationId = scrollAnimationMap.get(element);
  if (animationId !== undefined) {
    cancelAnimationFrame(animationId);
  }

  if (duration <= 0) {
    const frameId = requestAnimationFrame(() => {
      element.scrollTop = targetScrollTop;
    });
    scrollAnimationMap.set(element, frameId);
    return;
  }

  const scrollStep = ((targetScrollTop - element.scrollTop) / duration) * 10;
  const frameId = requestAnimationFrame(() => {
    element.scrollTop += scrollStep;
    if (element.scrollTop !== targetScrollTop) {
      scrollTo(element, targetScrollTop, duration - 10);
    }
  });
  scrollAnimationMap.set(element, frameId);
}

/**
 * Waits for an element to be ready, polling with requestAnimationFrame
 * @param checkElement - Function to check if element is ready
 * @param callback - Callback to execute when element is ready
 * @returns Cleanup function to cancel waiting
 */
export function waitElementReady(
  checkElement: () => boolean,
  callback: () => void
): () => void {
  let rafId: number | undefined;

  const check = (): void => {
    if (checkElement()) {
      callback();
    } else {
      rafId = requestAnimationFrame(check);
    }
  };

  check();

  return () => {
    if (rafId !== undefined) {
      cancelAnimationFrame(rafId);
    }
  };
}

/** Global mousedown event handler */
let globalMouseDownHandler: ((event: MouseEvent) => void) | null = null;

/** Set of registered mousedown listeners */
const mouseDownListeners = new Set<(event: MouseEvent) => void>();

/**
 * Adds a global mousedown event listener
 * @param listener - Listener function to add
 * @returns Cleanup function to remove the listener
 */
export function addGlobalMouseDownEvent(
  listener: (event: MouseEvent) => void
): () => void {
  if (!globalMouseDownHandler && typeof window !== 'undefined' && window.addEventListener) {
    globalMouseDownHandler = (event: MouseEvent) => {
      mouseDownListeners.forEach((fn) => fn(event));
    };
    window.addEventListener('mousedown', globalMouseDownHandler);
  }

  mouseDownListeners.add(listener);

  return () => {
    mouseDownListeners.delete(listener);
    if (mouseDownListeners.size === 0 && globalMouseDownHandler) {
      window.removeEventListener('mousedown', globalMouseDownHandler);
      globalMouseDownHandler = null;
    }
  };
}