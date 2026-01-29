import { Curve2d_IO, Curve2d } from './Curve2d';
import { Entity } from './Entity';
import { EntityField } from './EntityField';
import { Vec2, isSamePoint } from './Vec2Utils';
import { Logger } from './Logger';

interface Coordinate {
  x: number;
  y: number;
}

interface Point2d extends Entity {
  id: string;
  geometry: Coordinate;
  offset(x: number, y: number): void;
}

interface DumpOptions {
  [key: string]: unknown;
}

interface DumpResult {
  [key: string]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface CenterRadiusInfo {
  center: Coordinate | undefined;
  radius: number | undefined;
}

interface BoundInternal {
  reset(): void;
  appendPoint(point: Coordinate | Point2d): void;
}

export class CircleArc2d_IO extends Curve2d_IO {
  private static _CircleArc2d_IO_instance: CircleArc2d_IO | undefined;

  static instance(): CircleArc2d_IO {
    if (!CircleArc2d_IO._CircleArc2d_IO_instance) {
      CircleArc2d_IO._CircleArc2d_IO_instance = new CircleArc2d_IO();
    }
    return CircleArc2d_IO._CircleArc2d_IO_instance;
  }

  dump(
    entity: CircleArc2d,
    callback?: (result: DumpResult[], entity: CircleArc2d) => void,
    includeBase: boolean = true,
    options: DumpOptions = {}
  ): DumpResult[] {
    const result = super.dump(entity, undefined, includeBase, options);
    const data = result[0];
    
    data.start = entity.__start.id;
    data.end = entity.__end.id;
    data.center = new THREE.Vector3(entity.__center.x, entity.__center.y, 0);
    data.radius = entity.__radius;
    data.clockwise = entity.__clockwise;
    
    if (callback) {
      callback(result, entity);
    }
    
    return result;
  }

  load(entity: CircleArc2d, data: any, options: LoadOptions = {}): void {
    super.load(entity, data, options);
    
    entity.__start = Entity.loadFromDumpById(data.start, options) as Point2d;
    entity.__end = Entity.loadFromDumpById(data.end, options) as Point2d;
    entity.addChild(entity.__start);
    entity.addChild(entity.__end);
    entity.__center = new THREE.Vector3(data.center.x, data.center.y, 0);
    entity.__radius = data.radius;
    entity.__clockwise = data.clockwise;
  }
}

export class CircleArc2d extends Curve2d {
  __start!: Point2d;
  __end!: Point2d;
  __center: Coordinate | null = null;
  __radius: number = 0;
  __clockwise: boolean = false;
  private __sagittaCache: number | undefined = undefined;

  constructor(id: string = '', parent?: Entity) {
    super(id, parent);
  }

  static create(
    start: Point2d,
    end: Point2d,
    center: Coordinate,
    radius: number,
    clockwise: boolean = false
  ): CircleArc2d {
    const arc = new CircleArc2d();
    arc.__start = start;
    arc.__end = end;
    arc.__center = { x: center.x, y: center.y };
    arc.addChild(start);
    arc.addChild(end);
    arc.__radius = radius;
    arc.__clockwise = clockwise;
    return arc;
  }

  @EntityField({
    partialSet(this: CircleArc2d, value: Point2d) {
      this._setStart(value);
    }
  })
  get start(): Point2d {
    return this.__start;
  }
  set start(value: Point2d) {
    this.__start = value;
  }

  @EntityField({
    partialSet(this: CircleArc2d, value: Point2d) {
      this._setEnd(value);
    }
  })
  get end(): Point2d {
    return this.__end;
  }
  set end(value: Point2d) {
    this.__end = value;
  }

  @EntityField({ binaryEqual: isSamePoint })
  get center(): Coordinate {
    return this.__center!;
  }
  set center(value: Coordinate) {
    this.__center = value;
  }

  @EntityField()
  get radius(): number {
    return this.__radius;
  }
  set radius(value: number) {
    this.__radius = value;
  }

  @EntityField()
  get clockwise(): boolean {
    return this.__clockwise;
  }
  set clockwise(value: boolean) {
    this.__clockwise = value;
  }

