/**
 * Mouse enter event handler module
 * Initializes hover interactions when mouse enters an element
 * @module module_onmouseenter
 */

/**
 * Creates and initializes hover behavior for elements
 * This function sets up mouse enter event handlers
 * @returns {void}
 */
export default function onMouseEnter(): void;

/**
 * Alternative named export
 */
export function initializeHoverBehavior(): void;

/**
 * Hover creation utility interface
 */
interface HoverCreator {
  /**
   * Creates hover interaction handlers
   * @returns {void} No return value
   */
  hoverCreate(): void;
}

/**
 * Global utility object providing hover functionality
 */
declare const g: {
  default: HoverCreator;
};