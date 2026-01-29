import { BaseObject } from './base-object';
import { MixPaveIntegration } from './mix-pave-integration';
import { Util } from './util';
import { IDataProvider } from './data-provider';
import { TgWallUtil } from './tg-wall-util';
import { Line2d } from './line2d';
import { MaterialUtil } from './material-util';
import { ServiceManager } from './service-manager';
import { NCustomizedStructure } from './n-customized-structure';
import { Opening } from './opening';
import { FaceUtil } from './face-util';
import { Wall } from './wall';
import { Logger } from './logger';

/**
 * Face custom attributes for room type, area and parent information
 */
interface FaceCustomAttrs {
  /** Room type identifier, format: "type-id" or "none" */
  roomType: string;
  /** Face type classification (e.g., WallInner, Floor, Ceiling) */
  type: string;
  /** Parent entity ID */
  parentId: string;
  /** Room area in square units */
  roomArea?: number;
}

/**
 * Parameters for getting wall face custom attributes
 */
interface WallFaceCustomAttrsParams {
  /** Whether the face is inside a room */
  inRoom: boolean;
  /** Room type identifier */
  roomType: string;
  /** Parent wall entity */
  parent: any;
  /** Room area */
  roomArea?: number;
}

/**
 * Parameters for getting slab face custom attributes
 */
interface SlabFaceCustomAttrsParams {
  /** Whether the face is inside a room */
  inRoom: boolean;
  /** Room type identifier */
  roomType: string;
  /** Parent slab entity */
  parent: any;
  /** Room area */
  roomArea?: number;
  /** Entity ID */
  entityId: string;
}

/**
 * Parameters for getting opening face custom attributes
 */
interface OpeningFaceCustomAttrsParams {
  /** Whether the face is inside a room */
  inRoom: boolean;
  /** Room type identifier */
  roomType: string;
  /** Parent opening entity */
  parent: any;
  /** Room area */
  roomArea?: number;
}

/**
 * Face information containing RCP status and geometry
 */
interface FaceInfo {
  /** Whether this face uses reverse construction point */
  isRCP: boolean;
  /** Outer boundary curve */
  outer: any;
  /** Array of hole curves */
  holes: any[];
}

/**
 * Graphics data result containing objects and mesh definitions
 */
interface GraphicsDataResult {
  /** Array of graphics objects */
  objects: GraphicsObject[];
  /** Array of mesh definitions */
  meshDefs: MeshDef[];
}

/**
 * Graphics object definition
 */
interface GraphicsObject {
  /** Entity ID */
  entityId: string;
  /** Graphics object type */
  type: string;
  /** Visibility flag */
  visible: boolean;
  /** Mesh key reference */
  mesh?: string;
  /** Material object */
  material?: any;
  /** Outline data */
  outlines?: any;
  /** Custom attributes */
  customAttrs?: Record<string, any>;
  /** Graphics path identifier */
  graphicsPath?: string;
}

/**
 * Mesh definition structure
 */
interface MeshDef {
  /** Unique mesh key identifier */
  meshKey?: string;
  /** Vertex normal vectors */
  vertexNormals: number[];
  /** Triangle indices */
  indices: number[];
}

/**
 * UV transform result for materials
 */
interface UvTransformResult {
  /** Mesh definition */
  meshDef: any;
  /** Diffuse map UV transformation matrix */
  diffuseMapUvTransform: THREE.Matrix3;
  /** Normal map UV transformation matrix */
  normalMapUvTransform: THREE.Matrix3;
}

/**
 * TgFaceGeometry manages the geometric representation and rendering data
 * for building faces (walls, slabs, ceilings, etc.)
 */
declare class TgFaceGeometry extends BaseObject {
  private _provider: IDataProvider | null;
  private _customAttrs: Record<string, any>;
  private _geometryDirty: boolean;
  private _previewData: any;
  private _graphicsCache?: Map<string, any>;

  /**
   * Creates a new TgFaceGeometry instance
   * @param entity - The entity this geometry belongs to
   * @param context - Execution context
   * @param options - Additional options
   * @param customAttrs - Custom attributes to attach to this geometry
   */
  constructor(
    entity: any,
    context: any,
    options: any,
    customAttrs?: Record<string, any>
  );

  /**
   * Data provider for this geometry
   */
  get provider(): IDataProvider;

  /**
   * Whether the geometry data needs to be regenerated
   */
  get geometryDirty(): boolean;
  set geometryDirty(value: boolean);

  /**
   * Wall geometry service manager
   */
  private get _geometryMgr(): any;

  /**
   * Initialize and create view models for child entities
   */
  onInit(): void;

