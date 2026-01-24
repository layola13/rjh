/**
 * Custom duplicate date data structure
 */
interface CustomDuplicateDate {
  /** Proxy ID for entity reference */
  proxyId: string;
  /** Additional duplicate-related data */
  [key: string]: unknown;
}

/**
 * Transaction interface for undo/redo operations
 */
interface Transaction {
  /** Execute undo operation */
  undo(): void;
  /** Execute redo operation */
  redo(): void;
  /** Prepare redo data after operation */
  prepareRedo(): void;
}

/**
 * Entity proxy object for managing document entities
 */
interface EntityProxy {
  /** Prepare undo data before modifications */
  prepareUndoData(): Transaction;
  /** Load entity from duplicate data */
  loadFromDuplicateData(data: CustomDuplicateDate): unknown | null;
}

/**
 * Content addition configuration
 */
interface AddContentConfig {
  /** Content to be added */
  content: unknown;
  /** Host element (optional) */
  host?: unknown;
  /** Parent layer for the content */
  parent: unknown;
}

/**
 * HSCore namespace declarations
 */
declare namespace HSCore {
  namespace Model {
    namespace EntityProxyFactory {
      /**
       * Get proxy object by proxy ID
       * @param proxyId - The unique identifier for the proxy
       * @returns Entity proxy object or null if not found
       */
      function getProxyObject(proxyId: string): EntityProxy | null;
    }
  }

  namespace Doc {
    /**
     * Get the document manager instance
     * @returns Document manager with active document
     */
    function getDocManager(): {
      activeDocument: {
        scene: {
          activeLayer: unknown;
        };
      };
    };
  }

  namespace Util {
    namespace Content {
      /**
       * Add content to the document
       * @param config - Content addition configuration
       */
      function addContent(config: AddContentConfig): void;
    }
  }

  namespace Transaction {
    namespace Common {
      /**
       * Base class for state request transactions
       */
      class StateRequest {
        /**
         * Called when transaction is committed
         * @param args - Additional arguments
         * @returns Content or null
         */
        onCommit(...args: unknown[]): unknown | null;

        /**
         * Called when transaction is undone
         * @param args - Additional arguments
         */
        onUndo(...args: unknown[]): void;

        /**
         * Called when transaction is redone
         * @param args - Additional arguments
         */
        onRedo(...args: unknown[]): void;
      }
    }
  }
}

/**
 * Custom duplicate date state request for handling entity duplication
 * Extends HSCore's StateRequest to provide undo/redo support
 */
declare class CustomDuplicateDateStateRequest extends HSCore.Transaction.Common.StateRequest {
  /** The custom duplicate date data */
  private customDuplicateDate: CustomDuplicateDate;
  
  /** Transaction for undo/redo operations */
  private transaction?: Transaction;

  /**
   * Create a new custom duplicate date state request
   * @param customDuplicateDate - The duplicate date configuration
   */
  constructor(customDuplicateDate: CustomDuplicateDate);

  /**
   * Commit the duplication transaction
   * Creates content from duplicate data and prepares undo/redo
   * @returns Created content or null if operation fails
   */
  onCommit(): unknown | null;

  /**
   * Create content from duplicate data
   * Loads entity from proxy, prepares transaction, and adds content to document
   * @returns Created content or null if entity not found
   */
  createContent(): unknown | null;

  /**
   * Undo the duplication operation
   * Reverts changes made by the transaction
   */
  onUndo(): void;

  /**
   * Redo the duplication operation
   * Re-applies changes from the transaction
   */
  onRedo(): void;
}

export default CustomDuplicateDateStateRequest;