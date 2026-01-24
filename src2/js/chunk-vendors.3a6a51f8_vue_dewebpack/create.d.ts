/**
 * Transition creation utilities for Vue.js components
 * Provides factories for creating simple CSS and JavaScript-based transitions
 */

/**
 * Transition lifecycle hooks for JavaScript transitions
 */
export interface TransitionHooks {
  /** Called before the element is inserted into the DOM */
  beforeEnter?: (el: HTMLElement) => void;
  /** Called when the enter transition starts */
  enter?: (el: HTMLElement, done: () => void) => void;
  /** Called when the enter transition ends */
  afterEnter?: (el: HTMLElement) => void;
  /** Called when the enter transition is cancelled */
  enterCancelled?: (el: HTMLElement) => void;
  /** Called before the leave transition starts */
  beforeLeave?: (el: HTMLElement) => void;
  /** Called when the leave transition starts */
  leave?: (el: HTMLElement, done: () => void) => void;
  /** Called when the leave transition ends */
  afterLeave?: (el: HTMLElement) => void;
  /** Called when the leave transition is cancelled */
  leaveCancelled?: (el: HTMLElement) => void;
}

/**
 * Props for simple CSS transition components
 */
export interface SimpleTransitionProps {
  /** Whether to render as a transition-group instead of transition */
  group: boolean;
  /** Hide element with display:none when leaving */
  hideOnLeave: boolean;
  /** Apply position:absolute when leaving */
  leaveAbsolute: boolean;
  /** Transition mode (in-out, out-in, or default) */
  mode?: string;
  /** CSS transform-origin value for the transition */
  origin: string;
}

/**
 * Props for JavaScript transition components
 */
export interface JavascriptTransitionProps {
  /** Transition mode (in-out, out-in, or default) */
  mode: string;
}

/**
 * Vue functional component context
 */
export interface FunctionalComponentContext<P = Record<string, unknown>> {
  /** Component props */
  props: P;
  /** Component data (attrs, class, style, on, etc.) */
  data: Record<string, unknown>;
  /** Child VNodes */
  children?: unknown[];
}

/**
 * Vue render function type
 */
export type CreateElement = (
  tag: string,
  data?: Record<string, unknown>,
  children?: unknown[]
) => unknown;

/**
 * Simple transition component definition
 */
export interface SimpleTransitionComponent {
  /** Component name */
  name: string;
  /** Mark as functional component */
  functional: true;
  /** Component props definition */
  props: {
    group: { type: BooleanConstructor; default: false };
    hideOnLeave: { type: BooleanConstructor; default: false };
    leaveAbsolute: { type: BooleanConstructor; default: false };
    mode: { type: StringConstructor; default?: string };
    origin: { type: StringConstructor; default: string };
  };
  /** Render function */
  render: (h: CreateElement, context: FunctionalComponentContext<SimpleTransitionProps>) => unknown;
}

/**
 * JavaScript transition component definition
 */
export interface JavascriptTransitionComponent {
  /** Component name */
  name: string;
  /** Mark as functional component */
  functional: true;
  /** Component props definition */
  props: {
    mode: { type: StringConstructor; default: string };
  };
  /** Render function */
  render: (h: CreateElement, context: FunctionalComponentContext<JavascriptTransitionProps>) => unknown;
}

/**
 * Creates a simple CSS-based transition component
 * 
 * @param name - The transition name (used for CSS classes like `${name}-enter-active`)
 * @param origin - CSS transform-origin value (default: "top center 0")
 * @param mode - Transition mode: "in-out", "out-in", or undefined for default behavior
 * @returns A Vue functional component definition for the transition
 * 
 * @example
 *