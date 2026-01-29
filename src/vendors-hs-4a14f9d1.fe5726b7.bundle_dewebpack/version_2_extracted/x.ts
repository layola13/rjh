export interface IntPoint {
  X: number;
  Y: number;
  Z?: number;
}

export interface IntRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface DoublePoint {
  X: number;
  Y: number;
}

export type Path = IntPoint[];
export type Paths = Path[];

export enum ClipType {
  ctIntersection = 0,
  ctUnion = 1,
  ctDifference = 2,
  ctXor = 3,
}

export enum PolyType {
  ptSubject = 0,
  ptClip = 1,
}

export enum PolyFillType {
  pftEvenOdd = 0,
  pftNonZero = 1,
  pftPositive = 2,
  pftNegative = 3,
}

export enum JoinType {
  jtSquare = 0,
  jtRound = 1,
  jtMiter = 2,
}

export enum EndType {
  etOpenSquare = 0,
  etOpenRound = 1,
  etOpenButt = 2,
  etClosedLine = 3,
  etClosedPolygon = 4,
}

export enum EdgeSide {
  esLeft = 0,
  esRight = 1,
}

export enum Direction {
  dRightToLeft = 0,
  dLeftToRight = 1,
}

export class TEdge {
  Bot: IntPoint = { X: 0, Y: 0 };
  Curr: IntPoint = { X: 0, Y: 0 };
  Top: IntPoint = { X: 0, Y: 0 };
  Delta: IntPoint = { X: 0, Y: 0 };
  Dx: number = 0;
  PolyTyp: PolyType = PolyType.ptSubject;
  Side: EdgeSide = EdgeSide.esLeft;
  WindDelta: number = 0;
  WindCnt: number = 0;
  WindCnt2: number = 0;
  OutIdx: number = 0;
  Next: TEdge | null = null;
  Prev: TEdge | null = null;
  NextInLML: TEdge | null = null;
  NextInAEL: TEdge | null = null;
  PrevInAEL: TEdge | null = null;
  NextInSEL: TEdge | null = null;
  PrevInSEL: TEdge | null = null;
}

export class IntersectNode {
  Edge1: TEdge | null = null;
  Edge2: TEdge | null = null;
  Pt: IntPoint = { X: 0, Y: 0 };
}

export class LocalMinima {
  Y: number = 0;
  LeftBound: TEdge | null = null;
  RightBound: TEdge | null = null;
  Next: LocalMinima | null = null;
}

export class Scanbeam {
  Y: number = 0;
  Next: Scanbeam | null = null;
}

export class Maxima {
  X: number = 0;
  Next: Maxima | null = null;
  Prev: Maxima | null = null;
}

export class OutRec {
  Idx: number = 0;
  IsHole: boolean = false;
  IsOpen: boolean = false;
  FirstLeft: OutRec | null = null;
  Pts: OutPt | null = null;
  BottomPt: OutPt | null = null;
  PolyNode: PolyNode | null = null;
}

export class OutPt {
  Idx: number = 0;
  Pt: IntPoint = { X: 0, Y: 0 };
  Next: OutPt | null = null;
  Prev: OutPt | null = null;
}

export class Join {
  OutPt1: OutPt | null = null;
  OutPt2: OutPt | null = null;
  OffPt: IntPoint = { X: 0, Y: 0 };
}

export class PolyNode {
  m_Parent: PolyNode | null = null;
  m_polygon: Path = [];
  m_Index: number = 0;
  m_jointype: JoinType = JoinType.jtSquare;
  m_endtype: EndType = EndType.etClosedPolygon;
  m_Childs: PolyNode[] = [];
  IsOpen: boolean = false;

  IsHoleNode(): boolean {
    let isHole = true;
    let node: PolyNode | null = this.m_Parent;
    while (node !== null) {
      isHole = !isHole;
      node = node.m_Parent;
    }
    return isHole;
  }

  ChildCount(): number {
    return this.m_Childs.length;
  }

  Contour(): Path {
    return this.m_polygon;
  }

  AddChild(child: PolyNode): void {
    const count = this.m_Childs.length;
    this.m_Childs.push(child);
    child.m_Parent = this;
    child.m_Index = count;
  }

  GetNext(): PolyNode | null {
    if (this.m_Childs.length > 0) {
      return this.m_Childs[0];
    }
    return this.GetNextSiblingUp();
  }

  GetNextSiblingUp(): PolyNode | null {
    if (this.m_Parent === null) {
      return null;
    }
    if (this.m_Index === this.m_Parent.m_Childs.length - 1) {
      return this.m_Parent.GetNextSiblingUp();
    }
    return this.m_Parent.m_Childs[this.m_Index + 1];
  }

