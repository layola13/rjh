/**
 * Module: NCustomizedModelFace
 * 
 * Provides classes for handling customized 3D model faces, parametric model arrays,
 * and feature models with material and geometry management.
 */

import type * as THREE from 'three';
import type { BaseObject } from './BaseObject';
import type { CustomizedModel } from './CustomizedModel';
import type { Entity, EntityEvent } from './Entity';
import type { GraphicsData, GraphicsObject, MeshDefinition } from './Graphics';
import type { MaterialData } from './Material';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Face information containing projection matrix and 2D path data
 */
interface FaceInfo {
  /** Projection matrix for transforming 3D to 2D coordinates */
  projMatrix: THREE.Matrix4;
  /** Outer boundary path in 2D */
  outer: number[][];
  /** Inner hole paths in 2D */
  holes: number[][][];
  /** Left offset for face group positioning */
  left: number;
  /** Bottom offset for face group positioning */
  bottom: number;
  /** Whether using new mix paint system */
  isNewMixPaint: boolean;
  /** Whether face uses right-hand coordinate system */
  isRCP: boolean;
  /** Transform matrix for face group */
  transform?: THREE.Matrix4;
}

/**
 * UV transform matrices for texture mapping
 */
interface UvTransform {
  /** Transform for diffuse/color map */
  diffuseMapUvTransform: THREE.Matrix3;
  /** Transform for normal map */
  normalMapUvTransform: THREE.Matrix3;
}

/**
 * Mesh definition with UV transform
 */
interface MeshDefWithUvTransform {
  /** Mesh geometry definition */
  meshDef: MeshDefinition;
  /** Diffuse map UV transform */
  diffuseMapUvTransform: THREE.Matrix3;
  /** Normal map UV transform */
  normalMapUvTransform: THREE.Matrix3;
}

/**
 * Graphics data containing objects and mesh definitions
 */
interface GraphicsDataResult {
  /** Array of graphics objects to render */
  objects: GraphicsObject[];
  /** Array of mesh geometry definitions */
  meshDefs: MeshDefinition[];
}

/**
 * Custom attributes for graphics objects
 */
interface CustomAttributes {
  /** Room type classification */
  roomType?: string;
  /** Object type identifier */
  type?: string;
  /** Light band array index */
  lightBandIndex?: number;
  /** Whether object needs grouping */
  needGroup?: boolean;
  /** Seek IDs sorted by area */
  seekIds?: string[];
  /** Whether using new FGI system */
  isNewFGI?: boolean;
  /** Index in parent collection */
  index?: number;
  /** Actual detailed type */
  realType?: string;
}

/**
 * Light band data structure
 */
interface LightBandData {
  /** Document identifier */
  docId: string;
  /** Graphics data for the light band */
  graphicsData?: GraphicsData;
}

/**
 * Obstacle information for clipping operations
 */
interface ObstacleInfo {
  /** Base coordinate system for obstacle */
  baseCoord: THREE.Matrix4;
  /** Additional obstacle properties */
  [key: string]: unknown;
}

// ============================================================================
// NCustomizedModelFace Class
// ============================================================================

/**
 * Represents a single face of a customized 3D model with material and geometry data.
 * Handles face-to-graphics conversion, UV mapping, and mesh transformations.
 */
export declare class NCustomizedModelFace {
  /** The parent entity owning this face */
  readonly entity: Entity;
  
  /** Composite face tag identifier */
  readonly compositeFaceTag: string;
  
  /** Cached face information */
  faceInfo?: FaceInfo;
  
  /** Custom attributes for the face */
  private _customAttrs?: CustomAttributes;

  /**
   * Creates a new customized model face
   * @param entity - Parent entity owning this face
   * @param compositeFaceTag - Unique identifier for this face
   */
  constructor(entity: Entity, compositeFaceTag: string);

  /**
   * Gets mesh definition with UV transforms applied from material
   * @param meshDef - Original mesh definition
   * @param material - Material data with UV transform
   * @param dataType - Type of graphics data
   * @returns Mesh definition with computed UV transforms
   */
  private _getFgiMeshDefWithUvTransform(
    meshDef: MeshDefinition,
    material: MaterialData,
    dataType: string
  ): MeshDefWithUvTransform;

