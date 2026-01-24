/**
 * Module: MeshContent_IO
 * Provides serialization and model classes for mesh content entities
 */

import type { Content, Content_IO } from './Content';
import type { Entity } from './Entity';
import type { Material } from './Material';
import type { Layer } from './Layer';
import type { CacheManager } from './CacheManager';
import type { Logger } from './Logger';

/**
 * Material component identifier constant
 */
declare const MATERIAL_COMPONENT_KEY: 'material';

/**
 * Metadata structure for mesh content initialization
 */
export interface MeshContentMetadata {
  /** Unique identifier for the content */
  id?: string;
  /** Alternative identifier (joint id) */
  jid?: string;
  /** Content type classification */
  contentType: string;
  /** X-axis dimension length */
  XLength?: number;
  /** Y-axis dimension length */
  YLength?: number;
  /** Z-axis dimension length */
  ZLength?: number;
  /** Origin data for Zowee format */
  originData?: unknown;
  /** Additional metadata properties */
  [key: string]: unknown;
}

/**
 * Serialized dump data structure
 */
export interface MeshContentDumpData {
  /** Whether hidden by constraint rules */
  hiddenByConstrain?: boolean;
  /** Local identifier within parent context */
  localId?: string;
  /** Texture type classification */
  textureType?: string;
  /** Material reference (entity ID) */
  material?: string;
  /** Unique seek identifier for lookup */
  seekId?: string;
  /** Additional dump properties */
  [key: string]: unknown;
}

/**
 * 3D bounding box representation
 */
export interface BoundingBox3D {
  /** Minimum X coordinate */
  minX: number;
  /** Minimum Y coordinate */
  minY: number;
  /** Minimum Z coordinate */
  minZ: number;
  /** Maximum X coordinate */
  maxX: number;
  /** Maximum Y coordinate */
  maxY: number;
  /** Maximum Z coordinate */
  maxZ: number;
}

/**
 * 3D point in space
 */
export interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 2D point for path representation
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * Load context for entity deserialization
 */
export interface LoadContext {
  /** Additional context properties */
  [key: string]: unknown;
}

/**
 * Dump options for serialization control
 */
export interface DumpOptions {
  /** Additional options */
  [key: string]: unknown;
}

/**
 * I/O handler for MeshContent serialization and deserialization
 * Extends base Content_IO to provide mesh-specific persistence logic
 */
export declare class MeshContent_IO extends Content_IO {
  /**
   * Serialize a MeshContent entity to a transferable format
   * @param entity - The mesh content entity to serialize
   * @param callback - Optional callback for post-processing dump data
   * @param includeChildren - Whether to recursively dump child entities
   * @param options - Additional serialization options
   * @returns Tuple of [dump data, metadata]
   */
  dump(
    entity: MeshContent,
    callback?: (dumpData: [MeshContentDumpData, unknown], entity: MeshContent) => void,
    includeChildren?: boolean,
    options?: DumpOptions
  ): [MeshContentDumpData, unknown];

  /**
   * Deserialize dump data into a MeshContent entity
   * @param entity - Target entity to populate
   * @param dumpData - Serialized data to load from
   * @param context - Load context containing references and settings
   */
  load(
    entity: MeshContent,
    dumpData: MeshContentDumpData,
    context: LoadContext
  ): void;

  /**
   * Get singleton instance of MeshContent_IO
   */
  static instance(): MeshContent_IO;
}

/**
 * Core mesh content entity representing 3D mesh data with materials
 * Handles mesh geometry, materials, bounding volumes, and parent relationships
 */
export declare class MeshContent extends Content {
  /**
   * Whether this content is hidden by constraint rules
   * @internal
   */
  private __hiddenByConstrain: boolean;

  /**
   * Local identifier within parent entity
   * @internal
   */
  private __localId: string;

  /**
   * Texture type classification
   * @internal
   */
  private __textureType: string | undefined;

  /**
   * X-axis dimension
   * @internal
   */
  private __XLength: number;

  /**
   * Y-axis dimension
   * @internal
   */
  private __YLength: number;

  /**
   * Z-axis dimension
   * @internal
   */
  private __ZLength: number;

  /**
   * Material instances mapped by component identifier
   * @internal
   */
  private readonly _materialById: Map<string, Material>;

  /**
   * Cached metadata identifier
   * @internal
   */
  private _metaId: string;

  /**
   * Seek mode for entity lookup
   * @internal
   */
  private _seekId: string;

  /**
   * Metadata descriptor for this mesh content
   */
  metadata: MeshContentMetadata;

