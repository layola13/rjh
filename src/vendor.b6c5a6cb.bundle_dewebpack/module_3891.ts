import { State, Program, Shader, Buffer, Geometry, TextureMatrix } from './rendering';
import { Point, Polygon, Matrix } from './math';
import { DRAW_MODES, BLEND_MODES, TYPES } from './constants';
import { Container } from './display';
import { settings } from './settings';
import { premultiplyTintToRgba } from './utils';

export class MeshBatchUvs {
  public uvBuffer: Buffer;
  public uvMatrix: TextureMatrix;
  public data: Float32Array | null;
  private _bufferUpdateId: number;
  private _textureUpdateId: number;
  private _updateID: number;

  constructor(uvBuffer: Buffer, uvMatrix: TextureMatrix) {
    this.uvBuffer = uvBuffer;
    this.uvMatrix = uvMatrix;
    this.data = null;
    this._bufferUpdateId = -1;
    this._textureUpdateId = -1;
    this._updateID = 0;
  }

  public update(forceUpdate?: boolean): void {
    if (
      forceUpdate ||
      this._bufferUpdateId !== this.uvBuffer._updateID ||
      this._textureUpdateId !== this.uvMatrix._updateID
    ) {
      this._bufferUpdateId = this.uvBuffer._updateID;
      this._textureUpdateId = this.uvMatrix._updateID;

      const bufferData = this.uvBuffer.data;
      if (!this.data || this.data.length !== bufferData.length) {
        this.data = new Float32Array(bufferData.length);
      }

      this.uvMatrix.multiplyUvs(bufferData, this.data);
      this._updateID++;
    }
  }
}

const tempPoint = new Point();
const tempPolygon = new Polygon();

export class Mesh extends Container {
  public static readonly BATCHABLE_SIZE: number = 100;

  public geometry: MeshGeometry;
  public shader: MeshMaterial;
  public state: State;
  public drawMode: DRAW_MODES;
  public start: number;
  public size: number;
  public uvs: Float32Array | null;
  public indices: Uint16Array | Uint32Array | null;
  public vertexData: Float32Array;
  public vertexDirty: number;
  private _transformID: number;
  private _roundPixels: boolean;
  public batchUvs: MeshBatchUvs | null;
  public _tintRGB?: number;
  public _texture?: any;

  constructor(
    geometry: MeshGeometry,
    shader: MeshMaterial,
    state?: State,
    drawMode: DRAW_MODES = DRAW_MODES.TRIANGLES
  ) {
    super();

    this.geometry = geometry;
    geometry.refCount++;

    this.shader = shader;
    this.state = state || State.for2d();
    this.drawMode = drawMode;
    this.start = 0;
    this.size = 0;
    this.uvs = null;
    this.indices = null;
    this.vertexData = new Float32Array(1);
    this.vertexDirty = 0;
    this._transformID = -1;
    this._roundPixels = settings.ROUND_PIXELS;
    this.batchUvs = null;
  }

  public get uvBuffer(): Buffer {
    return this.geometry.buffers[1];
  }

  public get verticesBuffer(): Buffer {
    return this.geometry.buffers[0];
  }

  public set material(value: MeshMaterial) {
    this.shader = value;
  }

  public get material(): MeshMaterial {
    return this.shader;
  }

  public set blendMode(value: BLEND_MODES) {
    this.state.blendMode = value;
  }

  public get blendMode(): BLEND_MODES {
    return this.state.blendMode;
  }

  public set roundPixels(value: boolean) {
    if (this._roundPixels !== value) {
      this._transformID = -1;
    }
    this._roundPixels = value;
  }

  public get roundPixels(): boolean {
    return this._roundPixels;
  }

  public get tint(): number {
    return this.shader.tint;
  }

  public set tint(value: number) {
    this.shader.tint = value;
  }

  public get texture(): any {
    return this.shader.texture;
  }

  public set texture(value: any) {
    this.shader.texture = value;
  }

