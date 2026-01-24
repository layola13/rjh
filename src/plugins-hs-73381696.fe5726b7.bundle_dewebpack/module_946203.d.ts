/**
 * Material brush strategy for N-Customized models
 * Handles material application, picking, and undo/redo operations for various customized model types
 */

import { HSCore } from '@/core';
import { HSApp } from '@/app';
import { MaterialData } from '@/core/material';
import { GeLib } from '@/geometry';
import { LiveHint } from '@/ui/hint';
import { ResourceManager } from '@/resources';
import { NWTK } from '@/network';

/**
 * Information about a failed material application attempt
 */
interface FailedMaterialInfo {
  /** The parent model where the operation failed */
  parentModel: HSCore.Model.NCustomizedFeatureModel;
  /** The material data that failed to apply */
  materialData: MaterialData;
  /** The variable name associated with the failed operation */
  variableName: string;
}

/**
 * Data structure for undo/redo operations on face materials
 */
interface FaceMaterialUndoData {
  /** The face identifier */
  faceId: string;
  /** The material instance (cloned) */
  material?: HSCore.Material.Material;
  /** Whether this face supports paint material */
  isSupportPaintMaterial: boolean;
}

/**
 * Result of material sucking operation
 */
interface SuckResult {
  /** The material data extracted */
  materialData: MaterialData;
  /** Optional paint instance for parametric materials */
  paint?: HSCore.Paint.Paint;
  /** Whether this is a parametric paint */
  isParamPaint?: boolean;
}

/**
 * Pick operation context
 */
interface PickContext {
  /** The entity being operated on */
  entity: HSCore.Model.BaseModel;
  /** The mesh identifier */
  meshId: number;
  /** The mesh name */
  meshName?: string;
  /** Array of face identifiers that share properties */
  sameFaceIds?: string[];
  /** The mouse/pointer event */
  event: MouseEvent;
  /** Pick results from the 3D view */
  pickResults?: Array<{ viewObject: any; point: any; meshId: number; meshName: string }>;
  /** View type: '2d' or '3d' */
  viewType: '2d' | '3d';
  /** 2D position for 2D view operations */
  position?: [number, number];
}

/**
 * Auto-group options for light slots
 */
interface AutoGroupOptions {
  /** The light slot face type to auto-group */
  autoGroupLightSlotId: string;
}

/**
 * Strategy for handling material operations on N-Customized models
 * Supports various model types including parametric backgrounds, ceilings, light slots, and moldings
 */
export default class NCustomizedModelStrategy extends BaseMaterialStrategy {
  /** Strategy type identifier */
  readonly type: string = 'NCustomizedModelStrategy';

  /** Cached information about failed material applications (for enterprise parametric backgrounds) */
  failedInfo?: FailedMaterialInfo;

  /**
   * Determines if a picked object can have its material sucked (sampled)
   * @param context - The pick context
   * @returns True if the material can be sampled
   */
  isSuckable(context: PickContext): boolean;

  /**
   * Extracts pattern or material data from a picked object
   * Handles both regular materials and parametric mix-paint materials
   * @param context - The pick context
   * @param material - The material instance
   * @param faceName - The face name
   * @returns The extracted material/pattern data
   */
  getPatternOrMaterial(
    context: PickContext,
    material: HSCore.Material.Material,
    faceName: string
  ): SuckResult | undefined;

  /**
   * Sucks (samples) material from the picked object
   * @param context - The pick context
   * @returns The sampled material data
   */
  suck(context: PickContext): SuckResult | undefined;

  /**
   * Determines if a material can be applied to the target
   * Performs validation including enterprise model checks and material type compatibility
   * @param context - The pick context
   * @param suckInfo - The material data to apply
   * @returns True if the material can be applied
   */
  isAppliable(context: PickContext, suckInfo?: SuckResult): boolean;

  /**
   * Applies material to the target entity
   * @param context - The pick context
   * @param suckInfo - The material data to apply
   */
  apply(context: PickContext, suckInfo: SuckResult): Promise<void>;

  /**
   * Sets material for specific face IDs
   * Handles both parametric paint materials and regular materials
   * @param entity - The target entity
   * @param faceIds - Array of face identifiers
   * @param suckInfo - The material data to apply
   */
  setMaterialByFaceIds(
    entity: HSCore.Model.NCustomizedFeatureModel | HSCore.Model.NCustomizedModelLightSlot,
    faceIds: string[],
    suckInfo: SuckResult
  ): Promise<void>;

  /**
   * Gets data needed for undo operation
   * @param context - The pick context
   * @returns Undo data (face materials or single material data)
   */
  getUndoData(context: PickContext): FaceMaterialUndoData[] | MaterialData | undefined;

  /**
   * Gets data needed for redo operation
   * @param context - The pick context
   * @returns Redo data (face materials or single material data)
   */
  getRedoData(context: PickContext): FaceMaterialUndoData[] | MaterialData | undefined;

