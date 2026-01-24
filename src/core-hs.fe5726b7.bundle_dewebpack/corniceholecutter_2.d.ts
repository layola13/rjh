/**
 * Module: CorniceHoleCutter
 * 
 * This module provides functionality for cutting holes in cornice models and generating
 * topological paths for cornice sweeps. It handles beam holes, opening holes, and custom
 * ceiling interactions.
 */

import { Arc3d, Matrix4, MathAlg } from './geometry-lib';
import { FaceHoleType } from './face-hole-types';
import { ServiceManager } from './service-manager';
import { BaseTopoPather } from './base-topo-pather';
import { NCustomizedCeilingModel } from './customized-ceiling-model';
import { NCustomizedParametricCeiling } from './customized-parametric-ceiling';

/**
 * Represents information required to cut a hole in a cornice
 */
export interface CorniceCutterInfo {
  /** Path curves that define the cutting boundary */
  cutPath: Curve3d[];
  /** Optional replacement curves for the sweep path */
  replaceSweepCurves?: Curve3d;
}

/**
 * Represents a face with holes and geometric properties
 */
export interface Face {
  /** Unique identifier */
  id: string;
  /** Parent model reference */
  parent: Model;
  /** Raw path data */
  rawPath: {
    outer: any[];
  };
  /** Wire path data */
  wirePath: {
    outer: Curve3d[];
  };
  /** Surface object containing geometric data */
  surfaceObj: {
    surface: Surface;
    getNormal(point: Point3d): Vector3d;
    getCurve2ds(curves: Curve3d[]): Curve2d[];
    getCurve3ds(curves: Curve2d[]): Curve3d[];
  };
  /** Hole definitions */
  holes: FaceHole[];
  /** Associated room information */
  roomInfos: RoomInfo[];
}

/**
 * Represents a hole in a face
 */
export interface FaceHole {
  /** Hole identifier */
  id?: string;
  /** Type of hole (BeamHole, OpeningHole, etc.) */
  type?: FaceHoleType;
  /** Outer boundary curves */
  outer: Curve3d[];
}

/**
 * Represents a 3D model with hierarchy
 */
export interface Model {
  /** Model height */
  height: number;
  /** Child models */
  children: Record<string, Model>;
}

/**
 * Represents room information with floor data
 */
export interface RoomInfo {
  /** Floor references */
  floors: Floor[];
}

/**
 * Represents a floor entity
 */
export interface Floor {
  id: string;
}

/**
 * Represents a 3D point
 */
export interface Point3d {
  x: number;
  y: number;
  z: number;
}

/**
 * Represents a 3D vector
 */
export interface Vector3d {
  x: number;
  y: number;
  z: number;
  dot(other: Vector3d): number;
  isParallel(other: Vector3d): boolean;
  isSameDirection(other: Vector3d): boolean;
}

/**
 * Represents a 3D curve
 */
export interface Curve3d {
  getLength(): number;
  getStartPt(): Point3d;
  getEndPt(): Point3d;
  getMidPt(): Point3d;
  getCenter(): Point3d;
  getStartParam(): number;
  getEndParam(): number;
  getRange(): Range;
  getParamAt(point: Point3d): number;
  getTangentAt(param: number): Vector3d;
  clone(): Curve3d;
  setRange(from: number, to: number): Curve3d;
  reverse(): void;
  transform(matrix: Matrix4): void;
  transformed(matrix: Matrix4): Curve3d;
}

/**
 * Represents a 2D curve
 */
export interface Curve2d {
  getParamAt(point: Point3d): number;
  getTangentAt(param: number): Vector3d;
  getMidPt(): Point3d;
  reverse(): void;
}

/**
 * Represents a geometric surface
 */
export interface Surface {
  getType(): string;
  containsPoint(point: Point3d): boolean;
  getNormAt(point: Point3d): Vector3d;
  transformed(matrix: Matrix4): Surface;
}

/**
 * Represents a parameter range
 */
export interface Range {
  containsPoint(param: number): boolean;
  getLength(): number;
}

/**
 * Represents overlap calculation result
 */
export interface OverlapResult {
  range2: Range;
}

/**
 * Polygon boolean operation result
 */
export interface PolygonBoolResult {
  root: {
    holes: PolygonEdge[][];
  };
  list: Array<{
    outer: PolygonEdge[];
  }>;
}

/**
 * Represents a polygon edge with metadata
 */
export interface PolygonEdge {
  edge: EdgeData;
  oldId?: string | string[];
  curve: Curve2d;
  from: { point: Point3d };
  to: { point: Point3d };
}

/**
 * Edge data structure
 */
export interface EdgeData {
  curve: Curve2d;
  from: { point: Point3d };
  to: { point: Point3d };
  oldId: string | string[];
}

/**
 * Represents a curve segment with ID
 */
export interface CurveSegment {
  curve: Curve2d;
  id: string;
  lregion?: number;
}

/**
 * Represents replacement range for curve segments
 */
export interface ReplacementRange {
  from: number;
  to: number;
  replaceCurve: Curve3d;
}

/**
 * Represents a base edge with host face information
 */
export interface BaseEdge {
  hostFace: Face;
  index: number;
  isAux: boolean;
  curve3d: Curve3d;
  offset: number;
  curve2d: Curve2d;
}

/**
 * Serialized path data
 */
