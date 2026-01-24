/**
 * Point structure representing a 2D coordinate
 */
interface Point {
  /** X coordinate (horizontal axis) */
  a: number;
  /** Y coordinate (vertical axis) */
  b: number;
}

/**
 * Vertex structure with 3D coordinates
 */
interface Vertex {
  /** X coordinate */
  a: number;
  /** Y coordinate */
  b: number;
  /** 3D coordinate data [x, y, z] */
  g: [number, number, number];
  /** Vertex data attachment */
  d: unknown;
  /** Hash/index identifier */
  h: number;
}

/**
 * Half-edge structure for mesh topology
 */
interface HalfEdge {
  /** Origin vertex */
  a: Vertex;
  /** Next edge in face loop */
  e: HalfEdge;
  /** Symmetric/opposite edge */
  b: HalfEdge;
  /** Previous edge */
  c: HalfEdge;
  /** Left face */
  d: Face;
  /** Edge data */
  f: number;
  /** Flags */
  i: unknown;
}

/**
 * Face structure in mesh
 */
interface Face {
  /** Associated half-edge */
  a: HalfEdge;
  /** Next face in list */
  b: Face;
  /** Previous face */
  d: Face;
  /** Face is interior flag */
  c: boolean;
}

/**
 * Active region in sweep line algorithm
 */
interface ActiveRegion {
  /** Associated half-edge */
  a: HalfEdge;
  /** Priority queue node */
  e: PriorityQueueNode;
  /** Winding number */
  f: number;
  /** Dirty flag */
  b: boolean;
  /** Sentinel flag */
  h: boolean;
  /** Inside flag */
  d: boolean;
  /** Fix upper edge flag */
  c: boolean;
}

/**
 * Priority queue node
 */
interface PriorityQueueNode {
  /** Data payload */
  b: unknown;
  /** Previous node */
  a: PriorityQueueNode;
  /** Next node */
  c: PriorityQueueNode;
}

/**
 * Mesh data structure
 */
interface Mesh {
  /** Vertex list */
  c: Vertex;
  /** Face list */
  a: Face;
  /** Edge list */
  b: HalfEdge;
  /** Symmetric edge list */
  d: HalfEdge;
}

/**
 * Tesselator callback for begin primitive
 */
type TessBeginCallback = (primitiveType: number, userData?: unknown) => void;

/**
 * Tesselator callback for vertex output
 */
type TessVertexCallback = (vertexData: unknown, userData?: unknown) => void;

/**
 * Tesselator callback for end primitive
 */
type TessEndCallback = (userData?: unknown) => void;

/**
 * Tesselator callback for error reporting
 */
type TessErrorCallback = (errorCode: number, userData?: unknown) => void;

/**
 * Tesselator callback for edge flag
 */
type TessEdgeFlagCallback = (boundaryEdge: boolean, userData?: unknown) => void;

/**
 * Tesselator callback for combining vertices
 */
type TessCombineCallback = (
  coords: [number, number, number],
  vertexData: unknown[],
  weights: number[],
  userData?: unknown
) => unknown;

/**
 * Tesselator callback for mesh output
 */
type TessMeshCallback = (mesh: Mesh, userData?: unknown) => void;

/**
 * GLU Tesselator class for polygon triangulation
 */
export declare class GluTesselator {
  /** Current tesselation state */
  d: number;
  
  /** User data pointer */
  c: unknown;
  
  /** Normal vector [x, y, z] */
  j: [number, number, number];
  
  /** Winding rule */
  s: number;
  
  /** Boundary only flag */
  m: boolean;
  
  /** Begin callback */
  h: TessBeginCallback | null;
  
  /** Vertex callback */
  k: TessVertexCallback | null;
  
  /** End callback */
  i: TessEndCallback | null;
  
  /** Error callback */
  p: TessErrorCallback | null;
  
  /** Edge flag callback */
  l: TessEdgeFlagCallback | null;
  
  /** Combine callback */
  o: TessCombineCallback | null;
  
  /** Mesh callback */
  r: TessMeshCallback | null;

  /**
   * Delete the tesselator and free resources
   */
  gluDeleteTess(): void;

  /**
   * Set a tesselator property
   * @param property - Property identifier
   * @param value - Property value
   */
  gluTessProperty(property: number, value: number | boolean): void;

