/**
 * Module: SweeperConnectHelper
 * 
 * Provides utility methods for finding and analyzing relationships between sweeper objects
 * (moldings, light slots, light bands) including overlap detection and connectivity analysis.
 */

import type { Logger } from './logger-types';

/**
 * Represents a 3D point in space
 */
export interface Point3D {
  equals(other: Point3D): boolean;
}

/**
 * Represents a 3D curve with geometric properties
 */
export interface Curve3D {
  clone(): Curve3D;
  getStartPt(): Point3D;
  getEndPt(): Point3D;
  getStartTangent(): Vector3D;
  getEndTangent(): Vector3D;
  reverse(): void;
}

/**
 * Represents a 3D vector with directional properties
 */
export interface Vector3D {
  normalize(): Vector3D;
  isSameDirection(other: Vector3D): boolean;
  clone(): Vector3D;
  cross(other: Vector3D): Vector3D;
  equals(other: Vector3D): boolean;
}

/**
 * Represents a vertex in the topology
 */
export interface Vertex {
  getPoint(): Point3D;
}

/**
 * Represents UV coordinates on a surface
 */
export interface UVCoordinate {
  u: number;
  v: number;
}

/**
 * Represents a parametric surface
 */
export interface Surface {
  getUVAt(point: Point3D): UVCoordinate;
}

/**
 * Represents a face in the topology
 */
export interface Face {
  getSurface(): Surface;
  getNormAt(uv: UVCoordinate): Vector3D;
}

/**
 * Represents an edge in the topology
 */
export interface Edge {
  tag: string;
  getStartVertex(): Vertex;
  getEndVertex(): Vertex;
  getCoedge3ds(): Coedge[];
}

/**
 * Represents a co-edge (half-edge) in the topology
 */
export interface Coedge {
  tag: string;
  getCurve(): Curve3D;
  getStartVertex(): Vertex;
  getEndVertex(): Vertex;
  getFace(): Face;
  getEdge(): Edge | undefined;
}

/**
 * Represents a path element with a tag identifier
 */
export interface PathElement {
  tag: string;
}

/**
 * Represents a sweeper object (molding, light slot, or light band)
 */
export interface Sweeper {
  /** Path elements defining the sweeper's trajectory */
  path: PathElement[];
  
  /** Get edges associated with this sweeper */
  getEdges(): Edge[];
  
  /** Get the 3D sweep path curves */
  getSweepPath3D(): Curve3D[];
}

/**
 * Result of finding related sweepers, categorized by relationship type
 */
export interface RelatedSweepersResult {
  /** Sweepers that are directly connected */
  connect: Sweeper[];
  
  /** Sweepers that overlap with the target */
  overlaped: Sweeper[];
  
  /** Sweepers that are disconnected */
  disconnected: Sweeper[];
}

/**
 * Helper class for analyzing connectivity and relationships between sweeper objects.
 * Implements singleton pattern.
 */
export declare class SweeperConnectHelper {
  private static _instance: SweeperConnectHelper | undefined;

  /**
   * Get the singleton instance of SweeperConnectHelper
   */
  static getInstance(): SweeperConnectHelper;

  /**
   * Find moldings related to the specified edge tag
   * 
   * @param edgeTag - Tag identifier of the target edge
   * @param faces - Array of faces to search within
   * @param moldings - Array of molding sweepers to analyze
   * @returns Categorized result of related moldings
   */
  findRelatedMoldings(
    edgeTag: string,
    faces: Face[],
    moldings: Sweeper[]
  ): RelatedSweepersResult;

  /**
   * Find light slots related to the specified edge tag
   * 
   * @param edgeTag - Tag identifier of the target edge
   * @param faces - Array of faces to search within
   * @param lightSlots - Array of light slot sweepers to analyze
   * @returns Categorized result of related light slots
   */
  findRelatedLightSlots(
    edgeTag: string,
    faces: Face[],
    lightSlots: Sweeper[]
  ): RelatedSweepersResult;

  /**
   * Find light bands related to the specified edge tag
   * 
   * @param edgeTag - Tag identifier of the target edge
   * @param faces - Array of faces to search within
   * @param lightBands - Array of light band sweepers to analyze
   * @returns Categorized result of related light bands
   */
  findRelatedLightBands(
    edgeTag: string,
    faces: Face[],
    lightBands: Sweeper[]
  ): RelatedSweepersResult;

  /**
   * Find sweepers related to the specified edge tag
   * 
   * @param edgeTag - Tag identifier of the target edge
   * @param faces - Array of faces to search within
   * @param sweepers - Array of sweepers to analyze
   * @returns Categorized result including connected, overlapped, and disconnected sweepers
   */
  findRelatedSweepers(
    edgeTag: string,
    faces: Face[],
    sweepers: Sweeper[]
  ): RelatedSweepersResult;

  /**
   * Find sweepers that overlap with the specified edge tag
   * 
   * @param edgeTag - Tag identifier of the target edge
   * @param sweepers - Array of sweepers to check for overlap
   * @returns Array of overlapping sweepers
   */
  findOverlapSweepers(edgeTag: string, sweepers: Sweeper[]): Sweeper[];

  /**
   * Find sweepers that are topologically connected to the specified edge
   * 
   * @param edgeTag - Tag identifier of the target edge
   * @param faces - Array of faces to search within
   * @param sweepers - Array of sweepers to analyze
   * @returns Array of connected sweepers
   */
  findSweepConnectedSweepers(
    edgeTag: string,
    faces: Face[],
    sweepers: Sweeper[]
  ): Sweeper[];

  /**
   * Determine if two co-edges form a continuous sweep path
   * based on tangent continuity and surface normal alignment
   * 
   * @param coedge1 - First co-edge
   * @param coedge2 - Second co-edge
   * @returns True if the co-edges form a continuous sweep
   */
  judgeContinousSweep(coedge1: Coedge, coedge2: Coedge): boolean;

  /**
   * Find co-edges connected to the specified co-edge
   * 
   * @param coedge - Target co-edge
   * @param faces - Array of faces to search within
   * @returns Array of connected co-edges
   */
  findConnectedCoedges(coedge: Coedge, faces: Face[]): Coedge[];

  /**
   * Find co-edges connected at a specific point
   * 
   * @param point - Target point
   * @param faces - Array of faces to search within
   * @returns Array of co-edges connected at the point
   */
  findConnectedCoedgesByPoint(point: Point3D, faces: Face[]): Coedge[];

  /**
   * Find a co-edge by its tag identifier
   * 
   * @param tag - Tag identifier to search for
   * @param faces - Array of faces to search within
   * @returns The co-edge if found, undefined otherwise
   */
  findCoedgeByTag(tag: string, faces: Face[]): Coedge | undefined;

  /**
   * Get the inverse co-edge (opposite direction on the same edge)
   * 
   * @param coedge - Target co-edge
   * @returns The inverse co-edge if it exists, undefined otherwise
   */
  getInversedCoedge(coedge: Coedge): Coedge | undefined;
}