  Childs(): PolyNode[] {
    return this.m_Childs;
  }

  Parent(): PolyNode | null {
    return this.m_Parent;
  }

  IsHole(): boolean {
    return this.IsHoleNode();
  }
}

export class PolyTree extends PolyNode {
  m_AllPolys: PolyNode[] = [];

  Clear(): void {
    this.m_AllPolys = [];
    this.m_Childs = [];
  }

  GetFirst(): PolyNode | null {
    if (this.m_Childs.length > 0) {
      return this.m_Childs[0];
    }
    return null;
  }

  Total(): number {
    let result = this.m_AllPolys.length;
    if (result > 0 && this.m_Childs[0] !== this.m_AllPolys[0]) {
      result--;
    }
    return result;
  }
}

export class ClipperBase {
  static readonly HORIZONTAL = -Number.MAX_VALUE;
  static readonly SKIP = -2;
  static readonly UNASSIGNED = -1;
  static readonly TOLERANCE = 1e-20;

  protected m_MinimaList: LocalMinima | null = null;
  protected m_CurrentLM: LocalMinima | null = null;
  protected m_edges: TEdge[][] = [];
  protected m_UseFullRange: boolean = false;
  protected m_HasOpenPaths: boolean = false;
  public PreserveCollinear: boolean = false;
  protected m_Scanbeam: Scanbeam | null = null;
  protected m_PolyOuts: OutRec[] = [];
  protected m_ActiveEdges: TEdge | null = null;

  static IsHorizontal(edge: TEdge): boolean {
    return edge.Delta.Y === 0;
  }

  Clear(): void {
    this.DisposeLocalMinimaList();
    this.m_edges = [];
    this.m_UseFullRange = false;
    this.m_HasOpenPaths = false;
  }

  protected DisposeLocalMinimaList(): void {
    while (this.m_MinimaList !== null) {
      const tempLm = this.m_MinimaList.Next;
      this.m_MinimaList = tempLm;
    }
    this.m_CurrentLM = null;
  }

  AddPath(path: Path, polyType: PolyType, closed: boolean): boolean {
    // Implementation details...
    return true;
  }

  AddPaths(paths: Paths, polyType: PolyType, closed: boolean): boolean {
    let result = false;
    for (let i = 0; i < paths.length; i++) {
      if (this.AddPath(paths[i], polyType, closed)) {
        result = true;
      }
    }
    return result;
  }
}

export class Clipper extends ClipperBase {
  private m_ClipType: ClipType = ClipType.ctIntersection;
  private m_Maxima: Maxima | null = null;
  private m_SortedEdges: TEdge | null = null;
  private m_IntersectList: IntersectNode[] = [];
  private m_ExecuteLocked: boolean = false;
  private m_ClipFillType: PolyFillType = PolyFillType.pftEvenOdd;
  private m_SubjFillType: PolyFillType = PolyFillType.pftEvenOdd;
  private m_Joins: Join[] = [];
  private m_GhostJoins: Join[] = [];
  private m_UsingPolyTree: boolean = false;
  public ReverseSolution: boolean = false;
  public StrictlySimple: boolean = false;
  public ZFillFunction: ((bot1: IntPoint, top1: IntPoint, bot2: IntPoint, top2: IntPoint, pt: IntPoint) => void) | null = null;

  constructor(initOptions: number = 0) {
    super();
    this.ReverseSolution = (initOptions & 1) !== 0;
    this.StrictlySimple = (initOptions & 2) !== 0;
    this.PreserveCollinear = (initOptions & 4) !== 0;
  }

  Execute(
    clipType: ClipType,
    solution: Paths | PolyTree,
    subjFillType: PolyFillType = PolyFillType.pftEvenOdd,
    clipFillType: PolyFillType = PolyFillType.pftEvenOdd
  ): boolean {
    if (this.m_ExecuteLocked) {
      return false;
    }

    this.m_ExecuteLocked = true;
    this.m_SubjFillType = subjFillType;
    this.m_ClipFillType = clipFillType;
    this.m_ClipType = clipType;
    this.m_UsingPolyTree = solution instanceof PolyTree;

    try {
      const succeeded = this.ExecuteInternal();
      if (succeeded) {
        if (solution instanceof PolyTree) {
          this.BuildResult2(solution);
        } else {
          this.BuildResult(solution);
        }
      }
      return succeeded;
    } finally {
      this.DisposeAllPolyPts();
      this.m_ExecuteLocked = false;
    }
  }

  private ExecuteInternal(): boolean {
    // Implementation...
    return true;
  }