  get from(): Point2d {
    return this.start;
  }
  set from(value: Point2d) {
    this.start = value;
  }

  get to(): Point2d {
    return this.end;
  }
  set to(value: Point2d) {
    this.end = value;
  }

  get direction(): Vec2 | undefined {
    if (this.__start && this.__end) {
      return Vec2.fromCoordinate(this.__end).subtract(Vec2.fromCoordinate(this.__start));
    }
    return undefined;
  }

  get middle(): Coordinate {
    const point = this.toTHREECurve().getPoint(0.5);
    return { x: point.x, y: point.y };
  }

  get discretePoints(): Coordinate[] {
    return this.getArcPoints(this.toTHREECurve(), undefined).map(point => ({
      x: point.x,
      y: point.y
    }));
  }

  get points(): Point2d[] {
    return [this.from, this.to];
  }

  get length(): number {
    return this.toTHREECurve().getLength();
  }

  get topPoint(): Coordinate | undefined {
    const point: Coordinate = {
      x: this.center.x,
      y: this.center.y + this.radius
    };
    return this._isPointInCurArc(point) ? point : undefined;
  }

  get bottomPoint(): Coordinate | undefined {
    const point: Coordinate = {
      x: this.center.x,
      y: this.center.y - this.radius
    };
    return this._isPointInCurArc(point) ? point : undefined;
  }

  get leftPoint(): Coordinate | undefined {
    const point: Coordinate = {
      x: this.center.x - this.radius,
      y: this.center.y
    };
    return this._isPointInCurArc(point) ? point : undefined;
  }

  get rightPoint(): Coordinate | undefined {
    const point: Coordinate = {
      x: this.center.x + this.radius,
      y: this.center.y
    };
    return this._isPointInCurArc(point) ? point : undefined;
  }

  get sagittaCache(): number | undefined {
    return this.__sagittaCache;
  }

  get geometry(): Array<Coordinate | number | boolean> | [] {
    if (this.start && this.end) {
      return [
        this.start.geometry,
        this.end.geometry,
        { x: this.__center!.x, y: this.__center!.y },
        this.__radius,
        this.__clockwise
      ];
    }
    return [];
  }

  get key(): string {
    const centerKey = `${this.center.x.toFixed(2)}-${this.center.y.toFixed(2)}`;
    const radiusKey = this.radius.toFixed(2);
    let ids: string[] = [];
    let isClockwise: boolean;

    if (this.from && this.to) {
      if (this.from.id < this.to.id) {
        ids = [this.from.id, this.to.id];
        isClockwise = this.clockwise;
      } else {
        ids = [this.to.id, this.from.id];
        isClockwise = !this.clockwise;
      }
    }

    return `CircleArc2d-${ids.join('-')}-${centerKey}-${radiusKey}-${isClockwise}`;
  }

  toTHREECurve(): THREE.Curve<THREE.Vector3> {
    const center = GeLib.VectorUtils.toTHREEVector3(this.center);
    const start = GeLib.VectorUtils.toTHREEVector3(this.start);
    const end = GeLib.VectorUtils.toTHREEVector3(this.end);
    return GeLib.ArcUtils.createArcFromPoints(start, end, center, this.radius, this.clockwise);
  }

  offset(offsetX: number, offsetY: number): void {
    if (this.start && this.end) {
      this.start.offset(offsetX, offsetY);
      this.end.offset(offsetX, offsetY);
      this.center = {
        x: this.center.x + offsetX,
        y: this.center.y + offsetY
      };
    } else {
      Logger.console.assert(false, 'invalid data!');
    }
  }

  getTangent(t: number): Vec2 | undefined {
    if (t < 0 || t > 1) {
      log.error('getPointOnArc() only accept input number between [0, 1]', 'HSCore.GetPointOnArc');
      return undefined;
    }
    const tangent = this.toTHREECurve().getTangent(t);
    return Vec2.fromCoordinate(tangent);
  }

  getDiscretePoints(): Coordinate[] {
    return this.discretePoints;
  }

  createSubCurve(start: Point2d, end: Point2d): CircleArc2d {
    return CircleArc2d.create(start, end, this.__center!, this.__radius, this.__clockwise);
  }

