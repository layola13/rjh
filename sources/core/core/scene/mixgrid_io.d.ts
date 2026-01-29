/**
 * MixGrid module - Grid system for mixed material polygons
 * Provides grid functionality with multiple material blocks and seam properties
 */

import { Grid_IO, Grid } from './Grid';
import { Entity } from './Entity';
import { MaterialData, ColorModeEnum } from './Material';

/**
 * Material mapping configuration for grid blocks
 */
export interface MaterialConfig {
  /** Material seek ID */
  seekId: string;
  /** Array of polygon/block IDs using this material */
  polygons: string[];
  /** Material coverage percentage (0-1) */
  percent: number;
  /** Extended material seek IDs for alternatives */
  extSeekIds: string[];
}

/**
 * Options for updating block material mapping
 */
export interface BlockMaterialUpdateOptions {
  /** Previous block ID */
  oldId?: string;
  /** New block ID */
  newId: string;
  /** Material seek ID to associate */
  seekId?: string;
}

/**
 * Dump/Load options for serialization
 */
export interface SerializationOptions {
  /** Version string for compatibility checking */
  version?: string;
  /** ID generator for creating new IDs during load */
  idGenerator?: {
    getNewId(oldId: string): string | null;
  };
}

/**
 * I/O handler for MixGrid serialization and deserialization
 */
export declare class MixGrid_IO extends Grid_IO {
  private static _MixGrid_IO_instance?: MixGrid_IO;

  /**
   * Get singleton instance of MixGrid_IO
   */
  static instance(): MixGrid_IO;

  /**
   * Serialize MixGrid to JSON-compatible object
   * @param entity - MixGrid entity to dump
   * @param callback - Optional post-processing callback
   * @param includeChildren - Whether to include child entities
   * @param options - Serialization options
   * @returns Serialized data array
   */
  dump(
    entity: MixGrid,
    callback?: (data: any[], entity: MixGrid) => void,
    includeChildren?: boolean,
    options?: SerializationOptions
  ): any[];

  /**
   * Deserialize JSON data into MixGrid entity
   * @param entity - Target MixGrid entity
   * @param data - Serialized data object
   * @param options - Deserialization options
   */
  load(
    entity: MixGrid,
    data: any,
    options?: SerializationOptions
  ): void;
}

/**
 * MixGrid entity - Grid with multiple material blocks and configurable seams
 * Supports mixed material painting with customizable tile sizes and seam appearance
 */
export declare class MixGrid extends Grid {
  /** Internal blocks/polygons array */
  private __blocks: Entity[];
  
  /** Material configuration mappings */
  materials: MaterialConfig[];
  
  /** Internal seam color (numeric RGB) */
  private __seamColor: number;
  
  /** Grid type identifier */
  type: string;

  /**
   * Create new MixGrid instance
   * @param name - Entity name
   * @param id - Optional entity ID
   */
  constructor(name?: string, id?: string);

  /**
   * Factory method to create and initialize MixGrid
   * @param materialConfig - Initial material configuration
   * @param name - Entity name
   * @param blocks - Array of block entities
   * @param tileSizeX - Horizontal tile size
   * @param tileSizeY - Vertical tile size
   * @param seamColor - Seam color (hex string or number)
   * @param seamWidth - Seam width in pixels
   * @param seamMaterial - Material data for seams
   * @param gridOptions - Additional grid type options
   */
  static create(
    materialConfig: MaterialConfig | null,
    name: string,
    blocks: Entity[],
    tileSizeX: number,
    tileSizeY: number,
    seamColor?: string | number,
    seamWidth?: number,
    seamMaterial?: MaterialData | any,
    gridOptions?: { type: string }
  ): MixGrid;

  /**
   * Update existing MixGrid with new configuration
   * @param grid - Target grid to update
   * @param materialConfig - Material configuration
   * @param blocks - Block entities
   * @param tileSizeX - Horizontal tile size
   * @param tileSizeY - Vertical tile size
   * @param seamColor - Seam color
   * @param seamWidth - Seam width
   * @param seamMaterial - Seam material
   * @param gridOptions - Grid type options
   */
  static update(
    grid: MixGrid,
    materialConfig: MaterialConfig | null,
    blocks: Entity[],
    tileSizeX: number,
    tileSizeY: number,
    seamColor?: string | number,
    seamWidth?: number,
    seamMaterial?: MaterialData | any,
    gridOptions?: { type: string }
  ): void;

  /**
   * Get/set blocks (alias for polygons)
   */
  polygons: Entity[];
  
  /**
   * Internal blocks accessor
   */
  __polygons: Entity[];
  
  /**
   * Current blocks/polygons in grid
   */
  blocks: Entity[];
  
  /**
   * Horizontal tile size
   */
  tileSizeX: number;
  
  /**
   * Vertical tile size
   */
  tileSizeY: number;
  
  /**
   * Seam color (hex string or number)
   */
  seamColor: string | number;
  
  /**
   * Seam width in pixels
   */
  seamWidth: number;
  
  /**
   * Material data for rendering seams
   */
  seamMaterial: MaterialData;

  /**
   * Get I/O handler for this entity type
   */
  getIO(): MixGrid_IO;

  /**
   * Internal method to replace blocks
   * @param oldBlocks - Previous blocks to remove
   * @param newBlocks - New blocks to add
   */
  private _setBlocks(newBlocks: Entity[]): void;

  /**
   * @deprecated Use updateBlockMaterialMap instead
   */
  updataPolygonIdInMaterials(options: BlockMaterialUpdateOptions): void;

  /**
   * Update material mapping when block ID changes
   * @param options - Update options with old/new IDs and seekId
   */
  updateBlockMaterialMap(options: BlockMaterialUpdateOptions): void;

  /**
   * Get all materials from child blocks
   * @returns Array of material instances
   */
  getChildMaterials(): any[];

  /**
   * Check if grid is mixed paint type
   */
  isMixType(): boolean;

  /**
   * Update grid geometry based on parent paving options
   */
  update(): void;

  /**
   * Set flag on this entity and all blocks
   * @param flag - Flag to set
   * @param value - Flag value
   */
  setFlagOn(flag: string, value: any): void;

  /**
   * Clear flag on this entity and all blocks
   * @param flag - Flag to clear
   * @param value - Flag value
   */
  setFlagOff(flag: string, value: any): void;

  /**
   * Check if grid has valid blocks
   */
  isValid(): boolean;

  /**
   * Post-process cloned entity to remap block IDs
   * @param idMap - Mapping of old IDs to new IDs
   */
  checkClonedResult(idMap: { getNewId(oldId: string): string }): void;
}

/**
 * Grid type enumeration
 */
export declare enum GridTypeEnum {
  MixedPaint = 'MixedPaint'
}