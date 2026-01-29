import { HSCore } from './HSCore';
import { Line2d, Loop, Arc2d } from './GeometryTypes';

type Point2d = unknown;

interface CurveWrapper {
  curve: Line2d | Arc2d;
}

interface Region {
  outer: CurveWrapper[];
  holes: unknown[];
  topo?: string;
}

interface BackgroundRegion {
  outer: (Line2d | Arc2d)[];
  holes: unknown[];
}

interface SketchFaceInfo {
  face: {
    topos: string[];
  };
  isOuter: boolean;
  wire: {
    coedges: Array<{
      edge: {
        curve: {
          from: Point2d;
          to: Point2d;
          containsPoint(point: Point2d): boolean;
        } & (Line2d | Arc2d);
      };
      isRev: boolean;
      toMathCurve(): Line2d | Arc2d;
    }>;
  };
}

interface Edge {
  curve: {
    containsPoint(point: Point2d): boolean;
  };
  isBackground?: boolean;
}

interface Sketch2d {
  background: {
    regions: BackgroundRegion[];
  };
}

interface Sketch2dBuilder {
  getSketch(): Sketch2d;
  removeFaces(faces: unknown[]): void;
  changeBackground(background: HSCore.Model.ExtraordinaryBackground): void;
  addRegions(regions: Region[]): void;
  updateAppendix(): void;
  updateSketch2d(): void;
}

export class DeleteVertexRequest extends HSCore.Transaction.Common.StateRequest {
  private sketch2dBuilder: Sketch2dBuilder;
  private vertex: Point2d;

  constructor(sketch2dBuilder: Sketch2dBuilder, vertex: Point2d) {
    super();
    this.sketch2dBuilder = sketch2dBuilder;
    this.vertex = vertex;
  }

  onCommit(): void {
    const sketch = this.sketch2dBuilder.getSketch();
    const facesToRemove = new Set<unknown>();
    const newRegions: Region[] = [];
    const newBackgroundRegions: Loop[] = [];
    const connectedEdges = HSCore.Util.ExtraordinarySketch2d.getConnectedEdgesByExPoint(
      sketch,
      this.vertex
    );

    this._handleHoles(connectedEdges, sketch, facesToRemove, newRegions);
    this._handleBackground(connectedEdges, sketch, newBackgroundRegions);

    this.sketch2dBuilder.removeFaces(Array.from(facesToRemove));

    if (newBackgroundRegions.length > 0) {
      const background = new HSCore.Model.ExtraordinaryBackground(
        newBackgroundRegions.map((loop) => ({
          outer: loop.getAllCurves(),
          holes: [],
        }))
      );
      this.sketch2dBuilder.changeBackground(background);
    }

    this.sketch2dBuilder.addRegions(newRegions);
    this.sketch2dBuilder.updateAppendix();
    super.onCommit([]);
  }

