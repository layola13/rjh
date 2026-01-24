/**
 * Signal system for event-driven architecture
 * Provides reactive event handling with Signal, SignalEvent, and SignalHook patterns
 */

import { Logger } from './logger';

/**
 * Global condition function to control signal dispatch behavior
 * @param signal - The signal being dispatched
 * @param data - The data being dispatched with the signal
 * @returns true to allow dispatch, false to prevent it
 */
type GlobalDispatchCondition<T = any> = (signal: Signal<T>, data: T) => boolean;

/**
 * Callback function for signal listeners
 * @param event - The signal event containing the dispatched data
 */
type SignalCallback<T = any> = (event: SignalEvent<T>) => void;

/**
 * Internal structure for storing listener callbacks with their scope
 */
interface ListenerEntry<T = any> {
  /** The callback function to execute */
  fn: SignalCallback<T>;
  /** The 'this' context for the callback */
  thisTarget?: any;
}

/**
 * Internal structure for grouped signal listeners
 */
interface GroupEntry<T = any> {
  /** The signal being listened to */
  signal: Signal<T>;
  /** The callback function */
  callback: SignalCallback<T>;
}

/**
 * Signal tracker for debugging and monitoring signal lifecycle
 * Tracks creation, disposal, and provides dump utilities for signals and hooks
 */
class SignalTracker {
  private _signalSet: Set<Signal> = new Set();
  private _signalHookSet: Set<SignalHook> = new Set();
  private _currentAddSignalSet: Set<Signal> = new Set();
  private _currentAddSignalHookSet: Set<SignalHook> = new Set();
  private _currentDisposedSignalSet: Set<Signal> = new Set();
  private _currentDisposedSignalHookSet: Set<SignalHook> = new Set();

  /**
   * Determines if a signal/hook should be tracked
   * @param target - The signal or hook to check
   * @returns false by default (tracking disabled in production)
   */
  private _needTrack(target: Signal | SignalHook): boolean {
    return false;
  }

  /**
   * Registers a signal for tracking
   * @param signal - The signal to track
   */
  trackSignal(signal: Signal): void {
    if (this._needTrack(signal)) {
      signal._id = signalIdCounter;
      signalIdCounter += 1;
      this._currentAddSignalSet.add(signal);
    }
  }

  /**
   * Unregisters a signal from tracking
   * @param signal - The signal to untrack
   */
  unTrackSignal(signal: Signal): void {
    if (this._needTrack(signal)) {
      this._signalSet.delete(signal);
      this._currentAddSignalSet.delete(signal);
      this._currentDisposedSignalSet.add(signal);
    }
  }

  /**
   * Registers a signal hook for tracking
   * @param hook - The hook to track
   */
  trackSignalHook(hook: SignalHook): void {
    if (this._needTrack(hook)) {
      hook._id = hookIdCounter;
      hookIdCounter += 1;
      this._currentAddSignalHookSet.add(hook);
    }
  }

  /**
   * Unregisters a signal hook from tracking
   * @param hook - The hook to untrack
   */
  unTrackSignalHook(hook: SignalHook): void {
    if (this._needTrack(hook)) {
      this._signalHookSet.delete(hook);
      this._currentAddSignalHookSet.delete(hook);
      this._currentDisposedSignalHookSet.add(hook);
    }
  }

  /** Clears all tracking sets */
  clear(): void {
    this._signalSet.clear();
    this._signalHookSet.clear();
    this._currentAddSignalSet.clear();
    this._currentAddSignalHookSet.clear();
    this._currentDisposedSignalSet.clear();
    this._currentDisposedSignalHookSet.clear();
  }

  /** Flushes current tracking buffers to main sets */
  flush(): void {
    for (const signal of this._currentAddSignalSet) {
      this._signalSet.add(signal);
    }
    this._currentAddSignalSet.clear();

    for (const hook of this._currentAddSignalHookSet) {
      this._signalHookSet.add(hook);
    }
    this._currentAddSignalHookSet.clear();
    this._currentDisposedSignalSet.clear();
    this._currentDisposedSignalHookSet.clear();
  }

