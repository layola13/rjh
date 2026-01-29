import { Polygon2d, isPolygon2dDumpData, isPolygon2dDumpDataArray } from './Polygon2d';
import { isIPoint2dArray, IPoint2d } from './Point2d';
import { isDiscretePolygon2dArrayData, isDiscretePolygon2dData, DiscretePolygon2d } from './DiscretePolygon2d';
import { isSameArray, resizeArray } from './ArrayUtils';
import { 
  simplifyPolygon, 
  getBounds, 
  decomposeAxis, 
  getCrossValue, 
  transformCurve, 
  reverseCurve 
} from './GeometryUtils';
import { Logger } from './Logger';

interface Polygon2dDumpData {
  type: string;
  version: string;
  [key: string]: unknown;
}

interface BackgroundDumpData {
  type: string;
  version: string;
  regions: Polygon2dDumpData[];
}

interface ClipOptions {
  operation: unknown;
}

type BackgroundData = 
  | IPoint2d[] 
  | DiscretePolygon2d 
  | DiscretePolygon2d[] 
  | Polygon2dDumpData 
  | Polygon2dDumpData[];

declare const HSConstants: {
  Constants: {
    TOLERANCE: number;
  };
};

declare const HSCore: {
  Util: {
    Collision: {
      ClipFaces(faces1: DiscretePolygon2d[], faces2: DiscretePolygon2d[], options: ClipOptions): DiscretePolygon2d[] | null;
      ClipPolygon2(outer: IPoint2d[][], holes: IPoint2d[][], options: ClipOptions): DiscretePolygon2d[] | null;
      SimplifyPolygons(polygons: IPoint2d[][]): IPoint2d[][] | null;
      ClipType: {
        union: unknown;
        diff: unknown;
      };
    };
  };
};

declare const DEBUG: boolean;
declare const THREE: {
  Matrix3: new () => Matrix3;
};

interface Matrix3 {
  scale(x: number, y: number): void;
  translate(x: number, y: number): void;
}

interface Axis {
  xAxis: IPoint2d;
  yAxis: IPoint2d;
}

export class Background {
  static readonly ClassName = 'background';

  regions: Polygon2d[] = [];

  constructor() {
    this.regions = [];
  }

  assign(other: Background): void {
    Polygon2d.assignArray(this.regions, other.regions);
  }

  copyFrom(other: Background): void {
    this.load(other.dump());
  }

  clone(): Background {
    const cloned = new Background();
    cloned.copyFrom(this);
    return cloned;
  }

  equals(other: Background): boolean {
    return this.isSameBackground(other);
  }

  isSameBackground(other: Background, tolerance: number = HSConstants.Constants.TOLERANCE): boolean {
    return (
      this === other ||
      (!!other &&
        isSameArray(
          this.regions,
          other.regions,
          false,
          (a, b) => a.isSamePolygon2d(b, tolerance)
        ))
    );
  }

  setFromPoints(points: IPoint2d[], unionPolygons: boolean = true): void {
    this.setFromDiscretePolygon2d(
      {
        outer: points,
        holes: []
      },
      unionPolygons
    );
  }

  setFromDiscretePolygon2d(polygon: DiscretePolygon2d, unionPolygons: boolean = true): void {
    this.setFromDiscretePolygon2dArray([polygon], unionPolygons);
  }

  setFromDiscretePolygon2dArray(polygons: DiscretePolygon2d[], unionPolygons: boolean = true): void {
    let processedPolygons = polygons;

    if (unionPolygons) {
      if (polygons.length > 1) {
        const unified = HSCore.Util.Collision.ClipFaces([polygons[0]], polygons.slice(1), {
          operation: HSCore.Util.Collision.ClipType.union
        });
        if (unified && unified.length > 0) {
          processedPolygons = unified;
        }
      } else if (polygons.length === 1) {
        const { outer, holes } = polygons[0];
        if (holes.length > 0) {
          const clipped = HSCore.Util.Collision.ClipPolygon2([outer], holes, {
            operation: HSCore.Util.Collision.ClipType.diff
          });
          if (clipped && clipped.length > 0) {
            processedPolygons = clipped;
          }
        } else {
          const simplified = HSCore.Util.Collision.SimplifyPolygons([outer]);
          if (simplified && simplified.length > 0) {
            processedPolygons = simplified.map(polygon => ({
              outer: polygon,
              holes: []
            }));
          }
        }
      }
    }

    processedPolygons = processedPolygons.map(polygon => ({
      outer: simplifyPolygon(polygon.outer),
      holes: polygon.holes.map(hole => simplifyPolygon(hole))
    }));

    resizeArray(this.regions, processedPolygons.length, () => new Polygon2d());

    for (let i = 0; i < processedPolygons.length; i++) {
      this.regions[i].setFromDiscretePolygon(processedPolygons[i]);
    }
  }

