/**
 * Module: NCustomizedParametricBackgroundWall_IO
 * Customized parametric background wall component for interior design
 * Provides automatic fitting and positioning against wall faces
 */

import { Entity } from './Entity';
import { PmWallSDK } from './PmWallSDK';
import { Vector3, Matrix4, Line3d } from './Math';
import { NCPBackgroundWallBase, NCPBackgroundWallBase_IO } from './NCPBackgroundWallBase';
import { TransUtil } from './TransUtil';
import { Face } from './Face';
import { Floor } from './Floor';
import { NCPBackgroundWallBaseUtil } from './NCPBackgroundWallBaseUtil';

/**
 * Face information for wall mounting
 */
export interface TargetFaceInfo {
  /** New outer boundary points (takes precedence over outer) */
  newOuter?: Vector3[];
  /** Original outer boundary points */
  outer?: Vector3[];
  /** Hole regions within the face */
  holes?: Vector3[][];
}

/**
 * Wall dimension and position data
 */
export interface WallDimensionData {
  /** Width in meters */
  W: number;
  /** Depth in meters */
  D: number;
  /** Height in meters */
  H: number;
}

/**
 * Metadata containing position and size information
 */
export interface ModelMetadata {
  /** 3D position */
  position: {
    x: number;
    y: number;
    z: number;
  };
  /** Y-axis length in meters */
  yLength: number;
}

/**
 * Data structure for model updates
 */
export interface ModelUpdateData {
  /** System parameters (dimensions) */
  systemParams?: WallDimensionData;
  /** Metadata (position, rotation, etc.) */
  meta?: ModelMetadata;
}

/**
 * Extra parameters for opening/initializing documents
 */
export interface OpenDocumentExtra {
  /** Width, depth, height dimensions */
  wdh?: WallDimensionData;
  /** Unit scale factor (default: 0.001 for mm to m) */
  unitScale: number;
  /** Wall line reference */
  wallLine?: unknown;
  /** Skip automatic position calculation */
  dontCalcPosition: boolean;
  /** Calculate position using W/D/H values */
  calcPosWithWDH: boolean;
  /** Use min/max constraints */
  useMinMax: boolean;
}

/**
 * Valid regions for wall placement (outer boundary and holes)
 */
export interface ValidRegion {
  /** Outer boundary as line segments */
  outer: Line3d[];
  /** Holes as arrays of line segments */
  holes: Line3d[][];
}

/**
 * Parameters for wall data calculation
 */
export interface WallDataParams {
  /** New parameter values */
  newParams: Record<string, unknown>;
  /** Valid placement region */
  validRegion?: ValidRegion;
  /** Whether to patch/validate the region */
  patchValidRegion: boolean;
}

/**
 * Options for wall data calculation
 */
export interface WallDataOptions {
  /** Wall line reference */
  wallLine?: unknown;
  /** Use min/max constraints */
  useMinMax: boolean;
}

/**
 * I/O handler for NCustomizedParametricBackgroundWall
 * Handles serialization/deserialization of wall data
 */
export declare class NCustomizedParametricBackgroundWall_IO extends NCPBackgroundWallBase_IO {
  // Inherits serialization methods from base class
}

/**
 * Customized parametric background wall component
 * Automatically fits and positions against wall faces with advanced clipping
 */
export declare class NCustomizedParametricBackgroundWall extends NCPBackgroundWallBase {
  /**
   * Signal hook for listening to host entity changes
   * @private
   */
  private _singleHooKOnHost: HSCore.Util.SignalHook<this>;

  /**
   * Whether to use min/max size constraints
   */
  useMinMax: boolean;

  /**
   * Model parameters including auto-fit and face info
   */
  parameters: {
    /** Enable automatic fitting to target face */
    isAutoFit?: boolean;
    /** Target wall face information */
    targetFaceInfo?: TargetFaceInfo;
  };

  /**
   * X-axis dimension in meters
   */
  XLength: number;

  /**
   * Y-axis dimension in meters
   */
  YLength: number;

  /**
   * Z-axis dimension in meters
   */
  ZLength: number;

  /**
   * X-axis scale factor
   */
  XScale: number;

  /**
   * Y-axis scale factor
   */
  YScale: number;

  /**
   * Z-axis scale factor
   */
  ZScale: number;

  /**
   * X position in world space
   */
  x: number;

  /**
   * Y position in world space
   */
  y: number;

  /**
   * Z position in world space
   */
  z: number;

  /**
   * Reference to the document
   */
  doc: {
    designMetadata: Map<string, unknown>;
  };

  /**
   * Property record for storing custom properties
   */
  propertyRecord: Record<string, unknown> | undefined;

  /**
   * Host entity (typically a Face)
   */
  host: Face | unknown;

  /**
   * @param id - Unique identifier for the wall instance
   * @param parent - Parent entity in the scene graph
   */
  constructor(id?: string, parent?: unknown);

  /**
   * Initialize the background wall with target face information
   * @param faceInfo - Target wall face data
   * @param usePropertyRecord - Whether to use stored property record
   */
  initBackgroundWall(faceInfo: TargetFaceInfo, usePropertyRecord?: boolean): void;

