interface Point2D {
  a: number;
  b: number;
}

interface Point3D {
  g: [number, number, number];
}

interface Vertex extends Point2D, Point3D {
  h: number;
  d: any;
}

interface HalfEdge {
  a: Vertex;
  b: HalfEdge;
  c: HalfEdge;
  e: HalfEdge;
  d: Face;
  f: number;
  h: HalfEdge;
  i: ActiveRegion | null;
}

interface Face {
  a: HalfEdge;
  b: Face;
  d: Face;
  c: boolean;
}

interface ActiveRegion {
  a: HalfEdge;
  e: PriorityQueueNode;
  f: number;
  c: boolean;
  b: boolean;
  d: boolean;
  h: boolean;
}

interface PriorityQueueNode {
  b: ActiveRegion | null;
  a: PriorityQueueNode;
  c: PriorityQueueNode;
}

interface Mesh {
  a: Face;
  b: HalfEdge;
  c: Vertex;
  d: Face;
}

interface PriorityQueue {
  a: number;
  b: number;
  c: number[];
  d: number[];
  e: (Vertex | null)[];
  f: number;
  h: boolean;
}

interface Dictionary {
  a: PriorityQueueNode;
  b: GluTesselator;
  c: (tesselator: GluTesselator, a: ActiveRegion, b: ActiveRegion) => boolean;
}

const SENTINEL_COORD = 4e150;

function pointsEqual(p1: Point2D, p2: Point2D): boolean {
  return p1.b === p2.b && p1.a === p2.a;
}

function vertexLeq(v1: Point2D, v2: Point2D): boolean {
  return v1.b < v2.b || (v1.b === v2.b && v1.a <= v2.a);
}

function edgeEval(u: Point2D, v: Point2D, w: Point2D): number {
  const gapLeft = v.b - u.b;
  const gapRight = w.b - v.b;
  
  if (gapLeft + gapRight <= 0) {
    return 0;
  }
  
  if (gapLeft < gapRight) {
    return v.a - u.a + gapLeft / (gapLeft + gapRight) * (u.a - w.a);
  } else {
    return v.a - w.a + gapRight / (gapLeft + gapRight) * (w.a - u.a);
  }
}

function edgeSign(u: Point2D, v: Point2D, w: Point2D): number {
  const gapLeft = v.b - u.b;
  const gapRight = w.b - v.b;
  
  if (gapLeft + gapRight <= 0) {
    return 0;
  }
  
  return (v.a - w.a) * gapLeft + (v.a - u.a) * gapRight;
}

function transLeq(v1: Point2D, v2: Point2D): boolean {
  return v1.a < v2.a || (v1.a === v2.a && v1.b <= v2.b);
}

function transEval(u: Point2D, v: Point2D, w: Point2D): number {
  const gapLeft = v.a - u.a;
  const gapRight = w.a - v.a;
  
  if (gapLeft + gapRight <= 0) {
    return 0;
  }
  
  if (gapLeft < gapRight) {
    return v.b - u.b + gapLeft / (gapLeft + gapRight) * (u.b - w.b);
  } else {
    return v.b - w.b + gapRight / (gapLeft + gapRight) * (w.b - u.b);
  }
}

function transSign(u: Point2D, v: Point2D, w: Point2D): number {
  const gapLeft = v.a - u.a;
  const gapRight = w.a - v.a;
  
  if (gapLeft + gapRight <= 0) {
    return 0;
  }
  
  return (v.b - w.b) * gapLeft + (v.b - u.b) * gapRight;
}

function edgeGoesLeft(edge: HalfEdge): boolean {
  return vertexLeq(edge.b.a, edge.a);
}

function edgeGoesRight(edge: HalfEdge): boolean {
  return vertexLeq(edge.a, edge.b.a);
}

function interpolate(a: number, x: number, b: number, y: number): number {
  const normalizedA = a < 0 ? 0 : a;
  const normalizedB = b < 0 ? 0 : b;
  
  if (normalizedA <= normalizedB) {
    if (normalizedB === 0) {
      return (x + y) / 2;
    }
    return x + normalizedA / (normalizedA + normalizedB) * (y - x);
  } else {
    return y + normalizedB / (normalizedA + normalizedB) * (x - y);
  }
}

