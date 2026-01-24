/**
 * Window entity module for handling window components in a building/CAD system
 * @module WindowEntity
 */

import { OpeningEntity } from './OpeningEntity';
import { SillStoneEntity } from './SillStoneEntity';

/**
 * Interface representing a window configuration with sills
 */
export interface IWindowConfiguration {
  /**
   * Get the collection of window sills
   * @returns Iterable collection of window sill data
   */
  getWindowSills(): Iterable<unknown>;
}

/**
 * Window entity class that extends OpeningEntity
 * Represents a window in the building system with sill stone components
 * 
 * @class WindowEntity
 * @extends {OpeningEntity}
 * 
 * @example
 *