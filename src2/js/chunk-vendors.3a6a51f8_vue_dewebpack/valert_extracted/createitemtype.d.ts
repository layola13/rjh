/**
 * Event helper utilities for VDatePicker component
 * Provides functions to create filtered event listeners based on event name suffixes
 */

/**
 * Vue component instance with $listeners and $emit
 */
interface VueComponent {
  /** Object containing all registered event listeners */
  $listeners: Record<string, Function | Function[]>;
  /** Method to emit events */
  $emit(event: string, ...args: any[]): void;
}

/**
 * Native event listeners object
 */
type NativeListeners = Record<string, (event: Event) => void>;

/**
 * Generic event listeners object
 */
type EventListeners = Record<string, Function | Function[]>;

/**
 * Creates native event listeners by filtering component listeners that end with a specific suffix.
 * The suffix is removed from the listener name and the event is re-emitted with additional data.
 * 
 * @param component - Vue component instance with $listeners and $emit
 * @param eventSuffix - Suffix to filter event names (e.g., ':date', ':month')
 * @param emitData - Additional data to include when re-emitting the event
 * @returns Object containing native event listeners with suffix removed from names
 * 
 * @example
 * // If component has listener 'click:date'
 * // Returns { click: (event) => component.$emit('click:date', dateData, event) }
 */
export declare function createItemTypeNativeListeners(
  component: VueComponent,
  eventSuffix: string,
  emitData: any
): NativeListeners;

/**
 * Creates event listeners by filtering component listeners that end with a specific suffix.
 * Returns matching listeners without modifying their names.
 * 
 * @param component - Vue component instance with $listeners
 * @param eventSuffix - Suffix to filter event names (e.g., ':date', ':month')
 * @returns Object containing filtered event listeners that match the suffix
 * 
 * @example
 * // If component has listeners 'click:date' and 'hover:month'
 * // createItemTypeListeners(component, ':date') returns { 'click:date': Function }
 */
export declare function createItemTypeListeners(
  component: VueComponent,
  eventSuffix: string
): EventListeners;