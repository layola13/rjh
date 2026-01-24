/**
 * Module: module_onClick
 * Original ID: onClick
 * 
 * Handles size range change events by delegating to the parent context's handler.
 * 
 * @param event - The size range change event data
 * @returns The result of the size range change operation
 */
declare function onClick<T = unknown, R = unknown>(
  event: T
): R;

/**
 * Alternative: If this is a method within a class context
 */
interface OnClickContext<TData = unknown, TEvent = unknown, TResult = unknown> {
  /** The data associated with this context */
  data: TData;
  
  /**
   * Internal handler for size range change events
   * @param event - The event data
   * @param data - The context data
   * @returns The result of processing the event
   */
  _onSizeRangeChange(event: TEvent, data: TData): TResult;
}