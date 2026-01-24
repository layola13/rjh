/**
 * Message handler for managing communication through a message center.
 * Provides methods to listen/unlisten to messages and access connection signals.
 * 
 * @module Handler
 * @originalId 607266
 */

import { MessageCenter } from './messageCenter';

/**
 * Callback function type for message listeners
 */
export type MessageCallback<T = unknown> = (data: T) => void;

/**
 * Connect signal interface for tracking connection state
 */
export interface ConnectSignal {
  readonly isConnected: boolean;
  onConnect(callback: () => void): void;
  onDisconnect(callback: () => void): void;
}

/**
 * Handler class for managing message center operations.
 * Provides a facade for listening to messages and accessing connection signals.
 */
export declare class Handler {
  /**
   * The underlying message center instance used for message routing
   */
  private readonly messageCenter: MessageCenter;

  /**
   * Creates a new Handler instance with an initialized message center
   */
  constructor();

  /**
   * Retrieves the connection signal for monitoring connection state
   * 
   * @returns The connect signal object
   */
  getConnectSignal(): ConnectSignal;

  /**
   * Registers a listener for a specific message type
   * 
   * @param eventName - The name/type of the message to listen for
   * @param callback - The callback function to invoke when the message is received
   * @returns A subscription object or unsubscribe function
   */
  listen<T = unknown>(eventName: string, callback: MessageCallback<T>): void | (() => void);

  /**
   * Unregisters a previously registered listener
   * 
   * @param eventName - The name/type of the message to stop listening for
   * @param callback - The callback function to remove
   * @returns True if the listener was successfully removed, false otherwise
   */
  unlisten<T = unknown>(eventName: string, callback: MessageCallback<T>): boolean | void;
}