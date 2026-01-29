import { Curve_IO, Curve } from './Curve';

interface ArcCurveData {
  cx: number;
  cy: number;
  clockwise: boolean;
}

interface DumpOptions {
  [key: string]: unknown;
}

type DumpCallback = (dumped: unknown, source: ArcCurve) => void;

export class ArcCurve_IO extends Curve_IO {
  private static _instance: ArcCurve_IO;

  static instance(): ArcCurve_IO {
    if (!this._instance) {
      this._instance = new ArcCurve_IO();
    }
    return this._instance;
  }

  dump(
    curve: ArcCurve,
    callback?: DumpCallback,
    includeDefaults: boolean = true,
    options: DumpOptions = {}
  ): ArcCurveData & Record<string, unknown> {
    const data = super.dump(curve, undefined, includeDefaults, options);
    data.cx = curve.cx;
    data.cy = curve.cy;
    data.clockwise = curve.clockwise;

    if (callback) {
      callback(data, curve);
    }

    return data;
  }

  load(target: ArcCurve, source: ArcCurveData, context?: unknown): void {
    super.load(target, source, context);
    target.cx = source.cx;
    target.cy = source.cy;
    target.clockwise = source.clockwise;
  }
}

interface Point2D {
  x: number;
  y: number;
}

interface CenterRadiusResult {
  center: THREE.Vector3;
  radius: number;
}

function convertToVector3(point: Point2D): THREE.Vector3 {
  return new THREE.Vector3(point.x, point.y, 0);
}

export class ArcCurve extends Curve {
  cx: number;
  cy: number;
  clockwise: boolean;

  constructor() {
    super();
    this.cx = 0;
    this.cy = 0;
    this.clockwise = false;
  }

  mirror(axisPosition: number, isMirrorX: boolean): void {
    if (isMirrorX) {
      this.cx = axisPosition - this.cx;
    } else {
      this.cy = axisPosition - this.cy;
    }
    this.clockwise = !this.clockwise;
  }

  flip(): void {
    this.clockwise = !this.clockwise;
  }

  getSagitta(startPoint: Point2D, endPoint: Point2D): number {
    const start = convertToVector3(startPoint);
    const end = convertToVector3(endPoint);
    const center = this.center;
    const radius = this.getRadius(startPoint, endPoint);

    return GeLib.ArcUtils.getSagitta(start, end, center, radius, this.clockwise);
  }

  get center(): THREE.Vector3 {
    return new THREE.Vector3(this.cx, this.cy, 0);
  }

  getRadius(startPoint: Point2D, endPoint: Point2D): number {
    const center = new THREE.Vector3(this.cx, this.cy, 0);
    const start = convertToVector3(startPoint);
    return center.distanceTo(start);
  }

  static createBySagitta(
    startPoint: Point2D,
    endPoint: Point2D,
    sagitta: number,
    clockwise: boolean = false
  ): ArcCurve {
    const start = convertToVector3(startPoint);
    const end = convertToVector3(endPoint);
    const result: CenterRadiusResult = GeLib.ArcUtils.getCenterRadiusBySagitta(start, end, sagitta);

    return ArcCurve.create(result.center, clockwise);
  }

  static create(center: THREE.Vector3, clockwise: boolean): ArcCurve {
    const curve = new ArcCurve();
    curve.cx = center.x;
    curve.cy = center.y;
    curve.clockwise = clockwise;
    return curve;
  }

  getIO(): ArcCurve_IO {
    return ArcCurve_IO.instance();
  }

  toTHREECurve(startPoint: Point2D, endPoint: Point2D): THREE.Curve<THREE.Vector3> {
    const center = this.center;
    const start = convertToVector3(startPoint);
    const end = convertToVector3(endPoint);
    const radius = this.getRadius(startPoint, endPoint);

    return GeLib.ArcUtils.createArcFromPoints(start, end, center, radius, this.clockwise);
  }

  clone(): ArcCurve {
    return ArcCurve.create(this.center, this.clockwise);
  }

  reverseClone(): ArcCurve {
    return ArcCurve.create(this.center, !this.clockwise);
  }
}

Curve.registerClass(HSConstants.ModelClass.ArcCurve, ArcCurve);