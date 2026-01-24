/**
 * ClipperLib - Polygon clipping and offsetting library
 * TypeScript Type Definitions
 */

declare namespace ClipperLib {
  // ==================== Configuration ====================
  
  /**
   * Library configuration options
   */
  interface Config {
    /** Enable line support */
    use_lines: boolean;
    /** Enable Z-coordinate support */
    use_xyz: boolean;
  }

  // ==================== Basic Types ====================

  /**
   * Represents a path as an array of points
   */
  type Path = IntPoint[];

  /**
   * Represents multiple paths
   */
  type Paths = Path[];

  // ==================== Point Types ====================

  /**
   * Double precision floating point coordinate
   */
  class DoublePoint {
    X: number;
    Y: number;
    
    constructor();
    constructor(point: DoublePoint);
    constructor(x: number, y: number);
  }

  /**
   * Integer coordinate point (primary point type for clipper operations)
   */
  class IntPoint {
    X: number;
    Y: number;
    Z?: number; // Only available when use_xyz is enabled
    
    constructor();
    constructor(point: IntPoint | DoublePoint);
    constructor(x: number, y: number);
    constructor(x: number, y: number, z: number);
    
    /** Check if two points are equal */
    static op_Equality(a: IntPoint, b: IntPoint): boolean;
    
    /** Check if two points are not equal */
    static op_Inequality(a: IntPoint, b: IntPoint): boolean;
  }

  /**
   * Integer rectangle bounds
   */
  class IntRect {
    left: number;
    top: number;
    right: number;
    bottom: number;
    
    constructor();
    constructor(rect: IntRect);
    constructor(left: number, top: number, right: number, bottom: number);
  }

  // ==================== Enumerations ====================

  /**
   * Clipping operation types
   */
  enum ClipType {
    /** Intersection of subject and clip polygons */
    ctIntersection = 0,
    /** Union of subject and clip polygons */
    ctUnion = 1,
    /** Difference (subject minus clip) */
    ctDifference = 2,
    /** Exclusive OR */
    ctXor = 3
  }

  /**
   * Polygon types for clipping operations
   */
  enum PolyType {
    /** Subject polygon */
    ptSubject = 0,
    /** Clip polygon */
    ptClip = 1
  }

  /**
   * Polygon fill rules
   */
  enum PolyFillType {
    /** Even-Odd fill rule */
    pftEvenOdd = 0,
    /** Non-Zero winding fill rule */
    pftNonZero = 1,
    /** Positive winding fill rule */
    pftPositive = 2,
    /** Negative winding fill rule */
    pftNegative = 3
  }

  /**
   * Join types for offsetting
   */
  enum JoinType {
    /** Square corners */
    jtSquare = 0,
    /** Rounded corners */
    jtRound = 1,
    /** Mitered corners */
    jtMiter = 2
  }

  /**
   * End types for open paths in offsetting
   */
  enum EndType {
    /** Square end caps for open paths */
    etOpenSquare = 0,
    /** Round end caps for open paths */
    etOpenRound = 1,
    /** Butt end caps (no extension) */
    etOpenButt = 2,
    /** Closed line */
    etClosedLine = 3,
    /** Closed polygon */
    etClosedPolygon = 4
  }

  // ==================== Polygon Tree Structure ====================

  /**
   * Represents a node in the polygon tree hierarchy
   */
  class PolyNode {
    /** Parent node (null for root) */
    readonly m_Parent: PolyNode | null;
    
    /** Polygon contour points */
    readonly m_polygon: Path;
    
    /** Index in parent's children array */
    readonly m_Index: number;
    
    /** Join type used */
    readonly m_jointype: number;
    
    /** End type used */
    readonly m_endtype: number;
    
    /** Child nodes */
    readonly m_Childs: PolyNode[];
    
    /** Whether this is an open path */
    IsOpen: boolean;
    
    /** Check if this node represents a hole */
    IsHoleNode(): boolean;
    IsHole(): boolean;
    
