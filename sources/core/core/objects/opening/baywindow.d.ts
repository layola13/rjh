import type { Vector2, Vector3 } from 'three';

/**
 * Represents geometry data for a window side segment
 */
export interface SideData {
  /** Inner boundary starting point */
  innerFrom: Vector2;
  /** Inner boundary ending point */
  innerTo: Vector2;
  /** Outer boundary starting point */
  outerFrom: Vector2;
  /** Outer boundary ending point */
  outerTo: Vector2;
  /** Width of the side segment */
  width: number;
  /** Whether this side is a wall type */
  isWall: boolean;
  /** Elevation height from ground level */
  elevation: number;
  /** Frame data if applicable */
  frame?: {
    width: number;
  };
  /** Type identifier */
  type?: 'wall' | 'window';
}

/**
 * Window sill geometry configuration
 */
export interface SillData {
  /** 2D points defining the sill outline */
  points: Vector2[];
  /** Vertical elevation offset */
  elevation: number;
  /** Indices for molding application */
  moldingIndices: number[];
  /** Whether molding should be flipped */
  moldingFlip: boolean;
  /** Concrete base width */
  concretWidth?: number;
  /** Concrete base height */
  concretHeight?: number;
  /** Total sill height */
  height?: number;
}

/**
 * Concrete sill base structure
 */
export interface SillConcretData {
  /** 2D boundary points */
  points: Vector2[];
  /** Depth below window base */
  elevation: number;
  /** Thickness of concrete sill */
  height: number;
}

/**
 * Ceiling/header configuration
 */
export interface CeilingData {
  /** Primary boundary points */
  points: Vector2[];
  /** Alternative points for special rendering */
  replacePoints: Vector2[];
  /** Height above floor level */
  elevation: number;
  /** Thickness of ceiling element */
  height?: number;
}

/**
 * Pocket/recess geometry for window installation
 */
export interface PocketData {
  /** Outer molding paths */
  moldingPaths: Vector3[][];
  /** Molding paths including adjacent walls */
  moldingPathsWithNeighbours: Vector3[][];
  /** Interior face paths */
  insidePaths: Vector3[][];
  /** Profile dimensions */
  profileData?: {
    profileSizeX: number;
    profileSizeY: number;
  };
}

/**
 * Opening data for wall penetration
 */
export interface OpeningData {
  /** Inner boundary start */
  innerFrom: Vector2;
  /** Inner boundary end */
  innerTo: Vector2;
  /** Outer boundary start */
  outerFrom: Vector2;
  /** Outer boundary end */
  outerTo: Vector2;
  /** Whether top face needs filling */
  topNeedFill: boolean;
  /** Whether start side needs filling */
  fromSideNeedFill: boolean;
  /** Whether end side needs filling */
  toSideNeedFill: boolean;
  /** X coordinate in world space */
  x: number;
  /** Y coordinate in world space */
  y: number;
  /** Z coordinate (elevation) */
  z: number;
  /** Base elevation */
  elevation: number;
  /** Total height */
  height: number;
}

/**
 * Bounding geometry aggregation
 */
export interface BoundingsData {
  /** Complete outline perimeter */
  outline: Vector2[];
  /** Interior boundary points */
  innerPoints: Vector2[];
  /** Inner boundary polygon */
  innerBound: Vector2[];
  /** Exterior boundary points */
  outerPoints: Vector2[];
}

/**
 * Complete parts information for bay window assembly
 */
export interface PartsInfo {
  /** Left side segment (when facing out) */
  A?: SideData;
  /** Front/main segment */
  B?: SideData;
  /** Right side segment (when facing out) */
  C?: SideData;
  /** Window sill */
  Sill?: SillData;
  /** Concrete sill base */
  SillConcret?: SillConcretData;
  /** Ceiling/header */
  Ceiling?: CeilingData;
  /** Installation pocket */
  Pocket?: PocketData;
  /** Wall opening for main segment */
  openingB?: OpeningData;
  /** Combined bounding geometry */
  boundings?: BoundingsData;
}

/**
 * Valid range constraints for bay window dimensions
 */
export interface SideRangeData {
  /** Allowable range for side A */
  sideARange: {
    min: number;
    max: number;
  };
  /** Allowable range for side B (front) */
  sideBRange: {
    min: number;
    max: number;
  };
  /** Allowable range for side C */
  sideCRange: {
    min: number;
    max: number;
  };
}

/**
 * Top-down projection geometry
 */
export interface TopProjection {
  /** Outer perimeter path */
  outPath?: Vector2[];
  /** Inner perimeter path */
  innerPath?: Vector2[];
  /** First midline path */
  middle1Path?: Vector2[];
  /** Second midline path */
  middle2Path?: Vector2[];
  /** Left wall projection */
  wallA?: Vector2[];
  /** Right wall projection */
  wallD?: Vector2[];
}

