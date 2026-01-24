/**
 * DContent Module - 3D customizable content entity with material and layout support
 * @module DContent_IO
 */

import type { Content, Content_IO } from './Content';
import type { Coordinate3 } from './Coordinate3';
import type { Entity } from './Entity';
import type { Metadata } from './Metadata';

/**
 * Material mapping with texture angle
 */
export interface TextureMaterial {
  /** Material identifier */
  value: string;
  /** Rotation angle in degrees */
  angle: number;
}

/**
 * Layout constraint information for content positioning
 */
export interface LayoutInfo {
  /** Start position constraint (optional) */
  start?: number;
  /** End position constraint (optional) */
  end?: number;
  /** Additional layout parameters */
  [key: string]: unknown;
}

/**
 * Cutting plane information for model slicing
 */
export interface CuttingInfo {
  /** Cutting parameters */
  [key: string]: unknown;
}

/**
 * Shape rotation in 3D space
 */
export interface ShapeRotation {
  /** X-axis rotation in degrees */
  x?: number;
  /** Y-axis rotation in degrees */
  y?: number;
  /** Z-axis rotation in degrees */
  z?: number;
}

/**
 * Serialized texture material entry
 */
export interface SerializedTextureMaterial {
  /** Material key identifier */
  key: string;
  /** Material value */
  value: string;
  /** Texture angle */
  angle: number;
}

/**
 * Serialized DContent data structure
 */
export interface SerializedDContent {
  /** Master template identifier */
  masterId?: string;
  /** Layout constraint data */
  layoutInfo?: LayoutInfo;
  /** Cutting configuration */
  cuttingInfo?: CuttingInfo;
  /** Hidden by constraint flag */
  hiddenByConstrain?: boolean;
  /** Customization content types */
  customizationContentType?: string[];
  /** Function component flag */
  isFunctionComponent?: boolean;
  /** Parent model identifier */
  imodelParentId?: string;
  /** Fixed K parameter */
  fixK?: number;
  /** Fixed S parameter */
  fixS?: number;
  /** Material identifier */
  materialId?: string;
  /** Texture type */
  textureType?: string;
  /** Serialized texture materials */
  textureMaterials?: SerializedTextureMaterial[];
  /** Model cut planes */
  modelCutPlanes?: unknown[];
  /** Additional serialized properties */
  [key: string]: unknown;
}

/**
 * Dump callback function type
 */
export type DumpCallback = (data: SerializedDContent[], entity: DContent) => void;

/**
 * Dump options configuration
 */
export interface DumpOptions {
  /** Additional dump parameters */
  [key: string]: unknown;
}

/**
 * Load options configuration
 */
export interface LoadOptions {
  /** Schema version */
  version?: string;
  /** Additional load parameters */
  [key: string]: unknown;
}

/**
 * 3D size dimensions
 */
export interface Size3D {
  /** X dimension */
  x: number;
  /** Y dimension */
  y: number;
  /** Z dimension */
  z: number;
}

/**
 * 3D scale factors
 */
export interface Scale3D {
  /** X-axis scale */
  x: number;
  /** Y-axis scale */
  y: number;
  /** Z-axis scale */
  z: number;
}

/**
 * IO handler for DContent serialization/deserialization
 * Manages persistence of 3D content with materials and layout constraints
 */
export declare class DContent_IO extends Content_IO {
  /**
   * Get singleton instance
   */
  static instance(): DContent_IO;

  /**
   * Serialize DContent entity to JSON structure
   * @param entity - Entity to serialize
   * @param callback - Optional callback for post-processing
   * @param includeChildren - Whether to serialize child entities
   * @param options - Additional dump options
   * @returns Array of serialized data
   */
  dump(
    entity: DContent,
    callback?: DumpCallback,
    includeChildren?: boolean,
    options?: DumpOptions
  ): SerializedDContent[];

  /**
   * Deserialize JSON data into DContent entity
   * @param entity - Target entity to populate
   * @param data - Serialized data
   * @param options - Load options
   */
  load(entity: DContent, data: SerializedDContent, options?: LoadOptions): void;

  /**
   * Post-load processing for version migration
   * @param entity - Loaded entity
   * @param options - Load options with version info
   */
  postLoad(entity: DContent, options: LoadOptions): void;
}

/**
 * 3D customizable content entity with material support
 * Represents placeable objects with texture mapping and layout constraints
 */
export declare class DContent extends Content {
  /**
   * Master template identifier
   */
  masterId?: string;