  /**
   * Creates a new MeshContent instance
   * @param id - Optional unique identifier
   * @param parent - Optional parent entity
   */
  constructor(id?: string, parent?: Entity | undefined);

  /**
   * Initialize mesh content from origin data
   * @param metadata - Metadata containing origin data
   * @internal
   */
  private _initByOriginData(metadata: MeshContentMetadata): void;

  /**
   * Factory method to create MeshContent from metadata
   * @param metadata - Metadata descriptor
   * @returns New MeshContent instance or null if invalid
   */
  static create(metadata: MeshContentMetadata): MeshContent | null;

  /**
   * Initialize this instance using provided metadata
   * @param metadata - Metadata to initialize from
   */
  initByMeta(metadata: MeshContentMetadata): void;

  /**
   * Gets the metadata identifier (id or jid)
   */
  get metaId(): string;

  /**
   * Sets the mesh geometry data
   */
  set mesh(mesh: unknown);

  /**
   * Gets the mesh geometry data from cache
   */
  get mesh(): unknown;

  /**
   * Sets metadata information in cache
   */
  set metaInfo(info: unknown);

  /**
   * Gets metadata information from cache
   */
  get metaInfo(): unknown;

  /**
   * Retrieves material information for a specific component
   * @param componentId - Component identifier
   * @returns Material info or undefined
   */
  getMaterialInfo(componentId: string): unknown | undefined;

  /**
   * Sets material information map in cache
   */
  set materialInfo(info: Map<string, unknown>);

  /**
   * Gets or creates a material instance for a component
   * @param componentId - Component identifier
   * @returns Material instance
   */
  getMaterial(componentId: string): Material;

  /**
   * Gets the primary material for this mesh
   */
  get material(): Material;

  /**
   * Gets all materials as [id, material] pairs
   * @returns Array of material entries
   */
  getMaterialList(): Array<[string, Material]>;

  /**
   * Gets path data (implementation specific)
   * @returns Path data or undefined
   */
  getPaths(): unknown | undefined;

  /**
   * Gets top-level 2D path points
   * @returns Array of 2D points
   */
  getTopPaths(): Point2D[];

  /**
   * Computes global 3D bounding points including transformations
   * @returns Array of transformed 3D points
   */
  getGlobalBound3dPoints(): Point3D[];

  /**
   * Computes global 3D axis-aligned bounding box
   * @returns Bounding box in global space
   */
  getGlobalBoundingBox3d(): BoundingBox3D;

  /**
   * Computes local 3D bounding box (entity space)
   * @returns Bounding box in local space
   */
  getBoundingBox3d(): BoundingBox3D;

  /**
   * Gets 3D bounding points (entity space)
   * @returns Array of 3D points
   */
  getBound3dPoints(): Point3D[];

  /**
   * Gets local 3D bounding points (untransformed)
   * @returns Array of local 3D points
   */
  getLocalBound3dPoints(): Point3D[];

  /**
   * Gets local 3D bounding box (untransformed)
   * @returns Bounding box in local space
   */
  getLocalBoundBox3d(): BoundingBox3D;

  /**
   * Marks geometry as dirty and propagates to children
   */
  dirtyRecursive(): void;

  /**
   * Lifecycle hook called when added to a parent entity
   * @param parent - The parent entity
   */
  onAddedToParent(parent: Entity): void;

  /**
   * Checks if this content is within a loop structure
   * @param loopEntity - Loop entity to check against
   * @param recursive - Whether to check recursively
   * @returns True if contained in loop
   */
  isContentInLoop(loopEntity: Entity, recursive?: boolean): boolean;

  /**
   * Checks if this content is within a room structure
   * @param roomEntity - Room entity to check against
   * @returns True if contained in room
   */
  isContentInRoom(roomEntity: Entity): boolean;

  /**
   * Gets the I/O handler for this entity type
   * @returns MeshContent_IO instance
   */
  getIO(): MeshContent_IO;

  /**
   * Determines if field can participate in transactions
   * @returns Always false for mesh content
   */
  canTransactField(): boolean;

  /**
   * Gets the unique parent entity, fixing multi-parent issues if needed
   * @returns Parent entity or undefined
   */
  getUniqueParent(): Entity | undefined;

  /**
   * Whether hidden by constraint (decorated field)
   */
  hiddenByConstrain: boolean;

  /**
   * Local identifier (decorated field)
   */
  localId: string;

  /**
   * Texture type (decorated field)
   */
  textureType: string;
}