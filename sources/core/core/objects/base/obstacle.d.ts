import type { CustomizedModel_IO, CustomizedModel } from './CustomizedModel';
import type { Entity } from './Entity';
import type { MoldingTypeEnum } from './MoldingTypeEnum';
import type { Signal } from './Signal';
import type { Material } from './Material';
import type { ContentType } from '../types/ContentType';

/**
 * Serialized wall molding mapping structure
 * Maps molding type enum to entity ID
 */
interface WallMoldingsData {
  [moldingType: string]: string;
}

/**
 * Dumped obstacle data structure
 */
interface ObstacleDumpData {
  /** Whether the obstacle height responds to room height changes */
  responsiveHeight?: boolean;
  /** Wall molding configurations keyed by molding type */
  wallMoldings?: WallMoldingsData;
  [key: string]: unknown;
}

/**
 * Molding change event data
 */
interface MoldingChangedEventData {
  /** The type of molding that changed */
  moldingEnum: MoldingTypeEnum;
  /** Previous molding entity (if any) */
  oldMolding?: Entity;
  /** New molding entity (if any) */
  newMolding?: Entity;
}

/**
 * Magic flipping setting tuple
 * [flipX, flipY, flipZ]
 */
type MagicFlippingSetting = [boolean, boolean, boolean];

/**
 * Graphics face data with custom metadata
 */
