/**
 * Transaction request for removing a paragraph assembly from the content.
 * Handles undo/redo operations for paragraph assembly removal.
 */
declare class RemovePAssemblyRequest extends HSCore.Transaction.Request {
  /**
   * The paragraph assembly element to be removed
   * @private
   */
  private _passembly: unknown;

  /**
   * Specification of the paragraph assembly, stored for undo operations
   * @private
   */
  private _spec: unknown;

  /**
   * Creates a new RemovePAssemblyRequest instance
   * @param passembly - The paragraph assembly element to remove
   */
  constructor(passembly: unknown);

  /**
   * Executes the removal operation
   * Stores the assembly specification and removes the assembly from content
   * @returns The removed paragraph assembly element
   */
  onCommit(): unknown;

  /**
   * Reverts the removal operation
   * Restores the paragraph assembly using the stored specification
   */
  onUndo(): void;

  /**
   * Re-executes the removal operation after an undo
   * Removes the paragraph assembly again
   */
  onRedo(): void;

  /**
   * Gets the category of this transaction for logging purposes
   * @returns The content operation log group type
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}

export default RemovePAssemblyRequest;

/**
 * Global namespace declarations for external dependencies
 */
declare namespace HSCore {
  namespace Transaction {
    /**
     * Base class for transaction requests supporting undo/redo
     */
    class Request {
      onCommit(): unknown;
      onUndo(): void;
      onRedo(): void;
      getCategory(): unknown;
    }
  }

  namespace Util {
    namespace Content {
      /**
       * Retrieves the specification of a paragraph assembly
       * @param passembly - The paragraph assembly element
       * @returns The assembly specification
       */
      function getPAssemblySpec(passembly: unknown): unknown;

      /**
       * Removes a paragraph assembly from the content
       * @param passembly - The paragraph assembly element to remove
       */
      function removePAssembly(passembly: unknown): void;

      /**
       * Adds a paragraph assembly to the content
       * @param spec - The specification of the assembly to add
       */
      function addPAssembly(spec: unknown): void;
    }
  }
}

declare namespace HSFPConstants {
  /**
   * Enum-like object defining log group types for categorizing operations
   */
  const enum LogGroupTypes {
    ContentOperation = "ContentOperation"
  }
}