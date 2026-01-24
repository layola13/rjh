/**
 * Sets the popover node reference in object A
 * @param t - The DOM element or node to be set as the popover node
 * @returns The popover node that was set
 */
declare function setPopoverNode<T extends Node = HTMLElement>(t: T): T;

/**
 * Global or module-level object containing popover-related properties
 */
declare const A: {
  /**
   * Reference to the current popover DOM node
   */
  popoverNode: Node | HTMLElement | null;
};

export { setPopoverNode, A };