    /** Get number of immediate children */
    ChildCount(): number;
    
    /** Get the contour path */
    Contour(): Path;
    
    /** Add a child node */
    AddChild(child: PolyNode): void;
    
    /** Get next node in tree traversal */
    GetNext(): PolyNode | null;
    
    /** Get next sibling up the hierarchy */
    GetNextSiblingUp(): PolyNode | null;
    
    /** Get array of child nodes */
    Childs(): PolyNode[];
    
    /** Get parent node */
    Parent(): PolyNode | null;
  }

  /**
   * Root container for polygon tree hierarchy
   */
  class PolyTree extends PolyNode {
    /** Internal array of all polygon nodes */
    readonly m_AllPolys: PolyNode[];
    
    /** Clear the tree */
    Clear(): void;
    
    /** Get first child node */
    GetFirst(): PolyNode | null;
    
    /** Get total number of polygon nodes */
    Total(): number;
  }

  // ==================== Core Classes ====================

  /**
   * Base class for clipping operations
   */
  class ClipperBase {
    /** Add multiple paths for clipping */
    AddPaths(paths: Paths, polyType: PolyType, closed: boolean): boolean;
    
    /** Clear all paths */
    Clear(): void;
  }

  /**
   * Main clipping engine
   */
  class Clipper extends ClipperBase {
    /** Initialization options bit flags */
    static readonly ioReverseSolution: number;
    static readonly ioStrictlySimple: number;
    static readonly ioPreserveCollinear: number;
    
    /** Reverse solution polygon orientation */
    ReverseSolution: boolean;
    
    /** Ensure output polygons are strictly simple */
    StrictlySimple: boolean;
    
    /** Preserve collinear edges */
    PreserveCollinear: boolean;
    
    /**
     * @param initOptions - Bit flags (ioReverseSolution | ioStrictlySimple | ioPreserveCollinear)
     */
    constructor(initOptions?: number);
    
    /**
     * Execute clipping operation (to Paths)
     */
    Execute(
      clipType: ClipType,
      solution: Paths,
      subjFillType?: PolyFillType,
      clipFillType?: PolyFillType
    ): boolean;
    
    /**
     * Execute clipping operation (to PolyTree)
     */
    Execute(
      clipType: ClipType,
      polytree: PolyTree,
      subjFillType?: PolyFillType,
      clipFillType?: PolyFillType
    ): boolean;
    
    /** Clear all paths */
    Clear(): void;
    
    /** Get bounding rectangle of paths */
    static GetBounds(paths: Paths): IntRect;
    
    /** Calculate signed area of polygon (positive = counter-clockwise) */
    static Area(path: Path): number;
    
    /** Determine polygon orientation (true = counter-clockwise) */
    static Orientation(path: Path): boolean;
    
    /** Check if point is inside polygon (-1 = on edge, 0 = outside, 1 = inside) */
    static PointInPolygon(point: IntPoint, path: Path): number;
    
    /** Simplify a single polygon */
    static SimplifyPolygon(path: Path, fillType?: PolyFillType): Path;
    
    /** Simplify multiple polygons */
    static SimplifyPolygons(paths: Paths, fillType?: PolyFillType): Paths;
    
    /** Remove unnecessary vertices from polygon */
    static CleanPolygon(path: Path, distance?: number): Path;
    
    /** Remove unnecessary vertices from multiple polygons */
    static CleanPolygons(paths: Paths, distance?: number): Paths;
    
    /** Round floating point number to integer */
    static Round(value: number): number;
  }

  /**
   * Polygon offsetting (inflate/deflate)
   */
  class ClipperOffset {
    /** Default arc tolerance */
    static readonly def_arc_tolerance: number;
    
    /** Miter limit for mitered joins */
    MiterLimit: number;
    
    /** Tolerance for arc approximation */
    ArcTolerance: number;
    
    /**
     * @param miterLimit - Maximum distance for mitered joins (default: 2)
     * @param arcTolerance - Precision of arc approximation (default: 0.25)
     */
    constructor(miterLimit?: number, arcTolerance?: number);
    
