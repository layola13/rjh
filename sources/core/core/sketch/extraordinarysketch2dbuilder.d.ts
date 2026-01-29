import type { Vector2 } from './Vector2';
import type { Arc2d } from './Arc2d';
import type { Line2d } from './Line2d';
import type { ExtraordinaryPoint2d } from './ExtraordinaryPoint2d';
import type { ExtraordinaryLine2d } from './ExtraordinaryLine2d';
import type { ExtraordinaryCircle2d } from './ExtraordinaryCircle2d';
import type { ExtraordinaryCircleArc2d } from './ExtraordinaryCircleArc2d';
import type { ExtraordinaryEdge } from './ExtraordinaryEdge';
import type { ExtraordinaryCoedge } from './ExtraordinaryCoedge';
import type { ExtraordinaryWire } from './ExtraordinaryWire';
import type { ExtraordinaryFace2d } from './ExtraordinaryFace2d';
import type { ExtraordinarySketch2d } from './ExtraordinarySketch2d';

/**
 * Curve type for edge representation in the builder
 */
export type EdgeCurve = ExtraordinaryLine2d | ExtraordinaryCircleArc2d | ExtraordinaryCircle2d;

/**
 * Curve type for math operations
 */
export type MathCurve = Line2d | Arc2d;

/**
 * Edge information with curve and region data
 */
export interface PointInEdge {
  /** The curve geometry */
  curve: EdgeCurve | MathCurve;
  /** Associated region topology */
  lregion?: unknown;
  /** Topology identifier */
  id: string;
  /** Associated curve identifiers */
  curveIds?: string[];
}

/**
 * Builder region structure
 */
export interface BuilderRegion {
  /** Outer boundary edges */
  outer: ReadonlyArray<{ curve: EdgeCurve; topo: string }>;
  /** Inner hole edges */
  holes: ReadonlyArray<ReadonlyArray<{ curve: EdgeCurve; topo: string }>>;
  /** Topology identifier */
  topo: string;
}

/**
 * Topology information for a region
 */
export interface RegionTopoInfo {
  /** Associated face */
  face: ExtraordinaryFace2d | undefined;
  /** Topology name */
  topoName: string;
}

/**
 * Face generation data structure
 */
export interface FaceGenerationData {
  /** Outer loop wire */
  outer: ExtraordinaryWire;
  /** Inner loop wires (holes) */
  holes: ExtraordinaryWire[];
  /** Associated region */
  region: ProcessedRegion;
}

/**
 * Processed region from boolean operations
 */
export interface ProcessedRegion {
  /** Outer boundary coedges */
  outer: ExtraordinaryCoedge[];
  /** Hole coedges */
  holes: ExtraordinaryCoedge[][];
  /** Old topology identifiers */
  oldId?: string[];
  /** Topology identifier */
  topo?: string;
}

/**
 * Result of topology graph update
 */
export interface TopoGraphUpdateResult {
  /** List of processed regions */
  list: ProcessedRegion[];
  /** Mapping from old faces to new regions */
  oldFace2Regions: Map<ExtraordinaryFace2d, ProcessedRegion[]>;
  /** Mapping from regions to topology info */
  regionTopoInfoMp: Map<ProcessedRegion, RegionTopoInfo[]>;
  /** Set of point coedges */
  ptCoedgeSet: Set<ExtraordinaryCoedge>;
}

/**
 * Pre-build data structure
 */
export interface PreBuildData {
  /** Point-in-edge data for boolean operations */
  ptInEdges: PointInEdge[];
  /** Encoded point map for deduplication */
  encodedPointMp: Map<string, ExtraordinaryPoint2d>;
  /** Old face map by ID */
  oldfaceMap: Map<string, ExtraordinaryFace2d>;
}

/**
 * Result of edge generation
 */
export interface EdgeGenerationResult {
  /** Mapping from old edges to new edges */
  newEdgeMp: Map<unknown, ExtraordinaryEdge>;
  /** Mapping from old coedges to new coedges */
  newCoedgeMp: Map<ExtraordinaryCoedge, ExtraordinaryCoedge>;
}

