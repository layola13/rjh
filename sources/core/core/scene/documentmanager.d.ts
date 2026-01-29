/**
 * Document Manager Module
 * Manages floorplan documents, transactions, and document lifecycle
 */

import { Logger } from './Logger';
import { Floorplan } from './Floorplan';
import { Manager as TransactionManager } from './TransactionManager';
import { Signal, SignalHook } from './Signal';
import { ServiceManager } from './ServiceManager';

/**
 * Metadata object structure for design documents
 */
interface DesignMetadata {
  toObject(): Record<string, unknown>;
  reset(): void;
}

/**
 * Design products mapping structure
 */
type DesignProductsMap = Map<string, unknown>;

/**
 * Document activation event payload
 */
interface DocumentActivatedEvent {
  floorplan: Floorplan;
}

/**
 * Document deactivation event payload
 */
interface DocumentDeactivatedEvent {
  floorplan: Floorplan;
}

/**
 * Document open/new result structure
 */
interface DocumentResult {
  floorplan: Floorplan;
  context: unknown;
}

/**
 * Geometry manager for spatial operations
 */
interface GeometryManager {
  // Geometry management methods
}

/**
 * Association manager for entity relationships
 */
interface AssociationManager {
  // Association management methods
}

/**
 * Transaction request identifier
 */
type TransactionRequest = unknown;

/**
 * DocumentManager - Singleton class managing floorplan documents and transactions
 * 
 * Responsibilities:
 * - Document lifecycle (create, open, clear)
 * - Transaction management
 * - Document dirty state tracking
 * - Signal dispatching for document events
 */
export declare class DocumentManager {
  /**
   * Logger instance for document operations
   */
  readonly logger: Logger;

  /**
   * Transaction manager for undo/redo operations
   */
  readonly transManager: TransactionManager;

  /**
   * Signal dispatched when a document becomes active
   */
  readonly signalDocumentActivated: Signal<DocumentActivatedEvent>;

  /**
   * Signal dispatched when a document is deactivated
   */
  readonly signalDocumentDeactivated: Signal<DocumentDeactivatedEvent>;

  /**
   * Signal dispatched when document metadata changes
   */
  readonly signalMetadataChanged: Signal<Record<string, unknown>>;

  /**
   * Signal dispatched during migration status updates
   */
  readonly signalMigrateStatus: Signal<unknown>;

  /**
   * Internal signal hook for event management
   */
  private readonly _signalHook: SignalHook;

  /**
   * Currently active document instance
   */
  private _activeDocument?: Floorplan;

  /**
   * Last saved transaction request for dirty tracking
   */
  private _lastSavedTransRequest?: TransactionRequest;

  /**
   * Singleton instance holder
   */
  private static _instance?: DocumentManager;

  /**
   * Private constructor - use instance() to get singleton
   */
  private constructor();

  /**
   * Get or create the singleton DocumentManager instance
   * @returns The singleton DocumentManager instance
   */
  static instance(): DocumentManager;

  /**
   * Check if the current floorplan has unsaved changes
   * Compares current transaction state with last saved state
   */
  get isFloorplanDirty(): boolean;

  /**
   * Mark the floorplan as clean (saved) or dirty (modified)
   * @param value - false to mark as clean, true to mark as dirty
   */
  set isFloorplanDirty(value: boolean);

  /**
   * Get the currently active document
   * Creates a new Floorplan if none exists
   */
  get activeDocument(): Floorplan;

  /**
   * Set the active document and dispatch activation signals
   * @param value - The floorplan to activate
   */
  set activeDocument(value: Floorplan);

  /**
   * Set active document without triggering signals
   * Used for internal state management
   * @param document - The floorplan to set as active
   */
  setActiveDocumentSilent(document: Floorplan): void;

  /**
   * Get the design metadata of the active document
   */
  get designMetadata(): DesignMetadata;

  /**
   * Set the design metadata of the active document
   * @param value - The metadata to set
   */
  set designMetadata(value: DesignMetadata);

  /**
   * Get the geometry manager of the active document
   */
  get geometryManager(): GeometryManager;

  /**
   * Get the association manager of the active document
   */
  get associationManager(): AssociationManager;

  /**
   * Initialize the document manager
   * Registers transaction manager with core API
   */
  init(): void;

  /**
   * Open an existing document
   * @param designId - Unique identifier for the design
   * @param contextData - Context data for document opening
   * @param metadata - Additional metadata for the document
   * @param productsMap - Optional pre-loaded design products mapping
   * @returns Promise resolving to the opened floorplan and context
   */
  openDocument(
    designId: string,
    contextData: unknown,
    metadata: unknown,
    productsMap?: DesignProductsMap
  ): Promise<DocumentResult>;

  /**
   * Create a new document
   * @param designId - Unique identifier for the design
   * @param contextData - Context data for document creation
   * @param metadata - Initial metadata for the document
   * @param setActive - Whether to set as active document (default: true)
   * @param productsMap - Optional pre-loaded design products mapping
   * @returns Promise resolving to the new floorplan and context
   */
  newDocument(
    designId: string,
    contextData: unknown,
    metadata: unknown,
    setActive?: boolean,
    productsMap?: DesignProductsMap
  ): Promise<DocumentResult>;

  /**
   * Internal implementation for creating/opening documents
   * @param designId - Unique identifier for the design
   * @param contextData - Context data for the document
   * @param metadata - Document metadata
   * @param setActive - Whether to set as active document
   * @param productsMap - Optional pre-loaded design products mapping
   * @returns Promise resolving to the floorplan and context
   */
  private _newDocument(
    designId: string,
    contextData: unknown,
    metadata: unknown,
    setActive: boolean,
    productsMap?: DesignProductsMap
  ): Promise<DocumentResult>;

  /**
   * Clear the active document and reset all state
   * Clears transactions, metadata, and document data
   */
  clearActiveDocument(): void;

  /**
   * Register dependencies with the Pave system
   * Sets up content types, meta manager, signals, and ID generation
   */
  private _registerPaveDependency(): void;

  /**
   * Register a PT (Product Template) instance with the service manager
   * @param instance - The PT instance to register
   */
  registerPTInstance(instance: unknown): void;
}

/**
 * Get the singleton DocumentManager instance
 * Convenience function for accessing the document manager
 * @returns The singleton DocumentManager instance
 */
export declare function getDocManager(): DocumentManager;