/**
 * Expand transition factory for Vue.js transitions
 * Creates a reusable transition object for expanding/collapsing elements with animation
 * @module ExpandTransition
 */

/**
 * Style properties stored during transition
 */
interface InitialStyle {
  /** Original CSS transition value */
  transition: string;
  /** Original CSS overflow value */
  overflow: string;
  /** Original width or height value */
  [key: string]: string;
}

/**
 * Extended HTMLElement with transition-specific properties
 */
interface TransitionElement extends HTMLElement {
  /** Parent node reference stored during transition */
  _parent?: HTMLElement | null;
  /** Initial style properties before transition */
  _initialStyle?: InitialStyle;
}

/**
 * Vue.js transition hook functions
 */
interface TransitionHooks {
  /** Called before element enters */
  beforeEnter: (element: TransitionElement) => void;
  /** Called when element enters */
  enter: (element: TransitionElement) => void;
  /** Called after element has entered */
  afterEnter: (element: TransitionElement) => void;
  /** Called when enter is cancelled */
  enterCancelled: (element: TransitionElement) => void;
  /** Called when element leaves */
  leave: (element: TransitionElement) => void;
  /** Called after element has left */
  afterLeave: (element: TransitionElement) => void;
  /** Called when leave is cancelled */
  leaveCancelled: (element: TransitionElement) => void;
}

/**
 * Creates an expand/collapse transition for Vue.js
 * 
 * @param className - Optional CSS class to add to parent element during transition
 * @param horizontal - If true, expands horizontally (width), otherwise vertically (height)
 * @returns Vue.js transition hooks object
 * 
 * @example
 *