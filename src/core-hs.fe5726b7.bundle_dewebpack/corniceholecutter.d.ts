/**
 * Type definitions for CorniceHoleCutter module
 * Handles cornice hole cutting and topology path generation for ceiling/cornice modeling
 */

import type { Arc3d, Curve3d, Curve2d, Loop, Matrix3, Matrix4, Point3d } from 'geom3d';
import type { BaseTopoPather } from 'topology';
import type { NCustomizedCeilingModel } from 'ceiling-model';
import type { NCustomizedParametricCeiling } from 'parametric-ceiling';
import type { Face, RoomInfo, SurfaceObject } from 'geometry-types';

/**
 * Configuration for cornice cutting operations
 */
export interface CorniceCutterInfo {
  /** 3D curves defining the cutting path */
  cutPath: Curve3d[];
  /** Optional replacement sweep curves for modified geometry */
  replaceSweepCurves?: Curve3d;
}

/**
 * Internal edge representation for polygon boolean operations
 */
interface PtInEdge {
  /** 2D curve in surface parameter space */
  curve: Curve2d;
  /** Identifier for tracking edge origin (e.g., "base", "{id}_{index}") */
  id: string;
  /** Optional region identifier for hole cutting */
  lregion?: string;
}

/**
 * Parameter range for curve splitting operations
 */
interface SplitRange {
  /** Start parameter value [0, 1] */
  from: number;
  /** End parameter value [0, 1] */
  to: number;
}

/**
 * Result of base edge extraction after boolean operations
 */
interface ExtractedBaseEdge {
  /** Parent face containing this edge */
  hostFace: Face;
  /** Numerical index for sorting/grouping */
  index: number;
  /** Topology identifier string */
  toponame: string;
  /** Whether this is an auxiliary edge */
  isAux: boolean;
  /** 3D curve representation */
  curve3d: Curve3d;
  /** Vertical offset from base height */
  offset: number;
  /** 2D curve in surface space */
  curve2d: Curve2d;
  /** Maximum allowed Z-offset for this edge */
  offsetZLimit: number;
}

/**
 * Replacement range specification for curve substitution
 */
interface ReplacementRange {
  /** Start parameter on base curve */
  from: number;
  /** End parameter on base curve */
  to: number;
  /** Curve to insert in this range */
  replaceCurve: Curve3d;
}

/**
 * Polygon boolean operation result structure
 */
interface PolygonBoolResult {
  /** List of resulting polygon regions */
  list: Array<{
    /** Outer boundary edges */
    outer: Array<{
      /** Edge identifier(s) tracking lineage */
      oldId?: string[];
      /** Edge geometry data */
      edge: any;
    }>;
    /** Region identifier(s) */
    oldId?: string[];
  }>;
  /** Root polygon with hole information */
  root: {
    /** Hole boundary edges */
    holes: Array<Array<{
      /** Edge identifier(s) */
      oldId?: string[];
      /** Edge geometry data */
      edge: any;
    }>>;
  };
}

/**
 * Options for polygon boolean operations
 */
interface PolygonBoolOptions {
  /** Enable/disable topology cleanup (0 = disabled) */
  clean?: number;
  /** Enable/disable coordinate scaling fix (0 = disabled) */
  scaleFix?: number;
}

/**
 * Polygon tool service interface
 */
interface PolygonToolService {
  /**
   * Execute boolean operations on 2D edge loops
   * @param edges - Input edges with ID tracking
   * @param tolerance - Geometric tolerance for coincidence
   * @param options - Boolean operation configuration
   * @returns Resulting polygon structure with edge provenance
   */
  exbool(
    edges: PtInEdge[],
    tolerance: number,
    options: PolygonBoolOptions
  ): PolygonBoolResult;
}

/**
 * Represents a hole cutting operation for cornice modeling.
 * Encapsulates cutting geometry and offset parameters for openings, beams, or other content.
 */
export class CorniceHoleCutter {
  /**
   * Unique identifier for the cutting element (e.g., opening ID, beam ID)
   */
  readonly id: string;

  /**
   * 3D curves defining the hole boundary in world space
   */
  readonly cutPath: Curve3d[];

  /**
   * Optional replacement curves for modifying the sweep path instead of cutting
   */
  readonly replaceSweepCurves?: Curve3d;

  /**
   * Vertical offset from the top of the parent element (e.g., wall height - opening top)
   */
  readonly offsetTop: number;

  /**
   * @param id - Unique identifier for this cutter
   * @param cutPath - Array of 3D curves forming the cutting boundary
   * @param replaceSweepCurves - Optional curves to replace portions of the sweep path
   * @param offsetTop - Distance from parent top surface
   */
  constructor(
    id: string,
    cutPath: Curve3d[],
    replaceSweepCurves: Curve3d | undefined,
    offsetTop: number
  );

  /**
   * Retrieves cutting configuration for a specific face
   * @param face - Target face to cut
   * @returns Cutting path and optional replacement curves
   */
  getCorniceCutterInfo(face: Face): CorniceCutterInfo;
}

/**
 * Generates topology paths for cornice sweep operations.
 * Extends BaseTopoPather to handle ceiling-specific cutting and splitting logic.
 */
export class CorniceTopoPather extends BaseTopoPather {
  /**
   * Numeric index for sorting and grouping paths
   */
  readonly index: number;

  /**
   * Indicates if this is an auxiliary path (e.g., for hidden geometry)
   */
  readonly isAux: boolean;

  /**
   * The 3D curve defining this path segment
   */
  readonly curve: Curve3d;

