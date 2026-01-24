/**
 * Material utilities for handling texture and tile size calculations
 */
export declare class MaterialUtils {
  /**
   * Private constructor - this class contains only static methods
   */
  private constructor();

  /**
   * Retrieves the initial tile size for a material, optionally adjusting based on object metadata
   * 
   * @param metadata - The metadata object containing extension information and bounding data
   * @param tileConfig - The base tile configuration with default tile sizes
   * @param objectName - The name of the object to find bounding information for
   * @param useObjectBounds - Whether to use object-specific bounding data to override tile sizes (default: false)
   * @returns An object containing the calculated initial tile sizes for x and y axes
   * 
   * @example
   *