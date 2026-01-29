/**
 * Represents the side type of a pocket
 * @module PocketSideType
 */

/**
 * Defines the possible side positions for a pocket
 */
export enum PocketSideType {
  /**
   * Pocket is positioned on the inner side
   */
  Inner = "inner",
  
  /**
   * Pocket is positioned on the outer side
   */
  Outer = "outer",
  
  /**
   * Pocket is positioned on both inner and outer sides
   */
  Both = "both"
}