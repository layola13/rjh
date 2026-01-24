/**
 * libtess.js - A JavaScript port of the GLU tessellation library
 * Module: Tessellation library for polygon triangulation
 */

/** 2D Point coordinate */
interface Point {
  /** X coordinate (horizontal) */
  a: number;
  /** Y coordinate (vertical) */
  b: number;
}

/** 3D vertex with additional metadata */
interface Vertex extends Point {
  /** Associated geometric data */
  g: [number, number, number];
  /** User data attached to vertex */
  d: unknown;
  /** Heap index for priority queue */
  h: number;
}

/** Half-edge structure */
interface HalfEdge {
  /** Origin vertex */
  a: Vertex;
  /** Next edge in loop */
  e: HalfEdge;
  /** Previous edge (reverse of next) */
  c: HalfEdge;
  /** Symmetric/opposite edge */
  b: HalfEdge;
  /** Left face */
  d: Face;
  /** Associated region in sweep */
  i: ActiveRegion | null;
  /** Winding number */
  f: number;
}

/** Face/polygon structure */
interface Face {
  /** Incident edge */
  a: HalfEdge;
  /** Next face in list */
  b: Face;
  /** Previous face in list */
  d: Face;
  /** User data */
  d: unknown;
  /** Inside flag */
  c: boolean;
}

/** Active region during sweep */
interface ActiveRegion {
  /** Upper edge of region */
  a: HalfEdge;
  /** Node in dictionary tree */
  e: DictNode<ActiveRegion>;
  /** Winding number */
  f: number;
  /** Dirty flag (needs update) */
  b: boolean;
  /** Sentinel flag */
  h: boolean;
  /** Region above fixup flag */
  d: boolean;
  /** Region below fixup flag */
  c: boolean;
}

/** Dictionary/tree node */
interface DictNode<T> {
  /** Data payload */
  b: T | null;
  /** Left child */
  a: DictNode<T>;
  /** Right child */
  c: DictNode<T>;
}

/** Priority queue */
interface PriorityQueue {
  /** Heap array (1-indexed) */
  d: number[];
  /** Vertex storage */
  e: (Vertex | null)[];
  /** Vertex to heap index map */
  c: number[];
  /** Current size */
  a: number;
  /** Capacity */
  f: number;
  /** Free list head */
  b: number;
  /** Initialized flag */
  h: boolean;
}

/** Mesh structure */
interface Mesh {
  /** Sentinel vertex */
  c: Vertex;
  /** Sentinel face */
  a: Face;
  /** Sentinel edge */
  b: HalfEdge;
  /** Symmetric sentinel edge */
  d: HalfEdge;
}

/** Sweep state */
interface SweepState {
  /** Vertex array */
  c: (Vertex | null)[];
  /** Sorted indices */
  d: number[] | null;
  /** Current vertex count */
  a: number;
  /** Initialized flag */
  e: boolean;
  /** Priority queue */
  b: PriorityQueue;
}

/** GLU Tessellator - main tessellation object */
export declare class GluTesselator {
  /** Current tessellation state */
  d: number;
  
  /** Error callback */
  p: ((errorCode: number, polygonData: unknown) => void) | null;
  
  /** Begin callback */
  h: ((primitiveType: number, polygonData: unknown) => void) | null;
  
  /** Edge flag callback */
  l: ((boundaryEdge: boolean, polygonData: unknown) => void) | null;
  
  /** Vertex callback */
  k: ((vertexData: unknown, polygonData: unknown) => void) | null;
  
  /** End callback */
  i: ((polygonData: unknown) => void) | null;
  
  /** Combine callback */
  o: ((coords: number[], data: unknown[], weight: number[], polygonData: unknown) => unknown) | null;
  
  /** Mesh callback */
  r: ((mesh: Mesh) => void) | null;
  
  /** User polygon data */
  c: unknown;
  
  /** Normal vector [x, y, z] */
  j: [number, number, number];
  
  /** Winding rule */
  s: number;
  
  /** Boundary-only mode */
  m: boolean;
  
  /** Internal mesh */
  b: Mesh | null;
  
  /** Last added edge */
  q: HalfEdge | null;
  
  /** Current event vertex */
  a: Vertex | null;
  
  /** Sweep line state */
  e: SweepState | null;
  
  /** Active region dictionary */
  f: { a: DictNode<ActiveRegion>; c: (a: unknown, b: ActiveRegion, c: ActiveRegion) => boolean; b: unknown } | null;
  
  /** Error flag */
  n: boolean;

  constructor();