  /**
   * Performs undo operation
   * @param context - The pick context
   * @param undoData - The undo data
   */
  undo(context: PickContext, undoData: FaceMaterialUndoData[] | MaterialData): void;

  /**
   * Performs redo operation
   * @param context - The pick context
   * @param redoData - The redo data
   */
  redo(context: PickContext, redoData: FaceMaterialUndoData[] | MaterialData): void;

  /**
   * Commits a material application request to the transaction manager
   * Handles different model types and enterprise parametric backgrounds specially
   * @param context - The pick context
   * @param suckInfo - The material data to apply
   */
  commitRequest(context: PickContext, suckInfo: SuckResult): void;

  /**
   * Sucks material in 2D view mode
   * Converts 2D coordinates to 3D ray picking
   * @param context - The pick context
   * @returns The sampled material data
   */
  suck2DMaterial(context: PickContext): SuckResult | undefined;

  /**
   * Commits material application for enterprise parametric background walls
   * Performs server-side validation before applying
   * @param context - The pick context
   * @param suckInfo - The material data to apply
   * @param faceIds - Array of face identifiers
   */
  commitEnterpriseParametricBackgroundWall(
    context: PickContext,
    suckInfo: SuckResult,
    faceIds: string[]
  ): void;

  /**
   * Checks if an entity is a parametric background wall type
   * @param entity - The entity to check
   * @returns True if entity is a parametric background wall
   */
  private _isParametricBackgroundWall(entity: HSCore.Model.BaseModel): boolean;

  /**
   * Gets the top-level parent model of an entity
   * @param entity - The child entity
   * @returns The top-level parent model
   */
  getTopParentModel(entity: HSCore.Model.BaseModel): HSCore.Model.NCustomizedFeatureModel | undefined;

  /**
   * Checks if entity belongs to an enterprise parametric background wall
   * @param entity - The entity to check
   * @returns True if from enterprise parametric background
   */
  private _isFromEnterpriseParametricBackgroundWall(entity: HSCore.Model.BaseModel): boolean;

  /**
   * Checks if faces support paint material
   * @param entity - The entity
   * @param faceIds - Array of face identifiers
   * @returns True if all faces support paint material
   */
  private _isSupportedPaintMaterial(
    entity: HSCore.Model.NCustomizedFeatureModel,
    faceIds: string[]
  ): boolean;

  /**
   * Handles material application for models with auto-grouping
   * Applies pattern data and optionally groups light slot faces
   * @param entity - The target entity
   * @param suckInfo - The material data to apply
   * @param context - The pick context
   * @param faceIds - Array of face identifiers
   */
  private _handleNCustomizedWithAutoGroup(
    entity: HSCore.Model.NCustomizedFeatureModel,
    suckInfo: SuckResult,
    context: PickContext,
    faceIds: string[]
  ): Promise<void>;

  /**
   * Determines which face IDs need pattern data
   * When auto-grouping light slots, only the group face needs pattern
   * @param faceIds - All face identifiers
   * @param options - Auto-group options
   * @returns Filtered face IDs that need pattern data
   */
  private _getFaceIdsNeedPattern(faceIds: string[], options?: AutoGroupOptions): string[];

  /**
   * Gets face identifiers from pick context
   * Handles grouping for light slots
   * @param context - The pick context
   * @returns Array of face identifiers
   */
  private _getFaceIds(context: PickContext): string[] | undefined;

  /**
   * Extracts undo/redo data from context
   * @param context - The pick context
   * @returns Undo/redo data structure
   */
  private _getUndoRedoData(context: PickContext): FaceMaterialUndoData[] | MaterialData | undefined;

  /**
   * Handles undo/redo operations
   * @param entity - The target entity
   * @param data - The undo/redo data
   */
  private _undoRedoHandle(
    entity: HSCore.Model.BaseModel,
    data: FaceMaterialUndoData[] | MaterialData
  ): void;

  /**
   * Gets mesh name from mesh ID
   * @param webglEntity - The WebGL entity
   * @param meshId - The mesh identifier
   * @returns The mesh name
   */
  private _getMeshName(webglEntity: any, meshId: number): string | undefined;

  /**
   * Gets WebGL entity from model
   * @param entity - The model entity
   * @returns The WebGL display entity
   */
  private _getWebglEntity(entity: HSCore.Model.BaseModel): any;

  /**
   * Performs picking operation in 3D view
   * @param view - The 3D view
   * @param event - The mouse event
   * @returns Pick result with mesh ID
   */
  private _pick(view: any, event: MouseEvent): { meshId: number } | undefined;

  /**
   * Extracts material data from suck info
   * @param suckInfo - The suck result
   * @returns The material data
   */
  private _getMaterialDataFromSuckInfo(suckInfo: SuckResult): MaterialData;
}