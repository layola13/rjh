/**
 * CornerWindow Module
 * 
 * Provides corner window functionality for floor plan designs.
 * Handles corner windows that span two adjacent walls.
 */

import { Vec2 } from '../util/math/Vec2';
import { Wall } from './Wall';
import { Entity } from './Entity';
import { WallUtil } from '../util/WallUtil';
import { ParametricWindow, ParametricWindow_IO } from './ParametricWindow';
import { Logger } from '../util/Logger';
import * as THREE from 'three';

/**
 * Parts information for each side of the corner window
 */
interface SidePartData {
  /** Outer starting point */
  outerFrom: THREE.Vector2;
  /** Outer ending point */
  outerTo: THREE.Vector2;
  /** Inner starting point */
  innerFrom: THREE.Vector2;
  /** Inner ending point */
  innerTo: THREE.Vector2;
  /** Center point */
  from: THREE.Vector2;
  /** Center point */
  to: THREE.Vector2;
  /** Width of the side */
  width: number;
  /** Whether this side is a wall */
  isWall: boolean;
  /** Type of the part */
  type: 'wall' | 'frame';
  /** Frame information */
  frame?: {
    width: number;
  };
  /** Elevation height */
  elevation: number;
}

/**
 * Window opening information
 */
interface OpeningData {
  /** Inner starting point */
  innerFrom: Vec2;
  /** Inner ending point */
  innerTo: Vec2;
  /** Outer starting point */
  outerFrom: Vec2;
  /** Outer ending point */
  outerTo: Vec2;
  /** Whether top needs fill */
  topNeedFill: boolean;
  /** Whether from side needs fill */
  fromSideNeedFill: boolean;
  /** Whether to side needs fill */
  toSideNeedFill: boolean;
  /** Elevation height */
  elevation: number;
  /** Opening height */
  height: number;
}

/**
 * Sill information
 */
interface SillData {
  /** Boundary points */
  points: THREE.Vector2[];
  /** Molding indices */
  moldingIndices: number[];
  /** Elevation height */
  elevation: number;
  /** Concrete width */
  concretWidth?: number;
  /** Concrete height */
  concretHeight?: number;
  /** Sill height */
  height?: number;
}

/**
 * Concrete sill information
 */
interface SillConcretData {
  /** Boundary points */
  points: THREE.Vector2[];
  /** Elevation height */
  elevation: number;
  /** Concrete height */
  height: number;
}

/**
 * Ceiling information
 */
interface CeilingData {
  /** Boundary points */
  points: THREE.Vector2[];
  /** Replacement points */
  replacePoints: THREE.Vector2[];
  /** Elevation height */
  elevation: number;
  /** Ceiling height */
  height?: number;
}

/**
 * Pocket (reveal) information
 */
interface PocketData {
  /** Molding paths */
  moldingPaths: THREE.Vector3[][];
  /** Molding paths including neighbors */
  moldingPathsWithNeighbours: THREE.Vector3[][];
  /** Inside paths */
  insidePaths: THREE.Vector3[][];
  /** Profile data */
  profileData?: {
    profileSizeX: number;
    profileSizeY: number;
  };
}

/**
 * Bounding information
 */
interface BoundingData {
  /** Outline points */
  outline: Vec2[];
  /** Inner boundary points */
  innerPoints: THREE.Vector2[];
  /** Inner bound */
  innerBound: THREE.Vector2[];
  /** Outer points */
  outerPoints: THREE.Vector2[];
}

/**
 * Complete parts information for the corner window
 */
interface PartsInfo {
  /** Side A (first wall side) */
  A?: SidePartData;
  /** Side B (corner transition) */
  B?: SidePartData;
  /** Side C (second wall side) */
  C?: SidePartData;
  /** Side D (opposite corner) */
  D?: SidePartData;
  /** Window sill */
  Sill?: SillData;
  /** Concrete sill */
  SillConcret?: SillConcretData;
  /** Ceiling/header */
  Ceiling?: CeilingData;
  /** Pocket/reveal */
  Pocket?: PocketData;
  /** Opening on side B */
  openingB?: OpeningData;
  /** Opening on side C */
  openingC?: OpeningData;
  /** Bounding geometry */
  boundings?: BoundingData;
}

/**
 * Wall geometric information
 */
interface WallInfo {
  /** Inner starting point */
  innerFrom: Vec2;
  /** Inner ending point */
  innerTo: Vec2;
  /** Outer starting point */
  outerFrom: Vec2;
  /** Outer ending point */
  outerTo: Vec2;
  /** Wall direction vector */
  direction: Vec2;
  /** Transformed direction vector */
  transDirection?: Vec2;
  /** Wall width/thickness */
  width: number;
  /** Wall length */
  length: number;
  /** Next wall info */
  next?: WallInfo;
  /** Previous wall info */
  prev?: WallInfo;
}

/**
 * Side range constraints
 */
interface SideRange {
  /** Minimum allowed value */
  min: number;
  /** Maximum allowed value */
  max: number;
}

/**
 * All side ranges data
 */
