/**
 * FaceGeometry Module
 * Handles geometry generation and management for face entities in 3D models
 */

import { BaseObject } from './BaseObject';
import { SlabDataProvider } from './SlabDataProvider';
import * as HSCore from './HSCore';
import * as THREE from 'three';

/** Threshold for floating point comparisons */
const EPSILON = 1e-4;

/** Default Z-axis vector */
const Z_AXIS = new THREE.Vector3(0, 0, 1);

/** Unknown face type identifier */
const UNKNOWN_TYPE = 'unknown';

/**
 * 2D point interface
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 3D point interface
 */
interface Point3D extends Point2D {
  z: number;
}

/**
 * Polygon with holes
 */
interface PolygonWithHoles {
  outer: Point2D[];
  holes: Point2D[][];
}

/**
 * 3D polygon with holes
 */
interface Polygon3DWithHoles {
  outer: THREE.Vector3[];
  holes: THREE.Vector3[][];
}

/**
 * Path segment for curved surfaces
 */
interface PathSegment {
  path: THREE.Vector3[];
  planePath: THREE.Vector3[];
}

/**
 * Face information structure
 */
interface FaceInfo {
  outer: Point2D[];
  holes: Point2D[][];
  geometry?: Polygon3DWithHoles[];
  isRCP?: boolean;
  path?: THREE.Vector3[];
  planePath?: THREE.Vector3[];
  planeHoles?: THREE.Vector3[][];
  segments?: PathSegment[];
}

/**
 * Surface path definition
 */
interface SurfacePath {
  path: Point3D[];
  planePath: Point3D[];
  planeHoles?: Point3D[][];
  segments: PathSegment[];
  surface?: boolean;
  holes?: Point2D[][];
}

/**
 * Custom attributes for face rendering
 */
interface FaceCustomAttributes {
  roomType: string;
  type: string;
  parentId: string;
  roomArea?: number;
}

/**
 * Graphics object definition
 */
interface GraphicsObject {
  entityId: string;
  type: string;
  visible: boolean;
  mesh?: string;
  material?: unknown;
  outlines?: unknown;
  customAttrs?: Record<string, unknown>;
  graphicsPath?: string;
}

/**
 * Mesh definition for rendering
 */
interface MeshDef {
  meshKey: string;
  vertexNormals: number[];
  indices: number[];
  [key: string]: unknown;
}

/**
 * Graphics data output
 */
interface GraphicsData {
  objects: GraphicsObject[];
  meshDefs: MeshDef[];
}

/**
 * UV transform result
 */
interface UVTransformResult {
  meshDef: MeshDef;
  diffuseMapUvTransform?: THREE.Matrix3;
  normalMapUvTransform?: THREE.Matrix3;
}

/**
 * UV bounding box
 */
interface UVBox {
  min: Point2D;
  max: Point2D;
}

/**
 * Projection info for surface mapping
 */
interface ProjectionInfo {
  polygon: Point2D[];
  leftBottom: Point3D;
}

/**
 * Transformation info from geometry
 */
interface TransformInfo {
  outer?: Point2D[];
  matrix: THREE.Matrix4;
  bbound: {
    left: number;
    bottom: number;
    top: number;
  };
}

/**
 * Flip type for geometry orientation
 */
type FlipType = 'flipUp' | 'flipDown' | 'flipLeft' | 'flipRight' | typeof UNKNOWN_TYPE;

/**
 * Face geometry view model
 * Manages 3D geometry generation, UV mapping, and rendering data for architectural faces
 */
export declare class FaceGeometry extends BaseObject {
  /** Current face information */
  faceInfo: FaceInfo | null;

  /** Geometry data provider */
  private _provider: SlabDataProvider;

  /** Custom attributes for rendering */
  private _customAttrs: Record<string, unknown>;

  /** Custom RCP (Reverse Ceiling Plane) flag */
  private _customRCP?: boolean;

  /** Flag indicating geometry needs recalculation */
  private _geometryDirty: boolean;

  /** Local transformation matrix */
  private _matrixLocal?: THREE.Matrix4;

  /** World transformation matrix */
  private _matrixWorld?: THREE.Matrix4;

  /** Flag to update matrix on next render */
  private needUpdateMatrix: boolean;

  /** Cached preview data */
  private _previewData?: GraphicsData;

  /**
   * Creates a new FaceGeometry instance
   * @param entity - The face entity
   * @param context - Rendering context
   * @param parent - Parent view model
   * @param provider - Geometry data provider
   * @param customAttrs - Custom rendering attributes
   */
  constructor(
    entity: unknown,
    context: unknown,
    parent: unknown,
    provider: SlabDataProvider,
    customAttrs?: Record<string, unknown>
  );

