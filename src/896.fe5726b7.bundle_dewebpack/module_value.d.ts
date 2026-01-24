/**
 * User authentication and session management interfaces
 */

/**
 * Login event data containing user authentication status
 */
interface LoginEventData {
  /** Indicates whether the user is currently logged in */
  isLogin: boolean;
}

/**
 * Event object passed to login completion listeners
 */
interface LoginCompletedEvent {
  /** The login event data payload */
  data: LoginEventData | null;
}

/**
 * Login completion signal that notifies listeners when login status changes
 */
interface LoginCompletedSignal {
  /**
   * Registers a listener callback to be invoked when login is completed
   * @param callback - Function to execute when login status changes
   */
  listen(callback: (event: LoginCompletedEvent) => void): void;
}

/**
 * User authentication service
 */
interface AdskUser {
  /**
   * Checks if the user is currently logged in
   * @returns true if user is authenticated, false otherwise
   */
  isLogin(): boolean;

  /**
   * Signal that fires when user login process completes
   */
  signalLoginCompleted: LoginCompletedSignal;
}

/**
 * Global user authentication instance
 */
declare const adskUser: AdskUser;

/**
 * Module that initializes user data based on authentication state
 * 
 * @remarks
 * This module checks the current login status:
 * - If user is already logged in, initializes data immediately
 * - If user is not logged in, waits for login completion signal before initializing
 * 
 * @module module_value
 * @originalId value
 */
declare class ModuleValue {
  /**
   * Initializes module data after successful authentication
   * 
   * @remarks
   * This method should be called only after the user has been authenticated
   */
  initData(): void;

  /**
   * Constructor that sets up authentication-based initialization
   * 
   * @remarks
   * - Immediately calls {@link initData} if user is already logged in
   * - Otherwise registers a listener on {@link AdskUser.signalLoginCompleted}
   *   to initialize data when login completes
   */
  constructor();
}

export { ModuleValue, AdskUser, LoginCompletedSignal, LoginCompletedEvent, LoginEventData };