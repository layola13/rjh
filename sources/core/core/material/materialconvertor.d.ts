/**
 * Material conversion utilities for handling tile sizing and paving options.
 * Provides methods to calculate tile scale factors and convert paving configurations.
 * 
 * @module MaterialConvertor
 */

/**
 * Point coordinates in 2D space
 */
export interface Point {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * Paving option configuration
 */
export interface PavingOption {
  /** Position point */
  point: Point;
  /** Rotation angle in degrees */
  rotation: number;
  /** Horizontal slider offset */
  sliderOffsetX: number;
  /** Vertical slider offset (optional) */
  sliderOffsetY?: number;
}

/**
 * Converted paving option with normalized coordinates
 */
export interface ConvertedPavingOption {
  /** Position point with inverted Y coordinate */
  point: Point;
  /** Normalized rotation angle */
  rotation: number;
  /** Horizontal slider offset */
  sliderOffsetX: number;
  /** Vertical slider offset with inverted sign */
  sliderOffsetY: number;
}

/**
 * Product metadata containing tile dimensions
 */
export interface ProductMetadata {
  /** Initial tile width */
  tileSize_x?: number;
  /** Initial tile height */
  tileSize_y?: number;
}

/**
 * Entity with tile size information
 */
export interface TileEntity {
  /** Current tile width */
  tileSize_x?: number;
  /** Current tile height */
  tileSize_y?: number;
  /** Initial tile width */
  initTileSize_x?: number;
  /** Initial tile height */
  initTileSize_y?: number;
  /** Product identifier */
  seekId?: string;
  /** Optional metadata */
  metadata?: ProductMetadata;
}

/**
 * Utility class for converting material and paving properties.
 * Handles coordinate transformations and tile scaling calculations.
 */
export declare class MaterialConvertor {
  /**
   * Calculates the scale factors for tile dimensions.
   * Compares current tile size against initial tile size to determine scaling.
   * Falls back to metadata if initial sizes are not available.
   * 
   * @param entity - Entity containing tile size information
   * @returns Tuple of [xScale, yScale] factors
   * 
   * @example
   * const entity = { tileSize_x: 200, tileSize_y: 150, initTileSize_x: 100, initTileSize_y: 100 };
   * const [scaleX, scaleY] = MaterialConvertor.getTileSizeScale(entity);
   * // Returns [2, 1.5]
   */
  static getTileSizeScale(entity: TileEntity): [number, number];

  /**
   * Converts a paving option to a normalized coordinate system.
   * - Inverts Y coordinates (flips vertical axis)
   * - Normalizes rotation angle to range [-180, 180]
   * - Inverts slider offset Y value
   * 
   * @param option - Original paving option configuration
   * @returns Converted paving option with transformed coordinates
   * 
   * @example
   * const option = { 
   *   point: { x: 10, y: 20 }, 
   *   rotation: 270, 
   *   sliderOffsetX: 5, 
   *   sliderOffsetY: 10 
   * };
   * const converted = MaterialConvertor.convertPavingOption(option);
   * // Returns { point: { x: 10, y: -20 }, rotation: -90, sliderOffsetX: 5, sliderOffsetY: -10 }
   */
  static convertPavingOption(option: PavingOption): ConvertedPavingOption;
}