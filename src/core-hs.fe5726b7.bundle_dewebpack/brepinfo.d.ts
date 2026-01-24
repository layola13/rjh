/**
 * Module: BrepInfo
 * Utilities for Boundary Representation (B-Rep) operations and topology management
 */

import { Wire } from './Wire';
import { Vector2, Arc2d, Line2d, Loop, Polygon, Coordinate3, EN_GEO_ELEMENT_TYPE } from './GeometryTypes';
import { Single } from './Single';
import { HalfPlane } from './HalfPlane';
import { TgWallUtil } from './TgWallUtil';

/**
 * Stores information about B-Rep topology, including face and curve mappings
 */
export declare class BrepInfo {
  /** Map storing general B-Rep information */
  info: Map<unknown, unknown>;
  
  /** Map tracking original face associations */
  oldFace: Map<unknown, unknown>;
  
  /** Map tracking original curve indices */
  oldCurveIndex: Map<unknown, unknown>;

  constructor();
}

/**
 * Point with associated angle metadata
 */
interface PointWithAngle {
  angle: number;
  arc: Arc2d;
}

/**
 * Arc segment with optional mapping reference
 */
interface ArcSegment {
  arc: Arc2d;
  mapping?: Arc2d;
}

/**
 * Result of arc overlap calculation
 */
interface OverlapResult {
  /** Overlapping arc segments */
  overlap: Arc2d[];
  
  /** Remaining non-overlapping arc segments */
  remain: Arc2d[];
}

/**
 * Result of polygon discretization
 */
interface DiscretePolygonResult {
  /** Discretized polygon */
  polygon: Polygon;
  
  /** Map from indices to original curves */
  map: Map<number, any>;
  
  /** Map indicating curve continuity */
  isContinuou: Map<number, boolean>;
  
  /** Total number of segments generated */
  idCount: number;
}

/**
 * Utility class for B-Rep topology operations
 */
export declare class Util {
  /** ID generation helper */
  static IDGenerate: typeof IDGenerate;
  
  /** Disjoint set data structure */
  static Disjoint: typeof Disjoint;
  
  /** BrepInfo class reference */
  static BrepInfo: typeof BrepInfo;

  /**
   * Remove duplicate elements from array
   * @param array - Array to deduplicate
   * @param compareFn - Optional comparison function for sorting
   * @returns The same array with duplicates removed
   */
  static unique<T>(array: T[], compareFn?: (a: T, b: T) => number): T[];

  /**
   * Assign sequential IDs to elements via userData.tmpsetId
   * @param elements - Elements to assign IDs
   * @param startId - Starting ID value
   */
  static assignId(elements: Array<{ userData: { tmpsetId?: number } }>, startId?: number): void;

  /**
   * Check if two arrays contain identical elements in order
   * @param array1 - First array
   * @param array2 - Second array
   * @returns True if arrays are identical
   */
  static isSeamArray<T>(array1: T[], array2: T[]): boolean;

  /**
   * Extract all faces from multiple shells
   * @param shells - Array of shell objects
   * @returns Flattened array of all faces
   */
  static getAllFaces(shells: Array<{ getFaces(): any[] }>): any[];

  /**
   * Extract all edges from multiple faces
   * @param faces - Array of face objects
   * @returns Array of all edges
   */
  static getAllEdge(faces: Array<{ getEdges(): any[] }>): any[];

  /**
   * Traverse coedges following topological direction
   * @param coedge - Starting coedge
   * @param visitor - Callback function, return false to stop traversal
   */
  static traverseCoedgeWithTopoDirection(coedge: any, visitor: (coedge: any) => boolean): void;

  /**
   * Traverse coedges without considering direction
   * @param coedge - Starting coedge
   * @param visitor - Callback function, return false to stop traversal
   */
  static traverseCoedge(coedge: any, visitor: (coedge: any) => boolean): void;

  /**
   * Merge multiple surfaces into a single surface
   * @param surfaces - Array of surfaces to merge
   * @returns Merged surface
   * @throws Error if surfaces array is empty
   */
  static mergeSurface(surfaces: Single[]): Single;

