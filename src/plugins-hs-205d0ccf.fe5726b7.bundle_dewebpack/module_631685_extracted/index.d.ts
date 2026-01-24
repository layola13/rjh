/**
 * Module Bundle Type Definitions
 * 
 * This file contains type declarations for the bundled modules.
 * Each module is exported with appropriate type signatures.
 */

/**
 * Event handler module for click events
 * Handles user click interactions and triggers associated callbacks
 */
export declare module 'module_onclick' {
  /**
   * Click event handler function
   * @param event - The mouse event triggered by user interaction
   * @returns void or a promise that resolves when the handler completes
   */
  export function onClick(event: MouseEvent): void | Promise<void>;
  
  /**
   * Register a click event listener
   * @param element - The DOM element to attach the listener to
   * @param callback - The callback function to execute on click
   */
  export function registerClickHandler(
    element: HTMLElement,
    callback: (event: MouseEvent) => void
  ): void;
}

/**
 * Utility function module
 * Contains general-purpose helper functions
 */
export declare module 'module_f' {
  /**
   * Generic utility function
   * @template T - The input type
   * @template R - The return type
   * @param input - The input value to process
   * @returns The processed result
   */
  export function f<T, R>(input: T): R;
}

/**
 * Event management module
 * Handles event creation, dispatching, and lifecycle management
 */
export declare module 'module_e' {
  /**
   * Event object interface
   */
  export interface CustomEvent<T = unknown> {
    type: string;
    data: T;
    timestamp: number;
    target?: EventTarget;
  }
  
  /**
   * Create and dispatch a custom event
   * @template T - The event data type
   * @param type - The event type identifier
   * @param data - The event payload data
   */
  export function e<T>(type: string, data: T): void;
}

/**
 * Notification module
 * Manages user notifications and alerts
 */
export declare module 'module_n' {
  /**
   * Notification severity levels
   */
  export type NotificationLevel = 'info' | 'warning' | 'error' | 'success';
  
  /**
   * Notification configuration options
   */
  export interface NotificationOptions {
    level: NotificationLevel;
    message: string;
    duration?: number;
    dismissible?: boolean;
  }
  
  /**
   * Display a notification to the user
   * @param options - The notification configuration
   */
  export function n(options: NotificationOptions): void;
}

/**
 * State management module
 * Handles application state and storage operations
 */
export declare module 'module_s' {
  /**
   * State container interface
   */
  export interface State<T = Record<string, unknown>> {
    data: T;
    lastModified: Date;
  }
  
  /**
   * Get or set application state
   * @template T - The state data type
   * @param key - The state key identifier
   * @param value - Optional value to set (omit to get current value)
   * @returns The current or updated state value
   */
  export function s<T>(key: string, value?: T): T | undefined;
}

/**
 * Value management module
 * Handles value transformations and validations
 */
export declare module 'module_value' {
  /**
   * Value validator function type
   */
  export type Validator<T> = (input: unknown) => input is T;
  
  /**
   * Value transformer function type
   */
  export type Transformer<TInput, TOutput> = (input: TInput) => TOutput;
  
  /**
   * Get, validate, or transform a value
   * @template T - The expected value type
   * @param input - The input value
   * @param validator - Optional validator function
   * @returns The validated or transformed value
   */
  export function value<T>(input: unknown, validator?: Validator<T>): T;
}

/**
 * Root-level exports
 * Main API surface for common operations
 */

/**
 * Global click event handler
 * @param event - The mouse event from user interaction
 */
export declare function onClick(event: MouseEvent): void;

/**
 * Global onclick property (legacy support)
 * @deprecated Use onClick function instead
 */
export declare const onclick: ((event: MouseEvent) => void) | null;

/**
 * Module registry for dynamic imports
 */
export declare const moduleRegistry: {
  readonly onClick: typeof import('module_onclick');
  readonly f: typeof import('module_f');
  readonly e: typeof import('module_e');
  readonly n: typeof import('module_n');
  readonly s: typeof import('module_s');
  readonly value: typeof import('module_value');
};