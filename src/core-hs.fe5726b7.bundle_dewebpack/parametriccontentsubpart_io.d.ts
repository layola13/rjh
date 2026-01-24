/**
 * Module: ParametricContentSubpart_IO
 * 
 * This module defines the ParametricContentSubpart entity and its I/O handler.
 * ParametricContentSubpart represents a sub-component within a parametric content model,
 * typically used for nested parametric elements in customized features like curtains or bathroom cabinets.
 */

import { Entity } from './Entity';
import { ParametricContentBase, ParametricContentBase_IO } from './ParametricContentBase';
import { PmWallSDK } from './PmWallSDK';
import { NCustomizedFeatureModelUtil } from './NCustomizedFeatureModelUtil';
import { Vector3, Plane, Matrix4 } from './Math';

/**
 * Entity ID path segment
 */
interface EIdPathSegment {
  /** Entity identifier */
  eId: string;
  /** Index in hierarchy */
  idx: number;
}

/**
 * Size information for parametric content
 */
interface SizeInfo {
  W?: number;
  D?: number;
  H?: number;
}

/**
 * System parameters from SDK data
 */
interface SystemParams {
  /** Width in millimeters */
  W: number;
  /** Depth in millimeters */
  D: number;
  /** Height in millimeters */
  H: number;
}

/**
 * SDK data parameters
 */
interface SDKDataParams {
  /** New parameters to apply */
  newParams: Record<string, unknown>;
  /** Whether to patch valid region */
  patchValidRegion: boolean;
}

/**
 * SDK data options
 */
interface SDKDataOptions {
  /** Whether to use min/max values */
  useMinMax: boolean;
}

/**
 * Model data from SDK
 */
interface ModelData {
  /** System parameters (dimensions) */
  systemParams?: SystemParams;
}

/**
 * Top level identifier information
 */
interface TopLevelId {
  /** Seek ID for the top-level entity */
  seekId?: string;
  /** Entity ID of the top-level entity */
  entityId?: string;
}

/**
 * Extra options for opening parametric content document
 */
interface OpenDocumentExtra {
  /** Width, depth, height dimensions */
  wdh: SizeInfo | undefined;
  /** Unit scale factor (millimeters to meters) */
  unitScale: number;
  /** Whether to skip position calculation */
  dontCalcPosition: boolean;
  /** Whether to calculate position with width/depth/height */
  calcPosWithWDH: boolean;
  /** Entity ID path in hierarchy */
  eIdPath: EIdPathSegment[];
  /** Face IDs to hide in rendering */
  hideFaces?: string[];
  /** Whether to use min/max constraints */
  useMinMax: boolean;
  /** Top-level entity identifier */
  topLevelId: TopLevelId;
}

/**
 * Subpart metadata for updating
 */
interface SubpartMeta {
  /** Entity identifier */
  eId: string;
  /** Document file path or reference */
  docFile: string;
  /** Transformation matrix (4x4) */
  matrix: Matrix4;
  /** Parametric parameters */
  params: Record<string, unknown>;
  /** Visibility flag */
  visible?: boolean;
}

/**
 * Dump options for serialization
 */
interface DumpOptions {
  [key: string]: unknown;
}

/**
 * Load options for deserialization
 */
interface LoadOptions {
  [key: string]: unknown;
}

/**
 * Serialized entity data
 */
interface SerializedData {
  /** Entity identifier */
  eId: string;
  [key: string]: unknown;
}

/**
 * I/O handler for ParametricContentSubpart entities.
 * 
 * Handles serialization and deserialization of subpart data,
 * including entity IDs and parametric properties.
 */
export declare class ParametricContentSubpart_IO extends ParametricContentBase_IO {
  /**
   * Get singleton instance of the I/O handler
   */
  static instance(): ParametricContentSubpart_IO;

  /**
   * Serialize a ParametricContentSubpart entity to JSON-compatible format
   * 
   * @param entity - The entity to serialize
   * @param context - Serialization context (unused in this implementation)
   * @param includeChildren - Whether to include child entities
   * @param options - Additional serialization options
   * @returns Array of serialized data objects
   */
  dump(
    entity: ParametricContentSubpart,
    context?: unknown,
    includeChildren?: boolean,
    options?: DumpOptions
  ): SerializedData[];

