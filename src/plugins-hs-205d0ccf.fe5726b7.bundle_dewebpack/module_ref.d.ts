/**
 * Module: module_ref
 * Reference icon container management module
 */

/**
 * Sets the reference icon container element
 * @param container - The HTML element to be used as the icon container
 */
export function setRefIconContainer(container: HTMLElement): void;

/**
 * Interface representing an object with a reference icon container property
 */
export interface RefIconContainerHolder {
  /**
   * The HTML element used as the reference icon container
   */
  _refIconContainer?: HTMLElement;
}

/**
 * Type definition for the ref icon container setter function
 * @param container - The container element to set
 */
export type RefIconContainerSetter = (container: HTMLElement) => void;