  /**
   * Handle entity dirty events (e.g., when clip holes change)
   * @param event - Dirty event data
   */
  onEntityDirty(event: any): void;

  /**
   * Update face geometry information
   * @param delta - Time delta since last update
   */
  onUpdate(delta: number): void;

  /**
   * Update position-related geometry information
   * @param delta - Time delta since last update
   */
  onUpdatePosition(delta: number): void;

  /**
   * Internal method to update face information
   * @param delta - Time delta
   */
  private _updateFaceInfo(delta: number): void;

  /**
   * Get FGI mesh definition with UV transformations applied
   * @param meshDef - Original mesh definition
   * @param material - Material to apply
   * @param dataType - Data type identifier
   * @returns Mesh definition with UV transforms
   */
  private _getFgiMeshDefWithUvTransform(
    meshDef: any,
    material: any,
    dataType: any
  ): UvTransformResult;

  /**
   * Check if high-resolution geometry data needs to be generated
   * @returns True if high-res data is needed
   */
  needGenerateHighResolutionData(): boolean;

  /**
   * Convert face geometry to graphics data for rendering
   * @param useHighResolution - Whether to generate high-resolution data
   * @returns Graphics objects and mesh definitions
   */
  toGraphicsData(useHighResolution?: boolean): GraphicsDataResult;

  /**
   * Convert meshes to graphics data objects
   * @param baseObject - Base graphics object properties
   * @param meshes - Array of mesh data
   * @param baseKey - Base key for mesh identification
   * @param startIndex - Starting index for mesh keys
   * @returns Graphics data result
   */
  meshToGraphicDatas(
    baseObject: Partial<GraphicsObject>,
    meshes: any[],
    baseKey: string,
    startIndex: number
  ): GraphicsDataResult;

  /**
   * Reverse mesh definition normals and indices for RCP (Reverse Construction Point) faces
   * @param meshDef - Mesh definition to reverse
   */
  private _reverseMeshDefByRCP(meshDef: MeshDef): void;

  /**
   * Cleanup resources when geometry is destroyed
   */
  onCleanup(): void;

  /**
   * Get face information including RCP status and geometry
   */
  get faceInfo(): FaceInfo;

  /**
   * Get transformation matrix from world to local coordinates
   * @param entity - Entity to get transform for
   * @returns Transformation matrix
   */
  getMatrixToLocal(entity: any): THREE.Matrix4;

  /**
   * Get the model transformation matrix
   * @returns Model matrix
   */
  getModelMatrix(): THREE.Matrix4;

  /**
   * Get the transformation matrix for this geometry
   */
  get matrix(): THREE.Matrix4;

  /**
   * Update and return custom attributes related to room information
   * @returns Face custom attributes
   */
  updateRoomCustomAttrs(): FaceCustomAttrs;

  /**
   * Internal method to get face custom attributes
   * @returns Face custom attributes
   */
  private _getFaceCustomAttrs(): FaceCustomAttrs;

  /**
   * Get custom attributes for wall faces
   * @param params - Wall face parameters
   * @returns Custom attributes with room type and face type
   */
  private _getWallFaceCustomAttrs(params: WallFaceCustomAttrsParams): {
    roomType: string;
    type: string;
    roomArea?: number;
  };

  /**
   * Get custom attributes for slab faces
   * @param params - Slab face parameters
   * @returns Custom attributes with room type and face type
   */
  private _getSlabFaceCustomAttrs(params: SlabFaceCustomAttrsParams): {
    roomType: string;
    type: string;
    roomArea: number;
  };

  /**
   * Get custom attributes for opening faces (doors, windows, holes)
   * @param params - Opening face parameters
   * @returns Custom attributes with room type and opening type
   */
  private _getOpeningFaceCustomAttrs(params: OpeningFaceCustomAttrsParams): {
    roomType: string;
    type: string;
    roomArea?: number;
  };

  /**
   * Check if this is the lowest face of a slab
   * @param slab - Slab entity
   * @param faceId - Face ID to check
   * @returns True if this is the lowest face
   */
  private _isLowestFace(slab: any, faceId: string): boolean;

  /**
   * Check if this is the highest face of a slab
   * @param slab - Slab entity
   * @param faceId - Face ID to check
   * @returns True if this is the highest face
   */
  private _isHighestFace(slab: any, faceId: string): boolean;

  /**
   * Discretize a 2D curve into line segments based on discrete points
   * @param curve - Input curve to discretize
   * @param discretePoints - Points to use for discretization
   * @returns Array of line segments
   */
  private _getCurve2d(curve: any, discretePoints: any[]): Line2d[];
}

export { TgFaceGeometry };