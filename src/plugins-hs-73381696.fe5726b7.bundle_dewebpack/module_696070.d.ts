/**
 * Content Strategy - Material manipulation strategy for 3D content entities
 * Handles material extraction, application, and validation for HSCore content models
 */

import { HSCore } from './hscore';

/**
 * Material data structure containing texture and tiling information
 */
export interface MaterialData {
  /** Unique identifier for the material */
  seekId?: string;
  /** Base color of the material (if no texture) */
  color?: string | number;
  /** URI path to the texture image */
  textureURI?: string;
  /** Horizontal tile size */
  tileSize_x: number;
  /** Vertical tile size */
  tileSize_y: number;
  /** Initial horizontal tile size based on mesh UV */
  initTileSize_x?: number;
  /** Initial vertical tile size based on mesh UV */
  initTileSize_y?: number;
  /** Additional material properties */
  [key: string]: unknown;
}

/**
 * Information extracted when "sucking" material from an entity
 */
export interface SuckInfo {
  /** The extracted material data */
  materialData: MaterialData;
}

/**
 * Context object for material operations on entities
 */
export interface EntityContext {
  /** The target 3D entity */
  entity: HSCore.Model.Content | null;
  /** Name of the specific mesh to operate on */
  meshName: string;
}

/**
 * Metadata bounding information for customized entities
 */
export interface BoundingInfo {
  /** Object/mesh name */
  obj_name: string;
  /** U coordinate size (horizontal UV) */
  uSize?: number;
  /** V coordinate size (vertical UV) */
  vSize?: number;
}

/**
 * Undo/Redo data structure for material changes
 */
export interface UndoRedoData {
  /** The target entity that was modified */
  target: HSCore.Model.Content;
  /** The mesh name that was modified */
  meshName: string;
  /** The previous/new material state */
  material: MaterialData | null;
}

/**
 * Dependencies injected into the ContentStrategy
 */
export interface ContentStrategyDependencies {
  // Add specific dependency types as needed
  [key: string]: unknown;
}

/**
 * Base strategy interface (extended by ContentStrategy)
 */
export declare class BaseStrategy {
  /** Strategy type identifier */
  type: string;
  
  /**
   * Get material data from suck information
   * @param suckInfo - The sucked material information
   * @returns Processed material data
   */
  protected _getMaterialDataFromSuckInfo(suckInfo: SuckInfo): MaterialData;
  
  /**
   * Extract material data from raw material object
   * @param material - Raw material object
   * @returns Standardized material data
   */
  protected _getMaterialData(material: unknown): MaterialData;
  
  /**
   * Get undo/redo data from entity context
   * @param context - Entity and mesh context
   * @returns Undo/redo data structure
   */
  protected _getUndoRedoData(context: EntityContext): UndoRedoData;
}

/**
 * Content Strategy - Handles material operations for 3D content entities
 * 
 * This strategy provides functionality for:
 * - Extracting materials from content entities ("sucking")
 * - Applying materials to content entities
 * - Validating material operations
 * - Managing undo/redo for material changes
 * 
 * @example
 *