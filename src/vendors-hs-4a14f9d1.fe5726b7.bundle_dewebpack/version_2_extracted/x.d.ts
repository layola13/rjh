/**
 * ClipperLib - Polygon Clipping and Offsetting Library
 * Version: 6.4.2.2
 * 
 * A library for polygon clipping, offsetting, and boolean operations
 */

declare namespace ClipperLib {
  // ==================== Configuration ====================
  
  /** Library version */
  const version: string;
  
  /** Enable line support */
  let use_lines: boolean;
  
  /** Enable Z-coordinate support */
  let use_xyz: boolean;

  // ==================== Core Types ====================
  
  /** 2D Point with integer coordinates */
  interface IntPoint {
    X: number;
    Y: number;
    Z?: number;
  }

  /** 2D Point with floating-point coordinates */
  interface DoublePoint {
    X: number;
    Y: number;
  }

  /** Rectangular bounds */
  interface IntRect {
    left: number;
    top: number;
    right: number;
    bottom: number;
  }

  /** Array of IntPoint forming a polygon path */
  type Path = IntPoint[];

  /** Array of paths */
  type Paths = Path[];

  // ==================== Enumerations ====================
  
  /** Clipping operation types */
  enum ClipType {
    ctIntersection = 0,
    ctUnion = 1,
    ctDifference = 2,
    ctXor = 3
  }

  /** Polygon type classification */
  enum PolyType {
    ptSubject = 0,
    ptClip = 1
  }

  /** Polygon fill rules */
  enum PolyFillType {
    pftEvenOdd = 0,
    pftNonZero = 1,
    pftPositive = 2,
    pftNegative = 3
  }

  /** Join types for offset polygons */
  enum JoinType {
    jtSquare = 0,
    jtRound = 1,
    jtMiter = 2
  }

  /** End cap types for open paths */
  enum EndType {
    etOpenSquare = 0,
    etOpenRound = 1,
    etOpenButt = 2,
    etClosedLine = 3,
    etClosedPolygon = 4
  }

  /** Edge side designation */
  enum EdgeSide {
    esLeft = 0,
    esRight = 1
  }

  /** Polygon traversal direction */
  enum Direction {
    dRightToLeft = 0,
    dLeftToRight = 1
  }

  // ==================== Edge Structure ====================
  
  /** Edge in active edge table */
  interface TEdge {
    Bot: IntPoint;
    Curr: IntPoint;
    Top: IntPoint;
    Delta: IntPoint;
    Dx: number;
    PolyTyp: PolyType;
    Side: EdgeSide;
    WindDelta: number;
    WindCnt: number;
    WindCnt2: number;
    OutIdx: number;
    Next: TEdge | null;
    Prev: TEdge | null;
    NextInLML: TEdge | null;
    NextInAEL: TEdge | null;
    PrevInAEL: TEdge | null;
    NextInSEL: TEdge | null;
    PrevInSEL: TEdge | null;
  }

  // ==================== Output Structures ====================
  
  /** Output polygon vertex */
  interface OutPt {
    Idx: number;
    Pt: IntPoint;
    Next: OutPt | null;
    Prev: OutPt | null;
  }

  /** Output polygon record */
  interface OutRec {
    Idx: number;
    IsHole: boolean;
    IsOpen: boolean;
    FirstLeft: OutRec | null;
    Pts: OutPt | null;
    BottomPt: OutPt | null;
    PolyNode: PolyNode | null;
  }

  /** Join record for polygon merging */
  interface Join {
    OutPt1: OutPt | null;
    OutPt2: OutPt | null;
    OffPt: IntPoint;
  }

  /** Intersection node */
  interface IntersectNode {
    Edge1: TEdge | null;
    Edge2: TEdge | null;
    Pt: IntPoint;
  }

  // ==================== Internal Structures ====================
  
  /** Local minima record */
  interface LocalMinima {
    Y: number;
    LeftBound: TEdge | null;
    RightBound: TEdge | null;
    Next: LocalMinima | null;
  }

  /** Scanbeam structure */
  interface Scanbeam {
    Y: number;
    Next: Scanbeam | null;
  }

  /** Maxima structure */
  interface Maxima {
    X: number;
    Next: Maxima | null;
    Prev: Maxima | null;
  }

