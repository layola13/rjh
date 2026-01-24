import type { BaseObject } from './BaseObject';
import type { IDataProvider } from './IDataProvider';
import type { Entity } from './Entity';
import type { Material } from './Material';
import type { Surface } from './Surface';
import type { Curve2d, Line2d, Path2d, Vector2, Vector3 } from './Geometry';
import type { Layer } from './Layer';
import type { Opening, ParametricDoor, DOpening, ParametricOpening, Hole, Door, Window } from './Opening';
import type { Wall, Slab, Floor, Ceiling } from './Structure';
import type { NCustomizedStructure } from './CustomizedStructure';
import type { MeshDef, MaterialObject, GraphicsObject } from './Graphics';

/**
 * Face surface object containing surface information and direction
 */
export interface FaceSurfaceObject {
  /** The underlying geometric surface */
  surface: Surface;
  /** Whether the face normal direction matches the surface normal */
  sameDirWithSurface: boolean;
  /** Convert 3D point to 2D surface parameter space */
  getVector2(point: Vector3): Vector2;
  /** Discretize meshes with given parameters */
  discreteMeshs(
    mesh: any,
    discreteOptions: { count?: number; points?: Vector3[][] },
    transform?: THREE.Matrix3
  ): Array<{
    meshDef: MeshDef;
    material: any;
    dataType?: string;
    outlines?: any;
    customAttrs?: Record<string, any>;
  }>;
}

/**
 * Raw 2D geometry data for a face
 */
export interface RawGeometry2d {
  /** Outer boundary curve */
  outer: Curve2d;
  /** Array of hole curves */
  holes?: Curve2d[];
}

/**
 * Face geometry information structure
 */
export interface FaceInfo {
  /** Whether this face belongs to an RCP (Reflected Ceiling Plan) */
  isRCP: boolean;
  /** Outer boundary curve */
  outer: Curve2d;
  /** Optional array of hole curves */
  holes?: Curve2d[];
}

/**
 * Room information associated with a face
 */
export interface RoomInfo {
  /** The floor entity containing room metadata */
  floor?: Floor & {
    roomType?: string;
    id: string;
  };
}

/**
 * Custom attributes for face graphics rendering
 */
export interface FaceCustomAttributes {
  /** Room type identifier (e.g., "bedroom-123" or "none") */
  roomType: string;
  /** Face type classification (e.g., "WallInner", "Floor", "Ceiling") */
  type: string;
  /** Parent entity ID */
  parentId: string;
  /** Room floor area in square units */
  roomArea?: number;
}

/**
 * Result of converting mesh to graphics data
 */
export interface GraphicsDataResult {
  /** Array of graphics objects for rendering */
  objects: GraphicsObject[];
  /** Array of mesh definitions */
  meshDefs: MeshDef[];
}

/**
 * UV transform result for material textures
 */
export interface UvTransformResult {
  /** Mesh definition */
  meshDef: MeshDef;
  /** UV transform matrix for diffuse texture */
  diffuseMapUvTransform: THREE.Matrix3;
  /** UV transform matrix for normal map */
  normalMapUvTransform: THREE.Matrix3;
}

/**
 * TgFaceGeometry - Handles geometry generation and graphics conversion for face entities.
 * Manages face mesh generation, material mapping, UV transforms, and room attribute assignment.
 */
export declare class TgFaceGeometry extends BaseObject {
  /** Data provider for face geometry */
  private _provider: IDataProvider | null;
  
  /** Custom rendering attributes */
  private readonly _customAttrs: Record<string, any>;
  
  /** Flag indicating geometry needs regeneration */
  private _geometryDirty: boolean;
  
  /** Cached preview data */
  private _previewData: any;
  
  /** Cache for generated graphics data keyed by hole configuration */
  private _graphicsCache?: Map<string, any[]>;

  /**
   * Creates a new TgFaceGeometry instance
   * @param entity - The face entity
   * @param context - Execution context
   * @param options - Initialization options
   * @param customAttrs - Custom attributes for rendering
   */
  constructor(
    entity: Entity,
    context: any,
    options: any,
    customAttrs?: Record<string, any>
  );

  /**
   * Gets or initializes the data provider
   */
  get provider(): IDataProvider;

  /**
   * Gets the geometry dirty flag
   */
  get geometryDirty(): boolean;

  /**
   * Sets the geometry dirty flag and clears cached geometry info
   */
  set geometryDirty(value: boolean);

  /**
   * Gets the wall geometry service from context
   */
  private get _geometryMgr(): any;

  /**
   * Initializes child entity view models
   */
  onInit(): void;

  /**
   * Handles entity dirty events, clearing graphics cache when clip holes change
   */
  onEntityDirty(event: { data?: { options?: { clipHolesChanged?: boolean } } }): void;

