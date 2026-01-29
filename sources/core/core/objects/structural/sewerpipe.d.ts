/**
 * SewerPipe obstacle class for sewer pipe entities in the game/application.
 * This class represents a sewer pipe obstacle that can be placed in the environment.
 * 
 * @module SewerPipe
 */

import { Obstacle } from './obstacle';
import { Entity } from './entity';

/**
 * SewerPipe class representing a sewer pipe obstacle.
 * Extends the base Obstacle class to provide sewer pipe-specific functionality.
 * 
 * @class SewerPipe
 * @extends {Obstacle}
 */
export declare class SewerPipe extends Obstacle {
  /**
   * Creates an instance of SewerPipe.
   * 
   * @param {string} [id=''] - Unique identifier for the sewer pipe instance
   * @param {unknown} [options=undefined] - Additional configuration options for the sewer pipe
   * @constructor
   */
  constructor(id?: string, options?: unknown);
}

/**
 * Global constants namespace containing model class identifiers.
 * Used for entity registration and type identification.
 */
declare global {
  namespace HSConstants {
    enum ModelClass {
      NgSewerPipe = 'NgSewerPipe'
    }
  }
}