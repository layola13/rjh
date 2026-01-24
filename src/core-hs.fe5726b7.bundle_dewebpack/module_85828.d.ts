/**
 * Transaction utility for managing entity state persistence and restoration.
 * Handles serialization/deserialization of HSCore entities including models, walls, lights, and their relationships.
 */

/**
 * Dump data structure for serialized entities
 */
interface EntityDump {
  id: string;
  webCADDocument?: any;
  p?: string[]; // parent IDs
  [key: string]: any;
}

/**
 * Transaction data container
 */
interface TransactionData {
  dumps?: Record<string, EntityDump>;
  entities?: Record<string, HSCore.Model.Entity>;
  productsMap?: Map<string, HSCatalog.Meta | any>;
  materialsData?: Map<string, any>;
  materials?: Map<string, any>;
  statesMap?: Record<string, any>;
  constraintMap?: Record<string, any>;
  associations?: any;
}

/**
 * Options for saving entities
 */
interface SaveEntityOptions {
  /** Preserve existing entities in the data structure */
  reserveOldEntities?: boolean;
  /** Entities to dump without children */
  shallowDumps?: HSCore.Model.Entity[];
  /** Skip saving associations */
  skipAssociations?: boolean;
}

/**
 * Restoration context
 */
interface RestoreContext {
  restore: boolean;
  invalidIds: string[];
  entities: Record<string, HSCore.Model.Entity>;
  data: Record<string, EntityDump>;
  productsMap?: Map<string, any>;
  materialsData?: Map<string, any>;
  materials?: Map<string, any>;
  states?: Record<string, any>;
  constraints?: Record<string, any>;
  duringRestore?: boolean;
  dispatchEvent?: boolean;
}

/**
 * Change tracking for entity operations
 */
interface EntityChanges {
  created: Record<string, EntityChangeInfo>;
  removed: Record<string, EntityChangeInfo>;
  changed: Record<string, HSCore.Model.Entity>;
}

/**
 * Information about entity changes
 */
interface EntityChangeInfo {
  parents: HSCore.Model.Entity[];
  child: HSCore.Model.Entity;
}

/**
 * Serialized point data
 */
interface PointData {
  entity: HSCore.Model.Point;
  flag: number;
  parents: string[];
  x: number;
  y: number;
  z: number;
}

/**
 * Serialized wall data
 */
interface WallData {
  entity: HSCore.Model.Wall;
  from: HSCore.Model.Point;
  to: HSCore.Model.Point;
  height3d: number;
  cx: number;
  cy: number;
  openings: string[];
  contents: string[];
  association?: Record<string, any[]>;
}

/**
 * Serialized content data
 */
interface ContentData extends PointData {
  rotation: number;
  host: string | null;
}

/**
 * Serialized group data
 */
interface GroupData extends ContentData {
  members: string[];
}

/**
 * Serialized corner window data
 */
interface CornerWindowData extends ContentData {
  parameters: any;
  partsInfo: any;
  children: string[];
}

/**
 * Transaction manager for entity persistence operations.
 * Provides methods to serialize entities to data structures and restore them.
 */
