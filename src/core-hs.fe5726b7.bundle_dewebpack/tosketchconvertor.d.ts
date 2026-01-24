import { Point2d } from './Point2d';
import { Line2d } from './Line2d';
import { Circle2d } from './Circle2d';
import { CircleArc2d } from './CircleArc2d';
import { Wire } from './Wire';
import { Face2d } from './Face2d';
import { Background, Polygon2d, PolyCurve2d, LineSegment2d, Arc2d, Circle2d as SketchCircle2d } from './SketchTypes';
import { BuildingTolerance, ServiceManager, ClipMode } from './Services';
import { EN_GEO_ELEMENT_TYPE, MathUtil, Tolerance } from './MathUtils';
import { Logger } from './Logger';

/**
 * 2D curve element interface
 */
interface Curve2d {
  getType(): EN_GEO_ELEMENT_TYPE;
  getStartPt(): IPoint2d;
  getEndPt(): IPoint2d;
}

/**
 * Arc curve interface extending base curve
 */
interface Arc2dCurve extends Curve2d {
  getCenter(): IPoint2d;
  getRadius(): number;
  isCCW(): boolean;
}

/**
 * 2D point interface with coordinate properties
 */
interface IPoint2d {
  x: number;
  y: number;
  equals(other: IPoint2d, tolerance: number): boolean;
  clone(): IPoint2d;
}

/**
 * Path structure containing outer boundary and optional holes
 */
interface Path {
  outer: Curve2d[];
  holes?: Curve2d[][];
}

/**
 * Region structure with path and ID
 */
interface Region {
  path: Path;
  id?: string;
}

/**
 * MixPave structure containing multiple regions
 */
interface MixPave {
  regions: Region[];
}

/**
 * Sketch target interface with background and face management
 */
interface SketchTarget {
  background: Background;
  idMap?: Map<string, string>;
  removeAllFaces(updateFlag: boolean): void;
  addChild(faces: Face2d[], updateFlag: boolean): void;
  createBuilder(): SketchBuilder;
}

/**
 * Sketch builder interface for background updates
 */
interface SketchBuilder {
  updateFlagByBackground(background: Background): void;
}

