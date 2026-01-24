/**
 * Event helper utilities for VDatePicker component
 * Provides functions to create filtered event listeners based on event name suffixes
 */

/**
 * Vue component instance with $listeners and $emit
 */
interface VueComponentInstance {
  /** Object containing all registered event listeners */
  $listeners: Record<string, Function | Function[]>;
  /** Method to emit custom events */
  $emit(event: string, ...args: unknown[]): void;
}

/**
 * Creates a map of native event listeners filtered by suffix
 * 
 * Filters the component's listeners by a given suffix, removes the suffix from the event name,
 * and wraps each listener to emit the original event with additional context.
 * 
 * @param component - Vue component instance with $listeners and $emit
 * @param eventSuffix - Suffix to filter event names (e.g., ':native')
 * @param eventContext - Additional context/data to pass when emitting the event
 * @returns Object mapping filtered event names (without suffix) to wrapped handler functions
 * 
 * @example
 * // If component has listeners: { 'click:native': fn, 'hover': fn2 }
 * // createItemTypeNativeListeners(component, ':native', item)
 * // Returns: { 'click': (event) => component.$emit('click:native', item, event) }
 */
export function createItemTypeNativeListeners<T = unknown>(
  component: VueComponentInstance,
  eventSuffix: string,
  eventContext: T
): Record<string, (event: Event) => void>;

/**
 * Creates a map of event listeners filtered by suffix
 * 
 * Filters the component's listeners by a given suffix and returns only those
 * that match, preserving the original listener references.
 * 
 * @param component - Vue component instance with $listeners
 * @param eventSuffix - Suffix to filter event names (e.g., ':item', ':date')
 * @returns Object mapping filtered event names to their original listener functions
 * 
 * @example
 * // If component has listeners: { 'click:item': fn, 'hover': fn2 }
 * // createItemTypeListeners(component, ':item')
 * // Returns: { 'click:item': fn }
 */
export function createItemTypeListeners(
  component: VueComponentInstance,
  eventSuffix: string
): Record<string, Function | Function[]>;