  /**
   * Deserialize data into a ParametricContentSubpart entity
   * 
   * @param entity - The target entity to populate
   * @param data - The serialized data to load
   * @param options - Additional deserialization options
   */
  load(
    entity: ParametricContentSubpart,
    data: SerializedData,
    options?: LoadOptions
  ): void;
}

/**
 * Represents a parametric content subpart entity.
 * 
 * A subpart is a nested parametric component within a larger parametric feature,
 * commonly used in customized furniture, curtains, or bathroom cabinets.
 * It manages its own transformation, parameters, and document reference.
 */
export declare class ParametricContentSubpart extends ParametricContentBase {
  /** Entity identifier for this subpart */
  eId?: string;
  
  /** Document file reference for parametric definition */
  docFile?: string;
  
  /** Transformation matrix for subpart placement */
  subpartMatrix?: Matrix4;
  
  /** Parametric parameters for this subpart */
  subpartParams?: Record<string, unknown>;
  
  /** Visibility flag */
  visible: boolean;
  
  /** Face IDs to hide in rendering */
  hideFaces?: string[];

  /**
   * Create a new ParametricContentSubpart instance
   * 
   * @param id - Optional entity identifier
   * @param metadata - Optional entity metadata
   */
  constructor(id?: string, metadata?: unknown);

  /**
   * Get SDK data for rendering/calculation
   * 
   * @param param1 - First SDK parameter (context-dependent)
   * @param param2 - Second SDK parameter (context-dependent)
   * @param additionalParams - Additional parameters to merge with subpart params
   * @param useExtendedOptions - Whether to use extended rendering options
   * @returns SDK data for wall/parametric rendering
   */
  getSDKData(
    param1: unknown,
    param2: unknown,
    additionalParams: Record<string, unknown>,
    useExtendedOptions?: boolean
  ): unknown;

  /**
   * Initialize the parametric model document
   * 
   * @param param1 - Initialization parameter
   * @param param2 - Initialization parameter
   * @param param3 - Initialization parameter
   */
  initModelDocument(param1: unknown, param2: unknown, param3: unknown): void;

  /**
   * Get extra options for opening/rendering the parametric document
   * 
   * @param param - Optional parameter (unused)
   * @param useExtendedOptions - Whether to use extended options
   * @returns Document opening configuration
   */
  getOpenDocumentExtra(param?: unknown, useExtendedOptions?: boolean): OpenDocumentExtra;

  /**
   * Check if this content is located in a specific room
   * 
   * @param roomId - The room identifier to check
   * @param param - Additional check parameter
   * @returns True if the content is in the specified room
   */
  isContentInRoom(roomId: string, param?: boolean): boolean;

  /**
   * Get the entity ID path from root to this subpart
   * 
   * @returns Array of entity ID path segments
   */
  getEIdPath(): EIdPathSegment[];

  /**
   * Update the model from SDK data
   * 
   * @param data - Model data from SDK
   * @param skipUpdate - Whether to skip certain updates
   */
  updateModelFromData(data: ModelData, skipUpdate?: boolean): void;

  /**
   * Update subpart metadata (transformation, parameters, visibility)
   * 
   * @param meta - Subpart metadata to apply
   * @param hideFaces - Face IDs to hide
   */
  updateSubpartMeta(meta: SubpartMeta, hideFaces?: string[]): void;

  /**
   * Get the front projection plane for this subpart
   * 
   * @returns Plane representing the front face projection
   */
  getFrontProjectionPlane(): Plane;

  /**
   * Get the top projection plane for this subpart
   * 
   * @returns Plane representing the top face projection
   */
  getTopProjectionPlane(): Plane;

  /**
   * Update subpart position and rotation from transformation matrix
   * 
   * Decomposes the subpartMatrix into position (x, y, z) and
   * rotation (XRotation, YRotation, ZRotation) components.
   */
  updateSubpart(): void;

  /**
   * Get all parametric properties as a Map
   * 
   * @returns Map of property names to values
   */
  get properties(): Map<string, unknown>;

  /**
   * Get the document file reference
   * 
   * @returns Document file path or parametric metadata reference
   */
  getDocFile(): string | undefined;

  /**
   * Get the I/O handler for this entity type
   * 
   * @returns Singleton instance of ParametricContentSubpart_IO
   */
  getIO(): ParametricContentSubpart_IO;
}