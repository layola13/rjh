/**
 * Entity flag enumeration for managing entity states
 */
export enum EntityFlagEnum {
  /** Entity is selected */
  selected = 2,
  /** Entity is removed */
  removed = 4,
  /** Entity is frozen/locked from editing */
  freezed = 8,
  /** Entity is hidden from view */
  hidden = 16,
  /** Entity cannot be selected */
  unselectable = 32,
  /** Entity is in edit light mode */
  editlight = 64,
  /** Entity is locked */
  locked = 128
}

/**
 * Transaction type for entity modifications
 */
export enum EntityTransactionType {
  Creation = 'Creation',
  Modification = 'Modification',
  Deletion = 'Deletion',
  Recycling = 'Recycling'
}

/**
 * Entity event types for dirty notifications
 */
export enum EntityEventType {
  Display = 'Display',
  Geometry = 'Geometry',
  Material = 'Material',
  Position = 'Position',
  Preview = 'Preview'
}

/**
 * Field value type enumeration
 */
export enum FieldValueType {
  EntityMap = 'EntityMap'
}

/**
 * Entity event data structure
 */
export interface EntityEvent {
  type: EntityEventType;
  options?: Record<string, unknown>;
}

/**
 * Signal event for child operations
 */
export interface ChildEvent {
  entity: Entity;
  parent: Entity;
}

/**
 * Signal event for parent replacement
 */
export interface ParentReplacedEvent {
  newParent: Entity | undefined;
}

/**
 * Load context for entity deserialization
 */
export interface LoadContext {
  data?: Record<string, EntityDumpData>;
  entities?: Record<string, Entity>;
  idGenerator?: IDGenerator;
  dispatchEvent?: boolean;
  duringRestore?: boolean;
  invalidIds?: string[];
  getEntityById?(id: string): Entity | undefined;
}

/**
 * Transaction options
 */
export interface TransactionOptions {
  fieldValueType?: FieldValueType;
  [key: string]: unknown;
}

/**
 * Serialized entity data structure
 */
export interface EntityDumpData {
  id: string;
  l?: string; // short class name
  Class?: string; // full class name
  flag?: number;
  userDefined?: Record<string, unknown>;
  c?: string[]; // child IDs (short form)
  children?: string[];
  [key: string]: unknown;
}

/**
 * ID generator interface
 */
export interface IDGenerator {
  generate(existingId: string, type?: unknown): string;
  getNewId?(oldId: string): string;
}

/**
 * Signal class for event dispatching
 */
export interface Signal<T = unknown> {
  dispatch(data: T): void;
  dispose(): void;
}

/**
 * Boundary representation
 */
export interface BrepBound {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

/**
 * Base interface for I/O operations
 */
export interface IBase {
  setInternalFields(entity: unknown): void;
}

/**
 * Entity I/O handler for serialization/deserialization
 */
export declare class Entity_IO extends IBase {
  protected static _Entity_IO_instance?: Entity_IO;

  setInternalFields(entity: unknown): void;

  /**
   * Get singleton instance of Entity_IO
   */
  static instance(): Entity_IO;

  /**
   * Determine if entity requires deep cloning
   */
  mustDeepClone(entity: Entity): boolean;

  /**
   * Load entity from dumped data
   * @param entity - Target entity to load into
   * @param dumpData - Serialized entity data
   * @param context - Load context
   * @param options - Additional options
   */
  load(
    entity: Entity,
    dumpData: EntityDumpData | null,
    context?: LoadContext,
    options?: unknown
  ): void;
}

/**
 * Base entity class representing a node in the scene graph
 */
export declare class Entity {
  protected static _Entity_IO_instance?: Entity_IO;
  protected _Class?: string;
  protected _logger?: unknown;
  protected _tag?: string;
  protected _id: string;
  protected _doc?: unknown;
  protected _boundDirty: boolean;
  protected _int_flag: number;
  protected boundInternal: BrepBound;
  protected _parents: Record<string, Entity>;
  protected _children: Record<string, Entity>;
  protected _previewParams?: unknown;
  protected _disposed?: boolean;

  /** Signal fired when entity becomes dirty */
  signalDirty: Signal<EntityEvent>;
  /** Signal fired when entity is removed */
  signalRemoved: Signal<ChildEvent>;
  /** Signal fired when a child is added */
  signalChildAdded: Signal<ChildEvent>;
  /** Signal fired when a child is removed */
  signalChildRemoved: Signal<ChildEvent>;
  /** Signal fired when parent is replaced */
  signalParentReplaced: Signal<ParentReplacedEvent>;

  /**
   * User-defined custom data
   */
  userDefined?: Record<string, unknown>;

  constructor(id?: string);

  /**
   * Get logger instance
   */
  static get logger(): unknown;

  /**
   * Register entity class in the class registry
   */
  static registerClass(className: string, constructor: typeof Entity): void;

  /**
   * Get constructor for a registered class name
   */
  static getClass(className: string): typeof Entity | undefined;

