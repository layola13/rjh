import { Point, ObservablePoint, Rectangle } from '@pixi/math';
import { sign } from '@pixi/utils';
import { Texture } from '@pixi/core';
import { BLEND_MODES } from '@pixi/constants';
import { Container } from '@pixi/display';
import { settings } from '@pixi/settings';

const tempPoint = new Point();
const defaultIndices = new Uint16Array([0, 1, 2, 0, 2, 3]);

export interface ISpriteDestroyOptions {
  texture?: boolean;
  baseTexture?: boolean;
}

export class Sprite extends Container {
  private _anchor: ObservablePoint;
  private _texture: Texture | null;
  private _width: number;
  private _height: number;
  private _tint: number | null;
  private _tintRGB: number | null;
  private _cachedTint: number;
  private _transformID: number;
  private _textureID: number;
  private _transformTrimmedID: number;
  private _textureTrimmedID: number;
  private _roundPixels: boolean;

  public blendMode: BLEND_MODES;
  public shader: any;
  public uvs: Float32Array | null;
  public vertexData: Float32Array;
  public vertexTrimmedData: Float32Array | null;
  public indices: Uint16Array;
  public pluginName: string;
  public isSprite: boolean;

  constructor(texture?: Texture) {
    super();

    this._anchor = new ObservablePoint(
      this._onAnchorUpdate,
      this,
      texture ? texture.defaultAnchor.x : 0,
      texture ? texture.defaultAnchor.y : 0
    );
    this._texture = null;
    this._width = 0;
    this._height = 0;
    this._tint = null;
    this._tintRGB = null;
    this.tint = 0xFFFFFF;
    this.blendMode = BLEND_MODES.NORMAL;
    this.shader = null;
    this._cachedTint = 0xFFFFFF;
    this.uvs = null;
    this.texture = texture || Texture.EMPTY;
    this.vertexData = new Float32Array(8);
    this.vertexTrimmedData = null;
    this._transformID = -1;
    this._textureID = -1;
    this._transformTrimmedID = -1;
    this._textureTrimmedID = -1;
    this.indices = defaultIndices;
    this.pluginName = 'batch';
    this.isSprite = true;
    this._roundPixels = settings.ROUND_PIXELS;
  }

  private _onTextureUpdate(): void {
    this._textureID = -1;
    this._textureTrimmedID = -1;
    this._cachedTint = 0xFFFFFF;

    if (this._width) {
      this.scale.x = sign(this.scale.x) * this._width / this._texture!.orig.width;
    }
    if (this._height) {
      this.scale.y = sign(this.scale.y) * this._height / this._texture!.orig.height;
    }
  }

  private _onAnchorUpdate(): void {
    this._transformID = -1;
    this._transformTrimmedID = -1;
  }

  public calculateVertices(): void {
    const texture = this._texture!;

    if (this._transformID !== this.transform._worldID || this._textureID !== texture._updateID) {
      if (this._textureID !== texture._updateID) {
        this.uvs = this._texture!._uvs.uvsFloat32;
      }

      this._transformID = this.transform._worldID;
      this._textureID = texture._updateID;

      const wt = this.transform.worldTransform;
      const a = wt.a;
      const b = wt.b;
      const c = wt.c;
      const d = wt.d;
      const tx = wt.tx;
      const ty = wt.ty;
      const vertexData = this.vertexData;
      const trim = texture.trim;
      const orig = texture.orig;
      const anchor = this._anchor;

      let w0 = 0;
      let w1 = 0;
      let h0 = 0;
      let h1 = 0;

      if (trim) {
        w0 = trim.x - anchor._x * orig.width;
        w1 = w0 + trim.width;
        h0 = trim.y - anchor._y * orig.height;
        h1 = h0 + trim.height;
      } else {
        w0 = -anchor._x * orig.width;
        w1 = w0 + orig.width;
        h0 = -anchor._y * orig.height;
        h1 = h0 + orig.height;
      }

      vertexData[0] = a * w0 + c * h0 + tx;
      vertexData[1] = d * h0 + b * w0 + ty;
      vertexData[2] = a * w1 + c * h0 + tx;
      vertexData[3] = d * h0 + b * w1 + ty;
      vertexData[4] = a * w1 + c * h1 + tx;
      vertexData[5] = d * h1 + b * w1 + ty;
      vertexData[6] = a * w0 + c * h1 + tx;
      vertexData[7] = d * h1 + b * w0 + ty;

      if (this._roundPixels) {
        const resolution = settings.RESOLUTION;
        for (let i = 0; i < vertexData.length; ++i) {
          vertexData[i] = Math.round((vertexData[i] * resolution | 0) / resolution);
        }
      }
    }
  }

