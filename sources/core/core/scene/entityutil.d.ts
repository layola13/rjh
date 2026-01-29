/**
 * Entity utility module providing helper functions for entity manipulation,
 * cloning, traversal, and metadata management.
 * 
 * @module EntityUtil
 */

/**
 * Options for dumping metadata
 */
export interface MetaDumpOptions {
  /** Whether to perform shallow save of metadata */
  shallowSaveMeta?: boolean;
}

/**
 * Product metadata information
 */
export interface ProductMetadata {
  id: string;
  seekId: string;
  [key: string]: unknown;
}

/**
 * Product map entry with metadata and optional filter
 */
export interface ProductMapEntry {
  metadata: ProductMetadata;
  filter?: string[];
}

/**
 * ID generator for cloning operations
 */
export interface IDGenerator {
  /**
   * Generate a new ID or retrieve mapped ID for existing one
   * @param originalId - Original ID to map from
   * @returns Generated or mapped ID
   */
  generate(originalId?: string): string;
  
  /**
   * Get the new ID for an original ID
   * @param originalId - Original ID
   * @returns Mapped new ID or empty string
   */
  getNewId(originalId: string): string;
}

/**
 * Entity data structure
 */
export interface EntityData {
  id: string;
  [key: string]: unknown;
}

/**
 * Material data structure
 */
export interface MaterialData {
  id: string;
  [key: string]: unknown;
}

/**
 * State data structure
 */
export interface StateData {
  id: string;
  [key: string]: unknown;
}

/**
 * Constraint data structure
 */
export interface ConstraintData {
  id: string;
  [key: string]: unknown;
}

/**
 * Product data structure
 */
export interface ProductData {
  seekId: string;
  data?: unknown;
  [key: string]: unknown;
}

/**
 * Metadata for entity JSON
 */
export interface EntityJSONMeta {
  version?: string;
  [key: string]: unknown;
}

/**
 * Entity JSON structure for cloning
 */
export interface EntityJSON {
  /** Entry ID of the root entity */
  entryId: string;
  
  /** Metadata information */
  meta?: EntityJSONMeta;
  
  /** Entity data array */
  data?: EntityData[];
  
  /** Materials array */
  materials?: MaterialData[];
  
  /** Products array */
  products?: ProductData[];
  
  /** States array */
  states?: StateData[];
  
  /** Constraints array */
  constraints?: ConstraintData[];
}

/**
 * Clone context for entity operations
 */
export interface CloneContext {
  version?: string;
  entryId: string;
  data: Record<string, EntityData>;
  materialsData: Map<string, MaterialData>;
  statesData: Record<string, StateData>;
  constraintsData: Map<string, ConstraintData>;
  entities: Record<string, unknown>;
  materials: Map<string, unknown>;
  states: Record<string, unknown>;
  constraints: Record<string, unknown>;
  productsMap: Map<string, unknown>;
  idGenerator: IDGenerator;
  materialIdGenerator: IDGenerator;
  stateIdGenerator: IDGenerator;
  constraintIdGenerator: IDGenerator;
}

/**
 * Entity type with content type support
 */
export interface IEntity {
  id: string;
  contentType?: IContentType;
  metadata?: ProductMetadata;
  
  getUniqueParent?(): IEntity | null;
  getFirstParent?(): IEntity | null;
  forEachChild?(callback: (entity: IEntity) => void): void;
  forEachContent?(callback: (entity: IEntity) => void): void;
  forEachMember?(callback: (entity: IEntity) => void): void;
  getRelatedMetaDatas?(): ProductMetadata[];
  getMetadataFilterKeys?(meta: ProductMetadata): string[];
}

/**
 * Content type interface
 */
export interface IContentType {
  isTypeOf(type: string | IContentType): boolean;
}

/**
 * Document interface
 */
export interface IDocument {
  scene: IEntity;
  
  forEachWall(callback: (entity: IEntity) => void): void;
  forEachMolding(callback: (entity: IEntity) => void): void;
  forEachMaterial(callback: (entity: IEntity) => void): void;
  forEachGroup(callback: (group: IGroup) => void): void;
  forEachOpening(callback: (entity: IEntity) => void): void;
}

