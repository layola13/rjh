/**
 * Geographic element type enumeration
 * Defines the types of geographic elements that can be used in the system
 * 
 * @module EXT_EN_GEO_ELEMENT_TYPE
 * @originalId 25637
 */

/**
 * Enumeration of geographic element types
 * 
 * @enum {string}
 */
export enum EXT_EN_GEO_ELEMENT_TYPE {
  /**
   * Single geographic element
   * Represents a standalone, individual geographic point or feature
   */
  EN_SINGLE = "sin",
  
  /**
   * Continuous geographic element
   * Represents a connected or continuous geographic feature (e.g., line, polygon)
   */
  EN_CONTINUOUS = "con"
}