  // ==================== PolyTree Structures ====================
  
  /** Hierarchical polygon node */
  class PolyNode {
    m_Parent: PolyNode | null;
    m_polygon: Path;
    m_Index: number;
    m_jointype: JoinType;
    m_endtype: EndType;
    m_Childs: PolyNode[];
    IsOpen: boolean;

    /** Check if this node represents a hole */
    IsHoleNode(): boolean;

    /** Get number of child nodes */
    ChildCount(): number;

    /** Get the contour of this node */
    Contour(): Path;

    /** Add a child node */
    AddChild(child: PolyNode): void;

    /** Get next node in tree traversal */
    GetNext(): PolyNode | null;

    /** Get next sibling going up the tree */
    GetNextSiblingUp(): PolyNode | null;

    /** Get child nodes */
    Childs(): PolyNode[];

    /** Get parent node */
    Parent(): PolyNode | null;

    /** Check if this is a hole */
    IsHole(): boolean;
  }

  /** Hierarchical polygon tree structure */
  class PolyTree extends PolyNode {
    m_AllPolys: PolyNode[];

    /** Clear the tree */
    Clear(): void;

    /** Get first child node */
    GetFirst(): PolyNode | null;

    /** Get total number of polygons */
    Total(): number;
  }

  // ==================== ClipperBase ====================
  
  /** Base clipping class with core algorithms */
  class ClipperBase {
    /** Tolerance for floating-point comparisons */
    static readonly tolerance: number;

    /** Preserve collinear vertices */
    PreserveCollinear: boolean;

    constructor();

    /** Clear all polygon data */
    Clear(): void;

    /** Add a single path to the clipper */
    AddPath(path: Path, polyType: PolyType, closed: boolean): boolean;

    /** Add multiple paths to the clipper */
    AddPaths(paths: Paths, polyType: PolyType, closed: boolean): boolean;

    /** Get bounding rectangle of paths */
    static GetBounds(paths: Paths): IntRect;
  }

  // ==================== Clipper ====================
  
  /** Main polygon clipping engine */
  class Clipper extends ClipperBase {
    /** Reverse solution orientation */
    ReverseSolution: boolean;

    /** Enforce strictly simple polygons */
    StrictlySimple: boolean;

    /** Z-coordinate fill callback function */
    ZFillFunction: ((bot1: IntPoint, top1: IntPoint, bot2: IntPoint, top2: IntPoint, pt: IntPoint) => void) | null;

    /**
     * Create clipper instance
     * @param initOptions - Initialization options (ioReverseSolution, ioStrictlySimple, ioPreserveCollinear)
     */
    constructor(initOptions?: number);

    /**
     * Execute clipping operation (Paths output)
     * @param clipType - Type of boolean operation
     * @param solution - Output paths
     * @param subjFillType - Subject fill rule
     * @param clipFillType - Clip fill rule
     */
    Execute(
      clipType: ClipType,
      solution: Paths,
      subjFillType?: PolyFillType,
      clipFillType?: PolyFillType
    ): boolean;

    /**
     * Execute clipping operation (PolyTree output)
     * @param clipType - Type of boolean operation
     * @param solution - Output polytree
     * @param subjFillType - Subject fill rule
     * @param clipFillType - Clip fill rule
     */
    Execute(
      clipType: ClipType,
      solution: PolyTree,
      subjFillType?: PolyFillType,
      clipFillType?: PolyFillType
    ): boolean;

    /** Calculate signed area of polygon */
    static Area(path: Path): number;

    /** Determine polygon orientation (clockwise/counter-clockwise) */
    static Orientation(path: Path): boolean;

    /** Determine point location relative to polygon */
    static PointInPolygon(point: IntPoint, path: Path): number;

    /** Simplify a single polygon */
    static SimplifyPolygon(path: Path, fillType?: PolyFillType): Paths;

    /** Simplify multiple polygons */
    static SimplifyPolygons(paths: Paths, fillType?: PolyFillType): Paths;

    /** Remove near-collinear vertices from a path */
    static CleanPolygon(path: Path, distance?: number): Path;

    /** Remove near-collinear vertices from multiple paths */
    static CleanPolygons(paths: Paths, distance?: number): Paths;

