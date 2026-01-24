/**
 * 2D Point coordinates
 */
interface Point2D {
  /** X coordinate (or 'a' in original code) */
  a: number;
  /** Y coordinate (or 'b' in original code) */
  b: number;
}

/**
 * 3D Point coordinates with vertex data
 */
interface Point3D {
  /** X coordinate */
  g: [number, number, number];
  /** Y coordinate in 2D projection */
  b: number;
  /** X coordinate in 2D projection */
  a: number;
  /** Vertex data index */
  h?: number;
}

/**
 * Half-edge vertex structure
 */
interface HalfEdgeVertex {
  /** Next edge */
  e: HalfEdgeVertex;
  /** Previous edge */
  c: HalfEdgeVertex;
  /** Vertex data */
  d: unknown;
  /** Face reference */
  f: EdgeFace;
  /** Vertex position */
  a: Point3D;
  /** User data */
  d: unknown;
}

/**
 * Edge face structure
 */
interface EdgeFace {
  /** Next face */
  b: EdgeFace;
  /** Previous face */
  d: EdgeFace;
  /** Edge reference */
  a: HalfEdgeVertex;
  /** Face winding number */
  f: number;
  /** Inside flag */
  c: boolean;
}

/**
 * Active region in sweep line algorithm
 */
interface ActiveRegion {
  /** Edge reference */
  a: HalfEdgeVertex;
  /** Priority queue node */
  e: PriorityQueueNode;
  /** Winding number */
  f: number;
  /** Dirty flag */
  d: boolean;
  /** Sentinel flag */
  c: boolean;
  /** Fixup flag */
  h: boolean;
  /** Boundary flag */
  b: boolean;
}

/**
 * Priority queue node
 */
interface PriorityQueueNode {
  /** Node data */
  b: unknown;
  /** Previous node */
  a: PriorityQueueNode;
  /** Next node */
  c: PriorityQueueNode;
}

/**
 * Winding rule enumeration
 */
declare enum WindingRule {
  /** Odd winding rule */
  GLU_TESS_WINDING_ODD = 100130,
  /** Non-zero winding rule */
  GLU_TESS_WINDING_NONZERO = 100131,
  /** Positive winding rule */
  GLU_TESS_WINDING_POSITIVE = 100132,
  /** Negative winding rule */
  GLU_TESS_WINDING_NEGATIVE = 100133,
  /** Absolute value >= 2 winding rule */
  GLU_TESS_WINDING_ABS_GEQ_TWO = 100134
}

/**
 * Primitive type enumeration
 */
declare enum PrimitiveType {
  GL_LINE_LOOP = 2,
  GL_TRIANGLES = 4,
  GL_TRIANGLE_STRIP = 5,
  GL_TRIANGLE_FAN = 6
}

/**
 * Error type enumeration
 */
declare enum ErrorType {
  GLU_TESS_MISSING_BEGIN_POLYGON = 100151,
  GLU_TESS_MISSING_END_POLYGON = 100153,
  GLU_TESS_MISSING_BEGIN_CONTOUR = 100152,
  GLU_TESS_MISSING_END_CONTOUR = 100154,
  GLU_TESS_COORD_TOO_LARGE = 100155,
  GLU_TESS_NEED_COMBINE_CALLBACK = 100156
}

/**
 * GLU enumeration values
 */
declare enum GluEnum {
  GLU_TESS_MESH = 100112,
  GLU_TESS_TOLERANCE = 100142,
  GLU_TESS_WINDING_RULE = 100140,
  GLU_TESS_BOUNDARY_ONLY = 100141,
  GLU_INVALID_ENUM = 100900,
  GLU_INVALID_VALUE = 100901,
  GLU_TESS_BEGIN = 100100,
  GLU_TESS_VERTEX = 100101,
  GLU_TESS_END = 100102,
  GLU_TESS_ERROR = 100103,
  GLU_TESS_EDGE_FLAG = 100104,
  GLU_TESS_COMBINE = 100105,
  GLU_TESS_BEGIN_DATA = 100106,
  GLU_TESS_VERTEX_DATA = 100107,
  GLU_TESS_END_DATA = 100108,
  GLU_TESS_ERROR_DATA = 100109,
  GLU_TESS_EDGE_FLAG_DATA = 100110,
  GLU_TESS_COMBINE_DATA = 100111
}

/**
 * Callback function types
 */
type TessBeginCallback = (primitiveType: PrimitiveType, userData?: unknown) => void;
type TessVertexCallback = (vertexData: unknown, userData?: unknown) => void;
type TessEndCallback = (userData?: unknown) => void;
type TessErrorCallback = (errorType: ErrorType, userData?: unknown) => void;
type TessEdgeFlagCallback = (flag: boolean, userData?: unknown) => void;
type TessCombineCallback = (
  coords: [number, number, number],
  vertexData: unknown[],
  weights: number[],
  userData?: unknown
) => unknown;

/**
 * GLU Tessellator main class
 * Performs polygon tessellation using sweep line algorithm
 */
declare class GluTesselator {
  /** Current tessellation state */
  d: number;
  /** Error callback */
  p: TessErrorCallback | null;
  /** Mesh data structure */
  b: unknown;
  /** Current vertex */
  q: unknown;
  /** Normal vector */
  j: [number, number, number];
  /** Winding rule */
  s: WindingRule;
  /** Needs combine callback flag */
  n: boolean;
  /** Combine callback */
  o: TessCombineCallback | null;
  /** Current edge */
  a: unknown;
  /** Event queue */
  e: unknown;
  /** Active regions */
  f: unknown;
  /** Boundary only flag */
  m: boolean;
  /** User data */
  c: unknown;
  /** Callback functions */
  r: unknown;
  i: TessEndCallback | null;
  k: TessVertexCallback | null;
  l: TessEdgeFlagCallback | null;
  h: TessBeginCallback | null;

  /**
   * Delete tessellator and free resources
   */
  gluDeleteTess(): void;

  /**
   * Set tessellation property
   * @param property - Property identifier
   * @param value - Property value
   */
  gluTessProperty(property: GluEnum, value: number | boolean): void;

  /**
   * Get tessellation property value
   * @param property - Property identifier
   * @returns Property value
   */
  gluGetTessProperty(property: GluEnum): number | boolean;

  /**
   * Set normal vector for tessellation plane
   * @param x - X component of normal
   * @param y - Y component of normal
   * @param z - Z component of normal
   */
  gluTessNormal(x: number, y: number, z: number): void;

  /**
   * Set callback function for tessellation events
   * @param callbackType - Callback type identifier
   * @param callback - Callback function or null
   */
  gluTessCallback(callbackType: GluEnum, callback: Function | null): void;

  /**
   * Add vertex to current contour
   * @param coords - Vertex coordinates [x, y, z]
   * @param data - User vertex data
   */
  gluTessVertex(coords: [number, number, number], data: unknown): void;

  /**
   * Begin polygon tessellation
   * @param userData - User data passed to callbacks
   */
  gluTessBeginPolygon(userData: unknown): void;

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

/**
 * Libtess library export
 */
export interface LibtessModule {
  GluTesselator: typeof GluTesselator;
  windingRule: typeof WindingRule;
  primitiveType: typeof PrimitiveType;
  errorType: typeof ErrorType;
  gluEnum: typeof GluEnum;
}

declare const libtess: LibtessModule;
export default libtess;