import type { Vector2, Vector3 } from 'three';
import type { Entity } from './Entity';
import type { Wall } from './Wall';
import type { CornerWindow } from './CornerWindow';
import type { DocumentManager } from './DocumentManager';

/**
 * Information about a wall segment including position and dimensions
 */
interface WallSegmentInfo {
  /** Inner start point of the wall segment */
  innerFrom: HSCore.Util.Math.Vec2;
  /** Inner end point of the wall segment */
  innerTo: HSCore.Util.Math.Vec2;
  /** Outer start point of the wall segment */
  outerFrom: HSCore.Util.Math.Vec2;
  /** Outer end point of the wall segment */
  outerTo: HSCore.Util.Math.Vec2;
  /** Direction vector of the wall segment */
  direction: HSCore.Util.Math.Vec2;
  /** Width/thickness of the wall */
  width: number;
  /** Length of the wall segment */
  length: number;
}

/**
 * Data structure for window side configuration
 */
interface SideData {
  /** Frame width of the side */
  frame: {
    width: number;
  };
  /** Elevation height from ground level */
  elevation: number;
  /** Additional side-specific properties */
  [key: string]: unknown;
}

/**
 * Window opening information for rendering and collision detection
 */
interface OpeningInfo {
  /** Inner start point of the opening */
  innerFrom: HSCore.Util.Math.Vec2;
  /** Inner end point of the opening */
  innerTo: HSCore.Util.Math.Vec2;
  /** Outer start point of the opening */
  outerFrom: HSCore.Util.Math.Vec2;
  /** Outer end point of the opening */
  outerTo: HSCore.Util.Math.Vec2;
  /** Elevation of the opening */
  elevation: number;
  /** Height of the opening */
  height: number;
}

/**
 * Windowsill geometry data
 */
interface SillInfo {
  /** Outline points defining the sill shape */
  points: Vector2[];
  /** Indices for molding rendering */
  moldingIndices: number[];
  /** Elevation of the sill */
  elevation: number;
  /** Height of the sill */
  height?: number;
}

/**
 * Pocket window configuration
 */
interface PocketInfo {
  /** Paths for molding geometry */
  moldingPaths: Vector3[][];
  /** Paths including neighbor wall connections */
  moldingPathsWithNeighbours: Vector3[][];
  /** Inside face paths for rendering */
  insidePaths: Vector3[][];
  /** Profile dimensions */
  profileData?: {
    profileSizeX: number;
    profileSizeY: number;
  };
}

/**
 * Bounding box and outline information
 */
interface BoundingsInfo {
  /** Outer outline of the window */
  outline: Vector2[];
  /** Inner boundary points */
  innerPoints: Vector2[];
  /** Outer boundary points */
  outerPoints: Vector2[];
}

/**
 * Complete parts information for corner flat window
 */
interface PartsInfo {
  /** Side B configuration */
  B?: SideData;
  /** Side C configuration */
  C?: SideData;
  /** Windowsill configuration */
  Sill?: SillInfo;
  /** Ceiling configuration */
  Ceiling?: unknown;
  /** Opening for side B */
  openingB?: OpeningInfo;
  /** Opening for side C */
  openingC?: OpeningInfo;
  /** Pocket window configuration */
  Pocket?: PocketInfo;
  /** Bounding geometry */
  boundings?: BoundingsInfo;
}

/**
 * Top projection data for 2D views
 */
interface TopProjectionData {
  /** Outer path outline */
  outPath: Vector2[];
  /** Inner path outline */
  innerPath: Vector2[];
  /** Middle path segment 1 */
  middle1Path?: Vector2[];
  /** Middle path segment 2 */
  middle2Path?: Vector2[];
}

/**
 * Range constraints for window sides
 */
interface SideRange {
  /** Minimum allowed dimension */
  min: number;
  /** Maximum allowed dimension */
  max: number;
}

/**
 * Side dimension constraints
 */
interface SideRangeData {
  /** Range for side B */
  sideBRange: SideRange;
  /** Range for side C */
  sideCRange: SideRange;
}

/**
 * Build context for parts initialization
 */
