import { Point, Transform, Rectangle, Matrix } from '@pixi/math';
import { TextureMatrix, Texture, QuadUv, Shader, ObjectRenderer, State } from '@pixi/core';
import { Sprite } from '@pixi/sprite';
import { TextureCache, premultiplyTintToRgba, correctBlendMode } from '@pixi/utils';
import { WRAP_MODES } from '@pixi/constants';

const tempPoint = new Point();

export class TilingSprite extends Sprite {
  public tileTransform: Transform;
  public uvMatrix: TextureMatrix;
  public pluginName: string;
  public uvRespectAnchor: boolean;
  
  private _width: number;
  private _height: number;
  private _canvasPattern: unknown | null;

  constructor(texture: Texture, width: number = 100, height: number = 100) {
    super(texture);
    
    this.tileTransform = new Transform();
    this._width = width;
    this._height = height;
    this._canvasPattern = null;
    this.uvMatrix = texture.uvMatrix || new TextureMatrix(texture);
    this.pluginName = 'tilingSprite';
    this.uvRespectAnchor = false;
  }

  get clampMargin(): number {
    return this.uvMatrix.clampMargin;
  }

  set clampMargin(value: number) {
    this.uvMatrix.clampMargin = value;
    this.uvMatrix.update(true);
  }

  get tileScale(): Point {
    return this.tileTransform.scale;
  }

  set tileScale(value: Point) {
    this.tileTransform.scale.copyFrom(value);
  }

  get tilePosition(): Point {
    return this.tileTransform.position;
  }

  set tilePosition(value: Point) {
    this.tileTransform.position.copyFrom(value);
  }

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }

  protected _onTextureUpdate(): void {
    if (this.uvMatrix) {
      this.uvMatrix.texture = this._texture;
    }
    this._cachedTint = 0xFFFFFF;
  }

  protected _render(renderer: any): void {
    const texture = this._texture;
    
    if (!texture || !texture.valid) {
      return;
    }

    this.tileTransform.updateLocalTransform();
    this.uvMatrix.update();
    
    renderer.batch.setObjectRenderer(renderer.plugins[this.pluginName]);
    renderer.plugins[this.pluginName].render(this);
  }

  protected _calculateBounds(): void {
    const minX = this._width * -this._anchor._x;
    const minY = this._height * -this._anchor._y;
    const maxX = this._width * (1 - this._anchor._x);
    const maxY = this._height * (1 - this._anchor._y);
    
    this._bounds.addFrame(this.transform, minX, minY, maxX, maxY);
  }

  public getLocalBounds(rect?: Rectangle): Rectangle {
    if (this.children.length === 0) {
      this._bounds.minX = this._width * -this._anchor._x;
      this._bounds.minY = this._height * -this._anchor._y;
      this._bounds.maxX = this._width * (1 - this._anchor._x);
      this._bounds.maxY = this._height * (1 - this._anchor._y);
      
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
    
    const width = this._width;
    const height = this._height;
    const anchorX = -width * this.anchor._x;
    
    if (tempPoint.x >= anchorX && tempPoint.x < anchorX + width) {
      const anchorY = -height * this.anchor._y;
      
      if (tempPoint.y >= anchorY && tempPoint.y < anchorY + height) {
        return true;
      }
    }
    
    return false;
  }

  public destroy(options?: any): void {
    super.destroy(options);
    this.tileTransform = null as any;
    this.uvMatrix = null as any;
  }

  public static from(source: string | Texture, width?: number, height?: number): TilingSprite {
    return new TilingSprite(Texture.from(source), width, height);
  }

  public static fromFrame(frameId: string, width?: number, height?: number): TilingSprite {
    const texture = TextureCache[frameId];
    
    if (!texture) {
      throw new Error(`The frameId "${frameId}" does not exist in the texture cache`);
    }
    
    return new TilingSprite(texture, width, height);
  }

  public static fromImage(
    imageId: string,
    width?: number,
    height?: number,
    options?: any
  ): TilingSprite {
    return new TilingSprite(Texture.from(imageId, options), width, height);
  }
}

const VERTEX_SHADER = `
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform mat3 uTransform;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;
}
`;

const FRAGMENT_SHADER = `
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec4 uColor;
uniform mat3 uMapCoord;
uniform vec4 uClampFrame;
uniform vec2 uClampOffset;

void main(void)
{
    vec2 coord = vTextureCoord - floor(vTextureCoord - uClampOffset);
    coord = (uMapCoord * vec3(coord, 1.0)).xy;
    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

    vec4 texSample = texture2D(uSampler, coord);
    gl_FragColor = texSample * uColor;
}
`;

