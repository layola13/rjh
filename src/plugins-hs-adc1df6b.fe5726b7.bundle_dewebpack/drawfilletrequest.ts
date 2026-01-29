import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { Line2d, PolyCurve, MathAlg } from './MathGeometry';
import { HSFPConstants } from './Constants';

interface FilletEdge {
  edge1: SketchEdge;
  edge2: SketchEdge;
  filletArc: Arc2d;
}

interface SketchEdge {
  curve: Curve2d;
  isBackground: boolean;
}

interface Arc2d {
  getEndPt(): Point2d;
  getStartPt(): Point2d;
}

interface Point2d {
  x: number;
  y: number;
}

interface Curve2d {}

interface Region {
  outer: Array<{ curve: Curve2d }>;
  holes: Array<any>;
  topo: string;
}

interface Sketch2dBuilder {
  addRegions(regions: Region[]): void;
  getSketch(): Sketch | null;
  updateAppendix(): void;
}

interface Sketch {}

interface SketchFace {
  face: {
    topoName?: string;
  };
  wire: {
    toMathLoop(): PolyCurve;
  };
  isOuter: boolean;
}

export class DrawFilletRequest extends HSApp.ExtraordinarySketch2d.Request.DrawFilletRequest {
  private sketch2dBuilder: Sketch2dBuilder;

  constructor(
    sketch2dBuilder: Sketch2dBuilder,
    param2: unknown,
    param3: unknown
  ) {
    super(sketch2dBuilder, param2, param3);
    this.sketch2dBuilder = sketch2dBuilder;
  }

  /**
   * Add fillet arcs to the sketch
   * @param filletEdges - Array of fillet edge configurations
   */
  addFilletArcs(filletEdges: FilletEdge[]): void {
    const regions = filletEdges.map((filletEdge) => {
      const { edge1, edge2, filletArc } = filletEdge;
      const curve1 = edge1.curve;
      const curve2 = edge2.curve;
      
      const intersectionPoint = HSApp.ExtraordinarySketch2d.Util.getThreePtsFromTwoLines(
        curve1,
        curve2
      ).ptA;

      return {
        outer: [
          { curve: new Line2d(filletArc.getEndPt(), intersectionPoint) },
          { curve: new Line2d(intersectionPoint, filletArc.getStartPt()) },
          { curve: filletArc }
        ],
        holes: [],
        topo: `-1_${HSCore.Model.OutdoorDrawingSketch2dBuilder.FaceTopoTag}`
      };
    });

    this.sketch2dBuilder.addRegions(regions);
  }

  /**
   * Determine if a fillet face needs to be removed
   * @param edge1 - First sketch edge
   * @param edge2 - Second sketch edge
   * @param filletArc - The fillet arc curve
   * @returns True if the face should be removed
   */
  needRemoveFilletFace(
    edge1: SketchEdge,
    edge2: SketchEdge,
    filletArc: Arc2d
  ): boolean {
    if (edge1.isBackground || edge2.isBackground) {
      return false;
    }

    const sketch = this.sketch2dBuilder.getSketch();
    if (!sketch) {
      return true;
    }

    const facesFromEdge1 = HSCore.Util.ExtraordinarySketch2d.getSketchFacesByEdge(edge1, sketch);
    const facesFromEdge2 = HSCore.Util.ExtraordinarySketch2d.getSketchFacesByEdge(edge2, sketch);

    const namedFaceFromEdge1 = facesFromEdge1.find((item) => item.face.topoName);
    const namedFaceFromEdge2 = facesFromEdge2.find((item) => item.face.topoName);

    if (namedFaceFromEdge1 && namedFaceFromEdge2) {
      const mathLoop = namedFaceFromEdge1.wire.toMathLoop();
      const filletPolyCurve = new PolyCurve([filletArc]);
      const intersections = MathAlg.BoolOperate2d.polylineIntersect(
        filletPolyCurve,
        [mathLoop],
        false
      );

      return !!(intersections && intersections.length);
    }

    const hasInnerFaceFromEdge1 = facesFromEdge1.find((item) => !item.isOuter);
    const hasInnerFaceFromEdge2 = facesFromEdge2.find((item) => !item.isOuter);

    return !(!hasInnerFaceFromEdge1 || !hasInnerFaceFromEdge2);
  }

  /**
   * Execute the draw fillet request
   */
  doRequest(): void {
    super.doRequest([]);
    this.sketch2dBuilder.updateAppendix();
  }

  /**
   * Get description for logging
   * @returns Description string
   */
  getDescription(): string {
    return '外部区域绘制-倒角';
  }

  /**
   * Get log category
   * @returns Log group type
   */
  getCategory(): string {
    return HSFPConstants.LogGroupTypes.OutdoorDrawing;
  }
}