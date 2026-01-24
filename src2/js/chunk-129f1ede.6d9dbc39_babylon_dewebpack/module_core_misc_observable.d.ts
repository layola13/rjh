/**
 * Observable pattern implementation for event-driven programming.
 * Provides a mechanism to register observers and notify them when events occur.
 * 
 * @module core/Misc/observable
 */

/**
 * Represents an observer callback function
 * @template T The type of data passed to the observer
 */
export type Observer<T> = (eventData: T, eventState: EventState) => void;

/**
 * Event state information passed to observers
 */
export interface EventState {
  /**
   * Whether the event propagation should be stopped
   */
  skipNextObservers: boolean;
  
  /**
   * Optional mask to filter observers
   */
  mask?: number;
  
  /**
   * Optional target associated with the event
   */
  target?: unknown;
  
  /**
   * Optional current target in the event chain
   */
  currentTarget?: unknown;
  
  /**
   * Optional last return value from an observer
   */
  lastReturnValue?: unknown;
}

/**
 * Configuration options for an observer
 */
export interface ObserverOptions {
  /**
   * Bit mask for selective notification
   */
  mask?: number;
  
  /**
   * Scope in which to execute the callback
   */
  scope?: unknown;
  
  /**
   * Whether to insert at the beginning of the observer list
   */
  insertFirst?: boolean;
}

/**
 * Represents a registered observer instance
 * @template T The type of data the observer handles
 */
export interface ObserverHandle<T> {
  /**
   * The callback function
   */
  callback: Observer<T>;
  
  /**
   * Optional mask for filtering
   */
  mask?: number;
  
  /**
   * Optional scope for execution
   */
  scope?: unknown;
  
  /**
   * Whether observer is currently active
   */
  unregisterOnNextCall?: boolean;
}

/**
 * Observable class for implementing the observer pattern.
 * Allows multiple observers to subscribe to notifications.
 * 
 * @template T The type of event data
 */
export declare class Observable<T = void> {
  /**
   * List of registered observers
   */
  private _observers: Array<ObserverHandle<T>>;
  
  /**
   * Optional event state
   */
  private _eventState?: EventState;
  
  /**
   * Optional callback executed when first observer is added
   */
  private _onObserverAdded?: (observer: ObserverHandle<T>) => void;
  
  /**
   * Creates a new Observable instance
   * @param onObserverAdded Optional callback when an observer is added
   */
  constructor(onObserverAdded?: (observer: ObserverHandle<T>) => void);
  
  /**
   * Registers an observer callback
   * @param callback The function to call when event is notified
   * @param mask Optional mask for selective notification
   * @param insertFirst Whether to insert at the beginning
   * @param scope Optional execution scope
   * @returns The registered observer handle
   */
  add(
    callback: Observer<T>,
    mask?: number,
    insertFirst?: boolean,
    scope?: unknown
  ): ObserverHandle<T> | null;
  
  /**
   * Registers an observer that will be called only once
   * @param callback The function to call
   * @returns The registered observer handle
   */
  addOnce(callback: Observer<T>): ObserverHandle<T> | null;
  
  /**
   * Removes an observer
   * @param observer The observer handle to remove
   * @returns True if removed successfully
   */
  remove(observer: ObserverHandle<T> | null): boolean;
  
  /**
   * Removes all observers with a specific callback
   * @param callback The callback to match
   * @param scope Optional scope to match
   * @returns True if any observers were removed
   */
  removeCallback(callback: Observer<T>, scope?: unknown): boolean;
  
  /**
   * Notifies all registered observers
   * @param eventData The data to pass to observers
   * @param mask Optional mask to filter observers
   * @param target Optional target object
   * @param currentTarget Optional current target
   * @returns True if notification completed
   */
  notifyObservers(
    eventData: T,
    mask?: number,
    target?: unknown,
    currentTarget?: unknown
  ): boolean;
  
  /**
   * Notifies observers with custom event state
   * @param eventData The data to pass to observers
   * @param eventState Custom event state
   * @returns True if notification completed
   */
  notifyObserversWithState(eventData: T, eventState: EventState): boolean;
  
  /**
   * Whether this observable has any registered observers
   * @returns True if observers are registered
   */
  hasObservers(): boolean;
  
  /**
   * Clears all registered observers
   */
  clear(): void;
  
  /**
   * Creates a new Observable by applying a filter
   * @param predicate Filter function
   * @returns New filtered Observable
   */
  filter(predicate: (eventData: T) => boolean): Observable<T>;
  
  /**
   * Number of registered observers
   */
  readonly length: number;
}

export default Observable;