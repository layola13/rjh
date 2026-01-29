/**
 * Graphics data module providing base object functionality for 3D entity management
 * @module IGraphicsData
 */

import { EntityEventType } from './EntityEventType';
import { IGraphicsData } from './IGraphicsData';

/**
 * Graphics data structure containing mesh objects and definitions
 */
export interface GraphicsData {
  /** Array of 3D object representations */
  objects: unknown[];
  /** Array of mesh definitions for rendering */
  meshDefs: unknown[];
}

/**
 * Entity dirty event data
 */
export interface EntityDirtyEvent {
  data: {
    /** Type of entity event that occurred */
    type: EntityEventType;
    /** Associated entity if applicable */
    entity?: Entity;
    /** Changed flag value */
    flag?: EntityFlagEnum;
  };
}

/**
 * Context interface for managing graphics objects
 */
export interface GraphicsContext {
  /** Map of entity IDs to their corresponding base objects */
  objectMap?: Map<number, BaseObject>;
  /** Map of dirty objects that need updating */
  dirtyObjectMap: Map<number, BaseObject>;
  /** Factory function to create view models for entities */
  createViewModel?: (entity: Entity, parent: BaseObject) => BaseObject | undefined;
  /** Store graphics data for an entity */
  setGraphicsData(entityId: number, objects: unknown[], meshDefs: unknown[]): void;
  /** Remove graphics data for an entity */
  removeGraphicsData(entityId: number): void;
  /** Store high-resolution graphics data */
  setHighResolutionGraphicsData(entityId: number, objects: unknown[], meshDefs: unknown[]): void;
  /** Remove high-resolution graphics data */
  removeHighResolutionGraphicsData(entityId: number): void;
}

/**
 * Entity interface representing a 3D model entity
 */
export interface Entity {
  /** Unique identifier for the entity */
  id: number;
  /** Signal emitted when a child is added */
  signalChildAdded: Signal<EntityDirtyEvent>;
  /** Signal emitted when a child is removed */
  signalChildRemoved: Signal<EntityDirtyEvent>;
  /** Signal emitted when entity data changes */
  signalDirty: Signal<EntityDirtyEvent>;
  /** Signal emitted when entity flags change */
  signalFlagChanged: Signal<EntityDirtyEvent>;
  /** Signal emitted when parent is replaced */
  signalParentReplaced: Signal<EntityDirtyEvent>;
  /** Parent entities map */
  parents: Record<string, Entity>;
  /** Check if entity is root */
  isRoot(): boolean;
  /** Check if specific flags are set */
  isFlagOn(flags: EntityFlagEnum): boolean;
  /** Get unique parent entity if exists */
  getUniqueParent?(): Entity | null;
}

/**
 * Signal interface for event handling
 */
export interface Signal<T> {
  /** Emit signal with data */
  emit(data: T): void;
}

/**
 * Entity flag enumeration
 */
export enum EntityFlagEnum {
  /** Entity is hidden */
  hidden = 1,
  /** Entity is removed */
  removed = 2,
}

/**
 * Signal hook utility for managing event listeners
 */
export interface SignalHook {
  /** Listen to a signal */
  listen<T>(signal: Signal<T>, handler: (event: T) => void): this;
  /** Dispose all listeners */
  dispose(): void;
}

/**
 * Base object class for managing 3D entity graphics and hierarchy
 * Handles geometry updates, matrix transformations, and child node management
 */
export class BaseObject {
  /** Map of child entity IDs to their base objects */
  childNodes?: Map<number, BaseObject>;
  
  /** Flag indicating position needs recalculation */
  positionDirty: boolean;
  
  /** Flag indicating matrix needs recalculation */
  needUpdateMatrix: boolean;
  
  /** Associated entity model */
  entity?: Entity;
  
  /** Graphics rendering context */
  context: GraphicsContext;
  
  /** Parent object in hierarchy */
  parent?: BaseObject;
  
  /** Signal hook for event management */
  signalHook?: SignalHook;
  
  /** Cached preview data for quick rendering */
  private _previewData: GraphicsData | null;
  
  /** Cached full graphics data */
  private _cachedData: GraphicsData | null;
  
  /** Promise for async cache update operations */
  private _updateCacheDataPromise: Promise<void> | null;
  
  /** Local transformation matrix */
  private _matrixLocal: THREE.Matrix4;
  
  /** World transformation matrix */
  private _matrixWorld: THREE.Matrix4;
  
  /** Flag indicating geometry needs regeneration */
  private _geometryDirty: boolean;

  /**
   * Create a new BaseObject
   * @param entity - The entity this object represents
   * @param context - Graphics context for rendering
   * @param parent - Parent object in hierarchy
   */
  constructor(entity: Entity, context: GraphicsContext, parent?: BaseObject);

  /**
   * Get or set geometry dirty flag
   */
  get geometryDirty(): boolean;
  set geometryDirty(value: boolean);

  /**
   * Get the entity's unique identifier
   * @returns Entity ID or -1 if no entity
   */
  getEntityID(): number;