  private _handleHoles(
    edges: Edge[],
    sketch: Sketch2d,
    facesToRemove: Set<unknown>,
    newRegions: Region[]
  ): void {
    const processedFaces = new Set<unknown>();

    edges.forEach((edge) => {
      const sketchFaces = HSCore.Util.ExtraordinarySketch2d.getSketchFacesByEdge(edge, sketch);

      sketchFaces.forEach((faceInfo: SketchFaceInfo) => {
        if (!faceInfo.isOuter || processedFaces.has(faceInfo.face)) {
          return;
        }

        if (!faceInfo.face.topos.includes(HSCore.Model.LayerSketch2dBuilder.HoleTopoTag)) {
          return;
        }

        facesToRemove.add(faceInfo.face);

        // Skip triangle with all straight edges
        if (
          faceInfo.wire.coedges.length === 3 &&
          faceInfo.wire.coedges.every(
            (coedge) => coedge.edge.curve instanceof HSCore.Model.ExtraordinaryLine2d
          )
        ) {
          return;
        }

        // Skip two-edge wire with all circular arcs
        if (
          faceInfo.wire.coedges.length === 2 &&
          faceInfo.wire.coedges.every(
            (coedge) => coedge.edge.curve instanceof HSCore.Model.ExtraordinaryCircleArc2d
          )
        ) {
          return;
        }

        const newCurves: CurveWrapper[] = [];
        let skipNext = false;

        faceInfo.wire.coedges.forEach((coedge, index) => {
          const isLastEdge = index === faceInfo.wire.coedges.length - 1;

          if (
            (skipNext && isLastEdge) ||
            coedge.edge.curve instanceof HSCore.Model.ExtraordinaryCircle2d
          ) {
            return;
          }

          const curve = coedge.edge.curve;
          const startPoint = coedge.isRev ? curve.to : curve.from;
          const endPoint = coedge.isRev ? curve.from : curve.to;

          if (startPoint === this.vertex) {
            let previousCoedge;
            if (index === 0) {
              previousCoedge = faceInfo.wire.coedges[faceInfo.wire.coedges.length - 1];
              skipNext = true;
            } else {
              previousCoedge = faceInfo.wire.coedges[index - 1];
              newCurves.pop();
            }

            const prevCurve = previousCoedge.edge.curve;
            const prevStart = previousCoedge.isRev ? prevCurve.to : prevCurve.from;
            const newLine = new Line2d(prevStart, endPoint);
            newCurves.push({ curve: newLine });
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
            topo: `-1_${faceInfo.face.topos.length ? faceInfo.face.topos.join(':') : undefined}`,
          });
        });

        processedFaces.add(faceInfo.face);
      });
    });
  }

  private _handleBackground(edges: Edge[], sketch: Sketch2d, newBackgroundRegions: Loop[]): void {
    if (!edges.some((edge) => edge.isBackground)) {
      return;
    }

    const unionRegions: BackgroundRegion[] = [];

    sketch.background.regions.forEach((region) => {
      if (!region.outer.some((curve) => curve.containsPoint(this.vertex))) {
        unionRegions.push(region);
        return;
      }

      // Skip triangle with all straight edges
      if (
        region.outer.length === 3 &&
        region.outer.every((curve) => curve instanceof Line2d)
      ) {
        unionRegions.push(region);
        return;
      }

      const processedCurves: (Line2d | Arc2d)[] = [];

      region.outer.forEach((curve, index) => {
        if (!curve.containsPoint(this.vertex)) {
          processedCurves.push(curve);
          return;
        }

        if (curve.getStartPt().equals(this.vertex)) {
          return;
        }

        if (curve.getEndPt().equals(this.vertex)) {
          const nextCurve =
            index === region.outer.length - 1 ? region.outer[0] : region.outer[index + 1];
          const newLine = new Line2d(curve.getStartPt(), nextCurve.getEndPt());
          processedCurves.push(newLine);
        } else if (curve instanceof Line2d) {
          processedCurves.push(curve);
        } else if (curve instanceof Arc2d) {
          if (curve.isClosed()) {
            processedCurves.push(curve);
          } else {
            processedCurves.push(new Line2d(curve.getStartPt(), curve.getEndPt()));
          }
        } else {
          console.assert(false, 'slabedit: background contains no supported curve type!');
          processedCurves.push(curve);
        }
      });

      const loop = new Loop(processedCurves);
      let finalLoops: (Line2d | Arc2d)[][] = [loop.getAllCurves()];

      if (!loop.isValid()) {
        finalLoops = this._simplifyLoop(loop);
      }

      finalLoops.forEach((curves) => {
        unionRegions.push({
          outer: curves,
          holes: [],
        });
      });
    });

    const unionResult = HSCore.Model.ExtraordinarySketch2dBuilder.PolygonTool().union(
      unionRegions.map((region) => region.outer)
    );

    unionResult.forEach((result: (Line2d | Arc2d)[][]) => {
      newBackgroundRegions.push(new Loop(result[0]));
    });
  }

  private _simplifyLoop(loop: Loop): (Line2d | Arc2d)[][] {
    const curveWrappers = loop.getAllCurves().map((curve) => ({ curve }));
    const TOLERANCE = 1e-6;
    const exboolResult = HSCore.Model.ExtraordinarySketch2dBuilder.PolygonTool().exbool(
      curveWrappers,
      TOLERANCE,
      {
        clean: 1,
        scaleFix: 0,
      }
    );

    const simplifiedLoops: (Line2d | Arc2d)[][] = [];

    exboolResult.root.holes.forEach((hole: Array<{ edge: { curve: Line2d | Arc2d }; isRev: boolean }>) => {
      const curves: (Line2d | Arc2d)[] = [];
      hole.forEach((item) => {
        curves.push(item.isRev ? item.edge.curve : item.edge.curve.reversed());
      });
      simplifiedLoops.push(curves);
    });

    return simplifiedLoops;
  }

  onUndo(): void {
    super.onUndo([]);
    this.sketch2dBuilder.updateSketch2d();
  }

  onRedo(): void {
    super.onRedo([]);
    this.sketch2dBuilder.updateSketch2d();
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return '楼板编辑删除顶点';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.SlabEdit;
  }
}