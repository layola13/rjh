export const GL_LINE_LOOP = 0x0002;
export const GL_TRIANGLES = 0x0004;
export const GL_TRIANGLE_STRIP = 0x0005;
export const GL_TRIANGLE_FAN = 0x0006;

export const GLU_TESS_WINDING_ODD = 100130;
export const GLU_TESS_WINDING_NONZERO = 100131;
export const GLU_TESS_WINDING_POSITIVE = 100132;
export const GLU_TESS_WINDING_NEGATIVE = 100133;
export const GLU_TESS_WINDING_ABS_GEQ_TWO = 100134;

export interface TesselatorOptions {
  polygons: number[][][];
  holes: number[][][];
  windingRule: number;
  boundaryOnly: boolean;
  normal: [number, number, number] | null;
  autoWinding: boolean;
  vertexSize?: number;
}

export const DEFAULT_OPTIONS: TesselatorOptions = {
  polygons: [],
  holes: [],
  windingRule: GLU_TESS_WINDING_POSITIVE,
  boundaryOnly: false,
  normal: null,
  autoWinding: true
};

enum GLUEnum {
  GLU_TESS_VERTEX_DATA = 100106,
  GLU_TESS_BEGIN = 100100,
  GLU_TESS_END = 100102,
  GLU_TESS_ERROR = 100103,
  GLU_TESS_COMBINE = 100105,
  GLU_TESS_EDGE_FLAG = 100104,
  GLU_TESS_BOUNDARY_ONLY = 100141,
  GLU_TESS_WINDING_RULE = 100140
}

type Vertex = number[];
type Contour = Vertex[];
type Polygon = Contour;

abstract class GluTesselator {
  protected abstract gluTessCallback(which: GLUEnum, callback: Function): void;
  protected abstract gluTessBeginPolygon(): void;
  protected abstract gluTessEndPolygon(): void;
  protected abstract gluTessBeginContour(): void;
  protected abstract gluTessEndContour(): void;
  protected abstract gluTessVertex(vertex: Vertex, data: Vertex): void;
  protected abstract gluTessNormal(x: number, y: number, z: number): void;
  protected abstract gluTessProperty(which: GLUEnum, value: number | boolean): void;
}