  /**
   * Initialize the object (calls onInit hook)
   */
  init(): void;

  /**
   * Handle entity dirty events (geometry, material, or position changes)
   * @param event - Entity dirty event data
   * @internal
   */
  private _entityDirtied(event: EntityDirtyEvent): void;

  /**
   * Handle entity flag change events (e.g., hidden flag)
   * @param event - Entity flag change event data
   * @internal
   */
  private _entityFlagChanged(event: EntityDirtyEvent): void;

  /**
   * Get local transformation matrix
   */
  get matrix(): THREE.Matrix4;

  /**
   * Get world transformation matrix
   */
  get matrixWorld(): THREE.Matrix4;

  /**
   * Get cached geometry data
   */
  get geometry(): GraphicsData | null;

  /**
   * Check if high-resolution data generation is needed
   * @returns True if high-res data should be generated
   */
  needGenerateHighResolutionData(): boolean;

  /**
   * Get preview-quality graphics data (cached)
   * @returns Preview graphics data
   */
  getPreviewData(): GraphicsData;

  /**
   * Get geometry data asynchronously
   * @param forceUpdate - Force regeneration of geometry
   * @returns Promise resolving to graphics data
   */
  getGeometryDataAsync(forceUpdate?: boolean): Promise<GraphicsData | null>;

  /**
   * Get model transformation matrix
   * @returns Local transformation matrix
   */
  getModelMatrix(): THREE.Matrix4;

  /**
   * Update world transformation matrix by multiplying parent matrices
   * @param force - Force update even if not flagged as dirty
   */
  updateWorldMatrix(force?: boolean): void;

  /**
   * Handle child entity added event
   * @param event - Child added event data
   */
  onChildAdded(event: EntityDirtyEvent): void;

  /**
   * Handle child entity removed event
   * @param event - Child removed event data
   */
  onChildRemoved(event: EntityDirtyEvent): void;

  /**
   * Hook for subclasses to handle entity dirty events
   * @param event - Entity dirty event data
   */
  onEntityDirty(event: EntityDirtyEvent): void;

  /**
   * Create view model for child entity
   * @param entity - Child entity to create view model for
   */
  createViewModel(entity: Entity): void;

  /**
   * Update cached data asynchronously (internal implementation)
   * @internal
   */
  private _updateCacheDataAsync(): Promise<void>;

  /**
   * Update object state asynchronously
   * @param forceUpdate - Force update regardless of dirty flags
   * @param highResolution - Generate high-resolution data
   * @returns Promise that resolves when update is complete
   */
  updateAsync(forceUpdate?: boolean, highResolution?: boolean): Promise<void>;

  /**
   * Update high-resolution cached data asynchronously
   * @internal
   */
  private _updateHighResolutionCacheDataAsync(): Promise<void>;

  /**
   * Check if object is valid (entity exists and is visible in hierarchy)
   * @returns True if object should be rendered
   */
  isValid(): boolean;

  /**
   * Update object state synchronously
   * @param forceUpdate - Force update regardless of dirty flags
   */
  update(forceUpdate?: boolean): void;

  /**
   * Update room custom attributes (for room-specific objects)
   * @returns Custom attributes object
   */
  updateRoomCustomAttrs(): Record<string, unknown>;

  /**
   * Hook called during update cycle
   * @param highResolution - Whether updating high-resolution data
   */
  onUpdate(highResolution?: boolean): void;

  /**
   * Hook called when position is updated
   * @param highResolution - Whether updating high-resolution data
   */
  onUpdatePosition(highResolution?: boolean): void;

  /**
   * Hook called during initialization
   */
  onInit(): void;

  /**
   * Convert entity to graphics data
   * @param highResolution - Generate high-resolution data
   * @returns Graphics data structure
   */
  toGraphicsData(highResolution?: boolean): GraphicsData;

  /**
   * Convert entity to graphics data asynchronously
   * @param highResolution - Generate high-resolution data
   * @returns Promise resolving to graphics data
   */
  toGraphicsDataAsync(highResolution?: boolean): Promise<GraphicsData>;

  /**
   * Convert entity to preview-quality graphics data
   * @returns Preview graphics data
   */
  toPreviewData(): GraphicsData;

  /**
   * Clear object and remove from context maps
   */
  clear(): void;

  /**
   * Clear cached graphics data
   */
  clearCache(): void;

  /**
   * Hook called during cleanup
   */
  onCleanup(): void;

  /**
   * Traverse object hierarchy and execute callback
   * @param callback - Function to call for each object
   * @param context - Context to bind callback to
   */
  traverse(callback: (obj: BaseObject) => void, context?: unknown): void;

  /**
   * Handle parent replacement event
   * @param event - Parent replaced event data
   */
  onParentReplaced(event: EntityDirtyEvent): void;

  /**
   * Mark this object and parent hierarchy as dirty
   */
  dirtyGraph(): void;
}

export { IGraphicsData };