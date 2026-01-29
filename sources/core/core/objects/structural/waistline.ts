import { Region } from './Region';
import { Entity } from './Entity';
import { DiscretePolygon2d } from './DiscretePolygon2d';
import { BoundingBox2D } from './BoundingBox2D';
import { EntityField } from './EntityField';

interface Polygon {
  outer: number[][];
  holes: number[][][];
}

interface BoundingBoxData {
  min: { x: number; y: number };
  max: { x: number; y: number };
}

interface ClipOptions {
  operation: any;
  subject_fillType: any;
  clip_fillType: any;
}

interface DumpContext {
  [key: string]: any;
}

interface LoadContext {
  [key: string]: any;
}

interface DumpData {
  thickness?: number;
  bottomLineHeight?: number;
  [key: string]: any;
}

interface ClonedDumpData {
  dumps: DumpData[];
  context: LoadContext;
}

interface BoundingResult {
  x: number;
  x2: number;
  y: number;
  y2: number;
}

class Waistline extends Region {
  static readonly DefaultWidth: number = 0.2;
  private static _Waistline_IO_instance?: Waistline_IO;

  @EntityField()
  width: number = 0;

  @EntityField()
  bottomLineHeight: number = 0;

  private __width: number;
  private __bottomLineHeight: number;

  constructor(name: string = "", config?: any) {
    super(name, config);
    this.__width = Waistline.DefaultWidth;
    this.__bottomLineHeight = 0;
  }

  static createWaistline(
    parent: any,
    width: number,
    bottomLineHeight: number,
    index: number = 0
  ): Waistline {
    const waistline = new Waistline();
    waistline.__width = width;
    waistline.__bottomLineHeight = bottomLineHeight;
    parent.insertWaistline(waistline, index);
    waistline.updateGeometry();
    return waistline;
  }

  get thickness(): number {
    return this.width;
  }

  set thickness(value: number) {
    this.width = value;
  }

  get __thickness(): number {
    return this.__width;
  }

  set __thickness(value: number) {
    this.__width = value;
  }

  updateGeometry(): void {
    if (!this.parent) return;

    const uncutPolygon = this.getUnCutPolygon();
    const parentPolygons = this.parent.geomPolygons;

    const clipOptions: ClipOptions = {
      operation: HSCore.Util.Collision.ClipType.inter,
      subject_fillType: HSCore.Util.Collision.PolyFillType.positive,
      clip_fillType: HSCore.Util.Collision.PolyFillType.positive
    };

    const clippedFaces = HSCore.Util.Collision.ClipFaces(
      parentPolygons,
      [uncutPolygon],
      clipOptions
    );

    this.geomPolygons = clippedFaces ?? [];
  }

  setBottomLinePaintPos(paintY: number): void {
    this.bottomLineHeight = Waistline.getBottomLineHeightOfPaintPos(
      paintY,
      this.parent
    );
  }

  static getBottomLineHeightOfPaintPos(paintY: number, parent: any): number {
    const bound = DiscretePolygon2d.getBound(parent.geomPolygons);
    return bound ? bound.max.y - paintY : -paintY;
  }

  getUnCutBound(): BoundingBoxData | null {
    if (!this.parent) return null;

    const parentBound = DiscretePolygon2d.getBound(this.parent.geomPolygons);
    const topY = parentBound.max.y - this.bottomLineHeight;
    const bottomY = topY - this.thickness;

    return BoundingBox2D.create(parentBound.min.x, parentBound.max.x, bottomY, topY);
  }

  getUnCutPolygon(): Polygon {
    const bound = this.getUnCutBound();
    let polygon: Polygon = {
      outer: [],
      holes: []
    };

    if (bound) {
      polygon = BoundingBox2D.getPolygon(bound);
    }

    return polygon;
  }

  getIO(): Waistline_IO {
    return Waistline_IO.instance();
  }

  clone(): Waistline {
    const cloned = new Waistline();
    const clonedData: ClonedDumpData = super.getClonedDumpData();
    cloned.load(clonedData.dumps[0], clonedData.context);
    cloned.verify();
    return cloned;
  }

  bounding(): BoundingResult {
    const bound = this.getUnCutBound();
    
    if (bound === null) {
      return {
        x: 0,
        x2: 0,
        y: 0,
        y2: 0
      };
    }

    return {
      x: bound.min.x,
      x2: bound.max.x,
      y: bound.min.y,
      y2: bound.max.y
    };
  }

  fitToLayout(layout: any): void {
    // Implementation placeholder
  }
}

class Waistline_IO extends Region.Region_IO {
  private static _instance?: Waistline_IO;

  static instance(): Waistline_IO {
    if (!Waistline_IO._instance) {
      Waistline_IO._instance = new Waistline_IO();
    }
    return Waistline_IO._instance;
  }

  dump(
    entity: Waistline,
    callback?: (dumps: DumpData[], entity: Waistline) => void,
    includeGeometry: boolean = true,
    context: DumpContext = {}
  ): DumpData[] {
    const dumps = super.dump(entity, undefined, includeGeometry, context);
    const mainDump = dumps[0];

    mainDump.thickness = entity.width;
    mainDump.bottomLineHeight = entity.bottomLineHeight;

    if (callback) {
      callback(dumps, entity);
    }

    return dumps;
  }

  load(
    entity: Waistline,
    data: DumpData,
    context: LoadContext = {}
  ): void {
    super.load(entity, data, context);
    entity.width = data.thickness ?? 0;
    entity.bottomLineHeight = data.bottomLineHeight ?? 0;
  }
}

Entity.registerClass(HSConstants.ModelClass.Waistline, Waistline);

export { Waistline, Waistline_IO };