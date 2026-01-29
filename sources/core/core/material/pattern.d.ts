/**
 * Pattern module - Core types and classes for pattern generation, grid management, and material handling
 * @module Pattern
 */

// ============================================================================
// Core Pattern Types
// ============================================================================

/**
 * Enumeration of pattern types
 */
export enum PatternTypeEnum {
  // Add specific pattern type values based on implementation
}

/**
 * Base pattern class for managing tile patterns
 */
export declare class Pattern {
  constructor();
  // Add specific properties and methods based on implementation
}

// ============================================================================
// Block Types
// ============================================================================

/**
 * Base block class representing a single unit in a pattern
 */
export declare class Block {
  constructor();
  // Add specific properties and methods
}

/**
 * Block type representing boundary elements
 */
export declare class BoundaryBlock extends Block {
  constructor();
}

/**
 * Block type for free-form pattern elements
 */
export declare class FreePatternBlock extends Block {
  constructor();
}

/**
 * Block type for gusset/corner elements
 */
export declare class GussetBlock extends Block {
  constructor();
}

/**
 * Block type for pattern grid elements
 */
export declare class PatternBlock extends Block {
  constructor();
}

/**
 * Block type for mixed/composite grid elements
 */
export declare class MixBlock extends Block {
  constructor();
}

// ============================================================================
// Boundary & Region Types
// ============================================================================

/**
 * I/O serialization interface for Boundary
 */
export interface Boundary_IO {
  // Add serialization fields
}

/**
 * Represents a boundary or edge in the pattern space
 */
export declare class Boundary {
  constructor();
  
  /**
   * Serialize boundary to I/O format
   */
  toIO(): Boundary_IO;
  
  /**
   * Deserialize boundary from I/O format
   */
  static fromIO(data: Boundary_IO): Boundary;
}

/**
 * Represents a region or area within a pattern
 */
export declare class Region {
  constructor();
}

// ============================================================================
// Grid Types
// ============================================================================

/**
 * Enumeration of grid layout types
 */
export enum GridTypeEnum {
  // Add specific grid type values (e.g., SQUARE, HEXAGONAL, etc.)
}

/**
 * Grid configuration for pattern layouts
 */
export declare class PatternGrid {
  constructor();
}

/**
 * I/O serialization interface for MixGrid
 */
export interface MixGrid_IO {
  // Add serialization fields
}

/**
 * Mixed/composite grid system for complex patterns
 */
export declare class MixGrid {
  constructor();
  
  /**
   * Serialize grid to I/O format
   */
  toIO(): MixGrid_IO;
  
  /**
   * Deserialize grid from I/O format
   */
  static fromIO(data: MixGrid_IO): MixGrid;
}

// ============================================================================
// Polygon & Geometry Types
// ============================================================================

/**
 * I/O serialization interface for Polygon
 */
export interface Polygon_IO {
  // Add serialization fields (vertices, edges, etc.)
}

/**
 * Represents a polygon geometry in the pattern system
 */
export declare class Polygon {
  constructor();
  
  /**
   * Serialize polygon to I/O format
   */
  toIO(): Polygon_IO;
  
  /**
   * Deserialize polygon from I/O format
   */
  static fromIO(data: Polygon_IO): Polygon;
}

// ============================================================================
// Gusset/Corner Types
// ============================================================================

/**
 * Surface definition for gusset elements
 */
export declare class GussetSurface {
  constructor();
}

/**
 * Group of gusset elements
 */
export declare class GussetGroup {
  constructor();
}

// ============================================================================
// Special Tile Types
// ============================================================================

/**
 * Waistline/border tile configuration
 */
export declare class Waistline {
  constructor();
}

/**
 * Water jet cut tile configuration
 */
export declare class WaterJetTile {
  constructor();
}

/**
 * Seam/joint configuration between tiles
 */
export declare class Seam {
  constructor();
}

// ============================================================================
// Paving/Layout Options
// ============================================================================

/**
 * Enumeration of paving point types
 */
export enum PavingPointTypeEnum {
  // Add specific point type values (e.g., CORNER, EDGE, CENTER)
}

/**
 * Configuration options for tile paving/layout
 */
export declare class PavingOption {
  constructor();
  
  /**
   * Point type for paving calculation
   */
  pointType?: PavingPointTypeEnum;
}

// ============================================================================
// Sketch & Drawing Types
// ============================================================================

/**
 * 2D sketch system for mixed pattern design
 */
export declare class MixSketch2d {
  constructor();
}

// ============================================================================
// Material & Paint System
// ============================================================================

/**
 * Material conversion utilities
 */
export declare class MaterialConvertor {
  constructor();
  
  /**
   * Convert material data between formats
   */
  convert(input: unknown): unknown;
}

/**
 * Paint/texture configuration for mixed patterns
 */
export declare class MixPaint {
  constructor();
}

/**
 * Decorator for enhancing MixPaint functionality
 */
export declare class MixPaintDecorator {
  constructor(paint: MixPaint);
  
  /**
   * Apply decorations to the paint
   */
  decorate(): void;
}

/**
 * Version 3 updater for MixPaint system
 */
export declare class MixPaintUpdaterV3 {
  constructor();
  
  /**
   * Update paint configuration to V3 format
   */
  update(paint: MixPaint): MixPaint;
}

// ============================================================================
// Data Model Conversion
// ============================================================================

/**
 * Utilities for converting between different data model versions
 */
export declare class DataModelConvertor {
  constructor();
  
  /**
   * Convert data model to target format
   */
  convert(source: unknown, targetVersion: string): unknown;
}

// ============================================================================
// Face Group Types
// ============================================================================

/**
 * Enumeration of face group connection modes
 */
export enum FaceGroupConnectModeEnum {
  // Add specific connection mode values (e.g., EDGE, VERTEX, SURFACE)
}

/**
 * Interface for face group boundary configuration
 */
export interface IFaceGroupBound {
  /**
   * Connection mode for face groups
   */
  connectMode: FaceGroupConnectModeEnum;
  
  /**
   * Boundary polygons
   */
  boundaries?: Polygon[];
  
  // Add other boundary properties as needed
}