export interface PathDump {
  hostFaceId: string;
  index: string;
  isAux: boolean;
  from: number;
  to: number;
}

/**
 * Split parameter range
 */
export interface SplitParam {
  from: number;
  to: number;
}

/**
 * CorniceHoleCutter
 * 
 * Manages hole cutting operations for cornice models. Stores cutting path information
 * and replacement sweep curves for creating openings in architectural cornices.
 */
export declare class CorniceHoleCutter {
  /** Unique identifier for the cutter */
  readonly id: string;
  
  /** Path curves defining the cut boundary */
  readonly cutPath: Curve3d[];
  
  /** Optional replacement curves for the sweep path */
  readonly replaceSweepCurves?: Curve3d;
  
  /** Offset distance from the top (default: 10) */
  readonly offsetTop: number;

  /**
   * Creates a new CorniceHoleCutter instance
   * @param id - Unique identifier
   * @param cutPath - Array of 3D curves defining the cutting path
   * @param replaceSweepCurves - Optional replacement curves for sweep operations
   */
  constructor(id: string, cutPath: Curve3d[], replaceSweepCurves?: Curve3d);

  /**
   * Retrieves cutting information for a given face
   * @param face - The face to get cutting info for
   * @returns Object containing cut path and replacement sweep curves
   */
  getCorniceCutterInfo(face: Face): CorniceCutterInfo;
}

/**
 * CorniceTopoPatherV120
 * 
 * Advanced topological path generator for cornice models. Handles complex operations
 * including ceiling curve calculation, hole cutting, and path splitting based on
 * beam holes, opening holes, and custom ceiling interactions.
 * 
 * @extends BaseTopoPather
 */
export declare class CorniceTopoPatherV120 extends BaseTopoPather {
  /** The host face containing this path */
  readonly hostFace: Face;
  
  /** Index identifier for this path segment */
  readonly index: number;
  
  /** Whether this is an auxiliary path */
  readonly isAux: boolean;

  /**
   * Creates a new CorniceTopoPatherV120 instance
   * @param hostFace - The face containing this path
   * @param index - Path segment index
   * @param isAux - Flag indicating auxiliary path
   * @param from - Start parameter (0-1 normalized)
   * @param to - End parameter (0-1 normalized)
   */
  constructor(
    hostFace: Face,
    index: number,
    isAux: boolean,
    from: number,
    to: number
  );

  /**
   * Calculates the base sweep path for a face, including all cuts and modifications
   * @param face - The face to calculate paths for
   * @returns Array of base edges with metadata
   */
  static calcBaseSweepPath(face: Face): BaseEdge[];

  /**
   * Applies cutting operations to a base sweep path
   * @param baseCurve - The base curve to cut
   * @param cutters - Array of hole cutters to apply
   * @param face - The host face
   * @returns Array of resulting base edges after cutting
   */
  static cutBaseSweepPath(
    baseCurve: Curve3d,
    cutters: CorniceHoleCutter[],
    face: Face
  ): BaseEdge[];

  /**
   * Extracts the ceiling curve from a face at the specified height
   * @param face - The face to extract from
   * @returns The ceiling curve, or undefined if not found
   */
  static calcFaceCeilingCurve(face: Face): Curve3d | undefined;

  /**
   * Extracts all hole cutters that should affect this face
   * Includes beam holes, opening holes, and custom ceiling cutters
   * @param face - The face to extract cutters for
   * @returns Array of applicable hole cutters
   */
  static extractCuttingCandidates(face: Face): CorniceHoleCutter[];

  /**
   * Processes cutting candidates and replacement curves into 2D curve segments
   * @param baseCurve - The base 3D curve
   * @param cutters - Array of hole cutters
   * @param face - The host face
   * @returns Array of 2D curve segments with IDs
   */
  static extractPtInEdges(
    baseCurve: Curve3d,
    cutters: CorniceHoleCutter[],
    face: Face
  ): CurveSegment[];

  /**
   * Extracts and sorts base edges from polygon boolean operation results
   * @param boolResult - Result from polygon boolean operation
   * @param baseCurve - Original base curve for reference
   * @param face - The host face
   * @returns Sorted array of base edges
   */
  static extractSortedSplittedBaseEdges(
    boolResult: PolygonBoolResult,
    baseCurve: Curve3d,
    face: Face
  ): BaseEdge[];

  /**
   * Gets the complete sweep path without any range cutting applied
   * @returns The full sweep curve, or undefined if not found
   */
  getSweepPathWithoutCutting(): Curve3d | undefined;

  /**
   * Gets the sweep path with the current from/to range applied
   * @returns The trimmed sweep curve, or undefined if invalid
   */
  getSweepPath(): Curve3d | undefined;

  /**
   * Splits this pather into multiple segments at specified points
   * @param points - Array of 3D points to split at
   * @returns Array of new pather instances for each segment
   */
  splitByPoints(points: Point3d[]): CorniceTopoPatherV120[];

  /**
   * Serializes this pather to a plain object
   * @returns Serialized path data
   */
  dump(): PathDump;

  /**
   * Creates a deep copy of this pather
   * @returns Cloned pather instance
   */
  clone(): CorniceTopoPatherV120;

  /**
   * Gets the polygon tool instance for boolean operations
   * @returns Polygon tool instance
   */
  static PolygonTool(): any;
}