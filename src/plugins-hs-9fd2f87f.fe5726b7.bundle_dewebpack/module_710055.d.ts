/**
 * Product configuration module defining special handling rules for different product categories.
 * Contains UUID arrays for products requiring specific rotation or positioning behaviors.
 */

/**
 * Configuration object containing product ID arrays for different display behaviors
 */
export interface ProductConfiguration {
  /**
   * Product IDs that should have handles positioned on top
   * Used for items where the handle attachment point is at the upper portion
   */
  handleOnTopProducts: string[];

  /**
   * Product IDs that should have handles positioned on bottom
   * Used for items where the handle attachment point is at the lower portion
   */
  handleOnBottomsProducts: string[];

  /**
   * Product IDs that should not be rotated during display
   * Used for items that must maintain a fixed orientation
   */
  noRotationProducts: string[];
}

/**
 * Default product configuration data
 * Exported as a constant containing arrays of product UUIDs for each category
 */
declare const productConfig: ProductConfiguration;

export default productConfig;