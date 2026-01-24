/**
 * DSweep_IO Module
 * 
 * This module provides serialization/deserialization functionality for DSweep entities,
 * which represent swept 3D geometries along paths with customizable profiles.
 */

import type { Matrix3, Coordinate3 } from './math';
import type { ContentBase, ContentBase_IO } from './content-base';
import type { Material } from './material';
import type { Segment3D } from './geometry';
import type { Entity } from './entity';
import type { EntityField, FieldValueType } from './field';
import type { EntityProxyTypeEnum } from './proxy';

/**
 * Represents a 3D point in space
 */
export interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Represents a 2D bounding box
 */
export interface Bounds2D {
  minx: number;
  miny: number;
  maxx: number;
  maxy: number;
}

/**
 * Product metadata information
 */
export interface ProductMetadata {
  /** Unique identifier for the product */
  id: string;
  /** Seek identifier for catalog lookup */
  seekId: string;
  /** Content type classification */
  contentType: any; // HSCatalog.ContentType
  /** Normal texture reference */
  normalTexture?: unknown;
  /** High-resolution profile geometry */
  profileHigh?: unknown;
  /** Standard profile geometry */
  profile?: unknown;
  /** Profile width dimension */
  profileSizeX?: number;
  /** Profile height dimension */
  profileSizeY?: number;
}

/**
 * Serialization options for dump operations
 */
export interface DumpOptions {
  /** Map to track product metadata during serialization */
  productsMap?: Map<string, ProductMetadata>;
  /** Source data for entity resolution */
  data?: Record<string, unknown>;
  /** Version string for customization data format */
  customizationVersion?: string;
}

/**
 * Serialized DSweep data structure
 */
export interface DSweepDumpData {
  /** Catalog seek identifier */
  seekId?: string;
  /** Local unique identifier within the design */
  localId?: string;
  /** Display name */
  name?: string;
  /** Customization content type tags */
  customizationContentType?: string[];
  /** Whether this is a functional component */
  isFunctionComponent?: boolean;
  /** Parent ID in the iModel hierarchy */
  imodelParentId?: string;
  /** K-axis fixation parameter */
  fixK?: unknown;
  /** S-axis fixation parameter */
  fixS?: unknown;
  /** Array of path segments defining the sweep */
  paths?: unknown[][][];
  /** Reference Y-direction for profile orientation */
  profileRefYDir?: Point3D;
  /** Transformation matrix for profile positioning */
  profileTransform?: unknown;
  /** Cutting planes for model intersection */
  modelCutPlanes?: unknown[];
  /** Material reference ID */
  material?: string;
  /** Master template identifier */
  masterId?: string;
  
  // Legacy fields for migration
  /** @deprecated Legacy X dimension */
  XSize?: number;
  /** @deprecated Legacy Y dimension */
  YSize?: number;
  /** @deprecated Legacy profile direction */
  profileDir?: string;
}

/**
 * Parameters for creating a new DSweep instance
 */
export interface DSweepCreateParams {
  /** Local identifier */
  localId: string;
  /** Material definition */
  material: Material | unknown;
  /** Product resource metadata */
  resource?: ProductMetadata;
  /** Geometric and transformation parameters */
  parameters?: {
    /** X-axis offset */
    x?: number | null;
    /** Y-axis offset */
    y?: number | null;
    /** Z-axis offset */
    z?: number | null;
    /** Sweep path segments */
    paths?: Segment3D[][];
    /** Profile reference Y-direction */
    profileRefYDir?: Point3D;
    /** Profile transformation matrix */
    profileTransform?: Matrix3;
    /** Model cutting planes */
    modelCutPlanes?: Coordinate3[];
  };
}

/**
 * Update parameters for modifying an existing DSweep
 */
export interface DSweepUpdateParams {
  /** New sweep paths */
  paths?: Segment3D[][];
  /** Updated profile metadata */
  profileMeta?: ProductMetadata;
  /** New material definition */
  material?: Material | unknown;
  /** Updated profile transformation */
  profileTransform?: Matrix3;
  /** Updated cutting planes */
  modelCutPlanes?: Coordinate3[];
}