/**
 * Boolean operation options
 */
export interface BooleanOperationOptions {
  /** Clean operation flag */
  clean: number;
  /** Scale fix flag */
  scaleFix: number;
}

/**
 * Boolean operation result
 */
export interface BooleanOperationResult {
  /** List of processed regions */
  list: ProcessedRegion[];
}

/**
 * Polygon tool for boolean operations
 */
export interface PolygonTool {
  /**
   * Execute boolean operations on edges
   * @param edges - Input edges
   * @param tolerance - Geometric tolerance
   * @param options - Operation options
   * @returns Boolean operation result
   */
  exbool(
    edges: PointInEdge[],
    tolerance: number,
    options: BooleanOperationOptions
  ): BooleanOperationResult;
}

/**
 * Sketchable interface for objects that support 2D sketching
 */
export interface ISketchable {
  /**
   * Get the current sketch data
   * @returns Current sketch or undefined
   */
  getSketch(): ExtraordinarySketch2d | undefined;

  /**
   * Update the sketch with new data
   * @param sketch - New sketch data
   */
  updateSketch(sketch: ExtraordinarySketch2d): void;
}

/**
 * Guideline representation in sketch
 */
export interface Guideline {
  // Guideline properties (extend as needed)
}

/**
 * Builder for constructing and modifying 2D sketches with topological operations
 * Supports face merging, edge splitting, and region management
 */
export declare class ExtraordinarySketch2dBuilder {
  /** The sketchable object being built */
  private readonly sketchable: ISketchable;

  /** Geometric tolerance for operations */
  private readonly tol: number;

  /** Cached sketch data */
  private _sketch2d: ExtraordinarySketch2d | undefined;

  /**
   * Converts a builder region to point-in-edge data structure
   * @param region - The builder region to convert
   * @returns Array of point-in-edge data
   */
  private readonly exBuilderRegion2PtInEdges: (region: BuilderRegion) => PointInEdge[];

  /**
   * Creates a new sketch builder for the given sketchable object
   * @param sketchable - The object to build sketches for
   */
  constructor(sketchable: ISketchable);

  /**
   * Get the current cached sketch data
   * @returns Current sketch or undefined
   */
  getSketch(): ExtraordinarySketch2d | undefined;

  /**
   * Update the internal sketch cache
   * @param sketch - Optional new sketch data to apply first
   */
  updateSketch2d(sketch?: ExtraordinarySketch2d): void;

  /**
   * Get all points from the sketch edges
   * @returns Array of unique points
   */
  getAllPoints(): ExtraordinaryPoint2d[];

  /**
   * Get all builder regions from the sketch faces
   * @param edgeFilter - Optional edge filter
   * @returns Array of builder regions
   */
  getAllBuilderRegions(edgeFilter?: unknown): BuilderRegion[];

  /**
   * Find the face containing the given coedge
   * @param coedge - The coedge to search for
   * @returns The containing face or undefined
   */
  findFaceByCoedge(coedge: ExtraordinaryCoedge): ExtraordinaryFace2d | undefined;

  /**
   * Change the background of the sketch
   * @param background - New background data
   */
  changeBackground(background: unknown): void;

  /**
   * Add a split point to an edge, dividing it into two edges
   * @param point - The point to split at
   * @param edge - The edge to split
   */
  addSplitPoint(point: ExtraordinaryPoint2d, edge: ExtraordinaryEdge): void;

  /**
   * Clear all faces from the sketch
   */
  clear(): void;

  /**
   * Add paths to the sketch
   * @param paths - Array of paths to add
   */
  addPaths(paths: unknown[]): void;

  /**
   * Add regions to the sketch
   * @param regions - Array of regions to add
   */
  addRegions(regions: BuilderRegion[]): void;

  /**
   * Merge multiple faces into single faces
   * @param faces - Array of faces to merge
   */
  mergeFaces(faces: ExtraordinaryFace2d[]): void;