  /**
   * Sets custom RCP flag
   */
  set customRCP(value: boolean | undefined);

  /**
   * Gets geometry dirty state
   */
  get geometryDirty(): boolean;

  /**
   * Sets geometry dirty state and clears cache if needed
   */
  set geometryDirty(value: boolean);

  /**
   * Gets the geometry data provider
   */
  get provider(): SlabDataProvider;

  /**
   * Initialize child view models
   */
  onInit(): void;

  /**
   * Handle entity dirty event
   * @param entity - The changed entity
   */
  onEntityDirty(entity: unknown): void;

  /**
   * Check if this face should be rendered as RCP
   * @returns True if face is RCP
   */
  isRcpFace(): boolean;

  /**
   * Update face geometry information
   * @param context - Update context
   */
  private _updateFaceInfo(context: unknown): void;

  /**
   * Update planar face information
   * @param path - Face path points
   * @param isRCP - Whether face is RCP
   */
  private _updatePlaneFaceInfo(path: SurfacePath, isRCP?: boolean): void;

  /**
   * Update curved surface face information
   * @param surface - Surface path data
   */
  private _updateSurFaceInfo(surface: SurfacePath): void;

  /**
   * Get transformation matrix from geometry to XY plane
   * @param path - 3D path points
   * @param offset - Translation offset
   * @param rotation - Rotation matrix
   * @returns Transformation matrix
   */
  private _getTransform(
    bounds: { width: number; height: number },
    offset: Point3D,
    rotation: THREE.Matrix4
  ): THREE.Matrix4;

  /**
   * Extract transformation info from geometry path
   * @param path - Geometry path
   * @returns Transformation information
   */
  private _getTransInfoFromGeom(path: Point3D[]): TransformInfo;

  /**
   * Project 3D polygon onto 2D plane
   * @param points - 3D points
   * @param reference - Reference point
   * @returns Projected polygon info
   */
  private _getProjectPolygonInfo(points: Point3D[], reference: Point3D): ProjectionInfo;

  /**
   * Project single 3D point onto 2D plane
   * @param point - 3D point
   * @param info - Projection info
   * @returns 2D projected point
   */
  private _getProjectPoint(point: Point3D, info: ProjectionInfo): Point2D;

  /**
   * Determine flip type for edge alignment
   * @param plane - Plane identifier ('xy' or 'yz')
   * @param points - Path points
   * @param projInfo - Projection info
   * @param edgeIndices - Edge vertex indices
   * @returns Flip type
   */
  private _getFlipType(
    plane: string,
    points: Point3D[],
    projInfo: ProjectionInfo,
    edgeIndices: number[]
  ): FlipType;

  /**
   * Find point index in array
   * @param point - Point to find
   * @param points - Point array
   * @returns Index or -1 if not found
   */
  private _getPointIndex(point: Point3D, points: Point3D[]): number;

  /**
   * Check if point is inside hole profile
   * @param point - Point to test
   * @param projInfo - Projection info
   * @param path - Original path
   * @returns True if point is in hole
   */
  private _isPointInHoleProfile(point: Point3D, projInfo: ProjectionInfo, path: Point3D[]): boolean;

  /**
   * Get matrix to transform geometry to local space
   * @param path - Geometry path
   * @returns Transformation matrix
   */
  getMatrixToLocal(path?: Point3D[]): THREE.Matrix4 | undefined;

  /**
   * Get X-axis for opening host face
   * @param path - Face path
   * @returns X-axis vector
   */
  getOpenginHostFaceXAxis(path?: Point3D[]): THREE.Vector3 | undefined;

  /**
   * Get custom attributes for wall face
   * @param params - Room and parent info
   * @returns Custom attributes
   */
  private _getWallFaceCustomAttrs(params: {
    inRoom: boolean;
    roomType: string;
    parent: unknown;
    roomArea?: number;
  }): Partial<FaceCustomAttributes>;

  /**
   * Check if face is the lowest face of a slab
   * @param slab - Slab entity
   * @param faceId - Face ID
   * @returns True if lowest face
   */
  private _isLowestFace(slab: unknown, faceId: string): boolean;

  /**
   * Check if face is the highest face of a slab
   * @param slab - Slab entity
   * @param faceId - Face ID
   * @returns True if highest face
   */
  private _isHighestFace(slab: unknown, faceId: string): boolean;

  /**
   * Get custom attributes for slab face
   * @param params - Room and parent info
   * @returns Custom attributes
   */
  private _getSlabFaceCustomAttrs(params: {
    inRoom: boolean;
    roomType: string;
    parent: unknown;
    roomArea?: number;
    entityId: string;
  }): Partial<FaceCustomAttributes>;

