/**
 * Molding brush transaction request module
 * Handles undo/redo operations for various molding strategies
 */

/**
 * Target information for molding operations
 */
export interface TargetInfo {
  /** The entity being modified */
  entity: unknown;
  /** Additional target-specific data */
  [key: string]: unknown;
}

/**
 * Data structure for molding operations
 */
export interface MoldingData {
  /** Molding-specific parameters */
  [key: string]: unknown;
}

/**
 * Undo/Redo data structure
 */
export interface UndoRedoData {
  /** State information for undo/redo operations */
  [key: string]: unknown;
}

/**
 * Base interface for molding strategies
 */
export interface IMoldingStrategy {
  /**
   * Get data needed for undo operation
   * @param targetInfo - Information about the target entity
   * @returns Data required to undo the operation
   */
  getUndoData(targetInfo: TargetInfo): UndoRedoData;

  /**
   * Apply the molding operation
   * @param targetInfo - Information about the target entity
   * @param moldingData - Data describing the molding operation
   * @returns The modified entity, or undefined if no change
   */
  apply(targetInfo: TargetInfo, moldingData: MoldingData): unknown | undefined;

  /**
   * Get data needed for redo operation
   * @param targetInfo - Information about the target entity
   * @returns Data required to redo the operation
   */
  getRedoData(targetInfo: TargetInfo): UndoRedoData;

  /**
   * Undo a previously applied operation
   * @param targetInfo - Information about the target entity
   * @param undoData - Data from getUndoData
   */
  undo(targetInfo: TargetInfo, undoData: UndoRedoData): void;

  /**
   * Redo a previously undone operation
   * @param targetInfo - Information about the target entity
   * @param redoData - Data from getRedoData
   */
  redo(targetInfo: TargetInfo, redoData: UndoRedoData): void;
}

/**
 * Supported molding strategy types
 */
export type MoldingStrategyName =
  | "NCustomizedModelMoldingStrategy"
  | "CustomizedModelMoldingStrategy"
  | "CornicesStrategy";

/**
 * Transaction request for molding brush operations
 * Extends HSCore.Transaction.Request to provide undo/redo capabilities
 */
export default class MoldingBrushRequest extends HSCore.Transaction.Request {
  /** Name of the strategy to use */
  private _strategyName: MoldingStrategyName;

  /** Target entity information */
  private _targetInfo: TargetInfo;

  /** Molding operation data */
  private _moldingData: MoldingData;

  /** Data for undo operation */
  private _undoData?: UndoRedoData;

  /** Data for redo operation */
  private _redoData?: UndoRedoData;

  /**
   * Creates a new molding brush transaction request
   * @param strategyName - Name of the molding strategy to use
   * @param targetInfo - Information about the target entity
   * @param moldingData - Data describing the molding operation
   */
  constructor(
    strategyName: MoldingStrategyName,
    targetInfo: TargetInfo,
    moldingData: MoldingData
  );

  /**
   * Commit the transaction - applies the molding operation
   * Stores undo/redo data for later use
   */
  onCommit(): void;

  /**
   * Get the appropriate strategy instance based on strategy name
   * @returns Strategy instance or undefined if not found
   * @private
   */
  private _getStrategy(): IMoldingStrategy | undefined;

  /**
   * Undo the molding operation
   * Restores the target to its previous state
   */
  onUndo(): void;

  /**
   * Redo the molding operation
   * Reapplies the operation after an undo
   */
  onRedo(): void;
}

/**
 * Global HSCore namespace extension
 */
declare global {
  namespace HSCore {
    namespace Transaction {
      /**
       * Base transaction request class
       */
      class Request {
        constructor();
      }
    }
  }
}