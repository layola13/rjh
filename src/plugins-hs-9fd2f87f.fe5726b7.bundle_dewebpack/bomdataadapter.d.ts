import type { HSConstants, HSCore } from './types/hs-core';
import type { ParameterNames } from './parameters';

/**
 * Default floor material seek ID from HSConstants
 */
const DEFAULT_FLOOR_MATERIAL_SEEK_ID: string = HSConstants.Constants.DEFAULT_FLOOR_MATERIAL.seekId;

/**
 * Default ceiling material seek ID from HSConstants
 */
const DEFAULT_CEILING_MATERIAL_SEEK_ID: string = HSConstants.Constants.DEFAULT_CEILING_MATERIAL.seekId;

/**
 * Material information including seek ID and category
 */
interface MaterialInfo {
  /** Unique identifier for the material */
  seekId: string;
  /** Category identifier for the material */
  categoryId: string;
}

/**
 * Floor pave information
 */
interface FloorPaveInfo {
  /** Type of floor pave: 'default' | 'model' | 'customized' */
  floorPaveType: string;
  /** Seek ID of the floor material */
  floorMaterialSeekId: string;
  /** Category ID of the floor material */
  floorMaterialCategoryId?: string;
}

/**
 * Wall pave information
 */
interface WallPaveInfo {
  /** Type of wall pave: 'default' | 'model' | 'customized' */
  wallPaveType: string;
  /** Seek ID of the wall material */
  wallMaterialSeekId: string;
  /** Category ID of the wall material */
  wallMaterialCategoryId?: string;
}

/**
 * Wall structure information
 */
interface WallInfo {
  /** Type of the wall curve */
  curveType: string;
}

/**
 * Structure category definition
 */
interface StructureCategory {
  /** Display name of the structure */
  name?: string;
  /** Type identifier */
  type: string;
  /** Entity instance ID */
  id: string;
  /** Category type identifier */
  categoryType?: string;
  /** Sub-content type identifier */
  subContentType?: string;
}

/**
 * Furniture information
 */
interface FurnitureInfo {
  /** Entity instance ID */
  id: string;
  /** Array of category types */
  categories: string[];
  /** Material information map */
  materials: Record<string, unknown>;
}

/**
 * Opening type information
 */
interface OpeningTypeInfo {
  /** Entity instance ID */
  entityId: string;
  /** Category type identifier */
  categoryId: string;
}

/**
 * Scene data containing all entities
 */
interface SceneData {
  /** Array of pave entities */
  paves: Entity[];
  /** Map of room ID to room faces */
  roomFaces: Map<string, Face[]>;
  /** Room information array */
  roomInfos: RoomInfo[];
  /** Opening entities */
  openings: Entity[];
  /** Customized entities */
  customizedEntities: Entity[];
  /** Content entities (furniture, fixtures, etc.) */
  contents: Entity[];
  /** Customized background walls */
  customizedBackgroundWall: Entity[];
  /** Customized ceilings */
  customizedCeiling: Entity[];
  /** Customized platforms */
  customizedPlatform: Entity[];
  /** Cornice entities */
  cornices: Entity[];
  /** Baseboard entities */
  baseboards: Entity[];
  /** Customized PM entities */
  customizedPMEntities: Entity[];
  /** Customization entities */
  customizationEntities: Entity[];
}

/**
 * Room information
 */
interface RoomInfo {
  /** Room instance */
  instance: EntityInstance;
  /** Structures in the room (walls, etc.) */
  structures: Array<HSCore.Model.Wall | unknown>;
}

/**
 * Entity with parameters and metadata
 */
interface Entity {
  /** Entity instance information */
  instance: EntityInstance;
  /** Child entities */
  children?: Entity[];
  /** Entity type information */
  type: EntityType;
  /** Entity category information */
  category: EntityCategory;
  /** Curve information (for walls) */
  curve?: Curve;
  /**
   * Get parameter value by name
   * @param paramName - Name of the parameter
   */
  getParameterValue<T = unknown>(paramName: string): T | undefined;
}

/**
 * Entity instance
 */
interface EntityInstance {
  /** Unique identifier */
  id: string;
}

/**
 * Entity type information
 */
interface EntityType {
  /** Class type identifier */
  classType?: string;
  /** Content type identifier */
  contentType?: string;
}

/**
 * Entity category information
 */
interface EntityCategory {
  /** Display name */
  displayName: string;
  /** Category type identifier */
  categoryType: string;
}

/**
 * Curve information
 */
interface Curve {
  /**
   * Get the type of the curve
   */
  getType(): string;
}

/**
 * Room face information
 */
interface Face {
  /** Entity instance */
  instance: EntityInstance;
  /** Face type */
  type: EntityType;
}

/**
 * Pattern information with materials
 */
