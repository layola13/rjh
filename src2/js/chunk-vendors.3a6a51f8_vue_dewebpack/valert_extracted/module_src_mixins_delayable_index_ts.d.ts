import Vue from 'vue';

/**
 * Delayable mixin interface
 * Provides delay functionality for opening and closing operations
 */
export interface Delayable extends Vue {
  /** Delay in milliseconds before opening */
  openDelay: number | string;
  
  /** Delay in milliseconds before closing */
  closeDelay: number | string;
  
  /** Timeout ID for open operation */
  openTimeout?: number;
  
  /** Timeout ID for close operation */
  closeTimeout?: number;
  
  /** Active state of the component */
  isActive?: boolean;
  
  /**
   * Clear all pending delay timeouts
   */
  clearDelay(): void;
  
  /**
   * Run a delayed operation
   * @param delayType - Type of delay ('open' or 'close')
   * @param callback - Optional callback function to execute after delay
   */
  runDelay(delayType: 'open' | 'close', callback?: () => void): void;
}

/**
 * Delayable mixin
 * Adds configurable delay functionality for open/close operations
 */
declare const Delayable: Vue.VueConstructor<Delayable>;

export default Delayable;