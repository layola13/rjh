/**
 * Module: module_end
 * Original ID: end
 * 
 * Handles touch end events with overflow checking
 */

/**
 * Touch event handler that performs overflow checking
 * @param event - The touch event or event data
 * @returns Result of the overflow check operation
 */
declare function moduleEnd<T = TouchEvent>(event: T): unknown;

/**
 * Handler utility interface
 */
interface OverflowHandler {
  /**
   * Performs overflow check with the provided handler
   * @param event - Event data to check
   * @param handler - Handler function to execute
   * @returns Result of the handler execution
   */
  overflowCheck<T>(event: T, handler: (event: T) => unknown): unknown;
  
  /**
   * Handles touch end events
   * @param event - Touch event data
   * @returns Processing result
   */
  onTouchEnd(event: unknown): unknown;
}

export { moduleEnd, OverflowHandler };