/**
 * Curtain data management module
 * Provides access to default curtain configurations and utilities for selecting curtains based on size
 */

/**
 * Represents a 3D size with x, y, and z dimensions
 */
export interface Size3D {
  /** Width dimension */
  x: number;
  /** Height dimension */
  y: number;
  /** Depth dimension */
  z: number;
}

/**
 * Represents a curtain configuration with unique identifier and physical dimensions
 */
export interface CurtainConfig {
  /** Unique identifier for the curtain */
  id: string;
  /** Physical dimensions of the curtain */
  size: Size3D;
}

/**
 * Internal type for curtain matching algorithm
 */
interface CurtainMatch {
  /** The matched curtain item */
  item: CurtainConfig;
  /** Absolute difference between requested and actual size */
  diff: number;
}

/**
 * CurtainData class provides static access to default curtain configurations
 * and utility methods for finding the best matching curtain based on dimensions
 */
export declare class CurtainData {
  /**
   * Private static collection of default curtain configurations
   * Contains predefined curtain options with varying widths
   */
  private static readonly _defaultCurtains: ReadonlyArray<CurtainConfig>;

  /**
   * Finds the default curtain ID that best matches the requested X dimension (width)
   * Uses absolute difference algorithm to find the closest match
   * 
   * @param xSize - The desired width dimension to match
   * @returns The ID of the curtain with the closest matching width
   * 
   * @example
   *