function addWinding(eDst: HalfEdge, eSrc: HalfEdge): void {
  eDst.f += eSrc.f;
  eDst.b.f += eSrc.b.f;
}

function regionBelow(region: ActiveRegion): ActiveRegion {
  return region.e.c.b as ActiveRegion;
}

function regionAbove(region: ActiveRegion): ActiveRegion {
  return region.e.a.b as ActiveRegion;
}

class GluTesselator {
  d: number = TessState.DORMANT;
  p: ((type: number, data: any) => void) | null = null;
  b: Mesh | null = null;
  q: HalfEdge | null = null;
  j: [number, number, number] = [0, 0, 0];
  s: number = WindingRule.ODD;
  n: boolean = false;
  o: ((coords: number[], data: any[], weight: number[], userData: any) => any) | null = null;
  a: Vertex | null = null;
  e: any = null;
  f: Dictionary | null = null;
  m: boolean = false;
  c: any = null;
  r: ((mesh: Mesh) => void) | null = null;
  i: ((userData: any) => void) | null = null;
  k: ((vertex: any, userData: any) => void) | null = null;
  l: ((flag: boolean, userData: any) => void) | null = null;
  h: ((type: number, userData: any) => void) | null = null;

  gluDeleteTess(): void {
    this.requireState(TessState.DORMANT);
  }

  gluTessProperty(which: number, value: number): void {
    switch (which) {
      case GluEnum.TOLERANCE:
        return;
      case GluEnum.WINDING_RULE:
        switch (value) {
          case WindingRule.ODD:
          case WindingRule.NONZERO:
          case WindingRule.POSITIVE:
          case WindingRule.NEGATIVE:
          case WindingRule.ABS_GEQ_TWO:
            this.s = value;
            return;
        }
        break;
      case GluEnum.BOUNDARY_ONLY:
        this.m = !!value;
        return;
      default:
        this.callError(ErrorType.INVALID_ENUM);
        return;
    }
    this.callError(ErrorType.INVALID_VALUE);
  }

  gluGetTessProperty(which: number): number | boolean {
    switch (which) {
      case GluEnum.TOLERANCE:
        return 0;
      case GluEnum.WINDING_RULE:
        return this.s;
      case GluEnum.BOUNDARY_ONLY:
        return this.m;
      default:
        this.callError(ErrorType.INVALID_ENUM);
    }
    return false;
  }

  gluTessNormal(x: number, y: number, z: number): void {
    this.j[0] = x;
    this.j[1] = y;
    this.j[2] = z;
  }

  gluTessCallback(which: number, fn: any): void {
    const callback = fn || null;
    switch (which) {
      case GluEnum.BEGIN:
      case GluEnum.BEGIN_DATA:
        this.h = callback;
        break;
      case GluEnum.EDGE_FLAG:
      case GluEnum.EDGE_FLAG_DATA:
        this.l = callback;
        break;
      case GluEnum.VERTEX:
      case GluEnum.VERTEX_DATA:
        this.k = callback;
        break;
      case GluEnum.END:
      case GluEnum.END_DATA:
        this.i = callback;
        break;
      case GluEnum.ERROR:
      case GluEnum.ERROR_DATA:
        this.p = callback;
        break;
      case GluEnum.COMBINE:
      case GluEnum.COMBINE_DATA:
        this.o = callback;
        break;
      case GluEnum.MESH:
        this.r = callback;
        break;
      default:
        this.callError(ErrorType.INVALID_ENUM);
    }
  }

