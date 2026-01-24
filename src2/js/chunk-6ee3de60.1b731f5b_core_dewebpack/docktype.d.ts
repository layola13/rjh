/**
 * Module: DockType
 * Contains types and classes for managing docking relationships between window components
 * (frames, mullions, sashes, tracks)
 */

/**
 * Basic dock type enumeration
 * Represents the fundamental types of components that can be docked to
 */
export enum DockType {
  /** No docking */
  None = 0,
  /** Dock to frame (outer boundary) */
  Frame = 1,
  /** Dock to mullion (divider bar) */
  Mullion = 2,
  /** Dock to sash (movable window panel) */
  Sash = 3
}

/**
 * Complex dock type enumeration including sliding window track types
 * Extended classification for sliding/sliding-folding windows
 */
export enum CCDockType {
  None = 0,
  Frame = 1,
  Mullion = 2,
  /** Upper sliding track */
  UpTrack = 3,
  /** Fixed upper track */
  FixedUpTrack = 4,
  /** Lower sliding track */
  DownTrack = 5,
  /** Fixed lower track */
  FixedDownTrack = 6,
  /** Combined up-down track */
  UpDownTrack = 7,
  /** Side sliding track */
  SideTrack = 8,
  /** Double side track */
  DoubleSideTrack = 9
}

/**
 * Bar position type enumeration
 * Represents all possible combinations of start/end dock positions
 */
export enum BarPositionType {
  NoneNone = 0,
  NoneFrame = 1,
  NoneMullion = 2,
  FrameFrame = 3,
  FrameMullion = 4,
  MullionMullion = 5,
  SideTrackSideTrack = 6,
  SideTrackFrame = 7,
  SideTrackMullion = 8,
  UpTrackFrame = 9,
  UpTrackMullion = 10,
  UpTrackDownTrack = 11,
  DownTrackFrame = 12,
  FixedUpTrackFrame = 13,
  FixedUpTrackMullion = 14,
  FixedUpTrackDownTrack = 15,
  FixedUpTrackFixedDownTrack = 16,
  FixedDownTrackFrame = 17,
  FixedDownTrackMullion = 18,
  FixedDownTrackUpTrack = 19,
  UpTrackUpDownTrack = 20,
  UpDownTrackUpDownTrack = 21,
  DownTrackUpDownTrack = 22,
  FixedDownTrackUpDownTrack = 23,
  FixedUpTrackUpDownTrack = 24,
  SideTrackNone = 25,
  DoubleSideTrackSideTrack = 26,
  DoubleSideTrackFrame = 27,
  DoubleSideTrackMullion = 28,
  DoubleSideTrackNone = 29,
  DoubleSideTrackDoubleSideTrack = 30,
  NoneFixedUpTrack = 31,
  NoneUpTrack = 32
}

/**
 * Polygon/Shape identifier
 * Represents a unique identifier for geometric shapes
 */
export interface PolyId {
  clone(): PolyId;
  equalTo(other: PolyId): boolean;
}

/**
 * Shape type enumeration (imported from module 1)
 */
export enum ShapeType {
  SideTrack = 'SideTrack',
  DoubleSideTrack = 'DoubleSideTrack',
  UpTrack = 'UpTrack',
  FixedUpTrack = 'FixedUpTrack',
  DownTrack = 'DownTrack',
  FixedDownTrack = 'FixedDownTrack',
  UpDownTrack = 'UpDownTrack'
}

/**
 * Bar entity with shape type and polygon ID
 */
export interface Bar {
  type: ShapeType;
  id: PolyId;
}

/**
 * Window configuration interface
 * Provides methods to query window structure
 */
export interface WindowConfig {
  /**
   * Find a bar (mullion/track) by its polygon ID
   * @param id - The polygon identifier to search for
   * @returns The bar if found, undefined otherwise
   */
  findBarByPolyId(id: PolyId): Bar | undefined;
}

/**
 * Represents a single docking point
 * Defines what a component is docked to (frame, mullion, sash, or nothing)
 */
export declare class Dock {
  /** Type of component being docked to */
  readonly type: DockType;
  
  /** Optional polygon ID identifying the specific component */
  readonly id?: PolyId;

  /**
   * @param type - The dock type (default: None)
   * @param id - Optional polygon identifier for the docked component
   */
  constructor(type?: DockType, id?: PolyId);

  /**
   * Factory method: Create a dock with no attachment
   */
  static None(): Dock;

  /**
   * Factory method: Create a dock to a frame
   * @param frameId - Polygon ID of the frame
   */
  static Frame(frameId: PolyId): Dock;

  /**
   * Factory method: Create a dock to a mullion
   * @param mullionId - Polygon ID of the mullion
   */
  static Mullion(mullionId: PolyId): Dock;

  /**
   * Factory method: Create a dock to a sash
   */
  static Sash(): Dock;

  /**
   * Create a deep copy of this dock
   */
  clone(): Dock;

  /**
   * Check equality with another dock
   * @param other - Dock to compare with
   */
  equalTo(other: Dock): boolean;

  /**
   * Convert to simplified CC dock type (for non-sliding windows)
   * @returns Corresponding CCDockType
   */
  toCCDockTypeSimple(): CCDockType;

  /**
   * Convert to CC dock type for sliding windows
   * @param config - Window configuration to resolve bar types
   * @returns Corresponding CCDockType based on track/bar type
   */
  toCCDockTypeSlide(config: WindowConfig): CCDockType;

  /**
   * Retrieve the bar (mullion/track) this dock references
   * @param config - Window configuration to search in
   * @returns The bar if found, undefined otherwise
   */
  dockBar(config: WindowConfig): Bar | undefined;
}

/**
 * Represents docking configuration for an endpoint (start and end points)
 * Used for edges/bars that have two endpoints
 */
export declare class EndpointDock {
  /** Dock configuration for start point */
  stDock: Dock;
  
  /** Dock configuration for end point */
  etDock: Dock;

  /**
   * @param stDock - Start point dock (default: None)
   * @param etDock - End point dock (default: None)
   */
  constructor(stDock?: Dock, etDock?: Dock);

  /**
   * Mapping of position types to [start, end] CCDockType pairs
   */
  private readonly posTypesMap: Map<BarPositionType, [CCDockType, CCDockType]>;

  /**
   * Create a deep copy of this endpoint dock
   */
  clone(): EndpointDock;

  /**
   * Set dock for start or end point
   * @param isStart - true for start point, false for end point
   * @param dock - The dock configuration to set
   */
  setDock(isStart: boolean, dock: Dock): void;

  /**
   * Determine the position type based on start/end dock types
   * @param config - Optional window configuration for sliding window logic
   * @returns The bar position type classification
   */
  posType(config?: WindowConfig): BarPositionType;
}

/**
 * Collection of docks for an edge
 * Manages multiple docking points along an edge
 */
export declare class EdgeDock {
  /** Array of dock configurations */
  docks: Dock[];

  constructor();

  /**
   * Create a deep copy of this edge dock collection
   */
  clone(): EdgeDock;
}