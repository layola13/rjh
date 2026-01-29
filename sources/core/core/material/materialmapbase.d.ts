/**
 * Material mapping and polygon processing type definitions
 * @module MaterialMapBase
 */

/**
 * 2D or 3D coordinate point
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * 3D material definition with texture and tiling properties
 */
export interface Material3D {
  /** Texture URI/path */
  textureURI: string;
  /** Normal map texture URI */
  normalTexture?: string;
  /** Material color */
  color?: string;
  /** Seam/grout width */
  seamWidth?: number;
  /** Seam/grout color */
  seamColor?: string;
  /** Tile size in X direction */
  tileSize_x: number;
  /** Tile size in Y direction */
  tileSize_y: number;
  /** UV offset in X direction */
  offsetX?: number;
  /** UV offset in Y direction */
  offsetY?: number;
  /** Rotation angle in degrees */
  rotation?: number;
  /** Optional hash key for caching */
  hashKey?: string;
  /** UV transformation matrix (computed) */
  uvTransform?: any; // THREE.Matrix3
}

/**
 * 2D material definition with simpler properties
 */
export interface Material2D extends Omit<Material3D, 'normalTexture' | 'seamColor'> {
  /** User-defined properties including grooving/chamfer hash */
  userDefined?: {
    groovingChamferHashCode?: string;
    [key: string]: any;
  };
}

/**
 * Generic material type (2D or 3D)
 */
export type Material = Material2D | Material3D;

/**
 * Base class for managing material collections and de-duplication
 */
export declare abstract class MaterialMapBase<T extends Material = Material> {
  /** Array of unique materials */
  materailList: T[];
  
  /** Map from material hash to index in materailList */
  protected mtlMeshDefMap: Map<string, number>;

  constructor();

  /**
   * Add a material to the collection or return existing index
   * @param material - Material definition to add
   * @returns Index of the material in materailList, or -1 if invalid
   */
  push(material: T | null): number;

  /**
   * Generate a unique string hash for a material
   * @param material - Material to hash
   * @returns Hash string representing material properties
   */
  protected abstract toString(material: T): string;
}

/**
 * Material map for 3D materials (includes normal maps and seam colors)
 */
export declare class MaterialMap3D extends MaterialMapBase<Material3D> {
  constructor();
  
  /**
   * Generate hash from 3D material properties
   * @param material - 3D material to hash
   * @returns Hash string: textureURI/normalTexture/color/seamWidth/seamColor/tileSize_x/tileSize_y/offsetX/offsetY/rotation
   */
  protected toString(material: Material3D): string;
}

/**
 * Material map for 2D materials (includes user-defined grooving data)
 */
export declare class MaterialMap2D extends MaterialMapBase<Material2D> {
  constructor();
  
  /**
   * Generate hash from 2D material properties
   * @param material - 2D material to hash
   * @returns Hash string: textureURI/groovingChamferHashCode/color/tileSize_x/tileSize_y/offsetX/offsetY/rotation
   */
  protected toString(material: Material2D): string;
}

/**
 * Polygon data with material assignments and coordinate systems
 */
export interface PaintData {
  /** Total number of polygon loops/boundaries */
  loopCount: number;
  /** Total number of polygon vertices */
  pointCount: number;
  /** Total number of polygon primitives */
  polyCount: number;
  /** WebAssembly pointer to key array */
  ptrKey: number;
  /** WebAssembly pointer to loop begin indices */
  ptrBegin: number;
  /** WebAssembly pointer to outer/inner loop flags */
  ptrIsOuter: number;
  /** WebAssembly pointer to polygon type array */
  ptrType: number;
  /** WebAssembly pointer to UV offset array */
  ptrOffset: number;
  /** WebAssembly pointer to vertex position array */
  ptrPos: number;
  /** WebAssembly pointer to coordinate system array */
  ptrCoord: number;
  /** Whether this is free-form polygon data */
  isFree?: boolean;
}

/**
 * Grid polygon modification data
 */
export interface ModifyPolygon {
  /** Grid key coordinate */
  key: Point2D;
  /** Local brick ID in pattern */
  brickLocalId: number;
  /** Material index */
  materialIndex: number;
}

/**
 * Free-form polygon data
 */