  gluTessVertex(coords: number[], data: any): void {
    const clamped = [0, 0, 0];
    let tooLarge = false;
    
    this.requireState(TessState.IN_CONTOUR);
    
    for (let i = 0; i < 3; i++) {
      let coord = coords[i];
      if (coord < -1e150) {
        coord = -1e150;
        tooLarge = true;
      }
      if (coord > 1e150) {
        coord = 1e150;
        tooLarge = true;
      }
      clamped[i] = coord;
    }
    
    if (tooLarge) {
      this.callError(ErrorType.COORD_TOO_LARGE);
    }
    
    this.addVertex(clamped, data);
  }

  gluTessBeginPolygon(data: any): void {
    this.requireState(TessState.DORMANT);
    this.d = TessState.IN_POLYGON;
    this.b = new MeshImpl();
    this.c = data;
  }

  gluTessBeginContour(): void {
    this.requireState(TessState.IN_POLYGON);
    this.d = TessState.IN_CONTOUR;
    this.q = null;
  }

  gluTessEndContour(): void {
    this.requireState(TessState.IN_CONTOUR);
    this.d = TessState.IN_POLYGON;
  }

  gluTessEndPolygon(): void {
    this.requireState(TessState.IN_POLYGON);
    this.d = TessState.DORMANT;
    this.computeInterior();
  }

  private requireState(state: number): void {
    if (this.d !== state) {
      this.gotoState(state);
    }
  }

  private gotoState(newState: number): void {
    while (this.d !== newState) {
      if (this.d < newState) {
        switch (this.d) {
          case TessState.DORMANT:
            this.callError(ErrorType.MISSING_BEGIN_POLYGON);
            this.gluTessBeginPolygon(null);
            break;
          case TessState.IN_POLYGON:
            this.callError(ErrorType.MISSING_BEGIN_CONTOUR);
            this.gluTessBeginContour();
            break;
        }
      } else {
        switch (this.d) {
          case TessState.IN_CONTOUR:
            this.callError(ErrorType.MISSING_END_CONTOUR);
            this.gluTessEndContour();
            break;
          case TessState.IN_POLYGON:
            this.callError(ErrorType.MISSING_END_POLYGON);
            this.gluTessEndPolygon();
            break;
        }
      }
    }
  }

  private callError(error: number): void {
    if (this.p) {
      this.p(error, this.c);
    }
  }

  private addVertex(coords: number[], data: any): void {
    // Implementation details omitted for brevity
  }

  private computeInterior(): void {
    // Implementation details omitted for brevity
  }
}

enum TessState {
  DORMANT = 0,
  IN_POLYGON = 1,
  IN_CONTOUR = 2
}

enum WindingRule {
  ODD = 100130,
  NONZERO = 100131,
  POSITIVE = 100132,
  NEGATIVE = 100133,
  ABS_GEQ_TWO = 100134
}

enum PrimitiveType {
  LINE_LOOP = 2,
  TRIANGLES = 4,
  TRIANGLE_STRIP = 5,
  TRIANGLE_FAN = 6
}

enum ErrorType {
  MISSING_BEGIN_POLYGON = 100151,
  MISSING_END_POLYGON = 100153,
  MISSING_BEGIN_CONTOUR = 100152,
  MISSING_END_CONTOUR = 100154,
  COORD_TOO_LARGE = 100155,
  NEED_COMBINE_CALLBACK = 100156
}

enum GluEnum {
  MESH = 100112,
  TOLERANCE = 100142,
  WINDING_RULE = 100140,
  BOUNDARY_ONLY = 100141,
  INVALID_ENUM = 100900,
  INVALID_VALUE = 100901,
  BEGIN = 100100,
  VERTEX = 100101,
  END = 100102,
  ERROR = 100103,
  EDGE_FLAG = 100104,
  COMBINE = 100105,
  BEGIN_DATA = 100106,
  VERTEX_DATA = 100107,
  END_DATA = 100108,
  ERROR_DATA = 100109,
  EDGE_FLAG_DATA = 100110,
  COMBINE_DATA = 100111
}

class MeshImpl implements Mesh {
  a!: Face;
  b!: HalfEdge;
  c!: Vertex;
  d!: Face;
}

export { GluTesselator, WindingRule, PrimitiveType, ErrorType, GluEnum };