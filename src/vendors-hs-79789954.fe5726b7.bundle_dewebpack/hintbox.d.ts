/**
 * Represents a hint box with margin information and geometric properties.
 * Used for displaying hints or tooltips with proper positioning and boundaries.
 */
export interface HintBox {
  /** The outer box including margins */
  marginedBox: Box;
  
  /** The inner content box without margins */
  box: Box;
  
  /** The type/category of the hint box */
  type: string | number;
}

/**
 * Geometric box interface with corner point access
 */
export interface Box {
  /**
   * Returns the corner points of the box
   * @returns Array of corner point coordinates
   */
  getCornerPts(): Point[];
}

/**
 * Represents a 2D point or coordinate
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Configuration object for creating a HintBox instance
 */
export interface HintBoxConfig {
  /** The outer box including margins */
  marginedBox: Box;
  
  /** The inner content box without margins */
  box: Box;
  
  /** The type/category of the hint box */
  type: string | number;
}

/**
 * HintBox class for managing hint display areas with margin handling.
 * Provides functionality to create and log box geometries.
 */
export declare class HintBox {
  /** The outer box including margins */
  readonly marginedBox: Box;
  
  /** The inner content box without margins */
  readonly box: Box;
  
  /** The type/category of the hint box */
  readonly type: string | number;

  /**
   * Creates a new HintBox instance
   * @param config - Configuration object containing box properties
   */
  constructor(config: HintBoxConfig);

  /**
   * Logs the box corner points to the debug output.
   * Uses Loop utility to process corner points before logging.
   */
  logBox(): void;
}