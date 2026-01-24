/**
 * BOM (Bill of Materials) entity and parameter management system
 * Provides type-safe data structures for handling hierarchical product data
 */

/**
 * Default subtype identifier for business entities
 */
export const DefaultSubType = "default";

/**
 * Wildcard subtype matching all subtypes
 */
export const AllSubType = "*";

/**
 * Data type enumeration for parameter values
 */
export enum DataType {
  Unknown = 0,
  String = 1,
  Boolean = 2,
  Int = 3,
  Number = 4,
  Object = 5,
  ArrayPoint2D = 6,
  ArrayPoint3D = 7,
  StringArray = 8,
  NumberArray = 9
}

/**
 * Represents a typed parameter with name, value, and data type
 */
export class Parameter {
  name: string;
  value: unknown;
  type: DataType;

  constructor(name: string, value: unknown, type?: DataType);
}

/**
 * Instance data container holding parameters associated with an entity instance
 */
export class InstanceData {
  id: string;
  parameters: Map<string, Parameter>;

  constructor(id: string);

  /**
   * Add one or more parameters to this instance
   */
  addParameter(parameter: Parameter, ...additionalParameters: Parameter[]): void;

  /**
   * Retrieve a parameter by name
   */
  getParameter(name: string): Parameter | undefined;

  /**
   * Get the value of a parameter by name
   */
  getParameterValue(name: string): unknown;
}

/**
 * Hierarchical entity node representing a component in the BOM structure
 */
export class Entity {
  children: Entity[];
  legal: boolean;
  errorMsg: string;

  private _prefix: string;
  private _parent?: Entity;
  private _instance?: InstanceData;
  private _type?: string;
  private _category?: string;

  constructor();

  /**
   * Traverse the entity tree, invoking callback for each node
   * @param callback - Return true to continue traversal to children
   */
  traverse(callback: (entity: Entity) => boolean): void;

  /**
   * Set ID prefix for this entity
   */
  setPrefix(prefix: string): void;

  /**
   * Get the ID prefix
   */
  get prefix(): string;

  /**
   * Set the parent entity
   */
  setParent(parent?: Entity): void;

  /**
   * Get the parent entity
   */
  getParent(): Entity | undefined;

  /**
   * Associate instance data with this entity
   */
  setInstanceData(instance: InstanceData): void;

  /**
   * Get the associated instance data
   */
  get instance(): InstanceData | undefined;

  /**
   * Set the entity type
   */
  setType(type: string): void;

  /**
   * Get the entity type
   */
  get type(): string | undefined;

  /**
   * Set the entity category
   */
  setCategory(category: string): void;

  /**
   * Get the entity category
   */
  get category(): string | undefined;

  /**
   * Add one or more child entities
   */
  addChild(child: Entity, ...additionalChildren: Entity[]): void;

  /**
   * Replace all children with a new set of entities
   */
  setChildren(children: Entity[]): void;

  /**
   * Remove this entity from its parent
   */
  removeFromParent(): void;

  /**
   * Remove a specific child entity
   */
  removeChild(child: Entity): void;

  /**
   * Get all child entities
   */
  getChildren(): Entity[];

  /**
   * Get the full entity ID (prefix + instance ID)
   */
  getId(): string;

  /**
   * Get the instance ID without prefix
   */
  getInstanceId(): string;

  /**
   * Get a parameter value from the instance data
   */
  getParameterValue(name: string): unknown;

  /**
   * Clone this entity
   * @param deep - If true, recursively clone all children
   */
  clone(deep?: boolean): Entity;
}

/**
 * Business type descriptor
 */
export interface BusinessType {
  type: string;
  subType: string;
}

/**
 * Filter options for querying business entities
 */
export interface EntityFilterOptions {
  /**
   * Include only entities matching these business types
   */
  include?: BusinessType[];

  /**
   * Exclude entities matching these business types
   */
  exclude?: BusinessType[];
}

/**
 * Internal collection grouping entities by business type and subtype
 */
declare class BusinessEntityCollection {
  type: string;
  subType: string;
  rootEntities: Entity[];
  entityIds: Set<string>;

  /**
   * Set the entities for this business type collection
   */
  setEntities(entities: Entity[], entityMap: Map<string, Entity>): void;

  /**
   * Check if an entity or ID is contained in this collection
   */
  contain(entityOrId: Entity | string): boolean;

  /**
   * Get the business type descriptor
   */
  getBusinessType(): BusinessType;
}

/**
 * Internal parameter collection manager
 */
declare class ParameterCollection {
  items: BusinessEntityCollection[];
  rootEntities: Entity[];
  entityMap: Map<string, Entity>;

  /**
   * Add entities categorized by business type and subtype
   */
  addBusinessEntities(type: string, subType: string, entities: Entity[]): void;

  /**
   * Get filtered business entity collections
   */
  getItems(options?: EntityFilterOptions): BusinessEntityCollection[];

  /**
   * Get filtered root entities
   */
  getEntities(options?: EntityFilterOptions): Entity[];

  /**
   * Get the business type for a given entity or ID
   */
  getEntityBusinessType(entityOrId: Entity | string): BusinessType | undefined;
}

/**
 * Main BOM data container managing all business entities and their relationships
 */
export class BomData {
  private collection: ParameterCollection;

  constructor();

  /**
   * Add entities with associated business type classification
   */
  addBusinessEntities(businessType: BusinessType, entities: Entity[]): void;

  /**
   * Retrieve an entity by its ID
   */
  getEntity(id: string): Entity | undefined;

  /**
   * Get all entities matching a specific business type
   */
  getBusinessEntities(businessType: BusinessType): Entity[];

  /**
   * Check if an entity matches the given filter options
   */
  isEntityMatchOption(entityOrId: Entity | string, options?: EntityFilterOptions): boolean;

  /**
   * Get all root entities in the BOM
   */
  getRootEntities(): Entity[];
}

/**
 * Verify entity validity and remove illegal entities from the tree
 * @param entity - Entity to verify
 * @returns true if entity is legal, false otherwise
 */
export function verifyEntity(entity: Entity): boolean;