interface BuildContext {
  /** Whether preview is dirty and needs update */
  previewDirty?: boolean;
}

/**
 * Child model creation configuration
 */
interface ChildModelConfig {
  /** Type of child model to create */
  type: string;
  /** Name of the part this child represents */
  partName: string;
}

/**
 * Window parameters
 */
interface WindowParameters {
  /** Length of side B */
  sideB: number;
  /** Length of side C */
  sideC: number;
  /** Whether to show pocket window */
  showPocket: boolean;
  /** Elevation from ground */
  elevation: number;
  /** Total height of window */
  height: number;
  /** Additional window-specific parameters */
  [key: string]: unknown;
}

/**
 * Corner flat window - a specialized window type that fits at wall corners
 * with two perpendicular sides (B and C) meeting at right angles.
 * 
 * This window type is designed for placement at the intersection of two walls,
 * providing a seamless corner transition with customizable dimensions for each side.
 */
export declare class CornerFlatWindow extends CornerWindow {
  /**
   * Detailed geometry and configuration for all window parts
   */
  partsInfo: PartsInfo;

  /**
   * Window configuration parameters
   */
  __parameters: WindowParameters;

  /**
   * Creates a new corner flat window instance
   * @param id - Optional unique identifier for the window
   * @param parameters - Optional initial parameters
   */
  constructor(id?: string, parameters?: Partial<WindowParameters>);

  /**
   * Factory method to create a corner flat window from metadata
   * @param metadata - Metadata object containing window configuration
   * @returns A new configured CornerFlatWindow instance
   */
  static create(metadata?: unknown): CornerFlatWindow;

  /**
   * Builds detailed geometry information for all window parts including
   * frames, sills, pockets, and openings based on host wall configuration.
   * 
   * This method calculates intersection points, applies dimensional constraints,
   * and generates the complete 3D geometry for rendering.
   * 
   * @param environment - Environment context for building
   * @param context - Optional build context with additional flags
   */
  buildPartsInfo(environment: unknown, context?: BuildContext): void;

  /**
   * Validates whether a given entity can host this corner flat window
   * @param host - Potential host entity (typically a Wall)
   * @returns True if the host is valid for this window type
   */
  isValidHost(host: Entity): boolean;

  /**
   * Gets the top-down 2D projection of the window for floor plan rendering
   * @returns Projection data containing outline and middle paths
   */
  getTopProjection(): TopProjectionData;

  /**
   * Calculates the valid dimension ranges for sides B and C based on
   * the host wall lengths and constraints
   * @returns Range data for both sides
   */
  getSideRangeData(): SideRangeData;

  /**
   * Creates child model entities (openings, holes, etc.) for this window
   * @param environment - Environment context for child creation
   * @returns Array of created child model entities
   */
  createChildModels(environment: unknown): unknown[];

  /**
   * Swaps the dimensions of side B and side C, effectively mirroring
   * the window configuration
   * @private
   */
  _changeSide(): void;

  /**
   * Determines if the window outline uses absolute positioning relative to host
   * @returns Always true for corner flat windows
   * @private
   */
  _isOutlineWithHostAbsolutePosition(): boolean;

  /**
   * Checks if the windowsill should be rendered
   * @returns True if sill is visible
   */
  isShowSill(): boolean;

  /**
   * Gets the host entity (wall) that this window is attached to
   * @returns The host entity or null
   */
  getHost(): Entity | null;

  /**
   * Iterates over all child entities and applies a callback
   * @param callback - Function to apply to each child
   * @param context - Context object for the callback
   */
  forEachChild(callback: (child: Entity) => void, context: unknown): void;

  /**
   * Gets the current elevation of the window
   */
  get elevation(): number;

  /**
   * Gets the current height of the window
   */
  get height(): number;

  /**
   * Gets the length of side B
   */
  get sideB(): number;

  /**
   * Gets the length of side C
   */
  get sideC(): number;

  /**
   * Gets whether pocket window is shown
   */
  get showPocket(): boolean;

  /**
   * Gets the bounding box of the window
   */
  get bound(): {
    width: number;
    height: number;
  };

  /**
   * Accesses underlying window parameters
   */
  get parameters(): WindowParameters;
}