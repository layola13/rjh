import { Point2d } from './Point2d';
import { Line2d } from './Line2d';
import { Circle2d } from './Circle2d';
import { CircleArc2d } from './CircleArc2d';
import { Wire } from './Wire';
import { Face2d } from './Face2d';
import { Background } from './Background';
import { Polygon2d, PolyCurve2d, LineSegment2d, Arc2d } from './Polygon2d';
import { BuildingTolerance, ServiceManager, ClipMode } from './ServiceManager';
import { Tolerance, EN_GEO_ELEMENT_TYPE, MathUtil } from './MathUtil';
import { Logger } from './Logger';

interface Curve2d {
  getType(): EN_GEO_ELEMENT_TYPE;
  getStartPt(): Point2d;
  getEndPt(): Point2d;
}

interface Arc2dCurve extends Curve2d {
  getCenter(): Point2d;
  getRadius(): number;
  isCCW(): boolean;
}

interface Region {
  path: Path;
  id?: string;
}

interface Path {
  outer: Curve2d[];
  holes?: Curve2d[][];
}

interface MixPave {
  regions: Region[];
}

interface Sketch {
  background: Background;
  idMap?: Map<string, string>;
  removeAllFaces(shouldUpdate: boolean): void;
  addChild(faces: Face2d[], shouldUpdate: boolean): void;
  createBuilder(): SketchBuilder;
}

interface SketchBuilder {
  updateFlagByBackground(background: Background): void;
}

export class ToSketchConvertor {
  private readonly _tolerance: number;
  private readonly _points: Point2d[];
  private readonly _lines: Line2d[];
  private readonly _circles: Circle2d[];
  private readonly _arcs: CircleArc2d[];

  constructor() {
    this._tolerance = BuildingTolerance;
    this._points = [];
    this._lines = [];
    this._circles = [];
    this._arcs = [];
  }

  /**
   * Converts a MixPave to a Sketch
   */
  static fromMixPaveToSketch(mixPave: MixPave, sketch: Sketch, shouldUpdate: boolean = false): void {
    const convertor = new ToSketchConvertor();
    const idMap = new Map<string, string>();
    const faces = convertor.toFaces(mixPave.regions);

    faces.forEach((face, index) => {
      const regionId = ServiceManager.getMixPaveService().getRegionId(mixPave.regions[index]);
      idMap.set(face.id, regionId);
    });

    sketch.removeAllFaces(shouldUpdate);
    sketch.addChild(faces, shouldUpdate);
    sketch.idMap = idMap;

    const background = convertor.fromRegionsToBackground(mixPave.regions, sketch.background.clone());
    sketch.createBuilder().updateFlagByBackground(background);
    sketch.background = background;
  }

  /**
   * Converts a Path to a Background
   */
  static fromPathToBackground(path: Path): Background {
    const convertor = new ToSketchConvertor();
    const background = new Background();
    const polygon = new Polygon2d();

    background.regions.push(polygon);
    convertor._fromCurvesToPolyCurve(path.outer, polygon.outer);

    if (path.holes) {
      path.holes.forEach((hole) => {
        const polyCurve = new PolyCurve2d();
        convertor._fromCurvesToPolyCurve(hole, polyCurve);
        polygon.holes.push(polyCurve);
      });
    }

    return background;
  }

  /**
   * Merges background with other MixPaves
   */
  static mergeBackgroundWithOtherMixPaves(baseMixPave: MixPave, otherMixPaves: MixPave[], background: Background): void {
    const allRegions = baseMixPave.regions;

    otherMixPaves.forEach((mixPave) => {
      allRegions.push(...mixPave.regions);
    });

    new ToSketchConvertor().fromRegionsToBackground(allRegions, background);
  }

  fromRegionsToBackground(regions: Region[], background: Background): Background {
    let paths = regions.map((region) => region.path);

    if (paths.length > 1) {
      const tolerance = new Tolerance(this._tolerance);
      paths = ServiceManager.getClipperService().clip(paths, [], ClipMode.Union, tolerance);
    }

    background.regions.length = 0;

    for (let i = 0, len = paths.length; i < len; ++i) {
      const polygon = new Polygon2d();
      background.regions.push(polygon);

      const path = paths[i];
      this._fromCurvesToPolyCurve(path.outer, polygon.outer);

      if (path.holes) {
        path.holes.forEach((hole) => {
          const polyCurve = new PolyCurve2d();
          this._fromCurvesToPolyCurve(hole, polyCurve);
          polygon.holes.push(polyCurve);
        });
      }
    }

    return background;
  }

