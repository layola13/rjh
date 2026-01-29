/**
 * Parametric opening dimension gizmo for displaying and editing opening dimensions in 2D view
 */

import { HSApp } from './HSApp';
import { HSConstants } from './HSConstants';
import { HSCore } from './HSCore';
import { HSMath } from './HSMath';
import { HSFPConstants } from './HSFPConstants';
import { SVGDimensionType } from './SVGDimensionType';

/**
 * State enum for linear dimension display
 */
type LinearDimensionStateEnum = typeof HSApp.View.SVG.LinearDimensionStateEnum;

/**
 * Information about a single dimension line
 */
interface DimensionInfo {
  /** Reference parameter name */
  refParam: string;
  /** 3D line geometry */
  line: HSMath.Line3;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
}

/**
 * 2D view data containing dimension information
 */
interface View2DData {
  /** Array of dimension metadata */
  dimensionInfos?: DimensionInfo[];
}

/**
 * Computed dimension data for rendering
 */
interface ComputedDimensionData {
  /** Start point in 2D space */
  start: HSMath.Vector2;
  /** End point in 2D space */
  end: HSMath.Vector2;
  /** Position for dimension text */
  textPosition: HSMath.Vector2;
  /** Minimum allowed value */
  min: number;
  /** Maximum allowed value */
  max: number;
  /** Whether dimension value is invalid */
  invalid: boolean;
  /** Whether dimension should be drawn inverted */
  inverted: boolean;
}

/**
 * Event data for value change commit
 */
interface ValueChangeCommitEventData {
  /** The gizmo that changed */
  gizmo: HSApp.View.SVG.LinearDimension;
  /** New value */
  value: number;
  /** Previous value */
  oldValue: number;
}

/**
 * Event data for setting changes
 */
interface SettingChangedEventData {
  /** Name of the setting field */
  fieldName: string;
  /** New value */
  value: unknown;
}

/**
 * Event data for dispatch
 */
interface DispatchEventData {
  /** Original value change event */
  event: { data: ValueChangeCommitEventData };
  /** Related dimension info */
  dimInfo: DimensionInfo;
}

/**
 * Command event data
 */
interface CommandEventData {
  /** Command instance */
  cmd?: unknown;
}

/**
 * Parametric opening dimension gizmo
 * Displays editable dimension lines for parametric openings (doors, windows) in 2D view
 */
export declare class ParametricOpeningDimension extends HSApp.View.SVG.Gizmo {
  /** Source dimension metadata */
  dimension: DimensionInfo[];
  
  /** Linear dimension child gizmos */
  dims: HSApp.View.SVG.LinearDimension[];
  
  /** Whether gizmo needs redrawing */
  gizmoDirty: boolean;
  
  /** Currently focused dimension */
  activeDim?: HSApp.View.SVG.LinearDimension;
  
  /** Current dimension display type */
  dimensionType: unknown;
  
  /** Controller for handling dimension edits */
  controller: ParametricOpeningDimensionController;
  
  /** Offset distance for dimension lines from geometry (in pixels) */
  private readonly kDimensionOffset: number;
  
  /** Offset for dimension text from dimension line (in pixels) */
  private readonly kDimensionTextOffset: number;

  /**
   * Creates a new parametric opening dimension gizmo
   * @param parent - Parent display object
   * @param view - SVG view instance
   * @param entity - The parametric opening entity
   */
  constructor(
    parent: HSApp.View.Base.DisplayObject,
    view: HSApp.View.SVG.View,
    entity: HSApp.Model.Entity
  );

  /**
   * Returns the unique type identifier for this gizmo
   */
  static uniqueType(): SVGDimensionType;

  /**
   * Returns the unique type identifier for this instance
   */
  type(): SVGDimensionType;

  /**
   * Called when gizmo is activated
   * Sets up event listeners for entity changes, settings, and dimension edits
   */
  onActivate(): void;

  /**
   * Called when gizmo is deactivated
   * Cleans up all event listeners
   */
  onDeactivate(): void;

  /**
   * Called when gizmo is being destroyed
   * Clears dimension arrays
   */
  onCleanup(): void;

  /**
   * Updates gizmo visibility based on entity state
   * Shows gizmo if entity has a host, hides otherwise
   */
  update(): void;

  /**
   * Draws the gizmo if dirty
   * Updates child dimension gizmos with computed positions
   */
  draw(): void;

  /**
   * Sets the active (focused) dimension
   * @param dim - Dimension to activate
   */
  private _setActiveDimension(dim: HSApp.View.SVG.LinearDimension): void;

  /**
   * Finds the wall that hosts this parametric opening
   * @returns The host wall entity, or undefined if not found
   */
  private _findReferenceWall(): HSApp.Model.Entity | undefined;

  /**
   * Handles application setting changes
   * @param event - Setting change event
   */
  private _onSettingChanged(event: { data: SettingChangedEventData }): void;

  /**
   * Handles dimension value change commits
   * Dispatches edit command if value actually changed
   * @param event - Value change event
   */
  private _onValueChangeCommit(event: { data: ValueChangeCommitEventData }): void;

  /**
   * Handles Tab key input switching between dimensions
   * Cycles focus to next dimension in sequence
   */
  private _onInputSwitching(): void;

  /**
   * Updates child dimension gizmos with computed positions and constraints
   */
  private _updateChildGizmo(): void;

  /**
   * Computes dimension data from entity's 3D geometry
   * Transforms 3D lines to 2D screen space
   * @returns Array of computed dimension data, or undefined if entity is invalid
   */
  private _computeDimensionData(): ComputedDimensionData[] | undefined;
}

/**
 * Controller for handling parametric opening dimension edits
 * Creates and manages edit commands when dimension values change
 */
declare class ParametricOpeningDimensionController extends HSApp.View.Base.DisplayController {
  /** Associated dimension gizmo */
  gizmo: ParametricOpeningDimension;
  
  /** Current edit command */
  cmd?: unknown;

  /**
   * Creates a new controller
   * @param entity - The parametric opening entity
   * @param parent - Parent display object
   * @param gizmo - Associated dimension gizmo
   */
  constructor(
    entity: HSApp.Model.Entity,
    parent: HSApp.View.Base.DisplayObject,
    gizmo: ParametricOpeningDimension
  );

  /**
   * Dispatches dimension edit command
   * @param eventName - Event name (unused)
   * @param entity - The parametric opening entity
   * @param data - Event data containing dimension info and new value
   */
  dispatch(
    eventName: string,
    entity: HSApp.Model.Entity,
    data: DispatchEventData
  ): void;
}