  /**
   * Remove edges from the sketch
   * @param edges - Array of edges to remove
   */
  removeEdges(edges: ExtraordinaryEdge[]): void;

  /**
   * Remove a single face from the sketch
   * @param face - The face to remove
   */
  removeFace(face: ExtraordinaryFace2d): void;

  /**
   * Remove multiple faces from the sketch
   * @param faces - Array of faces to remove
   */
  removeFaces(faces: ExtraordinaryFace2d[]): void;

  /**
   * Add guidelines to the sketch
   * @param guidelines - Array of guidelines to add
   */
  addGuideLines(guidelines: Guideline[]): void;

  /**
   * Remove guidelines from the sketch
   * @param guidelines - Array of guidelines to remove
   */
  removeGuideLines(guidelines: Guideline[]): void;

  /**
   * Update the sketch with new regions, paths, or edge removals
   * @param regions - Optional regions to add
   * @param paths - Optional paths to add
   * @param edgesToRemove - Optional edges to remove
   */
  update(regions?: BuilderRegion[], paths?: unknown[], edgesToRemove?: ExtraordinaryEdge[]): void;

  /**
   * Update appendix data (implementation placeholder)
   * @param appendix - Appendix data
   */
  updateAppendix(appendix: unknown): void;

  /**
   * Pre-build data preparation step
   * @param regions - Optional regions to add
   * @param paths - Optional paths to add
   * @param edgesToRemove - Optional edges to remove
   * @returns Pre-build data structure
   */
  private _preBuild(
    regions?: BuilderRegion[],
    paths?: unknown[],
    edgesToRemove?: ExtraordinaryEdge[]
  ): PreBuildData;

  /**
   * Get pre-build face regions, optionally filtering edges
   * @param edgeFilter - Optional edge filter
   * @returns Array of builder regions
   */
  private _getPreBuildFaceRegions(edgeFilter?: unknown): BuilderRegion[];

  /**
   * Update the topological graph with boolean operations
   * @param preBuildData - Pre-build data
   * @returns Topology graph update result
   */
  private _updateTopoGraph(preBuildData: PreBuildData): TopoGraphUpdateResult;

  /**
   * Update the canvas with new faces
   * @param preBuildData - Pre-build data
   * @param topoResult - Topology graph update result
   */
  private _updateCanvas(preBuildData: PreBuildData, topoResult: TopoGraphUpdateResult): void;

  /**
   * Generate new faces from regions
   * @param preBuildData - Pre-build data
   * @param topoResult - Topology graph update result
   * @param coedgeMap - Coedge mapping
   * @returns Array of generated faces
   */
  private _generateFaces(
    preBuildData: PreBuildData,
    topoResult: TopoGraphUpdateResult,
    coedgeMap: Map<ExtraordinaryCoedge, ExtraordinaryCoedge>
  ): ExtraordinaryFace2d[];

  /**
   * Generate new edges from coedges
   * @param coedgeSet - Set of coedges to process
   * @param preBuildData - Pre-build data
   * @returns Edge generation result
   */
  private _generateNewEdges(
    coedgeSet: Set<ExtraordinaryCoedge>,
    preBuildData: PreBuildData
  ): EdgeGenerationResult;

  /**
   * Create a new edge from an existing edge
   * @param edge - The source edge
   * @param preBuildData - Pre-build data
   * @returns New edge instance
   */
  private _createNewEdge(edge: unknown, preBuildData: PreBuildData): ExtraordinaryEdge;

  /**
   * Generate topology name for an edge
   * @param edge - The edge to generate name for
   * @returns Array of topology names
   */
  private _generateEdgeTopoName(edge: unknown): string[];

  /**
   * Generate topology name for a face
   * @param region - The region to generate name for
   * @returns Array of topology names
   */
  private _generateFaceTopoName(region: ProcessedRegion): string[];

  /**
   * Get the polygon tool instance for boolean operations
   * @returns Polygon tool instance
   */
  static PolygonTool(): PolygonTool;
}