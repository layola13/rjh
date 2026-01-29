/**
 * Molding module - Handles decorative molding elements like baseboards, cornices, and mitre joints
 * @module Molding
 * @packageDocumentation
 */

import type { Entity, Entity_IO } from './Entity';
import type { SignalHook } from './SignalHook';
import type { Meta } from './Meta';
import type { ContentType } from '../types/ContentType';
import type { Material } from './Material';

/**
 * Enumeration of supported molding types
 */
export enum MoldingTypeEnum {
  /** Mitre joint molding */
  Mitre = 'mitre',
  /** Baseboard molding along floor */
  Baseboard = 'baseboard',
  /** Cornice molding at ceiling */
  Cornice = 'cornice',
  /** Pocket molding */
  Pocket = 'pocket',
  /** Wall board baseboard */
  WallBoardBaseboard = 'wallboardbaseboard',
  /** Wall board waist line */
  WallBoardWaistLine = 'wallboardwaistline',
  /** Customized model molding */
  CustomizedModelMolding = 'customizedmodelmolding',
  /** N-customized model molding */
  NCustomizedModelMolding = 'ncustomizedmodelmolding'
}

/**
 * Options for dump operation
 */
export interface DumpOptions {
  /** Map of product IDs to product metadata */
  productsMap?: Map<string, Meta>;
  /** Additional custom options */
  [key: string]: unknown;
}

/**
 * Options for load operation
 */
export interface LoadOptions {
  /** Map of seek IDs to product metadata */
  productsMap?: Map<string, Meta>;
  /** Additional custom options */
  [key: string]: unknown;
}

/**
 * Serialized molding data structure
 */
export interface MoldingData {
  /** Unique seek identifier */
  seekId: string;
  /** X dimension size */
  XSize: number;
  /** Y dimension size */
  YSize: number;
  /** Material ID reference */
  material?: string;
  /** Additional serialized properties */
  [key: string]: unknown;
}

/**
 * I/O handler for Molding entity serialization and deserialization
 * @extends Entity_IO
 */
export declare class Molding_IO extends Entity_IO {
  /**
   * Serialize a molding entity to data format
   * @param entity - The molding entity to serialize
   * @param callback - Optional callback after dump
   * @param deep - Whether to perform deep serialization
   * @param options - Serialization options including products map
   * @returns Array of serialized data objects
   */
  dump(
    entity: Molding,
    callback?: (result: unknown[], entity: Molding) => void,
    deep?: boolean,
    options?: DumpOptions
  ): unknown[];

  /**
   * Deserialize data into a molding entity
   * @param entity - Target molding entity to populate
   * @param data - Serialized molding data
   * @param options - Deserialization options including products map
   */
  load(entity: Molding, data: MoldingData, options: LoadOptions): void;

  /**
   * Get singleton instance of Molding_IO
   */
  static instance(): Molding_IO;
}

/**
 * Path data structure for molding geometry
 */
export interface MoldingPath {
  /** Path coordinates or geometry data */
  [key: string]: unknown;
}

/**
 * Molding entity representing decorative architectural elements
 * @extends Entity
 */
export declare class Molding extends Entity {
  /**
   * Internal seek ID storage
   * @private
   */
  private _seekId: string;

  /**
   * Host entity reference
   * @private
   */
  private _host: Entity | null;

  /**
   * Internal X dimension storage
   * @private
   */
  private __XSize: number;

  /**
   * Internal Y dimension storage
   * @private
   */
  private __YSize: number;

  /**
   * Signal hook for material change events
   * @private
   */
  private _materialSignalHook: SignalHook;

  /**
   * Flag indicating disposal state
   * @private
   */
  private _disposed: boolean;

  /**
   * Create a new Molding instance
   * @param id - Optional entity identifier
   * @param type - Optional entity type
   */
  constructor(id?: string, type?: string);

  /**
   * Unique seek identifier for catalog lookup
   */
  get seekId(): string;
  set seekId(value: string);

  /**
   * Content type classification from metadata
   */
  get contentType(): ContentType;

  /**
   * Normal texture for standard resolution rendering
   */
  get normalTexture(): string | undefined;

  /**
   * Normal texture for high resolution rendering
   */
  get normalTextureHigh(): string | undefined;

  /**
   * Cross-section profile geometry
   */
  get profile(): unknown;

  /**
   * High resolution cross-section profile geometry
   */
  get profileHigh(): unknown;

  /**
   * Length along X axis from metadata
   */
  get XLength(): number;

  /**
   * Length along Y axis from metadata
   */
  get YLength(): number;

  /**
   * Host entity that owns this molding
   */
  host: Entity | null;

  /**
   * Material applied to the molding
   */
  material: Material | undefined;

  /**
   * X dimension size (width)
   */
  XSize: number;

  /**
   * Y dimension size (height)
   */
  YSize: number;

  /**
   * Initialize molding from metadata
   * @param meta - Product metadata containing profile and size information
   */
  initByMeta(meta: Meta): void;

  /**
   * Get metadata filter keys for serialization
   * @returns Set of property keys to include in metadata
   */
  getMetadataFilterKeys(): Set<string>;

  /**
   * Get the host entity
   * @returns Host entity or null
   */
  getHost(): Entity | null;

  /**
   * Assign this molding to a host entity
   * @param host - The entity to assign to
   */
  assignTo(host: Entity): void;

  /**
   * Get the current material
   * @returns Material instance or undefined
   */
  getMaterial(): Material | undefined;

  /**
   * Set the material for this molding
   * @param material - Material to apply
   */
  setMaterial(material: Material): void;

  /**
   * Get geometry paths for rendering
   * @returns Array of path data
   */
  getPaths(): MoldingPath[];

  /**
   * Get complete geometry paths including all segments
   * @returns Array of complete path data
   */
  getWholePaths(): MoldingPath[];

  /**
   * Get I/O handler for serialization
   * @returns Molding_IO singleton instance
   */
  getIO(): Molding_IO;

  /**
   * Refresh internal bounding box calculation
   * @protected
   */
  protected refreshBoundInternal(): void;

  /**
   * Compare if two moldings are identical in configuration
   * @param other - Molding to compare with
   * @returns True if moldings have same seekId, material, and dimensions
   */
  isSameMolding(other: Molding): boolean;

  /**
   * Verify molding has valid metadata and configuration
   * @returns True if molding is valid
   */
  verify(): boolean;

  /**
   * Clean up resources and dispose of the molding
   */
  destroy(): void;

  /**
   * Check if molding can be selected by user
   * @returns True if not removed and not marked unselectable
   */
  canSelect(): boolean;

  /**
   * Handle size change event
   * @param oldValue - Previous size value
   * @param newValue - New size value
   * @private
   */
  private _onSizeChanged(oldValue: number, newValue: number): void;

  /**
   * Handle material change event
   * @param oldMaterial - Previous material
   * @param newMaterial - New material
   * @private
   */
  private _onMaterialChanged(oldMaterial: Material | undefined, newMaterial: Material | undefined): void;

  /**
   * Copy properties from another molding
   * @param source - Source molding to copy from
   * @protected
   */
  protected _copyFrom(source: Molding): void;
}