/**
 * ParametricOpening module - provides customized parametric opening model functionality
 * with graphics data generation, material handling, and clipping support.
 */

import { CustomizedModel } from './CustomizedModel';
import { Util as GeometryUtil } from './GeometryUtil';
import { Util as ProfileUtil } from './ProfileUtil';
import { Util as MaterialUtil } from './MaterialUtil';
import { EntityEventType } from './EntityEventType';
import { NCustomizedModelFace } from './NCustomizedModelFace';
import { Vector3, Matrix4, Matrix3, Plane, Loop, Line3d } from './GeometryCore';
import { NCParametricModelMaterialUtil } from './NCParametricModelMaterialUtil';
import { NParametricOpeningFGIDecorator } from './NParametricOpeningFGIDecorator';
import { SurfaceObj } from './SurfaceObj';
import { TgUtil } from './TgUtil';

/**
 * Graphics data structure containing mesh objects and definitions
 */
interface GraphicsData {
  /** Array of graphics objects to render */
  objects: GraphicsObject[];
  /** Array of mesh definitions */
  meshDefs: MeshDefinition[];
}

/**
 * Graphics object representing a renderable mesh with material
 */
interface GraphicsObject {
  /** Unique path identifying this graphics object */
  graphicsPath: string;
  /** Mesh identifier */
  mesh: string;
  /** Material properties */
  material: MaterialObject;
  /** Custom rendering attributes */
  customAttrs?: CustomAttributes;
}

/**
 * Material object containing rendering properties
 */
interface MaterialObject {
  /** Diffuse texture URI */
  textureURI?: string;
  /** Default diffuse texture URI */
  textureURIDefault?: string;
  /** Material color */
  color?: number | string;
  /** Color rendering mode */
  colorMode?: HSCore.Material.ColorModeEnum;
  /** Normal map texture URI */
  normalTexture?: string;
  /** Molding material rotation angle */
  moldingMaterialRotation?: number;
  /** Material property overrides */
  override?: MaterialOverride;
  /** UV transform for diffuse map */
  diffuseMapUvTransform?: THREE.Matrix3;
  /** UV transform for normal map */
  normalMapUvTransform?: THREE.Matrix3;
}

/**
 * Material property overrides for texture tiling
 */
interface MaterialOverride {
  /** Normal tile size in X direction */
  normalTileSizeX?: number;
  /** Normal tile size in Y direction */
  normalTileSizeY?: number;
  /** Tile size in X direction */
  tileSize_x?: number;
  /** Tile size in Y direction */
  tileSize_y?: number;
}

/**
 * Custom attributes for graphics objects
 */
interface CustomAttributes {
  /** Room type classification */
  roomType?: string;
  /** Object type classification */
  type?: string;
  /** Light band index (-1 if not a light band) */
  lightBandIndex?: number;
  /** Whether object needs grouping */
  needGroup?: boolean;
  /** Real type with modifier suffix */
  realType?: string;
  /** Array of seek IDs sorted by area */
  seekIds?: string[];
}

/**
 * Mesh definition containing geometry data
 */
interface MeshDefinition {
  /** Mesh key identifier */
  meshKey: string;
  /** Vertex indices */
  indices: Uint32Array;
  /** Vertex normal vectors */
  vertexNormals: Float32Array;
  /** Vertex position coordinates */
  vertexPositions: Float32Array;
  /** Vertex UV coordinates */
  vertexUVs: Float32Array;
  /** Custom data attached to mesh */
  customData?: MeshCustomData;
  /** Sketch model metadata */
  sketchModelData?: SketchModelData;
}

/**
 * Custom data attached to mesh faces
 */
interface MeshCustomData {
  /** Face-specific material data */
  fpMaterialData?: FaceMaterialData;
}

/**
 * Face material data including texture and tiling
 */
interface FaceMaterialData {
  /** Texture URI */
  textureURI?: string;
  /** Default texture URI */
  textureURIDefault?: string;
  /** Material color */
  color?: number | string;
  /** Color rendering mode */
  colorMode?: HSCore.Material.ColorModeEnum;
  /** Material rotation angle */
  rotation: number;
  /** Tile size in X direction */
  tileSize_x?: number;
  /** Tile size in Y direction */
  tileSize_y?: number;
  /** Normal texture URI */
  normalTexture?: string;
}

/**
 * Sketch model metadata
 */
interface SketchModelData {
  /** Model type (MOLDING, LIGHTBAND, etc.) */
  type: string;
  /** Document identifier */
  documentId?: string;
  /** Profile data for moldings */
  profileData?: ProfileData;
}

/**
 * Profile data for molding geometry
 */