export interface FreePolygon {
  /** Polygon boundary path */
  path: Point2D[];
  /** Brick material index */
  brickMaterialIndex: number;
  /** Seam material index */
  seamMaterialIndex: number;
  /** Seam width */
  seamWidth: number;
  /** Rotation angle */
  rotation: number;
}

/**
 * Grid data containing modifications and free polygons
 */
export interface GridData {
  /** Modified grid polygons */
  modifyPolygons: ModifyPolygon[];
  /** Free-form polygons */
  freePolygons: FreePolygon[];
}

/**
 * Pattern block definition
 */
export interface PatternBlock {
  /** Material index for this block */
  materialIndex: number;
  /** Rotation angle for this block */
  rotation: number;
  /** Paint outline path */
  paintOutline: Point2D[];
}

/**
 * Tiling pattern definition
 */
export interface Pattern {
  /** Array of pattern blocks */
  blocks: PatternBlock[];
  /** Material index for seams/grout */
  seamMaterialIndex: number;
  /** Seam/grout width */
  seamWidth: number;
  /** UV direction vectors */
  uvDirections: [Point2D, Point2D];
}

/**
 * Paving/tiling options
 */
export interface PavingOption {
  /** Starting point for pattern */
  start: Point2D;
  /** Rotation angle in radians */
  rotation: number;
}

/**
 * Region to be tiled/paved
 */
export interface Region {
  /** Outer boundary (clockwise or counter-clockwise) */
  outer: Point2D[];
  /** Array of hole boundaries */
  holes: Point2D[][];
  /** Optional tiling pattern */
  pattern?: Pattern;
  /** Background material index (used when no pattern) */
  bgMaterialIndex?: number;
  /** Paving options */
  pavingOption: PavingOption;
  /** Grid modification data */
  grid: GridData;
}

/**
 * Result from polygon processing containing paint data
 */
export interface PolygonProcessResult {
  /** Ordinary/regular polygon data */
  ordinaryData: PaintData;
  /** Modified polygon data */
  modifyData: PaintData;
  /** Free-form polygon data */
  freeData: PaintData;
}

/**
 * Merged paint buffer data for mesh generation
 */
export interface MergedPaintBuffer {
  /** Flattened array of all vertex coordinates */
  allPoint: Float64Array;
  /** Array of polygon begin indices */
  polyBegin: Int32Array;
  /** Array of polygon IDs */
  polyId: Int32Array;
  /** Array of material indices per polygon */
  materialIndex: Int32Array;
  /** Array of offset indices */
  offsetIndex: Int32Array;
  /** Array of coordinate system indices */
  coordinateIndex: Int32Array;
  /** Flattened UV offset array */
  offset: Float64Array;
  /** Flattened coordinate system array (4 values per system) */
  coordinateSystem: Float64Array;
  /** Array of material objects */
  materialArray: Material[];
  /** Total point count */
  pointCount: number;
  /** Total polygon count */
  polyCount: number;
  /** Total offset count */
  offsetCount: number;
  /** Total material count */
  materialCount: number;
  /** Total coordinate system count */
  coordinateCount: number;
  /** Maximum ID value */
  maxId: number;
}

/**
 * Mesh generation result
 */
export interface MeshData {
  /** Material ID for this mesh */
  materialId: number;
  /** Material definition */
  material: Material;
  /** UV coordinates (flattened array) */
  uvs: Float32Array;
  /** Vertex positions (flattened array) */
  pos: Float32Array;
  /** Normal vectors (3D only, flattened array) */
  normal: Float32Array;
  /** Triangle indices */
  index: Uint32Array;
  /** Number of triangles */
  triCount: number;
  /** Number of position vertices */
  posCount: number;
  /** UV dimension (usually 2) */
  uvDim: number;
  /** Position dimension (2 or 3) */
  posDim: number;
  /** Bounding box top */
  top: number;
  /** Bounding box left */
  left: number;
  /** Bounding box width */
  width: number;
  /** Bounding box height */
  height: number;
  /** Data type (reserved) */
  dataType: any;
}

/**
 * Mesh generation success result
 */
export interface MeshResult {
  /** Whether mesh generation succeeded */
  success: boolean;
  /** Array of generated meshes */
  meshs: MeshData[];
}

/**
 * Extended paint buffer for merging multiple regions
 */
