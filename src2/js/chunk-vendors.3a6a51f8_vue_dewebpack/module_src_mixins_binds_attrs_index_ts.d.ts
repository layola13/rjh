/**
 * Vue mixin for binding attributes and listeners
 * Provides reactive synchronization of $attrs and $listeners to component data
 * @module binds-attrs
 */

import Vue, { VueConstructor } from 'vue';

/**
 * Attributes object containing HTML attributes
 */
export interface AttrsObject {
  [key: string]: any;
}

/**
 * Listeners object containing event handlers
 */
export interface ListenersObject {
  [key: string]: Function | Function[];
}

/**
 * Component data structure for the mixin
 */
export interface BindsAttrsData {
  /** Reactive copy of $attrs */
  attrs$: AttrsObject;
  /** Reactive copy of $listeners */
  listeners$: ListenersObject;
}

/**
 * Creates a synchronization handler for reactive data properties
 * @param dataKey - The key in $data to synchronize ('attrs$' or 'listeners$')
 * @returns A watcher callback function that syncs new values with the data property
 */
declare function createSyncHandler(
  dataKey: keyof BindsAttrsData
): (newValue: Record<string, any>, oldValue: Record<string, any>) => void;

/**
 * Vue mixin that reactively binds $attrs and $listeners to component data
 * 
 * This mixin creates reactive copies of $attrs and $listeners in the component's data,
 * allowing child components to access these values reactively. Changes are synchronized
 * bidirectionally through Vue watchers.
 * 
 * @example
 *