  /**
   * Get custom attributes for opening (door/window/hole) face
   * @param params - Room and parent info
   * @returns Custom attributes
   */
  private _getOpeningFaceCustomAttrs(params: {
    inRoom: boolean;
    roomType: string;
    parent: unknown;
    roomArea?: number;
  }): Partial<FaceCustomAttributes>;

  /**
   * Get face custom attributes based on parent type
   * @returns Custom attributes
   */
  private _getFaceCustomAttrs(): FaceCustomAttributes;

  /**
   * Update room-related custom attributes
   * @returns Updated custom attributes
   */
  updateRoomCustomAttrs(): FaceCustomAttributes;

  /**
   * Get face data for rendering
   * @returns Face rendering data
   */
  private _getFaceData(): {
    isNewFGI: boolean;
    bg: PolygonWithHoles;
    isNewMixPaint: boolean;
    bottomFaceGeometries: Point2D[][] | null;
    transform: unknown;
  };

  /**
   * Convert geometry to graphics data asynchronously
   * @param context - Conversion context
   * @returns Graphics data promise
   */
  toGraphicsDataAsync(context: unknown): Promise<GraphicsData>;

  /**
   * Convert mesh data to graphics objects
   * @param baseObject - Base graphics object
   * @param meshes - Mesh array
   * @param keyPrefix - Mesh key prefix
   * @param startIndex - Starting index
   * @param customAttrs - Custom attributes
   * @returns Graphics data
   */
  meshToGraphicDatas(
    baseObject: GraphicsObject,
    meshes: unknown[],
    keyPrefix: string,
    startIndex: number,
    customAttrs: Record<string, unknown>
  ): GraphicsData;

  /**
   * Convert geometry to graphics data synchronously
   * @returns Graphics data
   */
  toGraphicsData(): GraphicsData;

  /**
   * Generate preview graphics data
   * @returns Preview graphics data
   */
  toPreviewData(): GraphicsData;

  /**
   * Get new material (unwrap mix paint materials)
   * @param material - Original material
   * @returns Base material
   */
  private _getNewMaterial(material: unknown): unknown;

  /**
   * Calculate UV bounding box
   * @param uvArray - UV coordinate array
   * @returns UV box
   */
  private _getUVbox(uvArray: number[]): UVBox;

  /**
   * Reverse mesh definition for RCP rendering
   * @param meshDef - Mesh definition to reverse
   */
  private _reverseMeshDefByRCP(meshDef: MeshDef): void;

  /**
   * Apply material UV transform
   * @param uvArray - UV coordinates
   * @param material - Material
   * @param transform - UV transform matrix
   * @param dataType - Data type
   * @returns Transformed UV array
   */
  private _applyMaterialToUV(
    uvArray: number[],
    material: unknown,
    transform: THREE.Matrix3,
    dataType?: unknown
  ): number[];

  /**
   * Get mesh definition with UV transform applied
   * @param meshDef - Original mesh definition
   * @param material - Material
   * @param dataType - Data type
   * @returns Transformed mesh with UV transforms
   */
  private _getFgiMeshDefWithUvTransform(
    meshDef: MeshDef,
    material: unknown,
    dataType?: unknown
  ): UVTransformResult;

  /**
   * Update world transformation matrix
   * @param force - Force update flag
   */
  updateWorldMatrix(force?: boolean): void;

  /**
   * Get paths of bottom faces for holes
   * @returns Array of bottom face paths
   */
  getBottomFacePaths(): Point3D[][];

  /**
   * Get hole entities with bottom faces
   * @returns Array of hole entities
   */
  getBottomFaceHoles(): unknown[];

  /**
   * Get host face if this is a bottom face of an opening
   * @returns Host face or undefined
   */
  getHostFaceOfBottomFace(): unknown | undefined;

  /**
   * Get bottom face geometries for openings
   * @returns Array of bottom face polygons
   */
  getBottomFaceGeometries(): Point2D[][] | null;

  /**
   * Update geometry on entity update
   * @param context - Update context
   */
  onUpdate(context: unknown): void;

  /**
   * Update geometry on position change
   * @param context - Update context
   */
  onUpdatePosition(context: unknown): void;

  /**
   * Cleanup resources
   */
  onCleanup(): void;
}

/**
 * Check if face info contains surface segments
 * @param faceInfo - Face information
 * @returns True if face has segments
 */
declare function isSurfaceFace(faceInfo: FaceInfo | null): boolean;

/**
 * Clip polygon with holes
 * @param polygon - Polygon with holes
 * @param transform - Transform matrix
 * @returns Clipped polygon array
 */
declare function clipPolygon(
  polygon: PolygonWithHoles,
  transform: THREE.Matrix4
): Polygon3DWithHoles[];