/**
 * Bay Window Dimension Gizmo
 * Provides interactive dimension editing for bay window elements
 */

import { Vec2 } from 'HSCore.Util.Math';
import { LinearDimension, LinearDimensionStateEnum } from 'HSApp.View.SVG';
import { Gizmo } from 'HSApp.View.SVG';
import { DisplayController } from 'HSApp.View.Base';
import { DimensionTypeEnum } from 'HSApp.App';
import { CommandType } from 'HSFPConstants';
import { ModelClass } from 'HSConstants';

/**
 * Dimension offset constants
 */
declare const DIMENSION_OFFSET = 20;
declare const DIMENSION_TEXT_OFFSET = 0;

/**
 * Data structure for a single dimension
 */
export interface DimensionData {
  /** Starting point of the dimension line */
  start: Vec2;
  /** Ending point of the dimension line */
  end: Vec2;
  /** Position where dimension text should be displayed */
  textPosition: Vec2;
  /** Minimum allowed value */
  min: number;
  /** Maximum allowed value */
  max: number;
  /** Whether the dimension is in an invalid state */
  invalid: boolean;
  /** Whether the dimension direction is inverted */
  inverted: boolean;
}

/**
 * Complete dimension data for all bay window dimensions
 */
export interface BayWindowDimensionData {
  /** Left side dimension (from wall to window) */
  left: DimensionData;
  /** Right side dimension (from window to wall) */
  right: DimensionData;
  /** Bay window side A dimension */
  bayADim: DimensionData;
  /** Bay window side B dimension */
  bayBDim: DimensionData;
}

/**
 * Bay window entity with dimension properties
 */
export interface BayWindowEntity {
  /** Entity type identifier */
  type: string;
  /** Hosting wall or parent element */
  _host?: unknown;
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Side A length */
  sideA: number;
  /** Side B length */
  sideB: number;
  /** Parts information including bounding boxes */
  partsInfo: {
    boundings: {
      innerBound: Array<{ x: number; y: number }>;
    };
  };
  
  /** Get the host wall or parent element */
  getHost(): unknown;
  /** Check if entity is instance of a specific class */
  instanceOf(className: string): boolean;
  /** Get valid range data for window sides */
  getSideRangeData(): {
    sideBRange: { min: number; max: number };
    sideCRange: { min: number; max: number };
  };
  /** Signal emitted when entity becomes dirty */
  signalDirty: unknown;
}

/**
 * Application context for gizmo rendering
 */
export interface GizmoContext {
  application: {
    /** Application settings */
    appSettings: {
      dimensionType: DimensionTypeEnum;
      signalValueChanged: unknown;
    };
    /** Command manager for executing actions */
    cmdManager: {
      signalCommandSuspending: unknown;
      signalCommandTerminating: unknown;
      createCommand(type: string, args: unknown[]): unknown;
      execute(command: unknown, options?: unknown): void;
      complete(): void;
      receive(event: string, data: unknown): void;
    };
    signalViewActivated: unknown;
  };
}

/**
 * Value change commit event data
 */
export interface ValueChangeCommitEvent {
  data: {
    /** The gizmo that triggered the change */
    gizmo: LinearDimension;
    /** New dimension value */
    value: number;
    /** Previous dimension value */
    oldValue: number;
  };
}

/**
 * Bay Window Dimension Gizmo
 * Manages interactive dimension editing for bay windows with four editable dimensions:
 * - Left/Right: Position along the wall
 * - Bay A/B: Bay window geometry dimensions
 */
export default class BayWindowDimension extends Gizmo {
  /** Gizmo type identifier */
  readonly type = 'hsw.view.svg.gizmo.BayWindowDimension';
  
  /** Offset distance for dimension lines from the model (in screen units) */
  readonly kDimensionOffset = 20;
  
  /** Offset distance for dimension text from dimension line */
  readonly kDimensionTextOffset = 0;
  
  /** Left side dimension gizmo (from wall start to window) */
  leftDim: LinearDimension;
  
  /** Right side dimension gizmo (from window to wall end) */
  rightDim: LinearDimension;
  
  /** Bay window side A dimension gizmo */
  bayADim: LinearDimension;
  
  /** Bay window side B dimension gizmo */
  bayBDim: LinearDimension;
  
