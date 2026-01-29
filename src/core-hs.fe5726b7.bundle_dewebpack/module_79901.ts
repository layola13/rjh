import { F } from './79169';
import { Logger } from './41861';

interface Point {
  x: number;
  y: number;
}

type Path = Point[];
type Paths = Path[];

interface ExPolygon {
  outer: Path;
  holes: Path[];
}

type ExPolygons = ExPolygon[];

interface PolyNode {
  contour: Path;
  childs: PolyNode[];
}

interface PolyTree {
  childs: PolyNode[];
}

enum PolyFillType {
  evenOdd = 'evenOdd',
  nonZero = 'nonZero',
  positive = 'positive',
  negative = 'negative'
}

enum ClipType {
  union = 'union',
  diff = 'diff',
  inter = 'inter',
  xor = 'xor'
}

enum JoinType {
  miter = 'miter',
  square = 'square',
  round = 'round'
}

enum EndType {
  openSquare = 'openSquare',
  openRound = 'openRound',
  openButt = 'openButt',
  closedLine = 'closedLine',
  closedPolygon = 'closedPolygon'
}

interface ClipOptions {
  closed?: boolean;
  subject_fillType?: PolyFillType;
  clip_fillType?: PolyFillType;
  operation?: ClipType;
  onlyFirstLevel?: boolean;
}

interface OffsetOptions {
  miterLimit?: number;
  arcTolerance?: number;
  joinType?: JoinType;
  endType?: EndType;
}

declare const ClipperLibInstance: any;
declare const ClipperLibWasm: any;
declare const ClipperLib: any;
declare function assert(condition: boolean, message: string, context: string): void;

const CLIPPER_SCALE_FACTOR = 1e6;

function convertPolyFillType(fillType: PolyFillType): any {
  switch (fillType) {
    case PolyFillType.evenOdd:
      return ClipperLibWasm.PolyFillType.EvenOdd;
    case PolyFillType.nonZero:
      return ClipperLibWasm.PolyFillType.NonZero;
    case PolyFillType.positive:
      return ClipperLibWasm.PolyFillType.Positive;
    case PolyFillType.negative:
      return ClipperLibWasm.PolyFillType.Negative;
    default:
      return ClipperLibWasm.PolyFillType.NonZero;
  }
}

function convertClipType(clipType: ClipType): any {
  switch (clipType) {
    case ClipType.union:
      return ClipperLibWasm.ClipType.Union;
    case ClipType.diff:
      return ClipperLibWasm.ClipType.Difference;
    case ClipType.inter:
      return ClipperLibWasm.ClipType.Intersection;
    case ClipType.xor:
      return ClipperLibWasm.ClipType.Xor;
    default:
      return ClipperLibWasm.ClipType.Intersection;
  }
}

function convertJoinType(joinType: JoinType): any {
  switch (joinType) {
    case JoinType.miter:
      return ClipperLibWasm.JoinType.Miter;
    case JoinType.square:
      return ClipperLibWasm.JoinType.Square;
    case JoinType.round:
      return ClipperLibWasm.JoinType.Round;
    default:
      return ClipperLibWasm.JoinType.Miter;
  }
}

function convertEndType(endType: EndType): any {
  switch (endType) {
    case EndType.openSquare:
      return ClipperLibWasm.EndType.OpenSquare;
    case EndType.openRound:
      return ClipperLibWasm.EndType.OpenRound;
    case EndType.openButt:
      return ClipperLibWasm.EndType.OpenButt;
    case EndType.closedLine:
      return ClipperLibWasm.EndType.ClosedLine;
    case EndType.closedPolygon:
    default:
      return ClipperLibWasm.EndType.ClosedPolygon;
  }
}

function scalePoint(point: Point, scale: number): Point {
  return {
    x: point.x / scale,
    y: point.y / scale
  };
}

function scalePath(path: Path, scale: number): Path {
  return path.map(point => scalePoint(point, scale));
}