  /** Logs all tracked signals from the last flush */
  dumpLastSignal(): void {
    this._signalSet.forEach((signal) => {
      Logger.console.log(signal);
    });
  }

  /** Logs all tracked hooks from the last flush */
  dumpLastHook(): void {
    this._signalHookSet.forEach((hook) => {
      Logger.console.log(hook);
    });
  }

  /** Logs all currently added signals (not yet flushed) */
  dumpCurrentSignal(): void {
    this._currentAddSignalSet.forEach((signal) => {
      Logger.console.log(signal);
    });
  }

  /** Logs all currently disposed signals */
  dumpCurrentDisposedSignal(): void {
    this._currentDisposedSignalSet.forEach((signal) => {
      Logger.console.log(signal);
    });
  }

  /** Logs all currently disposed hooks */
  dumpCurrentDisposedHook(): void {
    this._currentDisposedSignalHookSet.forEach((hook) => {
      Logger.console.log(hook);
    });
  }

  /** Logs all currently added hooks (not yet flushed) */
  dumpCurrentHook(): void {
    this._currentAddSignalHookSet.forEach((hook) => {
      Logger.console.log(hook);
    });
  }

  /** Logs all signals (both flushed and current) */
  dumpAllSignal(): void {
    this._signalSet.forEach((signal) => {
      Logger.console.log(signal);
    });
    this._currentAddSignalSet.forEach((signal) => {
      Logger.console.log(signal);
    });
  }

  /** Logs all hooks (both flushed and current) */
  dumpAllHook(): void {
    this._signalHookSet.forEach((hook) => {
      Logger.console.log(hook);
    });
    this._currentAddSignalHookSet.forEach((hook) => {
      Logger.console.log(hook);
    });
  }
}

/** Global signal ID counter */
let signalIdCounter: number = 0;
/** Global hook ID counter */
let hookIdCounter: number = 0;
/** Global signal tracker instance */
const globalTracker = new SignalTracker();

/**
 * Signal class for reactive event dispatching
 * Supports multiple listeners, global dispatch conditions, and enable/disable functionality
 * @template T - The type of data dispatched by this signal
 */
export class Signal<T = any> {
  /** Internal tracking ID (used by SignalTracker) */
  _id?: number;
  
  /** Global dispatch conditions applied to all signals */
  private static s_conditions: Array<GlobalDispatchCondition<any>> = [];
  
  /** List of registered listener callbacks */
  private _eventsCallback: Array<ListenerEntry<T>> = [];
  
  /** Default target object for events */
  defaultTarget?: any;
  
  /** Flag indicating if signal is disposed */
  private _disposed: boolean = false;
  
  /** Flag indicating if signal dispatch is disabled */
  private _disabled?: boolean;

  /**
   * Creates a new Signal instance
   * @param defaultTarget - The default target object for dispatched events
   */
  constructor(defaultTarget?: any) {
    this._eventsCallback = [];
    this.defaultTarget = defaultTarget;
    this._disposed = false;
  }

  /**
   * Adds a global condition that can prevent signal dispatch
   * @param condition - Function that returns true to allow dispatch, false to block
   */
  static addGlobalDispatchCondition(condition: GlobalDispatchCondition): void {
    Signal.s_conditions.push(condition);
  }

  /**
   * Removes a previously added global dispatch condition
   * @param condition - The condition function to remove
   */
  static removeGlobalDispatchCondition(condition: GlobalDispatchCondition): void {
    const index = Signal.s_conditions.indexOf(condition);
    if (index !== -1) {
      Signal.s_conditions.splice(index, 1);
    }
  }

  /** Clears all global dispatch conditions */
  static clearGlobalDispatchConditions(): void {
    Signal.s_conditions.length = 0;
  }

  /**
   * Disables signal dispatch (no events will be sent)
   * @returns this signal instance for chaining
   */
  disable(): this {
    this._disabled = true;
    return this;
  }

  /**
   * Enables signal dispatch
   * @returns this signal instance for chaining
   */
  enable(): this {
    this._disabled = false;
    return this;
  }