  private BuildResult(solution: Paths): void {
    solution.length = 0;
    for (const outRec of this.m_PolyOuts) {
      if (outRec.Pts !== null) {
        const path: Path = [];
        let pt: OutPt | null = outRec.Pts.Prev;
        const pointCount = this.PointCount(pt);
        if (pointCount >= 2) {
          for (let i = 0; i < pointCount; i++) {
            path.push({ X: pt!.Pt.X, Y: pt!.Pt.Y });
            pt = pt!.Prev;
          }
          solution.push(path);
        }
      }
    }
  }

  private BuildResult2(polyTree: PolyTree): void {
    polyTree.Clear();
    for (const outRec of this.m_PolyOuts) {
      const count = this.PointCount(outRec.Pts);
      if ((outRec.IsOpen && count < 2) || (!outRec.IsOpen && count < 3)) {
        continue;
      }
      this.FixHoleLinkage(outRec);
      const polyNode = new PolyNode();
      polyTree.m_AllPolys.push(polyNode);
      outRec.PolyNode = polyNode;
      let pt: OutPt | null = outRec.Pts!.Prev;
      for (let j = 0; j < count; j++) {
        polyNode.m_polygon.push({ X: pt!.Pt.X, Y: pt!.Pt.Y });
        pt = pt!.Prev;
      }
    }

    for (const outRec of this.m_PolyOuts) {
      if (outRec.PolyNode !== null) {
        if (outRec.IsOpen) {
          outRec.PolyNode.IsOpen = true;
          polyTree.AddChild(outRec.PolyNode);
        } else if (outRec.FirstLeft?.PolyNode) {
          outRec.FirstLeft.PolyNode.AddChild(outRec.PolyNode);
        } else {
          polyTree.AddChild(outRec.PolyNode);
        }
      }
    }
  }

  private FixHoleLinkage(outRec: OutRec): void {
    if (outRec.FirstLeft !== null && 
        (outRec.IsHole === outRec.FirstLeft.IsHole || outRec.FirstLeft.Pts === null)) {
      let firstLeft: OutRec | null = outRec.FirstLeft;
      while (firstLeft !== null && 
             (firstLeft.IsHole === outRec.IsHole || firstLeft.Pts === null)) {
        firstLeft = firstLeft.FirstLeft;
      }
      outRec.FirstLeft = firstLeft;
    }
  }

  private DisposeAllPolyPts(): void {
    this.m_PolyOuts = [];
  }

  private PointCount(pts: OutPt | null): number {
    if (pts === null) {
      return 0;
    }
    let count = 0;
    let p: OutPt | null = pts;
    do {
      count++;
      p = p!.Next;
    } while (p !== pts);
    return count;
  }

  static Area(path: Path): number {
    const length = path.length;
    if (length < 3) {
      return 0;
    }
    let area = 0;
    for (let i = 0, j = length - 1; i < length; j = i++) {
      area += (path[j].X + path[i].X) * (path[j].Y - path[i].Y);
    }
    return -area * 0.5;
  }

  static Orientation(path: Path): boolean {
    return Clipper.Area(path) >= 0;
  }
}

export class ClipperOffset {
  private static readonly TWO_PI = Math.PI * 2;
  private static readonly DEFAULT_ARC_TOLERANCE = 0.25;

  private m_destPolys: Paths = [];
  private m_srcPoly: Path = [];
  private m_destPoly: Path = [];
  private m_normals: DoublePoint[] = [];
  private m_delta: number = 0;
  private m_sinA: number = 0;
  private m_sin: number = 0;
  private m_cos: number = 0;
  private m_miterLim: number = 0;
  private m_StepsPerRad: number = 0;
  private m_lowest: IntPoint = { X: -1, Y: 0 };
  private m_polyNodes: PolyNode = new PolyNode();

  public MiterLimit: number;
  public ArcTolerance: number;

  constructor(miterLimit: number = 2, arcTolerance: number = ClipperOffset.DEFAULT_ARC_TOLERANCE) {
    this.MiterLimit = miterLimit;
    this.ArcTolerance = arcTolerance;
  }

  Clear(): void {
    this.m_polyNodes.m_Childs = [];
    this.m_lowest.X = -1;
  }

  AddPath(path: Path, joinType: JoinType, endType: EndType): void {
    // Implementation...
  }

  AddPaths(paths: Paths, joinType: JoinType, endType: EndType): void {
    for (const path of paths) {
      this.AddPath(path, joinType, endType);
    }
  }

  Execute(solution: Paths | PolyTree, delta: number): void {
    // Implementation...
  }
}