  protected _render(renderer: any): void {
    const vertices = this.geometry.buffers[0].data;

    if (
      this.shader.batchable &&
      this.drawMode === DRAW_MODES.TRIANGLES &&
      vertices.length < 2 * Mesh.BATCHABLE_SIZE
    ) {
      this._renderToBatch(renderer);
    } else {
      this._renderDefault(renderer);
    }
  }

  protected _renderDefault(renderer: any): void {
    const shader = this.shader;

    shader.alpha = this.worldAlpha;
    if (shader.update) {
      shader.update();
    }

    renderer.batch.flush();

    if (shader.program.uniformData.translationMatrix) {
      shader.uniforms.translationMatrix = this.transform.worldTransform.toArray(true);
    }

    renderer.shader.bind(shader);
    renderer.state.set(this.state);
    renderer.geometry.bind(this.geometry, shader);
    renderer.geometry.draw(this.drawMode, this.size, this.start, this.geometry.instanceCount);
  }

  protected _renderToBatch(renderer: any): void {
    const geometry = this.geometry;

    if (this.shader.uvMatrix) {
      this.shader.uvMatrix.update();
      this.calculateUvs();
    }

    this.calculateVertices();
    this.indices = geometry.indexBuffer.data;
    this._tintRGB = this.shader._tintRGB;
    this._texture = this.shader.texture;

    const pluginName = this.material.pluginName;
    renderer.batch.setObjectRenderer(renderer.plugins[pluginName]);
    renderer.plugins[pluginName].render(this);
  }

  public calculateVertices(): void {
    const geometry = this.geometry;
    const vertices = geometry.buffers[0].data;

    if (
      geometry.vertexDirtyId !== this.vertexDirty ||
      this._transformID !== this.transform._worldID
    ) {
      this._transformID = this.transform._worldID;

      if (this.vertexData.length !== vertices.length) {
        this.vertexData = new Float32Array(vertices.length);
      }

      const worldTransform = this.transform.worldTransform;
      const a = worldTransform.a;
      const b = worldTransform.b;
      const c = worldTransform.c;
      const d = worldTransform.d;
      const tx = worldTransform.tx;
      const ty = worldTransform.ty;

      const vertexData = this.vertexData;

      for (let i = 0; i < vertexData.length / 2; i++) {
        const x = vertices[2 * i];
        const y = vertices[2 * i + 1];

        vertexData[2 * i] = a * x + c * y + tx;
        vertexData[2 * i + 1] = b * x + d * y + ty;
      }

      if (this._roundPixels) {
        const resolution = settings.RESOLUTION;

        for (let i = 0; i < vertexData.length; ++i) {
          vertexData[i] = Math.round((vertexData[i] * resolution | 0) / resolution);
        }
      }

      this.vertexDirty = geometry.vertexDirtyId;
    }
  }

  public calculateUvs(): void {
    const uvBuffer = this.geometry.buffers[1];

    if (this.shader.uvMatrix.isSimple) {
      this.uvs = uvBuffer.data;
    } else {
      if (!this.batchUvs) {
        this.batchUvs = new MeshBatchUvs(uvBuffer, this.shader.uvMatrix);
      }
      this.batchUvs.update();
      this.uvs = this.batchUvs.data;
    }
  }

  protected _calculateBounds(): void {
    this.calculateVertices();
    this._bounds.addVertexData(this.vertexData, 0, this.vertexData.length);
  }

  public containsPoint(point: Point): boolean {
    if (!this.getBounds().contains(point.x, point.y)) {
      return false;
    }

    this.worldTransform.applyInverse(point, tempPoint);

    const vertices = this.geometry.getBuffer('aVertexPosition').data;
    const points = tempPolygon.points;
    const indices = this.geometry.getIndex().data;
    const indexLength = indices.length;
    const step = this.drawMode === 4 ? 3 : 1;

    for (let i = 0; i + 2 < indexLength; i += step) {
      const index0 = 2 * indices[i];
      const index1 = 2 * indices[i + 1];
      const index2 = 2 * indices[i + 2];

      points[0] = vertices[index0];
      points[1] = vertices[index0 + 1];
      points[2] = vertices[index1];
      points[3] = vertices[index1 + 1];
      points[4] = vertices[index2];
      points[5] = vertices[index2 + 1];

      if (tempPolygon.contains(tempPoint.x, tempPoint.y)) {
        return true;
      }
    }

    return false;
  }

