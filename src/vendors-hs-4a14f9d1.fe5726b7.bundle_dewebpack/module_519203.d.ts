/**
 * Browser polyfills and compatibility layer module
 * Provides missing APIs and extends native prototypes for older browsers
 * @module BrowserPolyfills
 */

/**
 * Safely defines a property on an object if it doesn't already exist
 * @param target - The target object to define the property on
 * @param propertyName - The name of the property to define
 * @param value - The value to assign to the property
 */
declare function definePropertySafely<T extends object, K extends PropertyKey>(
  target: T,
  propertyName: K,
  value: unknown
): void;

// ============================================================================
// Global Object Polyfills
// ============================================================================

declare global {
  /**
   * Extends the global Window interface with polyfilled properties
   */
  interface Window {
    /** Reference to the global object */
    global: typeof globalThis;
    
    /** Reference to the window itself */
    self: Window;
    
    /**
     * Console API for logging (polyfilled if missing)
     */
    console: Console;
    
    /**
     * Displays an alert dialog (polyfilled to console.log if missing)
     * @param message - The message to display
     */
    alert(message?: unknown): void;
    
    /**
     * Performance measurement API (polyfilled if missing)
     */
    performance: Performance;
    
    /**
     * Requests the browser to call a function before the next repaint
     * @param callback - The function to call
     * @returns A request ID that can be used to cancel the request
     */
    requestAnimationFrame(callback: FrameRequestCallback): number;
  }

  /**
   * Extends the Console interface with polyfilled methods
   */
  interface Console {
    /** Logs an error message */
    error(...data: unknown[]): void;
    
    /** Logs a warning message */
    warn(...data: unknown[]): void;
    
    /** Logs an informational message */
    info(...data: unknown[]): void;
    
    /** Logs an object's properties */
    dir(item?: unknown, options?: unknown): void;
    
    /** Displays data in tabular format */
    table(tabularData?: unknown, properties?: string[]): void;
    
    /**
     * Logs an error if the assertion is false
     * @param condition - The condition to test
     * @param message - The error message to log if condition is false
     */
    assert(condition?: boolean, message?: string): void;
  }

  /**
   * Extends the Performance interface with polyfilled methods
   */
  interface Performance {
    /**
     * Returns a high-resolution timestamp in milliseconds
     * @returns The current time in milliseconds
     */
    now(): number;
  }

  // ============================================================================
  // Array Prototype Extensions
  // ============================================================================

  interface Array<T> {
    /**
     * Removes the first occurrence of an item from the array
     * @param item - The item to remove
     * @returns The removed item, or undefined if not found
     */
    xRemove(item: T): T | undefined;

    /**
     * Inserts items at a specific index in the array
     * @param index - The index at which to insert
     * @param items - The items to insert
     * @returns The new length of the array
     */
    xInsert(index: number, ...items: T[]): number;

    /**
     * Pushes all items from a collection to the end of the array
     * @param collection - The collection of items to add
     * @returns The new length of the array
     */
    xPushCollection(collection: ArrayLike<T>): number;

    /**
     * Inserts all items from a collection at a specific index
     * @param index - The index at which to insert
     * @param collection - The collection of items to insert
     * @returns The new length of the array
     */
    xInsertCollection(index: number, collection: ArrayLike<T>): number;
  }

  // ============================================================================
  // DOM Prototype Extensions
  // ============================================================================

  interface Element {
    /**
     * Removes the element from its parent node
     */
    remove(): void;
  }

  interface Event {
    /**
     * Prevents the default action of the event
     */
    preventDefault(): void;

    /**
     * Stops the event from propagating up the DOM tree
     */
    stopPropagation(): void;
  }
}

export {};