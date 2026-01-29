import { HSCore } from './HSCore';
import { Line2d, Loop, Arc2d } from './MathGeometry';

type CurveWrapper = {
  curve: Line2d | Arc2d;
};

type Region = {
  outer: CurveWrapper[];
  holes: CurveWrapper[][];
  topo?: string;
};

type BackgroundRegion = {
  outer: (Line2d | Arc2d)[];
  holes: (Line2d | Arc2d)[][];
};

type SketchFaceResult = {
  face: HSCore.Model.Face;
  wire: HSCore.Model.Wire;
  isOuter: boolean;
};

export class DeleteVertexRequest extends HSCore.Transaction.Common.StateRequest {
  private sketch2dBuilder: HSCore.Model.ExtraordinarySketch2dBuilder;
  private vertex: HSCore.Model.Point2d;

  constructor(
    sketch2dBuilder: HSCore.Model.ExtraordinarySketch2dBuilder,
    vertex: HSCore.Model.Point2d
  ) {
    super();
    this.sketch2dBuilder = sketch2dBuilder;
    this.vertex = vertex;
  }

  onCommit(): void {
    const sketch = this.sketch2dBuilder.getSketch();
    const facesToRemove = new Set<HSCore.Model.Face>();
    const newRegions: Region[] = [];
    const newBackgroundLoops: Loop[] = [];
    const connectedEdges = HSCore.Util.ExtraordinarySketch2d.getConnectedEdgesByExPoint(
      sketch,
      this.vertex
    );

    this._handleHoles(connectedEdges, sketch, facesToRemove, newRegions);
    this._handleBackground(connectedEdges, sketch, newBackgroundLoops);

    this.sketch2dBuilder.removeFaces(Array.from(facesToRemove));

    if (newBackgroundLoops.length > 0) {
      const newBackground = new HSCore.Model.ExtraordinaryBackground(
        newBackgroundLoops.map((loop) => ({
          outer: loop.getAllCurves(),
          holes: [],
        }))
      );
      this.sketch2dBuilder.changeBackground(newBackground);
    }

    this.sketch2dBuilder.addRegions(newRegions);
    this.sketch2dBuilder.updateAppendix();
    super.onCommit();
  }

  private _handleHoles(
    edges: HSCore.Model.Edge[],
    sketch: HSCore.Model.Sketch2d,
    facesToRemove: Set<HSCore.Model.Face>,
    newRegions: Region[]
  ): void {
    const processedFaces = new Set<HSCore.Model.Face>();

    edges.forEach((edge) => {
      const sketchFaces = HSCore.Util.ExtraordinarySketch2d.getSketchFacesByEdge(edge, sketch);

      sketchFaces.forEach((faceResult: SketchFaceResult) => {
        if (!faceResult.isOuter || processedFaces.has(faceResult.face)) {
          return;
        }

        if (!faceResult.face.topos.includes(HSCore.Model.OutdoorDrawingSketch2dBuilder.FaceTopoTag)) {
          processedFaces.add(faceResult.face);
          return;
        }

        facesToRemove.add(faceResult.face);

        // Skip simple triangles with all straight lines
        if (
          faceResult.wire.coedges.length === 3 &&
          faceResult.wire.coedges.every(
            (coedge) => coedge.edge.curve instanceof HSCore.Model.ExtraordinaryLine2d
          )
        ) {
          return;
        }

        // Skip two-segment circular arcs
        if (
          faceResult.wire.coedges.length === 2 &&
          faceResult.wire.coedges.every(
            (coedge) => coedge.edge.curve instanceof HSCore.Model.ExtraordinaryCircleArc2d
          )
        ) {
          return;
        }

        const newCurves: CurveWrapper[] = [];
        let skipNext = false;

        faceResult.wire.coedges.forEach((coedge, index) => {
          const isLastCoedge = index === faceResult.wire.coedges.length - 1;

          if ((skipNext && isLastCoedge) || coedge.edge.curve instanceof HSCore.Model.ExtraordinaryCircle2d) {
            return;
          }

          const curve = coedge.edge.curve;
          const startPoint = coedge.isRev ? curve.to : curve.from;
          const endPoint = coedge.isRev ? curve.from : curve.to;

          if (startPoint === this.vertex) {
            let previousCoedge: HSCore.Model.Coedge;

            if (index === 0) {
              previousCoedge = faceResult.wire.coedges[faceResult.wire.coedges.length - 1];
              skipNext = true;
            } else {
              previousCoedge = faceResult.wire.coedges[index - 1];
              newCurves.pop();
            }

            const prevCurve = previousCoedge.edge.curve;
            const prevStartPoint = previousCoedge.isRev ? prevCurve.to : prevCurve.from;
            const bridgeLine = new Line2d(prevStartPoint, endPoint);

            newCurves.push({ curve: bridgeLine });
          } else {
            const mathCurve = coedge.toMathCurve();
            newCurves.push({ curve: mathCurve });
          }
        });

        const loop = new Loop(newCurves.map((wrapper) => wrapper.curve));
        let finalLoops: (Line2d | Arc2d)[][] = [loop.getAllCurves()];

        if (!loop.isValid()) {
          finalLoops = this._simplifyLoop(loop);
        }

        finalLoops.forEach((curves) => {
          newRegions.push({
            outer: curves.map((curve) => ({ curve })),
            holes: [],
            topo: `-1_${faceResult.face.topos.length ? faceResult.face.topos.join(':') : undefined}`,
          });
        });

        processedFaces.add(faceResult.face);
      });
    });
  }

