declare module 'ClipperLib' {
  /** 2D point with integer coordinates */
  export class IntPoint {
    X: number;
    Y: number;
    Z?: number;
    constructor(x?: number | IntPoint, y?: number, z?: number);
  }

  /** Represents a path (polygon/polyline) */
  export type Path = IntPoint[];
  
  /** Collection of paths */
  export type Paths = Path[];

  /** Polygon fill rules */
  export enum PolyFillType {
    pftEvenOdd = 0,
    pftNonZero = 1,
    pftPositive = 2,
    pftNegative = 3
  }

  /** Clipping operation types */
  export enum ClipType {
    ctIntersection = 0,
    ctUnion = 1,
    ctDifference = 2,
    ctXor = 3
  }

  /** Main clipping engine */
  export class Clipper {
    constructor(initOptions?: number);
    
    AddPath(path: Path, polyType: PolyType, closed: boolean): boolean;
    AddPaths(paths: Paths, polyType: PolyType, closed: boolean): boolean;
    
    Execute(
      clipType: ClipType,
      solution: Paths | PolyTree,
      subjFillType?: PolyFillType,
      clipFillType?: PolyFillType
    ): boolean;

    Clear(): void;
    
    static Area(path: Path): number;
    static Orientation(path: Path): boolean;
    static SimplifyPolygon(path: Path, fillType?: PolyFillType): Paths;
    // ... 30+ more static methods
  }

  export enum PolyType {
    ptSubject = 0,
    ptClip = 1
  }

  // ... 15+ more classes (ClipperOffset, PolyTree, PolyNode, etc.)
}