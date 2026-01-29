import { Point2d } from './Point2d';
import { Curve2d } from './Curve2d';
import { getPointInPolygonWithHoles } from './polygonUtils';
import { CurveInfoUtil, ThreeUtil, Curve2dUtil } from './curveUtils';
import { EntityUtil } from './entityUtils';

interface Vector2D {
  x: number;
  y: number;
  clone(): Vector2D;
  negate(): Vector2D;
  normalize(): void;
}

interface Point {
  id?: number;
}

interface CurveInfo {
  type: string;
  threeCurve: any;
  from: Point;
  to: Point;
  middle: Vector2D;
}

interface ClipFace {
  outer: Vector2D[];
  holes: Vector2D[][];
}

interface SketchEntity {
  outerLoop?: Wire;
  innerLoops?: Wire[];
  curves: Curve2d[];
  faces: Face[];
  id: number;
  dump(param1: undefined, param2: boolean, context: DumpContext): any[];
  traverse(callback: (entity: any) => void): void;
  isReversedCurve(curve: Curve2d): boolean;
}

interface Wire {
  curves: Curve2d[];
}

interface Face {
  outerLoop?: Wire;
  innerLoops?: Wire[];
}

interface Loop {
  boundEdgeIds: number[];
  loopDiscretePoints: Vector2D[];
  children: Set<Loop>;
}

interface HalfEdge {
  from?: Point;
  to?: Point;
  edgeID: number;
  directionF?: Vector2D;
  directionT?: Vector2D;
  direction?: Vector2D;
  reversed: boolean;
  partner?: HalfEdge;
  discretePts: Vector2D[];
}

interface EdgePair {
  halfEdge1: HalfEdge;
  halfEdge2: HalfEdge;
  curveInfo?: CurveInfo;
  curve?: Curve2d;
}

interface IntersectionResult {
  curveInfos: CurveInfo[];
  clipFaces: ClipFace[];
}

interface LoopClipFace {
  outer: Vector2D[];
  holes: Vector2D[][];
}

interface DumpContext {
  data: Record<string, any>;
  materialsData: Map<any, any>;
  states: Record<string, any>;
  constraints: Record<string, any>;
  entities: Record<string, any>;
  materials: Map<any, any>;
  productsMap: Map<any, any>;
  idGenerator: any;
  options: {
    ignorePattern: boolean;
  };
}

interface ClonedDumpData {
  dumps: any[];
  context: DumpContext;
}

const DEFAULT_LENGTH_TOLERANCE = HSConstants.Constants.SKETCH2D_LENGTH_TOL;
const CIRCLE_SEGMENTS_MULTIPLIER = 20;

