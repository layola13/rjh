import { Curve2d_IO, Curve2d } from './Curve2d';
import { Entity } from './Entity';
import { Point2d } from './Point2d';
import { EntityField } from './decorators';
import { Vec2, Coordinate } from './Vec2';
import { Logger } from './Logger';

interface DumpOptions {
  [key: string]: unknown;
}

interface DumpResult {
  [key: string]: unknown;
  ln?: [string, string];
}

interface LoadData {
  start?: string;
  end?: string;
  ln?: [string, string];
  [key: string]: unknown;
}

export class Line2d_IO extends Curve2d_IO {
  private static _Line2d_IO_Instance?: Line2d_IO;

  static instance(): Line2d_IO {
    if (!Line2d_IO._Line2d_IO_Instance) {
      Line2d_IO._Line2d_IO_Instance = new Line2d_IO();
    }
    return Line2d_IO._Line2d_IO_Instance;
  }

  dump(
    entity: Line2d,
    callback?: (result: DumpResult[], entity: Line2d) => void,
    includeMetadata: boolean = true,
    options: DumpOptions = {}
  ): DumpResult[] {
    const result = super.dump(entity, undefined, includeMetadata, options);
    result[0].ln = [entity.__start.id, entity.__end.id];
    
    if (callback) {
      callback(result, entity);
    }
    
    return result;
  }

  load(entity: Line2d, data: LoadData, options: DumpOptions = {}): void {
    super.load(entity, data, options);
    
    if (data.start != null && data.end != null) {
      entity.__start = Entity.loadFromDumpById(data.start, options) as Point2d;
      entity.__end = Entity.loadFromDumpById(data.end, options) as Point2d;
      entity.addChild(entity.__start);
      entity.addChild(entity.__end);
    } else if (data.ln != null) {
      entity.__start = Entity.loadFromDumpById(data.ln[0], options) as Point2d;
      entity.__end = Entity.loadFromDumpById(data.ln[1], options) as Point2d;
      entity.addChild(entity.__start);
      entity.addChild(entity.__end);
    }
  }
}

export class Line2d extends Curve2d {
  __start!: Point2d;
  __end!: Point2d;

  constructor(name: string = "", parent?: Entity) {
    super(name, parent);
  }

  static create(start: Point2d, end: Point2d): Line2d {
    const line = new Line2d();
    line.__start = start;
    line.__end = end;
    line.addChild(start);
    line.addChild(end);
    return line;
  }

  private _setStart(point: Point2d): void {
    const oldStart = this.__start;
    if (oldStart && oldStart !== this.__end) {
      this.removeChild(oldStart, true, false);
    }
    this.__start = point;
    if (point) {
      this.addChild(point);
    }
  }

  private _setEnd(point: Point2d): void {
    const oldEnd = this.__end;
    if (oldEnd && oldEnd !== this.__start) {
      this.removeChild(oldEnd, true, false);
    }
    this.__end = point;
    if (point) {
      this.addChild(point);
    }
  }

  @EntityField({
    partialSet(this: Line2d, value: Point2d): void {
      this._setStart(value);
    }
  })
  start!: Point2d;

  @EntityField({
    partialSet(this: Line2d, value: Point2d): void {
      this._setEnd(value);
    }
  })
  end!: Point2d;

  get points(): Coordinate[] {
    return [this.from, this.to];
  }

  get from(): Coordinate {
    return this.start;
  }

  set from(value: Coordinate) {
    this.start = value as Point2d;
  }

  get to(): Coordinate {
    return this.end;
  }

  set to(value: Coordinate) {
    this.end = value as Point2d;
  }

  get length(): number {
    if (!this.from || !this.to) {
      return 0;
    }
    return Vec2.fromCoordinate(Vec2.fromCoordinate(this.to).subtract(this.from)).magnitude();
  }

  get geometry(): Coordinate[] {
    if (!this.start || !this.end) {
      return [];
    }
    return [this.start.geometry, this.end.geometry];
  }

  get key(): string {
    if (this.start && this.end) {
      const sortedIds = [this.start.id, this.end.id].sort().join('-');
      return `Line2d-${sortedIds}`;
    }
    Logger.console.assert(false, 'invalid line!');
    return '';
  }

  get middle(): Vec2 | undefined {
    if (this.start && this.end) {
      return new Vec2().lerpVectors(
        Vec2.fromCoordinate(this.start),
        Vec2.fromCoordinate(this.end),
        0.5
      );
    }
    Logger.console.assert(false, 'invalid line!');
    return undefined;
  }

  get direction(): Vec2 {
    return Vec2.fromCoordinate(this.__end).subtract(this.__start);
  }

  get discretePoints(): Coordinate[] {
    return this.getDiscretePoints();
  }

  getIO(): Line2d_IO {
    return Line2d_IO.instance();
  }

  toTHREECurve(): THREE.Line3 {
    const startVector = GeLib.VectorUtils.toTHREEVector3(this.start);
    const endVector = GeLib.VectorUtils.toTHREEVector3(this.end);
    return new THREE.Line3(startVector, endVector);
  }

  refreshBoundInternal(): void {
    const bound = this.boundInternal;
    bound.reset();
    
    const { start, end } = this;
    if (start) {
      bound.appendPoint(start);
    }
    if (end) {
      bound.appendPoint(end);
    }
  }

  offset(offsetX: number, offsetY: number): void {
    if (this.start && this.end) {
      this.start.offset(offsetX, offsetY);
      this.end.offset(offsetX, offsetY);
    } else {
      Logger.console.assert(false, 'invalid line!');
    }
  }

  createSubCurve(startPoint: Point2d | Coordinate, endPoint: Point2d | Coordinate): Line2d {
    const start = startPoint instanceof Point2d 
      ? startPoint 
      : Point2d.createFromPoint(startPoint);
    const end = endPoint instanceof Point2d 
      ? endPoint 
      : Point2d.createFromPoint(endPoint);
    return Line2d.create(start, end);
  }

  getTangent(parameter: number): Vec2 {
    return this.direction;
  }

  getDiscretePoints(): Coordinate[] {
    if (this.start && this.end) {
      return [
        { x: this.start.x, y: this.start.y },
        { x: this.end.x, y: this.end.y }
      ];
    }
    Logger.console.assert(false, 'invalid line!');
    return [];
  }

  verify(): boolean {
    if (!(this.__start instanceof HSCore.Model.Point2d) || !this.hasChild(this.__start)) {
      log.error(`${this.tag}: invalid start.`, 'HSCore.Verify.Error', true);
      return false;
    }
    if (!(this.__end instanceof HSCore.Model.Point2d) || !this.hasChild(this.__end)) {
      log.error(`${this.tag}: invalid end.`, 'HSCore.Verify.Error', true);
      return false;
    }
    return super.verify();
  }

  onFieldChanged(fieldName: string, newValue: unknown, oldValue: unknown): void {
    if (['start', 'end'].includes(fieldName)) {
      this.dirtyGeometry();
    }
    super.onFieldChanged(fieldName, newValue, oldValue);
  }
}

Entity.registerClass(HSConstants.ModelClass.Line2d, Line2d);