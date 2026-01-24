/**
 * Entity bound calculation and region detection utilities for spatial analysis of 3D entities.
 * Provides intersection detection, region computation, and boundary analysis for cabinet/furniture layouts.
 */

// ============================================================================
// Constants
// ============================================================================

/** Sort order direction */
export enum SortOrder {
  /** Ascending sort order (1) */
  INCREASING = 1,
  /** Descending sort order (2) */
  DESCENDING = 2
}

// ============================================================================
// Interfaces & Types
// ============================================================================

/**
 * 3D coordinate point
 */
export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Entity that can have bounds computed
 */
export interface BoundableEntity {
  x: number;
  y: number;
  z: number;
  XLength: number;
  YLength: number;
  ZLength: number;
  XRotation: number;
  YRotation: number;
  localId?: string;
  contentType?: ContentType;
  children?: Record<string, BoundableEntity>;
  contents?: Record<string, Content>;
  forEachChild?(callback: (child: BoundableEntity) => void): void;
}

/**
 * Extruding entity with path-based geometry
 */
export interface PExtrudingEntity extends BoundableEntity {
  height: number;
  paths: Array<{
    children: Vector3D[];
  }>;
}

/**
 * Content item within an entity
 */
export interface Content {
  contentType: ContentType;
}

/**
 * Content type definition
 */
export interface ContentType {
  isTypeOf(types: unknown[] | unknown): boolean;
}

/**
 * Intersection check result between two bounds along a specific axis
 */
export interface BoundsIntersectionResult {
  /** Length of the intersection segment */
  intersectionLength: number;
  /** Ratio of intersection length to target bound dimension */
  rateToTarget: number;
  /** Distance between the two bounds */
  distance: number;
  /** Target bound being checked */
  target: EntityBound;
  /** Other bound being compared */
  other: EntityBound;
}

/**
 * Classification result of bounds into horizontal and vertical categories
 */
export interface ClassifiedBounds {
  /** Bounds oriented horizontally */
  horizontalBounds: EntityBound[];
  /** Bounds oriented vertically */
  verticalBounds: EntityBound[];
}

// ============================================================================
// Base Disposable Class
// ============================================================================

/**
 * Base class with unique identifier and disposal mechanism
 */
declare abstract class Disposable {
  /** Unique identifier for this instance */
  protected readonly guid: string;
  
  /** Get the unique name (same as guid) */
  get name(): string;
  
  /** Clean up resources */
  dispose(): void;
}

// ============================================================================
// EntityBound Class
// ============================================================================

/**
 * Represents the 3D axis-aligned bounding box of an entity with spatial classification.
 * Computes bounds for regular entities and extruding path-based entities.
 */
export declare class EntityBound extends Disposable {
  /** The entity this bound represents */
  entity: BoundableEntity | null;
  
  /** Minimum X coordinate */
  left: number;
  
  /** Maximum X coordinate */
  right: number;
  
  /** Maximum Z coordinate */
  top: number;
  
  /** Minimum Z coordinate */
  bottom: number;
  
  /** Minimum Y coordinate */
  front: number;
  
  /** Maximum Y coordinate */
  back: number;
  
  /**
   * Create a bound for the given entity
   * @param entity - The 3D entity to compute bounds for
   */
  constructor(entity: BoundableEntity);
  
  /** Check if this bound represents a back board (thin in Y direction) */
  get isBackBoard(): boolean;
  
  /** Check if this bound is horizontally oriented (width > height, not a back board) */
  get isHorizontal(): boolean;
  
  /** Check if this bound is vertically oriented (height > width, not a back board) */
  get isVertical(): boolean;
  
  /** Width along X axis */
  get width(): number;
  
  /** Height along Z axis */
  get height(): number;
  
  /** Depth along Y axis */
  get depth(): number;
  
  /** Array of corner region points (4 corners at the front face) */
  get selfRegionPoints(): EntityIntersectionPoint[];
  
  /**
   * Compute the bounding box for the entity
   * @param entity - The entity to compute bounds for
   */
  computeBound(entity: BoundableEntity): void;
  
  /**
   * Compute bounds for extruding path-based entities
   * @param entity - The extruding entity
   */
  getPextrudingBound(entity: PExtrudingEntity): void;
  
  /**
   * Determine the type of extruding entity based on path orientation
   * @param entity - The extruding entity
   * @returns Type classification: "laminateboard", "sideboard", "backboard", or "unknown"
   */
  checkPextrudingType(entity: PExtrudingEntity): "laminateboard" | "sideboard" | "backboard" | "unknown";
  
