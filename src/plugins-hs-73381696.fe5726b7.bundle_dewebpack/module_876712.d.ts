/**
 * Utility functions for layer slab validation and floor geometry operations
 * @module LayerSlabUtils
 */

/**
 * Represents a 2D point or vector with x and y coordinates
 */
interface Point2D {
  x: number;
  y: number;
  clone(): Point2D;
  translate(offset: Point2D): Point2D;
}

/**
 * Represents a curve or path segment
 */
type Curve = Point2D[];

/**
 * Represents a region with an outer boundary and optional holes
 */
interface Region {
  /** Outer boundary points */
  outer: Curve;
  /** Inner holes (voids) in the region */
  holes?: Curve[];
}

/**
 * Information about floor slab regions
 */
interface FloorSlabData {
  /** User-defined regions */
  regions: Region[];
  /** Automatically generated regions */
  autoRegions: Region[];
}

/**
 * Layer slab regions information
 */
interface LayerSlabRegionsInfo {
  floorSlabData: FloorSlabData;
}

/**
 * Floor slab information
 */
interface FloorSlabInfo {
  slabInfo: {
    rawPath: {
      outer?: Curve;
    };
  };
}

/**
 * Model content item
 */
interface ModelContent {
  /** Model class identifier */
  Class: string;
}

/**
 * Entity with contents collection
 */
interface EntityWithContents {
  contents: Record<string, ModelContent>;
}

/**
 * Entity with floor slabs
 */
interface EntityWithFloorSlabs {
  forEachFloorSlab(callback: (floorSlab: FloorSlabInfo) => void): void;
}

/**
 * Clip operation mode enumeration
 */
declare enum ClipMode {
  Diff = 'Diff',
  Union = 'Union',
  Intersect = 'Intersect',
}

/**
 * Loop geometry utility class
 */
declare class Loop {
  constructor(points: Curve);
  /**
   * Calculate the area enclosed by the loop
   * @returns Area in square units
   */
  calcArea(): number;
}

/**
 * Geometry utilities namespace
 */
declare namespace TgUtil {
  /**
   * Perform clipping operation between two sets of regions
   * @param regionsA First set of regions
   * @param regionsB Second set of regions
   * @param mode Clipping mode
   * @returns Resulting clipped regions
   */
  function clip(regionsA: Region[], regionsB: Region[], mode: ClipMode): Region[];

  /**
   * Check if two sets of curves overlap
   * @param curvesA First set of curves
   * @param curvesB Second set of curves
   * @returns True if curves overlap
   */
  function isCurvesOverLap(curvesA: Curve, curvesB: Curve): boolean;
}

/**
 * Slab utilities namespace
 */
declare namespace TgSlab {
  /**
   * Get layer slab regions information for an entity
   * @param entity Entity to analyze
   * @returns Layer slab regions information
   */
  function getLayerSlabRegionsInfo(entity: unknown): LayerSlabRegionsInfo;
}

/**
 * Model class constants
 */
declare namespace HSConstants {
  enum ModelClass {
    NCustomizedCeilingModel = 'NCustomizedCeilingModel',
  }
}

/**
 * Core API namespace
 */
declare namespace HSCore {
  namespace Util {
    export { TgSlab };
  }
  namespace Geometry {
    export { TgUtil };
  }
}

/** Minimum area threshold for considering a region as edited (0.0001 square units) */
declare const AREA_THRESHOLD: 1e-4;

/**
 * Determines if layer slabs have been manually edited by comparing user-defined
 * regions with automatically generated regions.
 * 
 * @param entity - The entity containing layer slab information
 * @returns True if the total area difference between user-defined and auto-generated
 *          regions exceeds the threshold, indicating manual edits
 */
export declare function isLayerSlabsEdited(entity: unknown): boolean;

/**
 * Checks if an entity contains any customized ceiling models in its contents.
 * 
 * @param entity - The entity with contents to check
 * @returns True if at least one customized ceiling model is found
 */
export declare function hasSketchCeiling(entity: EntityWithContents): boolean;

/**
 * Determines if floor slabs still overlap after applying a translation offset.
 * Tests all floor slabs by translating their outer paths and checking for overlap
 * with the original paths.
 * 
 * @param entity - The entity containing floor slabs
 * @param offset - The 2D translation offset to apply
 * @returns True if all floor slabs still overlap after translation, false otherwise
 */
export declare function isFloorsOverlapAfterOffset(
  entity: EntityWithFloorSlabs,
  offset: Point2D
): boolean;