export declare const Transaction: {
  /**
   * Saves an entity and its relationships to dump data.
   * @param entity - Entity to save
   * @param data - Target data structure
   * @param includeChildren - Whether to recursively dump children (default: true)
   */
  _saveEntityToDump(
    entity: HSCore.Model.Entity,
    data: TransactionData,
    includeChildren?: boolean
  ): void;

  /**
   * Recursively collects child entities into the data structure.
   * @param entity - Root entity
   * @param data - Target data structure
   * @param recurse - Whether to include children recursively
   */
  _collectChildrenEntities(
    entity: HSCore.Model.Entity,
    data: TransactionData,
    recurse: boolean
  ): void;

  /**
   * Restores an entity from serialized dump data.
   * @param entity - Entity to restore
   * @param dump - Serialized entity data
   * @param context - Restoration context
   */
  _restoreEntityFromDump(
    entity: HSCore.Model.Entity,
    dump: EntityDump | undefined,
    context: RestoreContext
  ): void;

  /**
   * Saves multiple entities to a data structure.
   * @param entities - Entities to save
   * @param data - Target data structure
   * @param options - Save options
   * @returns The populated data structure
   */
  saveEntitiesToData(
    entities: HSCore.Model.Entity[],
    data: TransactionData,
    options?: SaveEntityOptions
  ): TransactionData;

  /**
   * Restores multiple entities from serialized data.
   * @param entities - Entities to restore
   * @param data - Source data structure
   */
  restoreEntitiesFromData(
    entities: HSCore.Model.Entity[],
    data: TransactionData
  ): void;

  /**
   * Saves a single entity or array of entities to data.
   * @param entity - Entity or entities to save
   * @param data - Target data structure
   * @param options - Save options
   */
  saveEntityToData(
    entity: HSCore.Model.Entity | HSCore.Model.Entity[],
    data: TransactionData,
    options?: SaveEntityOptions
  ): void;

  /**
   * Restores a single entity or array from data.
   * @param entity - Entity or entities to restore
   * @param data - Source data structure
   */
  restoreEntityFromData(
    entity: HSCore.Model.Entity | HSCore.Model.Entity[],
    data: TransactionData
  ): void;

  /**
   * Saves top-level floorplan elements (rooms, walls, assemblies, contents, lights).
   * @param floorplan - Floorplan entity
   * @param data - Target data structure
   */
  saveFloorplanTop(floorplan: any, data: Record<string, any>): void;

  /**
   * Restores top-level floorplan elements.
   * @param floorplan - Floorplan entity
   * @param data - Source data structure
   * @param updateEntities - Whether to dispatch update events (default: true)
   */
  restoreFloorplanTop(
    floorplan: any,
    data: Record<string, any>,
    updateEntities?: boolean
  ): void;

  /**
   * Saves room entities to data.
   * @param floorplan - Floorplan containing rooms
   * @param data - Target data structure
   */
  saveRoomsToData(floorplan: any, data: Record<string, any>): void;

  /**
   * Saves all walls in a floorplan to data.
   * @param floorplan - Floorplan containing walls
   * @param data - Target data structure
   */
  saveNgWallsToData(floorplan: any, data: Record<string, WallData>): void;

  /**
   * Saves a single wall to data.
   * @param wall - Wall entity
   * @param data - Target data structure
   */
  saveNgWallToData(wall: HSCore.Model.Wall, data: Record<string, WallData>): void;

  /**
   * Saves a point entity to data.
   * @param point - Point entity
   * @param data - Target data structure
   */
  savePointToData(point: HSCore.Model.Point, data: Record<string, PointData>): void;

  /**
   * Saves PAssembly entities to data.
   * @param floorplan - Floorplan containing assemblies
   * @param data - Target data structure
   */
  savePAssembliesToData(floorplan: any, data: Record<string, any>): void;

  /**
   * Saves a content entity to data.
   * @param content - Content entity
   * @param data - Target data structure
   */
  saveContentToData(content: HSCore.Model.Content, data: Record<string, ContentData>): void;

  /**
   * Saves all content entities in a floorplan to data.
   * @param floorplan - Floorplan containing contents
   * @param data - Target data structure
   */
  saveContentsToData(floorplan: any, data: Record<string, any>): void;

  /**
   * Saves all lights in a floorplan to data.
   * @param floorplan - Floorplan containing lights
   * @param data - Target data structure
   */
  saveLightsToData(floorplan: any, data: Record<string, any>): void;

  /**
   * Saves a light entity to data.
   * @param light - Light entity
   * @param data - Target data structure
   */
  saveLightToData(light: HSCore.Model.Light, data: Record<string, PointData>): void;

  /**
   * Saves a corner window entity to data.
   * @param cornerWindow - Corner window entity
   * @param data - Target data structure
   */
  saveCornerWindowToData(
    cornerWindow: HSCore.Model.NgCornerWindow,
    data: Record<string, CornerWindowData>
  ): void;

  /**
   * Saves a group entity to data.
   * @param group - Group entity
   * @param data - Target data structure
   */
  saveGroupToData(group: HSCore.Model.Group, data: Record<string, GroupData>): void;

  /**
   * Restores PAssembly entities from data.
   * @param floorplan - Target floorplan
   * @param data - Source data structure
   * @param changes - Change tracker
   * @param updateEntities - Whether to dispatch updates
   */
  restorePAssembliesFromData(
    floorplan: any,
    data: Record<string, any>,
    changes: EntityChanges,
    updateEntities: boolean
  ): void;

  /**
   * Restores a content entity from data.
   * @param content - Content entity to restore
   * @param data - Source data structure
   * @param changes - Change tracker
   * @param updateEntities - Whether to dispatch updates
   */
  restoreContentFromData(
    content: HSCore.Model.Content,
    data: Record<string, ContentData>,
    changes: EntityChanges,
    updateEntities: boolean
  ): void;

  /**
   * Restores content entities from data.
   * @param floorplan - Target floorplan
   * @param data - Source data structure
   * @param changes - Change tracker
   * @param updateEntities - Whether to dispatch updates
   */
  restoreContentsFromData(
    floorplan: any,
    data: Record<string, any>,
    changes: EntityChanges,
    updateEntities: boolean
  ): void;

  /**
   * Restores wall entities from data.
   * @param floorplan - Target floorplan
   * @param data - Source data structure
   * @param changes - Change tracker
   * @param updateEntities - Whether to dispatch updates
   */
  restoreNgWallsFromData(
    floorplan: any,
    data: Record<string, WallData>,
    changes: EntityChanges,
    updateEntities: boolean
  ): void;

  /**
   * Restores light entities from data.
   * @param floorplan - Target floorplan
   * @param data - Source data structure
   * @param changes - Change tracker
   * @param updateEntities - Whether to dispatch updates
   */
  restoreLightsToData(
    floorplan: any,
    data: Record<string, any>,
    changes: EntityChanges,
    updateEntities: boolean
  ): void;

  /**
   * Internal method to update entities and dispatch change events.
   * @param changes - Tracked entity changes
   * @param data - Source data structure
   */
  _updateEntities(changes: EntityChanges, data: Record<string, any>): void;

  /**
   * Internal method to restore a wall from data.
   * @param floorplan - Target floorplan
   * @param wall - Wall entity to restore
   * @param data - Source data structure
   * @param changes - Change tracker
   * @param updateEntities - Whether to dispatch updates
   */
  _restoreNgWallFromData(
    floorplan: any,
    wall: HSCore.Model.Wall,
    data: Record<string, WallData>,
    changes: EntityChanges,
    updateEntities: boolean
  ): void;

  /**
   * Saves entity associations to data.
   * @param entity - Entity with associations
   * @param data - Target data structure
   */
  saveAssociationsToData(entity: HSCore.Model.Entity, data: Record<string, any>): void;

  /**
   * Restores entity associations from data.
   * @param entity - Entity to restore associations for
   * @param data - Source data structure
   */
  restoreAssociationsToData(entity: HSCore.Model.Entity, data: Record<string, any>): void;

  /**
   * Restores a point entity from data.
   * @param point - Point entity to restore
   * @param data - Source data structure
   * @param changes - Change tracker
   * @param updateEntities - Whether to dispatch updates
   */
  restorePointFromData(
    point: HSCore.Model.Point,
    data: Record<string, PointData>,
    changes: EntityChanges,
    updateEntities: boolean
  ): void;

  /**
   * Restores a group entity from data.
   * @param group - Group entity to restore
   * @param data - Source data structure
   * @param changes - Change tracker
   * @param updateEntities - Whether to dispatch updates
   */
  restoreGroupFromData(
    group: HSCore.Model.Group,
    data: Record<string, GroupData>,
    changes: EntityChanges,
    updateEntities: boolean
  ): void;

  /**
   * Restores a corner window entity from data.
   * @param cornerWindow - Corner window entity to restore
   * @param data - Source data structure
   * @param changes - Change tracker
   * @param updateEntities - Whether to dispatch updates
   */
  restoreCornerWindowFromData(
    cornerWindow: HSCore.Model.NgCornerWindow,
    data: Record<string, CornerWindowData>,
    changes: EntityChanges,
    updateEntities: boolean
  ): void;

  /**
   * Restores a light entity from data.
   * @param light - Light entity to restore
   * @param data - Source data structure
   * @param changes - Change tracker
   * @param updateEntities - Whether to dispatch updates
   */
  restoreLightFromData(
    light: HSCore.Model.Light,
    data: Record<string, PointData>,
    changes: EntityChanges,
    updateEntities: boolean
  ): void;
};