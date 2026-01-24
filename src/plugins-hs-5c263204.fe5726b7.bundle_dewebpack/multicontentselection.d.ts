/**
 * Multi-content selection gizmo component
 * Handles selection UI for multiple content items with dimensional support
 */

/**
 * Represents a content item that can be selected
 */
interface ContentItem {
  /**
   * Gets the proxy object associated with this content item
   */
  getProxyObject(): ProxyObject | null | undefined;
}

/**
 * Proxy object that provides access to door elements
 */
interface ProxyObject {
  /**
   * Retrieves door elements for a given content item
   * @param item - The content item to get doors for
   * @returns Array of door elements or undefined
   */
  getDoor(item: ContentItem): unknown[] | undefined;
}

/**
 * Base gizmo class from HSApp framework
 */
declare class Gizmo {
  constructor(element: unknown, target: unknown, items: ContentItem[]);
  
  /**
   * Adds a child gizmo component
   * @param gizmo - The child gizmo to add
   */
  protected addChildGizmo(gizmo: unknown): void;
}

/**
 * Multi-content selection gizmo that manages selection UI for multiple content items.
 * Extends the base Gizmo class to provide dimensional selection capabilities.
 */
export declare class MultiContentselection extends Gizmo {
  /**
   * Creates a new multi-content selection gizmo
   * @param element - The DOM element or view element to attach to
   * @param target - The target object for selection operations
   * @param items - Array of content items that can be selected
   * @param options - Additional configuration options for the selection behavior
   */
  constructor(
    element: unknown,
    target: unknown,
    items: ContentItem[],
    options: unknown
  );

  /**
   * Adds dimensional selection support by extracting door elements from content items
   * and creating appropriate child gizmos
   * @param element - The DOM element or view element
   * @param target - The target object for selection
   * @param items - Array of content items to process
   * @param options - Configuration options
   * @private
   */
  private _addDimension(
    element: unknown,
    target: unknown,
    items: ContentItem[],
    options: unknown
  ): void;
}