interface PatternInfo {
  /** Seek ID of the pattern */
  seekId?: string;
  /** Units information array */
  unitsInfos?: Array<{
    /** Materials used in this unit */
    materials?: Material[];
  }>;
}

/**
 * Material definition
 */
interface Material {
  /** Seek ID of the material */
  seekId?: string;
  /** Category type of the material */
  categoryType?: string;
}

/**
 * Room entity
 */
interface Room {
  /** Room instance */
  instance: EntityInstance;
}

/**
 * Extract material information from entities
 * @param entities - Array of entities to search
 * @param defaultSeekId - Default seek ID if not found
 * @param defaultCategoryId - Default category ID
 * @returns Material information
 */
declare function extractMaterialInfo(
  entities: Entity[],
  defaultSeekId?: string,
  defaultCategoryId?: string
): MaterialInfo;

/**
 * Check if entity matches a specific category
 * @param entity - Entity to check
 * @param category - Category to match against
 */
declare function isBomEntityMatchCategory(
  entity: Entity,
  category: StructureCategory
): boolean;

/**
 * Get structure name by type
 * @param type - Structure type
 */
declare function getStructNameOfType(type: string): string;

/**
 * Check if content type is a specific type
 * @param contentType - Content type to check
 * @param targetType - Target type string
 */
declare function contentTypeIsTypeOf(
  contentType: string | undefined,
  targetType: string
): boolean;

/**
 * BOM (Bill of Materials) data adapter for extracting and transforming scene data
 * into structured BOM information for rooms and their contents
 */
export declare class BomDataAdapter {
  /**
   * Get floor pave information for a room
   * @param sceneData - Scene data containing all entities
   * @param room - Target room entity
   * @returns Floor pave information including type and material
   */
  static getFloorPave(sceneData: SceneData, room: Room): FloorPaveInfo;

  /**
   * Get wall pave information for a room
   * @param sceneData - Scene data containing all entities
   * @param room - Target room entity
   * @returns Wall pave information including type and material
   */
  static getWallPave(sceneData: SceneData, room: Room): WallPaveInfo;

  /**
   * Update and extract wall structure information
   * @param sceneData - Scene data containing all entities
   * @returns Array of wall information or undefined if no walls found
   */
  static updateWallInfo(sceneData: SceneData): WallInfo[] | undefined;

  /**
   * Get structural elements information for a room
   * Includes openings, niches, columns, beams, risers, etc.
   * @param sceneData - Scene data containing all entities
   * @param room - Target room entity
   * @returns Array of structure categories with IDs
   */
  static getStructureInfo(sceneData: SceneData, room: Room): StructureCategory[];

  /**
   * Get furniture and customization entities for a room
   * @param sceneData - Scene data containing all entities
   * @param room - Target room entity
   * @returns Array of furniture information
   */
  static getFurnitureInfo(sceneData: SceneData, room: Room): FurnitureInfo[];

  /**
   * Get opening type information for a room
   * @param sceneData - Scene data containing all entities
   * @param room - Target room entity
   * @returns Array of opening type information
   */
  static getOpeningTypeInfo(sceneData: SceneData, room: Room): OpeningTypeInfo[];

  /**
   * Get background wall type for a room
   * @param sceneData - Scene data containing all entities
   * @param room - Target room entity
   * @returns Background wall type: 'default' | 'model' | 'customized'
   */
  static getBackgroundWallType(sceneData: SceneData, room: Room): string;

  /**
   * Get ceiling type for a room
   * @param sceneData - Scene data containing all entities
   * @param room - Target room entity
   * @returns Ceiling type: 'none' | 'model' | 'customized'
   */
  static getCeilingType(sceneData: SceneData, room: Room): string;

  /**
   * Check if room has a platform
   * @param sceneData - Scene data containing all entities
   * @param room - Target room entity
   * @returns True if platform exists
   */
  static hasPlatform(sceneData: SceneData, room: Room): boolean;

  /**
   * Check if room has cornice
   * @param sceneData - Scene data containing all entities
   * @param room - Target room entity
   * @returns True if cornice exists
   */
  static hasCornice(sceneData: SceneData, room: Room): boolean;

  /**
   * Check if room has baseboard
   * @param sceneData - Scene data containing all entities
   * @param room - Target room entity
   * @returns True if baseboard exists
   */
  static hasBaseBoard(sceneData: SceneData, room: Room): boolean;

  /**
   * Check if room has DIY (Do-It-Yourself) elements
   * @param sceneData - Scene data containing all entities
   * @param room - Target room entity
   * @returns True if DIY elements exist
   */
  static hasDIY(sceneData: SceneData, room: Room): boolean;

  /**
   * Check if room has customization entities
   * @param sceneData - Scene data containing all entities
   * @param room - Target room entity
   * @returns True if customization entities exist
   */
  static hasCustomization(sceneData: SceneData, room: Room): boolean;
}