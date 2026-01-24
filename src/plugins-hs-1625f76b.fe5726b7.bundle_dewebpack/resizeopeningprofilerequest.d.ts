import { HSCore } from './HSCore';
import { PerformanceLogCategory, PerformanceOperationTypes } from './PerformanceTypes';

/**
 * Logger instance for operation performance tracking
 */
const logger = log.logger(PerformanceLogCategory.Operation);

/**
 * Interface representing an opening object with architectural properties
 */
interface IOpening {
  /** The height of the arch in the opening */
  archHeight: number;
  
  /** The Z-axis length/height of the opening */
  ZLength: number;
  
  /**
   * Updates the opening dimensions via Parameter Manager
   * @param width - Optional width parameter
   * @param zLength - The Z-axis length
   * @param archHeight - The arch height
   */
  updateByPM(width: undefined, zLength: number, archHeight: number): void;
  
  /**
   * Rebuilds the opening geometry
   */
  build(): void;
}

/**
 * Request handler for resizing opening profile arch height
 * Extends the base StateRequest to handle transactional field updates
 * 
 * @example
 *