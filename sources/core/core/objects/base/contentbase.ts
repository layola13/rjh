import { Entity_IO, Entity } from './Entity';
import { EntityField } from './EntityField';

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface Point3D extends Array<number> {
  0: number;
  1: number;
  2: number;
  length: 3;
}

interface RotationAnimation {
  type: 'rotation';
  angle: number;
  anchor: Point3D;
  axis: Point3D;
}

interface SerializedContentBase {
  x: number;
  y: number;
  z: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  isScalable: boolean;
  flip: number;
  XLength: number;
  YLength: number;
  ZLength: number;
  animations?: RotationAnimation[];
}

type DumpCallback = (result: unknown[], entity: ContentBase) => void;

export class ContentBase_IO extends Entity_IO {
  private static _instance: ContentBase_IO;

  static instance(): ContentBase_IO {
    if (!ContentBase_IO._instance) {
      ContentBase_IO._instance = new ContentBase_IO();
    }
    return ContentBase_IO._instance;
  }

  dump(
    entity: ContentBase,
    callback?: DumpCallback,
    includeMetadata: boolean = true,
    options: Record<string, unknown> = {}
  ): unknown[] {
    const result = super.dump(entity, undefined, includeMetadata, options);
    const serialized = result[0] as SerializedContentBase;

    serialized.x = entity.x;
    serialized.y = entity.y;
    serialized.z = entity.z;
    serialized.XRotation = entity.XRotation;
    serialized.YRotation = entity.YRotation;
    serialized.ZRotation = entity.ZRotation;
    serialized.XScale = entity.XScale;
    serialized.YScale = entity.YScale;
    serialized.ZScale = entity.ZScale;
    serialized.isScalable = entity.isScalable;
    serialized.flip = entity.flip;
    serialized.XLength = entity.XLength;
    serialized.YLength = entity.YLength;
    serialized.ZLength = entity.ZLength;

    if (entity.isOpened) {
      serialized.animations = [{
        type: 'rotation',
        angle: entity.angle,
        anchor: entity.anchor,
        axis: entity.anchorAxis
      }];
    }

    callback?.(result, entity);

    return result;
  }

  load(
    entity: ContentBase,
    data: SerializedContentBase,
    context?: unknown
  ): void {
    super.load(entity, data, context);

    entity.__x = data.x;
    entity.__y = data.y;
    entity.__z = data.z;
    entity.__XRotation = data.XRotation || 0;
    entity.__YRotation = data.YRotation || 0;
    entity.__ZRotation = data.ZRotation || 0;
    entity.__XScale = data.XScale || 1;
    entity.__YScale = data.YScale || 1;
    entity.__ZScale = data.ZScale || 1;
    entity.__isScalable = !!data.isScalable;
    entity.__flip = data.flip || 0;
    entity.__XLength = data.XLength || entity.XLength;
    entity.__YLength = data.YLength || entity.YLength;
    entity.__ZLength = data.ZLength || entity.ZLength;

    const animations = data.animations || [];
    const rotationAnimation = animations.find(anim => anim.type === 'rotation');

    if (rotationAnimation) {
      entity.__isOpened = true;
      entity.__angle = rotationAnimation.angle;
      entity.__anchor = rotationAnimation.anchor;
      entity.__anchorAxis = rotationAnimation.axis;
    } else {
      entity.__isOpened = false;
      entity.__angle = 0;
      entity.__anchor = [0, 0, 0];
      entity.__anchorAxis = [0, 0, 1];
    }
  }
}

export class ContentBase extends Entity {
  __x: number = 0;
  __y: number = 0;
  __z: number = 0;
  __XLength: number = 1;
  __YLength: number = 1;
  __ZLength: number = 1;
  __isScalable: boolean = false;
  __XScale: number = 1;
  __YScale: number = 1;
  __ZScale: number = 1;
  __XRotation: number = 0;
  __YRotation: number = 0;
  __ZRotation: number = 0;
  __flip: number = 0;
  __isOpened: boolean = false;
  __angle: number = 0;
  __anchor: Point3D = [0, 0, 0];
  __anchorAxis: Point3D = [0, 0, 1];
  __translation: Point3D = [0, 0, 0];

  constructor(id: string = "", parent?: unknown) {
    super(id, parent);
  }

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
  get z(): number {
    return this.__z;
  }
  set z(value: number) {
    this.__z = value;
  }

  @EntityField()
  get XLength(): number {
    return this.__XLength;
  }
  set XLength(value: number) {
    this.__XLength = value;
  }

  @EntityField()
  get YLength(): number {
    return this.__YLength;
  }
  set YLength(value: number) {
    this.__YLength = value;
  }

  @EntityField()
  get ZLength(): number {
    return this.__ZLength;
  }
  set ZLength(value: number) {
    this.__ZLength = value;
  }

  @EntityField()
  get isScalable(): boolean {
    return this.__isScalable;
  }
  set isScalable(value: boolean) {
    this.__isScalable = value;
  }

  @EntityField()
  get XScale(): number {
    return this.__XScale;
  }
  set XScale(value: number) {
    this.__XScale = value;
  }

  @EntityField()
  get YScale(): number {
    return this.__YScale;
  }
  set YScale(value: number) {
    this.__YScale = value;
  }

  @EntityField()
  get ZScale(): number {
    return this.__ZScale;
  }
  set ZScale(value: number) {
    this.__ZScale = value;
  }

  @EntityField()
  get XRotation(): number {
    return this.__XRotation;
  }
  set XRotation(value: number) {
    this.__XRotation = value;
  }

  @EntityField()
  get YRotation(): number {
    return this.__YRotation;
  }
  set YRotation(value: number) {
    this.__YRotation = value;
  }

  @EntityField()
  get ZRotation(): number {
    return this.__ZRotation;
  }
  set ZRotation(value: number) {
    this.__ZRotation = value;
  }

  @EntityField()
  get flip(): number {
    return this.__flip;
  }
  set flip(value: number) {
    this.__flip = value;
  }

  @EntityField()
  get isOpened(): boolean {
    return this.__isOpened;
  }
  set isOpened(value: boolean) {
    this.__isOpened = value;
  }

  @EntityField()
  get angle(): number {
    return this.__angle;
  }
  set angle(value: number) {
    this.__angle = value;
  }

  @EntityField()
  get anchor(): Point3D {
    return this.__anchor;
  }
  set anchor(value: Point3D) {
    this.__anchor = value;
  }

  @EntityField()
  get anchorAxis(): Point3D {
    return this.__anchorAxis;
  }
  set anchorAxis(value: Point3D) {
    this.__anchorAxis = value;
  }

  @EntityField()
  get translation(): Point3D {
    return this.__translation;
  }
  set translation(value: Point3D) {
    this.__translation = value;
  }

  get XSize(): number {
    return this.XLength * this.XScale;
  }

  get YSize(): number {
    return this.YLength * this.YScale;
  }

  get ZSize(): number {
    return this.ZLength * this.ZScale;
  }

  getHost(): unknown {
    return undefined;
  }

  getIO(): ContentBase_IO {
    return ContentBase_IO.instance();
  }
}