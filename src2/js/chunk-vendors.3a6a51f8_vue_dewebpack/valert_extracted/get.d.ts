/**
 * Target type that can be used for offset calculation
 * Can be a numeric offset, CSS selector, HTML element, or Vue component
 */
export type OffsetTarget = number | string | HTMLElement | VueComponent;

/**
 * Container type that can be used for scrolling
 * Can be a CSS selector, HTML element, or Vue component
 */
export type ContainerTarget = string | HTMLElement | VueComponent;

/**
 * Vue component interface with minimal required properties
 */
interface VueComponent {
  /** Internal Vue flag */
  _isVue: boolean;
  /** The root DOM element of the component */
  $el: HTMLElement;
}

/**
 * Calculate the total offset (distance from top) of a target element
 * 
 * @param target - The target to calculate offset for. Can be:
 *   - number: Returns the value directly
 *   - string: CSS selector to query
 *   - HTMLElement: DOM element to measure
 *   - VueComponent: Vue component instance
 * @returns The total offset in pixels from the top of the document
 * @throws {Error} If string selector doesn't match any element
 * @throws {TypeError} If target type is invalid
 */
export function getOffset(target: OffsetTarget): number;

/**
 * Get the container element for scrolling operations
 * 
 * @param target - The container target. Can be:
 *   - string: CSS selector to query
 *   - HTMLElement: DOM element
 *   - VueComponent: Vue component instance
 * @returns The resolved HTML element
 * @throws {Error} If string selector doesn't match any element
 * @throws {TypeError} If container type is invalid
 */
export function getContainer(target: ContainerTarget): HTMLElement;