/**
 * Type definitions for CustomizedModelLightBand module
 * Original Module ID: 97922
 */

import { Entity, Entity_IO } from './Entity';
import { Signal } from './Signal';
import { ContentType, ContentTypeEnum } from './HSCatalog';

// ============================================================================
// Interfaces & Types
// ============================================================================

/**
 * Options for light band configuration
 */
interface LightBandOptions {
  /** Unique identifier for the light band */
  lightBandId?: string;
  /** Relative indices for positioning */
  relativeIndices?: number[];
  [key: string]: unknown;
}

/**
 * Parameters for light band geometry and appearance
 */
interface LightBandParameters {
  /** Path definition for the light band */
  path?: string;
  /** Configuration options */
  options?: LightBandOptions;
  /** Normal vector of the background face */
  backgroundFaceNormal?: { x: number; y: number; z: number };
  /** Additional parameters */
  [key: string]: unknown;
}

/**
 * Metadata structure for light band entity
 */
interface LightBandMetadata {
  /** Metadata identifier */
  id?: string;
  /** Content categories */
  categories?: string[];
  /** Content type descriptor */
  contentType: ContentType;
  /** Additional parameters */
  parameters?: {
    flip?: boolean;
    [key: string]: unknown;
  };
}

/**
 * Sketch model data associated with graphics elements
 */
interface SketchModelData {
  /** Document identifier */
  documentId: string;
  [key: string]: unknown;
}

/**
 * Graphics element with optional sketch data
 */
interface GraphicsElement {
  /** Associated sketch model data */
  sketchModelData?: SketchModelData;
  [key: string]: unknown;
}

/**
 * Container for face and edge graphics data
 */
interface GraphicsData {
  /** Map of face indices to face data */
  faces: Map<number, GraphicsElement>;
  /** Map of edge indices to edge data */
  edges: Map<number, GraphicsElement>;
}

/**
 * Result from light band creation operation
 */
interface LightBandCreationResult {
  /** Updated WebCAD document */
  webCADDocument: unknown;
  /** Generated light band identifier */
  lightBandId: string;
  /** Relative positioning indices */
  relativeIndices: number[];
}

/**
 * Configuration for constructing light band metadata
 */
interface LightBandMetaConfig {
  /** Path definition */
  path: string;
  /** Geometry and appearance parameters */
  parameters?: Record<string, unknown>;
  /** Configuration options */
  options?: LightBandOptions;
}

/**
 * Options for dump/load operations
 */
interface SerializationOptions {
  [key: string]: unknown;
}

// ============================================================================
// CustomizedModelLightBand_IO Class
// ============================================================================

/**
 * Input/Output handler for CustomizedModelLightBand serialization
 * Manages persistence and restoration of light band entities
 */
export declare class CustomizedModelLightBand_IO extends Entity_IO {
  /**
   * Serialize a light band entity to storage format
   * @param entity - The light band entity to serialize
   * @param callback - Optional callback invoked after serialization
   * @param includeMetadata - Whether to include metadata in output (default: true)
   * @param options - Additional serialization options
   * @returns Serialized entity data array
   */
  dump(
    entity: CustomizedModelLightBand,
    callback?: (result: unknown[], entity: CustomizedModelLightBand) => void,
    includeMetadata?: boolean,
    options?: SerializationOptions
  ): unknown[];

  /**
   * Deserialize storage data into a light band entity
   * @param entity - Target entity to populate
   * @param data - Serialized entity data
   * @param options - Deserialization options
   */
  load(
    entity: CustomizedModelLightBand,
    data: { parameters: string; [key: string]: unknown },
    options?: SerializationOptions
  ): void;

  /**
   * Get singleton instance of the IO handler
   */
  static instance(): CustomizedModelLightBand_IO;
}

// ============================================================================
// CustomizedModelLightBand Class
// ============================================================================

/**
 * Represents a customized light band model entity
 * Light bands are decorative lighting elements that can be applied to 3D models
 */
export declare class CustomizedModelLightBand extends Entity {
  /**
   * Host entity that owns this light band
   * @internal
   */
  private _host?: Entity;

  /**
   * Entity metadata including content type and categories
   */
  metadata: LightBandMetadata;