interface ProfileData {
  /** Profile shape definition */
  profile: string;
  /** Profile width */
  profileWidth: number;
  /** Profile height */
  profileHeight: number;
  /** Normal texture URI */
  normalTexture?: string;
}

/**
 * Surface object containing geometry and surface information
 */
interface SurfaceObjData {
  /** Surface geometry */
  surface: GeometrySurface;
  /** Surface object instance */
  surfaceObj: SurfaceObj;
  /** Face information */
  faceInfo?: FaceInfo;
}

/**
 * Face information with adjacent faces
 */
interface FaceInfo {
  /** Next adjacent face */
  next?: BrepFace;
  /** Previous adjacent face */
  prev?: BrepFace;
}

/**
 * B-rep face representation
 */
interface BrepFace {
  /** Underlying B-rep face */
  brepFace: GeometryBrepFace;
  /** Face path with outer boundary */
  path: FacePath;
}

/**
 * Face path with outer boundary curves
 */
interface FacePath {
  /** Outer boundary curves */
  outer: Curve3d[];
}

/**
 * Opening outer boundary data
 */
interface OpeningOuterData {
  /** Boundary points */
  points: Vector3[];
  /** Extrusion height */
  extruderHeight: number;
}

/**
 * Options for getting opening outer boundary
 */
interface OpeningOuterOptions {
  /** Next wall face */
  nextWallFace?: BrepFace;
  /** Previous wall face */
  prevWallFace?: BrepFace;
  /** Only use the face itself without offset */
  onlySelf?: boolean;
}

/**
 * Mesh data for clipping operations
 */
interface ClipMeshData {
  /** Source meshes */
  sourceMeshes: THREE.Mesh[];
  /** Transform matrix */
  matrix: THREE.Matrix4;
}

/**
 * Clip meshes and planes for boolean operations
 */
interface ClipData {
  /** Array of clip meshes */
  clipMeshes?: THREE.Mesh[];
  /** Array of cutting planes */
  cutPlanes?: THREE.Plane[];
}

/**
 * Sill configuration for openings
 */
interface SillConfig {
  /** Whether side A has a sill */
  aSill: boolean;
  /** Whether side B has a sill */
  bSill: boolean;
}

/**
 * Pocket size configuration
 */
interface PocketSize {
  /** Pocket size (generic) */
  size?: number;
  /** Pocket size for side A */
  aSize?: number;
  /** Pocket size for side B */
  bSize?: number;
}

/**
 * Entity event data
 */
interface EntityEventData {
  /** Event type */
  type: EntityEventType;
  /** Entity that triggered the event */
  entity: HSCore.Model.Entity;
  /** Additional event options */
  options?: EntityEventOptions;
}

/**
 * Entity event options
 */
interface EntityEventOptions {
  /** Array of affected face IDs */
  faceIds?: string[];
}

/**
 * UV transform data
 */
interface UvTransformData {
  /** Diffuse map UV transform */
  diffuseMapUvTransform: THREE.Matrix3;
  /** Normal map UV transform */
  normalMapUvTransform: THREE.Matrix3;
}

/**
 * ParametricOpening - Customized model for parametric openings (windows, doors, etc.)
 * Handles graphics generation, material application, clipping, and child entity management.
 */
export declare class ParametricOpening extends CustomizedModel {
  /** Cache for face material FGI data */
  private _cacheFaceMaterialFGI: Map<string, GraphicsData>;
  
  /** Cache for light band data */
  private _cacheLightBandData?: unknown;
  
  /** Clip aid CSG geometries cache */
  private _clipAidCSGs?: unknown;
  
  /** FGI decorator for UV transform calculations */
  private _fgiDecorator?: NParametricOpeningFGIDecorator;
  
  /** Mesh clipper instance */
  private clipper?: MeshClipper;
  
  /** Whether geometry needs regeneration */
  geometryDirty: boolean;

  /**
   * Creates a new ParametricOpening instance
   * @param entity - The entity model
   * @param context - The rendering context
   * @param options - Additional options
   */
  constructor(
    entity: HSCore.Model.Entity,
    context: RenderContext,
    options?: unknown
  );

  /**
   * Converts the model to graphics data for rendering (synchronous)
   * @returns Graphics data with objects and mesh definitions
   */
  toGraphicsData(): GraphicsData;

  /**
   * Converts the model to graphics data for rendering (asynchronous)
   * @param highResolution - Whether to generate high-resolution graphics
   * @returns Promise resolving to graphics data
   */
  toGraphicsDataAsync(highResolution: boolean): Promise<GraphicsData>;

