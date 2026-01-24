/**
 * Edge utility class providing helper methods for edge operations
 * @module EdgeUtil
 */

import { HSCore } from './HSCore';

/**
 * Represents an edge model in the sketch system
 */
export interface EdgeModel {
  /** The sketch context this edge belongs to */
  sketch: SketchContext;
  
  /** The source model reference */
  srcModel: unknown;
  
  /**
   * Checks if a specific flag is enabled on this edge
   * @param flag - The flag to check
   * @returns True if the flag is enabled
   */
  isFlagOn(flag: HSCore.Model.ExSketchFlagEnum | HSCore.Model.EntityFlagEnum): boolean;
}

/**
 * Sketch context interface for model lookups
 */
export interface SketchContext {
  /**
   * Finds and returns the mapped model for a given point
   * @param point - The point to find
   * @returns The mapped model instance
   */
  findMapModel(point: unknown): PointModel;
}

/**
 * Point model interface with flag management
 */
export interface PointModel {
  /**
   * Enables a flag on this point
   * @param flag - The flag to enable
   * @param sync - Whether to synchronize the change
   */
  setFlagOn(flag: HSCore.Model.ExSketchFlagEnum, sync: boolean): void;
  
  /**
   * Disables a flag on this point
   * @param flag - The flag to disable
   * @param sync - Whether to synchronize the change
   */
  setFlagOff(flag: HSCore.Model.ExSketchFlagEnum, sync: boolean): void;
}

/**
 * Utility class for edge-related operations in the sketch system
 */
export declare class EdgeUtil {
  /**
   * Synchronizes point flags based on edge flag state
   * 
   * When an edge has hover or selection flags, this method propagates
   * corresponding driven flags to all points associated with the edge.
   * 
   * @param edge - The edge model to sync flags from
   * @param flag - The flag type to synchronize (hoverOn or selected)
   * 
   * @remarks
   * - If flag is `hoverOn`, points receive `hoverOnDriven` flag
   * - If flag is `selected`, points receive `selectedDriven` flag
   * - Only processes hoverOn and selected flags, ignores others
   */
  static syncPointsFlag(
    edge: EdgeModel,
    flag: HSCore.Model.ExSketchFlagEnum | HSCore.Model.EntityFlagEnum
  ): void;
}

export default EdgeUtil;