function calculateArea(polygon: Contour): number {
  let area = 0;
  const n = polygon.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
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

function calculateNormal(polygon: Contour, normalize: boolean = false): [number, number, number] {
  const v1 = [
    polygon[1][0] - polygon[0][0],
    polygon[1][1] - polygon[0][1],
    polygon[1][2] ?? 0 - (polygon[0][2] ?? 0)
  ];
  const v2 = [
    polygon[2][0] - polygon[0][0],
    polygon[2][1] - polygon[0][1],
    polygon[2][2] ?? 0 - (polygon[0][2] ?? 0)
  ];
  
  const normal: [number, number, number] = [
    v1[1] * v2[2] - v1[2] * v2[1],
    v1[2] * v2[0] - v1[0] * v2[2],
    v1[0] * v2[1] - v1[1] * v2[0]
  ];
  
  if (normalize) {
    const length = Math.sqrt(normal[0] ** 2 + normal[1] ** 2 + normal[2] ** 2);
    if (length > 0) {
      normal[0] /= length;
      normal[1] /= length;
      normal[2] /= length;
    }
  }
  
  return normal;
}

export class Tesselator extends GluTesselator {
  private readonly _vsize: number;
  private _current: Vertex[];
  private _out: (Vertex | Vertex[])[];
  private _primitiveType: number;

  constructor(vertexSize: number = 2) {
    super();
    this._vsize = vertexSize;
    this._current = [];
    this._out = [];
    this._primitiveType = 0;
    
    this.gluTessCallback(GLUEnum.GLU_TESS_VERTEX_DATA, this._vertex.bind(this));
    this.gluTessCallback(GLUEnum.GLU_TESS_BEGIN, this._begin.bind(this));
    this.gluTessCallback(GLUEnum.GLU_TESS_END, this._end.bind(this));
    this.gluTessCallback(GLUEnum.GLU_TESS_ERROR, this._error.bind(this));
    this.gluTessCallback(GLUEnum.GLU_TESS_COMBINE, this._combine.bind(this));
    this.gluTessCallback(GLUEnum.GLU_TESS_EDGE_FLAG, this._edge.bind(this));
  }

  protected gluTessCallback(which: GLUEnum, callback: Function): void {
    // Implementation stub
  }

  protected gluTessBeginPolygon(): void {
    // Implementation stub
  }

  protected gluTessEndPolygon(): void {
    // Implementation stub
  }

  protected gluTessBeginContour(): void {
    // Implementation stub
  }

  protected gluTessEndContour(): void {
    // Implementation stub
  }

  protected gluTessVertex(vertex: Vertex, data: Vertex): void {
    // Implementation stub
  }

  protected gluTessNormal(x: number, y: number, z: number): void {
    // Implementation stub
  }

  protected gluTessProperty(which: GLUEnum, value: number | boolean): void {
    // Implementation stub
  }

  private start(polygons: Polygon[], holes: Polygon[]): void {
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

  public run(options: Partial<TesselatorOptions> = {}): (Vertex | Vertex[])[] {
    const config: TesselatorOptions = Object.assign({}, DEFAULT_OPTIONS, options);
    let { polygons, holes } = config;
    const { autoWinding, boundaryOnly, windingRule } = config;

    if (!polygons || polygons.length === 0) {
      throw new Error("need at least a single polygon");
    }

    if (autoWinding) {
      polygons = polygons
        .filter(polygon => Math.abs(calculateArea(polygon)) > 0)
        .map(polygon => {
          if (isClockwise(polygon)) {
            polygon.reverse();
          }
          return polygon;
        });

      holes = holes
        .filter(hole => Math.abs(calculateArea(hole)) > 0)
        .map(hole => {
          if (isCounterClockwise(hole)) {
            hole.reverse();
          }
          return hole;
        });
    }

    const normal = config.normal ?? calculateNormal(polygons[0], true);
    const [nx, ny, nz] = normal;

    this.gluTessNormal(nx, ny, nz);
    this.gluTessProperty(GLUEnum.GLU_TESS_BOUNDARY_ONLY, boundaryOnly);
    this.gluTessProperty(GLUEnum.GLU_TESS_WINDING_RULE, windingRule);
    this.start(polygons, holes);

    return this._out;
  }

  private _begin(primitiveType: number): void {
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
      case GL_TRIANGLE_FAN:
        this._end_fan();
        break;
      case GL_TRIANGLE_STRIP:
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
    // Edge flag callback
  }

  private _error(errorCode: number): void {
    console.error("error number: " + errorCode);
  }

  private _combine(coords: number[], vertexData: Vertex[], weights: number[]): Vertex {
    for (let i = 0; i < 4; i++) {
      if (!vertexData[i]) {
        vertexData[i] = new Array(this._vsize).fill(0);
      }
    }

    const result: Vertex = new Array(this._vsize);
    for (let i = 0; i < this._vsize; i++) {
      result[i] = 
        vertexData[0][i] * weights[0] +
        vertexData[1][i] * weights[1] +
        vertexData[2][i] * weights[2] +
        vertexData[3][i] * weights[3];
    }

    return result;
  }
}

function groupTriangles(vertices: Vertex[]): Vertex[][] {
  const triangles: Vertex[][] = [];
  for (let i = 0; i < vertices.length; i += 3) {
    triangles.push([vertices[i], vertices[i + 1], vertices[i + 2]]);
  }
  return triangles;
}

export function run(options: Partial<TesselatorOptions> = {}): (Vertex | Vertex[])[] {
  const vertexSize = options.vertexSize ?? 2;
  const tesselator = new Tesselator(vertexSize);
  const result = tesselator.run(options);
  return options.boundaryOnly ? result : result.map(item => 
    Array.isArray(item) && item.length > 0 && Array.isArray(item[0]) 
      ? item 
      : groupTriangles(item as Vertex[])
  ).flat();
}