/**
 * IO handler for serializing and deserializing DSweep entities.
 * Manages data migration from legacy formats and coordinate transformations.
 */
export declare class DSweep_IO extends ContentBase_IO {
  /**
   * Serializes a DSweep entity to a plain data object
   * 
   * @param entity - The DSweep entity to serialize
   * @param callback - Optional callback invoked after dump
   * @param deepClone - Whether to perform deep cloning of nested entities
   * @param options - Serialization options including product map tracking
   * @returns Array of serialized data objects (entity and dependencies)
   */
  dump(
    entity: DSweep,
    callback?: (result: unknown[], entity: DSweep) => void,
    deepClone?: boolean,
    options?: DumpOptions
  ): unknown[];

  /**
   * Deserializes data into a DSweep entity instance
   * 
   * @param entity - Target entity to populate
   * @param data - Serialized DSweep data
   * @param options - Deserialization options including product map
   */
  load(entity: DSweep, data: DSweepDumpData, options: DumpOptions): void;

  /**
   * Migrates legacy data formats to current schema
   * 
   * @param data - Serialized data that may contain legacy fields
   * @param options - Context for migration including version info
   */
  private _migrateOldData(data: DSweepDumpData, options: DumpOptions): void;

  /**
   * Checks if data uses legacy dump format (pre-profileTransform)
   * 
   * @param data - Data to check
   * @returns True if data contains legacy XSize/YSize fields
   */
  private _isOldDump(data: DSweepDumpData): boolean;

  /**
   * Checks if path data uses legacy point array format
   * 
   * @param data - Data to check
   * @returns True if paths contain raw point objects instead of Segment3D
   */
  private _isOldPathsDump(data: DSweepDumpData): boolean;

  /**
   * Gets the singleton instance of this IO handler
   */
  static instance(): DSweep_IO;
}

/**
 * Represents a swept 3D geometry defined by paths and a profile.
 * Supports customization, material assignment, and hierarchical relationships.
 */
export declare class DSweep extends ContentBase {
  /**
   * Creates a new DSweep instance
   * 
   * @param id - Optional entity ID
   * @param parent - Optional parent entity
   */
  constructor(id?: string, parent?: Entity);

  /**
   * Factory method to create a DSweep from parameters
   * 
   * @param params - Creation parameters including paths, material, and metadata
   * @returns New DSweep instance
   */
  static create(params: DSweepCreateParams): DSweep;

  // ==================== Properties ====================

  /**
   * Catalog seek identifier for product lookup.
   * Synchronized with metadata.id when available.
   */
  seekId: string;

  /**
   * Product metadata containing profile geometry and material properties
   */
  metadata: ProductMetadata | null;

  /**
   * Array of content type classifications for customization filtering
   */
  customizationContentType: string[];

  /**
   * Indicates if this component has functional behavior (vs purely decorative)
   */
  isFunctionComponent: boolean;

  /**
   * Parent identifier in the iModel hierarchy
   */
  imodelParentId?: string;

  /**
   * K-axis fixation constraint parameter
   */
  fixK?: unknown;

  /**
   * S-axis fixation constraint parameter
   */
  fixS?: unknown;

  /**
   * Array of paths defining the sweep trajectory.
   * Each path is an array of 3D curve segments.
   */
  paths: Segment3D[][];

  /**
   * Reference Y-direction vector for orienting the profile during sweep
   */
  profileRefYDir?: Point3D;

  /**
   * Local unique identifier within the design document
   */
  localId: string;

  /**
   * Display name of the component
   */
  name: string;

  /**
   * Material definition for rendering
   */
  material?: Material;

  /**
   * Host entity reference (for embedded components)
   */
  host?: unknown;

  /**
   * 3x3 transformation matrix applied to the profile before sweeping
   */
  profileTransform?: Matrix3;

  /**
   * Array of cutting planes for CSG intersection operations
   */
  modelCutPlanes: Coordinate3[];

