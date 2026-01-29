import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { Line2d, PolyCurve, MathAlg } from './MathGeometry';
import { HSFPConstants } from './HSFPConstants';

interface FilletArcData {
  edge1: SketchEdge;
  edge2: SketchEdge;
  filletArc: Arc2d;
}

interface SketchEdge {
  curve: Curve2d;
  isBackground: boolean;
}

interface Curve2d {
  // Base curve interface
}

interface Arc2d extends Curve2d {
  getEndPt(): Point2d;
  getStartPt(): Point2d;
}

interface Point2d {
  x: number;
  y: number;
}

interface RegionData {
  outer: Array<{ curve: Curve2d }>;
  holes: unknown[];
  topo: string;
}

interface SketchFaceInfo {
  face: SketchFace;
  wire: SketchWire;
  isOuter: boolean;
}

interface SketchFace {
  topoName?: string;
}

interface SketchWire {
  toMathLoop(): PolyCurve;
}

interface Sketch2d {
  // Sketch interface
}

export class DrawFilletRequest extends HSApp.ExtraordinarySketch2d.Request.DrawFilletRequest {
  private sketch2dBuilder: any;

  constructor(
    sketch2dBuilder: any,
    param2: unknown,
    param3: unknown
  ) {
    super(sketch2dBuilder, param2, param3);
    this.sketch2dBuilder = sketch2dBuilder;
  }

  /**
   * Adds fillet arcs to the sketch by creating regions from edge pairs and their fillet arcs
   */
  addFilletArcs(filletData: FilletArcData[]): void {
    const regions = filletData.map((data) => {
      const { edge1, edge2, filletArc } = data;
      const curve1 = edge1.curve;
      const curve2 = edge2.curve;
      
      const cornerPoint = HSApp.ExtraordinarySketch2d.Util.getThreePtsFromTwoLines(
        curve1,
        curve2
      ).ptA;

      return {
        outer: [
          { curve: new Line2d(filletArc.getEndPt(), cornerPoint) },
          { curve: new Line2d(cornerPoint, filletArc.getStartPt()) },
          { curve: filletArc }
        ],
        holes: [],
        topo: `-1_${HSCore.Model.LayerSketch2dBuilder.HoleTopoTag}`
      } as RegionData;
    });

    this.sketch2dBuilder.addRegions(regions);
  }

  /**
   * Determines if fillet face should be removed based on edge properties and topology
   */
  needRemoveFilletFace(edge1: SketchEdge, edge2: SketchEdge, filletCurve: Curve2d): boolean {
    if (edge1.isBackground || edge2.isBackground) {
      return false;
    }

    const sketch = this.sketch2dBuilder.getSketch() as Sketch2d | null;
    if (!sketch) {
      return true;
    }

    const edge1Faces = HSCore.Util.ExtraordinarySketch2d.getSketchFacesByEdge(edge1, sketch);
    const edge2Faces = HSCore.Util.ExtraordinarySketch2d.getSketchFacesByEdge(edge2, sketch);

    const edge1HasUnnamedFace = edge1Faces.find((faceInfo) => !faceInfo.face.topoName);
    const edge2HasUnnamedFace = edge2Faces.find((faceInfo) => !faceInfo.face.topoName);

    if (edge1HasUnnamedFace && edge2HasUnnamedFace) {
      const namedFaceInfo = edge1Faces.find((faceInfo) => faceInfo.face.topoName);
      if (!namedFaceInfo) {
        return false;
      }

      const mathLoop = namedFaceInfo.wire.toMathLoop();
      const filletPolyCurve = new PolyCurve([filletCurve]);
      const intersections = MathAlg.BoolOperate2d.polylineIntersect(
        filletPolyCurve,
        [mathLoop],
        false
      );

      return !!(intersections && intersections.length);
    }

    const edge1HasInnerFace = edge1Faces.find((faceInfo) => !faceInfo.isOuter);
    const edge2HasInnerFace = edge2Faces.find((faceInfo) => !faceInfo.isOuter);

    return !(edge1HasInnerFace && edge2HasInnerFace);
  }

  /**
   * Executes the fillet request and updates the sketch layer
   */
  doRequest(): void {
    super.doRequest();
    this.sketch2dBuilder.updateLayer();
  }

  /**
   * Returns human-readable description of this operation
   */
  getDescription(): string {
    return "楼板编辑倒角";
  }

  /**
   * Returns the log category for this operation
   */
  getCategory(): string {
    return HSFPConstants.LogGroupTypes.SlabEdit;
  }
}