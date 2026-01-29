import { Entity, Entity_IO } from './Entity';
import { EntityField } from './decorators';
import { Point2d } from './Point2d';
import { Line2d } from './Line2d';
import { Vec2 } from './Vec2';

interface DumpContext {
  [key: string]: unknown;
}

interface LoadContext {
  [key: string]: unknown;
}

interface DumpedData {
  [key: string]: unknown;
  ln?: [string, string];
}

export class GuideLine2d_IO extends Entity_IO {
  dump(
    entity: GuideLine2d,
    callback?: (data: DumpedData[], entity: GuideLine2d) => void,
    includeMetadata: boolean = true,
    context: DumpContext = {}
  ): DumpedData[] {
    const dumpedData = super.dump(entity, undefined, includeMetadata, context);
    dumpedData[0].ln = [entity.__start.id, entity.__end.id];
    
    if (callback) {
      callback(dumpedData, entity);
    }
    
    return dumpedData;
  }

  load(
    entity: GuideLine2d,
    data: DumpedData,
    context: LoadContext = {}
  ): void {
    super.load(entity, data, context);
    
    if (data.ln != null) {
      entity.__start = Entity.loadFromDumpById(data.ln[0], context) as Point2d;
      entity.__end = Entity.loadFromDumpById(data.ln[1], context) as Point2d;
      entity.addChild(entity.__start);
      entity.addChild(entity.__end);
    }
  }
}

export class GuideLine2d extends Entity {
  __start!: Point2d;
  __end!: Point2d;

  @EntityField({
    partialSet(this: GuideLine2d, value: Point2d): void {
      this._setStart(value);
    }
  })
  start!: Point2d;

  @EntityField({
    partialSet(this: GuideLine2d, value: Point2d): void {
      this._setEnd(value);
    }
  })
  end!: Point2d;

  get points(): Point2d[] {
    return [this.start, this.end];
  }

  get direction(): Vec2 {
    return Vec2.fromCoordinate(this.__end).subtract(this.__start);
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

  static create(startPoint: Point2d, endPoint: Point2d): GuideLine2d {
    const guideLine = new GuideLine2d();
    const line = new Line2d(startPoint, endPoint);
    const infiniteLine = line.getLength() < 1e6 ? line.toInfiniteLine() : line;
    const startPt = infiniteLine.getStartPt();
    const endPt = infiniteLine.getEndPt();
    const start = Point2d.create(startPt.x, startPt.y);
    const end = Point2d.create(endPt.x, endPt.y);
    
    guideLine.__start = start;
    guideLine.__end = end;
    guideLine.addChild(start);
    guideLine.addChild(end);
    
    return guideLine;
  }

  _setStart(point: Point2d): void {
    const currentStart = this.__start;
    if (currentStart && currentStart !== this.__end) {
      this.removeChild(currentStart, true, false);
    }
    this.__start = point;
    if (point) {
      this.addChild(point);
    }
  }

  _setEnd(point: Point2d): void {
    const currentEnd = this.__end;
    if (currentEnd && currentEnd !== this.__start) {
      this.removeChild(currentEnd, true, false);
    }
    this.__end = point;
    if (point) {
      this.addChild(point);
    }
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
    
    return true;
  }

  getIO(): GuideLine2d_IO {
    return GuideLine2d_IO.instance();
  }

  onFieldChanged(fieldName: string, newValue: unknown, oldValue: unknown): void {
    if (['start', 'end'].includes(fieldName)) {
      this.dirtyGeometry();
    }
    super.onFieldChanged(fieldName, newValue, oldValue);
  }
}

Entity.registerClass(HSConstants.ModelClass.GuideLine2d, GuideLine2d);