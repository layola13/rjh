import { MeshGeometry, Mesh, MeshMaterial } from './mesh';
import { WRAP_MODES } from './constants';
import { Texture } from './texture';
import { Point } from './math';

export class PlaneGeometry extends MeshGeometry {
  public segWidth: number;
  public segHeight: number;
  public width: number;
  public height: number;

  constructor(width: number = 100, height: number = 100, segWidth: number = 10, segHeight: number = 10) {
    super();
    this.segWidth = segWidth;
    this.segHeight = segHeight;
    this.width = width;
    this.height = height;
    this.build();
  }

  public build(): void {
    const totalVertices = this.segWidth * this.segHeight;
    const vertices: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    const segWidthMinusOne = this.segWidth - 1;
    const segHeightMinusOne = this.segHeight - 1;
    const cellWidth = this.width / segWidthMinusOne;
    const cellHeight = this.height / segHeightMinusOne;

    for (let vertexIndex = 0; vertexIndex < totalVertices; vertexIndex++) {
      const col = vertexIndex % this.segWidth;
      const row = Math.floor(vertexIndex / this.segWidth);
      
      vertices.push(col * cellWidth, row * cellHeight);
      uvs.push(col / segWidthMinusOne, row / segHeightMinusOne);
    }

    const totalCells = segWidthMinusOne * segHeightMinusOne;
    for (let cellIndex = 0; cellIndex < totalCells; cellIndex++) {
      const col = cellIndex % segWidthMinusOne;
      const row = Math.floor(cellIndex / segWidthMinusOne);
      const topLeft = row * this.segWidth + col;
      const topRight = row * this.segWidth + col + 1;
      const bottomLeft = (row + 1) * this.segWidth + col;
      const bottomRight = (row + 1) * this.segWidth + col + 1;
      
      indices.push(topLeft, topRight, bottomLeft, topRight, bottomRight, bottomLeft);
    }

    this.buffers[0].data = new Float32Array(vertices);
    this.buffers[1].data = new Float32Array(uvs);
    this.indexBuffer.data = new Uint16Array(indices);
    this.buffers[0].update();
    this.buffers[1].update();
    this.indexBuffer.update();
  }
}

export class RopeGeometry extends MeshGeometry {
  public points: Point[];
  public width: number;
  public textureScale: number;

  constructor(width: number = 200, points: Point[], textureScale: number = 0) {
    super(
      new Float32Array(4 * points.length),
      new Float32Array(4 * points.length),
      new Uint16Array(6 * (points.length - 1))
    );
    this.points = points;
    this.width = width;
    this.textureScale = textureScale;
    this.build();
  }

  public build(): void {
    const points = this.points;
    if (!points) {
      return;
    }

    const vertexBuffer = this.getBuffer("aVertexPosition");
    const uvBuffer = this.getBuffer("aTextureCoord");
    const indexBuffer = this.getIndex();

    if (points.length < 1) {
      return;
    }

    if (vertexBuffer.data.length / 4 !== points.length) {
      vertexBuffer.data = new Float32Array(4 * points.length);
      uvBuffer.data = new Float32Array(4 * points.length);
      indexBuffer.data = new Uint16Array(6 * (points.length - 1));
    }

    const uvs = uvBuffer.data;
    const indices = indexBuffer.data;

    uvs[0] = 0;
    uvs[1] = 0;
    uvs[2] = 0;
    uvs[3] = 1;

    let accumulatedDistance = 0;
    let previousPoint = points[0];
    const textureWidth = this.width * this.textureScale;
    const pointCount = points.length;

    for (let pointIndex = 0; pointIndex < pointCount; pointIndex++) {
      const uvIndex = 4 * pointIndex;

      if (this.textureScale > 0) {
        const deltaX = previousPoint.x - points[pointIndex].x;
        const deltaY = previousPoint.y - points[pointIndex].y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        previousPoint = points[pointIndex];
        accumulatedDistance += distance / textureWidth;
      } else {
        accumulatedDistance = pointIndex / (pointCount - 1);
      }

      uvs[uvIndex] = accumulatedDistance;
      uvs[uvIndex + 1] = 0;
      uvs[uvIndex + 2] = accumulatedDistance;
      uvs[uvIndex + 3] = 1;
    }

    let indicesIndex = 0;
    for (let segmentIndex = 0; segmentIndex < pointCount - 1; segmentIndex++) {
      const vertexBase = 2 * segmentIndex;
      indices[indicesIndex++] = vertexBase;
      indices[indicesIndex++] = vertexBase + 1;
      indices[indicesIndex++] = vertexBase + 2;
      indices[indicesIndex++] = vertexBase + 2;
      indices[indicesIndex++] = vertexBase + 1;
      indices[indicesIndex++] = vertexBase + 3;
    }

    uvBuffer.update();
    indexBuffer.update();
    this.updateVertices();
  }

