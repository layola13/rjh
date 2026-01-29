import { BaseObject } from './BaseObject';
import { TransUtil } from './TransUtil';
import { ContentUtil } from './ContentUtil';
import { EntityUtil } from './EntityUtil';

/**
 * Room information interface
 */
interface RoomInfo {
  /** Room type identifier, format: "{type}-{id}" or "none-{id}" */
  roomType: string;
}

/**
 * Entity interface representing a scene object
 */
interface Entity {
  /** Iterate over child entities */
  forEachChild?(callback: (child: Entity) => void, context?: any): void;
  /** Get the unique parent entity */
  getUniqueParent(): Entity | null;
  /** Check if entity is instance of specified class */
  instanceOf(modelClass: string): boolean;
}

/**
 * Room entity interface extending base Entity
 */
interface RoomEntity extends Entity {
  /** Room type classification */
  roomType?: string;
  /** Unique room identifier */
  id: string | number;
}

/**
 * Base class for cabinet objects in the scene
 * Handles matrix transformations, room associations, and entity hierarchy
 */
export declare class CabinetBase extends BaseObject {
  /** Local transformation matrix for the cabinet */
  protected _matrixLocal: unknown;

  /**
   * Creates a new CabinetBase instance
   * @param entity - The entity associated with this cabinet
   * @param param2 - Second constructor parameter
   * @param param3 - Third constructor parameter
   */
  constructor(entity: Entity, param2: unknown, param3: unknown);

  /**
   * Callback invoked when the entity becomes dirty (modified)
   * @param entity - The dirty entity
   */
  onEntityDirty(entity: Entity): void;

  /**
   * Updates the local transformation matrix based on entity animation data
   * Converts matrix units to appropriate coordinate system
   */
  updateMatrix(): void;

  /**
   * Updates and retrieves custom attributes related to the hosting room
   * @returns Room information object
   */
  updateRoomCustomAttrs(): RoomInfo;

  /**
   * Internal method to retrieve room information from an entity
   * @param entity - The entity to query
   * @returns Room information with type and ID
   */
  protected _getRoomInfo(entity: Entity): RoomInfo;

  /**
   * Finds the host room entity containing the given entity
   * Traverses hierarchy to locate the floor content layer
   * @param entity - The entity to find the host room for
   * @returns The host room entity, or null if not found
   */
  getHostRoom(entity: Entity): RoomEntity | null;

  /**
   * Creates a view model for a child entity
   * @param entity - The child entity
   */
  protected createViewModel(entity: Entity): void;

  /**
   * Updates the world transformation matrix
   * @param recursive - Whether to update recursively for children
   */
  protected updateWorldMatrix(recursive: boolean): void;
}