export enum PrimitiveType {
  GL_LINE_LOOP = 0,
  GL_TRIANGLES = 4,
  GL_TRIANGLE_STRIP = 5,
  GL_TRIANGLE_FAN = 6,
}

export enum WindingRule {
  GLU_TESS_WINDING_ODD = 100130,
  GLU_TESS_WINDING_NONZERO = 100131,
  GLU_TESS_WINDING_POSITIVE = 100132,
  GLU_TESS_WINDING_NEGATIVE = 100133,
  GLU_TESS_WINDING_ABS_GEQ_TWO = 100134,
}

export enum GluEnum {
  GLU_TESS_VERTEX_DATA = 100106,
  GLU_TESS_BEGIN = 100100,
  GLU_TESS_END = 100102,
  GLU_TESS_ERROR = 100103,
  GLU_TESS_COMBINE = 100105,
  GLU_TESS_EDGE_FLAG = 100104,
  GLU_TESS_BOUNDARY_ONLY = 100141,
  GLU_TESS_WINDING_RULE = 100140,
}

export const GL_LINE_LOOP = PrimitiveType.GL_LINE_LOOP;
export const GL_TRIANGLES = PrimitiveType.GL_TRIANGLES;
export const GL_TRIANGLE_STRIP = PrimitiveType.GL_TRIANGLE_STRIP;
export const GL_TRIANGLE_FAN = PrimitiveType.GL_TRIANGLE_FAN;

export const GLU_TESS_WINDING_ODD = WindingRule.GLU_TESS_WINDING_ODD;
export const GLU_TESS_WINDING_NONZERO = WindingRule.GLU_TESS_WINDING_NONZERO;
export const GLU_TESS_WINDING_POSITIVE = WindingRule.GLU_TESS_WINDING_POSITIVE;
export const GLU_TESS_WINDING_NEGATIVE = WindingRule.GLU_TESS_WINDING_NEGATIVE;
export const GLU_TESS_WINDING_ABS_GEQ_TWO = WindingRule.GLU_TESS_WINDING_ABS_GEQ_TWO;

export type Vertex = number[];
export type Contour = Vertex[];
export type Polygon = Contour;

export interface TesselatorOptions {
  polygons: Polygon[];
  holes: Polygon[];
  windingRule: WindingRule;
  boundaryOnly: boolean;
  normal: [number, number, number] | null;
  autoWinding: boolean;
  vertexSize?: number;
}

export const DEFAULT_OPTIONS: TesselatorOptions = {
  polygons: [],
  holes: [],
  windingRule: WindingRule.GLU_TESS_WINDING_POSITIVE,
  boundaryOnly: false,
  normal: null,
  autoWinding: true,
};

export abstract class GluTesselator {
  protected abstract gluTessCallback(which: GluEnum, callback: (...args: any[]) => void): void;
  protected abstract gluTessBeginPolygon(): void;
  protected abstract gluTessBeginContour(): void;
  protected abstract gluTessEndContour(): void;
  protected abstract gluTessEndPolygon(): void;
  protected abstract gluTessVertex(vertex: Vertex, data: Vertex): void;
  protected abstract gluTessNormal(x: number, y: number, z: number): void;
  protected abstract gluTessProperty(which: GluEnum, value: number | boolean): void;
}

export class Tesselator extends GluTesselator {
  private readonly _vsize: number;
  private _current: Vertex[];
  private _out: any[];
  private _primitiveType: PrimitiveType;

  constructor(vertexSize: number = 2) {
    super();
    this._vsize = vertexSize;
    this._current = [];
    this._out = [];
    this._primitiveType = 0;
    
    this.gluTessCallback(GluEnum.GLU_TESS_VERTEX_DATA, this._vertex);
    this.gluTessCallback(GluEnum.GLU_TESS_BEGIN, this._begin);
    this.gluTessCallback(GluEnum.GLU_TESS_END, this._end);
    this.gluTessCallback(GluEnum.GLU_TESS_ERROR, this._error);
    this.gluTessCallback(GluEnum.GLU_TESS_COMBINE, this._combine);
    this.gluTessCallback(GluEnum.GLU_TESS_EDGE_FLAG, this._edge);
  }

  start(polygons: Polygon[], holes: Polygon[]): void {
    this._current = [];
    this._out = [];
    this.gluTessBeginPolygon();

    for (const polygon of polygons) {
      this.gluTessBeginContour();
      for (const vertex of polygon) {
        this.gluTessVertex(vertex, vertex);
      }
      this.gluTessEndContour();
    }

    for (const hole of holes) {
      this.gluTessBeginContour();
      for (const vertex of hole) {
        this.gluTessVertex(vertex, vertex);
      }
      this.gluTessEndContour();
    }

    this.gluTessEndPolygon();
  }

  run(options: Partial<TesselatorOptions> = {}): any[] {
    const config: TesselatorOptions = { ...DEFAULT_OPTIONS, ...options };
    let { polygons, holes, autoWinding, boundaryOnly } = config;

    if (!polygons || polygons.length === 0) {
      throw new Error("need at least a single polygon");
    }

    if (autoWinding) {
      polygons = polygons
        .filter((polygon) => Math.abs(calculateArea(polygon)) > 0)
        .map((polygon) => {
          if (isClockwise(polygon)) {
            polygon.reverse();
          }
          return polygon;
        });

      holes = holes
        .filter((hole) => Math.abs(calculateArea(hole)) > 0)
        .map((hole) => {
          if (isCounterClockwise(hole)) {
            hole.reverse();
          }
          return hole;
        });
    }

    const [normalX, normalY, normalZ] = config.normal ?? calculateNormal(polygons[0], true);
    
    this.gluTessNormal(normalX, normalY, normalZ);
    this.gluTessProperty(GluEnum.GLU_TESS_BOUNDARY_ONLY, boundaryOnly);
    this.gluTessProperty(GluEnum.GLU_TESS_WINDING_RULE, config.windingRule);
    this.start(polygons, holes);
    
    return this._out;
  }