  setFromPolygon2dDataArray(data: Polygon2dDumpData[]): void {
    Polygon2d.loadArray(this.regions, data);
  }

  setFromPolygon2d(data: Polygon2dDumpData): void {
    this.setFromPolygon2dDataArray([data]);
  }

  setFromData(data: BackgroundData): void {
    if (isIPoint2dArray(data)) {
      this.setFromPoints(data);
    } else if (isDiscretePolygon2dArrayData(data)) {
      this.setFromDiscretePolygon2dArray(data);
    } else if (isDiscretePolygon2dData(data)) {
      this.setFromDiscretePolygon2d(data);
    } else if (isPolygon2dDumpData(data)) {
      this.setFromPolygon2d(data);
    } else if (isPolygon2dDumpDataArray(data)) {
      this.setFromPolygon2dDataArray(data);
    } else {
      throw new Error('unknown data format');
    }
  }

  toDiscretePolygons(): DiscretePolygon2d[] {
    return this.regions.map(region => region.toDiscretePolygon());
  }

  getFirstPolygonOuter(): IPoint2d[] | null {
    if (DEBUG) {
      Logger.console.log('should not call this function, review the logic of after code');
    }
    return this.regions.length > 0 ? this.regions[0].toDiscretePolygon().outer : null;
  }

  isPointInside(point: IPoint2d): boolean {
    for (const region of this.regions) {
      if (region.isPointInside(point)) {
        return true;
      }
    }
    return false;
  }

  isPointOnOutline(point: IPoint2d, tolerance: number = HSConstants.Constants.TOLERANCE): boolean {
    for (const region of this.regions) {
      if (region.isPointOnOutline(point, tolerance)) {
        return true;
      }
    }
    return false;
  }

  migrate(data: BackgroundData): void {
    this.setFromData(data);
  }

  load(data: BackgroundDumpData | BackgroundData): void {
    if (typeof data === 'object' && 'type' in data && data.type === Background.ClassName) {
      this.setFromPolygon2dDataArray((data as BackgroundDumpData).regions);
    } else {
      this.migrate(data as BackgroundData);
    }
  }

  flipY(): void {
    this.transform(this.getMatrixFlipY());
  }

  getMatrixFlipY(): Matrix3 {
    const doubleMiddleY = this.getDoubleMiddleY();
    const matrix = new THREE.Matrix3();
    matrix.scale(1, -1);
    matrix.translate(0, doubleMiddleY);
    return matrix;
  }

  getDoubleMiddleY(): number {
    const allPoints: IPoint2d[] = [];
    this.toDiscretePolygons().forEach(polygon =>
      polygon.outer.forEach(point => allPoints.push(point))
    );

    if (allPoints.length) {
      const [, minY, , maxY] = getBounds(allPoints);
      return minY + (minY + maxY);
    }
    return 0;
  }

  dump(): BackgroundDumpData {
    const regionsData = this.regions.map(region => region.dump());
    return {
      type: Background.ClassName,
      version: '0.1',
      regions: regionsData
    };
  }

  transform(matrix: Matrix3): void {
    const { xAxis, yAxis } = decomposeAxis(matrix) as Axis;
    const isFlipped = getCrossValue(xAxis, yAxis) < 0;

    this.regions.forEach(region =>
      [region.outer, ...region.holes].forEach(contour => {
        contour.curves.forEach(curve => transformCurve(curve, matrix));

        if (isFlipped) {
          const reversedCurves = contour.curves.slice();
          reversedCurves.reverse().forEach(curve => reverseCurve(curve));
          contour.setCurves(reversedCurves);
        }
      })
    );
  }

  clear(): void {
    this.regions.length = 0;
  }

  verify(): boolean {
    return this.regions.length >= 1;
  }
}