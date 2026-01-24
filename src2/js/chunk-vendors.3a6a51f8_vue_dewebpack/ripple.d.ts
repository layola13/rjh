/**
 * Ripple directive for Vuetify
 * Creates a material design ripple effect on elements
 */

/**
 * Ripple animation configuration options
 */
export interface RippleOptions {
  /** Center the ripple animation */
  center?: boolean;
  /** Additional CSS class for the ripple container */
  class?: string;
  /** Use circular ripple effect */
  circle?: boolean;
}

/**
 * Internal ripple state attached to DOM elements
 */
interface RippleState {
  /** Whether ripple effect is enabled */
  enabled: boolean;
  /** Whether ripple should be centered */
  centered?: boolean;
  /** Custom CSS class for ripple */
  class?: string;
  /** Whether to use circular ripple */
  circle?: boolean;
  /** Touch event flag */
  touched?: boolean;
  /** Is touch device */
  isTouch?: boolean;
  /** Timer for delayed ripple show */
  showTimer?: number;
  /** Commit function for delayed show */
  showTimerCommit?: (() => void) | null;
}

/**
 * Extended HTMLElement with ripple state
 */
interface RippleElement extends HTMLElement {
  _ripple?: RippleState;
  dataset: DOMStringMap & {
    previousPosition?: string;
    activated?: string;
    isHiding?: string;
  };
}

/**
 * Ripple geometry calculation result
 */
interface RippleGeometry {
  /** Ripple radius in pixels */
  radius: number;
  /** Initial scale factor */
  scale: number;
  /** X position with unit */
  x: string;
  /** Y position with unit */
  y: string;
  /** Center X position with unit */
  centerX: string;
  /** Center Y position with unit */
  centerY: string;
}

/**
 * Vue directive binding
 */
interface DirectiveBinding<T = any> {
  value: T;
  oldValue?: T;
}

/**
 * Vue VNode with component context
 */
interface VNode {
  context?: Vue;
  componentInstance?: Vue;
  fnOptions?: any;
}

/**
 * Vue instance interface (minimal)
 */
interface Vue {
  $nextTick(callback: () => void): void;
}

/**
 * Show a ripple animation on the target element
 * @param event - The triggering event
 * @param element - Target element for ripple effect
 * @param options - Ripple configuration options
 */
declare function showRipple(
  event: Event,
  element: RippleElement,
  options?: RippleOptions
): void;

/**
 * Hide the ripple animation on the target element
 * @param element - Element containing the ripple
 */
declare function hideRipple(element: RippleElement | null): void;

/**
 * Calculate ripple geometry based on event and element
 * @param event - The triggering event
 * @param element - Target element
 * @param options - Ripple options
 * @returns Calculated ripple geometry
 */
declare function calculateRippleGeometry(
  event: Event,
  element: HTMLElement,
  options?: RippleOptions
): RippleGeometry;

/**
 * Check if ripple should be enabled based on binding value
 * @param value - Directive binding value
 * @returns Whether ripple is enabled
 */
declare function isRippleEnabled(value: boolean | RippleOptions | undefined): boolean;

/**
 * Set CSS transform property with vendor prefix
 * @param element - Target element
 * @param transform - Transform value
 */
declare function setTransform(element: HTMLElement, transform: string): void;

/**
 * Set element opacity
 * @param element - Target element
 * @param opacity - Opacity value (0-1)
 */
declare function setOpacity(element: HTMLElement, opacity: number): void;

/**
 * Check if event is a touch event
 * @param event - Event to check
 * @returns True if TouchEvent
 */
declare function isTouchEvent(event: Event): event is TouchEvent;

/**
 * Check if event is a keyboard event
 * @param event - Event to check
 * @returns True if KeyboardEvent
 */
declare function isKeyboardEvent(event: Event): event is KeyboardEvent;

/**
 * Handle ripple show on pointer/touch down
 * @param event - The triggering event
 */
declare function handleRippleShow(event: Event): void;

/**
 * Handle ripple hide on pointer/touch up
 * @param event - The triggering event
 */
declare function handleRippleHide(event: Event): void;

/**
 * Handle ripple cancel on move/cancel
 * @param event - The triggering event
 */
declare function handleRippleCancel(event: Event): void;

/**
 * Handle keyboard down for ripple
 * @param event - Keyboard event
 */
declare function handleKeyDown(event: KeyboardEvent): void;

/**
 * Handle keyboard up for ripple
 * @param event - Keyboard event
 */
declare function handleKeyUp(event: KeyboardEvent): void;

/**
 * Update ripple directive binding
 * @param element - Target element
 * @param binding - Directive binding
 * @param isUpdate - Whether this is an update operation
 */
declare function updateRipple(
  element: RippleElement,
  binding: DirectiveBinding<boolean | RippleOptions>,
  isUpdate: boolean
): void;

/**
 * Remove all ripple event listeners from element
 * @param element - Target element
 */
declare function removeRippleListeners(element: HTMLElement): void;

/**
 * Vue directive for ripple effect
 */
export declare const Ripple: {
  /**
   * Called when directive is bound to element
   * @param el - Target element
   * @param binding - Directive binding
   * @param vnode - Virtual node
   */
  bind(
    el: HTMLElement,
    binding: DirectiveBinding<boolean | RippleOptions>,
    vnode: VNode
  ): void;

  /**
   * Called when directive is unbound from element
   * @param el - Target element
   */
  unbind(el: RippleElement): void;

  /**
   * Called when binding value updates
   * @param el - Target element
   * @param binding - Directive binding
   */
  update(
    el: RippleElement,
    binding: DirectiveBinding<boolean | RippleOptions>
  ): void;
};

export default Ripple;