  /**
   * Calculate area of a wire or curve array on a surface
   * @param surface - Surface containing the curves
   * @param wireOrCurves - Wire or array of curves
   * @param usePositiveSign - Whether to use positive sign for area
   * @returns Calculated area
   */
  static getArea(surface: any, wireOrCurves: Wire | any[], usePositiveSign?: boolean): number;

  /**
   * Merge multiple faces on a surface using boolean union
   * @param faces - Array of faces to merge
   * @param surface - Surface containing the faces
   * @returns Array of merged face boundaries as 3D curve loops
   */
  static mergeFace(faces: any[], surface: any): any[][][];

  /**
   * Get all edges connected to an edge's vertices
   * @param edge - Edge to query
   * @returns Array of connected edges
   */
  static getEdgesByVertex(edge: any): any[];

  /**
   * Calculate discrete segment count for an arc based on tolerance
   * @param arc - Arc to discretize
   * @param tolerance - Maximum deviation tolerance
   * @returns Number of segments
   */
  static getDiscreteCount(arc: { getRange(): { min: number; max: number }; getRadius(): number }, tolerance: number): number;

  /**
   * Calculate overlap and remaining segments between two arcs
   * @param arc1 - First arc
   * @param arc2 - Second arc
   * @returns Overlap result with overlapping and remaining segments
   */
  static overlap(arc1: Arc2d, arc2: Arc2d): OverlapResult;

  /**
   * Get discrete points along an arc considering optional mapping arc
   * @param arc - Arc to discretize
   * @param tolerance - Maximum deviation tolerance
   * @param mappingArc - Optional arc for point mapping
   * @returns Array of discrete points
   */
  static getBetweenPoints(arc: Arc2d, tolerance: number, mappingArc?: Arc2d): Vector2[];

  /**
   * Discretize a 2D arc into line segments
   * @param arc - Arc to discretize
   * @param tolerance - Maximum deviation tolerance
   * @param referenceCurves - Optional array of reference curves for optimization
   * @returns Array of line segments approximating the arc
   */
  static discreteArc2d(arc: Arc2d, tolerance: number, referenceCurves?: any[]): Line2d[];

  /**
   * Discretize a polygon into line segments
   * @param polygon - Polygon to discretize
   * @param referenceCurves - Optional array of reference curves
   * @returns Discretization result with polygon, mappings, and metadata
   */
  static discretePolygon(polygon: Polygon, referenceCurves?: any[]): DiscretePolygonResult;

  /**
   * Fix shell face orientations to match surface directions
   * @param shells - Array of shells to fix
   */
  static shellFix(shells: Array<{ getFaces(): any[] }>): void;
}

/**
 * ID generator using hierarchical mapping structure
 */
declare class IDGenerate {
  /** Hierarchical map for ID generation */
  private map: Map<any, any>;
  
  /** Current ID counter */
  private _idcount: number;
  
  /** Stored surface data */
  private _data: any[][];

  constructor();

  /**
   * Get surface data for a given ID
   * @param id - ID to query
   * @returns Surface data array
   */
  getData(id: number): any[];

  /**
   * Apply or retrieve ID for a face array based on surface hierarchy
   * @param faces - Array of faces to process
   * @returns Assigned or existing ID
   */
  applyId(faces: Array<{ getSurface(): any }>): number;

  /**
   * Internal recursive method for ID assignment
   * @param faces - Array of faces
   * @param node - Current node in hierarchy
   * @param depth - Current recursion depth
   * @returns Assigned ID
   */
  private _add(faces: Array<{ getSurface(): any }>, node: any, depth?: number): number;
}

/**
 * Disjoint-set (Union-Find) data structure
 */
declare class Disjoint {
  /** Parent array for union-find */
  private set: number[];

  constructor();

  /**
   * Clear all sets
   */
  clear(): void;

  /**
   * Find the root of the set containing element
   * @param element - Element to find
   * @returns Root element ID
   */
  find(element: number): number;

  /**
   * Merge two sets
   * @param element1 - First element
   * @param element2 - Second element
   */
  merge(element1: number, element2: number): void;
}