  public updateVertices(): void {
    const points = this.points;
    if (points.length < 1) {
      return;
    }

    let normalX: number;
    let normalY: number;
    let previousPoint = points[0];
    const vertices = this.buffers[0].data;
    const pointCount = points.length;

    for (let pointIndex = 0; pointIndex < pointCount; pointIndex++) {
      const currentPoint = points[pointIndex];
      const vertexIndex = 4 * pointIndex;
      const nextPoint = pointIndex < points.length - 1 ? points[pointIndex + 1] : currentPoint;

      normalY = -(nextPoint.x - previousPoint.x);
      normalX = nextPoint.y - previousPoint.y;

      const magnitude = Math.sqrt(normalX * normalX + normalY * normalY);
      const halfWidth = this.textureScale > 0 ? this.textureScale * this.width / 2 : this.width / 2;

      normalX /= magnitude;
      normalY /= magnitude;
      normalX *= halfWidth;
      normalY *= halfWidth;

      vertices[vertexIndex] = currentPoint.x + normalX;
      vertices[vertexIndex + 1] = currentPoint.y + normalY;
      vertices[vertexIndex + 2] = currentPoint.x - normalX;
      vertices[vertexIndex + 3] = currentPoint.y - normalY;

      previousPoint = currentPoint;
    }

    this.buffers[0].update();
  }

  public update(): void {
    if (this.textureScale > 0) {
      this.build();
    } else {
      this.updateVertices();
    }
  }
}

export class SimpleRope extends Mesh {
  public autoUpdate: boolean;

  constructor(texture: Texture, points: Point[], textureScale: number = 0) {
    const geometry = new RopeGeometry(texture.height, points, textureScale);
    const material = new MeshMaterial(texture);

    if (textureScale > 0) {
      texture.baseTexture.wrapMode = WRAP_MODES.REPEAT;
    }

    super(geometry, material);
    this.autoUpdate = true;
  }

  protected _render(renderer: unknown): void {
    const ropeGeometry = this.geometry as RopeGeometry;
    
    if (this.autoUpdate || ropeGeometry.width !== this.shader.texture.height) {
      ropeGeometry.width = this.shader.texture.height;
      ropeGeometry.update();
    }

    super._render(renderer);
  }
}

export class SimplePlane extends Mesh {
  private _textureID: number;

  constructor(texture: Texture, verticesX: number, verticesY: number) {
    const geometry = new PlaneGeometry(texture.width, texture.height, verticesX, verticesY);
    const material = new MeshMaterial(Texture.WHITE);
    super(geometry, material);
    this.texture = texture;
  }

  public textureUpdated(): void {
    this._textureID = this.shader.texture._updateID;
    const planeGeometry = this.geometry as PlaneGeometry;
    planeGeometry.width = this.shader.texture.width;
    planeGeometry.height = this.shader.texture.height;
    planeGeometry.build();
  }

  public set texture(value: Texture) {
    if (this.shader.texture !== value) {
      this.shader.texture = value;
      this._textureID = -1;

      if (value.baseTexture.valid) {
        this.textureUpdated();
      } else {
        value.once("update", this.textureUpdated, this);
      }
    }
  }

  public get texture(): Texture {
    return this.shader.texture;
  }

  protected _render(renderer: unknown): void {
    if (this._textureID !== this.shader.texture._updateID) {
      this.textureUpdated();
    }

    super._render(renderer);
  }
}

export class SimpleMesh extends Mesh {
  public autoUpdate: boolean;

  constructor(
    texture: Texture = Texture.EMPTY,
    vertices?: Float32Array,
    uvs?: Float32Array,
    indices?: Uint16Array,
    drawMode?: number
  ) {
    const geometry = new MeshGeometry(vertices, uvs, indices);
    geometry.getBuffer("aVertexPosition").static = false;
    const material = new MeshMaterial(texture);
    super(geometry, material, null, drawMode);
    this.autoUpdate = true;
  }

  public get vertices(): Float32Array {
    return this.geometry.getBuffer("aVertexPosition").data as Float32Array;
  }

  public set vertices(value: Float32Array) {
    this.geometry.getBuffer("aVertexPosition").data = value;
  }

  protected _render(renderer: unknown): void {
    if (this.autoUpdate) {
      this.geometry.getBuffer("aVertexPosition").update();
    }

    super._render(renderer);
  }
}

