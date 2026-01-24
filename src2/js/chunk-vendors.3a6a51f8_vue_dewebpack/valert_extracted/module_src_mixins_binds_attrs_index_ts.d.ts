import Vue from 'vue';

/**
 * Binds Attrs Mixin
 * 
 * This mixin automatically synchronizes component's $attrs and $listeners
 * with internal reactive data properties (attrs$ and listeners$).
 * It watches for changes and updates the internal state accordingly,
 * removing properties that no longer exist and adding/updating new ones.
 */

/**
 * Attributes object that mirrors component $attrs
 */
export interface Attrs$ {
  [key: string]: unknown;
}

/**
 * Listeners object that mirrors component $listeners
 */
export interface Listeners$ {
  [key: string]: Function | Function[];
}

/**
 * Component data structure for binds-attrs mixin
 */
export interface BindsAttrsData {
  /**
   * Reactive copy of component $attrs
   */
  attrs$: Attrs$;
  
  /**
   * Reactive copy of component $listeners
   */
  listeners$: Listeners$;
}

/**
 * Creates a synchronization handler for watching $attrs or $listeners changes
 * 
 * @param dataKey - The key in component data to sync with ('attrs$' or 'listeners$')
 * @returns A watcher callback function that syncs the source with target data
 */
declare function createSyncHandler(
  dataKey: keyof BindsAttrsData
): (newValue: Record<string, unknown>, oldValue: Record<string, unknown>) => void;

/**
 * Vue mixin that provides reactive copies of $attrs and $listeners
 * 
 * Automatically syncs component's $attrs and $listeners into reactive
 * data properties attrs$ and listeners$ respectively. This allows
 * child components to reactively respond to attribute and listener changes.
 */
declare const BindsAttrsMixin: Vue.VueConstructor<Vue & BindsAttrsData>;

export default BindsAttrsMixin;