  /**
   * Checks if mesh data represents molding
   * @param meshDef - Mesh definition to check
   * @returns True if the data is molding type
   */
  isMoldingData(meshDef: MeshDefinition): boolean;

  /**
   * Internal method to process graphics data and generate renderable objects
   * @param graphicsData - Raw graphics data from entity
   * @param result - Result object to populate
   * @returns Processed graphics data
   */
  private _dealGraphicsData(
    graphicsData: EntityGraphicsData,
    result: GraphicsData
  ): GraphicsData;

  /**
   * Creates a view model for child content entities
   * @param entity - Child entity to create view model for
   * @returns Created view model or undefined
   */
  createViewModel(entity: HSCore.Model.Entity): ViewModel | undefined;

  /**
   * Handles child entity addition events
   * @param event - Child added event
   */
  onChildAdded(event: ChildEvent): void;

  /**
   * Handles child entity removal events
   * @param event - Child removed event
   */
  onChildRemoved(event: ChildEvent): void;

  /**
   * Handles entity dirty events (geometry or material changes)
   * @param event - Entity dirty event
   */
  private _onEntityDirty(event: Event<EntityEventData>): void;

  /**
   * Gets customized face geometry with applied materials
   * @param faceId - Face identifier
   * @param convertUnit - Whether to convert units
   * @param entity - Entity to get face from (defaults to this.entity)
   * @returns Graphics data for the face
   */
  getCustomizedFaceGeometry(
    faceId: string,
    convertUnit?: boolean,
    entity?: HSCore.Model.Entity
  ): GraphicsData;

  /**
   * Gets UV transform for parametric opening face
   * @param entity - The entity
   * @param faceTag - Face tag identifier
   * @param meshDef - Mesh definition
   * @param materialData - Face material data
   * @returns UV transform data or undefined
   */
  private _getNParametricOpeningUvTransform(
    entity: HSCore.Model.Entity,
    faceTag: string,
    meshDef: MeshDefinition,
    materialData?: FaceMaterialData
  ): UvTransformData | undefined;

  /**
   * Gets the opening boundary loop in local coordinates
   * @param surfaceData - Surface object data
   * @returns Array of local boundary points or undefined
   */
  getOpeningLoop(surfaceData?: SurfaceObjData): Vector3[] | undefined;

  /**
   * Gets opening outer boundary from surface object
   * @param surfaceObj - Surface object
   * @param options - Options including adjacent faces
   * @returns Opening outer boundary data or undefined
   */
  getOpeningOuterBySurfaceObj(
    surfaceObj: SurfaceObj,
    options?: OpeningOuterOptions
  ): OpeningOuterData | undefined;

  /**
   * Gets opening outer boundary from B-rep face
   * @param brepFace - B-rep face
   * @param options - Options including adjacent faces
   * @returns Opening outer boundary data or undefined
   */
  getOpeningOuterByBrepFace(
    brepFace: GeometryBrepFace,
    options?: OpeningOuterOptions
  ): OpeningOuterData | undefined;

  /**
   * Gets opening outer boundary from surface data
   * @param surfaceData - Surface object data
   * @returns Opening outer boundary data or undefined
   */
  getOpeningOuter(surfaceData?: SurfaceObjData): OpeningOuterData | undefined;

  /**
   * Gets the model type string for graphics attributes
   * @param graphicsObj - Graphics object
   * @returns Model type string
   */
  private _getModelType(graphicsObj: GraphicsObject): string;

  /**
   * Converts graphics data to meshes for clipping
   * @param graphicsData - Graphics data
   * @returns Clip mesh data
   */
  private _getMeshFromGraphicData(graphicsData: GraphicsData): ClipMeshData;

  /**
   * Performs mesh clipping operations
   * @param meshData - Mesh data to clip
   * @param clipMeshes - Array of clip meshes
   * @param cutPlanes - Array of cutting planes
   * @returns Clipped graphics data
   */
  private _doMeshClip(
    meshData: ClipMeshData,
    clipMeshes?: THREE.Mesh[],
    cutPlanes?: THREE.Plane[]
  ): GraphicsData;

  /**
   * Creates or retrieves cached view model for content entity
   * @param entity - Content entity
   * @returns View model instance
   */
  private _createOrGetContentViewModel(entity: HSCore.Model.Entity): ViewModel;

  /**
   * Converts entity to basic graphics object structure
   * @returns Base graphics object
   */
  private _toGraphicsObject(): Partial<GraphicsObject>;

  /**
   * Gets sill configuration for the opening
   * @returns Sill configuration
   */
  getSill(): SillConfig;

  /**
   * Gets pocket size configuration
   * @returns Pocket size data
   */
  getPocketSize(): PocketSize;
}