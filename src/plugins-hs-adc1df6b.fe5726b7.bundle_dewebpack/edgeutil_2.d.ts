/**
 * Edge utility module for managing edge-related operations in a 2D sketch system
 * @module EdgeUtil
 */

import { HSCore } from './HSCore';

/**
 * Point model interface representing a sketch point
 */
interface PointModel {
  /**
   * Set a flag on the point
   * @param flag - The flag to set
   * @param silent - Whether to suppress events
   */
  setFlagOn(flag: number, silent: boolean): void;
  
  /**
   * Set a flag off the point
   * @param flag - The flag to clear
   * @param silent - Whether to suppress events
   */
  setFlagOff(flag: number, silent: boolean): void;
}

/**
 * Sketch interface containing model mapping functionality
 */
interface Sketch {
  /**
   * Find a mapped model by its source model
   * @param model - The source model to find
   * @returns The mapped model
   */
  findMapModel(model: unknown): PointModel;
}

/**
 * Edge model interface representing a sketch edge entity
 */
interface EdgeModel {
  /** The sketch this edge belongs to */
  sketch: Sketch;
  
  /** The source model of this edge */
  srcModel: unknown;
  
  /**
   * Check if a specific flag is enabled on this edge
   * @param flag - The flag to check
   * @returns true if the flag is on, false otherwise
   */
  isFlagOn(flag: HSCore.Model.ExSketchFlagEnum | HSCore.Model.EntityFlagEnum): boolean;
}

/**
 * Utility class for edge-related operations
 */
export declare class EdgeUtil {
  /**
   * Private constructor - this is a utility class with only static methods
   */
  private constructor();
  
  /**
   * Synchronizes point flags based on edge flag state.
   * When an edge is hovered or selected, this method propagates the corresponding
   * driven flags to all associated points.
   * 
   * @param edge - The edge model to sync flags from
   * @param flag - The flag type to sync (hoverOn or selected)
   * 
   * @remarks
   * - If flag is `hoverOn`, points receive `hoverOnDriven` flag
   * - If flag is `selected`, points receive `selectedDriven` flag
   * - Only processes hoverOn and selected flags
   */
  static syncPointsFlag(
    edge: EdgeModel, 
    flag: HSCore.Model.ExSketchFlagEnum.hoverOn | HSCore.Model.EntityFlagEnum.selected
  ): void;
}

/**
 * HSCore namespace declarations
 */
declare namespace HSCore {
  namespace Model {
    /**
     * Extended sketch flag enumeration
     */
    enum ExSketchFlagEnum {
      /** Hover state flag */
      hoverOn = 'hoverOn',
      /** Driven hover state flag for dependent entities */
      hoverOnDriven = 'hoverOnDriven',
      /** Driven selected state flag for dependent entities */
      selectedDriven = 'selectedDriven'
    }
    
    /**
     * Entity flag enumeration
     */
    enum EntityFlagEnum {
      /** Selected state flag */
      selected = 'selected'
    }
  }
  
  namespace Util {
    /**
     * Utility for extraordinary 2D sketch operations
     */
    namespace ExtraordinarySketch2d {
      /**
       * Get all points from the given edges
       * @param edges - Array of edge source models
       * @returns Array of point models
       */
      function getAllPointsFromEdges(edges: unknown[]): unknown[];
    }
  }
}