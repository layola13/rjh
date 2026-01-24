import { HSCore } from './path/to/HSCore';

/**
 * Entity interface representing objects with ID and flag management capabilities
 */
interface IEntity {
  /** Unique identifier for the entity */
  ID: string | number;
  
  /** Internal temporary flag storage */
  _tempFlag: number;
  
  /**
   * Sets a specific flag on the entity
   * @param flag - The flag enum value to set
   * @param value - Whether to enable the flag
   */
  setFlagOn(flag: HSCore.Model.EntityFlagEnum, value: boolean): void;
  
  /**
   * Clears a specific flag on the entity
   * @param flag - The flag enum value to clear
   * @param value - Whether to disable the flag
   */
  setFlagOff(flag: HSCore.Model.EntityFlagEnum, value: boolean): void;
}

/**
 * Controller for managing entity visibility and interactivity modes in the application.
 * Handles freezing, hiding, and restoring entity states across the floorplan.
 */
export declare class ModeController {
  /**
   * Temporary storage for entity flags before modification.
   * Maps entity IDs to their original flag states for restoration.
   */
  private _tempFlagStore: Map<string | number, number>;

  constructor();

  /**
   * Updates entity flags to control freezing, selectability, and visibility.
   * 
   * @param entity - The entity whose flags should be updated
   * @param shouldFreeze - If true, freezes and makes entity unselectable; if false, restores original flags
   * @param shouldHide - If true, additionally hides the entity (default: false)
   */
  updateEntityFlags(entity: IEntity, shouldFreeze: boolean, shouldHide?: boolean): void;

  /**
   * Stores the current flag state of an entity before modification.
   * Only stores if the entity's flags haven't been stored already.
   * 
   * @param entity - The entity whose flags should be stored
   */
  private _storeFlag(entity: IEntity): void;

  /**
   * Restores an entity's flags to their original state before modification.
   * Clears freezed, unselectable, and hidden flags as needed, then removes from storage.
   * 
   * @param entity - The entity whose flags should be restored
   */
  private _restoreFlag(entity: IEntity): void;

  /**
   * Activates mode: freezes and hides most entities in the floorplan.
   * - Deselects all currently selected entities
   * - Freezes rooms, ceilings, walls, structure faces, moldings, openings, structures
   * - Freezes auto-generated roofs
   * - Hides contents (except NCustomizedParametricRoof), groups, and DIY2 elements
   */
  on(): void;

  /**
   * Deactivates mode: restores all entities to their original flag states.
   * - Restores flags for all entity types that were modified in on()
   * - Clears the temporary flag storage
   */
  off(): void;
}