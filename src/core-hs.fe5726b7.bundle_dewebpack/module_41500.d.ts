/**
 * Geometry utility module for 3D and 2D segment manipulation
 * Provides functions for loading segments, converting between formats, and fixing parent-child relationships
 */

import type { 
  EN_GEO_ELEMENT_TYPE, 
  Arc3d, 
  Line3d, 
  Arc2d, 
  Line2d, 
  Point3d 
} from './geo-types';

import type { 
  DAssembly, 
  DContent, 
  DExtruding, 
  DMolding, 
  DSweep, 
  Layer 
} from './model-types';

/**
 * Raw segment data structure for 3D elements
 */
export interface Segment3DData {
  /** Geometry element type identifier */
  type: EN_GEO_ELEMENT_TYPE;
  /** Additional segment properties */
  [key: string]: unknown;
}

/**
 * Raw segment data structure for 2D elements
 */
export interface Segment2DData {
  /** Geometry element type identifier */
  type: EN_GEO_ELEMENT_TYPE;
  /** Additional segment properties */
  [key: string]: unknown;
}

/**
 * Model element with parent-child relationships
 */
export interface ModelElement {
  /** Unique identifier */
  id: string;
  /** Parent elements mapped by ID */
  parents: Record<string, ParentElement>;
  /** Child elements mapped by ID */
  children: Record<string, ModelElement>;
}

/**
 * Valid parent element types
 */
export type ParentElement = 
  | Layer 
  | DAssembly 
  | DContent 
  | DExtruding 
  | DMolding 
  | DSweep;

/**
 * Valid structural model types (non-Layer parents)
 */
export type StructuralModelType = 
  | DAssembly 
  | DContent 
  | DExtruding 
  | DMolding 
  | DSweep;

/**
 * 3D geometric segment (Arc or Line)
 */
export type Segment3D = Arc3d | Line3d;

/**
 * 2D geometric segment (Arc or Line)
 */
export type Segment2D = Arc2d | Line2d;

/**
 * Loads and deserializes 3D segment data into appropriate geometry object
 * @param data - Raw segment data containing type and properties
 * @returns Arc3d instance if type is EN_ARC_3D, otherwise Line3d instance
 */
export declare function loadSegment3D(data: Segment3DData): Segment3D;

/**
 * Loads and deserializes 2D segment data into appropriate geometry object
 * @param data - Raw segment data containing type and properties
 * @returns Arc2d instance if type is EN_ARC_2D, otherwise Line2d instance
 */
export declare function loadSegment2D(data: Segment2DData): Segment2D;

/**
 * Converts array of 3D points to array of Line3d segments
 * Creates lines connecting consecutive points
 * @param points - Array of 3D points to connect
 * @returns Array of Line3d segments (length = points.length - 1)
 */
export declare function pointsToLine3ds(points: Point3d[]): Line3d[];

/**
 * Converts array of 3D segments to flattened point array
 * Discretizes each segment and removes duplicate points at boundaries
 * @param segments - Array of 3D geometric segments
 * @returns Flattened array of discrete points along all segments
 */
export declare function segment3dToPoints(segments: Segment3D[]): Point3d[];

/**
 * Attempts to fix invalid multi-parent relationships in model hierarchy
 * Removes redundant parent-child links when element has both Layer and structural parent
 * @param element - Model element potentially having multiple parents
 * @returns true if issue was fixed successfully, false if fix failed or was not needed
 */
export declare function tryFixMultiParentsData(element: ModelElement): boolean;