  /**
   * Get all registered constructors
   */
  static getConstructors(): Map<string, typeof Entity>;

  /**
   * Build entity instance from dumped data
   */
  static buildEntityFromDump(
    dumpData: EntityDumpData,
    context: LoadContext,
    options?: unknown
  ): Entity | undefined;

  /**
   * Get dumped class name from serialized data
   */
  static getDumpedClassName(dumpData: EntityDumpData): string | undefined;

  /**
   * Load entity from dump by ID
   */
  static loadFromDumpById(
    id: string,
    context: LoadContext,
    duringRestore?: boolean,
    options?: unknown
  ): Entity | undefined;

  /**
   * Check if data is valid entity dump data
   */
  static isEntityDumpData(data: unknown): data is EntityDumpData;

  /**
   * Get existing entity from context
   */
  static getExistingEntity(id: string, context: LoadContext): Entity | undefined;

  /**
   * Replace parent of an entity
   * @internal
   */
  static _replaceParent(
    entity: Entity,
    oldParent: Entity | undefined,
    newParent: Entity | undefined
  ): void;

  /**
   * Check if instance is of specified class
   */
  instanceOf(className: string): boolean;

  /**
   * Get simple class name
   */
  getClassName(): string;

  /**
   * Get fully qualified class name
   */
  get Class(): string | undefined;

  /**
   * Get logger instance
   */
  get logger(): unknown;

  /**
   * Get entity unique identifier
   */
  get id(): string;
  set id(value: string);

  /**
   * Alias for id
   */
  get ID(): string;

  /**
   * Get owning document
   */
  get doc(): unknown;

  /**
   * Get debug tag
   */
  get tag(): string;

  /**
   * Get/set preview parameters
   */
  get previewParams(): unknown;
  set previewParams(value: unknown);

  /**
   * Legacy alias for previewParams
   * @deprecated Use previewParams instead
   */
  get preViewParam(): unknown;
  set preViewParam(value: unknown);

  /**
   * Get boundary box (computed on demand)
   */
  get bound(): BrepBound;

  /**
   * Refresh internal boundary calculation
   * @internal
   */
  refreshBoundInternal(): void;

  /**
   * Generate new unique ID
   */
  generateId(): void;

  /**
   * Set entity flag on
   */
  setFlagOn(flag: EntityFlagEnum, internal?: boolean): void;

  /**
   * Set entity flag off
   */
  setFlagOff(flag: EntityFlagEnum, internal?: boolean): void;

  /**
   * Check if flag is set
   */
  isFlagOn(flag: EntityFlagEnum): boolean;

  /**
   * Destroy entity and cleanup resources
   */
  destroy(): void;

  /**
   * Check if entity is root of hierarchy
   */
  isRoot(): boolean;

  /**
   * Get root entity in hierarchy
   */
  getRoot(): Entity | undefined;

  /**
   * Check if entity has specified child
   */
  hasChild(child: Entity): boolean;

  /**
   * Check if entity has specified parent
   */
  hasParent(parent: Entity): boolean;

  /**
   * Check if entity has single parent (optionally specified)
   */
  hasSingleParent(parent?: Entity): boolean;

  /**
   * Check if entity has no parents
   */
  isOrphan(): boolean;

  /**
   * Get all parent entities
   */
  get parents(): Readonly<Record<string, Entity>>;

  /**
   * Get all child entities
   */
  get children(): Readonly<Record<string, Entity>>;

  /**
   * Get unique parent (asserts if multiple parents exist)
   */
  get parent(): Entity | undefined;

  /**
   * Get children filtered by type
   */
  getChildrenByType<T extends Entity>(type: new (...args: unknown[]) => T): T[];

  /**
   * Restore children from saved state
   */
  restoreChildren(children: Record<string, Entity>, context: LoadContext): void;

  /**
   * Restore parents from saved state
   */
  restoreParents(parents: Record<string, Entity> | undefined, context: LoadContext): void;

  /**
   * Add parent reference
   * @internal
   */
  _addParentReference(parent: Entity): void;

  /**
   * Remove parent reference
   * @internal
   */
  _removeParentReference(parent: Entity, context?: LoadContext): void;

  /**
   * Add child entity
   * @param child - Child entity or array of entities
   * @param dispatchEvent - Whether to dispatch child added event
   * @returns Success status
   */
  addChild(child: Entity | Entity[], dispatchEvent?: boolean): boolean;

  /**
   * Validate if entity can be added as child
   */
  isValidChild(child: Entity): boolean;

  /**
   * Remove child entity
   * @param child - Child entity or ID
   * @param dispatchEvent - Whether to dispatch events
   * @param removeChildren - Whether to recursively remove children
   * @param context - Load context
   * @returns Success status
   */
  removeChild(
    child: Entity | string,
    dispatchEvent?: boolean,
    removeChildren?: boolean,
    context?: LoadContext
  ): boolean;

  /**
   * Remove child and return it
   */
  removeChildPlus(child: Entity | string, dispatchEvent?: boolean): Entity | undefined;