export const Collision = {
  ...F,
  PolyFillType,
  ClipType,
  JoinType,
  EndType,

  ClipPolygon(subjectPaths: Paths, clipPaths: Paths, options?: ClipOptions): Paths {
    return this._ClipPolygon(subjectPaths, clipPaths, options, false);
  },

  ClipPolygon2(subjectPaths: Paths, clipPaths: Paths, options?: ClipOptions): ExPolygons {
    return this._ClipPolygon(subjectPaths, clipPaths, options, true);
  },

  _ClipPolygon(subjectPaths: Paths, clipPaths: Paths, options?: ClipOptions, returnExPolygons: boolean = false): Paths | ExPolygons {
    if (!ClipperLibInstance) {
      assert(false, "The collision detection expected Clipper library.", "HSCore.Util");
      return [];
    }

    if (!clipPaths || clipPaths.length === 0) {
      return subjectPaths;
    }

    let scaledSubjectPaths = ClipperLibInstance.scalePaths(subjectPaths, CLIPPER_SCALE_FACTOR);
    this.FixReversedPaths(scaledSubjectPaths);

    let scaledClipPaths = ClipperLibInstance.scalePaths(clipPaths, CLIPPER_SCALE_FACTOR);
    this.FixReversedPaths(scaledClipPaths);

    const closed = options?.closed ?? true;
    const subjectFillType = options?.subject_fillType 
      ? convertPolyFillType(options.subject_fillType) 
      : ClipperLibWasm.PolyFillType.NonZero;
    const clipFillType = options?.clip_fillType 
      ? convertPolyFillType(options.clip_fillType) 
      : ClipperLibWasm.PolyFillType.NonZero;
    const clipType = options?.operation 
      ? convertClipType(options.operation) 
      : ClipperLibWasm.ClipType.Intersection;

    let polyTree: PolyTree;
    try {
      polyTree = ClipperLibInstance.clipToPolyTree({
        clipType,
        subjectFillType,
        clipFillType,
        subjectInputs: [{
          data: scaledSubjectPaths,
          closed
        }],
        clipInputs: [{
          data: scaledClipPaths
        }]
      });
    } catch (error) {
      return [];
    }

    if (!polyTree) {
      Logger.console.error("clipToPolyTree failed");
      return [];
    }

    const onlyFirstLevel = options?.onlyFirstLevel ?? false;
    const exPolygons = this.PolyTreeToExPolygons(polyTree, onlyFirstLevel);

    if (returnExPolygons) {
      return exPolygons.map(exPolygon => ({
        outer: scalePath(exPolygon.outer, CLIPPER_SCALE_FACTOR),
        holes: exPolygon.holes.map(hole => scalePath(hole, CLIPPER_SCALE_FACTOR))
      }));
    } else {
      let allPaths: Paths = [];
      exPolygons.forEach(exPolygon => {
        allPaths.push(exPolygon.outer);
        allPaths = allPaths.concat(exPolygon.holes);
      });

      return allPaths.map(path => scalePath(path, CLIPPER_SCALE_FACTOR));
    }
  },

  offsetPolygons(paths: Paths, delta: number, options?: OffsetOptions): Paths {
    if (!ClipperLibInstance) {
      assert(false, "The collision detection expected Clipper library.", "HSCore.Util");
      return [];
    }

    if (!paths || paths.length === 0) {
      return [];
    }

    let scaledPaths = ClipperLibInstance.scalePaths(paths, CLIPPER_SCALE_FACTOR);
    this.FixReversedPaths(scaledPaths);

    const miterLimit = (options?.miterLimit ?? 2) * CLIPPER_SCALE_FACTOR;
    const arcTolerance = (options?.arcTolerance ?? 0.25) * CLIPPER_SCALE_FACTOR;
    const scaledDelta = delta * CLIPPER_SCALE_FACTOR;
    const joinType = options?.joinType 
      ? convertJoinType(options.joinType) 
      : ClipperLibWasm.JoinType.Miter;
    const endType = options?.endType 
      ? convertEndType(options.endType) 
      : ClipperLibWasm.EndType.ClosedPolygon;

    let resultPaths: Paths;
    try {
      resultPaths = ClipperLibInstance.offsetToPaths({
        miterLimit,
        arcTolerance,
        delta: scaledDelta,
        offsetInputs: [{
          joinType,
          endType,
          data: scaledPaths
        }]
      });
    } catch (error) {
      return [];
    }

    if (!resultPaths) {
      Logger.console.error("offsetToPaths failed");
      return [];
    }

    return resultPaths.map(path => scalePath(path, CLIPPER_SCALE_FACTOR));
  },

  offsetPolygon(path: Path, delta: number, options?: OffsetOptions): Path {
    const result = this.offsetPolygons([path], delta, options);
    return result && result.length === 1 ? result[0] : [];
  },

  SimplifyPolygons(paths: Paths): Paths {
    if (!ClipperLibInstance) {
      assert(false, "The collision detection expected Clipper library.", "HSCore.Util");
      return [];
    }

    const scaledPaths = ClipperLibInstance.scalePaths(paths, CLIPPER_SCALE_FACTOR);
    this.FixReversedPaths(scaledPaths);

    const simplifiedPaths = ClipperLibInstance.simplifyPolygons(scaledPaths, ClipperLibWasm.PolyFillType.EvenOdd);

    if (!simplifiedPaths) {
      Logger.console.error("simplifyPolygons failed");
      return [];
    }

    return simplifiedPaths.map((path: Path) => scalePath(path, CLIPPER_SCALE_FACTOR));
  },

  Orientation(path: Path): boolean {
    return ClipperLibInstance.orientation(path);
  },

  CleanPolygons(paths: Paths, distance: number): Paths {
    if (!ClipperLibInstance) {
      assert(false, "The collision detection expected Clipper library.", "HSCore.Util");
      return [];
    }

    const scaledPaths = ClipperLibInstance.scalePaths(paths, CLIPPER_SCALE_FACTOR);
    this.FixReversedPaths(scaledPaths);

    const cleanedPaths = ClipperLibInstance.cleanPolygons(scaledPaths, distance * CLIPPER_SCALE_FACTOR);

    if (!cleanedPaths) {
      Logger.console.error("cleanPolygons failed");
      return [];
    }

    return cleanedPaths.map((path: Path) => scalePath(path, CLIPPER_SCALE_FACTOR));
  },

  AddOuterPolyNodeToExPolygons(polyNode: PolyNode, exPolygons: ExPolygons, onlyFirstLevel: boolean = false): void {
    const exPolygon: ExPolygon = {
      outer: polyNode.contour,
      holes: []
    };

    const childNodes = polyNode.childs;
    const childCount = childNodes.length;

    exPolygon.holes = new Array(childCount);

    for (let i = 0; i < childCount; i++) {
      const childNode = childNodes[i];
      exPolygon.holes[i] = childNode.contour;

      if (!onlyFirstLevel) {
        const grandChildNodes = childNode.childs;
        for (let j = 0; j < grandChildNodes.length; j++) {
          const grandChildNode = grandChildNodes[j];
          this.AddOuterPolyNodeToExPolygons(grandChildNode, exPolygons);
        }
      }
    }

    exPolygons.push(exPolygon);
  },

  PolyTreeToExPolygons(polyTree: PolyTree, onlyFirstLevel: boolean = false): ExPolygons {
    const exPolygons: ExPolygons = [];
    const rootNodes = polyTree.childs;

    for (let i = 0; i < rootNodes.length; i++) {
      const rootNode = rootNodes[i];
      this.AddOuterPolyNodeToExPolygons(rootNode, exPolygons, onlyFirstLevel);
    }

    return exPolygons;
  },

  FixReversedPath(path: Path): void {
    path.reverse();
  },

  FixReversedPaths(paths: Paths): void {
    paths.reverse();
    for (let i = 0; i < paths.length; i++) {
      paths[i].reverse();
    }
  },

  CombinePolygons(paths: Paths): ExPolygons {
    const lastPath = paths.pop();
    
    if (!lastPath) {
      return [];
    }

    if (paths.length === 0) {
      return [{ outer: lastPath, holes: [] }];
    }

    const combinedResult = this.ClipPolygon2(paths, [lastPath], {
      operation: ClipType.union
    });

    if (combinedResult.length === 0) {
      return [{ outer: lastPath, holes: [] }];
    }

    return combinedResult;
  },

  OffsetPolygon(paths: Paths, delta: number, options?: OffsetOptions): Paths {
    return this.offsetPolygons(paths, delta, options);
  }
};