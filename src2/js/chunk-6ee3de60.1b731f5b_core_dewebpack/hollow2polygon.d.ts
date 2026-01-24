/**
 * Edge interface representing a polygon edge
 */
interface IEdge {
  clone(): IEdge;
}

/**
 * Polygon type enumeration
 */
declare enum PolyType {
  hollow2 = "hollow2"
}

/**
 * Frametify result interface
 */
interface IFrametifyResult {
  // Specific structure depends on implementation
}

/**
 * CC Bar (Connection/Corner Bar) interface for frame connections
 */
interface ICCBar {
  /** Number of connections this bar has */
  connectCount: number;
  /** Number of docking points this bar has */
  dockCount: number;
}

/**
 * Serialized polygon data structure
 */
interface IPolygonJSON {
  /** Type of the polygon */
  type: PolyType;
  /** Additional polygon-specific properties */
  [key: string]: unknown;
}

/**
 * Base polygon class with 4 edges (Kfc4Polygon)
 */
declare abstract class Kfc4Polygon {
  /** Array of edges that make up this polygon */
  protected edges: IEdge[];

  /**
   * Returns indexes of edges that can have multiple connections
   * @returns Array of edge indexes that support multiple connections
   */
  readonly asMulEdgeIndexes: number[];

  /**
   * Serialize the polygon to JSON format
   * @returns JSON representation of the polygon
   */
  toJSON(): IPolygonJSON;

  /**
   * Initialize polygon properties and index mappings
   * Called during polygon construction
   */
  protected initPoly(): void;

  /**
   * Convert edge to multiple connection bar
   * @param bar - The CC bar to convert
   */
  protected toMulCCBar(bar: ICCBar): void;
}

/**
 * Hollow2Frametify class for converting Hollow2Polygon to frame structure
 */
declare class Hollow2Frametify {
  /**
   * Create a new Hollow2Frametify instance
   * @param polygon - The Hollow2Polygon to convert
   */
  constructor(polygon: Hollow2Polygon);

  /**
   * Execute the frametify conversion
   * @param param1 - First conversion parameter
   * @param param2 - Second conversion parameter
   * @returns The frametified result
   */
  run(param1: unknown, param2: unknown): IFrametifyResult;
}

/**
 * Hollow2Polygon - A specialized 4-edge polygon with a hollow center configuration
 * 
 * This polygon type represents a hollow rectangular structure with specific edge
 * connection patterns. Edge index 7 is configured to support multiple connections.
 * 
 * @extends Kfc4Polygon
 */
export declare class Hollow2Polygon extends Kfc4Polygon {
  /**
   * Internal mapping from edge indexes to their corresponding connection indexes
   * Maps: [0→0, 1→1, 2→2, 3→7, 4→4, 5→7, 6→2, 7→3, 8→4, 9→5, 10→6, 11→7]
   */
  protected imIdx: Map<number, number>;

  /**
   * Create a new Hollow2Polygon instance
   * @param edges - Optional array of edges to initialize the polygon with
   */
  constructor(edges?: IEdge[]);

  /**
   * Returns indexes of edges that can have multiple connections
   * For Hollow2Polygon, only edge 7 supports multiple connections
   * @returns Array containing [7]
   */
  readonly asMulEdgeIndexes: number[];

  /**
   * Serialize the polygon to JSON format
   * @returns JSON object with type set to PolyType.hollow2
   */
  toJSON(): IPolygonJSON;

  /**
   * Initialize the polygon's properties
   * Sets up the internal index mapping (imIdx) that defines edge connection patterns
   */
  protected initPoly(): void;

  /**
   * Convert this polygon to a frame structure
   * @param param1 - First frametify parameter
   * @param param2 - Second frametify parameter
   * @returns The frametified result
   */
  frametify(param1: unknown, param2: unknown): IFrametifyResult;

  /**
   * Fix frame connection/corner bars configuration
   * Specifically configures edge 7 as a multiple connection bar with 2 connections and 2 docking points
   * @param bars - Array of CC bars indexed by edge number
   */
  protected fixFrameCCBars(bars: ICCBar[]): void;

  /**
   * Create a new Hollow2Polygon instance with the given edges
   * Used internally for cloning operations
   * @param edges - Array of edges to wrap
   * @returns New Hollow2Polygon instance
   */
  protected wrapEdges(edges: IEdge[]): Hollow2Polygon;

  /**
   * Create a deep clone of this polygon
   * @returns New Hollow2Polygon instance with cloned edges
   */
  protected _clone(): Hollow2Polygon;
}