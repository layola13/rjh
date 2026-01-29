import { Logger } from './Logger';

let signalIdCounter = 0;
let signalHookIdCounter = 0;

interface ISignalTrackable {
  _id?: number;
}

class SignalTracker {
  private _signalSet: Set<ISignalTrackable>;
  private _signalHookSet: Set<ISignalTrackable>;
  private _currentAddSignalSet: Set<ISignalTrackable>;
  private _currentAddSignalHookSet: Set<ISignalTrackable>;
  private _currentDisposedSignalSet: Set<ISignalTrackable>;
  private _currentDisposedSignalHookSet: Set<ISignalTrackable>;

  constructor() {
    this._signalSet = new Set();
    this._signalHookSet = new Set();
    this._currentAddSignalSet = new Set();
    this._currentAddSignalHookSet = new Set();
    this._currentDisposedSignalSet = new Set();
    this._currentDisposedSignalHookSet = new Set();
  }

  private _needTrack(item: ISignalTrackable): boolean {
    return false;
  }

  trackSignal(signal: ISignalTrackable): void {
    if (this._needTrack(signal)) {
      signal._id = signalIdCounter;
      signalIdCounter += 1;
      this._currentAddSignalSet.add(signal);
    }
  }

  unTrackSignal(signal: ISignalTrackable): void {
    if (this._needTrack(signal)) {
      this._signalSet.delete(signal);
      this._currentAddSignalSet.delete(signal);
      this._currentDisposedSignalSet.add(signal);
    }
  }

  trackSignalHook(hook: ISignalTrackable): void {
    if (this._needTrack(hook)) {
      hook._id = signalHookIdCounter;
      signalHookIdCounter += 1;
      this._currentAddSignalHookSet.add(hook);
    }
  }

  unTrackSignalHook(hook: ISignalTrackable): void {
    if (this._needTrack(hook)) {
      this._signalHookSet.delete(hook);
      this._currentAddSignalHookSet.delete(hook);
      this._currentDisposedSignalHookSet.add(hook);
    }
  }

  clear(): void {
    this._signalSet.clear();
    this._signalHookSet.clear();
    this._currentAddSignalSet.clear();
    this._currentAddSignalHookSet.clear();
    this._currentDisposedSignalSet.clear();
    this._currentDisposedSignalHookSet.clear();
  }

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

  dumpLastSignal(): void {
    this._signalSet.forEach((signal) => {
      Logger.console.log(signal);
    });
  }

  dumpLastHook(): void {
    this._signalHookSet.forEach((hook) => {
      Logger.console.log(hook);
    });
  }

  dumpCurrentSignal(): void {
    this._currentAddSignalSet.forEach((signal) => {
      Logger.console.log(signal);
    });
  }

  dumpCurrentDisposedSignal(): void {
    this._currentDisposedSignalSet.forEach((signal) => {
      Logger.console.log(signal);
    });
  }

  dumpCurrentDisposedHook(): void {
    this._currentDisposedSignalHookSet.forEach((hook) => {
      Logger.console.log(hook);
    });
  }

  dumpCurrentHook(): void {
    this._currentAddSignalHookSet.forEach((hook) => {
      Logger.console.log(hook);
    });
  }

  dumpAllSignal(): void {
    this._signalSet.forEach((signal) => {
      Logger.console.log(signal);
    });
    this._currentAddSignalSet.forEach((signal) => {
      Logger.console.log(signal);
    });
  }

  dumpAllHook(): void {
    this._signalHookSet.forEach((hook) => {
      Logger.console.log(hook);
    });
    this._currentAddSignalHookSet.forEach((hook) => {
      Logger.console.log(hook);
    });
  }
}

new SignalTracker();

type SignalDispatchCondition<T = unknown> = (signal: Signal<T>, data: T) => boolean;

interface IEventCallback<T = unknown> {
  fn: (event: SignalEvent<T>) => void;
  thisTarget?: unknown;
}

export class Signal<T = unknown> {
  private static s_conditions: SignalDispatchCondition[] = [];

  private _eventsCallback: IEventCallback<T>[];
  private _disposed: boolean;
  private _disabled?: boolean;
  public defaultTarget?: unknown;

  constructor(defaultTarget?: unknown) {
    this._eventsCallback = [];
    this.defaultTarget = defaultTarget;
    this._disposed = false;
  }

  static addGlobalDispatchCondition(condition: SignalDispatchCondition): void {
    Signal.s_conditions.push(condition);
  }

  static removeGlobalDispatchCondition(condition: SignalDispatchCondition): void {
    const index = Signal.s_conditions.indexOf(condition);
    if (index !== -1) {
      Signal.s_conditions.splice(index, 1);
    }
  }

  static clearGlobalDispatchConditions(): void {
    Signal.s_conditions.length = 0;
  }

  disable(): this {
    this._disabled = true;
    return this;
  }

  enable(): this {
    this._disabled = false;
    return this;
  }

  dispatch(data: T): this {
    if (this._disposed || this._disabled) {
      return this;
    }

    const callbacks = this._eventsCallback.slice();
    const callbackCount = callbacks.length;

    if (!callbackCount) {
      return this;
    }

    for (let i = 0, len = Signal.s_conditions.length; i < len; i++) {
      const condition = Signal.s_conditions[i];
      if (condition && !condition(this, data)) {
        return this;
      }
    }

    for (let i = 0; i < callbackCount; i++) {
      const callback = callbacks[i];
      try {
        const event = new SignalEvent(data, this.defaultTarget);
        if (callback.thisTarget) {
          callback.fn.call(callback.thisTarget, event);
        } else {
          callback.fn(event);
        }
      } catch (error) {
        console.error(error, 'HSCore.Signal.Error');
      }
    }

    return this;
  }

