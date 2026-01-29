import { Shape_IO, Shape } from './Shape';
import { Entity } from './Entity';
import { EntityField, isSameArray } from './EntityField';
import { clonePoint2ds } from './GeometryUtils';
import { isSamePoint, nearlyEquals } from './MathUtils';

export const GridTypeEnum = {
  MixedPaint: "mixedPaint",
  ExtPaint: "extPaint"
} as const;

export type GridType = typeof GridTypeEnum[keyof typeof GridTypeEnum];

Object.freeze(GridTypeEnum);

export interface Point2D {
  x: number;
  y: number;
}

export interface BoundingBox {
  x: number;
  x2: number;
  y: number;
  y2: number;
}

export interface TransformMatrix {
  m00_: number;
  m01_: number;
  m02_: number;
  m10_: number;
  m11_: number;
  m12_: number;
}

export class MixBlock_IO extends Shape_IO {
  private static _MixBlock_IO_instance?: MixBlock_IO;

  static instance(): MixBlock_IO {
    if (!MixBlock_IO._MixBlock_IO_instance) {
      MixBlock_IO._MixBlock_IO_instance = new MixBlock_IO();
    }
    return MixBlock_IO._MixBlock_IO_instance;
  }

  dump(
    entity: MixBlock,
    callback?: (result: any[], entity: MixBlock) => void,
    includeMetadata: boolean = true,
    options: Record<string, unknown> = {}
  ): any[] {
    const result = super.dump(entity, undefined, includeMetadata, options);
    const data = result[0];
    
    data.points = clonePoint2ds(entity.points);
    data.originPoints = clonePoint2ds(entity.originPoints);
    
    if (callback) {
      callback(result, entity);
    }
    
    return result;
  }

  load(
    entity: MixBlock,
    data: any,
    options: Record<string, unknown> = {}
  ): void {
    super.load(entity, data, options);
    entity.points = _.cloneDeep(data.points);
    entity.originPoints = _.cloneDeep(data.originPoints);
  }
}

export class MixBlock extends Shape {
  private __points: Point2D[] = [];
  private __holes: Point2D[][] = [];
  originPoints: Point2D[] = [];

  constructor(id: string = "", parent?: any) {
    super(id, parent);
  }

  static create(points: Point2D[], holes: Point2D[][] = []): MixBlock {
    const block = new MixBlock();
    
    block.__points = points.map(point => ({
      x: point.x,
      y: point.y
    }));
    
    block.__holes = holes;
    
    block.originPoints = points.map(point => ({
      x: point.x,
      y: point.y
    }));
    
    return block;
  }

  getIO(): MixBlock_IO {
    return MixBlock_IO.instance();
  }

  @EntityField({
    equals(this: MixBlock, newValue: Point2D[]): boolean {
      return isSameArray(newValue, this.__points, true, isSamePoint);
    }
  })
  get points(): Point2D[] {
    return this.__points;
  }

  set points(value: Point2D[]) {
    this.__points = value;
  }

  @EntityField()
  get holes(): Point2D[][] {
    return this.__holes;
  }

  set holes(value: Point2D[][]) {
    this.__holes = value;
  }

  get closedPath(): Point2D[] {
    const path = this.points.slice();
    
    if (!isSamePoint(path[0], path[path.length - 1])) {
      path.push(path[0]);
    }
    
    return path;
  }

  partOfGrid(): boolean {
    return this.parent instanceof HSCore.Model.MixGrid;
  }

  offset(offsetX: number, offsetY: number): void {
    const offsetPoints = this.points.map(point => ({
      x: point.x + offsetX,
      y: point.y + offsetY
    }));
    
    this.points = offsetPoints;
  }

  transform(matrix: TransformMatrix): this {
    const transformPoint = (point: Point2D): Point2D => ({
      x: matrix.m00_ * point.x + matrix.m01_ * point.y + matrix.m02_,
      y: matrix.m10_ * point.x + matrix.m11_ * point.y + matrix.m12_
    });
    
    const transformedPoints = this.points.map(point => transformPoint(point));
    this.points = transformedPoints;
    
    if (this.holes) {
      const transformedHoles = this.holes.map(hole => 
        hole.map(point => transformPoint(point))
      );
      this.holes = transformedHoles;
    }
    
    return this;
  }

  bounding(): BoundingBox {
    let minX = this.points[0].x;
    let maxX = this.points[0].x;
    let minY = this.points[0].y;
    let maxY = this.points[0].y;
    
    this.points.forEach(point => {
      minX = Math.min(point.x, minX);
      maxX = Math.max(point.x, maxX);
      minY = Math.min(point.y, minY);
      maxY = Math.max(point.y, maxY);
    });
    
    return {
      x: minX,
      x2: maxX,
      y: minY,
      y2: maxY
    };
  }

  getPath(): Point2D[][] {
    return [this.getOuterPoints()].concat(this.holes || []);
  }

  getDiscretePath(): Point2D[][] {
    return [this.getOuterPoints()].concat(this.holes || []);
  }

  getDiscretePoints(): Point2D[] {
    return this.getOuterPoints();
  }

  getOuterPoints(): Point2D[] {
    const clonedPoints = this.points.map(point => ({
      x: point.x,
      y: point.y
    }));
    
    const simplified = HSCore.Util.Collision.SimplifyPolygons([clonedPoints]);
    const matchedPoints: Point2D[] = [];
    
    for (let i = 0; i < clonedPoints.length; i++) {
      for (let j = 0; j < simplified[0].length; j++) {
        const original = clonedPoints[i];
        const simplifiedPoint = simplified[0][j];
        
        if (nearlyEquals(original.x, simplifiedPoint.x) && 
            nearlyEquals(original.y, simplifiedPoint.y)) {
          matchedPoints.push(original);
          break;
        }
      }
    }
    
    return matchedPoints;
  }

  toPolygon(): Point2D[] {
    return this.points.slice();
  }

  copyFrom(source: MixBlock): void {
    super.copyFrom(source);
    this.points = _.cloneDeep(source.points);
    this.originPoints = _.cloneDeep(source.originPoints);
    this.holes = _.cloneDeep(source.holes);
  }

  clone(): MixBlock {
    const cloned = new MixBlock();
    cloned.copyFrom(this);
    return cloned;
  }

  onFieldChanged(fieldName: string, newValue: unknown, oldValue: unknown): void {
    if (["points", "holes"].includes(fieldName)) {
      this.dirtyGeometry();
    }
    super.onFieldChanged(fieldName, newValue, oldValue);
  }
}

Entity.registerClass(HSConstants.ModelClass.MixBlock, MixBlock);