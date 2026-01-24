/**
 * Signal class for event handling and dispatching
 * Extends HSCore.Util.Signal to provide type-safe event management
 * @module Signal
 */

import { HSCore } from './hscore';

/**
 * Generic event listener callback function
 * @template T - The type of data passed to the listener
 */
export type SignalListener<T = unknown> = (data: T) => void;

/**
 * Options for signal listener registration
 */
export interface SignalListenOptions {
  /** Whether the listener should only be called once */
  once?: boolean;
  /** Priority of the listener (higher priority executes first) */
  priority?: number;
}

/**
 * Signal class for managing event listeners and dispatching events
 * Provides a type-safe wrapper around HSCore.Util.Signal
 * @template T - The type of data that will be dispatched through this signal
 */
export declare class Signal<T = unknown> extends HSCore.Util.Signal {
  /**
   * Creates a new Signal instance
   * @param config - Optional configuration for the signal
   */
  constructor(config?: SignalConfig);

  /**
   * Dispatches an event to all registered listeners
   * @param data - The data to pass to all listeners
   * @returns True if the event was dispatched successfully, false otherwise
   */
  dispatch(data: T): boolean;

  /**
   * Registers a listener for this signal
   * @param listener - The callback function to invoke when signal is dispatched
   * @param options - Optional configuration for the listener
   * @returns A function to remove the listener
   */
  listen(listener: SignalListener<T>, options?: SignalListenOptions): () => void;

  /**
   * Removes a previously registered listener
   * @param listener - The listener function to remove
   * @param options - Optional options that were used during registration
   * @returns True if the listener was removed, false if it wasn't found
   */
  unlisten(listener: SignalListener<T>, options?: SignalListenOptions): boolean;
}

/**
 * Configuration options for Signal initialization
 */
export interface SignalConfig {
  /** Maximum number of listeners allowed */
  maxListeners?: number;
  /** Whether to enable debug logging */
  debug?: boolean;
}