/**
 * B3Wall module - Represents a wall entity in the B3 system
 * Extends B3Entity to provide wall-specific properties and behaviors
 */

import { B3Entity } from './B3Entity';

/**
 * Interface representing the arc configuration of a wall
 */
export interface WallArc {
  /** Arc radius (optional) */
  radius?: number;
  /** Arc angle in degrees (optional) */
  angle?: number;
  /** Arc center point coordinates (optional) */
  center?: { x: number; y: number; z: number };
}

/**
 * Interface representing the complete BOM3 data structure for a wall entity
 */
export interface WallBom3Data {
  /** The transformed B3 entity representation */
  entity: unknown;
  /** Physical location/position of the wall */
  location?: { x: number; y: number; z: number };
  /** Type/classification of the wall (e.g., "exterior", "interior", "partition") */
  wallType?: string;
  /** Wall thickness in units */
  thickness?: number;
  /** Wall height in units */
  height?: number;
  /** Inner length measurement of the wall */
  innerLength?: number;
  /** Bearing capacity indicator */
  bBearing?: boolean;
  /** Arc configuration for curved walls */
  arc?: WallArc;
  /** Indicates if wall extends to full height */
  bFullHeight?: boolean;
  /** Indicates if this is an interior wall */
  isInnerWall?: boolean;
  /** Cross-sectional area of the wall */
  sectionArea?: number;
}

/**
 * B3Wall class - Represents a wall entity with specific geometric and structural properties
 * 
 * This class extends B3Entity to provide wall-specific functionality including:
 * - Wall geometry (thickness, height, length)
 * - Structural properties (bearing capacity, section area)
 * - Position and orientation data
 * - Support for curved walls via arc configuration
 * 
 * @extends B3Entity
 */
export declare class B3Wall extends B3Entity {
  /**
   * Constructs a new B3Wall instance
   */
  constructor();

  /**
   * Builds BOM3 (Bill of Materials level 3) data structure from an entity
   * 
   * Transforms the input entity into a standardized BOM3 format containing:
   * - Entity representation
   * - Geometric parameters (location, dimensions)
   * - Structural properties (wall type, bearing capacity)
   * - Configuration options (full height, inner wall status)
   * 
   * @param entity - The source entity to transform into BOM3 format
   * @returns The complete BOM3 data structure with all wall properties
   */
  buildBom3Data(entity: unknown): WallBom3Data;
}

/**
 * Default export of B3Wall class
 */
export { B3Wall };