const SIMPLE_FRAGMENT_SHADER = `
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec4 uColor;

void main(void)
{
    vec4 sample = texture2D(uSampler, vTextureCoord);
    gl_FragColor = sample * uColor;
}
`;

const tempMatrix = new Matrix();

export class TilingSpriteRenderer extends ObjectRenderer {
  public shader: Shader;
  public simpleShader: Shader;
  public quad: QuadUv;
  public state: State;

  constructor(renderer: any) {
    super(renderer);
    
    const uniforms = {
      globals: this.renderer.globalUniforms
    };
    
    this.shader = Shader.from(VERTEX_SHADER, FRAGMENT_SHADER, uniforms);
    this.simpleShader = Shader.from(VERTEX_SHADER, SIMPLE_FRAGMENT_SHADER, uniforms);
    this.quad = new QuadUv();
    this.state = State.for2d();
  }

  public render(tilingSprite: TilingSprite): void {
    const renderer = this.renderer;
    const quad = this.quad;
    let vertices = quad.vertices;
    
    vertices[0] = vertices[6] = tilingSprite._width * -tilingSprite.anchor.x;
    vertices[1] = vertices[3] = tilingSprite._height * -tilingSprite.anchor.y;
    vertices[2] = vertices[4] = tilingSprite._width * (1 - tilingSprite.anchor.x);
    vertices[5] = vertices[7] = tilingSprite._height * (1 - tilingSprite.anchor.y);
    
    if (tilingSprite.uvRespectAnchor) {
      vertices = quad.uvs;
      vertices[0] = vertices[6] = -tilingSprite.anchor.x;
      vertices[1] = vertices[3] = -tilingSprite.anchor.y;
      vertices[2] = vertices[4] = 1 - tilingSprite.anchor.x;
      vertices[5] = vertices[7] = 1 - tilingSprite.anchor.y;
    }
    
    quad.invalidate();
    
    const texture = tilingSprite._texture;
    const baseTexture = texture.baseTexture;
    const localTransform = tilingSprite.tileTransform.localTransform;
    const uvMatrix = tilingSprite.uvMatrix;
    
    let isSimple = baseTexture.isPowerOfTwo 
      && texture.frame.width === baseTexture.width 
      && texture.frame.height === baseTexture.height;
    
    if (isSimple) {
      if (baseTexture._glTextures[renderer.CONTEXT_UID]) {
        isSimple = baseTexture.wrapMode !== WRAP_MODES.CLAMP;
      } else if (baseTexture.wrapMode === WRAP_MODES.CLAMP) {
        baseTexture.wrapMode = WRAP_MODES.REPEAT;
      }
    }
    
    const shader = isSimple ? this.simpleShader : this.shader;
    const textureWidth = texture.width;
    const textureHeight = texture.height;
    const spriteWidth = tilingSprite._width;
    const spriteHeight = tilingSprite._height;
    
    tempMatrix.set(
      localTransform.a * textureWidth / spriteWidth,
      localTransform.b * textureWidth / spriteHeight,
      localTransform.c * textureHeight / spriteWidth,
      localTransform.d * textureHeight / spriteHeight,
      localTransform.tx / spriteWidth,
      localTransform.ty / spriteHeight
    );
    
    tempMatrix.invert();
    
    if (isSimple) {
      tempMatrix.prepend(uvMatrix.mapCoord);
    } else {
      shader.uniforms.uMapCoord = uvMatrix.mapCoord.toArray(true);
      shader.uniforms.uClampFrame = uvMatrix.uClampFrame;
      shader.uniforms.uClampOffset = uvMatrix.uClampOffset;
    }
    
    shader.uniforms.uTransform = tempMatrix.toArray(true);
    shader.uniforms.uColor = premultiplyTintToRgba(
      tilingSprite.tint,
      tilingSprite.worldAlpha,
      shader.uniforms.uColor,
      baseTexture.alphaMode
    );
    shader.uniforms.translationMatrix = tilingSprite.transform.worldTransform.toArray(true);
    shader.uniforms.uSampler = texture;
    
    renderer.shader.bind(shader);
    renderer.geometry.bind(quad);
    
    this.state.blendMode = correctBlendMode(tilingSprite.blendMode, baseTexture.alphaMode);
    renderer.state.set(this.state);
    renderer.geometry.draw(this.renderer.gl.TRIANGLES, 6, 0);
  }
}