    /** Add paths to offset */
    AddPaths(paths: Paths, joinType: JoinType, endType: EndType): boolean;
    
    /** Clear all paths */
    Clear(): void;
    
    /**
     * Execute offset operation (to Paths)
     */
    Execute(solution: Paths, delta: number): void;
    
    /**
     * Execute offset operation (to PolyTree)
     */
    Execute(polytree: PolyTree, delta: number): void;
  }

  // ==================== Utility Functions ====================

  /** Clear array contents */
  function Clear<T>(array: T[]): void;

  /** Display error message */
  function Error(message: string): void;

  // ==================== WebAssembly Interop ====================

  /** Convert ClipType to WebAssembly format */
  function ConvertClipType(clipType: ClipType): any;

  /** Convert PolyFillType to WebAssembly format */
  function ConvertPolyFillType(fillType: PolyFillType): any;

  /** Convert JoinType to WebAssembly format */
  function ConvertJoinType(joinType: JoinType): any;

  /** Convert EndType to WebAssembly format */
  function ConvertEndType(endType: EndType): any;

  /** Convert generic path to Clipper path */
  function ToClipperPath(path: Array<{ x: number; y: number }>): Path;

  /** Convert generic paths to Clipper paths */
  function ToClipperPaths(paths: Array<Array<{ x: number; y: number }>>): Paths;

  /** Convert Clipper path to generic format */
  function FromClipperPath(path: Path): Array<{ x: number; y: number }>;

  /** Convert Clipper paths to generic format */
  function FromClipperPaths(paths: Paths): Array<Array<{ x: number; y: number }>>;

  // ==================== JavaScript Extensions ====================

  namespace JS {
    /** Calculate area of single polygon */
    function AreaOfPolygon(path: Path, scale?: number): number;

    /** Calculate total area of multiple polygons */
    function AreaOfPolygons(paths: Paths, scale?: number): number;

    /** Get bounding rectangle of single path */
    function BoundsOfPath(path: Path, scale?: number): IntRect;

    /** Get bounding rectangle of multiple paths */
    function BoundsOfPaths(paths: Paths, scale?: number): IntRect;

    /** Remove vertices closer than delta distance */
    function Clean(paths: Paths | Path, delta: number): Paths | Path;

    /** Deep clone paths */
    function Clone(paths: Paths | Path): Paths | Path;

    /** Simplify by removing points within tolerance */
    function Lighten(paths: Paths | Path, tolerance: number): Paths | Path;

    /** Calculate perimeter of single path */
    function PerimeterOfPath(path: Path, closed: boolean, scale?: number): number;

    /** Calculate total perimeter of multiple paths */
    function PerimeterOfPaths(paths: Paths, closed: boolean, scale?: number): number;

    /** Scale down path coordinates */
    function ScaleDownPath(path: Path, scale: number): void;

    /** Scale down multiple paths coordinates */
    function ScaleDownPaths(paths: Paths, scale: number): void;

    /** Scale up path coordinates */
    function ScaleUpPath(path: Path, scale: number): void;

    /** Scale up multiple paths coordinates */
    function ScaleUpPaths(paths: Paths, scale: number): void;

    /** Convert PolyTree to ExPolygons format */
    function PolyTreeToExPolygons(polytree: PolyTree): ExPolygons;

    /** Convert ExPolygons to Paths */
    function ExPolygonsToPaths(expolygons: ExPolygons): Paths;
  }

  // ==================== Extended Polygon Types ====================

  /**
   * Array of ExPolygon structures
   */
  type ExPolygons = ExPolygon[];

  /**
   * Extended polygon with outer contour and holes
   */
  class ExPolygon {
    /** Outer boundary path */
    outer: Path | null;
    
    /** Array of hole paths */
    holes: Paths | null;
  }

  function ExPolygons(): ExPolygons;
}

export = ClipperLib;
export as namespace ClipperLib;