export class NineSlicePlane extends SimplePlane {
  private _origWidth: number;
  private _origHeight: number;
  private _width: number;
  private _height: number;
  private _leftWidth: number;
  private _rightWidth: number;
  private _topHeight: number;
  private _bottomHeight: number;

  constructor(
    texture: Texture,
    leftWidth?: number,
    topHeight?: number,
    rightWidth?: number,
    bottomHeight?: number
  ) {
    super(Texture.WHITE, 4, 4);
    this._origWidth = texture.orig.width;
    this._origHeight = texture.orig.height;
    this._width = this._origWidth;
    this._height = this._origHeight;
    this._leftWidth = leftWidth !== undefined ? leftWidth : 10;
    this._rightWidth = rightWidth !== undefined ? rightWidth : 10;
    this._topHeight = topHeight !== undefined ? topHeight : 10;
    this._bottomHeight = bottomHeight !== undefined ? bottomHeight : 10;
    this.texture = texture;
  }

  public textureUpdated(): void {
    this._textureID = this.shader.texture._updateID;
    this._refresh();
  }

  public get vertices(): Float32Array {
    return this.geometry.getBuffer("aVertexPosition").data as Float32Array;
  }

  public set vertices(value: Float32Array) {
    this.geometry.getBuffer("aVertexPosition").data = value;
  }

  public updateHorizontalVertices(): void {
    const vertices = this.vertices;
    const scale = this._getMinScale();

    vertices[9] = vertices[11] = vertices[13] = vertices[15] = this._topHeight * scale;
    vertices[17] = vertices[19] = vertices[21] = vertices[23] = this._height - this._bottomHeight * scale;
    vertices[25] = vertices[27] = vertices[29] = vertices[31] = this._height;
  }

  public updateVerticalVertices(): void {
    const vertices = this.vertices;
    const scale = this._getMinScale();

    vertices[2] = vertices[10] = vertices[18] = vertices[26] = this._leftWidth * scale;
    vertices[4] = vertices[12] = vertices[20] = vertices[28] = this._width - this._rightWidth * scale;
    vertices[6] = vertices[14] = vertices[22] = vertices[30] = this._width;
  }

  private _getMinScale(): number {
    const totalHorizontalWidth = this._leftWidth + this._rightWidth;
    const horizontalScale = this._width > totalHorizontalWidth ? 1 : this._width / totalHorizontalWidth;
    const totalVerticalHeight = this._topHeight + this._bottomHeight;
    const verticalScale = this._height > totalVerticalHeight ? 1 : this._height / totalVerticalHeight;

    return Math.min(horizontalScale, verticalScale);
  }

  public get width(): number {
    return this._width;
  }

  public set width(value: number) {
    this._width = value;
    this._refresh();
  }

  public get height(): number {
    return this._height;
  }

  public set height(value: number) {
    this._height = value;
    this._refresh();
  }

  public get leftWidth(): number {
    return this._leftWidth;
  }

  public set leftWidth(value: number) {
    this._leftWidth = value;
    this._refresh();
  }

  public get rightWidth(): number {
    return this._rightWidth;
  }

  public set rightWidth(value: number) {
    this._rightWidth = value;
    this._refresh();
  }

  public get topHeight(): number {
    return this._topHeight;
  }

  public set topHeight(value: number) {
    this._topHeight = value;
    this._refresh();
  }

  public get bottomHeight(): number {
    return this._bottomHeight;
  }

  public set bottomHeight(value: number) {
    this._bottomHeight = value;
    this._refresh();
  }

  private _refresh(): void {
    const texture = this.texture;
    const uvs = this.geometry.buffers[1].data;

    this._origWidth = texture.orig.width;
    this._origHeight = texture.orig.height;

    const uvScaleX = 1 / this._origWidth;
    const uvScaleY = 1 / this._origHeight;

    uvs[0] = uvs[8] = uvs[16] = uvs[24] = 0;
    uvs[1] = uvs[3] = uvs[5] = uvs[7] = 0;
    uvs[6] = uvs[14] = uvs[22] = uvs[30] = 1;
    uvs[25] = uvs[27] = uvs[29] = uvs[31] = 1;

    uvs[2] = uvs[10] = uvs[18] = uvs[26] = uvScaleX * this._leftWidth;
    uvs[4] = uvs[12] = uvs[20] = uvs[28] = 1 - uvScaleX * this._rightWidth;
    uvs[9] = uvs[11] = uvs[13] = uvs[15] = uvScaleY * this._topHeight;
    uvs[17] = uvs[19] = uvs[21] = uvs[23] = 1 - uvScaleY * this._bottomHeight;

    this.updateHorizontalVertices();
    this.updateVerticalVertices();
    this.geometry.buffers[0].update();
    this.geometry.buffers[1].update();
  }
}