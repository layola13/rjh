import { Entity, EntityFlagEnum } from './Entity';
import { GussetModelInstance } from './GussetModelInstance';
import { SignalHook, SignalEvent } from './SignalHook';
import { PaintsUtil } from './PaintsUtil';
import { MixPaintDecorator } from './MixPaintDecorator';
import { ServiceManager } from './ServiceManager';
import { ClipPathMode } from './ClipPathMode';
import { MathUtil, Vector2 } from './MathUtil';
import { Logger } from './Logger';

/**
 * Type definitions for GussetSurface module
 * Manages surface geometry for gusset (decorative trim) rendering on faces
 */

/** Face entity types that can host gusset surfaces */
type FaceEntityType = 
  | HSCore.Model.CustomizedModel 
  | HSCore.Model.NCustomizedFeatureModel 
  | HSCore.Model.Ceiling
  | HSCore.Model.Floor
  | HSCore.Model.Face
  | HSCore.Model.CustomizedPMModel;

/** Material mix paint information */
interface MixPaint {
  /** Unique identifier for face grouping */
  faceGroupId?: string;
  /** Face group containing paving information */
  faceGroup: {
    getPaveBoundingBox(faceId: string): BoundingBox;
  };
}

/** 2D bounding box */
interface BoundingBox {
  min: { x: number; y: number };
  max: { x: number; y: number };
  containsPoint(point: { x: number; y: number }): boolean;
}

/** Path definition with outer boundary and optional holes */
interface Path {
  outer: unknown;
  holes?: unknown[];
}

/** Paving pattern configuration */
interface PavingOption {
  /** Rotation angle in degrees */
  rotation?: number;
  /** Reference point for pattern origin */
  point?: { x: number; y: number };
}

/** Pattern region definition */
interface PatternRegion {
  /** Path boundary for this region */
  path: Path;
  /** Pattern configuration */
  pattern: {
    pavingOption?: PavingOption;
    patternUnits: Array<{
      materials: Array<{ seekId: string }>;
    }>;
  };
}

/** Building product metadata */
interface BuildingProductMeta {
  /** Tile width in world units */
  tileSize_x: number;
  /** Tile height in world units */
  tileSize_y: number;
}

/** Clip location result from pattern analysis */
interface ClipLocation {
  /** Column index in grid */
  column: number;
  /** Row index in grid */
  row: number;
}

/** Computed brick position data */
interface BrickPositionData {
  /** World-space centers for each brick instance */
  globalCenters: Vector2[];
  /** Rotation angle in radians */
  rotation: number;
}

/** Event data for entity field changes */
interface FieldChangedEvent {
  data?: {
    fieldName?: string;
  };
}

/** Event data for entity flag changes */
interface FlagChangedEvent {
  data?: {
    flag?: EntityFlagEnum;
  };
}

/** Options for dirty notification */
interface DirtyOptions {
  [key: string]: unknown;
}

/**
 * GussetSurface entity
 * Represents a decorative trim surface applied to a face with tiled brick patterns
 */
export declare class GussetSurface extends Entity {
  private _faceEntity: FaceEntityType;
  private _faceId: string;
  private _isCustomizedModel: boolean;
  private _modelInstanceMap: Map<string, GussetModelInstance>;
  private _signalHook: SignalHook;
  private _faceMatrix?: THREE.Matrix4;

  /**
   * Creates a new gusset surface
   * @param faceEntity - The parent face entity
   * @param faceId - Unique identifier for the face
   */
  constructor(faceEntity: FaceEntityType, faceId: string);

  /**
   * Cleans up resources and signal listeners
   */
  destroy(): void;

  /**
   * Indicates this entity should not be serialized
   * @returns Always false
   */
  needDump(): boolean;

  /**
   * Indicates this entity cannot participate in transactions
   * @returns Always false
   */
  canTransact(): boolean;

  /**
   * Handles dirty events from the parent face entity
   * @param event - Signal event or raw data
   */
  onFaceEntityDirty(event: SignalEvent | unknown): void;

  /**
   * Handles field changes on the parent face entity
   * Triggers position update if transform fields change
   * @param event - Field changed event data
   */
  private _onFaceEntityFieldChanged(event: FieldChangedEvent): void;

  /**
   * Handles flag changes on the parent face entity
   * Synchronizes hidden flag state
   * @param event - Flag changed event data
   */
  private _onFaceEntityFlagChanged(event: FlagChangedEvent): void;

  /**
   * Gets the material mix paint for this surface
   */
  get mixpaint(): MixPaint | undefined;

  /**
   * Gets the parent face entity
   */
  get faceEntity(): FaceEntityType;

  /**
   * Gets the face identifier
   */
  get faceId(): string;

  /**
   * Gets the computed transformation matrix for this face
   */
  get faceMatrix(): THREE.Matrix4 | undefined;

  /**
   * Gets the map of building product IDs to model instances
   */
  get modelInstanceMap(): Map<string, GussetModelInstance>;

  /**
   * Checks if parent is a customized model type
   */
  get isCustomizedModel(): boolean;

  /**
   * Validates that the surface has valid mix paint data
   * @returns True if mix paint exists
   */
  isValid(): boolean;

  /**
   * Checks if this surface matches the given entity and face
   * Also checks face group ID for customized models
   * @param faceEntity - Entity to compare
   * @param faceId - Face ID to compare
   * @returns True if surfaces match
   */
  equalsSurface(faceEntity: FaceEntityType, faceId: string): boolean;

  /**
   * Checks if this surface uses the given mix paint
   * @param mixPaint - Mix paint to compare
   * @returns True if mix paints match
   */
  equalsMixPaint(mixPaint: MixPaint | undefined): boolean;

  /**
   * Retrieves mix paint for a given entity and face
   * @param faceEntity - The face entity
   * @param faceId - The face identifier
   * @returns Mix paint data or undefined
   */
  static getMixPaint(faceEntity: FaceEntityType, faceId: string): MixPaint | undefined;

  /**
   * Finds the host entity in the hierarchy
   * @param entityId - Optional entity ID to search from
   * @returns Host entity (Ceiling, Floor, CustomizedModel, etc.)
   */
  findHost(entityId?: string): Entity | undefined;

  /**
   * Computes brick instance positions based on paving pattern
   * @param faceRegion - Face region with path and holes
   * @param patternRegion - Pattern configuration and boundary
   * @param productMeta - Building product metadata with tile dimensions
   * @returns Brick positions and rotation
   */
  private _computeBrickPositions(
    faceRegion: { path: Path },
    patternRegion: PatternRegion,
    productMeta: BuildingProductMeta
  ): BrickPositionData;

  /**
   * Updates surface geometry and brick instances
   * Processes all gusset model regions and generates brick placements
   */
  update(): void;

  /**
   * Computes the transformation matrix for a face
   * Handles different entity types (CustomizedModel, CustomizedPMModel, etc.)
   * @param layer - Entity layer
   * @param faceEntity - The face entity
   * @param faceId - The face identifier
   * @returns Computed 4x4 transformation matrix
   */
  static computeFaceMatrix(
    layer: unknown,
    faceEntity: FaceEntityType,
    faceId?: string
  ): THREE.Matrix4 | undefined;
}

/**
 * Module exports
 */
export { GussetSurface };