  private _isPointInCurArc(point: Coordinate, tolerance: number = HSConstants.Constants.SKETCH2D_LENGTH_TOL): boolean {
    return GeLib.ArcUtils.isPointOnArc(
      this.toTHREECurve(),
      GeLib.VectorUtils.toTHREEVector3(point),
      tolerance
    );
  }

  getArcPoints(curve: THREE.Curve<THREE.Vector3>, divisions?: number): Coordinate[] {
    let points = super.getArcPoints(curve, divisions).slice();
    if (this.end && isSamePoint(this.end, points[0])) {
      points = points.reverse();
    }
    return points;
  }

  calSagitta(): void {
    const start = GeLib.VectorUtils.toTHREEVector3(this.from);
    const end = GeLib.VectorUtils.toTHREEVector3(this.to);
    const center = GeLib.VectorUtils.toTHREEVector3(this.center);
    const radius = this.radius;
    this.__sagittaCache = GeLib.ArcUtils.getSagitta(start, end, center, radius, this.clockwise);
  }

  updateCenterRadiusInfo(): void {
    let sagitta = this.sagittaCache ?? 0;
    const start = GeLib.VectorUtils.toTHREEVector3(this.from);
    const end = GeLib.VectorUtils.toTHREEVector3(this.to);
    let info: CenterRadiusInfo = { center: undefined, radius: undefined };

    sagitta = Math.max(0.001, sagitta);

    if (this.clockwise === true) {
      info = GeLib.ArcUtils.getCenterRadiusBySagitta(end, start, sagitta);
    } else {
      info = GeLib.ArcUtils.getCenterRadiusBySagitta(start, end, sagitta);
    }

    this.center = info.center!;
    this.radius = info.radius!;
  }

  private _setStart(point: Point2d): void {
    if (this.__start && this.__start !== this.__end) {
      this.removeChild(this.__start, true, false);
    }
    this.__start = point;
    if (point) {
      this.addChild(point);
    }
  }

  private _setEnd(point: Point2d): void {
    if (this.__end && this.__end !== this.__start) {
      this.removeChild(this.__end, true, false);
    }
    this.__end = point;
    if (point) {
      this.addChild(point);
    }
  }

  protected refreshBoundInternal(): void {
    const bound = this.boundInternal;
    bound.reset();

    const { start, end } = this;
    if (start && end) {
      bound.appendPoint(start);
      bound.appendPoint(end);

      const { leftPoint, rightPoint, topPoint, bottomPoint } = this;
      if (leftPoint) bound.appendPoint(leftPoint);
      if (rightPoint) bound.appendPoint(rightPoint);
      if (topPoint) bound.appendPoint(topPoint);
      if (bottomPoint) bound.appendPoint(bottomPoint);

      for (const point of this.discretePoints) {
        bound.appendPoint(point);
      }
    }
  }

  verify(): boolean {
    if (!(this.__start instanceof HSCore.Model.Point2d && this.hasChild(this.__start))) {
      log.error(`${this.tag}: invalid start.`, 'HSCore.Verify.Error', true);
      return false;
    }

    if (!(this.__end instanceof HSCore.Model.Point2d && this.hasChild(this.__end))) {
      log.error(`${this.tag}: invalid end.`, 'HSCore.Verify.Error', true);
      return false;
    }

    const curve = this.toTHREECurve();
    const curveStart = curve.getPoint(0);
    const curveEnd = curve.getPoint(1);

    if (this.start && isSamePoint(curveStart, this.start, 0.01) &&
        this.end && isSamePoint(curveEnd, this.end, 0.01)) {
      // Valid
    } else {
      log.error(`${this.tag}: start end point is not consistency.`, 'HSCore.Verify.Error', true);
    }

    return super.verify();
  }

  getIO(): CircleArc2d_IO {
    return CircleArc2d_IO.instance();
  }

  protected onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void {
    const geometryFields = ['start', 'end', 'center', 'radius', 'clockwise'];
    if (geometryFields.includes(fieldName)) {
      this.dirtyGeometry();
    }
    super.onFieldChanged(fieldName, oldValue, newValue);
  }
}

Entity.registerClass(HSConstants.ModelClass.CircleArc2d, CircleArc2d);