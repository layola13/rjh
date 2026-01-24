/**
 * CustomizedModelLightSlot Module
 * Manages light slot entities within customized 3D models
 */

import { Entity, Entity_IO } from './Entity';
import { Signal } from './Signal';
import { Logger } from './Logger';
import { ContentType, ContentTypeEnum } from './HSCatalog';
import { Constants, ModelClass } from './HSConstants';
import * as THREE from 'three';

/**
 * Graphics data structure containing faces, edges, and contents
 */
interface GraphicsData {
  /** Map of face identifiers to face data */
  faces: Map<string | number, FaceData>;
  /** Map of edge identifiers to edge data */
  edges: Map<string | number, EdgeData>;
  /** Map of content identifiers to content data */
  contents: Map<string | number, unknown>;
}

/**
 * Face data with optional sketch model information
 */
interface FaceData {
  /** Associated sketch model data */
  sketchModelData?: SketchModelData;
  [key: string]: unknown;
}

/**
 * Edge data with optional sketch model information
 */
interface EdgeData {
  /** Associated sketch model data */
  sketchModelData?: SketchModelData;
  [key: string]: unknown;
}

/**
 * Sketch model data linking to document
 */
interface SketchModelData {
  /** Document identifier */
  documentId: string;
  [key: string]: unknown;
}

/**
 * Light slot creation/editing parameters
 */
interface LightSlotParameters {
  /** Model file path */
  path?: string;
  /** Width in units */
  width?: number;
  /** Height in units */
  height?: number;
  /** Flip orientation flag */
  flip?: boolean;
  /** A-dimension length (computed from height) */
  aLength?: number;
  /** B-dimension length (computed from width) */
  bLength?: number;
  /** Background face normal vector */
  backgroundFaceNormal?: THREE.Vector3;
  /** Additional options */
  options?: LightSlotOptions;
  [key: string]: unknown;
}

/**
 * Light slot configuration options
 */
interface LightSlotOptions {
  /** Unique light slot identifier */
  lightSlotId?: string;
  /** Validation normal vector */
  validateNormal?: THREE.Vector3;
  /** Array of validation normal vectors */
  validateNormals?: THREE.Vector3[];
  /** Relative index mappings */
  relativeIndices?: number[];
  [key: string]: unknown;
}

/**
 * Metadata describing light slot content
 */
interface LightSlotMetadata {
  /** Unique metadata identifier */
  id: string;
  /** Content categories */
  categories: string[];
  /** Content type classification */
  contentType: ContentType;
  /** Flag indicating light band presence */
  hasLightBand?: boolean;
}

/**
 * Result of light slot creation operation
 */
interface LightSlotCreationResult {
  /** WebCAD document with applied changes */
  webCADDocument: unknown;
  /** Generated light slot identifier */
  lightSlotId: string;
  /** Validation flag */
  isValid: boolean;
  /** Relative index mappings */
  relativeIndices?: number[];
}

/**
 * Projection data for light slot
 */
interface ProjectionData {
  /** Associated document identifier */
  docId: string;
  [key: string]: unknown;
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
  /** Serialized parameters as JSON string */
  parameters: string;
  [key: string]: unknown;
}

/**
 * I/O handler for CustomizedModelLightSlot serialization/deserialization
 */
export declare class CustomizedModelLightSlot_IO extends Entity_IO {
  /**
   * Serialize light slot entity to storable format
   * @param entity - Entity to serialize
   * @param callback - Optional callback invoked after dump
   * @param includeChildren - Whether to include child entities
   * @param options - Additional dump options
   * @returns Serialized data array
   */
  dump(
    entity: CustomizedModelLightSlot,
    callback?: (data: unknown[], entity: CustomizedModelLightSlot) => void,
    includeChildren?: boolean,
    options?: DumpOptions
  ): unknown[];

  /**
   * Deserialize light slot entity from stored format
   * @param entity - Target entity to populate
   * @param data - Serialized data
   * @param options - Additional load options
   */
  load(
    entity: CustomizedModelLightSlot,
    data: SerializedData,
    options?: LoadOptions
  ): void;

  /**
   * Get singleton instance of I/O handler
   * @returns Singleton instance
   */
  static instance(): CustomizedModelLightSlot_IO;
}

/**
 * Represents a customizable light slot within a 3D model
 * Manages geometry, materials, and relationships with parent models
 */
export declare class CustomizedModelLightSlot extends Entity {
  /** Host entity containing this light slot */
  private _host: Entity | null;

  /** Light slot metadata */
  metadata: LightSlotMetadata;

  /** Light slot parameters */
  private _parameters: LightSlotParameters;

  /** Bottom projection data */
  bottomProjection?: ProjectionData[];

  /** Top projection data */
  topProjection?: ProjectionData[];

  /** Signal dispatched when material changes */
  signalMaterialChanged: Signal<unknown>;