  /**
   * Dispatches an event to all registered listeners
   * @param data - The data to dispatch
   * @returns this signal instance for chaining
   */
  dispatch(data: T): this {
    if (this._disposed || this._disabled) {
      return this;
    }

    const callbacks = this._eventsCallback.slice();
    const callbackCount = callbacks.length;

    if (!callbackCount) {
      return this;
    }

    // Check global dispatch conditions
    for (let i = 0, len = Signal.s_conditions.length; i < len; i++) {
      const condition = Signal.s_conditions[i];
      if (condition && !condition(this, data)) {
        return this;
      }
    }

    // Execute all callbacks
    for (let i = 0; i < callbackCount; i++) {
      const entry = callbacks[i];
      try {
        if (entry.thisTarget) {
          entry.fn.call(entry.thisTarget, new SignalEvent(data, this.defaultTarget));
        } else {
          entry.fn(new SignalEvent(data, this.defaultTarget));
        }
      } catch (error) {
        console.error(error, 'HSCore.Signal.Error');
      }
    }

    return this;
  }

  /**
   * Registers a listener callback for this signal
   * @param callback - The callback function to invoke on dispatch
   * @param thisTarget - Optional 'this' context for the callback
   * @returns this signal instance for chaining
   */
  listen(callback: SignalCallback<T>, thisTarget?: any): this {
    if (this._disposed || !callback) {
      return this;
    }

    const target = thisTarget ?? this.defaultTarget;
    const exists = this._eventsCallback.findIndex(
      (entry) => entry.fn === callback && entry.thisTarget === target
    );

    if (exists === -1) {
      this._eventsCallback.push({
        fn: callback,
        thisTarget: target,
      });
    }

    return this;
  }

  /**
   * Removes a listener callback from this signal
   * @param callback - The callback function to remove
   * @param thisTarget - Optional 'this' context to match
   * @returns this signal instance for chaining
   */
  unlisten(callback: SignalCallback<T>, thisTarget?: any): this {
    if (this._disposed || !this._eventsCallback) {
      return this;
    }

    const target = thisTarget ?? this.defaultTarget;
    const index = this._eventsCallback.findIndex(
      (entry) => entry.fn === callback && entry.thisTarget === target
    );

    if (index !== -1) {
      this._eventsCallback.splice(index, 1);
    }

    return this;
  }

  /**
   * Removes all listener callbacks from this signal
   * @returns this signal instance for chaining
   */
  unlistenAll(): this {
    if (this._eventsCallback) {
      this._eventsCallback.length = 0;
    }
    return this;
  }

  /** Disposes the signal and cleans up all resources */
  dispose(): void {
    if (!this._disposed) {
      this._disposed = true;
      this.unlistenAll();
      this._eventsCallback = undefined as any;
      this.defaultTarget = undefined;
    }
  }
}

/**
 * Event object dispatched by Signal
 * Contains the dispatched data and target information
 * @template T - The type of data in this event
 */
export class SignalEvent<T = any> {
  /** Event type identifier */
  readonly type: string = 'signal';
  
  /** The target object associated with this event */
  target?: any;
  
  /** The current target (same as target for signals) */
  currentTarget?: any;
  
  /** The data payload of this event */
  data: T;

  /**
   * Creates a new SignalEvent
   * @param data - The event data
   * @param target - The target object
   */
  constructor(data: T, target?: any) {
    this.target = target;
    this.currentTarget = this.target;
    this.data = data;
  }
}

/**
 * SignalHook manages multiple signal listeners with lifecycle management
 * Supports grouped listeners and automatic cleanup
 */
export class SignalHook {
  /** Internal tracking ID (used by SignalTracker) */
  _id?: number;
  
  /** Maps signals to their registered callbacks */
  private listenerToCallbackFn: Map<Signal, Array<SignalCallback>>;
  
  /** Maps group names to their signal/callback entries */
  private groupMap: Map<string, Array<GroupEntry>>;
  
  /** Default scope for listener callbacks */
  private _defaultListernerScope?: any;