  public calculateTrimmedVertices(): void {
    if (this.vertexTrimmedData) {
      if (this._transformTrimmedID === this.transform._worldID && 
          this._textureTrimmedID === this._texture!._updateID) {
        return;
      }
    } else {
      this.vertexTrimmedData = new Float32Array(8);
    }

    this._transformTrimmedID = this.transform._worldID;
    this._textureTrimmedID = this._texture!._updateID;

    const texture = this._texture!;
    const vertexData = this.vertexTrimmedData!;
    const orig = texture.orig;
    const anchor = this._anchor;
    const wt = this.transform.worldTransform;
    const a = wt.a;
    const b = wt.b;
    const c = wt.c;
    const d = wt.d;
    const tx = wt.tx;
    const ty = wt.ty;

    const w0 = -anchor._x * orig.width;
    const w1 = w0 + orig.width;
    const h0 = -anchor._y * orig.height;
    const h1 = h0 + orig.height;

    vertexData[0] = a * w0 + c * h0 + tx;
    vertexData[1] = d * h0 + b * w0 + ty;
    vertexData[2] = a * w1 + c * h0 + tx;
    vertexData[3] = d * h0 + b * w1 + ty;
    vertexData[4] = a * w1 + c * h1 + tx;
    vertexData[5] = d * h1 + b * w1 + ty;
    vertexData[6] = a * w0 + c * h1 + tx;
    vertexData[7] = d * h1 + b * w0 + ty;
  }

  protected _render(renderer: any): void {
    this.calculateVertices();
    renderer.batch.setObjectRenderer(renderer.plugins[this.pluginName]);
    renderer.plugins[this.pluginName].render(this);
  }

  protected _calculateBounds(): void {
    const trim = this._texture!.trim;
    const orig = this._texture!.orig;

    if (!trim || (trim.width === orig.width && trim.height === orig.height)) {
      this.calculateVertices();
      this._bounds.addQuad(this.vertexData);
    } else {
      this.calculateTrimmedVertices();
      this._bounds.addQuad(this.vertexTrimmedData!);
    }
  }

  public getLocalBounds(rect?: Rectangle): Rectangle {
    if (this.children.length === 0) {
      this._bounds.minX = this._texture!.orig.width * -this._anchor._x;
      this._bounds.minY = this._texture!.orig.height * -this._anchor._y;
      this._bounds.maxX = this._texture!.orig.width * (1 - this._anchor._x);
      this._bounds.maxY = this._texture!.orig.height * (1 - this._anchor._y);

      if (!rect) {
        if (!this._localBoundsRect) {
          this._localBoundsRect = new Rectangle();
        }
        rect = this._localBoundsRect;
      }

      return this._bounds.getRectangle(rect);
    }

    return super.getLocalBounds(rect);
  }

  public containsPoint(point: Point): boolean {
    this.worldTransform.applyInverse(point, tempPoint);

    const width = this._texture!.orig.width;
    const height = this._texture!.orig.height;
    const x1 = -width * this.anchor.x;

    if (tempPoint.x >= x1 && tempPoint.x < x1 + width) {
      const y1 = -height * this.anchor.y;
      if (tempPoint.y >= y1 && tempPoint.y < y1 + height) {
        return true;
      }
    }

    return false;
  }

  public destroy(options?: boolean | ISpriteDestroyOptions): void {
    super.destroy(options);

    this._texture!.off('update', this._onTextureUpdate, this);
    this._anchor = null!;

    const destroyTexture = typeof options === 'boolean' ? options : options?.texture;

    if (destroyTexture) {
      const destroyBaseTexture = typeof options === 'boolean' ? options : options?.baseTexture;
      this._texture!.destroy(!!destroyBaseTexture);
    }

    this._texture = null;
    this.shader = null;
  }

  public static from(source: Texture | string, options?: any): Sprite {
    return new Sprite(source instanceof Texture ? source : Texture.from(source, options));
  }

  get roundPixels(): boolean {
    return this._roundPixels;
  }

  set roundPixels(value: boolean) {
    if (this._roundPixels !== value) {
      this._transformID = -1;
    }
    this._roundPixels = value;
  }

  get width(): number {
    return Math.abs(this.scale.x) * this._texture!.orig.width;
  }

  set width(value: number) {
    const s = sign(this.scale.x) || 1;
    this.scale.x = s * value / this._texture!.orig.width;
    this._width = value;
  }

  get height(): number {
    return Math.abs(this.scale.y) * this._texture!.orig.height;
  }

  set height(value: number) {
    const s = sign(this.scale.y) || 1;
    this.scale.y = s * value / this._texture!.orig.height;
    this._height = value;
  }

  get anchor(): ObservablePoint {
    return this._anchor;
  }

  set anchor(value: ObservablePoint) {
    this._anchor.copyFrom(value);
  }

  get tint(): number {
    return this._tint!;
  }

  set tint(value: number) {
    this._tint = value;
    this._tintRGB = (value >> 16) + (value & 0xFF00) + ((value & 0xFF) << 16);
  }

  get texture(): Texture {
    return this._texture!;
  }

  set texture(value: Texture) {
    if (this._texture !== value) {
      if (this._texture) {
        this._texture.off('update', this._onTextureUpdate, this);
      }

      this._texture = value || Texture.EMPTY;
      this._cachedTint = 0xFFFFFF;
      this._textureID = -1;
      this._textureTrimmedID = -1;

      if (value) {
        if (value.baseTexture.valid) {
          this._onTextureUpdate();
        } else {
          value.once('update', this._onTextureUpdate, this);
        }
      }
    }
  }
}