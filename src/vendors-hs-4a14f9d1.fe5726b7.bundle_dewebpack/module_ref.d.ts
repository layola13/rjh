/**
 * Module: module_ref
 * Original ID: ref
 * 
 * Sets the popover node reference in the global state object.
 */

/**
 * Sets the popover node reference.
 * 
 * @param node - The popover node element to be stored
 * @returns The same node that was passed in
 */
declare function setPopoverNode<T = HTMLElement>(node: T): T;

/**
 * Global state object containing UI references
 */
declare namespace A {
  /**
   * Reference to the current popover node element
   */
  let popoverNode: HTMLElement | null;
}

export { setPopoverNode };