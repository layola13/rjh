/**
 * Point utility module for managing wall relationships
 * @module PointUtil
 */

import { Wall } from './Wall';

/**
 * Interface representing an entity that can have parent relationships
 */
interface EntityWithParents {
  /**
   * Map of parent entities indexed by their identifier
   */
  parents: Record<string, unknown>;
}

/**
 * Utility class for point-related operations in a spatial system
 */
export declare class PointUtil {
  /**
   * Retrieves all Wall instances that are parent entities of the given entity
   * 
   * @param entity - The entity whose parent walls should be retrieved
   * @returns An array of unique Wall instances that are parents of the entity.
   *          Returns an empty array if the entity is null/undefined or has no wall parents.
   * 
   * @example
   *