interface GraphicsFaceData {
  customData?: {
    /** Material data for false pillar rendering */
    fpMaterialData?: MaterialData;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Graphics data collection structure
 */
interface GraphicsData {
  faces: GraphicsFaceData[];
  [key: string]: unknown;
}

/**
 * Material data structure for rendering
 */
interface MaterialData {
  /** Normal map texture URL */
  normalTexture?: string;
  /** Texture tiling size in X direction */
  tileSize_x?: number;
  /** Texture tiling size in Y direction */
  tileSize_y?: number;
  /** Base texture URI */
  textureURI?: string;
  [key: string]: unknown;
}

/**
 * Material data tuple entry
 * [pathPrefix, materialData]
 */
type MaterialDataEntry = [string, MaterialData];

/**
 * Callback for iterating over moldings
 */
type MoldingIteratorCallback = (molding: Entity, moldingType: string) => void;

/**
 * Callback for iterating over graphics face data
 */
type GraphicsDataIteratorCallback = (faceData: GraphicsFaceData, index: number) => void;

/**
 * I/O handler for Obstacle entities
 * Manages serialization and deserialization of obstacle data including wall moldings
 */
declare class Obstacle_IO extends CustomizedModel_IO {
  /**
   * Serialize an obstacle entity to JSON-compatible format
   * @param entity - The obstacle entity to serialize
   * @param target - Optional target for dump operation
   * @param deep - Whether to perform deep cloning of related entities
   * @param options - Additional serialization options
   * @returns Array of dumped data objects, first element is the main obstacle data
   */
  dump(
    entity: Obstacle,
    target?: unknown,
    deep?: boolean,
    options?: Record<string, unknown>
  ): Array<Record<string, unknown>>;

  /**
   * Deserialize and populate an obstacle entity from JSON data
   * @param entity - The obstacle entity to populate
   * @param data - Serialized obstacle data
   * @param context - Deserialization context
   */
  load(
    entity: Obstacle,
    data: ObstacleDumpData,
    context: unknown
  ): void;

  /**
   * Get singleton instance of Obstacle_IO
   */
  static instance(): Obstacle_IO;
}

/**
 * Obstacle model representing architectural obstacles like columns, flues, and pipes
 * Supports wall moldings (baseboards, cornices) and responsive height adjustment
 */
declare class Obstacle extends CustomizedModel {
  /**
   * Whether obstacle height automatically adjusts to room height changes
   * @default true
   */
  responsiveHeight: boolean;

  /**
   * Internal storage for wall moldings by type
   * @private
   */
  private _moldings: Map<string, Entity>;

  /**
   * Signal dispatched when molding configuration changes
   */
  signalMoldingChanged?: Signal<MoldingChangedEventData>;

  /**
   * Create a new Obstacle instance
   * @param id - Unique identifier for the obstacle
   * @param contentType - Optional content type definition
   */
  constructor(id?: string, contentType?: ContentType);

  /**
   * Clean up resources and dispose of the obstacle
   */
  destroy(): void;

  /**
   * Get flipping behavior configuration for different obstacle types
   * Controls texture/geometry mirroring on X, Y, Z axes
   * @returns Tuple of [flipX, flipY, flipZ] boolean flags
   */
  magicFlippingSetting(): MagicFlippingSetting;

  /**
   * Find the parent room containing this obstacle
   * @returns The room entity or undefined if not in a room
   */
  getParentRoom(): Entity | undefined;

  /**
   * Get the I/O handler for this obstacle
   * @returns Obstacle_IO singleton instance
   */
  getIO(): Obstacle_IO;

  /**
   * Retrieve a molding entity by type
   * @param moldingType - The molding type enum value
   * @returns The molding entity or undefined
   */
  getMolding(moldingType: MoldingTypeEnum): Entity | undefined;

  /**
   * Remove a molding from the WebCAD document representation
   * @private
   * @param moldingType - The molding type to remove
   */
  private _removeMoldingFromWebCadDocument(moldingType: MoldingTypeEnum): void;

  /**
   * Extract the 3D path vertices for a molding face from WebCAD document
   * @private
   * @param moldingType - The molding type (baseboard or cornice)
   * @returns Array of Vector3 points forming the molding path
   */
  private _getWebCadDocumentFacePath(moldingType: MoldingTypeEnum): THREE.Vector3[];

  /**
   * Add or update a molding in the WebCAD document representation
   * @private
   * @param molding - The molding entity to add
   * @param moldingType - The molding type enum
   */
  private _setMoldingToWebCadDocument(molding: Entity | null, moldingType: MoldingTypeEnum): void;

  /**
   * Set or replace a molding on the obstacle
   * Handles cleanup of old molding and signals change event
   * @param molding - The new molding entity (null to remove)
   * @param moldingType - The molding type being set
   */
  setMolding(molding: Entity | null, moldingType: MoldingTypeEnum): void;

  /**
   * Iterate over all attached moldings
   * @param callback - Function called for each molding
   */
  forEachMolding(callback: MoldingIteratorCallback): void;

  /**
   * Set the height (Z-axis size) of the obstacle
   * @param height - New height value in scene units
   */
  setHeight(height: number): void;

  /**
   * Update height and disable responsive height mode
   * @param height - New height value in scene units
   */
  updateHeight(height: number): void;

  /**
   * Iterate over graphics data for molding faces only
   * @param callback - Function called for each molding face
   */
  traverseMoldingGraphicsData(callback: GraphicsDataIteratorCallback): void;

  /**
   * Iterate over graphics data for body (non-molding) faces only
   * @param callback - Function called for each body face
   */
  traverseBodyGraphicsData(callback: GraphicsDataIteratorCallback): void;

  /**
   * Get complete graphics data for rendering
   * Merges molding material data into face custom data
   * @returns Graphics data structure with all faces
   */
  getGraphicsData(): GraphicsData;

  /**
   * Apply material data to obstacle and its moldings
   * @param materialEntries - Array of material data entries with path prefixes
   */
  setMaterialData(materialEntries: MaterialDataEntry[]): void;

  /**
   * Check if face data represents a molding
   * @param faceData - The face data to check
   * @returns True if face is part of a molding
   */
  protected isMoldingData(faceData: GraphicsFaceData): boolean;

  /**
   * Check if molding face data matches a specific molding type
   * @param faceData - The face data to check
   * @param moldingType - The molding type to match
   * @returns True if face belongs to specified molding type
   */
  protected isMoldingType(faceData: GraphicsFaceData, moldingType: MoldingTypeEnum): boolean;

  /**
   * Check if obstacle content is within a given room
   * @param room - The room entity to test
   * @returns True if obstacle is inside the room
   */
  protected isContentInRoom(room: Entity): boolean;

  /**
   * Apply new dimensions to the obstacle
   * @param xSize - Width in scene units
   * @param ySize - Depth in scene units
   * @param zSize - Height in scene units
   */
  protected applyLengths(xSize: number, ySize: number, zSize: number): void;

  /**
   * Mark entity as modified for change tracking
   */
  protected dirty(): void;

  /**
   * Create new metadata version for document change tracking
   * @private
   */
  private _createNewMetadataForWebDocumentChange(): void;
}

export { Obstacle_IO, Obstacle };