interface SideRangeData {
  /** Range for side A */
  sideARange: SideRange;
  /** Range for side B */
  sideBRange: SideRange;
  /** Range for side C */
  sideCRange: SideRange;
  /** Range for side D */
  sideDRange: SideRange;
}

/**
 * Top projection data for 2D view
 */
interface TopProjectionData {
  /** Outer boundary path */
  outPath?: Vec2[];
  /** Inner boundary path */
  innerPath?: Vec2[];
  /** Middle path 1 */
  middle1Path?: THREE.Vector2[];
  /** Middle path 2 */
  middle2Path?: THREE.Vector2[];
  /** Wall A geometry */
  wallA?: THREE.Vector2[];
  /** Wall D geometry */
  wallD?: THREE.Vector2[];
}

/**
 * Child model creation parameters
 */
interface ChildModelParams {
  /** Model type */
  type: string;
  /** Part name identifier */
  partName: string;
}

/**
 * Metadata for initialization
 */
interface WindowMetadata {
  [key: string]: unknown;
}

/**
 * Preview options
 */
interface PreviewOptions {
  /** Whether preview is dirty and needs rebuild */
  previewDirty?: boolean;
}

/**
 * IO handler for CornerWindow serialization and deserialization
 */
export declare class CornerWindow_IO extends ParametricWindow_IO {
  /**
   * Post-load processing after deserialization
   * 
   * @param entity - The corner window entity
   * @param loadContext - Loading context information
   */
  postLoad(entity: CornerWindow, loadContext: unknown): void;
}

/**
 * Corner Window Model
 * 
 * Represents a window that spans across two perpendicular walls at a corner.
 * Handles geometry generation, constraints, and parametric updates.
 */
export declare class CornerWindow extends ParametricWindow {
  /**
   * Parts information containing geometry data for all window components
   */
  partsInfo: PartsInfo;

  /**
   * Factory method to create a corner window instance
   * 
   * @param metadata - Optional initialization metadata
   * @returns New CornerWindow instance
   */
  static create(metadata?: WindowMetadata): CornerWindow;

  /**
   * Build or rebuild parts information for the corner window
   * 
   * Calculates geometry for all window components including:
   * - Four sides (A, B, C, D)
   * - Sill and concrete sill
   * - Ceiling/header
   * - Pockets/reveals
   * - Wall openings
   * 
   * @param partInfo - Optional existing part information
   * @param previewOptions - Optional preview settings
   */
  buildPartsInfo(partInfo?: Partial<PartsInfo>, previewOptions?: PreviewOptions): void;

  /**
   * Check if the given host entity is valid for this corner window
   * 
   * @param host - Potential host entity (typically a Wall)
   * @returns True if host is valid
   */
  isValidHost(host: Entity): boolean;

  /**
   * Get the 2D top-down projection geometry
   * 
   * @returns Top projection data with boundary paths
   */
  getTopProjection(): TopProjectionData;

  /**
   * Get dimensional range constraints for all sides
   * 
   * @returns Range data with min/max values for each side
   */
  getSideRangeData(): SideRangeData;

  /**
   * Create child model entities (e.g., openings, holes)
   * 
   * @param params - Child model parameters
   * @returns Array of created child models
   */
  createChildModels(params: unknown): Entity[];

  /**
   * Mirror the window across an axis
   * 
   * @param axis - Mirror axis specification
   */
  mirror(axis: unknown): void;

  /**
   * Get the IO handler for this entity
   * 
   * @returns IO handler instance
   */
  getIO(): CornerWindow_IO;

  /**
   * Initialize side part data (internal helper)
   * 
   * @param partInfo - Existing part information
   * @returns Initialized parts info
   * @private
   */
  private _initPartsInfo(partInfo?: Partial<PartsInfo>): PartsInfo;

  /**
   * Get wall geometric information (internal helper)
   * 
   * @param wall - Wall entity
   * @returns Wall geometry data
   * @private
   */
  private _getWallInfo(wall: Wall): WallInfo;

  /**
   * Construct geometric data for one side (internal helper)
   * 
   * @param outerFrom - Outer start point
   * @param outerTo - Outer end point
   * @param innerFrom - Inner start point
   * @param innerTo - Inner end point
   * @param width - Side width
   * @param isWall - Whether this side is a wall
   * @returns Constructed side data
   * @private
   */
  private _constructSideData(
    outerFrom: THREE.Vector2,
    outerTo: THREE.Vector2,
    innerFrom: THREE.Vector2,
    innerTo: THREE.Vector2,
    width: number,
    isWall: boolean
  ): SidePartData;

  /**
   * Update host wall relationship (internal helper)
   * @private
   */
  private _updateHost(): void;

  /**
   * Swap side dimensions when mirroring (internal helper)
   * @private
   */
  private _changeSide(): void;

  /**
   * Check if outline uses host absolute positioning (internal helper)
   * @returns True if absolute positioning is used
   * @private
   */
  private _isOutlineWithHostAbsolutePosition(): boolean;

  /**
   * Create child models with specified parameters (internal helper)
   * 
   * @param params - Creation parameters
   * @param childParams - Child model specifications
   * @returns Created child models
   * @private
   */
  private _createChildModels(params: unknown, childParams: ChildModelParams[]): Entity[];
}