  /**
   * Compute intersection points between a horizontal and vertical bound
   * @param horizontalBound - The horizontal bound
   * @param verticalBound - The vertical bound
   * @returns Array of intersection points (0, 2, or 4 points)
   */
  static computeIntersection(
    horizontalBound: EntityBound,
    verticalBound: EntityBound
  ): EntityIntersectionPoint[];
  
  /**
   * Check if two bounds intersect along a specific axis and compute intersection details
   * @param bound1 - First bound
   * @param bound2 - Second bound
   * @param axis - Axis to check ("x", "y", or "z")
   * @returns Intersection details or undefined if no intersection
   */
  static checkTwoBoundsIntersectionByAxisType(
    bound1: EntityBound,
    bound2: EntityBound,
    axis: "x" | "y" | "z"
  ): BoundsIntersectionResult | undefined;
  
  dispose(): void;
}

// ============================================================================
// EntityIntersectionPoint Class
// ============================================================================

/**
 * Represents a point where two entity bounds intersect in 3D space
 */
export declare class EntityIntersectionPoint extends Disposable {
  /** X coordinate */
  x: number;
  
  /** Y coordinate */
  y: number;
  
  /** Z coordinate */
  z: number;
  
  /** The horizontal entity involved in this intersection (optional) */
  horizontalEntity?: EntityBound;
  
  /** The vertical entity involved in this intersection (optional) */
  verticalEntity?: EntityBound;
  
  constructor();
  
  /**
   * Check if this point equals another point
   * @param other - The point to compare with
   * @returns True if coordinates match exactly
   */
  isEqualto(other: EntityIntersectionPoint): boolean;
  
  /** Get this point as a Vector3D object */
  get vector3d(): Vector3D;
  
  /**
   * Create an intersection point from coordinates
   * @param coords - The 3D coordinates
   * @returns New intersection point instance
   */
  static create(coords: Vector3D): EntityIntersectionPoint;
  
  /**
   * Check if two points are equal
   * @param point1 - First point
   * @param point2 - Second point
   * @returns True if all coordinates match exactly
   */
  static isEqual(point1: EntityIntersectionPoint, point2: EntityIntersectionPoint): boolean;
  
  dispose(): void;
}

// ============================================================================
// EntityInternalRegion Class
// ============================================================================

/**
 * Represents a rectangular internal region bounded by entities in 3D space.
 * Used for detecting usable space between structural elements.
 */
export declare class EntityInternalRegion extends Disposable {
  /** Minimum X coordinate */
  left: number;
  
  /** Maximum X coordinate */
  right: number;
  
  /** Maximum Z coordinate */
  top: number;
  
  /** Minimum Z coordinate */
  bottom: number;
  
  /** Minimum Y coordinate */
  front: number;
  
  /** Maximum Y coordinate */
  back: number;
  
  constructor();
  
  /** Area of the region (width × height) */
  get regionArea(): number;
  
  /** Width along X axis */
  get width(): number;
  
  /** Height along Z axis */
  get height(): number;
  
  /** Depth along Y axis */
  get depth(): number;
  
  /** Center X coordinate */
  get x(): number;
  
  /** Front Y coordinate */
  get y(): number;
  
  /** Bottom Z coordinate */
  get z(): number;
  
  /**
   * Get the four corner points of this region
   * @returns Array of 4 corner points (should return the array, current implementation is incomplete)
   */
  getRegionPoints(): void;
  
  /**
   * Create a deep copy of this region
   * @returns Cloned region with identical bounds
   */
  clone(): EntityInternalRegion;
  
  /**
   * Compose a region from vertical and horizontal bounds
   * @param leftVerticalBound - Left vertical boundary (optional)
   * @param rightVerticalBound - Right vertical boundary (optional)
   * @param bottomHorizontalBound - Bottom horizontal boundary
   * @param topHorizontalBound - Top horizontal boundary
   * @returns Newly composed region
   */
  static composeRegion(
    leftVerticalBound: EntityBound | null,
    rightVerticalBound: EntityBound | null,
    bottomHorizontalBound: EntityBound,
    topHorizontalBound: EntityBound
  ): EntityInternalRegion;
  
  dispose(): void;
}

// ============================================================================
// EntityBoundUtils Class
// ============================================================================

/**
 * Utility class for computing internal regions within hierarchical entity structures.
 * Analyzes spatial relationships between child entities to detect usable space.
 */
export declare class EntityBoundUtils {
  private constructor();
  
