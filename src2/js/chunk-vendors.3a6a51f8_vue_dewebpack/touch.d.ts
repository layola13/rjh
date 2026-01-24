/**
 * Touch directive for Vue.js
 * Provides touch gesture detection (swipe left/right/up/down)
 */

/**
 * Touch event coordinates and offsets
 */
interface TouchCoordinates {
  /** X coordinate where touch started */
  touchstartX: number;
  /** Y coordinate where touch started */
  touchstartY: number;
  /** X coordinate where touch ended */
  touchendX: number;
  /** Y coordinate where touch ended */
  touchendY: number;
  /** X coordinate during touch move */
  touchmoveX: number;
  /** Y coordinate during touch move */
  touchmoveY: number;
  /** Horizontal offset (touchendX - touchstartX) */
  offsetX: number;
  /** Vertical offset (touchendY - touchstartY) */
  offsetY: number;
}

/**
 * Touch gesture event handlers
 */
interface TouchHandlers {
  /** Handler for left swipe gesture */
  left?: (event: TouchEventData) => void;
  /** Handler for right swipe gesture */
  right?: (event: TouchEventData) => void;
  /** Handler for up swipe gesture */
  up?: (event: TouchEventData) => void;
  /** Handler for down swipe gesture */
  down?: (event: TouchEventData) => void;
  /** Handler for touch start event */
  start?: (event: TouchEventData) => void;
  /** Handler for touch move event */
  move?: (event: TouchEventData) => void;
  /** Handler for touch end event */
  end?: (event: TouchEventData) => void;
}

/**
 * Combined touch event data with coordinates and original event
 */
type TouchEventData = TouchEvent & TouchCoordinates & TouchHandlers;

/**
 * Configuration options for touch directive
 */
interface TouchDirectiveValue extends TouchHandlers {
  /** Whether to attach listeners to parent element instead of target */
  parent?: boolean;
  /** AddEventListener options (e.g., { passive: true }) */
  options?: AddEventListenerOptions;
}

/**
 * Internal touch event handler map
 */
interface InternalTouchHandlers {
  touchstart: (event: TouchEvent) => void;
  touchend: (event: TouchEvent) => void;
  touchmove: (event: TouchEvent) => void;
}

/**
 * Extended HTMLElement with touch handler tracking
 */
interface HTMLElementWithTouchHandlers extends HTMLElement {
  _touchHandlers?: Record<number, InternalTouchHandlers>;
}

/**
 * Vue directive binding
 */
interface DirectiveBinding<T = unknown> {
  value: T;
  oldValue?: T;
  arg?: string;
  modifiers: Record<string, boolean>;
}

/**
 * Vue VNode
 */
interface VNode {
  context: {
    _uid: number;
  };
}

/**
 * Vue directive definition
 */
interface DirectiveOptions {
  inserted(
    el: HTMLElement,
    binding: DirectiveBinding<TouchDirectiveValue>,
    vnode: VNode
  ): void;
  
  unbind(
    el: HTMLElement,
    binding: DirectiveBinding<TouchDirectiveValue>,
    vnode: VNode
  ): void;
}

/**
 * Main Touch directive export
 */
export const Touch: DirectiveOptions;

export default Touch;