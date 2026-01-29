import { MathUtil } from './MathUtil';
import { idGenerator } from './idGenerator';
import { ContentType } from './ContentType';
import { HSCore } from './HSCore';
import * as Vector3Module from './Vector3';

interface Point2D {
  x: number;
  y: number;
}

interface ContentBoxDump {
  seekId?: string;
  x: number;
  y: number;
  z: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  XLength: number;
  YLength: number;
  ZLength: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  flip?: number;
  contentType: string;
  categories?: string[];
  tag?: string;
}

interface ContentMeta {
  seekId?: string;
  XLength: number;
  YLength: number;
  ZLength: number;
  contentType: ContentType;
  categories?: string[];
}

interface Floor {
  bound: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  layerHeight: number;
}

interface Metadata {
  categories?: string[];
}

export class FakeContent {
  public XScale: number;
  public YScale: number;
  public ZScale: number;
  public XLength: number;
  public YLength: number;
  public ZLength: number;
  public XRotation: number;
  public YRotation: number;
  public ZRotation: number;
  public x: number;
  public y: number;
  public z: number;
  public flip: number;
  public id: string;
  public seekId?: string;
  public contentType?: ContentType;
  public metadata?: Metadata;
  public tag?: string;
  public outline: Point2D[];
  private boundInternal: HSCore.Util.BrepBound;

  constructor() {
    this.XLength = 0;
    this.XRotation = 0;
    this.XScale = 1;
    this.YLength = 0;
    this.YRotation = 0;
    this.YScale = 1;
    this.ZLength = 0;
    this.ZRotation = 0;
    this.flip = 0;
    this.ZScale = 1;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.boundInternal = new HSCore.Util.BrepBound();
    this.outline = [];
    this.id = idGenerator();
  }

  get rotation(): number {
    return this.ZRotation;
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

  get bound(): HSCore.Util.BrepBound {
    return this.boundInternal;
  }

  static fromContentBoxDump(dump: ContentBoxDump): FakeContent {
    const content = new FakeContent();
    content.seekId = dump.seekId;
    content.x = dump.x;
    content.y = dump.y;
    content.z = dump.z;
    content.XScale = dump.XScale;
    content.YScale = dump.YScale;
    content.ZScale = dump.ZScale;
    content.XLength = dump.XLength;
    content.YLength = dump.YLength;
    content.ZLength = dump.ZLength;
    content.XRotation = dump.XRotation;
    content.YRotation = dump.YRotation;
    content.ZRotation = dump.ZRotation;
    content.flip = dump.flip ?? 0;
    content.contentType = new ContentType(dump.contentType);
    content.metadata = {
      categories: dump.categories
    };
    content.tag = dump.tag;
    content.refreshBoundInternal();
    return content;
  }

  static fromContentMeta(meta: ContentMeta): FakeContent {
    const content = new FakeContent();
    content.seekId = meta.seekId;
    content.XLength = meta.XLength;
    content.YLength = meta.YLength;
    content.ZLength = meta.ZLength;
    content.contentType = meta.contentType;
    content.metadata = {
      categories: meta.categories
    };
    content.refreshBoundInternal();
    return content;
  }

  static fromFloor(floor: Floor): FakeContent {
    const { left, top, width, height } = floor.bound;
    const content = new FakeContent();
    content.x = left + width / 2;
    content.y = top + height / 2;
    content.z = 0;
    content.XLength = width;
    content.YLength = height;
    content.ZLength = floor.layerHeight;
    content.refreshBoundInternal();
    return content;
  }

  refreshBoundInternal(): void {
    const origin: Point2D = { x: 0, y: 0 };
    const bound = this.boundInternal;
    bound.reset();

    const center = HSCore.Util.Math.Vec2.fromCoordinate(this);
    const topLeft = HSCore.Util.Math.rotatePointCW(
      origin,
      { x: -this.XSize / 2, y: this.YSize / 2 },
      this.rotation
    ).add(this);
    const topRight = HSCore.Util.Math.rotatePointCW(
      origin,
      { x: this.XSize / 2, y: this.YSize / 2 },
      this.rotation
    ).add(this);

    this.outline[3] = topLeft;
    this.outline[2] = topRight;
    this.outline[1] = {
      x: 2 * center.x - topLeft.x,
      y: 2 * center.y - topLeft.y
    };
    this.outline[0] = {
      x: 2 * center.x - topRight.x,
      y: 2 * center.y - topRight.y
    };

    for (let i = 0; i < 4; ++i) {
      bound.appendPoint(this.outline[i]);
    }
  }

  rotateAround(pivot: Point2D, angle: number): void {
    const rotatedPosition = HSCore.Util.Math.rotatePointCW(pivot, this, angle);

    if (MathUtil.isNearlyEqual(this.XRotation, 0) && MathUtil.isNearlyEqual(this.YRotation, 0)) {
      this.ZRotation = (this.rotation + angle) % 360;
    } else {
      HSCore.Util.Content.rotateAroundWorldAxis(this, new Vector3Module.Vector3(0, 0, 1), angle);
    }

    this.x = rotatedPosition.x;
    this.y = rotatedPosition.y;
  }

  clone(): FakeContent {
    const cloned = new FakeContent();
    cloned.seekId = this.seekId;
    cloned.x = this.x;
    cloned.y = this.y;
    cloned.z = this.z;
    cloned.XScale = this.XScale;
    cloned.YScale = this.YScale;
    cloned.ZScale = this.ZScale;
    cloned.XLength = this.XLength;
    cloned.YLength = this.YLength;
    cloned.ZLength = this.ZLength;
    cloned.XRotation = this.XRotation;
    cloned.YRotation = this.YRotation;
    cloned.ZRotation = this.ZRotation;
    cloned.flip = this.flip;
    cloned.contentType = new ContentType(this.contentType!.getTypeString());
    cloned.metadata = this.metadata;
    cloned.tag = this.tag;
    cloned.refreshBoundInternal();
    return cloned;
  }
}

export { FakeContent as XScale };
export { FakeContent as YScale };
export { FakeContent as ZScale };
export { FakeContent as XLength };
export { FakeContent as YLength };
export { FakeContent as ZLength };
export { FakeContent as XRotation };
export { FakeContent as YRotation };
export { FakeContent as ZRotation };