  /**
   * @param index - Path index for sorting
   * @param isAux - Auxiliary path flag
   * @param from - Start parameter [0, 1] on the curve
   * @param to - End parameter [0, 1] on the curve
   * @param curve - 3D curve geometry
   */
  constructor(
    index: number,
    isAux: boolean,
    from: number,
    to: number,
    curve: Curve3d
  );

  /**
   * Calculates base sweep paths for a face, accounting for all cutting elements.
   * Main entry point for cornice path generation.
   * 
   * @param face - Face to generate sweep paths for
   * @returns Array of extracted base edge configurations, or empty if face has no valid ceiling curve
   */
  static calcBaseSweepPath(face: Face): ExtractedBaseEdge[];

  /**
   * Cuts a base ceiling curve with multiple cutting candidates using boolean operations.
   * 
   * @param baseCurve - The ceiling perimeter curve to cut
   * @param cutters - Map of cutters (openings, beams, etc.) to apply
   * @param face - Host face for coordinate transformation
   * @returns Sorted array of split edge segments with metadata
   */
  static cutBaseSweepPath(
    baseCurve: Curve3d,
    cutters: Map<string, CorniceHoleCutter>,
    face: Face
  ): ExtractedBaseEdge[];

  /**
   * Extracts the horizontal ceiling perimeter curve from a face's wire edges.
   * Finds the edge at the parent's height that is horizontal (z-constant).
   * 
   * @param face - Face to analyze
   * @returns Ceiling curve, or undefined if not found. Arc curves are oriented with normal check.
   */
  static calcFaceCeilingCurve(face: Face): Curve3d | undefined;

  /**
   * Collects all cutting elements affecting the given face.
   * Searches openings, parametric openings, content, beams, and ceiling models.
   * 
   * @param face - Face to analyze
   * @returns Map of cutter ID to CorniceHoleCutter instance
   */
  static extractCuttingCandidates(face: Face): Map<string, CorniceHoleCutter>;

  /**
   * Extracts cutting candidates from sketch-based customized ceiling models.
   * Processes ceiling BRep faces that are coplanar with the target face.
   * 
   * @param face - Target face
   * @param cuttersMap - Map to populate with found cutters (mutated)
   */
  static extractCuttingCandidatesFromSketchCeiling(
    face: Face,
    cuttersMap: Map<string, CorniceHoleCutter>
  ): void;

  /**
   * Extracts cutting candidates from parametric ceiling models.
   * Similar to sketch ceiling extraction but for parametric geometry.
   * 
   * @param face - Target face
   * @param cuttersMap - Map to populate with found cutters (mutated)
   */
  static extractCuttingCandidatesFromParametricCeiling(
    face: Face,
    cuttersMap: Map<string, CorniceHoleCutter>
  ): void;

  /**
   * Converts 3D cutting geometry to 2D edges for polygon boolean operations.
   * Handles curve replacement and projects cutters onto surface parameter space.
   * 
   * @param baseCurve - Base ceiling curve
   * @param cuttersMap - Map of cutters to process
   * @param face - Host face for 3D→2D projection
   * @returns Array of 2D edges with ID tracking for boolean ops
   */
  static extractPtInEdges(
    baseCurve: Curve3d,
    cuttersMap: Map<string, CorniceHoleCutter>,
    face: Face
  ): PtInEdge[];

  /**
   * Processes polygon boolean results to extract sorted base edge segments.
   * Reconstructs 3D curves, calculates offsets, and assigns topology names.
   * 
   * @param boolResult - Result from polygon boolean operation
   * @param baseCurve - Original 3D ceiling curve for parameter mapping
   * @param face - Host face
   * @param cuttersMap - Map of cutters for offset calculation
   * @returns Sorted array of base edges with complete metadata
   */
  static extractSortedSplittedBaseEdges(
    boolResult: PolygonBoolResult,
    baseCurve: Curve3d,
    face: Face,
    cuttersMap: Map<string, CorniceHoleCutter>
  ): ExtractedBaseEdge[];

  /**
   * Calculates maximum allowed Z-offset for a topology path.
   * Uses cutter offset constraints and parent element height limits.
   * 
   * @param toponame - Topology identifier (e.g., "123_456")
   * @param face - Host face
   * @returns Maximum offset in current units (default 10 if unconstrained)
   */
  static offsetZLimit(toponame: string, face: Face): number;

  /**
   * Retrieves the full curve without parameter trimming.
   * @returns Cloned untrimmed curve
   */
  getSweepPathWithoutCutting(): Curve3d;

  /**
   * Retrieves the active sweep path trimmed by this pather's [from, to] range.
   * @returns Trimmed curve, or undefined if range is invalid (from >= to)
   */
  getSweepPath(): Curve3d | undefined;

  /**
   * Splits this pather into multiple segments at given 3D points.
   * Useful for further subdivision by intersections.
   * 
   * @param points - Array of 3D points to split at
   * @returns Array of new CorniceTopoPather instances for each segment
   */
  splitByPoints(points: Point3d[]): CorniceTopoPather[];

  /**
   * Serializes this pather to a plain object for storage/transmission.
   * @returns Serialized representation with curve dump
   */
  dump(): {
    index: number;
    isAux: boolean;
    from: number;
    to: number;
    curve: any; // Curve dump format
  };

  /**
   * Creates a deep copy of this pather.
   * @returns New instance with identical parameters
   */
  clone(): CorniceTopoPather;

  /**
   * Accesses the polygon tool service for boolean operations.
   * @returns Polygon tool instance from service manager
   */
  static PolygonTool(): PolygonToolService;
}