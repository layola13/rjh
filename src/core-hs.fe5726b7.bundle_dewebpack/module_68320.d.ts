/**
 * Geometry utility module for UV transformation and coordinate system calculation
 * Handles buffer geometry creation with UV mapping for walls, seams, and brick patterns
 */

/**
 * 2D point coordinates
 */
interface Point2D {
  X: number;
  Y: number;
}

/**
 * 2D coordinate pair
 */
interface Coordinate {
  x: number;
  y: number;
}

/**
 * Bounding box definition
 */
interface Bounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * UV direction description for seam mapping
 */
interface UVDirection {
  start: Coordinate;
  end: Coordinate;
}

/**
 * UV description for seam geometry
 */
interface UVDescription {
  uDirection: UVDirection;
  vDirection: UVDirection;
  uLength: number;
  vLength: number;
}

/**
 * Shape with outer boundary and holes for triangulation
 */
interface Shape {
  outer: Point2D[];
  holes: Point2D[][];
}

/**
 * Material properties affecting UV mapping
 */
interface Material {
  rotation?: number;
  alignType?: string;
}

/**
 * Paving/tiling options for UV layout
 */
interface PavingOption {
  point?: Coordinate;
  type?: string;
  rotation?: number;
  defaultOffsetX?: number;
  defaultOffsetY?: number;
}

/**
 * Geometry generation parameters
 */
interface GeometryParams {
  shapes: Shape[] & { isSeam?: boolean; uvDescription?: UVDescription };
  bound?: Bounds;
  matBound?: Bounds;
  pavingOption: PavingOption;
  material?: Material;
  isSeam?: boolean;
  isBrick?: boolean;
  uvDescription?: UVDescription;
}

/**
 * 2D coordinate system definition
 */
interface CoordinateSystem {
  /** Origin offset */
  offset: Coordinate;
  /** X-axis direction vector */
  xDirection: Coordinate;
  /** Y-axis direction vector */
  yDirection: Coordinate;
}

/**
 * Creates a buffer geometry from shape data with basic triangulation
 * 
 * @param shapes - Array of shapes with outer boundaries and holes
 * @param subdivisions - Optional subdivision parameter (default: 12)
 * @returns THREE.BufferGeometry with position, normal, uv, and index attributes
 */
export function getNewBufferGeometry(params: GeometryParams): THREE.BufferGeometry;

/**
 * Creates a buffer geometry with UV transformation applied for brick patterns
 * Applies rotation and offset transformations around a pivot point
 * 
 * @param params - Geometry parameters including shapes, bounds, paving options
 * @returns THREE.BufferGeometry with transformed UVs
 */
export function getNewBufferGeometryWithUvTransformForBrick(params: GeometryParams): THREE.BufferGeometry;

/**
 * Creates a buffer geometry with UV transformation applied
 * Handles both brick patterns and seam geometries with different UV mapping strategies
 * 
 * @param params - Geometry parameters including material, paving options, and UV description
 * @returns THREE.BufferGeometry with UV transform matrix applied
 */
export function getNewBufferGeometryWithUvTransform(params: GeometryParams): THREE.BufferGeometry & { uvTransform?: THREE.Matrix3 };

/**
 * Calculates a 2D coordinate system for UV mapping based on geometry parameters
 * Handles three cases:
 * - Brick patterns: rotation and offset around pivot point
 * - Seam geometry: UV directions from description
 * - Standard geometry: bounds-based coordinate system
 * 
 * @param params - Geometry parameters including bounds, material, and paving options
 * @returns CoordinateSystem defining the UV mapping space
 */
export function calcCoordinateSystem(params: GeometryParams): CoordinateSystem;