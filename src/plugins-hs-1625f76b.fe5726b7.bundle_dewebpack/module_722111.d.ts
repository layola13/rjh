/**
 * Content replacement transaction request module
 * Handles replacing old content with new content in the HomeStyler application
 */

/**
 * Position coordinates in 3D space
 */
interface Position3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Door stone material information
 */
interface DoorStoneMaterialInfo {
  /** Whether door stone material is enabled */
  isDoorStoneMaterialEnabled: boolean;
  /** The material used for the door stone */
  doorstoneMaterial: unknown;
}

/**
 * Information about the old content being replaced
 */
interface OldContentInfo {
  /** Position in 3D space */
  position: Position3D;
  /** Width of the content */
  width: number;
  /** Height of the content */
  height: number;
  /** Host object containing the content */
  host: unknown;
  /** Parent object of the content */
  parent: unknown;
  /** Rotation angle */
  rotation: number;
  /** Swing direction (for doors/windows) */
  swing: unknown;
  /** Anchor point for positioning */
  anchor: unknown;
  /** Anchor axis for rotation */
  anchorAxis: unknown;
  /** Opening angle */
  angle: number;
  /** Whether the opening is in open state */
  isOpened: boolean;
  /** Door stone material information (for NgOpening types) */
  doorstoneMaterialInfo?: DoorStoneMaterialInfo;
}

/**
 * Snapping strategy configuration
 */
interface SnappingStrategyConfig {
  /** Callback function for snapping behavior */
  doSnappingCallback?: (...args: unknown[]) => unknown;
  /** Callback function for validation */
  vialidatorCallback?: (...args: unknown[]) => unknown;
}

/**
 * Content replacement request transaction
 * Extends the composite request to handle replacing content objects while preserving properties
 */
declare class ContentReplacementRequest extends HSCore.Transaction.Common.CompositeRequest {
  /** The new content to replace with */
  newContent: unknown;
  
  /** The old content being replaced */
  oldContent: unknown;
  
  /** Cached information from the old content */
  oldContentInfo: OldContentInfo;

  /**
   * Creates a new content replacement request
   * @param newContent - The new content object to insert
   * @param oldContent - The old content object to replace
   */
  constructor(newContent: unknown, oldContent: unknown);

  /**
   * Commits the replacement transaction
   * Deletes the old content and applies its properties to the new content
   * @returns The newly inserted content object
   */
  onCommit(): unknown;

  /**
   * Extracts and stores information from the old content
   * @param content - The old content object
   * @returns Information object containing position, dimensions, and other properties
   */
  private _getOldContentInfo(content: unknown): OldContentInfo;

  /**
   * Restores properties from old content to new content
   * Handles positioning, resizing, and assignment to walls
   * @param contentInfo - The cached old content information
   */
  private _restoreProperty(contentInfo: OldContentInfo): void;

  /**
   * Calculates the minimum movement vector to snap content to wall
   * @param content - The content object to snap
   * @param wall - The target wall object
   * @returns Vector with x and y movement values
   */
  private _getMinMoveVecToWall(content: unknown, wall: unknown): { x: number; y: number };

  /**
   * Determines if content should auto-fit to wall by default
   * @param content - The content object to check
   * @returns True if content should auto-fit
   */
  private _getDefAutofit(content: unknown): boolean;

  /**
   * Gets the snapping strategies applicable to the content
   * @param helper - The snapping helper instance
   * @param content - The content object
   * @returns Array of snapping strategy instances
   */
  private _getSnappingStrategies(
    helper: unknown,
    content: unknown
  ): unknown[];
}

export default ContentReplacementRequest;