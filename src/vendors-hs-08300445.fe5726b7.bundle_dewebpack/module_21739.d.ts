/**
 * Intersection Observer callback type
 * Called when an observed element's intersection status changes
 */
type IntersectionCallback = (element: Element) => void;

/**
 * Map storing observers for each element
 * Key: observed DOM element
 * Value: Set of callback functions to invoke on intersection
 */
declare const observerCallbacks: Map<Element, Set<IntersectionCallback>>;

/**
 * Internal IntersectionObserver instance that monitors all observed elements
 */
declare const intersectionObserver: IntersectionObserver;

/**
 * Registers a callback to be invoked when the specified element intersects with the viewport
 * 
 * @param element - The DOM element to observe for intersection changes
 * @param callback - Function to call when the element's intersection status changes
 * 
 * @example
 *