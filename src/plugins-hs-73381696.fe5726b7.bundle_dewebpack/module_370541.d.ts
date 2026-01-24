/**
 * Customized 2D face material strategy for format painting functionality.
 * Handles material application, copying, and undo/redo operations on Face2d entities.
 */

import { HSCore } from '635589';
import { Matrix4, Vector3 } from '815362';

/**
 * Material data structure containing appearance properties
 */
interface MaterialData {
  /** Material metadata or legacy meta property */
  metadata?: unknown;
  meta?: unknown;
  /** Blend color applied to the material */
  blendColor?: unknown;
  /** Color blending mode */
  colorMode?: unknown;
}

/**
 * Pattern information extracted from a painted surface
 */
interface PatternInfo {
  /** Material configuration data */
  materialData: MaterialData;
  /** Paint pattern details (present for parametric paints) */
  paint?: {
    /** Pattern definition */
    pattern: unknown;
  };
  /** Whether this is a parametric paint with spatial variation */
  isParamPaint?: boolean;
}

/**
 * Hit test result containing entity reference and spatial data
 */
interface PickResult {
  /** The picked Face2d entity */
  entity: HSCore.Model.Face2d;
  /** World-space position of the pick point [x, y, z] */
  position?: number[];
}

/**
 * Undo/redo snapshot data for material state
 */
interface UndoRedoData {
  /** Unique identifier of the affected face */
  faceTag: string;
  /** Cloned material instance for state restoration */
  material?: HSCore.Material.Material;
}

/**
 * Strategy for applying format painting to customized 2D faces.
 * 
 * Supports:
 * - Material extraction from Face2d entities
 * - Application to individual faces or face groups
 * - Parametric paint pattern sampling
 * - Undo/redo state management
 */
export default class NCustomizedFace2dStrategy {
  /** Strategy type identifier */
  readonly type: string = 'NCustomizedFace2dStrategy';

  /**
   * Determines if an entity can be used as a material source.
   * 
   * @param pickResult - Hit test result to evaluate
   * @returns True if the entity is a Face2d instance
   */
  isSuckable(pickResult: PickResult): boolean;

  /**
   * Extracts material information from a Face2d entity.
   * 
   * For parametric paints, samples the pattern at the pick position.
   * Falls back to uniform material data if no spatial variation exists.
   * 
   * @param pickResult - Source face and pick location
   * @returns Material data with optional pattern information
   */
  suck(pickResult: PickResult): PatternInfo | { materialData: MaterialData };

  /**
   * Checks if the extracted material can be applied to a target entity.
   * 
   * @param pickResult - Target entity to validate
   * @param patternInfo - Material data to apply (must be truthy)
   * @returns True if target is a Face2d and material data exists
   */
  isAppliable(pickResult: PickResult, patternInfo: PatternInfo | null): boolean;

  /**
   * Applies material to a Face2d entity.
   * 
   * Handles both individual faces and auto-grouped face regions.
   * Updates parametric paint patterns if present.
   * 
   * @param pickResult - Target face entity
   * @param patternInfo - Material configuration to apply
   */
  apply(pickResult: PickResult, patternInfo: PatternInfo): Promise<void>;

  /**
   * Applies material to multiple faces by mesh key identifiers.
   * 
   * Differentiates between:
   * - Paint-supported faces: Applies parametric material with spatial patterns
   * - Standard faces: Applies uniform material data
   * 
   * Automatically propagates materials to auto-grouped adjacent faces.
   * 
   * @param model - Parent customized feature model
   * @param meshKeys - Array of face mesh key identifiers
   * @param patternInfo - Material to apply with optional pattern data
   */
  setMaterialByFaceIds(
    model: HSCore.Model.NCustomizedFeatureModel,
    meshKeys: string[],
    patternInfo: PatternInfo
  ): Promise<void>;

  /**
   * Extracts material or samples parametric paint pattern at a specific point.
   * 
   * For parametric paints:
   * 1. Transforms pick point to face local space
   * 2. Projects to paint UV coordinates
   * 3. Samples material from pattern at that location
   * 
   * @param pickResult - Source face and pick location
   * @param material - Material instance to extract from
   * @param meshKey - Face mesh key identifier
   * @returns Pattern information with sampled material data
   */
  getPatternOrMaterial(
    pickResult: PickResult,
    material: HSCore.Material.Material,
    meshKey: string
  ): PatternInfo;

  /**
   * Captures current material state for undo operation.
   * 
   * @param pickResult - Entity to capture state from
   * @returns Snapshot containing face ID and cloned material
   */
  getUndoData(pickResult: PickResult): UndoRedoData | undefined;

  /**
   * Captures current material state for redo operation.
   * 
   * @param pickResult - Entity to capture state from
   * @returns Snapshot containing face ID and cloned material
   */
  getRedoData(pickResult: PickResult): UndoRedoData | undefined;

  /**
   * Restores material state from undo snapshot.
   * 
   * @param pickResult - Target entity
   * @param data - Previously captured undo data
   */
  undo(pickResult: PickResult, data: UndoRedoData): void;

  /**
   * Restores material state from redo snapshot.
   * 
   * @param pickResult - Target entity
   * @param data - Previously captured redo data
   */
  redo(pickResult: PickResult, data: UndoRedoData): void;

  /**
   * Internal implementation for undo/redo operations.
   * 
   * Handles:
   * - Material restoration or removal
   * - Auto-group synchronization
   * - Geometry update triggering
   * 
   * @param entity - Face2d entity to modify
   * @param data - Material snapshot to restore
   */
  private _undoRedoHandle(entity: HSCore.Model.Face2d, data: UndoRedoData): void;

  /**
   * Internal helper to extract material state for undo/redo.
   * 
   * Checks both face-specific and default material maps.
   * 
   * @param pickResult - Entity to extract state from
   * @returns State snapshot or undefined if entity is invalid
   */
  private _getUndoRedoData(pickResult: PickResult): UndoRedoData | undefined;
}