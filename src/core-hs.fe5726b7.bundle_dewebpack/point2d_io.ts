import { Entity_IO, Entity } from './Entity';
import { EntityField } from './EntityField';

export class Point2d_IO extends Entity_IO {
  private static _Point2d_IO_instance: Point2d_IO;

  static instance(): Point2d_IO {
    if (!Point2d_IO._Point2d_IO_instance) {
      Point2d_IO._Point2d_IO_instance = new Point2d_IO();
    }
    return Point2d_IO._Point2d_IO_instance;
  }

  dump(
    entity: Point2d,
    callback?: (data: unknown[], entity: Point2d) => void,
    includeBase: boolean = true,
    options: Record<string, unknown> = {}
  ): unknown[] {
    const data = super.dump(entity, undefined, includeBase, options);
    const entityData = data[0] as Record<string, unknown>;
    
    entityData.x = entity.x;
    entityData.y = entity.y;
    
    if (entity.isbackground) {
      entityData.isbk = entity.isbackground;
    }
    
    if (callback) {
      callback(data, entity);
    }
    
    return data;
  }

  load(
    entity: Point2d,
    data: Record<string, unknown>,
    options: Record<string, unknown> = {}
  ): void {
    super.load(entity, data, options);
    
    entity.__x = (data.x as number) || 0;
    entity.__y = (data.y as number) || 0;
    entity.isbackground = data.isbk != null ? !!data.isbk : !!data.isbackground;
    
    if (options.dispatchEvent) {
      entity.dirtyGeometry();
    }
  }
}

export enum Point2dTypeEnum {
  LineLineIntersect = 2,
  LineArcIntersect = 4,
  ArcArcIntersect = 8
}

export class Point2d extends Entity {
  __x: number = 0;
  __y: number = 0;
  
  @EntityField()
  get x(): number {
    return this.__x;
  }
  set x(value: number) {
    this.__x = value;
  }

  @EntityField()
  get y(): number {
    return this.__y;
  }
  set y(value: number) {
    this.__y = value;
  }

  @EntityField()
  isbackground: boolean = false;

  point2dType: Point2dTypeEnum = Point2dTypeEnum.LineLineIntersect;

  constructor(id: string = "", parent?: unknown) {
    super(id, parent);
  }

  static create(
    x: number = 0,
    y: number = 0,
    type: Point2dTypeEnum = Point2dTypeEnum.LineLineIntersect
  ): Point2d {
    const point = new Point2d();
    point.__x = Number(x);
    point.__y = Number(y);
    point.point2dType = type;
    return point;
  }

  static createFromPoint(point: { x: number; y: number }): Point2d {
    return Point2d.create(point.x, point.y);
  }

  get geometry(): { x: number; y: number } {
    return {
      x: this.__x,
      y: this.__y
    };
  }

  getIO(): Point2d_IO {
    return Point2d_IO.instance();
  }

  clone(): Point2d {
    return Point2d.create(this.__x, this.__y);
  }

  set(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  offset(dx: number, dy: number): void {
    this.set(this.x + dx, this.y + dy);
  }

  verify(): boolean {
    const isValid = [this.__x, this.__y].every(HSCore.Util.Object.isValidNumber);
    
    if (!isValid) {
      log.error(`${this.tag}: invalid values.`, 'HSCore.Verify.Error', true);
      return false;
    }
    
    return super.verify();
  }

  isBackground(): boolean {
    return this.isbackground;
  }

  getPolygons(): Set<unknown> {
    const polygons = new Set<unknown>();
    
    for (const parent of Object.values(this.parents)) {
      for (const grandParent of Object.values(parent.parents)) {
        for (const greatGrandParent of Object.values(grandParent.parents)) {
          polygons.add(greatGrandParent);
        }
      }
    }
    
    return polygons;
  }

  refreshBoundInternal(): void {
    const bound = this.boundInternal;
    bound.reset();
    bound.appendPoint(this);
  }

  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void {
    if (['x', 'y'].includes(fieldName)) {
      this.dirtyGeometry();
    }
    super.onFieldChanged(fieldName, oldValue, newValue);
  }
}

Entity.registerClass(HSConstants.ModelClass.Point2D, Point2d);