/**
 * Click outside directive for Vue.js
 * Detects clicks outside of a bound element and triggers a callback
 */

/**
 * Element with click outside handler attached
 */
interface ClickOutsideElement extends HTMLElement {
  _clickOutside?: (event: MouseEvent) => void;
}

/**
 * Click outside directive binding configuration
 */
interface ClickOutsideBinding {
  /** Handler function to call when clicking outside */
  handler: (event: MouseEvent) => void;
  /** Optional function to determine if the handler should be called */
  closeConditional?: (event: MouseEvent) => boolean;
  /** Optional function returning array of elements to include as "inside" */
  include?: () => HTMLElement[];
}

/**
 * Click outside directive value - can be a function or configuration object
 */
type ClickOutsideValue = ((event: MouseEvent) => void) | ClickOutsideBinding;

/**
 * Vue directive binding object
 */
interface DirectiveBinding {
  value: ClickOutsideValue;
}

/**
 * Vue.js directive that triggers a callback when clicking outside the bound element
 * 
 * @example
 *