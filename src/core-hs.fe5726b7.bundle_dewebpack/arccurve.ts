import { Curve_IO, Curve } from './Curve';

interface SerializedArcCurve {
  cx: number;
  cy: number;
  clockwise: boolean;
  [key: string]: unknown;
}

export class ArcCurve_IO extends Curve_IO {
  private static _instance?: ArcCurve_IO;

  static instance(): ArcCurve_IO {
    if (!this._instance) {
      this._instance = new ArcCurve_IO();
    }
    return this._instance;
  }

  dump(
    curve: ArcCurve,
    callback?: (serialized: SerializedArcCurve, source: ArcCurve) => void,
    includeDefaults: boolean = true,
    options: Record<string, unknown> = {}
  ): SerializedArcCurve {
    const serialized = super.dump(curve, undefined, includeDefaults, options) as SerializedArcCurve;
    serialized.cx = curve.cx;
    serialized.cy = curve.cy;
    serialized.clockwise = curve.clockwise;
    
    callback?.(serialized, curve);
    
    return serialized;
  }

  load(
    target: ArcCurve,
    data: SerializedArcCurve,
    callback?: (target: ArcCurve, data: SerializedArcCurve) => void,
    options?: Record<string, unknown>
  ): void {
    super.load(target, data, callback, options);
    target.cx = data.cx;
    target.cy = data.cy;
    target.clockwise = data.clockwise;
  }
}

interface Point2D {
  x: number;
  y: number;
}

function toVector3(point: Point2D): THREE.Vector3 {
  return new THREE.Vector3(point.x, point.y, 0);
}

export class ArcCurve extends Curve {
  cx: number = 0;
  cy: number = 0;
  clockwise: boolean = false;

  constructor() {
    super();
  }

  mirror(axisPosition: number, isXAxis: boolean): void {
    if (isXAxis) {
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
    const start = toVector3(startPoint);
    const end = toVector3(endPoint);
    const centerPoint = this.center;
    const radius = this.getRadius(startPoint, endPoint);
    
    return GeLib.ArcUtils.getSagitta(start, end, centerPoint, radius, this.clockwise);
  }

  get center(): THREE.Vector3 {
    return new THREE.Vector3(this.cx, this.cy, 0);
  }

  getRadius(startPoint: Point2D, endPoint: Point2D): number {
    const centerPoint = new THREE.Vector3(this.cx, this.cy, 0);
    const start = toVector3(startPoint);
    return centerPoint.distanceTo(start);
  }

  static createBySagitta(
    startPoint: Point2D,
    endPoint: Point2D,
    sagitta: number,
    clockwise: boolean = false
  ): ArcCurve {
    const start = toVector3(startPoint);
    const end = toVector3(endPoint);
    const result = GeLib.ArcUtils.getCenterRadiusBySagitta(start, end, sagitta);
    
    return ArcCurve.create(result.center, clockwise);
  }

  static create(center: THREE.Vector3, clockwise: boolean): ArcCurve {
    const arc = new ArcCurve();
    arc.cx = center.x;
    arc.cy = center.y;
    arc.clockwise = clockwise;
    return arc;
  }

  getIO(): ArcCurve_IO {
    return ArcCurve_IO.instance();
  }

  toTHREECurve(startPoint: Point2D, endPoint: Point2D): THREE.Curve<THREE.Vector3> {
    const centerPoint = this.center;
    const start = toVector3(startPoint);
    const end = toVector3(endPoint);
    const radius = this.getRadius(startPoint, endPoint);
    
    return GeLib.ArcUtils.createArcFromPoints(start, end, centerPoint, radius, this.clockwise);
  }

  clone(): ArcCurve {
    return ArcCurve.create(this.center, this.clockwise);
  }

  reverseClone(): ArcCurve {
    return ArcCurve.create(this.center, !this.clockwise);
  }
}

Curve.registerClass(HSConstants.ModelClass.ArcCurve, ArcCurve);