  private _fromCurvesToPolyCurve(curves: Curve2d[], polyCurve: PolyCurve2d): void {
    const outputCurves = polyCurve.curves;

    for (let i = 0, len = curves.length; i < len; ++i) {
      const curve = curves[i];

      if (curve.getType() === EN_GEO_ELEMENT_TYPE.EN_LINE_2D) {
        const lineSegment = new LineSegment2d(curve.getStartPt(), curve.getEndPt());
        outputCurves.push(lineSegment);
      } else if (curve.getType() === EN_GEO_ELEMENT_TYPE.EN_ARC_2D) {
        const arcCurve = curve as Arc2dCurve;
        const start = arcCurve.getStartPt();
        const end = arcCurve.getEndPt();
        const center = arcCurve.getCenter();
        const radius = arcCurve.getRadius();

        if (start.equals(end, this._tolerance)) {
          const circle = new Circle2d(center, radius);
          outputCurves.push(circle);
        } else {
          const clockwise = !arcCurve.isCCW();
          const arc = Arc2d.create({
            start,
            end,
            center,
            radius,
            clockwise
          });
          outputCurves.push(arc);
        }
      }
    }
  }

  toFaces(regions: Region[]): Face2d[] {
    const faces: Face2d[] = [];
    for (let i = 0, len = regions.length; i < len; ++i) {
      faces.push(this.toFace(regions[i]));
    }
    return faces;
  }

  toFace(region: Region): Face2d {
    const path = region.path;
    const outerWire = this.toWire(path.outer);
    const holeWires: Wire[] = [];

    if (path.holes && path.holes.length) {
      for (let i = 0, len = path.holes.length; i < len; ++i) {
        const holeWire = this.toWire(path.holes[i]);
        holeWires.push(holeWire);
      }
    }

    const face = new Face2d();
    face.init(outerWire, holeWires);
    return face;
  }

  toWire(curves: Curve2d[]): Wire {
    const edges: (Line2d | CircleArc2d | Circle2d)[] = [];

    for (let i = 0, len = curves.length; i < len; ++i) {
      const curve = curves[i];
      const curveType = curve.getType();

      if (curveType === EN_GEO_ELEMENT_TYPE.EN_LINE_2D) {
        const line = this.toLine2d(curve);
        edges.push(line);
      } else if (curveType === EN_GEO_ELEMENT_TYPE.EN_ARC_2D) {
        const arc = this.toArc2d(curve as Arc2dCurve);
        edges.push(arc);
      } else {
        Logger.console.warn(`unknow HSMath.Curve2d type ${curveType}`);
      }
    }

    return Wire.create(edges);
  }

  toArc2d(arcCurve: Arc2dCurve): CircleArc2d | Circle2d {
    const start = arcCurve.getStartPt();
    const end = arcCurve.getEndPt();

    if (start.equals(end, this._tolerance)) {
      return this.toCircle2d(arcCurve);
    }

    const startPoint = this.toPoint2d(start);
    const endPoint = this.toPoint2d(end);
    const center = arcCurve.getCenter();
    const radius = arcCurve.getRadius();
    const clockwise = !arcCurve.isCCW();

    let arc = this._arcs.find((existingArc) =>
      MathUtil.isNearlyEqual(existingArc.radius, radius, this._tolerance) &&
      center.equals(existingArc.center, this._tolerance) &&
      (
        (existingArc.start === startPoint && existingArc.end === endPoint && existingArc.clockwise === clockwise) ||
        (existingArc.start === endPoint && existingArc.end === startPoint && existingArc.clockwise !== clockwise)
      )
    );

    if (!arc) {
      arc = CircleArc2d.create(startPoint, endPoint, center.clone(), radius, clockwise);
      this._arcs.push(arc);
    }

    return arc;
  }

  toCircle2d(arcCurve: Arc2dCurve): Circle2d {
    const center = arcCurve.getCenter();
    const radius = arcCurve.getRadius();

    let circle = this._circles.find((existingCircle) =>
      center.equals(existingCircle.center, this._tolerance) &&
      MathUtil.isNearlyEqual(existingCircle.radius, radius, this._tolerance)
    );

    if (!circle) {
      circle = Circle2d.create(center.clone(), radius);
      this._circles.push(circle);
    }

    return circle;
  }

  toLine2d(curve: Curve2d): Line2d {
    const start = this.toPoint2d(curve.getStartPt());
    const end = this.toPoint2d(curve.getEndPt());

    let line = this._lines.find((existingLine) =>
      (existingLine.start === start && existingLine.end === end) ||
      (existingLine.end === start && existingLine.start === end)
    );

    if (!line) {
      line = Line2d.create(start, end);
      this._lines.push(line);
    }

    return line;
  }

  toPoint2d(point: Point2d): Point2d {
    let existingPoint = this._points.find((p) => point.equals(p, this._tolerance));

    if (!existingPoint) {
      existingPoint = Point2d.create(point.x, point.y);
      this._points.push(existingPoint);
    }

    return existingPoint;
  }
}