/**
 * Group interface with members
 */
export interface IGroup {
  members: Record<string, IEntity>;
}

/**
 * Utility class for entity operations including cloning, validation, 
 * traversal, and metadata management.
 */
export declare class EntityUtil {
  /**
   * Clone an entity from its JSON representation
   * 
   * @param entityJSON - JSON representation of the entity
   * @returns Cloned entity instance
   */
  static cloneEntityFromJSON(entityJSON: EntityJSON): IEntity;

  /**
   * Validate if a string is a valid seek ID
   * 
   * A valid seek ID must:
   * - Be a string
   * - Have length 36 when extracted (after splitting by "/")
   * - Contain at least one hyphen
   * 
   * @param seekId - Seek ID to validate
   * @returns True if valid, false otherwise
   */
  static isValidSeekId(seekId?: string): boolean;

  /**
   * Get metadata for dumping operations
   * 
   * @param metadataId - Metadata ID or seek ID
   * @param options - Dump options
   * @returns Metadata object or false if invalid
   */
  static getMetaToDump(
    metadataId: string,
    options?: MetaDumpOptions
  ): ProductMetadata | false;

  /**
   * Determine if an entity requires deep metadata save
   * 
   * Returns true if:
   * - Entity has metadata with invalid seek ID
   * - Entity is a PAssembly, WaterJetTile, CustomizedModel, or NCustomizedFeatureModel
   * 
   * @param entity - Entity to check
   * @returns True if deep save is required
   */
  static deepSaveMeta(entity: IEntity): boolean;

  /**
   * Save metadata for an entity and its related metadata to a products map
   * 
   * @param entity - Entity to save metadata for
   * @param productsMap - Map to store product metadata
   * @param filterFunc - Optional filter function to determine if entity should be processed
   * @param includeFilter - Whether to include filter keys in the map entry
   * @param deepSaveFilter - Optional filter to determine if deep save is needed
   */
  static saveMetadata(
    entity: IEntity,
    productsMap: Map<string, ProductMetadata | ProductMapEntry>,
    filterFunc?: ((entity: IEntity) => boolean) | undefined,
    includeFilter?: boolean,
    deepSaveFilter?: ((entity: IEntity) => boolean) | undefined
  ): void;

  /**
   * Create an ID generator for cloning operations
   * 
   * @param idMap - Map to store original to new ID mappings
   * @param generatorType - Type of ID generator
   * @returns ID generator instance
   */
  static createIDGeneratorForClone(
    idMap: Map<string, string>,
    generatorType: number
  ): IDGenerator;

  /**
   * Get all entities from a document
   * 
   * Collects entities from:
   * - Scene traversal
   * - Walls
   * - Moldings
   * - Materials
   * - Groups
   * - Openings
   * 
   * @param document - Document to extract entities from (uses active document if not provided)
   * @returns Map of entity ID to entity
   */
  static getAllEntities(document?: IDocument): Map<string, IEntity>;

  /**
   * Get the root entity by traversing up the parent hierarchy
   * 
   * Traverses up until reaching a Layer parent or no parent exists
   * 
   * @param entity - Entity to find root for
   * @returns Root entity
   */
  static getRootEntity(entity: IEntity): IEntity;

  /**
   * Get the parent PAssembly of an entity
   * 
   * @param entity - Entity to find parent assembly for
   * @returns Parent PAssembly or undefined
   */
  static getParentPAssembly(entity: IEntity): IEntity | undefined;

  /**
   * Check if an entity is a child of a specific content type
   * 
   * @param entity - Entity to check
   * @param contentType - Content type to match
   * @returns True if entity is a descendant of the content type
   */
  static isChildOf(entity: IEntity, contentType: string | IContentType): boolean;

  /**
   * Get parent entity by content type
   * 
   * Traverses up the parent hierarchy to find a parent matching the content type
   * 
   * @param entity - Entity to start from
   * @param contentType - Content type to match
   * @returns Parent entity or null if not found
   */
  static getParentByContentType(
    entity: IEntity,
    contentType: string | IContentType
  ): IEntity | null;

