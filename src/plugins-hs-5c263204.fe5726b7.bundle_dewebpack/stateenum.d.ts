/**
 * Enumeration of possible states for a process or workflow.
 * Represents the lifecycle stages from submission to completion.
 * 
 * @module StateEnum
 */

/**
 * State enumeration object containing all possible state values.
 * 
 * @enum {string}
 * @readonly
 */
export declare const StateEnum: {
  /**
   * Initial state when an item has been submitted but not yet processed.
   */
  readonly SUBMITTED: "SUBMITTED";
  
  /**
   * State indicating the item has been closed without completion.
   */
  readonly CLOSED: "CLOSED";
  
  /**
   * State indicating the item is currently being processed.
   */
  readonly PROCESSING: "PROCESSING";
  
  /**
   * Final state indicating the item has been successfully completed.
   */
  readonly COMPLETED: "COMPLETED";
};

/**
 * Type representing valid state values.
 * Can be used for type-safe state handling.
 */
export declare type StateEnumValue = typeof StateEnum[keyof typeof StateEnum];