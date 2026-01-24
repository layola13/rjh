/**
 * Event listener utility module that provides cross-browser event delegation and management.
 * Supports attaching listeners to DOM nodes, NodeLists, or CSS selectors.
 * @module EventListener
 */

/**
 * Object containing the destroy method to clean up event listeners
 */
interface ListenerBinding {
  /**
   * Removes all event listeners attached by this binding
   */
  destroy(): void;
}

/**
 * Type checking utility interface
 */
interface TypeChecker {
  /** Check if value is a string */
  string(value: unknown): value is string;
  /** Check if value is a function */
  fn(value: unknown): value is Function;
  /** Check if value is a single DOM node */
  node(value: unknown): value is Node;
  /** Check if value is a NodeList */
  nodeList(value: unknown): value is NodeList;
}

/**
 * Event delegation function type
 * @param container - The container element to attach the delegated listener to
 * @param selector - CSS selector to match target elements
 * @param eventType - The event type to listen for
 * @param callback - The event handler function
 * @returns Binding object with destroy method
 */
type DelegateFunction = (
  container: Element,
  selector: string,
  eventType: string,
  callback: EventListener
) => ListenerBinding;

/**
 * Attaches an event listener to a DOM element, NodeList, or CSS selector.
 * 
 * @param target - The target element(s) or CSS selector string
 * @param eventType - The event type to listen for (e.g., 'click', 'keydown')
 * @param callback - The event handler function to execute
 * @returns An object with a destroy method to remove the event listener(s)
 * @throws {Error} When all arguments are missing
 * @throws {TypeError} When eventType is not a string
 * @throws {TypeError} When callback is not a function
 * @throws {TypeError} When target is not a valid type
 */
declare function addEventListener(
  target: Node | NodeList | string,
  eventType: string,
  callback: EventListener
): ListenerBinding;

export = addEventListener;