  private _handleBackground(
    edges: HSCore.Model.Edge[],
    sketch: HSCore.Model.Sketch2d,
    newBackgroundLoops: Loop[]
  ): void {
    const hasBackgroundEdge = edges.some((edge) => edge.isBackground);

    if (!hasBackgroundEdge) {
      return;
    }

    const processedRegions: BackgroundRegion[] = [];

    sketch.background.regions.forEach((region) => {
      const containsVertex = region.outer.some((curve) => curve.containsPoint(this.vertex));

      if (!containsVertex) {
        processedRegions.push(region);
        return;
      }

      // Skip simple triangles
      if (region.outer.length === 3 && region.outer.every((curve) => curve instanceof Line2d)) {
        processedRegions.push(region);
        return;
      }

      const newOuterCurves: (Line2d | Arc2d)[] = [];

      region.outer.forEach((curve, curveIndex) => {
        if (!curve.containsPoint(this.vertex)) {
          newOuterCurves.push(curve);
          return;
        }

        if (curve.getStartPt().equals(this.vertex)) {
          return;
        }

        if (curve.getEndPt().equals(this.vertex)) {
          const nextCurve = curveIndex === region.outer.length - 1 ? region.outer[0] : region.outer[curveIndex + 1];
          const bridgeLine = new Line2d(curve.getStartPt(), nextCurve.getEndPt());
          newOuterCurves.push(bridgeLine);
          return;
        }

        if (curve instanceof Line2d) {
          newOuterCurves.push(curve);
        } else if (curve instanceof Arc2d) {
          if (curve.isClosed()) {
            newOuterCurves.push(curve);
          } else {
            newOuterCurves.push(new Line2d(curve.getStartPt(), curve.getEndPt()));
          }
        } else {
          console.assert(false, 'slabedit: background contains no supported curve type!');
          newOuterCurves.push(curve);
        }
      });

      const loop = new Loop(newOuterCurves);
      let finalLoops: (Line2d | Arc2d)[][] = [loop.getAllCurves()];

      if (!loop.isValid()) {
        finalLoops = this._simplifyLoop(loop);
      }

      finalLoops.forEach((curves) => {
        processedRegions.push({
          outer: curves,
          holes: [],
        });
      });
    });

    const unionResult = HSCore.Model.ExtraordinarySketch2dBuilder.PolygonTool().union(
      processedRegions.map((region) => region.outer)
    );

    unionResult.forEach((result) => {
      newBackgroundLoops.push(new Loop(result[0]));
    });
  }

  private _simplifyLoop(loop: Loop): (Line2d | Arc2d)[][] {
    const curveWrappers = loop.getAllCurves().map((curve) => ({ curve }));
    const TOLERANCE = 1e-6;
    const boolResult = HSCore.Model.ExtraordinarySketch2dBuilder.PolygonTool().exbool(
      curveWrappers,
      TOLERANCE,
      { clean: 1, scaleFix: 0 }
    );

    const simplifiedLoops: (Line2d | Arc2d)[][] = [];

    boolResult.root.holes.forEach((hole) => {
      const holeCurves: (Line2d | Arc2d)[] = [];

      hole.forEach((coedge) => {
        const curve = coedge.isRev ? coedge.edge.curve : coedge.edge.curve.reversed();
        holeCurves.push(curve);
      });

      simplifiedLoops.push(holeCurves);
    });

    return simplifiedLoops;
  }

  onUndo(): void {
    super.onUndo();
    this.sketch2dBuilder.updateSketch2d();
  }

  onRedo(): void {
    super.onRedo();
    this.sketch2dBuilder.updateSketch2d();
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return '外部区域绘制-删除顶点';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.OutdoorDrawing;
  }
}