  public destroy(options?: any): void {
    super.destroy(options);

    this.geometry.refCount--;
    if (this.geometry.refCount === 0) {
      this.geometry.dispose();
    }

    this.geometry = null as any;
    this.shader = null as any;
    this.state = null as any;
    this.uvs = null;
    this.indices = null;
    this.vertexData = null as any;
  }
}

interface MeshMaterialOptions {
  tint?: number;
  alpha?: number;
  pluginName?: string;
  program?: Program;
  uniforms?: Record<string, any>;
}

export class MeshMaterial extends Shader {
  public uvMatrix: TextureMatrix;
  public batchable: boolean;
  public pluginName: string;
  private _alpha: number;
  private _tint: number;
  public _tintRGB: number;
  private _colorDirty: boolean;

  constructor(texture: any, options?: MeshMaterialOptions) {
    const uniforms: Record<string, any> = {
      uSampler: texture,
      alpha: 1,
      uTextureMatrix: Matrix.IDENTITY,
      uColor: new Float32Array([1, 1, 1, 1]),
    };

    const mergedOptions: MeshMaterialOptions = {
      tint: 0xFFFFFF,
      alpha: 1,
      pluginName: 'batch',
      ...options,
    };

    if (mergedOptions.uniforms) {
      Object.assign(uniforms, mergedOptions.uniforms);
    }

    const vertexShader = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform mat3 uTextureMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;
}
`;

    const fragmentShader = `varying vec2 vTextureCoord;
uniform vec4 uColor;

uniform sampler2D uSampler;

void main(void)
{
    gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;
}
`;

    super(mergedOptions.program || Program.from(vertexShader, fragmentShader), uniforms);

    this._colorDirty = false;
    this.uvMatrix = new TextureMatrix(texture);
    this.batchable = mergedOptions.program === undefined;
    this.pluginName = mergedOptions.pluginName!;

    this._tint = mergedOptions.tint!;
    this._alpha = mergedOptions.alpha!;
    this._tintRGB = (mergedOptions.tint! >> 16) + (mergedOptions.tint! & 0xFF00) + ((mergedOptions.tint! & 0xFF) << 16);
  }

  public get texture(): any {
    return this.uniforms.uSampler;
  }

  public set texture(value: any) {
    if (this.uniforms.uSampler !== value) {
      this.uniforms.uSampler = value;
      this.uvMatrix.texture = value;
    }
  }

  public set alpha(value: number) {
    if (value !== this._alpha) {
      this._alpha = value;
      this._colorDirty = true;
    }
  }

  public get alpha(): number {
    return this._alpha;
  }

  public set tint(value: number) {
    if (value !== this._tint) {
      this._tint = value;
      this._tintRGB = (value >> 16) + (value & 0xFF00) + ((value & 0xFF) << 16);
      this._colorDirty = true;
    }
  }

  public get tint(): number {
    return this._tint;
  }

  public update(): void {
    if (this._colorDirty) {
      this._colorDirty = false;
      const baseTexture = this.texture.baseTexture;

      premultiplyTintToRgba(this._tint, this._alpha, this.uniforms.uColor, baseTexture.alphaMode);
    }

    if (this.uvMatrix.update()) {
      this.uniforms.uTextureMatrix = this.uvMatrix.mapCoord;
    }
  }
}

export class MeshGeometry extends Geometry {
  constructor(vertices?: Float32Array, uvs?: Float32Array, indices?: Uint16Array) {
    super();

    const vertexBuffer = new Buffer(vertices);
    const uvBuffer = new Buffer(uvs, true);
    const indexBuffer = new Buffer(indices, true, true);

    this.addAttribute('aVertexPosition', vertexBuffer, 2, false, TYPES.FLOAT)
      .addAttribute('aTextureCoord', uvBuffer, 2, false, TYPES.FLOAT)
      .addIndex(indexBuffer);

    this._updateId = -1;
  }

  public get vertexDirtyId(): number {
    return this.buffers[0]._updateID;
  }
}