/**
 * Material utility class for cloning and managing materials from JSON data.
 * Handles deserialization of design materials, entities, and their associated metadata.
 */
export declare class MaterialUtil {
  /**
   * Clones a material entity structure from JSON data.
   * 
   * @param jsonData - The source JSON object containing material, entity, and metadata information
   * @returns A promise that resolves to the cloned entity, or undefined if cloning fails
   * 
   * @remarks
   * This method performs the following operations:
   * - Retrieves the design products map from metadata
   * - Constructs a clone context with ID generators for entities and materials
   * - Processes material data and entity relationships
   * - Loads the entry entity by ID using the prepared context
   * 
   * @throws Logs an error to 'HSCore.Load.Error' category if product map retrieval fails
   */
  static cloneFromJson(jsonData: MaterialJsonData): Promise<Entity | undefined>;
}

/**
 * Source JSON structure for material cloning operations.
 */
export interface MaterialJsonData {
  /** Unique identifier of the root entry entity to load */
  entryId: string | number;
  
  /** Metadata containing version and configuration information */
  meta: MaterialMetadata;
  
  /** Optional array of entity data objects indexed by ID */
  data?: EntityData[];
  
  /** Optional array of material definitions */
  materials?: MaterialData[];
}

/**
 * Metadata for material version and configuration.
 */
export interface MaterialMetadata {
  /** Schema or format version of the material data */
  version: string | number;
}

/**
 * Entity data structure with identifier.
 */
export interface EntityData {
  /** Unique identifier for the entity */
  id: string | number;
  
  /** Additional entity properties (structure depends on entity type) */
  [key: string]: unknown;
}

/**
 * Material definition data.
 */
export interface MaterialData {
  /** Unique identifier for the material */
  id: string | number;
  
  /** Additional material properties (texture paths, colors, parameters, etc.) */
  [key: string]: unknown;
}

/**
 * Internal context used during the cloning process.
 * @internal
 */
interface CloneContext {
  /** Version information from source metadata */
  version: string | number;
  
  /** Map of entity data indexed by ID */
  data: Record<string | number, EntityData>;
  
  /** Container for loaded entity instances */
  entities: Record<string | number, unknown>;
  
  /** Map of instantiated material objects */
  materials: Map<string | number, unknown>;
  
  /** Map of raw material data definitions */
  materialsData: Map<string | number, MaterialData>;
  
  /** Map of design products for material resolution */
  productsMap: Map<string | number, unknown>;
  
  /** ID generator for entity cloning operations */
  idGenerator: IDGenerator;
  
  /** ID generator for material cloning operations */
  materialIdGenerator: IDGenerator;
}

/**
 * ID generator interface for clone operations.
 * @internal
 */
interface IDGenerator {
  /** Generates a new unique ID for cloned objects */
  generate(): string | number;
  
  /** Additional generator methods */
  [key: string]: unknown;
}