  /**
   * Updates face information on entity update
   */
  onUpdate(event: any): void;

  /**
   * Updates face information when position changes
   */
  onUpdatePosition(event: any): void;

  /**
   * Internal method to update face information and reset preview data
   */
  private _updateFaceInfo(event: any): void;

  /**
   * Applies UV transforms to mesh definition based on material settings
   * @param meshDef - Source mesh definition
   * @param material - Material with UV transform
   * @param dataType - Data type for UV calculation
   * @returns Mesh definition with applied UV transforms
   */
  private _getFgiMeshDefWithUvTransform(
    meshDef: MeshDef,
    material: Material,
    dataType: string
  ): UvTransformResult;

  /**
   * Determines if high-resolution geometry data should be generated
   * @returns True if high-res data is needed for discrete control faces or auxiliary slab faces
   */
  needGenerateHighResolutionData(): boolean;

  /**
   * Converts face entity to graphics rendering data
   * @param useHighResolution - Whether to generate high-resolution discrete geometry
   * @returns Graphics objects and mesh definitions for rendering
   */
  toGraphicsData(useHighResolution?: boolean): GraphicsDataResult;

  /**
   * Converts mesh array to graphics data structures
   * @param baseGraphicsObject - Base graphics object properties
   * @param meshes - Array of mesh data with materials
   * @param meshKeyPrefix - Prefix for mesh keys
   * @param startIndex - Starting index for mesh numbering
   * @returns Structured graphics data result
   */
  meshToGraphicDatas(
    baseGraphicsObject: Partial<GraphicsObject>,
    meshes: Array<{
      meshDef: MeshDef;
      material: any;
      dataType?: string;
      outlines?: any;
      customAttrs?: Record<string, any>;
    }>,
    meshKeyPrefix: string,
    startIndex: number
  ): GraphicsDataResult;

  /**
   * Reverses mesh normals and face winding for RCP (Reflected Ceiling Plan) faces
   * @param meshDef - Mesh definition to reverse
   */
  private _reverseMeshDefByRCP(meshDef: MeshDef): void;

  /**
   * Cleanup method called when geometry is destroyed
   */
  onCleanup(): void;

  /**
   * Gets face geometry information
   */
  get faceInfo(): FaceInfo;

  /**
   * Computes transformation matrix from world to local face space
   * @param entity - Target entity
   * @returns World-to-local transform matrix
   */
  getMatrixToLocal(entity: Entity): THREE.Matrix4;

  /**
   * Gets the model transformation matrix
   */
  getModelMatrix(): THREE.Matrix4;

  /**
   * Computes transformation matrix for customized structure faces
   */
  get matrix(): THREE.Matrix4;

  /**
   * Updates and returns room-specific custom attributes
   */
  updateRoomCustomAttrs(): FaceCustomAttributes;

  /**
   * Computes custom attributes based on face's room assignment and parent type
   */
  private _getFaceCustomAttrs(): FaceCustomAttributes;

  /**
   * Computes custom attributes for wall faces
   * @param options - Wall face context
   */
  private _getWallFaceCustomAttrs(options: {
    inRoom: boolean;
    roomType: string;
    parent: Wall | NCustomizedStructure;
    roomArea?: number;
  }): Omit<FaceCustomAttributes, 'parentId'>;

  /**
   * Computes custom attributes for slab faces
   * @param options - Slab face context
   */
  private _getSlabFaceCustomAttrs(options: {
    inRoom: boolean;
    roomType: string;
    parent: Slab;
    roomArea?: number;
    entityId: string;
  }): Omit<FaceCustomAttributes, 'parentId'>;

  /**
   * Computes custom attributes for opening faces (doors, windows, holes)
   * @param options - Opening face context
   */
  private _getOpeningFaceCustomAttrs(options: {
    inRoom: boolean;
    roomType: string;
    parent: Opening | ParametricOpening;
    roomArea?: number;
  }): Omit<FaceCustomAttributes, 'parentId'>;

  /**
   * Checks if the given face is the lowest (bottom) face of a slab
   * @param slab - Parent slab entity
   * @param faceId - Face entity ID
   */
  private _isLowestFace(slab: Slab, faceId: string): boolean;

  /**
   * Checks if the given face is the highest (top) face of a slab
   * @param slab - Parent slab entity
   * @param faceId - Face entity ID
   */
  private _isHighestFace(slab: Slab, faceId: string): boolean;

  /**
   * Discretizes a 2D curve by inserting discrete points and splitting into line segments
   * @param curve - Source curve to discretize
   * @param discretePoints - Array of points to insert into curve
   * @returns Array of line segments approximating the curve
   */
  private _getCurve2d(curve: Curve2d, discretePoints: Vector2[]): Line2d[];
}