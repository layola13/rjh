/**
 * Transition creation utilities for Vue components
 * Provides factories for creating CSS and JavaScript-based transition components
 */

/**
 * Lifecycle hooks for transition events
 */
export interface TransitionHooks {
  /** Called before the element is inserted into the DOM */
  beforeEnter?: (element: HTMLElement) => void;
  /** Called when the enter transition starts */
  enter?: (element: HTMLElement, done: () => void) => void;
  /** Called when the enter transition ends */
  afterEnter?: (element: HTMLElement) => void;
  /** Called when the enter transition is cancelled */
  enterCancelled?: (element: HTMLElement) => void;
  /** Called before the leave transition starts */
  beforeLeave?: (element: HTMLElement) => void;
  /** Called when the leave transition starts */
  leave?: (element: HTMLElement, done: () => void) => void;
  /** Called when the leave transition ends */
  afterLeave?: (element: HTMLElement) => void;
  /** Called when the leave transition is cancelled */
  leaveCancelled?: (element: HTMLElement) => void;
}

/**
 * Props for simple CSS transition components
 */
export interface SimpleTransitionProps {
  /** Whether to use transition-group instead of transition */
  group: boolean;
  /** Hide element on leave (set display: none) */
  hideOnLeave: boolean;
  /** Set position: absolute on leave */
  leaveAbsolute: boolean;
  /** Transition mode ('in-out' | 'out-in' | undefined) */
  mode?: string;
  /** CSS transform-origin value for animations */
  origin: string;
}

/**
 * Props for JavaScript transition components
 */
export interface JavascriptTransitionProps {
  /** Transition mode ('in-out' | 'out-in' | undefined) */
  mode: string;
}

/**
 * Vue functional component context
 */
export interface FunctionalComponentContext<P = any> {
  /** Component props */
  props: P;
  /** Component data object */
  data: Record<string, any>;
  /** Child VNodes */
  children?: any[];
}

/**
 * Creates a simple CSS-based transition component
 * 
 * @param name - The transition name (will be used as CSS class prefix)
 * @param origin - CSS transform-origin value (default: "top center 0")
 * @param mode - Transition mode: 'in-out', 'out-in', or undefined
 * @returns Vue functional component definition
 * 
 * @example
 *