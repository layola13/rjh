import Vue from 'vue';

/**
 * Delayable mixin for Vue components.
 * Provides functionality to delay opening and closing actions with configurable timeouts.
 */
export interface Delayable extends Vue {
  /** Delay in milliseconds before opening */
  openDelay: number | string;
  
  /** Delay in milliseconds before closing */
  closeDelay: number | string;
  
  /** Timeout handle for open delay */
  openTimeout: number | undefined;
  
  /** Timeout handle for close delay */
  closeTimeout: number | undefined;
  
  /** Active state of the component */
  isActive: boolean;
  
  /**
   * Clears all pending delay timeouts.
   */
  clearDelay(): void;
  
  /**
   * Runs a delayed action.
   * @param action - The action type ('open' or 'close')
   * @param callback - Optional callback to execute after delay. 
   *                   If not provided, sets isActive based on action type.
   */
  runDelay(action: 'open' | 'close', callback?: () => void): void;
}

/**
 * Vue mixin that adds delay functionality for opening and closing operations.
 * Useful for tooltips, menus, and other components that need timed interactions.
 */
declare const Delayable: Vue.ExtendedVue<
  Vue,
  {
    openTimeout: number | undefined;
    closeTimeout: number | undefined;
  },
  {
    clearDelay(): void;
    runDelay(action: 'open' | 'close', callback?: () => void): void;
  },
  {},
  {
    openDelay: number | string;
    closeDelay: number | string;
  }
>;

export default Delayable;