  /**
   * Internal parameters storage
   * @internal
   */
  private _parameters: LightBandParameters;

  /**
   * Cached graphics data
   * @internal
   */
  private _graphicsData?: GraphicsData;

  /**
   * Signal dispatched when material properties change
   */
  readonly signalMaterialChanged: Signal<CustomizedModelLightBand>;

  /**
   * Signal dispatched when WebCAD document is modified
   */
  readonly signalWebCADDocChanged: Signal<CustomizedModelLightBand>;

  /**
   * Create a new light band entity
   * @param name - Entity name (default: empty string)
   * @param parent - Optional parent entity
   */
  constructor(name?: string, parent?: Entity);

  /**
   * Get light band parameters (geometry, appearance, options)
   */
  get parameters(): LightBandParameters;

  /**
   * Set light band parameters
   */
  set parameters(value: LightBandParameters);

  /**
   * Get content type descriptor
   */
  get contentType(): ContentType;

  /**
   * Get path definition for the light band
   */
  get path(): string | undefined;

  /**
   * Get configuration options
   */
  get options(): LightBandOptions | undefined;

  /**
   * Get unique identifier for this light band
   */
  get lightBandId(): string;

  /**
   * Check if the light band is flipped
   */
  get flip(): boolean;

  /**
   * Get normal vector of the background face
   */
  get backgroundFaceNormal(): { x: number; y: number; z: number } | undefined;

  /**
   * Get the IO handler for this entity type
   */
  getIO(): CustomizedModelLightBand_IO;

  /**
   * Construct metadata configuration for a light band
   * @param path - Path definition
   * @param parameters - Geometry and appearance parameters
   * @param options - Configuration options
   * @returns Metadata configuration object
   */
  static constructMetaData(
    path: string,
    parameters?: Record<string, unknown>,
    options?: LightBandOptions
  ): LightBandMetaConfig;

  /**
   * Initialize entity from metadata configuration
   * @param meta - Metadata configuration
   */
  initByMeta(meta: LightBandMetaConfig): void;

  /**
   * Mark material as dirty, triggering update and signal dispatch
   */
  dirtyMaterial(): void;

  /**
   * Get the host entity that owns this light band
   */
  getHost(): Entity | undefined;

  /**
   * Assign this light band to a host entity
   * @param host - Host entity
   */
  assignTo(host: Entity): void;

  /**
   * Extract graphics data from parent entity for this light band
   * @param parentData - Parent entity graphics data
   * @param targetData - Target container for filtered data
   * @internal
   */
  private _getGraphicsDataFromParent(
    parentData: GraphicsData,
    targetData: GraphicsData
  ): void;

  /**
   * Get graphics data (faces and edges) synchronously
   * @returns Graphics data container
   */
  getGraphicsData(): GraphicsData;

  /**
   * Get graphics data (faces and edges) asynchronously
   * @returns Promise resolving to graphics data
   */
  getGraphicsDataAsync(): Promise<GraphicsData>;

  /**
   * Apply this light band configuration to a customized model
   * @param customizedModel - Target customized model entity
   * @returns True if application succeeded
   */
  applyToCustomizedModel(customizedModel: Entity & {
    webCADDocument: unknown;
    setWebCADDocumentQuietly(doc: unknown): void;
    _graphicsData?: GraphicsData;
  }): boolean;

  /**
   * Update entity metadata and synchronize with WebCAD document
   * @param meta - New metadata configuration
   */
  updateMetadata(meta: LightBandMetaConfig): void;

  /**
   * Get current parameters from the WebCAD document
   * @returns Current parameters object
   */
  getParameters(): LightBandParameters;

  /**
   * Check if content entity is within this light band's loop
   * @param content - Content entity to test
   * @param includeEdge - Whether to include points on the edge (default: false)
   * @returns True if content is inside the loop
   */
  isContentInLoop(content: Entity, includeEdge?: boolean): boolean;

  /**
   * Check if this entity can participate in field transactions
   * @returns Always false for light bands
   */
  canTransactField(): boolean;
}

/**
 * Register CustomizedModelLightBand class with the entity system
 * @internal
 */
declare module './Entity' {
  namespace Entity {
    function registerClass(
      className: string,
      constructor: typeof CustomizedModelLightBand
    ): void;
  }
}