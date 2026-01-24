/**
 * ClickOutside Directive
 * Detects clicks outside of the bound element
 */
export declare const ClickOutside: DirectiveBinding;

/**
 * Intersect Directive
 * Uses IntersectionObserver API to detect when an element enters/leaves viewport
 */
export declare const Intersect: DirectiveBinding;

/**
 * Mutate Directive
 * Uses MutationObserver API to watch for DOM changes on an element
 */
export declare const Mutate: DirectiveBinding;

/**
 * Resize Directive
 * Detects element size changes using ResizeObserver
 */
export declare const Resize: DirectiveBinding;

/**
 * Ripple Directive
 * Creates material design ripple effect on click
 */
export declare const Ripple: DirectiveBinding;

/**
 * Scroll Directive
 * Handles scroll events with customizable behavior
 */
export declare const Scroll: DirectiveBinding;

/**
 * Touch Directive
 * Handles touch gestures (swipe, pan, pinch, etc.)
 */
export declare const Touch: DirectiveBinding;

/**
 * Base directive binding interface
 * Compatible with Vue 2/3 directive structure
 */
export interface DirectiveBinding {
  /**
   * Called when the directive is bound to the element
   */
  bind?: (el: HTMLElement, binding: DirectiveOptions, vnode: VNode) => void;
  
  /**
   * Called when the bound element has been inserted into its parent node
   */
  inserted?: (el: HTMLElement, binding: DirectiveOptions, vnode: VNode) => void;
  
  /**
   * Called after the containing component's VNode has updated
   */
  update?: (el: HTMLElement, binding: DirectiveOptions, vnode: VNode, oldVnode: VNode) => void;
  
  /**
   * Called after the containing component's VNode and its children have updated
   */
  componentUpdated?: (el: HTMLElement, binding: DirectiveOptions, vnode: VNode, oldVnode: VNode) => void;
  
  /**
   * Called when the directive is unbound from the element
   */
  unbind?: (el: HTMLElement, binding: DirectiveOptions, vnode: VNode) => void;
}

/**
 * Directive binding options passed to directive hooks
 */
export interface DirectiveOptions {
  /**
   * The value passed to the directive
   */
  value?: unknown;
  
  /**
   * The previous value, only available in update and componentUpdated
   */
  oldValue?: unknown;
  
  /**
   * The argument passed to the directive (e.g., v-directive:arg)
   */
  arg?: string;
  
  /**
   * Object containing modifiers (e.g., v-directive.foo.bar)
   */
  modifiers?: Record<string, boolean>;
  
  /**
   * The name of the directive without the v- prefix
   */
  name?: string;
  
  /**
   * The expression string
   */
  expression?: string;
}

/**
 * Virtual Node interface (simplified)
 */
export interface VNode {
  tag?: string;
  data?: Record<string, unknown>;
  children?: VNode[];
  text?: string;
  elm?: Node;
  context?: unknown;
  key?: string | number;
  componentOptions?: Record<string, unknown>;
  componentInstance?: unknown;
  parent?: VNode;
}