import { Entity, Entity_IO } from './Entity';
import { EntityField } from './decorators';

interface Point {
  x: number;
  y: number;
}

interface ParallelLine {
  [key: string]: unknown;
}

interface UnderlayData {
  x: number;
  y: number;
  width: number;
  height: number;
  url: string;
  show: boolean;
  showSnapPoint: boolean;
  cadPoints: Point[];
  parallelLines: ParallelLine[];
}

interface UnderlaySerializedData extends Record<string, unknown> {
  x: number;
  y: number;
  width: number;
  height: number;
  url: string;
  show: boolean;
  showSnapPoint: boolean;
  cadPoints?: unknown;
  parallelLines?: ParallelLine[];
}

interface DumpOptions {
  [key: string]: unknown;
}

type DumpCallback = (result: unknown[], entity: Underlay) => void;

export class Underlay_IO extends Entity_IO {
  dump(
    entity: Underlay,
    callback?: DumpCallback,
    includeMetadata: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const result = super.dump(entity, undefined, includeMetadata, options);
    const serialized = result[0] as UnderlaySerializedData;

    serialized.x = entity.x;
    serialized.y = entity.y;
    serialized.width = entity.width;
    serialized.height = entity.height;
    serialized.url = entity.url || '';
    serialized.show = entity.show;
    serialized.showSnapPoint = entity.showSnapPoint;

    if (entity.cadPoints && entity.cadPoints.length > 0) {
      serialized.cadPoints = HSCore.Util.Point.savePoints2(entity.cadPoints);
    }

    if (entity.parallelLines && entity.parallelLines.length > 0) {
      serialized.parallelLines = entity.parallelLines;
    }

    if (callback) {
      callback(result, entity);
    }

    return result;
  }

  load(entity: Underlay, data: UnderlaySerializedData, context: unknown): void {
    super.load(entity, data, context);

    entity.__x = data.x;
    entity.__y = data.y;
    entity.__width = data.width;
    entity.__height = data.height;
    entity.__url = data.url || '';
    entity.__show = data.show === undefined || data.show;
    entity.__showSnapPoint = data.showSnapPoint !== undefined && data.showSnapPoint;
    entity.__cadPoints = HSCore.Util.Point.loadPoints2(data.cadPoints) || [];
    entity.__parallelLines = data.parallelLines || [];
  }
}

export class Underlay extends Entity {
  @EntityField()
  __x: number = 0;

  @EntityField()
  __y: number = 0;

  @EntityField()
  __width: number = 0;

  @EntityField()
  __height: number = 0;

  @EntityField()
  __url: string = '';

  @EntityField()
  __show: boolean = false;

  @EntityField()
  __showSnapPoint: boolean = false;

  @EntityField()
  __cadPoints: Point[] = [];

  @EntityField()
  __parallelLines: ParallelLine[] = [];

  constructor(id: string = '', floorplan?: unknown) {
    super(id, floorplan);
  }

  static create(data?: Partial<UnderlayData>): Underlay {
    const id = HSCore.Util.IDGenerator.generate('', HSCore.Util.IDGeneratorType.Entity);
    const underlay = new Underlay(id);

    if (data) {
      underlay.set(data);
    }

    return underlay;
  }

  get x(): number {
    return this.__x;
  }

  set x(value: number) {
    this.__x = value;
  }

  get y(): number {
    return this.__y;
  }

  set y(value: number) {
    this.__y = value;
  }

  get width(): number {
    return this.__width;
  }

  set width(value: number) {
    this.__width = value;
  }

  get height(): number {
    return this.__height;
  }

  set height(value: number) {
    this.__height = value;
  }

  get url(): string {
    return this.__url;
  }

  set url(value: string) {
    this.__url = value;
  }

  get show(): boolean {
    return this.__show;
  }

  set show(value: boolean) {
    this.__show = value;
  }

  get showSnapPoint(): boolean {
    return this.__showSnapPoint;
  }

  set showSnapPoint(value: boolean) {
    this.__showSnapPoint = value;
  }

  get cadPoints(): Point[] {
    return this.__cadPoints;
  }

  set cadPoints(value: Point[]) {
    this.__cadPoints = value;
  }

  get parallelLines(): ParallelLine[] {
    return this.__parallelLines;
  }

  set parallelLines(value: ParallelLine[]) {
    this.__parallelLines = value;
  }

  isRoot(): boolean {
    return true;
  }

  reset(): void {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.url = '';
    this.show = false;
    this.showSnapPoint = false;
    this.cadPoints = [];
    this.parallelLines = [];
    this._floorplan.signalUnderlayChanged.dispatch(this);
  }

  set(data?: Partial<UnderlayData>): void {
    if (!data) {
      this.reset();
      return;
    }

    const hasChanges =
      this.x !== data.x ||
      this.y !== data.y ||
      this.width !== data.width ||
      this.height !== data.height ||
      this.url !== data.url;

    if (!hasChanges) {
      return;
    }

    this.x = data.x ?? this.x;
    this.y = data.y ?? this.y;
    this.width = data.width ?? this.width;
    this.height = data.height ?? this.height;
    this.url = data.url ?? this.url;
    this.show = data.show ?? this.show;
    this.showSnapPoint = data.showSnapPoint ?? this.showSnapPoint;
    this.cadPoints = (data.cadPoints || []).filter((point): point is Point => !!point);
    this.parallelLines = data.parallelLines || [];
    this._floorplan.signalUnderlayChanged.dispatch(this);
  }

  getData(): UnderlayData {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      url: this.url,
      show: this.show,
      showSnapPoint: this.showSnapPoint,
      cadPoints: this.cadPoints,
      parallelLines: this.parallelLines,
    };
  }

  getIO(): Underlay_IO {
    return Underlay_IO.instance();
  }

  verify(): boolean {
    return true;
  }

  showBackground(shouldShow: boolean): void {
    if (this.show !== shouldShow) {
      this.show = shouldShow;
      this._floorplan.signalUnderlayChanged.dispatch(this);
    }
  }
}

Entity.registerClass(HSConstants.ModelClass.NgUnderlay, Underlay);