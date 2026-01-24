import { HSCore } from './635589';
import { ContentUtils } from './416345';

/**
 * Constraint layout application mode
 */
export enum ApplyMode {
  /** Apply layout immediately */
  Immediate = 0,
  /** Apply layout with animation */
  Animated = 1,
  /** Apply layout on next frame */
  Deferred = 2
}

/**
 * Target content object with constraint information
 */
export interface TargetContentObject {
  /** The target content to be constrained */
  targetContent: unknown;
  /** Additional constraint metadata */
  [key: string]: unknown;
}

/**
 * Result of constraint layout computation
 */
export interface ConstraintResult {
  /** Array of target content objects with constraints */
  targetCOs: TargetContentObject[];
  /** The room entity object being laid out */
  roomEntityObject: unknown;
}

/**
 * Interface for constraint layout operations
 */
export interface IConstraintLayout {
  /**
   * Compute constraints for the layout
   * @param mode - The application mode for the layout
   * @returns Promise resolving to constraint computation result
   */
  constraint(mode: ApplyMode): Promise<ConstraintResult>;
  
  /**
   * Post-process instantiated contents after constraint application
   * @param instantiatedContents - The instantiated fake contents
   * @param targetCOs - Target content objects with constraints
   * @param roomEntityObject - The room entity object
   * @returns Promise that resolves when post-processing completes
   */
  postProcess(
    instantiatedContents: unknown[],
    targetCOs: TargetContentObject[],
    roomEntityObject: unknown
  ): Promise<void>;
}

/**
 * Request to apply constraint-based layout to content objects.
 * 
 * This transaction request computes and applies layout constraints,
 * instantiates fake content representations, and performs post-processing.
 * 
 * @extends {HSCore.Transaction.Common.StateRequest}
 */
export declare class ApplyLayoutRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * The constraint layout configuration to apply
   */
  constraintLayout: IConstraintLayout;
  
  /**
   * The mode in which to apply the layout
   */
  applyMode: ApplyMode;
  
  /**
   * Creates a new ApplyLayoutRequest
   * @param constraintLayout - The constraint layout to apply
   * @param applyMode - The application mode for the layout
   */
  constructor(constraintLayout: IConstraintLayout, applyMode: ApplyMode);
  
  /**
   * Execute the layout request asynchronously.
   * 
   * Performs the following steps:
   * 1. Computes constraints using the configured layout
   * 2. Instantiates fake content representations
   * 3. Executes post-processing on the instantiated contents
   * 
   * @returns Promise that resolves when the request completes
   * @throws Logs errors to console if constraint application fails
   */
  doRequest(): Promise<void>;
  
  /**
   * Commit handler called when the transaction is committed
   * @returns Promise that resolves when commit completes
   */
  onCommitAsync(): Promise<void>;
  
  /**
   * Undo handler called when the transaction is undone
   */
  onUndo(): void;
  
  /**
   * Redo handler called when the transaction is redone
   */
  onRedo(): void;
  
  /**
   * Indicates whether this request can participate in field transactions
   * @returns Always returns true
   */
  canTransactField(): boolean;
}