  /**
   * Creates a new SignalHook
   * @param defaultScope - Default 'this' context for all listeners
   */
  constructor(defaultScope?: any) {
    this.listenerToCallbackFn = new Map();
    this.groupMap = new Map();
    this._defaultListernerScope = defaultScope;
  }

  /**
   * Registers a listener for a signal
   * @param signal - The signal to listen to
   * @param callback - The callback to invoke
   * @param group - Optional group name for batch management
   * @returns this hook instance for chaining
   */
  listen(signal: Signal, callback: SignalCallback, group?: string): this {
    if (!signal) {
      return this;
    }

    signal.listen(callback, this._defaultListernerScope);

    let callbacks = this.listenerToCallbackFn.get(signal);
    if (!callbacks) {
      callbacks = [];
      this.listenerToCallbackFn.set(signal, callbacks);
    }
    callbacks.push(callback);

    if (group) {
      let groupEntries = this.groupMap.get(group);
      if (!groupEntries) {
        groupEntries = [];
        this.groupMap.set(group, groupEntries);
      }
      groupEntries.push({
        signal,
        callback,
      });
    }

    return this;
  }

  /**
   * Removes listeners from a signal
   * @param signal - The signal to remove listeners from
   * @param callback - Optional specific callback to remove (removes all if not provided)
   * @returns this hook instance for chaining
   */
  unlisten(signal: Signal, callback?: SignalCallback): this {
    const callbacksToRemove = callback
      ? [callback]
      : this.listenerToCallbackFn.get(signal) ?? [];
    const allCallbacks = this.listenerToCallbackFn.get(signal);
    const removeCount = callbacksToRemove.length;

    for (let i = 0; i < removeCount; i++) {
      const cb = callbacksToRemove[i];
      signal.unlisten(cb, this._defaultListernerScope);
      if (allCallbacks) {
        const idx = allCallbacks.indexOf(cb);
        if (idx !== -1) {
          allCallbacks.splice(idx, 1);
        }
      }
    }

    if (!callback || (allCallbacks && allCallbacks.length === 0)) {
      this.listenerToCallbackFn.delete(signal);
    }

    // Clean up groups
    const groupKeys = Array.from(this.groupMap.keys());
    const groupCount = groupKeys.length;
    for (let i = 0; i < groupCount; i++) {
      const groupKey = groupKeys[i];
      const filteredEntries = (this.groupMap.get(groupKey) ?? []).filter(
        (entry) => callbacksToRemove.indexOf(entry.callback) === -1
      );
      this.groupMap.set(groupKey, filteredEntries);
    }

    return this;
  }

  /**
   * Removes all listeners in a specific group
   * @param group - The group name
   * @returns this hook instance for chaining
   */
  unlistenGroup(group: string): this {
    const entries = this.groupMap.get(group);
    if (!entries) {
      return this;
    }

    this.listenerToCallbackFn.delete(group as any);

    const entryCount = entries.length;
    for (let i = 0; i < entryCount; i++) {
      const entry = entries[i];
      entry.signal.unlisten(entry.callback, this._defaultListernerScope);
      this.listenerToCallbackFn.delete(entry.signal);
    }

    this.groupMap.delete(group);
    return this;
  }

  /**
   * Removes all listeners from all signals
   * @returns this hook instance for chaining
   */
  unlistenAll(): this {
    const signals = Array.from(this.listenerToCallbackFn.keys());
    const signalCount = signals.length;

    for (let i = 0; i < signalCount; i++) {
      const signal = signals[i];
      let callbacks = this.listenerToCallbackFn.get(signal);
      callbacks = callbacks ?? [];
      const callbackCount = callbacks.length;

      for (let j = 0; j < callbackCount; j++) {
        const callback = callbacks[j];
        signal.unlisten(callback, this._defaultListernerScope);
      }
    }

    this.listenerToCallbackFn.clear();
    this.groupMap.clear();
    return this;
  }

  /** Disposes the hook and cleans up all listeners */
  dispose(): void {
    this.unlistenAll();
    this._defaultListernerScope = undefined;
    this.listenerToCallbackFn = undefined as any;
  }
}