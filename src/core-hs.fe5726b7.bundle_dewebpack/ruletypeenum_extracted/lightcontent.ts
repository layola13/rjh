export enum ContentType {
  LIGHT = 'light',
  GROUP = 'group'
}

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export interface Size3D {
  x: number;
  y: number;
  z: number;
}

export interface OutlinePoint {
  x: number;
  y: number;
}

export interface ContentMetadata {
  categories?: string[];
}

export interface IContent {
  contentType?: string;
  metadata?: ContentMetadata;
  x: number;
  y: number;
  z: number;
  XSize: number;
  YSize: number;
  ZSize: number;
  rotation?: number;
  getHost(): unknown;
}

export interface IVisitor {
  visit(content: LightContent, param1: unknown, param2: unknown): unknown;
}

export interface VisitResult {
  content: LightContent;
  lights: unknown;
}

export class LightContent {
  protected _contentType: string;
  protected _content: IContent;
  protected _position: Position3D | undefined;
  protected _rotation: number | undefined;
  protected _size: Size3D | undefined;
  protected _outline: OutlinePoint[] | undefined;
  protected _categories: string[] | undefined;

  constructor(content: IContent, contentType?: string) {
    this._contentType = contentType ?? content.contentType ?? '';
    this._content = content;
    this._position = undefined;
    this._rotation = undefined;
    this._size = undefined;
    this._outline = undefined;

    if (
      content.metadata?.categories &&
      Array.isArray(content.metadata.categories) &&
      content.metadata.categories.length !== 0
    ) {
      this._categories = content.metadata.categories.slice();
    }

    this._calculateOutline();
  }

  contentType(): string {
    return this._contentType;
  }

  getContents(): IContent[] {
    return [this._content];
  }

  getCategories(): string[] | undefined {
    return this._categories;
  }

  getHost(): unknown {
    return this._content.getHost();
  }

  get frontForwardVec(): THREE.Vector2 {
    const vector = new THREE.Vector2(0, -1);
    const origin = new THREE.Vector2(0, 0);
    return vector
      .rotateAround(origin, THREE.Math.degToRad(-this._rotation!))
      .normalize();
  }

  get leftForwardVec(): THREE.Vector2 {
    const origin = new THREE.Vector2(0, 0);
    return this.frontForwardVec
      .clone()
      .rotateAround(origin, THREE.Math.degToRad(-90))
      .normalize();
  }

  get rightForwardVec(): THREE.Vector2 {
    const origin = new THREE.Vector2(0, 0);
    return this.frontForwardVec
      .clone()
      .rotateAround(origin, THREE.Math.degToRad(90))
      .normalize();
  }

  get backForwardVec(): THREE.Vector2 {
    const origin = new THREE.Vector2(0, 0);
    return this.frontForwardVec
      .clone()
      .rotateAround(origin, THREE.Math.degToRad(180))
      .normalize();
  }

  accept(
    visitors: IVisitor[],
    param1: unknown,
    param2: unknown
  ): VisitResult | null {
    const visitorCount = visitors.length;
    let visitResult: unknown;

    try {
      for (let index = 0; index < visitorCount && !visitResult; index++) {
        visitResult = visitors[index].visit(this, param1, param2);
      }
    } catch (error) {
      (HSCore.Logger as any).console.log(error);
    }

    return visitResult
      ? {
          content: this,
          lights: visitResult
        }
      : null;
  }

  getPosition(): Position3D | undefined {
    return this._position;
  }

  getOutline(): OutlinePoint[] | undefined {
    return this._outline;
  }

  getRotation(): number | undefined {
    return this._rotation;
  }

  getSize(): Size3D | undefined {
    return this._size;
  }

  protected _calculateOutline(): void {
    const content = this._content;

    this._position = {
      x: content.x,
      y: content.y,
      z: content.z
    };

    const size: Size3D = {
      x: content.XSize,
      y: content.YSize,
      z: content.ZSize
    };

    this._rotation = content.rotation ?? 0;
    this._size = size;
    this._outline = (HSCore.Util.Math as any).computeOutline(
      this._position,
      size.x,
      size.y,
      this._rotation
    );
  }
}

export class LightContentGroup extends LightContent {
  protected _children: LightContent[];

  constructor(
    content: IContent,
    children?: LightContent[],
    contentType?: string
  ) {
    super(content, contentType);
    this._children = children ?? [];
    this._calculateOutlineForVirtualGroup();
  }

  getContents(): IContent[] {
    return this._children.reduce(
      (accumulator: IContent[], child: LightContent) => {
        accumulator.push(...child.getContents());
        return accumulator;
      },
      [this._content]
    );
  }

  getChildren(): LightContent[] {
    return this._children;
  }

  protected _calculateOutlineForVirtualGroup(): void {
    if (this._content && this._content instanceof (HSCore.Model as any).Group) {
      return;
    }

    if (!this._children || this._children.length === 0) {
      return;
    }

    const content = this._content;
    const childOutlines = this._children.map(child => child.getOutline()!);

    this._rotation = content.rotation ?? 0;

    const contentPosition = new THREE.Vector2(content.x, content.y);
    const shouldRotate = Math.abs(this._rotation % 180) > 2;
    const rotationAngle = shouldRotate
      ? THREE.Math.degToRad(this._rotation)
      : undefined;

    const allPoints = childOutlines.flat().map((point: OutlinePoint) => {
      const vector = new THREE.Vector2(point.x, point.y);
      if (rotationAngle) {
        vector.rotateAround(
          { x: contentPosition.x, y: contentPosition.y },
          rotationAngle
        );
      }
      return vector;
    });

    const boundingBox = new THREE.Box2();
    boundingBox.setFromPoints(allPoints);

    const size = boundingBox.getSize(new THREE.Vector2());

    this._size = size as unknown as Size3D;
    this._position = {
      x: contentPosition.x,
      y: contentPosition.y,
      z: content.z
    };
    this._outline = (HSCore.Util.Math as any).computeOutline(
      contentPosition,
      size.x,
      size.y,
      this._rotation
    );
  }
}