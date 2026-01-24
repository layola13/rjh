/**
 * Clipper offset operations for polygon paths
 * Provides functions to offset paths and generate poly trees
 */

/**
 * Configuration options for offset operations
 */
interface OffsetOptions {
  /**
   * Inputs to be offset, each with its own join and end type
   */
  offsetInputs?: OffsetInput[];
  
  /**
   * The amount to offset (positive for expansion, negative for contraction)
   */
  delta: number;
  
  /**
   * Distance tolerance for removing near-collinear vertices (paths only)
   */
  cleanDistance?: number;
  
  /**
   * Maximum distance from true arc for arc approximation
   * @default 0.25
   */
  arcTolerance?: number;
  
  /**
   * Maximum ratio of miter join extension to offset delta
   * @default 2
   */
  miterLimit?: number;
}

/**
 * Input specification for a single offset operation
 */
interface OffsetInput {
  /**
   * Path data - either a single path or array of paths
   */
  data: Path | Path[];
  
  /**
   * Type of join between offset edges (miter, square, round)
   */
  joinType: JoinType;
  
  /**
   * Type of path end treatment (closed, open butt, open square, open round)
   */
  endType: EndType;
}

/**
 * Represents a 2D point or path segment
 */
type Path = Array<{ X: number; Y: number }>;

/**
 * Join types for offset operations
 */
enum JoinType {
  Square = 0,
  Round = 1,
  Miter = 2
}

/**
 * End types for open paths
 */
enum EndType {
  ClosedPolygon = 0,
  ClosedLine = 1,
  OpenButt = 2,
  OpenSquare = 3,
  OpenRound = 4
}

/**
 * Result tree structure for hierarchical polygon output
 */
interface PolyTree {
  childs: PolyNode[];
  contour: Path;
}

/**
 * Node in a polygon tree hierarchy
 */
interface PolyNode {
  childs: PolyNode[];
  contour: Path;
  parent: PolyNode | null;
  isHole: boolean;
}

/**
 * Offset paths and return result as flat array of paths
 * 
 * @param miterLimit - Maximum miter join extension ratio
 * @param options - Offset configuration options
 * @returns Array of offset paths, or undefined on error
 * @throws {ClipperError} If cleanDistance is used (reserved for path output)
 */
export function offsetToPaths(
  miterLimit: number,
  options: OffsetOptions
): Path[] | undefined;

/**
 * Offset paths and return result as hierarchical poly tree
 * Preserves parent-child relationships between polygons and holes
 * 
 * @param miterLimit - Maximum miter join extension ratio
 * @param options - Offset configuration options (cleanDistance not supported)
 * @returns Poly tree structure, or undefined on error
 * @throws {ClipperError} If cleanDistance is specified (not available for poly tree results)
 */
export function offsetToPolyTree(
  miterLimit: number,
  options: OffsetOptions
): PolyTree | undefined;