/**
 * Converter class for transforming MixPave data structures to Sketch format
 * Handles conversion of geometric primitives (points, lines, arcs, circles) with proper deduplication
 */
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
   * Converts MixPave regions to Sketch faces and updates the target sketch
   * @param mixPave - Source MixPave data structure
   * @param sketchTarget - Target sketch to update
   * @param updateFlag - Flag to control update behavior
   */
  static fromMixPaveToSketch(
    mixPave: MixPave,
    sketchTarget: SketchTarget,
    updateFlag: boolean = false
  ): void {
    const convertor = new ToSketchConvertor();
    const idMap = new Map<string, string>();
    const faces = convertor.toFaces(mixPave.regions);

    faces.forEach((face, index) => {
      const regionId = ServiceManager.getMixPaveService().getRegionId(mixPave.regions[index]);
      idMap.set(face.id, regionId);
    });

    sketchTarget.removeAllFaces(updateFlag);
    sketchTarget.addChild(faces, updateFlag);
    sketchTarget.idMap = idMap;

    const background = convertor.fromRegionsToBackground(
      mixPave.regions,
      sketchTarget.background.clone()
    );
    sketchTarget.createBuilder().updateFlagByBackground(background);
    sketchTarget.background = background;
  }

  /**
   * Converts a single path to a Background structure
   * @param path - Source path with outer boundary and holes
   * @returns Background structure containing the converted polygon
   */
  static fromPathToBackground(path: Path): Background {
    const convertor = new ToSketchConvertor();
    const background = new Background();
    const polygon = new Polygon2d();

    background.regions.push(polygon);
    convertor._fromCurvesToPolyCurve(path.outer, polygon.outer);

    if (path.holes && path.holes.length > 0) {
      path.holes.forEach((hole) => {
        const polyCurve = new PolyCurve2d();
        convertor._fromCurvesToPolyCurve(hole, polyCurve);
        polygon.holes.push(polyCurve);
      });
    }

    return background;
  }

  /**
   * Merges multiple MixPave backgrounds into a single background
   * @param primaryMixPave - Primary MixPave structure
   * @param otherMixPaves - Additional MixPave structures to merge
   * @param targetBackground - Target background to update
   */
  static mergeBackgroundWithOtherMixPaves(
    primaryMixPave: MixPave,
    otherMixPaves: MixPave[],
    targetBackground: Background
  ): void {
    const allRegions = [...primaryMixPave.regions];

    otherMixPaves.forEach((mixPave) => {
      allRegions.push(...mixPave.regions);
    });

    new ToSketchConvertor().fromRegionsToBackground(allRegions, targetBackground);
  }

  /**
   * Converts regions to background, applying union operation if multiple regions exist
   * @param regions - Array of regions to convert
   * @param background - Target background structure
   * @returns Updated background structure
   */
  fromRegionsToBackground(regions: Region[], background: Background): Background {
    let paths = regions.map((region) => region.path);

    // Apply union operation if multiple paths exist
    if (paths.length > 1) {
      const tolerance = new Tolerance(this._tolerance);
      paths = ServiceManager.getClipperService().clip(
        paths,
        [],
        ClipMode.Union,
        tolerance
      );
    }

    background.regions.length = 0;

    for (let i = 0, length = paths.length; i < length; ++i) {
      const polygon = new Polygon2d();
      background.regions.push(polygon);

      const currentPath = paths[i];
      this._fromCurvesToPolyCurve(currentPath.outer, polygon.outer);

      if (currentPath.holes && currentPath.holes.length > 0) {
        currentPath.holes.forEach((hole) => {
          const polyCurve = new PolyCurve2d();
          this._fromCurvesToPolyCurve(hole, polyCurve);
          polygon.holes.push(polyCurve);
        });
      }
    }

    return background;
  }

  /**
   * Converts curve array to PolyCurve2d structure
   * @param curves - Source curves to convert
   * @param polyCurve - Target PolyCurve2d to populate
   */
  private _fromCurvesToPolyCurve(curves: Curve2d[], polyCurve: PolyCurve2d): void {
    const targetCurves = polyCurve.curves;

    for (let i = 0, length = curves.length; i < length; ++i) {
      const curve = curves[i];

      if (curve.getType() === EN_GEO_ELEMENT_TYPE.EN_LINE_2D) {
        const lineSegment = new LineSegment2d(curve.getStartPt(), curve.getEndPt());
        targetCurves.push(lineSegment);
      } else if (curve.getType() === EN_GEO_ELEMENT_TYPE.EN_ARC_2D) {
        const arcCurve = curve as Arc2dCurve;
        const startPoint = arcCurve.getStartPt();
        const endPoint = arcCurve.getEndPt();
        const center = arcCurve.getCenter();
        const radius = arcCurve.getRadius();

        // Check if start and end points are equal (full circle)
        if (startPoint.equals(endPoint, this._tolerance)) {
          const circle = new SketchCircle2d(center, radius);
          targetCurves.push(circle);
        } else {
          const isClockwise = !arcCurve.isCCW();
          const arc = Arc2d.create({
            start: startPoint,
            end: endPoint,
            center: center,
            radius: radius,
            clockwise: isClockwise
          });
          targetCurves.push(arc);
        }
      }
    }
  }

  /**
   * Converts multiple regions to Face2d array
   * @param regions - Array of regions to convert
   * @returns Array of Face2d objects
   */
  toFaces(regions: Region[]): Face2d[] {
    const faces: Face2d[] = [];
    for (let i = 0, length = regions.length; i < length; ++i) {
      faces.push(this.toFace(regions[i]));
    }
    return faces;
  }

  /**
   * Converts a single region to Face2d
   * @param region - Source region
   * @returns Face2d object with outer wire and holes
   */
  toFace(region: Region): Face2d {
    const path = region.path;
    const outerWire = this.toWire(path.outer);
    const holes: Wire[] = [];

    if (path.holes && path.holes.length > 0) {
      for (let i = 0, length = path.holes.length; i < length; ++i) {
        const holeWire = this.toWire(path.holes[i]);
        holes.push(holeWire);
      }
    }

    const face = new Face2d();
    face.init(outerWire, holes);
    return face;
  }

  /**
   * Converts curve array to Wire
   * @param curves - Array of curves
   * @returns Wire object containing converted edges
   */
  toWire(curves: Curve2d[]): Wire {
    const edges: (Line2d | CircleArc2d | Circle2d)[] = [];

    for (let i = 0, length = curves.length; i < length; ++i) {
      const curve = curves[i];
      const curveType = curve.getType();

      if (curveType === EN_GEO_ELEMENT_TYPE.EN_LINE_2D) {
        const line = this.toLine2d(curve);
        edges.push(line);
      } else if (curveType === EN_GEO_ELEMENT_TYPE.EN_ARC_2D) {
        const arc = this.toArc2d(curve as Arc2dCurve);
        edges.push(arc);
      } else {
        Logger.console.warn(`Unknown HSMath.Curve2d type: ${curveType}`);
      }
    }

    return Wire.create(edges);
  }

  /**
   * Converts arc curve to CircleArc2d or Circle2d, with deduplication
   * @param arcCurve - Source arc curve
   * @returns CircleArc2d or Circle2d object
   */
  toArc2d(arcCurve: Arc2dCurve): CircleArc2d | Circle2d {
    const startPoint = arcCurve.getStartPt();
    const endPoint = arcCurve.getEndPt();

    // Check if it's a full circle
    if (startPoint.equals(endPoint, this._tolerance)) {
      return this.toCircle2d(arcCurve);
    }

    const start = this.toPoint2d(startPoint);
    const end = this.toPoint2d(endPoint);
    const center = arcCurve.getCenter();
    const radius = arcCurve.getRadius();
    const isClockwise = !arcCurve.isCCW();

    // Try to find existing arc with same properties
    let existingArc = this._arcs.find((arc) =>
      MathUtil.isNearlyEqual(arc.radius, radius, this._tolerance) &&
      center.equals(arc.center, this._tolerance) &&
      (
        (arc.start === start && arc.end === end && arc.clockwise === isClockwise) ||
        (arc.start === end && arc.end === start && arc.clockwise !== isClockwise)
      )
    );

    if (!existingArc) {
      existingArc = CircleArc2d.create(start, end, center.clone(), radius, isClockwise);
      this._arcs.push(existingArc);
    }

    return existingArc;
  }

  /**
   * Converts arc curve to Circle2d, with deduplication
   * @param arcCurve - Source arc curve (representing full circle)
   * @returns Circle2d object
   */
  toCircle2d(arcCurve: Arc2dCurve): Circle2d {
    const center = arcCurve.getCenter();
    const radius = arcCurve.getRadius();

    // Try to find existing circle with same properties
    let existingCircle = this._circles.find((circle) =>
      center.equals(circle.center, this._tolerance) &&
      MathUtil.isNearlyEqual(circle.radius, radius, this._tolerance)
    );

    if (!existingCircle) {
      existingCircle = Circle2d.create(center.clone(), radius);
      this._circles.push(existingCircle);
    }

    return existingCircle;
  }

  /**
   * Converts curve to Line2d, with deduplication
   * @param curve - Source curve
   * @returns Line2d object
   */
  toLine2d(curve: Curve2d): Line2d {
    const start = this.toPoint2d(curve.getStartPt());
    const end = this.toPoint2d(curve.getEndPt());

    // Try to find existing line with same endpoints (direction-independent)
    let existingLine = this._lines.find((line) =>
      (line.start === start && line.end === end) ||
      (line.end === start && line.start === end)
    );

    if (!existingLine) {
      existingLine = Line2d.create(start, end);
      this._lines.push(existingLine);
    }

    return existingLine;
  }

  /**
   * Converts point to Point2d, with deduplication based on tolerance
   * @param point - Source point
   * @returns Point2d object
   */
  toPoint2d(point: IPoint2d): Point2d {
    // Try to find existing point within tolerance
    let existingPoint = this._points.find((p) =>
      point.equals(p, this._tolerance)
    );

    if (!existingPoint) {
      existingPoint = Point2d.create(point.x, point.y);
      this._points.push(existingPoint);
    }

    return existingPoint;
  }
}