export declare class PaintBufferEx {
  /** Flattened vertex coordinates */
  allPoint: Float64Array;
  /** Polygon begin indices */
  polyBegin: Int32Array;
  /** Polygon IDs */
  polyId: Int32Array;
  /** Material indices per polygon */
  materialIndex: Int32Array;
  /** Offset indices */
  offsetIndex: Int32Array;
  /** Coordinate system indices */
  coordinateIndex: Int32Array;
  /** UV offsets */
  offset: Float64Array;
  /** Coordinate systems (4 values each) */
  coordinateSystem: Float64Array;
  
  /** Current point count */
  protected currPoint: number;
  /** Current polygon ID */
  protected currId: number;
  /** Current polygon count */
  protected currPoly: number;

  /**
   * Create a paint buffer
   * @param maxPoints - Maximum number of vertices
   * @param maxPolygons - Maximum number of polygons
   * @param maxLoops - Maximum number of loops/boundaries
   */
  constructor(maxPoints: number, maxPolygons: number, maxLoops: number);

  /**
   * Add paint data to the buffer
   * @param materialIndices - Material indices for ordinary polygons
   * @param seamMaterialIndices - Material indices for seam polygons
   * @param paintData - Paint data from polygon processing
   * @param mode - Material selection mode: 0=use materialIndices or first seamMaterial, 1=use key lookup, 2=use key or seamMaterial lookup
   */
  push(
    materialIndices: number[],
    seamMaterialIndices: number[],
    paintData: PaintData,
    mode: 0 | 1 | 2
  ): void;
}

/**
 * Main polygon processing and mesh generation tool
 */
export declare class PolygonTool {
  /**
   * Free WebAssembly memory pointer
   * @param ptr - Memory pointer to free
   */
  static free(ptr: number): void;

  /**
   * Free paint data WebAssembly pointers
   * @param paintData - Paint data to free
   */
  static freePaintData(paintData: PaintData): void;

  /**
   * Free multiple paint buffer results
   * @param results - Array of polygon process results
   */
  static freePaintBuffers(results: PolygonProcessResult[]): void;

  /**
   * Apply UV transformations to 2D mesh data
   * @param meshes - Array of mesh data
   * @returns Transformed mesh array
   */
  static uvTransform2D(meshes: MeshData[]): MeshData[];

  /**
   * Merge multiple paint buffers into a single buffer
   * @param results - Array of polygon process results
   * @param regions - Corresponding region definitions
   * @param materialMap - Material map containing all materials
   * @returns Merged paint buffer data
   */
  static mergePaintBuffer(
    results: PolygonProcessResult[],
    regions: Region[],
    materialMap: MaterialMapBase
  ): MergedPaintBuffer;

  /**
   * Create polygon data from region using WebAssembly
   * @param region - Region to process
   * @param is3D - Whether to generate 3D or 2D data
   * @returns Polygon process result
   */
  static createPolygonsByPatternWasm(
    region: Region,
    is3D?: boolean
  ): PolygonProcessResult;

  /**
   * Generate meshes from paint buffer and region
   * @param paintBuffer - Merged paint buffer
   * @param region - Region boundary
   * @param is3D - Whether to generate 3D meshes (with normals)
   * @returns Mesh generation result
   */
  static toMesh(
    paintBuffer: MergedPaintBuffer,
    region: Region,
    is3D?: boolean
  ): MeshResult;

  /**
   * Generate meshes (extended version, throws on error)
   * @param paintBuffer - Merged paint buffer
   * @param region - Region boundary
   * @param is3D - Whether to generate 3D meshes
   * @returns Array of mesh data, or undefined on error
   */
  static toMeshEx(
    paintBuffer: MergedPaintBuffer,
    region: Region,
    is3D?: boolean
  ): MeshData[] | undefined;

  /**
   * Apply UV transformation to coordinate array
   * @param uvs - UV coordinate array (in-place modification)
   * @param rotation - Rotation angle in degrees
   * @param offset - UV offset
   * @returns Transformed UV array
   */
  static uvTransform(
    uvs: Float32Array,
    rotation: number,
    offset: Point2D
  ): Float32Array;

  /**
   * Get UV transformation matrix
   * @param rotation - Rotation angle in degrees
   * @param offset - UV offset
   * @returns 3x3 transformation matrix
   */
  static getTransformMatrix(rotation: number, offset: Point2D): any; // THREE.Matrix3
}