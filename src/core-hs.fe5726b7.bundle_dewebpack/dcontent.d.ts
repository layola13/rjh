import type { Vector3, Matrix4 } from 'three';
import type { Coordinate3, Vector3 as GeVector3, Matrix4 as GeMatrix4, Plane } from 'GeLib';

/**
 * Mesh definition for clipping operations
 */
export interface ClipMeshDef {
  /** Unique identifier for the mesh */
  meshKey: string;
  /** Optional clipping information */
  clipInfo?: {
    /** Whether to fill the clipped area */
    fillClip: boolean;
    /** Coordinate system for the clip */
    coordinate: Coordinate3;
  };
}

/**
 * Graphics object representation
 */
export interface GraphicsObject {
  /** Array of clip mesh keys */
  clipMeshes?: string[];
  [key: string]: unknown;
}

/**
 * Graphics data containing objects and mesh definitions
 */
export interface GraphicsData {
  /** Array of graphics objects */
  objects: GraphicsObject[];
  /** Array of mesh definitions */
  meshDefs: ClipMeshDef[];
}

/**
 * Bounding box information
 */
export interface BoundingBox {
  /** Minimum vertex of the bounding box */
  min_vertex: Vector3;
  /** Maximum vertex of the bounding box */
  max_vertex: Vector3;
}

/**
 * Object info from metadata extension
 */
export interface ObjectInfo {
  /** Array of bounding boxes */
  bounding?: BoundingBox[];
}

/**
 * Metadata extension data
 */
export interface MetadataExtension {
  /** Object information */
  objInfo?: ObjectInfo;
}

/**
 * Entity metadata
 */
export interface EntityMetadata {
  /** Extension data */
  extension?: MetadataExtension;
}

/**
 * Layout information for content positioning
 */
export interface LayoutInfo {
  /** Local X direction vector */
  localXDirection?: Vector3;
  /** Global X direction vector */
  xDirection?: Vector3;
  /** Start cut polygons */
  startCutPolygons?: Vector3[];
  /** End cut polygons */
  endCutPolygons?: Vector3[];
}

/**
 * Cut plane definition
 */
export interface ModelCutPlane {
  /** Get X direction vector */
  getDx(): Vector3;
  /** Get Y direction vector */
  getDy(): Vector3;
  /** Get Z direction vector */
  getDz(): Vector3;
  /** Get origin point */
  getOrigin(): Vector3;
}

/**
 * Scale vector
 */
export interface ScaleVector {
  x: number;
  y: number;
  z: number;
}

/**
 * Size dimensions
 */
export interface SizeVector {
  x: number;
  y: number;
  z: number;
}

/**
 * Skeleton information for content
 */
export interface SkeletonInfo {
  /** Extra scale factor in X direction */
  extraXScale: number;
}

/**
 * UV transform information
 */
export interface UvTransformData {
  /** Tile size in X direction */
  tileSize_x?: number;
  /** Tile size in Y direction */
  tileSize_y?: number;
  /** Texture rotation in degrees */
  textureRotation?: number;
  /** Rotation in radians */
  rotation?: number;
  /** Override values */
  override?: {
    tileSize_x: number;
    tileSize_y: number;
  };
}

/**
 * Material data with UV transform
 */
export interface MaterialData {
  /** Tile size in X direction (in units) */
  tileSize_x: number;
  /** Tile size in Y direction (in units) */
  tileSize_y: number;
  /** Diffuse map UV transform */
  diffuseMapUvTransform: {
    /** Set UV transformation parameters */
    setUvTransform(
      offsetX: number,
      offsetY: number,
      repeatX: number,
      repeatY: number,
      rotation: number,
      centerX: number,
      centerY: number
    ): void;
  };
}

/**
 * Content entity interface from HSCore.Model
 */
export interface DContentEntity {
  /** Whether clipping is needed */
  needClip: boolean;
  /** X dimension length */
  XLength: number;
  /** Y dimension length */
  YLength: number;
  /** Z dimension length */
  ZLength: number;
  /** Texture paving type */
  textureType: number;
  /** Entity metadata */
  metadata?: EntityMetadata;
  /** Layout information */
  layoutInfo?: LayoutInfo;
  /** Model cut planes */
  modelCutPlanes?: ModelCutPlane[];
  /** Pose data */
  poseData?: unknown;
  /** Parent entity */
  parent?: DContentEntity;
  