    /** Minkowski sum operation */
    static MinkowskiSum(pattern: Path, path: Path | Paths, pathIsClosed: boolean): Paths;

    /** Minkowski difference operation */
    static MinkowskiDiff(poly1: Path, poly2: Path): Paths;

    /** Convert PolyTree to Paths */
    static PolyTreeToPaths(polytree: PolyTree): Paths;

    /** Extract closed paths from PolyTree */
    static ClosedPathsFromPolyTree(polytree: PolyTree): Paths;

    /** Extract open paths from PolyTree */
    static OpenPathsFromPolyTree(polytree: PolyTree): Paths;

    /** Reverse path directions */
    static ReversePaths(paths: Paths): void;

    // Initialization options
    static readonly ioReverseSolution: number;
    static readonly ioStrictlySimple: number;
    static readonly ioPreserveCollinear: number;
  }

  // ==================== ClipperOffset ====================
  
  /** Polygon offsetting (inflate/deflate) */
  class ClipperOffset {
    /** Miter limit for offset joins */
    MiterLimit: number;

    /** Arc approximation tolerance */
    ArcTolerance: number;

    /**
     * Create offset instance
     * @param miterLimit - Maximum miter distance ratio
     * @param arcTolerance - Arc approximation tolerance
     */
    constructor(miterLimit?: number, arcTolerance?: number);

    /** Clear all path data */
    Clear(): void;

    /** Add a path to be offset */
    AddPath(path: Path, joinType: JoinType, endType: EndType): void;

    /** Add multiple paths to be offset */
    AddPaths(paths: Paths, joinType: JoinType, endType: EndType): void;

    /**
     * Execute offset operation (Paths output)
     * @param solution - Output paths
     * @param delta - Offset distance (positive=expand, negative=shrink)
     */
    Execute(solution: Paths, delta: number): void;

    /**
     * Execute offset operation (PolyTree output)
     * @param solution - Output polytree
     * @param delta - Offset distance
     */
    Execute(solution: PolyTree, delta: number): void;
  }

  // ==================== ExPolygon Structures ====================
  
  /** Polygon with holes representation */
  interface ExPolygon {
    /** Outer boundary */
    outer: Path;
    /** Array of hole boundaries */
    holes: Path[];
  }

  /** Array of ExPolygon */
  type ExPolygons = ExPolygon[];

  // ==================== Utility Functions (JS namespace) ====================
  
  namespace JS {
    /** Calculate area of a polygon with optional scaling */
    function AreaOfPolygon(path: Path, scale?: number): number;

    /** Calculate total area of multiple polygons */
    function AreaOfPolygons(paths: Paths, scale?: number): number;

    /** Get bounding rectangle of a path */
    function BoundsOfPath(path: Path, scale?: number): IntRect;

    /** Get bounding rectangle of multiple paths */
    function BoundsOfPaths(paths: Paths, scale?: number): IntRect;

    /** Clone path or paths deeply */
    function Clone(paths: Path | Paths): Path | Paths;

    /** Remove vertices closer than tolerance */
    function Clean(paths: Path | Paths, delta: number): Path | Paths;

    /** Simplify path by removing collinear points */
    function Lighten(paths: Path | Paths, tolerance: number): Path | Paths;

    /** Calculate perimeter length of a path */
    function PerimeterOfPath(path: Path, closed: boolean, scale?: number): number;

    /** Calculate total perimeter of multiple paths */
    function PerimeterOfPaths(paths: Paths, closed: boolean, scale?: number): number;

    /** Scale down path coordinates */
    function ScaleDownPath(path: Path, scale: number): void;

    /** Scale down multiple paths */
    function ScaleDownPaths(paths: Paths, scale: number): void;

    /** Scale up path coordinates */
    function ScaleUpPath(path: Path, scale: number): void;

    /** Scale up multiple paths */
    function ScaleUpPaths(paths: Paths, scale: number): void;

    /** Convert PolyTree to ExPolygons */
    function PolyTreeToExPolygons(polytree: PolyTree): ExPolygons;

    /** Convert ExPolygons to Paths */
    function ExPolygonsToPaths(expolygons: ExPolygons): Paths;
  }

  // ==================== Error Handling ====================
  
  /** Throw ClipperLib error */
  function Error(message: string): void;
}

export = ClipperLib;
export as namespace ClipperLib;