  private _begin(primitiveType: PrimitiveType): void {
    this._primitiveType = primitiveType;
    this._current = [];
  }

  private _end_fan(): void {
    const firstVertex = this._current.shift()!;
    let previousVertex = this._current.shift()!;
    
    while (this._current.length > 0) {
      const currentVertex = this._current.shift()!;
      this._out.push(firstVertex, previousVertex, currentVertex);
      previousVertex = currentVertex;
    }
  }

  private _end_strip(): void {
    let vertex1 = this._current.shift()!;
    let vertex2 = this._current.shift()!;
    
    while (this._current.length > 0) {
      const vertex3 = this._current.shift()!;
      this._out.push(vertex1, vertex2, vertex3);
      vertex1 = vertex2;
      vertex2 = vertex3;
    }
  }

  private _end(): void {
    switch (this._primitiveType) {
      case PrimitiveType.GL_TRIANGLE_FAN:
        this._end_fan();
        break;
      case PrimitiveType.GL_TRIANGLE_STRIP:
        this._end_strip();
        break;
      default:
        this._out.push(this._current);
    }
  }

  private _vertex(vertex: Vertex): void {
    this._current.push(vertex);
  }

  private _edge(): void {
    // Edge flag callback - intentionally empty
  }

  private _error(errorNumber: number): void {
    console.error(`error number: ${errorNumber}`);
  }

  private _combine(coords: number[], vertexData: Vertex[], weights: number[]): Vertex {
    for (let i = 0; i < 4; i++) {
      if (!vertexData[i]) {
        vertexData[i] = new Array(this._vsize).fill(0);
      }
    }

    const result = new Array(this._vsize);
    for (let i = 0; i < this._vsize; i++) {
      result[i] =
        vertexData[0][i] * weights[0] +
        vertexData[1][i] * weights[1] +
        vertexData[2][i] * weights[2] +
        vertexData[3][i] * weights[3];
    }
    
    return result;
  }

  protected gluTessCallback(which: GluEnum, callback: (...args: any[]) => void): void {
    // Implementation depends on underlying GLU library
  }

  protected gluTessBeginPolygon(): void {
    // Implementation depends on underlying GLU library
  }

  protected gluTessBeginContour(): void {
    // Implementation depends on underlying GLU library
  }

  protected gluTessEndContour(): void {
    // Implementation depends on underlying GLU library
  }

  protected gluTessEndPolygon(): void {
    // Implementation depends on underlying GLU library
  }

  protected gluTessVertex(vertex: Vertex, data: Vertex): void {
    // Implementation depends on underlying GLU library
  }

  protected gluTessNormal(x: number, y: number, z: number): void {
    // Implementation depends on underlying GLU library
  }

  protected gluTessProperty(which: GluEnum, value: number | boolean): void {
    // Implementation depends on underlying GLU library
  }
}

function groupTriangles(flatVertices: Vertex[]): Vertex[][] {
  const triangles: Vertex[][] = [];
  for (let i = 0; i < flatVertices.length; i += 3) {
    triangles.push([flatVertices[i], flatVertices[i + 1], flatVertices[i + 2]]);
  }
  return triangles;
}

export function run(options: Partial<TesselatorOptions> = {}): any[] {
  const vertexSize = options.vertexSize ?? 2;
  const tesselator = new Tesselator(vertexSize);
  const result = tesselator.run(options);
  return options.boundaryOnly ? result : result.map(groupTriangles);
}

function calculateArea(polygon: Contour): number {
  let area = 0;
  const vertexCount = polygon.length;
  
  for (let i = 0; i < vertexCount; i++) {
    const j = (i + 1) % vertexCount;
    area += polygon[i][0] * polygon[j][1];
    area -= polygon[j][0] * polygon[i][1];
  }
  
  return area / 2;
}

function isClockwise(polygon: Contour): boolean {
  return calculateArea(polygon) < 0;
}

function isCounterClockwise(polygon: Contour): boolean {
  return calculateArea(polygon) > 0;
}

function calculateNormal(polygon: Contour, normalize: boolean): [number, number, number] {
  const v1 = polygon[1];
  const v0 = polygon[0];
  const v2 = polygon[2];
  
  const ux = v1[0] - v0[0];
  const uy = v1[1] - v0[1];
  const uz = (v1[2] ?? 0) - (v0[2] ?? 0);
  
  const vx = v2[0] - v0[0];
  const vy = v2[1] - v0[1];
  const vz = (v2[2] ?? 0) - (v0[2] ?? 0);
  
  let nx = uy * vz - uz * vy;
  let ny = uz * vx - ux * vz;
  let nz = ux * vy - uy * vx;
  
  if (normalize) {
    const length = Math.sqrt(nx * nx + ny * ny + nz * nz);
    if (length > 0) {
      nx /= length;
      ny /= length;
      nz /= length;
    }
  }
  
  return [nx, ny, nz];
}