  /**
   * Traverse entity hierarchy and apply function to each entity
   * 
   * Traverses:
   * - Children (via forEachChild)
   * - Contents (via forEachContent)
   * - Members (via forEachMember)
   * 
   * @param entity - Root entity to traverse
   * @param callback - Function to apply to each entity
   */
  static traverseApplyFuncForEntity(
    entity: IEntity,
    callback: (entity: IEntity) => void
  ): void;

  /**
   * Traverse multiple entities and apply function to each
   * 
   * @param entities - Array of entities to traverse
   * @param callback - Function to apply to each entity
   */
  static traverseApplyFuncForEntities(
    entities: IEntity[],
    callback: (entity: IEntity) => void
  ): void;

  /**
   * Traverse entity and collect entities matching a content type
   * 
   * @param entity - Root entity to traverse
   * @param contentType - Content type to match
   * @param results - Array to collect results (created if not provided)
   * @param filterFunc - Optional filter to exclude entities
   * @returns Array of matching entities
   */
  static traverseGetEntitiesByContentType(
    entity: IEntity,
    contentType: string | IContentType,
    results?: IEntity[],
    filterFunc?: (entity: IEntity) => boolean
  ): IEntity[];

  /**
   * Traverse multiple entities and collect entities matching a content type
   * 
   * @param entities - Array of root entities to traverse
   * @param contentType - Content type to match
   * @param results - Array to collect results (created if not provided)
   * @param filterFunc - Optional filter to exclude entities
   * @returns Array of matching entities
   */
  static traverseGetEntitiesByContentTypeFromEntities(
    entities: IEntity[],
    contentType: string | IContentType,
    results?: IEntity[],
    filterFunc?: (entity: IEntity) => boolean
  ): IEntity[];

  /**
   * Traverse entity and collect PContent entities whose content matches a content type
   * 
   * @param entity - Root entity to traverse
   * @param contentType - Content type to match
   * @param results - Array to collect results (created if not provided)
   * @param filterFunc - Optional filter to exclude entities
   * @returns Array of matching PContent entities
   */
  static traverseGetPContentByContentType(
    entity: IEntity,
    contentType: string | IContentType,
    results?: IEntity[],
    filterFunc?: (entity: IEntity) => boolean
  ): IEntity[];

  /**
   * Traverse multiple entities and collect PContent entities whose content matches a content type
   * 
   * @param entities - Array of root entities to traverse
   * @param contentType - Content type to match
   * @param results - Array to collect results (created if not provided)
   * @param filterFunc - Optional filter to exclude entities
   * @returns Array of matching PContent entities
   */
  static traverseGetPContentByContentTypeFromEntities(
    entities: IEntity[],
    contentType: string | IContentType,
    results?: IEntity[],
    filterFunc?: (entity: IEntity) => boolean
  ): IEntity[];

  /**
   * Check if entity hierarchy contains a light strip
   * 
   * A light strip is identified by:
   * - Content type: LightMolding
   * - Local ID: "lightstrip"
   * 
   * @param entity - Root entity to check
   * @returns True if light strip is found
   */
  static hasLightStrip(entity: IEntity): boolean;

  /**
   * Get all light strips from entity hierarchy
   * 
   * @param entity - Root entity to search
   * @returns Array of light strip entities
   */
  static getLightStrips(entity: IEntity): IEntity[];

  /**
   * Get all child lights (RibbonLampOnBoard) from entity hierarchy
   * 
   * @param entity - Root entity to search
   * @returns Array of ribbon lamp entities
   */
  static getChildLights(entity: IEntity): IEntity[];

  /**
   * Check if an entity is a structure body
   * 
   * Structure bodies include:
   * - Wall
   * - NCustomizedStructure
   * - NCustomizedBeam
   * - ParametricOpening
   * - Opening
   * 
   * @param entity - Entity to check
   * @returns True if entity is a structure body
   */
  static isStructureBody(entity: IEntity): boolean;
}

export { EntityUtil };