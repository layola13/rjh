/**
 * Ripple Directive Type Definitions
 * Provides Material Design ripple effect for interactive elements
 */

/**
 * Ripple configuration options
 */
export interface RippleOptions {
  /**
   * Center the ripple animation regardless of click position
   */
  center?: boolean;

  /**
   * Additional CSS class to apply to the ripple container
   */
  class?: string;

  /**
   * Use circular ripple effect (typically for icon buttons)
   */
  circle?: boolean;
}

/**
 * Internal ripple state stored on DOM elements
 */
export interface RippleState {
  /**
   * Whether the ripple effect is enabled
   */
  enabled: boolean;

  /**
   * Whether the ripple should be centered
   */
  centered?: boolean;

  /**
   * Custom CSS class for the ripple
   */
  class?: string;

  /**
   * Whether to use circular ripple
   */
  circle?: boolean;

  /**
   * Whether the element has been touched (prevents duplicate events)
   */
  touched?: boolean;

  /**
   * Whether the current interaction is a touch event
   */
  isTouch?: boolean;

  /**
   * Timer ID for delayed ripple show (used for touch events)
   */
  showTimer?: number;

  /**
   * Callback to commit the ripple show after delay
   */
  showTimerCommit?: (() => void) | null;
}

/**
 * Augment HTMLElement to include ripple state
 */
declare global {
  interface HTMLElement {
    /**
     * Internal ripple state attached to elements with the v-ripple directive
     */
    _ripple?: RippleState;
  }
}

/**
 * Vue directive binding for ripple
 */
export interface RippleDirectiveBinding {
  /**
   * The directive value - can be boolean or RippleOptions
   */
  value?: boolean | RippleOptions;

  /**
   * Previous value for comparison during updates
   */
  oldValue?: boolean | RippleOptions;
}

/**
 * Vue 2 VNode interface (simplified)
 */
export interface VNode {
  /**
   * Vue component instance
   */
  componentInstance?: any;

  /**
   * Component context
   */
  context?: any;

  /**
   * Functional component options
   */
  fnOptions?: any;
}

/**
 * Vue directive definition for ripple effect
 */
export interface RippleDirective {
  /**
   * Called when the directive is first bound to the element
   * @param el - The element the directive is bound to
   * @param binding - Directive binding object
   * @param vnode - Vue virtual node
   */
  bind(el: HTMLElement, binding: RippleDirectiveBinding, vnode: VNode): void;

  /**
   * Called when the directive is unbound from the element
   * @param el - The element the directive was bound to
   */
  unbind(el: HTMLElement): void;

  /**
   * Called when the bound value changes
   * @param el - The element the directive is bound to
   * @param binding - Directive binding object
   */
  update(el: HTMLElement, binding: RippleDirectiveBinding): void;
}

/**
 * The ripple directive instance
 * 
 * @example
 *