  /**
   * Compute all internal regions within an entity's children
   * @param entity - Parent entity containing children to analyze
   * @returns Array of detected internal regions
   */
  static getRegions(entity: BoundableEntity): EntityInternalRegion[];
  
  /**
   * Compute regions specifically for wardrobe frame structures
   * Handles nested PAssembly entities with coordinate transformations
   * @param entity - The wardrobe frame entity
   * @returns Array of internal regions
   */
  static getRegionsOfWardrobeFrame(entity: BoundableEntity): EntityInternalRegion[];
  
  /**
   * Compute regions for corner cabinets with special handling
   * @param entity - The corner cabinet entity
   * @returns Array of internal regions
   */
  static getRegionsOfCornerCabinets(entity: BoundableEntity): EntityInternalRegion[];
  
  /**
   * Compute regions for function cabinets (e.g., sink cabinets)
   * Special handling for single horizontal shelf with sink content
   * @param entity - The function cabinet entity
   * @returns Array of internal regions (may be empty)
   */
  static getRegionsOfFunctionCabinet(entity: BoundableEntity): EntityInternalRegion[];
  
  /**
   * Create regions from sorted horizontal and vertical bounds using flood-fill algorithm
   * @param horizontalBounds - Sorted horizontal bounds (sorted by bottom Z)
   * @param verticalBounds - Sorted vertical bounds (sorted by left X)
   * @returns Array of composed regions
   */
  static createRegionsFromHorizontalAndVerticalBounds(
    horizontalBounds: EntityBound[],
    verticalBounds: EntityBound[]
  ): EntityInternalRegion[];
  
  /**
   * Classify bounds into horizontal and vertical categories and sort them
   * @param bounds - Array of entity bounds
   * @returns Classified and sorted bounds
   */
  static classifyAndSortBounds(bounds: EntityBound[]): ClassifiedBounds;
  
  /**
   * Get all region points including intersections and borders
   * @param entity - Parent entity to analyze
   * @returns Array of all region points
   */
  static getRegionPoints(entity: BoundableEntity): EntityIntersectionPoint[];
  
  /**
   * Create bounds for all valid children of an entity
   * @param entity - Parent entity
   * @returns Array of child entity bounds
   */
  static createChildrenBounds(entity: BoundableEntity): EntityBound[];
  
  /**
   * Compute all intersection points between bounds
   * @param bounds - Array of entity bounds
   * @returns Array of intersection points
   */
  static computeIntersectionRegionPoints(bounds: EntityBound[]): EntityIntersectionPoint[];
  
  /**
   * Get border region points that are not intersections
   * @param bounds - Array of entity bounds
   * @param intersectionPoints - Already computed intersection points
   * @returns Array of border-only points
   */
  static getBorderRegionPoints(
    bounds: EntityBound[],
    intersectionPoints?: EntityIntersectionPoint[]
  ): EntityIntersectionPoint[];
  
  /**
   * Check if two bounds are eligible for intersection computation
   * @param bound1 - First bound
   * @param bound2 - Second bound
   * @returns Array [horizontal, vertical] if valid, null otherwise
   */
  static getExpectBoundsForApplyIntersection(
    bound1: EntityBound,
    bound2: EntityBound
  ): [EntityBound, EntityBound] | null;
  
  /**
   * Check if an entity is valid for region computation
   * Excludes doors and entities with non-zero X/Y rotation
   * @param entity - Entity to validate
   * @returns True if entity should be included in analysis
   */
  static isLegalEntity(entity: BoundableEntity): boolean;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * 1D segment intersection utility
 */
declare class SegmentUtils {
  private constructor();
  
  /**
   * Calculate the intersection length between two 1D segments
   * @param start1 - Start of first segment
   * @param end1 - End of first segment
   * @param start2 - Start of second segment
   * @param end2 - End of second segment
   * @returns Length of intersection (0 if no overlap)
   */
  static getOneDSegmentIntersectionLength(
    start1: number,
    end1: number,
    start2: number,
    end2: number
  ): number;
}

/**
 * Array sorting utility
 */
declare class ArraySorter {
  private constructor();
  
  /**
   * Sort an array of objects by a specific property
   * @param array - Array to sort (modified in place)
   * @param propertyName - Name of the property to sort by
   * @param order - Sort order (INCREASING or DESCENDING)
   * @returns The sorted array (same reference as input)
   */
  static sortOn<T>(
    array: T[],
    propertyName: keyof T,
    order?: SortOrder
  ): T[];
}

export default EntityBoundUtils;