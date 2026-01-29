import { Line2d, MathAlg } from './math-module';
import { HSCore } from './hs-core-module';

interface Sketch {
  background: {
    regions: Region[];
  };
}

interface Region {
  outer: Curve[];
}

interface Curve {
  containsPoint(point: Point): boolean;
  toMathCurve(): MathCurve;
}

interface MathCurve {
  getStartPt(): Point;
  getEndPt(): Point;
}

interface Point {
  equals(other: Point): boolean;
}

interface Edge {
  isBackground: boolean;
  curve: Curve;
}

interface Face {
  parent: unknown;
  worldRawPath2d: Path2d;
}

interface Path2d {
  outer: Curve[];
  holes: Curve[][];
}

interface SketchContainer {
  getSketch(): Sketch;
}

interface Layer {
  slabBuilder: {
    getGlobalPaths(): Path2d[];
  };
  forEachFloor(callback: (floor: Face) => void): void;
}

interface Scene {
  rootLayer: Layer;
  outdoorLayer: Layer;
}

export class OutdoorDrawingUtil {
  /**
   * Determines if a vertex can be deleted from the sketch
   * @param container - The sketch container
   * @param point - The point to check for deletion
   * @returns True if the vertex can be deleted, false otherwise
   */
  static couldDeleteVertex(container: SketchContainer, point: Point): boolean {
    const sketch = container.getSketch();
    const connectedEdges = HSCore.Util.ExtraordinarySketch2d.getConnectedEdgesByExPoint(sketch, point);

    if (connectedEdges.every((edge: Edge) => edge.isBackground)) {
      const region = sketch.background.regions.find((region: Region) =>
        region.outer.some((curve: Curve) => curve.containsPoint(point))
      );

      if (region && region.outer.length === 3 && 
          region.outer.every((curve: Curve) => curve instanceof Line2d) &&
          region.outer.some((curve: Curve) => curve.toMathCurve().getStartPt().equals(point))) {
        return false;
      }
    }

    return true;
  }

  /**
   * Determines if a face can be deleted from the sketch
   * @param container - The sketch container
   * @param face - The face to check for deletion
   * @returns True if the face can be deleted, false otherwise
   */
  static couldDeleteFace(container: SketchContainer, face: Face): boolean {
    const sketch = container.getSketch();
    const edges = HSCore.Util.ExtraordinarySketch2d.getAllEdgesFromFaces([face], true);
    const globalPaths = HSCore.Doc.getDocManager().activeDocument.scene.rootLayer.slabBuilder.getGlobalPaths();

    return edges.some((edge: Edge) => {
      const facesWithEdge = HSCore.Util.ExtraordinarySketch2d.getSketchFacesByEdge(edge, sketch);
      if (facesWithEdge.length > 1) {
        return false;
      }

      const mathCurve = edge.curve.toMathCurve();
      const startPoint = mathCurve.getStartPt();
      const endPoint = mathCurve.getEndPt();

      return !globalPaths.some((path: Path2d) =>
        path.outer.some((curve: Curve) => {
          const overlapType = MathAlg.PositionJudge.curveCurveOverlap(mathCurve, curve);
          return overlapType === MathAlg.CurveCuvePositonType.TOTALLY_OVERLAP ||
                 (overlapType === MathAlg.CurveCuvePositonType.OVERLAP &&
                  curve.containsPoint(startPoint) &&
                  curve.containsPoint(endPoint));
        })
      );
    });
  }

  /**
   * Determines if an outdoor face can be deleted
   * @param face - The outdoor face to check for deletion
   * @returns True if the outdoor face can be deleted, false otherwise
   */
  static couldDeleteOutdoorFace(face: Face): boolean {
    const scene: Scene = HSCore.Doc.getDocManager().activeDocument.scene;
    const rootLayer = scene.rootLayer;
    const outdoorLayer = scene.outdoorLayer;

    if (face.parent !== outdoorLayer) {
      return true;
    }

    const outerPath = face.worldRawPath2d.outer;
    const globalPaths = rootLayer.slabBuilder.getGlobalPaths();
    const otherFloorPaths: Path2d[] = [];

    outdoorLayer.forEachFloor((floor: Face) => {
      if (floor !== face) {
        otherFloorPaths.push(floor.worldRawPath2d);
      }
    });

    const isEdgeOverlapping = (curves: Curve[], targetCurve: Curve): boolean => {
      const startPoint = targetCurve.toMathCurve().getStartPt();
      const endPoint = targetCurve.toMathCurve().getEndPt();

      return curves.some((curve: Curve) => {
        const overlapType = MathAlg.PositionJudge.curveCurveOverlap(targetCurve.toMathCurve(), curve.toMathCurve());
        return overlapType === MathAlg.CurveCuvePositonType.TOTALLY_OVERLAP ||
               (overlapType === MathAlg.CurveCuvePositonType.OVERLAP &&
                curve.containsPoint(startPoint) &&
                curve.containsPoint(endPoint));
      });
    };

    return !outerPath.every((edge: Curve) => {
      const hasGlobalPathOverlap = globalPaths.some((path: Path2d) =>
        isEdgeOverlapping(path.outer, edge)
      );

      if (hasGlobalPathOverlap) {
        return true;
      }

      return otherFloorPaths.some((path: Path2d) =>
        isEdgeOverlapping(path.outer, edge) ||
        path.holes.some((hole: Curve[]) => isEdgeOverlapping(hole, edge))
      );
    });
  }
}