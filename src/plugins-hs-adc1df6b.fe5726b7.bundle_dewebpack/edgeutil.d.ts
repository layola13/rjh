/**
 * Edge utility module for managing edge-related operations in sketch models
 * 
 * This module provides utilities for synchronizing visual flags between edges
 * and their associated points in 2D sketch systems.
 * 
 * @module EdgeUtil
 */

import { HSCore } from './HSCore';

/**
 * Sketch model containing entity mappings
 */
interface SketchModel {
  /**
   * Find a model entity by its identifier
   * @param entityId - The entity identifier to search for
   * @returns The mapped model entity if found
   */
  findMapModel<T>(entityId: unknown): T;
}

/**
 * Edge entity with flag management and source model reference
 */
interface EdgeEntity {
  /**
   * The sketch context this edge belongs to
   */
  sketch: SketchModel;
  
  /**
   * The source model this edge is derived from
   */
  srcModel: unknown;
  
  /**
   * Check if a specific flag is enabled on this edge
   * @param flag - The flag enum value to check
   * @returns True if the flag is currently set
   */
  isFlagOn(flag: HSCore.Model.ExSketchFlagEnum | HSCore.Model.EntityFlagEnum): boolean;
}

/**
 * Point entity with flag manipulation capabilities
 */
interface PointEntity {
  /**
   * Enable a specific flag on this point
   * @param flag - The flag enum value to enable
   * @param propagate - Whether to propagate the flag change to related entities
   */
  setFlagOn(flag: HSCore.Model.ExSketchFlagEnum, propagate: boolean): void;
  
  /**
   * Disable a specific flag on this point
   * @param flag - The flag enum value to disable
   * @param propagate - Whether to propagate the flag change to related entities
   */
  setFlagOff(flag: HSCore.Model.ExSketchFlagEnum, propagate: boolean): void;
}

declare namespace HSCore {
  namespace Model {
    /**
     * Visual state flags for extraordinary sketch elements
     */
    enum ExSketchFlagEnum {
      /** Element is being hovered over by the user */
      hoverOn = 'hoverOn',
      /** Element is driven by a hovered selection */
      hoverOnDriven = 'hoverOnDriven',
      /** Element is driven by a selected entity */
      selectedDriven = 'selectedDriven'
    }
    
    /**
     * General entity state flags
     */
    enum EntityFlagEnum {
      /** Entity is currently selected */
      selected = 'selected'
    }
  }
  
  namespace Util {
    namespace ExtraordinarySketch2d {
      /**
       * Extract all point entities from a collection of edges
       * @param edges - Array of edge models to process
       * @returns Array of point identifiers associated with the edges
       */
      function getAllPointsFromEdges(edges: unknown[]): unknown[];
    }
  }
}

/**
 * Utility class for edge-related operations in sketch systems
 * 
 * Provides static methods for managing the visual state synchronization
 * between edges and their constituent points.
 */
export declare class EdgeUtil {
  /**
   * Private constructor - this class only contains static methods
   */
  private constructor();
  
  /**
   * Synchronize flag states between an edge and its associated points
   * 
   * When an edge has certain visual flags (hover or selection), this method
   * propagates corresponding "driven" flags to all points that make up the edge.
   * This ensures visual consistency across the sketch hierarchy.
   * 
   * @param edge - The edge entity whose points should be synchronized
   * @param flag - The flag type that triggered the synchronization
   * 
   * @remarks
   * - When flag is `hoverOn`, points receive `hoverOnDriven` flag
   * - When flag is `selected`, points receive `selectedDriven` flag
   * - Points are found via `ExtraordinarySketch2d.getAllPointsFromEdges`
   * - Flag state (on/off) on the edge determines the action on points
   * - Changes are propagated immediately (propagate = true)
   * 
   * @example
   *