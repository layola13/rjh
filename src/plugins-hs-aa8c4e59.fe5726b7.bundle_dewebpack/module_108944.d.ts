/**
 * Application state management class for handling undo/redo operations and import dialog preferences.
 * 
 * This class maintains the application's transient state including:
 * - User preferences for import confirmation dialogs
 * - Undo/redo operation data stacks
 * - Proxy objects mapping for state management
 * 
 * @module ApplicationState
 */

/**
 * Represents the data structure for undo/redo operations.
 * Contains the necessary information to reverse or replay an action.
 */
export interface UndoRedoData {
  /** The type of operation that was performed */
  operationType?: string;
  /** Snapshot of the state before/after the operation */
  stateSnapshot?: unknown;
  /** Timestamp when the operation occurred */
  timestamp?: number;
  /** Additional metadata for the operation */
  metadata?: Record<string, unknown>;
}

/**
 * Map structure for tracking proxy objects used in state management.
 * Keys are object identifiers, values are the proxied objects.
 */
export type ProxyObjectsMap = Map<string | number, unknown> | Record<string, unknown>;

/**
 * Main application state class that manages user preferences and operation history.
 * 
 * @example
 *