  listen(callback: (event: SignalEvent<T>) => void, thisTarget?: unknown): this {
    if (this._disposed || !callback) {
      return this;
    }

    const target = thisTarget ?? this.defaultTarget;
    const existingIndex = this._eventsCallback.findIndex(
      (item) => item.fn === callback && item.thisTarget === target
    );

    if (existingIndex === -1) {
      this._eventsCallback.push({
        fn: callback,
        thisTarget: target,
      });
    }

    return this;
  }

  unlisten(callback: (event: SignalEvent<T>) => void, thisTarget?: unknown): this {
    if (this._disposed || !this._eventsCallback) {
      return this;
    }

    const target = thisTarget ?? this.defaultTarget;
    const index = this._eventsCallback.findIndex(
      (item) => item.fn === callback && item.thisTarget === target
    );

    if (index !== -1) {
      this._eventsCallback.splice(index, 1);
    }

    return this;
  }

  unlistenAll(): this {
    if (this._eventsCallback) {
      this._eventsCallback.length = 0;
    }
    return this;
  }

  dispose(): void {
    if (!this._disposed) {
      this._disposed = true;
      this.unlistenAll();
      this._eventsCallback = undefined!;
      this.defaultTarget = undefined;
    }
  }
}

export class SignalEvent<T = unknown> {
  public readonly type: string = 'signal';
  public readonly target: unknown;
  public readonly currentTarget: unknown;
  public readonly data: T;

  constructor(data: T, target?: unknown) {
    this.target = target;
    this.currentTarget = this.target;
    this.data = data;
  }
}

interface ISignalCallbackEntry<T = unknown> {
  signal: Signal<T>;
  callback: (event: SignalEvent<T>) => void;
}

export class SignalHook {
  private listenerToCallbackFn: Map<Signal, Array<(event: SignalEvent) => void>>;
  private groupMap: Map<string, ISignalCallbackEntry[]>;
  private _defaultListernerScope?: unknown;

  constructor(defaultListenerScope?: unknown) {
    this.listenerToCallbackFn = new Map();
    this.groupMap = new Map();
    this._defaultListernerScope = defaultListenerScope;
  }

  listen<T = unknown>(
    signal: Signal<T>,
    callback: (event: SignalEvent<T>) => void,
    group?: string
  ): this {
    if (!signal) {
      return this;
    }

    signal.listen(callback, this._defaultListernerScope);

    let callbacks = this.listenerToCallbackFn.get(signal as Signal);
    if (!callbacks) {
      callbacks = [];
      this.listenerToCallbackFn.set(signal as Signal, callbacks);
    }
    callbacks.push(callback as (event: SignalEvent) => void);

    if (group) {
      let groupEntries = this.groupMap.get(group);
      if (!groupEntries) {
        groupEntries = [];
        this.groupMap.set(group, groupEntries);
      }
      groupEntries.push({
        signal: signal as Signal,
        callback: callback as (event: SignalEvent) => void,
      });
    }

    return this;
  }

  unlisten<T = unknown>(
    signal: Signal<T>,
    callback?: (event: SignalEvent<T>) => void
  ): this {
    const callbacksToRemove = callback
      ? [callback]
      : this.listenerToCallbackFn.get(signal as Signal) ?? [];
    const storedCallbacks = this.listenerToCallbackFn.get(signal as Signal);
    const removeCount = callbacksToRemove.length;

    for (let i = 0; i < removeCount; i++) {
      const cb = callbacksToRemove[i];
      signal.unlisten(cb as (event: SignalEvent<T>) => void, this._defaultListernerScope);
      if (storedCallbacks) {
        const index = storedCallbacks.indexOf(cb as (event: SignalEvent) => void);
        if (index !== -1) {
          storedCallbacks.splice(index, 1);
        }
      }
    }

    if (!callback || (storedCallbacks && storedCallbacks.length === 0)) {
      this.listenerToCallbackFn.delete(signal as Signal);
    }

    const groupKeys = Array.from(this.groupMap.keys());
    const groupCount = groupKeys.length;

    for (let i = 0; i < groupCount; i++) {
      const groupKey = groupKeys[i];
      const entries = this.groupMap.get(groupKey)!;
      const filteredEntries = entries.filter(
        (entry) => callbacksToRemove.indexOf(entry.callback as never) === -1
      );
      this.groupMap.set(groupKey, filteredEntries);
    }

    return this;
  }

  unlistenGroup(group: string): this {
    const entries = this.groupMap.get(group);
    if (!entries) {
      return this;
    }

    this.listenerToCallbackFn.delete(group as unknown as Signal);

    const entryCount = entries.length;
    for (let i = 0; i < entryCount; i++) {
      const entry = entries[i];
      entry.signal.unlisten(entry.callback, this._defaultListernerScope);
      this.listenerToCallbackFn.delete(entry.signal);
    }

    this.groupMap.delete(group);
    return this;
  }

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

  dispose(): void {
    this.unlistenAll();
    this._defaultListernerScope = undefined;
    this.listenerToCallbackFn = undefined!;
  }
}