/**
 * Child model creation specification
 */
export interface ChildModelSpec {
  /** Model type identifier */
  type: string;
  /** Part name reference */
  partName: string;
}

/**
 * Options for geometry rebuilding
 */
export interface BuildOptions {
  /** Skip geometry updates if true */
  previewDirty?: boolean;
}

/**
 * Bay window - a window assembly projecting outward from the main wall plane
 * 
 * Creates a three-sided windowed structure (two angled sides + front)
 * with integrated sill, ceiling, and optional installation pocket
 */
export declare class BayWindow extends CornerWindow {
  /** Parsed geometry data for all window segments */
  partsInfo: PartsInfo;

  /**
   * @param id - Unique identifier for the window instance
   * @param parameters - Initial configuration parameters
   */
  constructor(id?: string, parameters?: unknown);

  /**
   * Factory method to create a new bay window instance
   * 
   * @param metadata - Optional metadata for initialization
   * @returns Newly created bay window with pocket hidden by default
   */
  static create(metadata?: unknown): BayWindow;

  /**
   * Constructs detailed geometry for all window parts
   * 
   * Calculates positions for:
   * - Three window segments (A, B, C)
   * - Sill and concrete base
   * - Ceiling/header
   * - Installation pocket
   * - Wall openings
   * 
   * @param initializedParts - Pre-initialized part data
   * @param options - Build behavior options
   */
  buildPartsInfo(initializedParts?: unknown, options?: BuildOptions): void;

  /**
   * Adjusts attached elements (blinds, shutters, etc.) when window geometry changes
   * 
   * @param oldPartsInfo - Previous geometry state
   * @param newPartsInfo - Updated geometry state
   */
  protected _adjustAttachedContents(oldPartsInfo: PartsInfo, newPartsInfo: PartsInfo): void;

  /**
   * Validates whether an entity can host this bay window
   * 
   * @param host - Potential host entity (typically a Wall)
   * @returns True if host meets bay window requirements
   */
  isValidHost(host: unknown): boolean;

  /**
   * Creates opening entities in host wall(s)
   */
  addOpenings(): void;

  /**
   * Responds to parameter changes
   * 
   * Handles:
   * - Position updates (x, y, z)
   * - Rotation changes
   * - Host wall invalidation
   * 
   * @param fieldName - Changed parameter name
   * @param newValue - New parameter value
   * @param oldValue - Previous parameter value
   */
  onFieldChanged(fieldName: string, newValue: unknown, oldValue: unknown): void;

  /**
   * Computes 2D top-down projection for floor plans
   * 
   * @returns Projection paths including outline, inner bounds, and wall segments
   */
  getTopProjection(): TopProjection;

  /**
   * Calculates valid dimension ranges based on host wall constraints
   * 
   * @returns Minimum and maximum values for each side dimension
   */
  getSideRangeData(): SideRangeData;

  /**
   * Generates child model specifications (openings, pockets, etc.)
   * 
   * @param config - Configuration for child creation
   * @returns Array of child model specifications
   */
  createChildModels(config?: unknown): ChildModelSpec[];

  /**
   * Updates relationship with host wall
   * @internal
   */
  protected _updateHost(): void;

  /**
   * Determines if outline uses absolute positioning relative to host
   * 
   * @returns False - bay windows use relative positioning
   * @internal
   */
  protected _isOutlineWithHostAbsolutePosition(): boolean;

  /**
   * Constructs geometry data for a single side segment
   * @internal
   */
  protected _constructSideData(
    outerFrom: Vector2,
    outerTo: Vector2,
    innerFrom: Vector2,
    innerTo: Vector2,
    width: number,
    isWall: boolean,
    elevation: number
  ): SideData;

  /**
   * Initializes base parts information structure
   * @internal
   */
  protected _initPartsInfo(previous?: unknown): PartsInfo;

  // Inherited from CornerWindow
  sideA: number;
  sideB: number;
  sideC: number;
  height: number;
  elevation: number;
  showPocket: boolean;
  x: number;
  y: number;
  z: number;

  getHost(): unknown;
  forEachChild(callback: (child: unknown) => void, context?: unknown): void;
  getWindowPockets(): unknown[];
  rotateAttachedContents(angleDegrees: number): void;
  dirtyGeometry(): void;
  dirtyPosition(): void;
  isShowSill(): boolean;
  initByMeta(metadata: unknown): void;
  
  protected bound: {
    width: number;
    height: number;
  };
  protected _boundDirty: boolean;
  protected __parameters: Record<string, unknown>;
  protected __ZLength: number;
  protected __XLength: number;
  protected __YLength: number;
  protected __ZRotation: number;
}