  /**
   * Hidden by constraint system flag
   */
  hiddenByConstrain: boolean;

  /**
   * Customization content type categories
   */
  customizationContentType: string[];

  /**
   * Layout positioning information
   */
  layoutInfo?: LayoutInfo;

  /**
   * Model cutting planes for clipping
   */
  modelCutPlanes: Coordinate3[];

  /**
   * Cutting configuration data
   */
  cuttingInfo?: CuttingInfo;

  /**
   * Texture-to-material mapping
   */
  textureMaterialMap?: Map<string, TextureMaterial>;

  /**
   * Local unique identifier
   */
  localId: string;

  /**
   * Texture type identifier
   */
  textureType?: string;

  /**
   * Functional component flag
   */
  isFunctionComponent: boolean;

  /**
   * Parent model identifier
   */
  imodelParentId?: string;

  /**
   * Fixed K parameter for constraints
   */
  fixK?: number;

  /**
   * Fixed S parameter for constraints
   */
  fixS?: number;

  /**
   * Material identifier
   */
  materialId?: string;

  /**
   * Shape rotation angles
   */
  shapeRotation?: ShapeRotation;

  /**
   * Constructor
   * @param tag - Entity tag/name
   * @param parent - Optional parent entity
   */
  constructor(tag?: string, parent?: Entity);

  /**
   * Factory method to create DContent instance
   * @param metadata - Entity metadata
   * @param template - Optional template for initialization
   * @returns New DContent instance
   */
  static create(metadata?: Metadata, template?: DContent): DContent;

  /**
   * Whether entity requires clipping
   */
  readonly needClip: boolean;

  /**
   * Migrate legacy DContent data format (pre v0.22)
   */
  migrateOldDContent(): void;

  /**
   * Update entity metadata
   * @param metadata - New metadata
   */
  updateContentMetaData(metadata: Metadata): void;

  /**
   * Resize entity dimensions
   * @param xLength - X dimension
   * @param yLength - Y dimension
   * @param zLength - Z dimension
   */
  resize(xLength: number, yLength: number, zLength: number): void;

  /**
   * Get original unscaled dimensions from metadata
   * @returns Original size
   */
  getOriginSize(): Size3D;

  /**
   * Calculate real scale factors from current vs. original size
   * @returns Scale factors
   */
  getRealScale(): Scale3D;

  /**
   * Get local transformation matrix
   * @param includeScale - Whether to include scale in matrix
   * @returns 4x4 transformation matrix
   */
  getLocalMatrix(includeScale?: boolean): unknown; // THREE.Matrix4

  /**
   * Get local 2D outline points
   * @returns Array of outline points
   */
  getLocalOutLine(): unknown[];

  /**
   * Get global 3D bounding box corner points
   * @returns Array of 3D points
   */
  getGlobalBound3dPoints(): unknown[];

  /**
   * Get global axis-aligned bounding box
   * @returns Bounding box
   */
  getGlobalBoundingBox3d(): unknown;

  /**
   * Get local axis-aligned bounding box
   * @returns Bounding box
   */
  getBoundingBox3d(): unknown;

  /**
   * Get bounding box corner points
   * @returns Array of 3D points
   */
  getBound3dPoints(): unknown[];

  /**
   * Get local bounding box corner points
   * @returns Array of 3D points
   */
  getLocalBound3dPoints(): unknown[];

  /**
   * Get local bounding box
   * @returns Bounding box
   */
  getLocalBoundBox3d(): unknown;

  /**
   * Verify entity integrity
   * @returns Validation result
   */
  verify(): boolean;

  /**
   * Get IO handler instance
   * @returns DContent_IO handler
   */
  getIO(): DContent_IO;

  /**
   * Check if content is inside a given loop/polygon
   * @param loop - Loop points
   * @param strict - Strict containment check
   * @returns True if inside loop
   */
  isContentInLoop(loop: unknown[], strict?: boolean): boolean;

  /**
   * Whether field transactions are allowed
   * @returns Always false for DContent
   */
  canTransactField(): boolean;

  /**
   * Get unique parent entity (fixes multi-parent issues)
   * @returns Parent entity or undefined
   */
  getUniqueParent(): Entity | undefined;

  /**
   * Get proxy type identifier
   * @returns Proxy type enum value
   */
  getProxyId(): number;

  /**
   * Get proxy object instance
   * @returns Proxy object or undefined
   */
  getProxyObject(): unknown;
}