  /**
   * Get extra parameters needed for document initialization
   * @param faceInfo - Target face information
   * @param forceUseMinMax - Override min/max constraint setting
   * @returns Configuration for opening the wall document
   */
  getOpenDocumentExtra(faceInfo: TargetFaceInfo, forceUseMinMax?: boolean): OpenDocumentExtra;

  /**
   * Update the 3D model from external data
   * @param data - Update data containing dimensions and metadata
   * @param skipPositionUpdate - Skip position recalculation
   */
  updateModelFromData(data: ModelUpdateData, skipPositionUpdate?: boolean): void;

  /**
   * Update position from metadata
   * @param meta - Metadata containing position information
   * @param skipUpdate - Skip the actual update
   */
  updatePositionFromMeta(meta: ModelMetadata, skipUpdate?: boolean): void;

  /**
   * Adjust Y-axis position based on scale change
   * @param yLength - Original Y length
   * @param yScale - New Y scale factor
   */
  updateYPosition(yLength: number, yScale: number): void;

  /**
   * Initialize the model document with parameters
   * @param params - Parameters including target face info
   * @param skipBrep - Skip BREP construction
   * @param usePropertyRecord - Use stored property record
   */
  initModelDocument(params: { targetFaceInfo?: TargetFaceInfo }, skipBrep?: boolean, usePropertyRecord?: boolean): void;

  /**
   * Initialize background wall document with face info
   * @param faceInfo - Target face information
   * @param skipBrep - Skip BREP construction
   * @param usePropertyRecord - Use stored property record
   */
  initBackgroundWallDocument(faceInfo: TargetFaceInfo, skipBrep?: boolean, usePropertyRecord?: boolean): void;

  /**
   * Calculate wall data for rendering/construction
   * @param param1 - First parameter (context-dependent)
   * @param param2 - Second parameter (context-dependent)
   * @param dimensions - Dimension overrides
   * @param forceUseMinMax - Override min/max constraint setting
   * @returns Calculated wall data
   */
  getWallData(param1: unknown, param2: unknown, dimensions: Record<string, unknown>, forceUseMinMax?: boolean): unknown;

  /**
   * Get valid regions for wall placement (excluding holes)
   * @param faceInfo - Target face information
   * @returns Valid regions or undefined if face is not divisible
   * @private
   */
  private _getValidRegions(faceInfo?: TargetFaceInfo): ValidRegion | undefined;

  /**
   * Check if face can be subdivided (non-rectangular or has holes)
   * @param faceInfo - Face information to check
   * @returns True if face is divisible
   * @private
   */
  private _isFaceInfoDivisible(faceInfo?: TargetFaceInfo): boolean;

  /**
   * Get I/O handler instance for serialization
   * @returns Singleton I/O handler
   */
  getIO(): NCustomizedParametricBackgroundWall_IO;

  /**
   * Get baseboard cutter information for trimming
   * @param fallbackFace - Fallback face if host is not a Face
   * @returns Cutter information
   */
  getBaseboardCutterInfo(fallbackFace?: Face): unknown;

  /**
   * Set the host entity and attach listeners
   * @param host - New host entity
   * @private
   */
  private _setHost(host: Face | unknown): void;

  /**
   * Listen to geometry changes on host face
   * @param host - Host entity to listen to
   * @private
   */
  private _listenSignalOnHost(host: Face | unknown): void;

  /**
   * Mirror the wall across a plane
   * @param mirrorPlane - Plane definition with transformation matrix
   */
  mirror(mirrorPlane: { matrix4: Matrix4 }): void;

  /**
   * Open the parametric document for this wall
   * @param faceInfo - Target face information
   * @param usePropertyRecord - Use stored property record
   */
  openDocument(faceInfo: TargetFaceInfo, usePropertyRecord?: boolean): void;

  /**
   * Construct BREP geometry for the wall
   * @param propertyRecord - Property overrides
   * @param skipBrep - Skip BREP construction
   * @param usePropertyRecord - Use stored property record
   */
  constructBrep(propertyRecord?: Record<string, unknown>, skipBrep?: boolean, usePropertyRecord?: boolean): void;

  /**
   * Get face info by size when target face is unavailable
   * @param partialInfo - Partial face information
   * @returns Complete face information
   */
  getTargetFaceInfoBySize(partialInfo?: Partial<TargetFaceInfo>): TargetFaceInfo;

  /**
   * Get information derived from target face
   * @param faceInfo - Target face information
   * @returns Derived information (wdh, wallLine, etc.)
   */
  getInfoByTargetFace(faceInfo: TargetFaceInfo): { wdh?: WallDimensionData; wallLine?: unknown };

  /**
   * Update size from metadata
   * @param meta - Metadata containing size information
   */
  updateSizeFromMeta(meta: ModelMetadata): void;

  /**
   * Mark clip geometry as dirty (needs recalculation)
   */
  dirtyClipGeometry(): void;

  /**
   * Mark material as dirty (needs update)
   */
  dirtyMaterial(): void;

  /**
   * Mark child models as dirty
   * @param geometry - Update geometry
   * @param material - Update material
   * @param transform - Update transform
   */
  dirtyChildModels(geometry?: boolean, material?: boolean, transform?: boolean): void;
}

/**
 * Register the class with the entity system
 */
Entity.registerClass(HSConstants.ModelClass.NCustomizedParametricBackgroundWall, NCustomizedParametricBackgroundWall);