  /** Iterate over child entities */
  forEachChild?(callback: (child: DContentEntity) => void, context: unknown): void;
  /** Check if entity flag is on */
  isFlagOn(flag: number): boolean;
  /** Get local transformation matrix */
  getLocalMatrix(excludePose: boolean): Matrix4;
  /** Get parent entities in hierarchy path */
  getParentsInPath(): DContentEntity[];
  /** Get real scale values */
  getRealScale?(): ScaleVector;
  /** Get original size */
  getOriginSize(): SizeVector;
  /** Get skeleton information */
  getInfoForSkeleton?(): SkeletonInfo | undefined;
}

/**
 * Content clipper utility
 */
export interface ContentClipper {
  /** Convert cut planes to mesh definitions */
  cutPlanesToMeshDefs(planes: Vector3[][], offset: Vector3): ClipMeshDef[];
}

/**
 * Coordinate information for clipping
 */
export interface CoordinateInfo {
  /** Coordinate origin */
  coordOrigin: GeVector3;
  /** Coordinate normal vector */
  coordNormal: GeVector3;
}

/**
 * Content graphics data context
 */
export interface ContentGraphicsContext {
  /** Bounding box */
  bounding: BoundingBox;
  /** Optional host entity */
  host?: unknown;
}

/**
 * DContent view model extending base Content class
 * Handles 3D content rendering, clipping, and material management
 */
export declare class DContent extends Content {
  /** Whether this content needs clipping */
  protected needClip: boolean;
  
  /** Content clipper instance for geometry clipping operations */
  protected clipper?: ContentClipper;
  
  /** Local transformation matrix */
  protected _matrixLocal: Matrix4;
  
  /** World transformation matrix */
  protected _matrixWorld: Matrix4;
  
  /** Flag indicating if matrix update is needed */
  protected needUpdateMatrix: boolean;

  /**
   * Creates a new DContent instance
   * @param entity - The content entity data
   * @param parent - Parent view model
   * @param context - Creation context
   */
  constructor(entity: DContentEntity, parent: unknown, context: unknown);

  /**
   * Gets the underlying DContent entity
   */
  get dcontent(): DContentEntity;

  /**
   * Converts content to graphics data for rendering
   * @returns Graphics data with objects and mesh definitions, or null if hidden/removed
   */
  toGraphicsData(): GraphicsData | null;

  /**
   * Resizes material based on entity dimensions and texture type
   * @param materialData - Material data to resize
   * @returns Updated material data
   */
  resizeMaterial(materialData: MaterialData): MaterialData;

  /**
   * Updates the local transformation matrix position
   */
  onUpdatePosition(): void;

  /**
   * Updates the world transformation matrix
   * @param force - Force update even if not marked as needed
   */
  updateWorldMatrix(force: boolean): void;

  /**
   * Handles content graphics data generation with clipping
   * @param entity - Content entity
   * @param context - Graphics context with bounding and host info
   * @returns Graphics data or null if invalid
   */
  protected handleContentGraphicsData(
    entity: DContentEntity,
    context: ContentGraphicsContext
  ): GraphicsData | null;

  /**
   * Gets Z-up coordinate origin and normal from polygon
   * @param polygon - Array of 3D points defining the polygon
   * @returns Coordinate info or undefined
   */
  protected _getZupOriginAndNormal(polygon: Vector3[]): CoordinateInfo | undefined;

  /**
   * Creates cut planes for content clipping
   * @param entity - Content entity
   * @param transformMatrix - Global transformation matrix
   * @param scale - Scale vector
   * @returns Array of cut plane polygons (start and end)
   */
  protected _createCutPlanes(
    entity: DContentEntity,
    transformMatrix: Matrix4,
    scale: ScaleVector
  ): (Vector3[] | undefined)[];

  /**
   * Creates UV transformation for texture mapping
   * @param uvData - UV transform data
   * @returns Material data with UV transform or null
   */
  protected _createUvTransform(uvData: UvTransformData): MaterialData | null;

  /**
   * Updates room custom attributes
   * @returns Room information
   */
  updateRoomCustomAttrs(): unknown;

  /**
   * Gets content material data
   * @param entity - Content entity
   * @param metadata - Entity metadata
   * @param bounding - Bounding box
   * @param host - Optional host entity
   * @returns Graphics data or null
   */
  protected _getContentMaterialData(
    entity: DContentEntity,
    metadata: EntityMetadata,
    bounding: BoundingBox,
    host?: unknown
  ): GraphicsData | null;

  /**
   * Gets room information from root entity
   * @param rootEntity - Root entity in hierarchy
   * @returns Room information
   */
  protected _getRoomInfo(rootEntity: DContentEntity): unknown;
}