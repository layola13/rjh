/**
 * Door swing flip operation state request
 * Manages the transition of door swing directions for various door types
 */

import { HSCore } from 'HSCore';

/**
 * Enumeration of door swing directions
 * 0: Right, 1: Left, 2: Down, 3: Up (inferred from mapping logic)
 */
type SwingDirection = 0 | 1 | 2 | 3;

/**
 * Door opening entity with content type and swing properties
 */
interface DoorOpening {
  /** Current swing direction of the door */
  swing: SwingDirection;
  
  /** Content type information for the door */
  contentType: {
    /**
     * Checks if the door is of a specific type
     * @param contentType - The content type to check against
     */
    isTypeOf(contentType: HSCatalog.ContentTypeEnum): boolean;
  };
  
  /**
   * Rebuilds/redraws the door opening
   */
  build(): void;
}

/**
 * Door swing flip transaction class
 * Handles the operation of flipping door swing direction based on door type
 */
declare class DoorSwingFlipStateRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * The door opening being modified
   */
  readonly opening: DoorOpening;
  
  /**
   * The next swing direction after the flip operation
   */
  readonly nextSwing: SwingDirection;
  
  /**
   * Creates a new door swing flip state request
   * @param opening - The door opening to flip
   * @param nextSwing - Optional explicit next swing direction. If undefined, calculated automatically
   */
  constructor(opening: DoorOpening, nextSwing?: SwingDirection);
  
  /**
   * Calculates the next swing direction based on door type
   * - Single swing door: clockwise rotation (0→1→2→3→0)
   * - Double swing door / Folding door: counter-clockwise rotation (0→3→2→1→0)
   * - Double swing door (standard): mirror flip (0↔1, 2↔3)
   * @returns The calculated next swing direction
   */
  getNextSwing(): SwingDirection;
  
  /**
   * Commits the transaction by applying the swing change
   * Updates the opening's swing property and rebuilds it
   */
  onCommit(): void;
  
  /**
   * Determines if this field can be transacted
   * @returns Always true for door swing operations
   */
  canTransactField(): boolean;
  
  /**
   * Gets the user-facing description of this operation
   * @returns "翻转操作" (Flip operation)
   */
  getDescription(): string;
  
  /**
   * Gets the log category for this operation
   * @returns Content operation log group type
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}

/**
 * HSCatalog content type enumeration (partial)
 */
declare namespace HSCatalog {
  enum ContentTypeEnum {
    /** Single swing door */
    AdoubleSwingDoor = 'AdoubleSwingDoor',
    
    /** Folding door */
    FoldingDoor = 'FoldingDoor',
    
    /** Double swing door */
    DoubleSwingDoor = 'DoubleSwingDoor'
  }
}

/**
 * HSFPConstants log types (partial)
 */
declare namespace HSFPConstants {
  enum LogGroupTypes {
    /** Content operation log category */
    ContentOperation = 'ContentOperation'
  }
}

export default DoorSwingFlipStateRequest;