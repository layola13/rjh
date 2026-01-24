import { HSCore } from './HSCore';

/**
 * Entity interface representing objects with ID and flag management capabilities
 */
interface IEntity {
  /** Unique identifier for the entity */
  ID: string | number;
  
  /** Temporary flag storage for the entity */
  _tempFlag: number;
  
  /**
   * Enable a specific flag on the entity
   * @param flag - The flag enum value to enable
   * @param value - Whether to enable the flag
   */
  setFlagOn(flag: HSCore.Model.EntityFlagEnum, value: boolean): void;
  
  /**
   * Disable a specific flag on the entity
   * @param flag - The flag enum value to disable
   * @param value - Whether to disable the flag
   */
  setFlagOff(flag: HSCore.Model.EntityFlagEnum, value: boolean): void;
}

/**
 * ModeController manages entity flags for different operational modes.
 * It provides functionality to freeze, hide, and make entities unselectable,
 * while preserving their original flag states for restoration.
 */
export declare class ModeController {
  /**
   * Internal storage for temporary entity flags
   * Maps entity IDs to their original flag states
   */
  private _tempFlagStore: Map<string | number, number>;

  /**
   * Creates a new ModeController instance
   */
  constructor();

  /**
   * Update entity flags based on the provided state
   * @param entity - The entity to update flags for
   * @param shouldFreeze - Whether to freeze and make the entity unselectable
   * @param shouldHide - Optional flag to also hide the entity (default: false)
   */
  updateEntityFlags(entity: IEntity, shouldFreeze: boolean, shouldHide?: boolean): void;

  /**
   * Store the current flag state of an entity before modification
   * @param entity - The entity whose flags should be stored
   */
  private _storeFlag(entity: IEntity): void;

  /**
   * Restore the original flag state of an entity
   * @param entity - The entity whose flags should be restored
   */
  private _restoreFlag(entity: IEntity): void;

  /**
   * Activate mode: freeze and optionally hide all entities in the floorplan
   * This includes rooms, ceilings, walls, structures, content, groups, etc.
   * All selections are cleared before activation.
   */
  on(): void;

  /**
   * Deactivate mode: restore all entities to their original flag states
   * Clears the temporary flag storage after restoration.
   */
  off(): void;
}