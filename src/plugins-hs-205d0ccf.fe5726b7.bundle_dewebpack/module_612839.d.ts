/**
 * Signal reminder module that listens to various signals and dispatches custom functions.
 * This module manages initialization and registration of reminder signal listeners.
 */

import { HSCore } from './path-to-hscore';
import { HSApp } from './path-to-hsapp';

/**
 * Represents a signal that can be listened to
 */
interface Signal<T = unknown> {
  /** Signal identifier or handler */
  // Specific type depends on SignalHook implementation
}

/**
 * Defines a reminder signal configuration
 */
interface RemindSignal<T = unknown> {
  /**
   * Gets the signal to listen to
   * @returns The signal object or null if unavailable
   */
  getSignal(): Signal<T> | null;

  /**
   * Handles the signal event and returns custom function parameters
   * @param data - Signal event data
   * @returns Parameters for custom function dispatch, or null if no action needed
   */
  listen(data: T): unknown | null;
}

/**
 * Base class for reminder modules that provide signal configurations
 */
interface IRemindModule {
  /**
   * Gets the list of signals this module wants to monitor
   * @returns Array of reminder signal configurations
   */
  getRemindSignalList(): RemindSignal[];
}

/**
 * Constructor type for reminder modules
 */
type RemindModuleConstructor = new () => IRemindModule;

/**
 * Signal custom function start dispatcher
 */
interface SignalCustomFunctionStart {
  /**
   * Dispatches a custom function with given parameters
   * @param params - Function parameters
   */
  dispatch(params: unknown): void;
}

/**
 * Application instance interface
 */
interface IApp {
  /** Custom function start signal dispatcher */
  signalCustomFunctionStart?: SignalCustomFunctionStart | null;
}

/**
 * Manages reminder signal listeners across multiple modules.
 * Coordinates signal listening and custom function dispatching.
 */
declare class SignalReminder {
  /** Registered reminder modules */
  private modules: RemindModuleConstructor[];

  /** Signal hook utility for managing listeners */
  private signalHook: HSCore.Util.SignalHook;

  /** Initialization state flag */
  private isInit: boolean;

  constructor();

  /**
   * Initializes the signal reminder system.
   * Registers all module signal listeners and connects them to the app's custom function dispatcher.
   * This method is idempotent - calling multiple times has no additional effect.
   */
  init(): void;

  /**
   * Uninitializes the signal reminder system.
   * Removes all registered signal listeners and resets initialization state.
   */
  uninit(): void;
}

/**
 * Singleton instance of the signal reminder system
 */
declare const signalReminder: SignalReminder;

export default signalReminder;