  /**
   * Get a tesselator property value
   * @param property - Property identifier
   * @returns The property value
   */
  gluGetTessProperty(property: number): number | boolean;

  /**
   * Set the normal vector for the polygon
   * @param x - X component
   * @param y - Y component
   * @param z - Z component
   */
  gluTessNormal(x: number, y: number, z: number): void;

  /**
   * Set a callback function
   * @param callbackType - Type of callback
   * @param callback - Callback function or null
   */
  gluTessCallback(callbackType: number, callback: Function | null): void;

  /**
   * Add a vertex to the current contour
   * @param coords - Vertex coordinates [x, y, z]
   * @param data - User data associated with vertex
   */
  gluTessVertex(coords: [number, number, number], data: unknown): void;

  /**
   * Begin a new polygon
   * @param userData - User data to pass to callbacks
   */
  gluTessBeginPolygon(userData: unknown): void;

  /**
   * Begin a new contour in the current polygon
   */
  gluTessBeginContour(): void;

  /**
   * End the current contour
   */
  gluTessEndContour(): void;

  /**
   * End the current polygon and perform tesselation
   */
  gluTessEndPolygon(): void;
}

/**
 * Winding rule constants
 */
export declare const windingRule: {
  /** Odd winding rule */
  readonly GLU_TESS_WINDING_ODD: 100130;
  /** Non-zero winding rule */
  readonly GLU_TESS_WINDING_NONZERO: 100131;
  /** Positive winding rule */
  readonly GLU_TESS_WINDING_POSITIVE: 100132;
  /** Negative winding rule */
  readonly GLU_TESS_WINDING_NEGATIVE: 100133;
  /** Absolute value >= 2 winding rule */
  readonly GLU_TESS_WINDING_ABS_GEQ_TWO: 100134;
};

/**
 * Primitive type constants
 */
export declare const primitiveType: {
  /** Line loop primitive */
  readonly GL_LINE_LOOP: 2;
  /** Triangles primitive */
  readonly GL_TRIANGLES: 4;
  /** Triangle strip primitive */
  readonly GL_TRIANGLE_STRIP: 5;
  /** Triangle fan primitive */
  readonly GL_TRIANGLE_FAN: 6;
};

/**
 * Error type constants
 */
export declare const errorType: {
  /** Missing begin polygon call */
  readonly GLU_TESS_MISSING_BEGIN_POLYGON: 100151;
  /** Missing end polygon call */
  readonly GLU_TESS_MISSING_END_POLYGON: 100153;
  /** Missing begin contour call */
  readonly GLU_TESS_MISSING_BEGIN_CONTOUR: 100152;
  /** Missing end contour call */
  readonly GLU_TESS_MISSING_END_CONTOUR: 100154;
  /** Coordinate too large */
  readonly GLU_TESS_COORD_TOO_LARGE: 100155;
  /** Need combine callback */
  readonly GLU_TESS_NEED_COMBINE_CALLBACK: 100156;
};

/**
 * GLU enumeration constants
 */
export declare const gluEnum: {
  readonly GLU_TESS_MESH: 100112;
  readonly GLU_TESS_TOLERANCE: 100142;
  readonly GLU_TESS_WINDING_RULE: 100140;
  readonly GLU_TESS_BOUNDARY_ONLY: 100141;
  readonly GLU_INVALID_ENUM: 100900;
  readonly GLU_INVALID_VALUE: 100901;
  readonly GLU_TESS_BEGIN: 100100;
  readonly GLU_TESS_VERTEX: 100101;
  readonly GLU_TESS_END: 100102;
  readonly GLU_TESS_ERROR: 100103;
  readonly GLU_TESS_EDGE_FLAG: 100104;
  readonly GLU_TESS_COMBINE: 100105;
  readonly GLU_TESS_BEGIN_DATA: 100106;
  readonly GLU_TESS_VERTEX_DATA: 100107;
  readonly GLU_TESS_END_DATA: 100108;
  readonly GLU_TESS_ERROR_DATA: 100109;
  readonly GLU_TESS_EDGE_FLAG_DATA: 100110;
  readonly GLU_TESS_COMBINE_DATA: 100111;
};

export declare const libtess: {
  GluTesselator: typeof GluTesselator;
  windingRule: typeof windingRule;
  primitiveType: typeof primitiveType;
  errorType: typeof errorType;
  gluEnum: typeof gluEnum;
};