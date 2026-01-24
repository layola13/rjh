import { Strategy } from './Strategy';
import { ENUM_SINGLE_SELECT_CATEGORY } from './constants';

/**
 * Ceiling information from room data
 */
interface CeilingInfo {
  /** Array of ceiling entities */
  ceilings?: Ceiling[];
  /** Array of model ceiling entities */
  model_ceiling_info?: ModelCeiling[];
}

/**
 * Represents a ceiling entity
 */
interface Ceiling {
  /** Unique identifier for the ceiling */
  id: string | number;
}

/**
 * Represents a model ceiling entity
 */
interface ModelCeiling {
  /** Unique identifier for the model ceiling */
  id: string | number;
}

/**
 * Room data structure containing ceiling information
 */
interface Room {
  /** Ceiling information for the room */
  ceiling_info?: CeilingInfo;
}

/**
 * Input parameters for getting flat entity IDs
 */
interface GetFlatEntityIdsInput {
  /** Instance ID to search for */
  instanceId: string | number;
  /** Room data containing ceiling information */
  room: Room;
}

/**
 * Result containing flat entity IDs and their category
 */
interface FlatEntityResult {
  /** Array of flat entity IDs */
  flatEntityIds: Array<string | number>;
  /** Category of the selected entity */
  category?: ENUM_SINGLE_SELECT_CATEGORY;
}

/**
 * Strategy implementation for handling ceiling entity selection.
 * Searches for ceiling entities by instance ID and returns their IDs with category information.
 */
export declare class CeilingStrategy extends Strategy {
  /**
   * Creates an instance of CeilingStrategy
   */
  constructor();

  /**
   * Retrieves flat entity IDs and category for a given instance ID.
   * Searches through both regular ceilings and model ceilings.
   * 
   * @param params - Input parameters containing instance ID and room data
   * @returns Object containing array of matching entity IDs and the ceiling category
   */
  getFlatEntityIdsAndCategory(params: GetFlatEntityIdsInput): FlatEntityResult;
}