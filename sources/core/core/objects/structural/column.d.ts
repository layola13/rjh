/**
 * Column entity class representing a structural column obstacle in the model.
 * Extends the base Obstacle class to provide column-specific functionality.
 * 
 * @module Column
 * @see Obstacle
 */

import { Obstacle } from './Obstacle';
import { Entity } from './Entity';

/**
 * Represents a column obstacle in the architectural model.
 * Columns are vertical structural elements that inherit obstacle properties.
 */
export declare class Column extends Obstacle {
  /**
   * Creates a new Column instance.
   * 
   * @param id - Unique identifier for the column. Defaults to empty string.
   * @param options - Optional configuration parameters for the column.
   */
  constructor(id?: string, options?: unknown);
}

/**
 * Column class is registered with the Entity system under ModelClass.NgColumn.
 * This enables serialization, deserialization, and runtime type identification.
 */
declare module './Entity' {
  namespace Entity {
    /**
     * Registers the Column class with the entity system.
     * 
     * @param className - The model class identifier (HSConstants.ModelClass.NgColumn)
     * @param classConstructor - The Column class constructor
     */
    function registerClass(className: string, classConstructor: typeof Column): void;
  }
}

/**
 * Constants namespace containing model class identifiers.
 */
declare namespace HSConstants {
  enum ModelClass {
    NgColumn = 'NgColumn'
  }
}