  /**
   * Delete tessellator and free resources
   */
  gluDeleteTess(): void;

  /**
   * Set tessellator property
   * @param property - Property enum (e.g., GLU_TESS_WINDING_RULE)
   * @param value - Property value
   */
  gluTessProperty(property: number, value: number | boolean): void;

  /**
   * Get tessellator property
   * @param property - Property enum
   * @returns Current property value
   */
  gluGetTessProperty(property: number): number | boolean;

  /**
   * Set tessellation normal vector (for projection)
   * @param x - X component
   * @param y - Y component
   * @param z - Z component
   */
  gluTessNormal(x: number, y: number, z: number): void;

  /**
   * Register callback function
   * @param which - Callback type enum (e.g., GLU_TESS_BEGIN)
   * @param callback - Callback function or null to unregister
   */
  gluTessCallback(which: number, callback: Function | null): void;

  /**
   * Add vertex to current contour
   * @param coords - Vertex coordinates [x, y, z]
   * @param data - User data associated with vertex
   */
  gluTessVertex(coords: [number, number, number], data: unknown): void;

  /**
   * Begin polygon tessellation
   * @param data - User polygon data (passed to callbacks)
   */
  gluTessBeginPolygon(data: unknown): void;

  /**
   * Begin new contour in current polygon
   */
  gluTessBeginContour(): void;

  /**
   * End current contour
   */
  gluTessEndContour(): void;

  /**
   * End polygon and perform tessellation
   */
  gluTessEndPolygon(): void;
}

/** Winding rule constants */
export declare const windingRule: {
  /** Odd-even winding rule */
  GLU_TESS_WINDING_ODD: 100130;
  /** Non-zero winding rule */
  GLU_TESS_WINDING_NONZERO: 100131;
  /** Positive winding rule */
  GLU_TESS_WINDING_POSITIVE: 100132;
  /** Negative winding rule */
  GLU_TESS_WINDING_NEGATIVE: 100133;
  /** Absolute value >= 2 winding rule */
  GLU_TESS_WINDING_ABS_GEQ_TWO: 100134;
};

/** Output primitive type constants */
export declare const primitiveType: {
  /** Line loop primitive */
  GL_LINE_LOOP: 2;
  /** Triangles primitive */
  GL_TRIANGLES: 4;
  /** Triangle strip primitive */
  GL_TRIANGLE_STRIP: 5;
  /** Triangle fan primitive */
  GL_TRIANGLE_FAN: 6;
};

/** Error code constants */
export declare const errorType: {
  /** Missing gluTessBeginPolygon call */
  GLU_TESS_MISSING_BEGIN_POLYGON: 100151;
  /** Missing gluTessEndPolygon call */
  GLU_TESS_MISSING_END_POLYGON: 100153;
  /** Missing gluTessBeginContour call */
  GLU_TESS_MISSING_BEGIN_CONTOUR: 100152;
  /** Missing gluTessEndContour call */
  GLU_TESS_MISSING_END_CONTOUR: 100154;
  /** Coordinate value too large */
  GLU_TESS_COORD_TOO_LARGE: 100155;
  /** Need combine callback for intersection */
  GLU_TESS_NEED_COMBINE_CALLBACK: 100156;
};

/** GLU enum constants */
export declare const gluEnum: {
  GLU_TESS_MESH: 100112;
  GLU_TESS_TOLERANCE: 100142;
  GLU_TESS_WINDING_RULE: 100140;
  GLU_TESS_BOUNDARY_ONLY: 100141;
  GLU_INVALID_ENUM: 100900;
  GLU_INVALID_VALUE: 100901;
  GLU_TESS_BEGIN: 100100;
  GLU_TESS_VERTEX: 100101;
  GLU_TESS_END: 100102;
  GLU_TESS_ERROR: 100103;
  GLU_TESS_EDGE_FLAG: 100104;
  GLU_TESS_COMBINE: 100105;
  GLU_TESS_BEGIN_DATA: 100106;
  GLU_TESS_VERTEX_DATA: 100107;
  GLU_TESS_END_DATA: 100108;
  GLU_TESS_ERROR_DATA: 100109;
  GLU_TESS_EDGE_FLAG_DATA: 100110;
  GLU_TESS_COMBINE_DATA: 100111;
};

export interface LibTess {
  GluTesselator: typeof GluTesselator;
  windingRule: typeof windingRule;
  primitiveType: typeof primitiveType;
  errorType: typeof errorType;
  gluEnum: typeof gluEnum;
}

declare const libtess: LibTess;
export default libtess;