  /** Currently focused dimension */
  activeDim?: LinearDimension;
  
  /** Default dimension to activate */
  defaultActiveDim?: LinearDimension;
  
  /** Controller for handling dimension edit commands */
  controller: BayWindowDimensionController;
  
  /** Current dimension type (inner/center/outer) */
  dimensionType?: DimensionTypeEnum;
  
  /** Whether gizmo needs redrawing */
  gizmoDirty: boolean;
  
  /** Associated bay window entity */
  entity: BayWindowEntity;
  
  /** Rendering context */
  context: GizmoContext;
  
  /** Signal management hook */
  signalHook: unknown;
  
  /** Child gizmo items */
  childItems: LinearDimension[];

  /**
   * Creates a bay window dimension gizmo
   * @param context - Rendering context
   * @param entity - Bay window entity to edit
   * @param options - Additional options
   */
  constructor(context: GizmoContext, entity: BayWindowEntity, options: unknown);

  /**
   * Activates the gizmo and sets up event listeners
   */
  onActivate(): void;

  /**
   * Deactivates the gizmo and removes event listeners
   */
  onDeactivate(): void;

  /**
   * Cleans up resources when gizmo is destroyed
   */
  onCleanup(): void;

  /**
   * Updates gizmo visibility and state based on entity
   */
  update(): void;

  /**
   * Renders the gizmo and child dimensions
   */
  draw(): void;

  /**
   * Sets the currently focused dimension
   * @param dimension - Dimension to activate (must not be disabled)
   */
  setActiveDimension(dimension: LinearDimension): void;

  /**
   * Finds the wall that hosts this bay window
   * @returns The hosting wall, or undefined if not found
   */
  findReferenceWall(): unknown | undefined;

  /**
   * Handles application setting changes
   * @param event - Setting change event
   */
  private _onSettingChanged(event: { data: { fieldName: string; value: unknown } }): void;

  /**
   * Handles dimension value change commits
   * @param event - Value change event
   */
  private _onValueChangeCommit(event: ValueChangeCommitEvent): void;

  /**
   * Handles switching between dimensions (e.g., Tab key)
   * Cycles through dimensions in order: bayA → left → right → bayB → bayA
   */
  private _onInputSwitching(): void;

  /**
   * Updates all child dimension gizmos with computed positions and constraints
   */
  private _updateChildGizmo(): void;

  /**
   * Computes dimension data for all child gizmos
   * @param referenceWall - The wall hosting the bay window
   * @returns Dimension data for all four dimensions, or undefined if computation fails
   */
  private _computeDimensionData(referenceWall: unknown): BayWindowDimensionData | undefined;
}

/**
 * Controller for bay window dimension editing commands
 * Handles user interactions and dispatches appropriate commands
 */
export declare class BayWindowDimensionController extends DisplayController {
  /** The gizmo this controller manages */
  gizmo: BayWindowDimension;
  
  /** Currently active edit command */
  private _editCmd?: unknown;
  
  /** Currently active move command */
  private _moveCmd?: unknown;
  
  /** Command manager reference */
  private _cmdMgr: GizmoContext['application']['cmdManager'];
  
  /** Associated entity */
  entity: BayWindowEntity;

  /**
   * Creates a bay window dimension controller
   * @param context - Application context
   * @param entity - Bay window entity
   * @param gizmo - Associated gizmo instance
   */
  constructor(context: GizmoContext, entity: BayWindowEntity, gizmo: BayWindowDimension);

  /**
   * Dispatches commands based on user actions
   * @param action - Action type ('editBayWindow' or 'editLocationDimension')
   * @param entity - Target entity
   * @param event - Event data containing dimension change information
   */
  dispatch(action: 'editBayWindow' | 'editLocationDimension', entity: BayWindowEntity, event: ValueChangeCommitEvent): void;

  /**
   * Launches a command to edit the bay window
   * @param commandType - Type of command to execute
   * @param controller - Controller instance
   * @param eventData - Event data with new dimension values
   * @param options - Additional command options
   * @returns The created command
   */
  private _launchCmd(
    commandType: string,
    controller: BayWindowDimensionController,
    eventData: ValueChangeCommitEvent['data'],
    options?: unknown
  ): unknown;
}