  /**
   * Converts mesh array to graphics data objects
   * @param meshArray - Array of mesh data to convert
   * @param basePath - Base path for mesh keys
   * @param startIndex - Starting index for mesh numbering
   * @param customAttrs - Custom attributes to attach
   * @param baseObjectData - Base graphics object properties
   * @returns Graphics data with objects and mesh definitions
   */
  meshToGraphicDatas(
    meshArray: Array<{
      meshDef: MeshDefinition;
      material: MaterialData;
      outlines?: unknown;
      dataType: string;
    }>,
    basePath: string,
    startIndex: number,
    customAttrs: CustomAttributes,
    baseObjectData: Partial<GraphicsObject>
  ): GraphicsDataResult;

  /**
   * Converts this face to graphics data for rendering
   * @param useClipped - Whether to use clipped geometry
   * @returns Graphics data containing objects and mesh definitions
   */
  toGraphicsData(useClipped?: boolean): GraphicsDataResult;

  /**
   * Applies transformations and fixes to mesh definitions
   * @param meshDefs - Array of mesh definitions to process
   * @param faceData - Original face data from entity
   */
  private _handleMeshDef(meshDefs: MeshDefinition[], faceData: unknown): void;

  /**
   * Updates cached face information from entity face data
   * @param faceData - Face data from entity
   */
  private _updateFaceInfo(faceData: unknown): void;
}

// ============================================================================
// ParametricModelArray Class
// ============================================================================

/**
 * Represents an array of parametric model instances with transformations.
 * Handles instancing, clipping, and coordinate transformations.
 */
export declare class ParametricModelArray extends BaseObject {
  /**
   * Gets a child face by its identifier
   * @param faceId - Face identifier
   * @returns The requested face or undefined
   */
  getChildFace(faceId: string): unknown;

  /**
   * Handles entity dirty events (geometry/material changes)
   * @param event - Entity event data
   */
  protected _entityDirtied(event: EntityEvent): void;

  /**
   * Determines if high-resolution data generation is needed
   * @returns Always false for parametric arrays
   */
  needGenerateHighResolutionData(): boolean;
}

// ============================================================================
// NCustomizedFeatureModel Class
// ============================================================================

/**
 * Main feature model class handling customized 3D models with children.
 * Manages light slots, moldings, light bands, and parametric arrays.
 * Provides graphics data generation, clipping, and material management.
 */
export declare class NCustomizedFeatureModel extends CustomizedModel {
  /** Cache for face material FGI data */
  private _cacheFaceMaterialFGI: Map<string, GraphicsDataResult>;
  
  /** Cached light band data */
  private _cacheLightBandData?: LightBandData[];
  
  /** FGI decorator instance */
  private _fgiDecorator?: unknown;
  
  /** Cached clip aid CSGs */
  private _clipAidCSGs?: unknown;

  /**
   * Initializes the model and creates view models for all children
   */
  onInit(): void;

  /**
   * Converts model to graphics data synchronously
   * @returns Graphics data with all objects and mesh definitions
   */
  toGraphicsData(): GraphicsDataResult;

  /**
   * Converts model to graphics data asynchronously (supports high-res)
   * @param useHighResolution - Whether to generate high-resolution data
   * @returns Promise resolving to graphics data
   */
  toGraphicsDataAsync(useHighResolution: boolean): Promise<GraphicsDataResult>;

  /**
   * Checks if graphics data represents a molding
   * @param data - Graphics data to check
   * @returns True if data is molding type
   */
  isMoldingData(data: { sketchModelData: { type: string } }): boolean;

  /**
   * Converts mesh definition to serializable format
   * @param meshDef - Mesh definition to convert
   * @returns Serializable mesh definition
   */
  private _meshTypeConverter(meshDef: MeshDefinition): MeshDefinition;

  /**
   * Processes graphics data for faces, edges, and materials
   * @param graphicsData - Raw graphics data from entity
   * @param result - Result object to populate
   * @returns Processed graphics data
   */
  private _dealGraphicsData(
    graphicsData: GraphicsData,
    result: GraphicsDataResult
  ): GraphicsDataResult;

