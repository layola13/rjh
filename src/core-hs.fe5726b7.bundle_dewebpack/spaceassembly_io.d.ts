/**
 * Space Assembly I/O Module
 * Handles serialization/deserialization of space assembly entities
 */

import { Box3, Vector3 } from 'three'; // or your 3D math library
import { Entity, Entity_IO } from './Entity';
import { BrepBound } from './BrepBound';
import { SignalHook } from './SignalHook';

/**
 * 3D position coordinates
 */
export interface Position3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 3D size dimensions
 */
export interface Size3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Asset metadata information
 */
export interface AssetMetadata {
  [key: string]: unknown;
}

/**
 * Space assembly metadata
 */
export interface SpaceAssemblyMetadata {
  /** Unique seek identifier */
  seekId: string;
  /** Alternative ID */
  id?: string;
  /** X-axis size */
  xSize: number;
  /** Y-axis size */
  ySize: number;
  /** Z-axis size */
  zSize: number;
  /** Original space X length */
  originalSpaceXLength: number;
  /** Original space Y length */
  originalSpaceYLength: number;
  /** Original space Z length */
  originalSpaceZLength: number;
  /** Associated assets */
  assets?: AssetMetadata[];
}

/**
 * Serialized dump data structure
 */
export interface DumpData {
  seekId?: string;
  associatedIds?: string[];
  [key: string]: unknown;
}

/**
 * Load context with product mapping
 */
export interface LoadContext {
  /** Map of product IDs to metadata */
  productsMap?: Map<string, SpaceAssemblyMetadata>;
  [key: string]: unknown;
}

/**
 * Field change event data
 */
export interface FieldChangeEvent {
  data: {
    fieldName: string;
    [key: string]: unknown;
  };
}

/**
 * I/O handler for SpaceAssembly serialization and deserialization
 */
export declare class SpaceAssembly_IO extends Entity_IO {
  /**
   * Serialize a SpaceAssembly entity to dump format
   * @param entity - The entity to serialize
   * @param callback - Optional callback invoked after dump
   * @param context - Serialization context
   * @param options - Additional dump options
   * @returns Array of dump data
   */
  dump(
    entity: SpaceAssembly,
    callback?: (dumpData: DumpData[], entity: SpaceAssembly) => void,
    context?: unknown,
    options?: unknown
  ): DumpData[];

  /**
   * Deserialize dump data into a SpaceAssembly entity
   * @param entity - The entity to populate
   * @param dumpData - The serialized data
   * @param context - Load context with product mappings
   */
  load(
    entity: SpaceAssembly,
    dumpData: DumpData,
    context: LoadContext
  ): void;

  /**
   * Get singleton instance
   */
  static instance(): SpaceAssembly_IO;
}

/**
 * Represents a 3D space assembly composed of associated entities
 */
export declare class SpaceAssembly extends Entity {
  private _seekId: string;
  private _associatedIds: string[];
  private _associatedContents: Entity[];
  private _position?: Position3D;
  private _size?: Size3D;
  private _metadata?: SpaceAssemblyMetadata;
  private _originalSpaceBox3: Box3;
  private _signalHook: SignalHook;
  private _watchedFiledName: string[];

  /**
   * Unique seek identifier for this assembly
   */
  seekId: string;

  /**
   * IDs of associated content entities
   */
  readonly associatedIds: string[];

  /**
   * Associated content entities
   */
  associatedContents: Entity[];

  /**
   * 3D position of the assembly
   */
  readonly position: Position3D;

  /**
   * X coordinate
   */
  readonly x: number;

  /**
   * Y coordinate
   */
  readonly y: number;

  /**
   * Z coordinate
   */
  readonly z: number;

  /**
   * 3D size of the assembly
   */
  readonly size: Size3D;

  /**
   * X-axis size
   */
  readonly xSize: number;

  /**
   * Y-axis size
   */
  readonly ySize: number;

  /**
   * Z-axis size
   */
  readonly zSize: number;

  /**
   * Assembly metadata
   */
  readonly metadata: SpaceAssemblyMetadata | undefined;

  /**
   * Assets associated with this assembly
   */
  readonly assets: AssetMetadata[];

  /**
   * Original space bounding box
   */
  readonly originalSpaceBox3: Box3;

  /**
   * Internal bounding representation
   */
  boundInternal: BrepBound;

  /**
   * Create a new SpaceAssembly instance
   * @param id - Optional entity ID
   * @param options - Additional constructor options
   */
  constructor(id?: string, options?: unknown);

  /**
   * Factory method to create a SpaceAssembly
   * @param metadata - Optional metadata to initialize with
   * @returns New SpaceAssembly instance
   */
  static create(metadata?: SpaceAssemblyMetadata): SpaceAssembly;

  /**
   * Initialize assembly from metadata
   * @param metadata - The metadata to initialize from
   */
  initByMeta(metadata: SpaceAssemblyMetadata): void;

  /**
   * Refresh internal boundary calculations
   */
  refreshBoundInternal(): void;

  /**
   * Get I/O handler for this entity
   */
  getIO(): SpaceAssembly_IO;

  /**
   * Update associated content entities
   * @param contents - New array of associated entities
   * @private
   */
  private _updateContents(contents: Entity[]): void;

  /**
   * Handle field changes in associated contents
   * @param event - Field change event
   * @private
   */
  private onContentsFieldChanged(event: FieldChangeEvent): void;

  /**
   * Recalculate size and position from contents
   * @private
   */
  private _refreshSizeAndPosition(): void;
}