  /** Signal dispatched when WebCAD document changes */
  signalWebCADDocChanged: Signal<unknown>;

  /**
   * Create a new light slot entity
   * @param name - Entity name
   * @param parent - Optional parent entity
   */
  constructor(name?: string, parent?: Entity | undefined);

  /** Get light slot parameters */
  get parameters(): LightSlotParameters;

  /** Set light slot parameters */
  set parameters(value: LightSlotParameters);

  /** Get content type from metadata */
  get contentType(): ContentType;

  /** Check if light slot has a light band */
  get hasLightBand(): boolean;

  /** Get model file path */
  get path(): string | undefined;

  /** Get configuration options */
  get options(): LightSlotOptions | undefined;

  /** Get unique light slot identifier */
  get lightSlotId(): string;

  /** Get flip orientation flag */
  get flip(): boolean;

  /** Get width (defaults to constant if not set) */
  get width(): number;

  /** Get height (defaults to constant if not set) */
  get height(): number;

  /** Get background face normal vector */
  get backgroundFaceNormal(): THREE.Vector3 | undefined;

  /**
   * Get I/O handler instance for this entity type
   * @returns I/O handler
   */
  getIO(): CustomizedModelLightSlot_IO;

  /**
   * Construct metadata object for light slot creation
   * @param path - Model file path
   * @param parameters - Light slot parameters
   * @param options - Configuration options
   * @returns Constructed metadata
   */
  static constructMetaData(
    path: string,
    parameters?: Partial<LightSlotParameters>,
    options?: Partial<LightSlotOptions>
  ): LightSlotParameters & { options: LightSlotOptions };

  /**
   * Initialize entity from metadata object
   * @param metadata - Metadata to apply
   */
  initByMeta(metadata: LightSlotParameters & { options?: LightSlotOptions }): void;

  /**
   * Create default metadata structure
   */
  createDefaultMetaData(): void;

  /**
   * @deprecated Use getEntitiesAppendOnLightSlot instead
   */
  getEntitesAppendOnLightSlot(): Entity[];

  /**
   * Get entities attached to this light slot
   * @returns Array of attached entities
   */
  getEntitiesAppendOnLightSlot(): Entity[];

  /**
   * Mark geometry as needing update
   */
  dirtyGeometry(): void;

  /**
   * Mark material as needing update
   * @param material - Material that changed
   */
  dirtyMaterial(material?: unknown): void;

  /**
   * Extract graphics data from parent entity
   * @param parentData - Parent's graphics data
   * @param targetData - Target data structure to populate
   */
  private _getGraphicsDataFromParent(
    parentData: GraphicsData,
    targetData: GraphicsData
  ): void;

  /**
   * Get graphics data synchronously
   * @returns Graphics data containing faces, edges, and contents
   */
  getGraphicsData(): GraphicsData;

  /**
   * Get graphics data asynchronously
   * @returns Promise resolving to graphics data
   */
  getGraphicsDataAsync(): Promise<GraphicsData>;

  /**
   * Get host entity
   * @returns Host entity or null
   */
  getHost(): Entity | null;

  /**
   * Assign this light slot to a host entity
   * @param host - Host entity
   */
  assignTo(host: Entity): void;

  /**
   * Get material for a specific face
   * @param faceId - Face identifier
   * @returns Face material or undefined
   */
  getFaceMaterial(faceId: string | number): unknown | undefined;

  /**
   * Apply this light slot to a customized model
   * @param customizedModel - Target customized model
   * @returns True if application succeeded
   */
  applyToCustomizedModel(customizedModel: Entity & { webCADDocument?: unknown }): boolean;

  /**
   * Update entity metadata and refresh geometry
   * @param metadata - New metadata
   */
  updateMetadata(metadata: LightSlotParameters & { options?: LightSlotOptions }): void;

  /**
   * Get current parameters from WebCAD document
   * @returns Current parameters
   */
  getParameters(): Partial<LightSlotParameters> | Record<string, never>;

  /**
   * Check if content entity is within this light slot's loop
   * @param content - Content entity to check
   * @param checkLayer - Whether to check layer matching
   * @returns True if content is in loop
   */
  isContentInLoop(content: Entity, checkLayer?: boolean): boolean;

  /**
   * Get top projection filtered by this light slot
   * @returns Top projection data or undefined
   */
  getTopProjection(): ProjectionData[] | undefined;

  /**
   * Get bottom projection filtered by this light slot
   * @returns Bottom projection data or undefined
   */
  getBottomProjection(): ProjectionData[] | undefined;

  /**
   * Get front projection filtered by this light slot
   * @returns Front projection data
   */
  getFrontProjection(): ProjectionData[];

  /**
   * Check if field transactions are allowed
   * @returns Always false for light slots
   */
  canTransactField(): false;
}