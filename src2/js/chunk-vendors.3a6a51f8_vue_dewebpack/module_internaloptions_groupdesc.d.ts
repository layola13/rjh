/**
 * Group descriptor update handler
 * 
 * Compares the new group descriptor value with the current value and emits
 * an update event if they differ. Handles both single and array group descriptors.
 * 
 * @param newGroupDesc - The new group descriptor value to set
 * @param currentGroupDesc - The current group descriptor value for comparison
 * 
 * @remarks
 * - Performs deep equality check before emitting update
 * - Automatically converts array results to single value if original groupDesc was not an array
 * - Emits 'update:group-desc' event to parent component
 * 
 * @module internalOptions.groupDesc
 */
export declare function updateGroupDescHandler<T = unknown>(
  newGroupDesc: T | T[],
  currentGroupDesc: T | T[]
): void;

/**
 * Context interface for the group descriptor update handler
 * Represents the Vue component instance that owns this method
 */
export interface GroupDescriptorContext<T = unknown> {
  /**
   * Current group descriptor value (can be single item or array)
   */
  groupDesc: T | T[];

  /**
   * Emits component events
   * @param eventName - Name of the event to emit
   * @param payload - Event payload data
   */
  $emit(eventName: 'update:group-desc', payload: T | T[]): void;
  $emit(eventName: string, ...args: unknown[]): void;
}

/**
 * Bound version of the update handler with component context
 * 
 * @this {GroupDescriptorContext<T>}
 */
export declare function boundUpdateGroupDescHandler<T = unknown>(
  this: GroupDescriptorContext<T>,
  newGroupDesc: T | T[],
  currentGroupDesc: T | T[]
): void;