  /**
   * Identifier of the master template this instance derives from
   */
  masterId?: string;

  /**
   * 2D outline polygon of the swept geometry (computed)
   */
  outline: Point3D[];

  // ==================== Getters ====================

  /**
   * Gets the content type from metadata
   */
  get contentType(): any; // HSCatalog.ContentType

  /**
   * Gets the normal map texture reference from metadata
   */
  get normalTexture(): unknown | undefined;

  /**
   * Gets the profile geometry (high-res if available, otherwise standard)
   */
  get profile(): unknown | undefined;

  // ==================== Methods ====================

  /**
   * Converts segment-based paths to discrete point arrays
   * 
   * @returns Array of point arrays representing discretized paths
   */
  getPaths(): Point3D[][];

  /**
   * Validates the entity state
   * 
   * @returns True if seekId is valid and parent validation passes
   */
  verify(): boolean;

  /**
   * Gets the IO handler for this entity type
   */
  getIO(): DSweep_IO;

  /**
   * Updates multiple properties atomically
   * 
   * @param params - Update parameters
   */
  update(params: DSweepUpdateParams): void;

  /**
   * Sets or updates the material
   * 
   * @param key - Legacy parameter (unused)
   * @param material - Material instance or definition
   */
  setMaterial(key: string, material: Material | unknown): void;

  /**
   * Gets the current material
   */
  getMaterial(): Material | undefined;

  /**
   * Computes and updates the internal bounding box from path geometry
   * @internal
   */
  refreshBoundInternal(): void;

  /**
   * Checks if this content is located within a specified room
   * 
   * @param room - Room entity to test
   * @param strict - Whether to use strict containment rules
   * @returns True if content is in the room
   */
  isContentInRoom(room: unknown, strict?: boolean): boolean | undefined;

  /**
   * Checks if this content is located within a specified loop/boundary
   * 
   * @param loop - Loop entity to test
   * @param strict - Whether to use strict containment rules
   * @returns True if content is in the loop
   */
  isContentInLoop(loop: unknown, strict?: boolean): boolean | undefined;

  /**
   * Determines if individual fields can be transacted separately
   * 
   * @returns Always false for DSweep (atomic transactions only)
   */
  canTransactField(): boolean;

  /**
   * Gets the unique parent entity, attempting repair if corrupted
   * 
   * @returns Parent entity or undefined if no unique parent exists
   */
  getUniqueParent(): Entity | undefined;

  /**
   * Gets the proxy type identifier for this entity
   * 
   * @returns EntityProxyTypeEnum.CustomizationProduct
   */
  getProxyId(): EntityProxyTypeEnum;

  /**
   * Gets the proxy object for cross-module entity access
   */
  getProxyObject(): unknown | undefined;

  // ==================== Internal Fields ====================
  
  /** @internal Backing field for seekId */
  private _seekId: string;
  
  /** @internal Backing field for metadata */
  private _metadata: ProductMetadata | null;
  
  /** @internal Internal customization types */
  private __customizationContentType: string[];
  
  /** @internal Internal function component flag */
  private __isFunctionComponent: boolean;
  
  /** @internal Internal paths storage */
  private __paths: Segment3D[][];
  
  /** @internal Internal local ID */
  private __localId: string;
  
  /** @internal Internal name */
  private __name: string;
  
  /** @internal Internal model cut planes */
  private __modelCutPlanes: Coordinate3[];
  
  /** @internal Internal host reference */
  private __host?: unknown;
  
  /** @internal Internal position X coordinate */
  private __x?: number;
  
  /** @internal Internal position Y coordinate */
  private __y?: number;
  
  /** @internal Internal position Z coordinate */
  private __z?: number;
  
  /** @internal Internal profile reference direction */
  private __profileRefYDir?: Point3D;
  
  /** @internal Internal profile transformation */
  private __profileTransform?: Matrix3;
  
  /** @internal Internal material reference */
  private __material?: Material;
  
  /** @internal Internal master ID */
  private __masterId?: string;
}