  /**
   * Remove all children
   */
  removeAllChildren(
    dispatchEvent?: boolean,
    removeChildren?: boolean,
    context?: LoadContext
  ): void;

  /**
   * Remove this entity from specified parent
   */
  removeFromParent(parent: Entity): void;

  /**
   * Remove this entity from all parents
   */
  remove(): void;

  /**
   * Replace children collection
   */
  replaceChildren(
    oldChildren: Entity[],
    newChildren: Entity[],
    dispatchEvent?: boolean,
    context?: LoadContext
  ): void;

  /**
   * Replace parent entity
   */
  replaceParent(newParent: Entity | undefined): void;

  /**
   * Callback when child is added
   */
  onChildAdded(child: Entity): void;

  /**
   * Callback when child is removed
   */
  onChildRemoved(child: Entity, dispatchEvent?: boolean): void;

  /**
   * Callback when added to parent
   */
  onAddedToParent(parent: Entity): void;

  /**
   * Callback before removing from parent
   */
  onRemovingFromParent(parent: Entity, context?: LoadContext): void;

  /**
   * Callback after removed from parent
   */
  onRemovedFromParent(parent: Entity, context?: LoadContext): void;

  /**
   * Callback when entity becomes dirty
   */
  onDirty(event: EntityEvent): void;

  /**
   * Iterate over all children
   */
  forEachChild(callback: (child: Entity) => void, context?: unknown): void;

  /**
   * Callback when child becomes dirty
   */
  onChildDirty(child: Entity, event: EntityEvent): void;

  /**
   * Mark entity as dirty (needs update)
   */
  dirty(event?: EntityEvent, options?: Record<string, unknown>): void;

  /**
   * Mark geometry as dirty
   */
  dirtyGeometry(options?: Record<string, unknown>): void;

  /**
   * Mark material as dirty
   */
  dirtyMaterial(options?: Record<string, unknown>): void;

  /**
   * Mark position as dirty
   */
  dirtyPosition(options?: Record<string, unknown>): void;

  /**
   * Mark preview as dirty
   */
  dirtyPreview(options?: Record<string, unknown>): void;

  /**
   * Check if entity can be selected
   */
  canSelect(): boolean;

  /**
   * Check if entity can be edited
   */
  canEdit(): boolean;

  /**
   * Validate entity state
   */
  isValid(): boolean;

  /**
   * Get unique parent (warns if multiple exist)
   */
  getUniqueParent(): Entity | undefined;

  /**
   * Get first parent in collection
   */
  getFirstParent(): Entity | undefined;

  /**
   * Get first parent of specified type
   */
  getFirstParentOfType<T extends Entity>(type: new (...args: unknown[]) => T): T | undefined;

  /**
   * Get first parent not matching any of specified types
   */
  getFirstParentOfNonTypes(types: Array<new (...args: unknown[]) => Entity>): Entity | undefined;

  /**
   * Get all parents in path to root
   */
  getParentsInPath(): Entity[];

  /**
   * Record transaction for undo/redo
   */
  transact(
    fieldName?: string,
    transactionType?: EntityTransactionType,
    options?: TransactionOptions
  ): void;

  /**
   * Check if entity can record transactions
   */
  canTransact(): boolean;

  /**
   * Check if entity field can be transacted
   */
  canTransactField(): boolean;

  /**
   * Mark entity for recycling
   */
  recycle(options?: Record<string, unknown>): void;

  /**
   * Get I/O handler for serialization
   */
  getIO(): Entity_IO;

  /**
   * Verify entity before serialization
   */
  verifyBeforeDump(): boolean;

  /**
   * Load entity from serialized data
   */
  load(dumpData: EntityDumpData, context: LoadContext, options?: unknown): void;

  /**
   * Check if entity should be serialized
   */
  needDump(): boolean;

  /**
   * Copy properties from another entity
   */
  copyFrom(source: Entity): void;

  /**
   * Clone entity
   */
  clone(): Entity;

  /**
   * Invalidate subgraph
   * @internal
   */
  _invalidateSubgraph(): void;

  /**
   * Dispatch invalidate subgraph event
   * @internal
   */
  _dispatchInvalidateSubgraph(event: unknown): void;

  /**
   * Traverse entity hierarchy
   * @param callback - Callback invoked for each entity (return false to stop)
   * @param context - Callback context
   * @returns True if traversal completed
   */
  traverse(callback: (entity: Entity) => boolean | void, context?: unknown): boolean;

  /**
   * Verify entity integrity
   */
  verify(options?: Record<string, unknown>): boolean;

  /**
   * Handle entity dirty event
   */
  onEntityDirty(): void;

  /**
   * Get proxy object for entity
   */
  getProxyObject(): unknown;

  /**
   * Get proxy ID
   */
  getProxyId(): string | undefined;
}

/**
 * Exported flag enumeration
 */
export { EntityFlagEnum };

/**
 * Exported Entity I/O class
 */
export { Entity_IO };

/**
 * Exported Entity class
 */
export { Entity };