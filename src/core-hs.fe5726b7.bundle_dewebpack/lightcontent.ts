export enum ContentType {
  LIGHT = 'light',
  GROUP = 'group'
}

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface Size {
  x: number;
  y: number;
  z: number;
}

export interface Outline {
  x: number;
  y: number;
}

export interface ContentMetadata {
  categories?: string[];
}

export interface Content {
  contentType?: string;
  x: number;
  y: number;
  z: number;
  XSize: number;
  YSize: number;
  ZSize: number;
  rotation?: number;
  metadata?: ContentMetadata;
  getHost(): unknown;
}

export interface Visitor {
  visit(content: LightContent, ...args: unknown[]): unknown;
}

export interface AcceptResult {
  content: LightContent;
  lights: unknown;
}

export class LightContent {
  protected _contentType: string;
  protected _content: Content;
  protected _position: Position | undefined;
  protected _rotation: number | undefined;
  protected _size: Size | undefined;
  protected _outline: Outline[] | undefined;
  protected _categories: string[] | undefined;

  constructor(content: Content, contentType?: string) {
    this._contentType = contentType || content.contentType!;
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

  getContents(): Content[] {
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
    return vector.rotateAround(origin, THREE.Math.degToRad(-this._rotation!)).normalize();
  }

  get leftForwardVec(): THREE.Vector2 {
    const origin = new THREE.Vector2(0, 0);
    return this.frontForwardVec.rotateAround(origin, THREE.Math.degToRad(-90)).normalize();
  }

  get rightForwardVec(): THREE.Vector2 {
    const origin = new THREE.Vector2(0, 0);
    return this.frontForwardVec.rotateAround(origin, THREE.Math.degToRad(90)).normalize();
  }

  get backForwardVec(): THREE.Vector2 {
    const origin = new THREE.Vector2(0, 0);
    return this.frontForwardVec.rotateAround(origin, THREE.Math.degToRad(180)).normalize();
  }

  accept(visitors: Visitor[], ...args: unknown[]): AcceptResult | null {
    const visitorCount = visitors.length;
    let result: unknown;

    try {
      for (let i = 0; i < visitorCount && !result; i++) {
        result = visitors[i].visit(this, ...args);
      }
    } catch (error) {
      HSCore.Logger.console.log(error);
    }

    return result
      ? {
          content: this,
          lights: result
        }
      : null;
  }

  getPosition(): Position | undefined {
    return this._position;
  }

  getOutline(): Outline[] | undefined {
    return this._outline;
  }

  getRotation(): number | undefined {
    return this._rotation;
  }

  getSize(): Size | undefined {
    return this._size;
  }

  protected _calculateOutline(): void {
    const content = this._content;

    this._position = {
      x: content.x,
      y: content.y,
      z: content.z
    };

    const size: Size = {
      x: content.XSize,
      y: content.YSize,
      z: content.ZSize
    };

    this._rotation = content.rotation || 0;
    this._size = size;
    this._outline = HSCore.Util.Math.computeOutline(
      this._position,
      size.x,
      size.y,
      this._rotation
    );
  }
}

export class LightContentGroup extends LightContent {
  protected _children: LightContent[];

  constructor(content: Content, children?: LightContent[], contentType?: string) {
    super(content, contentType);
    this._children = children || [];
    this._calculateOutlineForVirtualGroup();
  }

  getContents(): Content[] {
    return this._children.reduce(
      (accumulator, child) => {
        accumulator.push(...child.getContents());
        return accumulator;
      },
      [this._content] as Content[]
    );
  }

  getChildren(): LightContent[] {
    return this._children;
  }

  protected _calculateOutlineForVirtualGroup(): void {
    if (this._content && this._content instanceof HSCore.Model.Group) {
      return;
    }

    if (!this._children || this._children.length === 0) {
      return;
    }

    const content = this._content;
    const childOutlines = this._children.map(child => child.getOutline()!);

    this._rotation = content.rotation || 0;

    const contentPosition = new THREE.Vector2(content.x, content.y);
    const rotationAngle =
      Math.abs(this._rotation % 180) > 2 ? THREE.Math.degToRad(this._rotation) : undefined;

    const transformedPoints = childOutlines.flat().map(point => {
      const vector = new THREE.Vector2(point.x, point.y);
      if (rotationAngle) {
        vector.rotateAround(
          {
            x: contentPosition.x,
            y: contentPosition.y
          },
          rotationAngle
        );
      }
      return vector;
    });

    const boundingBox = new THREE.Box2();
    boundingBox.setFromPoints(transformedPoints);

    const size = boundingBox.getSize(new THREE.Vector2());

    this._size = size as unknown as Size;
    this._position = {
      x: contentPosition.x,
      y: contentPosition.y,
      z: content.z
    };
    this._outline = HSCore.Util.Math.computeOutline(
      contentPosition,
      size.x,
      size.y,
      this._rotation
    );
  }
}