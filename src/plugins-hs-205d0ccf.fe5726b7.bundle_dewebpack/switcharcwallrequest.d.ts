/**
 * Module: SwitchArcWallRequest
 * Provides functionality to switch walls between straight and arc types
 */

import { Vector2, Polygon, MathAlg } from './MathLibrary';
import { HSCore } from './HSCore';

/**
 * Interface for wall geometry data stored before transformation
 */
interface WallBeforeData {
  curve: Curve2d;
  // Add other properties as needed
}

/**
 * Interface for opening update configuration
 */
interface OpeningUpdateConfig {
  wallCurve: Curve2d;
  openingPos: Vector2;
}

/**
 * Interface for content outline structure
 */
interface ContentOutline {
  outline: Vector2[];
  bound?: unknown;
  getAllCurves(): Curve2d[];
}

/**
 * Interface for current operation parameters logging
 */
interface OperationParams {
  activeSection: string;
  activeSectionName: string;
  clicksRatio: {
    id: string;
    name: string;
  };
}

/**
 * Base class for all curve types
 */
declare class Curve2d {
  getStartPt(): Vector2;
  getEndPt(): Vector2;
  getLength(): number;
  getRange(): { getLength(): number };
  getStartParam(): number;
  getParamAt(point: Vector2): number;
  getPtAt(param: number): Vector2;
  getTangentAt(param: number): Vector2;
  isArc2d(): boolean;
  getA?(): number; // Arc-specific method
}

/**
 * Wall content item that can be attached to wall faces
 */
type WallAttachableContent = 
  | Exclude<HSCore.Model.Content, HSCore.Model.CustomizedFeatureModel | HSCore.Model.NCustomizedSketchModel>;

/**
 * Request class to handle switching between straight and arc walls
 * Manages wall geometry transformation and updates all attached content
 */
export declare class SwitchArcWallRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _wall: HSCore.Model.Wall;
  private readonly _toArc: boolean;
  private readonly _wallAttachItemPosition: Map<WallAttachableContent, Vector2>;
  private readonly _allWallBeforeData: Map<string, WallBeforeData>;
  private readonly _changedWalls: Set<HSCore.Model.Wall>;
  private readonly _openingUpdater: Map<string, { update(): void }>;

  /**
   * Creates a new wall switching request
   * @param wall - The wall to be switched between straight and arc
   * @param toArc - True to convert to arc wall, false to convert to straight wall
   */
  constructor(wall: HSCore.Model.Wall, toArc: boolean);

  /**
   * Executes the wall switching operation
   * Transforms the wall curve, updates joints, and repositions all attached content
   * @returns Array containing the modified wall
   */
  onCommit(): HSCore.Model.Wall[];

  /**
   * Reverts the wall switching operation
   * Updates related slab openings geometry
   */
  onUndo(): void;

  /**
   * Reapplies the wall switching operation
   * Updates related slab openings geometry
   */
  onRedo(): void;

  /**
   * Calculates the offset outline loop for content positioning
   * @param content - Content with outline information
   * @param offset - Offset distance from the original outline (default: 0)
   * @returns Offset polygon representing the new outline
   */
  getContentOffsetOutLineLoop(content: ContentOutline, offset?: number): Polygon;

  /**
   * Calculates the sagitta (arc height) for content positioning
   * @param curve - The arc curve
   * @param tangent - Tangent vector at the point
   * @param content - Content item being positioned
   * @returns Sagitta value for positioning adjustment
   */
  getSagitta(curve: Curve2d, tangent: Vector2, content: ContentOutline): number;

  /**
   * Updates positions and rotations of all wall-attached content
   * Maps content from old curve to new curve maintaining relative positions
   * @param oldCurve - Original wall curve before transformation
   * @param newCurve - New wall curve after transformation
   */
  updateContentsPosition(oldCurve: Curve2d, newCurve: Curve2d): void;

  /**
   * Gets all parametric openings on changed walls
   * @returns Set of parametric opening instances
   */
  private _getPOpenings(): Set<HSCore.Model.ParametricOpening>;

  /**
   * Updates all openings affected by wall geometry changes
   * Creates updaters for openings and applies position corrections
   */
  private _updateOpenings(): void;

  /**
   * Indicates whether this operation can be recorded in transaction field
   * @returns Always returns true
   */
  canTransactField(): boolean;

  /**
   * Gets human-readable description of this operation
   * @returns Description string in Chinese
   */
  getDescription(): string;

  /**
   * Gets logging parameters for analytics
   * @returns Object containing operation category and identification
   */
  getCurrentParams(): OperationParams;

  /**
   * Gets the operation category for logging
   * @returns Wall operation category constant
   */
  getCategory(): string;
}