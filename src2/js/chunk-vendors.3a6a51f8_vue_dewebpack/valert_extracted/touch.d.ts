/**
 * Touch directive for Vue.js
 * Handles touch gestures including swipe left, right, up, and down
 */

import type { DirectiveOptions } from 'vue';
import type { VNode, VNodeDirective } from 'vue/types/vnode';

/**
 * Touch event coordinates and state
 */
interface TouchState {
  /** Initial touch X coordinate */
  touchstartX: number;
  /** Initial touch Y coordinate */
  touchstartY: number;
  /** Final touch X coordinate */
  touchendX: number;
  /** Final touch Y coordinate */
  touchendY: number;
  /** Current touch move X coordinate */
  touchmoveX: number;
  /** Current touch move Y coordinate */
  touchmoveY: number;
  /** Horizontal offset (touchendX - touchstartX) */
  offsetX: number;
  /** Vertical offset (touchendY - touchstartY) */
  offsetY: number;
  /** Callback fired on swipe left gesture */
  left?: (event: TouchEventWithState) => void;
  /** Callback fired on swipe right gesture */
  right?: (event: TouchEventWithState) => void;
  /** Callback fired on swipe up gesture */
  up?: (event: TouchEventWithState) => void;
  /** Callback fired on swipe down gesture */
  down?: (event: TouchEventWithState) => void;
  /** Callback fired on touch start */
  start?: (event: TouchEventWithState) => void;
  /** Callback fired on touch move */
  move?: (event: TouchEventWithState) => void;
  /** Callback fired on touch end */
  end?: (event: TouchEventWithState) => void;
}

/**
 * Touch event extended with state information
 */
type TouchEventWithState = TouchEvent & Partial<TouchState>;

/**
 * Touch directive binding value configuration
 */
interface TouchHandlers {
  /** Swipe left handler */
  left?: (event: TouchEventWithState) => void;
  /** Swipe right handler */
  right?: (event: TouchEventWithState) => void;
  /** Swipe up handler */
  up?: (event: TouchEventWithState) => void;
  /** Swipe down handler */
  down?: (event: TouchEventWithState) => void;
  /** Touch start handler */
  start?: (event: TouchEventWithState) => void;
  /** Touch move handler */
  move?: (event: TouchEventWithState) => void;
  /** Touch end handler */
  end?: (event: TouchEventWithState) => void;
  /** Whether to attach listeners to parent element */
  parent?: boolean;
  /** AddEventListener options */
  options?: AddEventListenerOptions;
}

/**
 * Internal handlers map stored on element
 */
interface TouchHandlersMap {
  touchstart: (event: TouchEvent) => void;
  touchend: (event: TouchEvent) => void;
  touchmove: (event: TouchEvent) => void;
}

/**
 * Extended HTMLElement with touch handlers storage
 */
interface HTMLElementWithTouchHandlers extends HTMLElement {
  _touchHandlers?: Record<number, TouchHandlersMap>;
}

/**
 * Touch directive for Vue.js
 * Provides touch gesture detection (swipe left/right/up/down)
 * 
 * @example
 *