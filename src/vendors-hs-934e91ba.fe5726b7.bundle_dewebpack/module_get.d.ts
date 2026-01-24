/**
 * Module: module_get
 * Original ID: get
 */

/**
 * Interface representing a clipper configuration object
 */
interface ClipperConfig {
  /**
   * Indicates whether collinear points should be preserved during clipping operations
   */
  preserveCollinear: boolean;
}

/**
 * Class containing clipping operations and configuration
 */
declare class ClipperManager {
  /**
   * Internal clipper configuration
   * @private
   */
  private _clipper: ClipperConfig;

  /**
   * Gets whether collinear points are preserved during clipping operations.
   * Collinear points are points that lie on the same straight line.
   * 
   * @returns {boolean} True if collinear points should be preserved, false otherwise
   */
  get preserveCollinear(): boolean;
}

export { ClipperManager, ClipperConfig };