  /**
   * Creates appropriate view model for a child entity
   * @param entity - Child entity to create view model for
   */
  createViewModel(entity: Entity): void;

  /**
   * Handles child entity addition
   * @param event - Child added event
   */
  onChildAdded(event: EntityEvent): void;

  /**
   * Handles child entity removal
   * @param event - Child removed event
   */
  onChildRemoved(event: EntityEvent): void;

  /**
   * Handles entity dirty events and invalidates caches
   * @param event - Entity event data
   */
  protected _onEntityDirty(event: EntityEvent): void;

  /**
   * Gets customized face geometry for a specific face
   * @param meshKey - Mesh key identifier
   * @param convertUnit - Whether to convert units
   * @param entity - Entity owning the face (defaults to this.entity)
   * @returns Graphics data for the face
   */
  getCustomizedFaceGeometry(
    meshKey: string,
    convertUnit?: boolean,
    entity?: Entity
  ): GraphicsDataResult;

  /**
   * Gets face geometry for NCP background wall
   * @param meshKey - Mesh key identifier
   * @param entity - Background wall entity
   * @param useClip - Whether to apply obstacle clipping
   * @returns Graphics data with optional clipping applied
   */
  getNCPBackgroundWallFaceGeometry(
    meshKey: string,
    entity: Entity,
    useClip?: boolean
  ): GraphicsDataResult;

  /**
   * Gets face geometry for NCP roof
   * @param meshKey - Mesh key identifier
   * @param entity - Roof entity
   * @param useClip - Whether to apply obstacle clipping
   * @returns Graphics data with optional clipping applied
   */
  getNCPRoofFaceGeometry(
    meshKey: string,
    entity: Entity,
    useClip?: boolean
  ): GraphicsDataResult;

  /**
   * Gets face geometry for parametric array instance
   * @param meshKey - Mesh key with array index
   * @param convertUnit - Whether to convert units
   * @param arrayEntity - Parametric array entity
   * @returns Transformed graphics data for array instance
   */
  getArrayCustomizedFaceGeometry(
    meshKey: string,
    convertUnit?: boolean,
    arrayEntity: ParametricModelArray
  ): GraphicsDataResult;

  /**
   * Gets extended face geometry by searching through child hierarchy
   * @param meshKey - Mesh key identifier
   * @param entity - Entity to search from
   * @param viewModel - View model context
   * @returns Graphics data found in hierarchy
   */
  getExtendedFaceGeometry(
    meshKey: string,
    entity: Entity,
    viewModel: BaseObject
  ): GraphicsDataResult;

  /**
   * Applies matrix transformation to graphics data
   * @param graphicsData - Graphics data to transform
   * @param matrix - Transformation matrix
   * @returns Transformed graphics data
   */
  transformGraphicsData(
    graphicsData: GraphicsDataResult,
    matrix: THREE.Matrix4
  ): GraphicsDataResult;

  /**
   * Gets face mesh definition and UV material transforms
   * @param faceTag - Face tag identifier
   * @param faceData - Face graphics data
   * @returns Mesh definition and UV transforms
   */
  private _getFaceMeshDefAndMaterial(
    faceTag: string,
    faceData: unknown
  ): { faceMeshDef: MeshDefinition; uvMat?: UvTransform };

  /**
   * Gets UV transform for NCP background wall base
   * @param entity - Background wall entity
   * @param faceTag - Face tag identifier
   * @param faceData - Face graphics data
   * @param materialData - Material data
   * @returns UV transforms for diffuse and normal maps
   */
  private _getNCPBkgWallBaseUvTransform(
    entity: Entity,
    faceTag: string,
    faceData: unknown,
    materialData: MaterialData
  ): UvTransform | undefined;

  /**
   * Gets UV transform for NCP content base
   * @param entity - Content base entity
   * @param faceData - Face graphics data
   * @param materialData - Material data
   * @returns UV transforms for diffuse and normal maps
   */
  private _getNCPContentBaseUvTransform(
    entity: Entity,
    faceData: unknown,
    materialData: MaterialData
  ): UvTransform | undefined;
}