export const Util = {
  getOuterArea(entity: SketchEntity): number {
    if (!entity.outerLoop) {
      return 0;
    }
    const discretePoints = entity.outerLoop.getDiscretePoints();
    return GeLib.PolygonUtils.getArea(discretePoints);
  },

  intersection(
    firstEntity: SketchEntity,
    secondEntity: SketchEntity,
    lengthTolerance: number = DEFAULT_LENGTH_TOLERANCE
  ): IntersectionResult {
    const firstCurves = firstEntity.curveInfos;
    const secondCurves = secondEntity.curveInfos;
    const firstClipFaces = firstEntity.clipFaces;
    const secondClipFaces = secondEntity.clipFaces;

    const { splitedCurves, otherSplitedCurves } = CurveInfoUtil.splitCurveInfos(
      firstCurves,
      secondCurves
    );

    const allSplitCurves = CurveInfoUtil.clearDuplicateCurves(
      splitedCurves.concat(otherSplitedCurves)
    );

    const ccwLoops = this.getCurveLoopFinder(allSplitCurves, lengthTolerance).getCCWLoops();

    let resultCurves: CurveInfo[] = [];
    const resultClipFaces: ClipFace[] = [];

    for (const loop of ccwLoops) {
      const loopClipFace = Util.getLoopClipFace(loop);
      const pointInPolygon = getPointInPolygonWithHoles(loopClipFace.outer, loopClipFace.holes);

      if (
        pointInPolygon &&
        Util.isPointInSideClipFaces(pointInPolygon, firstClipFaces) &&
        Util.isPointInSideClipFaces(pointInPolygon, secondClipFaces)
      ) {
        const loopsToProcess = [loop].concat(Array.from(loop.children));

        for (const currentLoop of loopsToProcess) {
          const boundCurves = currentLoop.boundEdgeIds.map(edgeId => allSplitCurves[edgeId]);
          resultCurves = resultCurves.concat(boundCurves);
        }

        resultClipFaces.push(loopClipFace);
      }
    }

    for (const curve of splitedCurves) {
      if (Util.isPointInSideClipFaces(curve.middle, secondClipFaces)) {
        resultCurves.push(curve);
      }
    }

    resultCurves = Array.from(new Set(resultCurves));

    return {
      curveInfos: resultCurves,
      clipFaces: resultClipFaces
    };
  },

  getCurveLoopFinder(
    curveInfos: CurveInfo[],
    lengthTolerance: number = DEFAULT_LENGTH_TOLERANCE
  ): any {
    const lineEdgePairs: EdgePair[] = [];
    const circleEdgePairs: EdgePair[] = [];
    const vertices: Point[] = [];

    function getOrCreateVertex(point: Point): Point {
      for (const vertex of vertices) {
        if (
          vertex === point ||
          HSCore.Util.Math.isSamePoint(vertex, point, lengthTolerance)
        ) {
          return vertex;
        }
      }

      point.id = vertices.length;
      vertices.push(point);
      return point;
    }

    for (let index = 0; index < curveInfos.length; index++) {
      const curveInfo = curveInfos[index];
      const threeCurve = curveInfo.threeCurve;
      const discretePoints = ThreeUtil.discreetPoints(threeCurve);
      const edgeId = index;

      if (curveInfo.type === HSConstants.ModelClass.Circle2d) {
        const forwardHalfEdge: HalfEdge = {
          edgeID: edgeId,
          partner: undefined,
          reversed: false,
          discretePts: discretePoints
        };

        const reverseHalfEdge: HalfEdge = {
          edgeID: edgeId,
          partner: undefined,
          reversed: true,
          discretePts: discretePoints.slice().reverse()
        };

        forwardHalfEdge.partner = reverseHalfEdge;
        reverseHalfEdge.partner = forwardHalfEdge;

        circleEdgePairs.push({
          halfEdge1: forwardHalfEdge,
          halfEdge2: reverseHalfEdge,
          curveInfo
        });
      } else {
        const startVertex = getOrCreateVertex(curveInfo.from);
        const endVertex = getOrCreateVertex(curveInfo.to);

        if (startVertex === endVertex) {
          continue;
        }

        const innerPoints = discretePoints.slice();
        if (innerPoints.length > 1) {
          innerPoints.splice(0, 1);
          innerPoints.splice(-1, 1);
        }

        const directionFromStart = HSCore.Util.Math.Vec2.difference(
          innerPoints.length > 0 ? innerPoints[0] : curveInfo.to,
          curveInfo.from
        );

        const directionToEnd = HSCore.Util.Math.Vec2.difference(
          curveInfo.to,
          innerPoints.length > 0 ? innerPoints[innerPoints.length - 1] : curveInfo.from
        );

        directionFromStart.normalize();
        directionToEnd.normalize();

        const forwardHalfEdge: HalfEdge = {
          from: startVertex,
          to: endVertex,
          edgeID: edgeId,
          directionF: directionFromStart,
          directionT: directionToEnd,
          reversed: false,
          partner: undefined,
          discretePts: innerPoints
        };

        const reverseHalfEdge: HalfEdge = {
          from: endVertex,
          to: startVertex,
          edgeID: edgeId,
          directionF: directionToEnd.clone().negate(),
          directionT: directionFromStart.clone().negate(),
          reversed: true,
          partner: undefined,
          discretePts: innerPoints.slice().reverse()
        };

        forwardHalfEdge.partner = reverseHalfEdge;
        reverseHalfEdge.partner = forwardHalfEdge;

        lineEdgePairs.push({
          halfEdge1: forwardHalfEdge,
          halfEdge2: reverseHalfEdge,
          curveInfo
        });
      }
    }

    return new HSCore.Util.Loop.LoopFinder(lineEdgePairs, circleEdgePairs);
  },

  getChildCurves(entity: SketchEntity): Curve2d[] {
    const curves = new Set<Curve2d>();

    entity.traverse(child => {
      if (child instanceof Curve2d) {
        curves.add(child);
      }
    });

    return Array.from(curves);
  },

  getChildPoint2d(entity: SketchEntity): Point2d[] {
    const points = new Set<Point2d>();

    entity.traverse(child => {
      if (child instanceof Point2d) {
        points.add(child);
      }
    });

    return Array.from(points);
  },

  getWireDiscretePoints(wire: Wire): Vector2D[] {
    let allPoints: Vector2D[] = [];

    for (const curve of wire.curves) {
      const isReversed = wire.isReversedCurve(curve);
      const curvePoints = Curve2dUtil.getCurveDiscretePoints(curve, isReversed);
      allPoints = allPoints.concat(curvePoints.slice(1));
    }

    return allPoints;
  },

  getDiscretePolygonWithHole(face: Face): ClipFace | undefined {
    const polygon: Partial<ClipFace> = {
      outer: undefined,
      holes: undefined
    };

    if (face.outerLoop) {
      polygon.outer = Util.getWireDiscretePoints(face.outerLoop);
    }

    if (face.innerLoops) {
      polygon.holes = face.innerLoops.map(Util.getWireDiscretePoints);
    }

    if (polygon.outer && polygon.holes) {
      return polygon as ClipFace;
    }

    return undefined;
  },

  getFaceInfoMap(entity: SketchEntity): Map<Face, ClipFace> {
    const faceMap = new Map<Face, ClipFace>();

    for (const face of entity.faces) {
      const discretePolygon = Util.getDiscretePolygonWithHole(face);
      if (discretePolygon) {
        faceMap.set(face, discretePolygon);
      }
    }

    return faceMap;
  },

  getCurveLoops(curves: Curve2d[]): any {
    const lineEdgePairs: EdgePair[] = [];
    const circleEdgePairs: EdgePair[] = [];

    for (const curve of curves) {
      const edgeId = curve.id;

      if (curve instanceof HSCore.Model.Circle2d) {
        const segmentOptions = {
          segments: Math.floor(CIRCLE_SEGMENTS_MULTIPLIER * curve.length)
        };

        const discretePoints = Curve2dUtil.getCurveDiscretePoints(curve, undefined, segmentOptions);

        const forwardHalfEdge: HalfEdge = {
          edgeID: edgeId,
          partner: undefined,
          reversed: false,
          discretePts: discretePoints
        };

        const reverseHalfEdge: HalfEdge = {
          edgeID: edgeId,
          partner: undefined,
          reversed: true,
          discretePts: discretePoints.slice().reverse()
        };

        forwardHalfEdge.partner = reverseHalfEdge;
        reverseHalfEdge.partner = forwardHalfEdge;

        circleEdgePairs.push({
          halfEdge1: forwardHalfEdge,
          halfEdge2: reverseHalfEdge,
          curve
        });
      } else {
        const startPoint = curve.start;
        const endPoint = curve.end;

        const segmentOptions = {
          segments: Math.floor(CIRCLE_SEGMENTS_MULTIPLIER * curve.length)
        };

        const discretePoints = Curve2dUtil.getCurveDiscretePoints(curve, undefined, segmentOptions);
        const innerPoints = discretePoints ? discretePoints.slice() : [];

        if (innerPoints.length > 1) {
          innerPoints.splice(0, 1);
          innerPoints.splice(-1, 1);
        }

        const directionFromStart = HSCore.Util.Math.Vec2.difference(
          innerPoints.length > 0 ? innerPoints[0] : endPoint,
          startPoint
        );

        const directionToEnd = HSCore.Util.Math.Vec2.difference(
          endPoint,
          innerPoints.length > 0 ? innerPoints[innerPoints.length - 1] : startPoint
        );

        directionFromStart.normalize();
        directionToEnd.normalize();

        const curveDirection = curve.direction;

        const forwardHalfEdge: HalfEdge = {
          from: startPoint,
          to: endPoint,
          edgeID: edgeId,
          directionF: directionFromStart,
          directionT: directionToEnd,
          direction: curveDirection,
          reversed: false,
          partner: undefined,
          discretePts: innerPoints
        };

        const reverseHalfEdge: HalfEdge = {
          from: endPoint,
          to: startPoint,
          edgeID: edgeId,
          directionF: directionToEnd.clone().negate(),
          directionT: directionFromStart.clone().negate(),
          direction: curveDirection.clone().negate(),
          reversed: true,
          partner: undefined,
          discretePts: innerPoints.slice().reverse()
        };

        forwardHalfEdge.partner = reverseHalfEdge;
        reverseHalfEdge.partner = forwardHalfEdge;

        lineEdgePairs.push({
          halfEdge1: forwardHalfEdge,
          halfEdge2: reverseHalfEdge,
          curve
        });
      }
    }

    return new HSCore.Util.Loop.LoopFinder(lineEdgePairs, circleEdgePairs);
  },

  isLoopMatchWire(loop: Loop, wire: Wire): boolean {
    const loopEdgeIds = loop.boundEdgeIds;
    const wireCurveIds = wire.curves.map(curve => curve.id);

    return HSCore.Util.Object.isSameArray(loopEdgeIds, wireCurveIds, false);
  },

  mapLoopWire(loops: Loop[], wires: Wire[]): Map<Loop, Wire> {
    const loopWireMap = new Map<Loop, Wire>();
    const remainingWires = new Set(wires);
    const remainingLoops = new Set(loops);

    for (const wire of remainingLoops) {
      for (const loop of remainingWires) {
        if (Util.isLoopMatchWire(wire, loop)) {
          loopWireMap.set(wire, loop);
          remainingWires.delete(loop);
          break;
        }
      }
    }

    return loopWireMap;
  },

  getLoopClipFace(loop: Loop): LoopClipFace {
    return {
      outer: loop.loopDiscretePoints,
      holes: Array.from(loop.children).map(child => child.loopDiscretePoints)
    };
  },

  getClipFaceOverlapArea(firstClipFace: ClipFace, secondClipFace: ClipFace): number {
    return HSCore.Util.Collision.overlapArea(firstClipFace, secondClipFace);
  },

  isPointInSideClipFaces(
    point: Vector2D,
    clipFaces: ClipFace[],
    usePreciseCheck: boolean = false,
    lengthTolerance: number = DEFAULT_LENGTH_TOLERANCE
  ): boolean {
    if (usePreciseCheck) {
      return clipFaces.some(clipFace =>
        HSCore.Util.Math.isPointInPolygonWithHoles(
          point,
          clipFace.outer,
          clipFace.holes,
          true,
          lengthTolerance
        )
      );
    } else {
      return clipFaces.some(clipFace =>
        HSCore.Util.Math.isPointInPolygonWithHolesFast(point, clipFace.outer, clipFace.holes)
      );
    }
  },

  getClonedDumpData(entity: SketchEntity): ClonedDumpData {
    const productsMap = new Map();
    const materialsData = new Map();

    const dumps = entity.dump(undefined, true, {
      materialsData,
      productsMap
    });

    const idMap = new Map();

    const context: DumpContext = {
      data: {},
      materialsData,
      states: {},
      constraints: {},
      entities: {},
      materials: new Map(),
      productsMap,
      idGenerator: EntityUtil.createIDGeneratorForClone(
        idMap,
        HSCore.Util.IDGeneratorType.Entity
      ),
      options: {
        ignorePattern: true
      }
    };

    dumps.forEach(dump => {
      context.data[dump.id] = dump;
    });

    return {
      dumps,
      context
    };
  }
};