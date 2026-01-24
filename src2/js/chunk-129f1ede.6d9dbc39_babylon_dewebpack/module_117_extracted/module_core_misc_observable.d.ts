/**
 * Observable module - Core utility for event handling and observation patterns
 * Provides type definitions for the observable pattern implementation
 */

/**
 * Represents a module that exports an observable implementation.
 * This module likely provides the core Observable class and related utilities
 * for managing event subscriptions and notifications.
 */
declare module 'core/Misc/observable' {
  /**
   * Generic observable class for event handling
   * @template T - The type of data passed to observers when the observable notifies
   */
  export class Observable<T = unknown> {
    /**
     * Adds an observer callback to this observable
     * @param callback - Function to be called when the observable notifies
     * @returns Observer handle that can be used to remove the observer
     */
    add(callback: (eventData: T) => void): Observer<T>;
    
    /**
     * Removes an observer from this observable
     * @param observer - The observer to remove
     * @returns True if the observer was found and removed
     */
    remove(observer: Observer<T>): boolean;
    
    /**
     * Notifies all observers with the provided event data
     * @param eventData - Data to pass to all observer callbacks
     */
    notifyObservers(eventData: T): void;
    
    /**
     * Clears all observers from this observable
     */
    clear(): void;
    
    /**
     * Checks if this observable has any observers
     * @returns True if there are one or more observers
     */
    hasObservers(): boolean;
  }
  
  /**
   * Represents a registered observer instance
   * @template T - The type of data the observer receives
   */
  export interface Observer<T = unknown> {
    /** The callback function invoked when notified */
    callback: (eventData: T) => void;
    
    /** Unique identifier for this observer */
    id?: number;
    
    /** Optional scope/context for the callback execution */
    scope?: unknown;
  }
  
  export default Observable;
}