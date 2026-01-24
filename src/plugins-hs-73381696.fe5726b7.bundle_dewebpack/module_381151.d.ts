/**
 * Entity flag management for layer slab editing mode.
 * Handles visibility, selection, and interaction states of various model entities.
 */

import { HSConstants, HSCore } from './635589';

/**
 * Entity model with flag manipulation capabilities
 */
interface Entity {
  /** Unique identifier for the entity */
  ID: string;
  /** Internal flag storage */
  _tempFlag?: number;
  /**
   * Check if entity is instance of a specific model class
   * @param modelClass - Model class identifier
   */
  instanceOf(modelClass: string): boolean;
  /**
   * Enable a specific flag on the entity
   * @param flag - Flag enum value
   * @param update - Whether to trigger update
   */
  setFlagOn(flag: number, update: boolean): void;
  /**
   * Disable a specific flag on the entity
   * @param flag - Flag enum value
   * @param update - Whether to trigger update
   */
  setFlagOff(flag: number, update: boolean): void;
}

/**
 * Logger interface for debugging
 */
interface Logger {
  /**
   * Log debug message
   * @param message - Debug message
   */
  debug(message: string): void;
}

/**
 * Manages entity flags during layer slab editing operations.
 * Stores and restores entity states, controls furniture visibility,
 * and handles light control mode.
 */
export default class CmdEditLayerSlabs {
  /** Temporary storage for entity flags during editing */
  private _tempFlagStore: Map<string, number | undefined>;
  
  /** Cached furniture visibility state */
  private _furnitureVisibleFlag?: boolean;
  
  /** Indicates if light control mode is active */
  public isLightControlMode?: boolean;
  
  /** Logger instance for debugging */
  private _logger: Logger;

  constructor();

  /**
   * Update entity flags based on edit mode state.
   * When enabled, freezes and hides content, pockets, and customized instances.
   * When disabled, restores original flag state.
   * 
   * @param entity - The entity to update
   * @param enable - True to apply edit mode flags, false to restore original flags
   */
  updateEntityFlags(entity: Entity, enable: boolean): void;

  /**
   * Store the current flag state of an entity.
   * Only stores if not already cached to preserve original state.
   * 
   * @param entity - The entity whose flags should be stored
   */
  private _storeFlag(entity: Entity): void;

  /**
   * Restore previously stored flag state of an entity.
   * Restores flags: freezed, unselectable, transparent, hidden, toggleOff.
   * Removes entity from temporary storage after restoration.
   * 
   * @param entity - The entity whose flags should be restored
   */
  private _restoreFlag(entity: Entity): void;

  /**
   * Enable layer slab editing mode.
   * - Unselects all entities
   * - Applies edit flags to contents, walls, groups, and DIY elements
   * - Updates grid flags
   * - Sets furniture visibility
   */
  on(): void;

  /**
   * Disable layer slab editing mode.
   * - Ends light control mode if active
   * - Restores all entity flags
   * - Clears temporary flag storage
   */
  off(): void;

  /**
   * Control furniture visibility in the floorplan.
   * Affects all content except openings and corner windows.
   * 
   * @param visible - True to show furniture, false to hide
   * @param skipCache - If true, does not update cached visibility state
   */
  setFurnitureVisible(visible: boolean, skipCache?: boolean): void;

  /**
   * Enter light control mode.
   * - Sets isLightControlMode flag
   * - Unselects all entities
   * - Freezes and makes content unselectable
   * - Makes rooms unselectable
   */
  startLightControl(): void;

  /**
   * Exit light control mode.
   * - Clears isLightControlMode flag
   * - Unfreezes content and makes it selectable
   * - Makes rooms selectable again
   */
  endLightControl(): void;
}