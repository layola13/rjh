/**
 * Corner Window Dimension Gizmo and Controller
 * Provides visual dimension controls for corner window positioning on walls
 */

import type { Application } from './Application';
import type { Entity } from './Entity';
import type { Context } from './Context';
import type { Signal } from './Signal';
import type { CommandManager, Command } from './CommandManager';
import type { AppSettings } from './AppSettings';

/**
 * State of a linear dimension display
 */
declare enum LinearDimensionStateEnum {
  editable = 'editable',
  focus = 'focus',
  disabled = 'disabled',
  invalid = 'invalid',
}

/**
 * Data structure for dimension positioning and constraints
 */
interface DimensionData {
  /** Start point of dimension line */
  start: THREE.Vector2;
  /** End point of dimension line */
  end: THREE.Vector2;
  /** Position for dimension text label */
  textPosition: THREE.Vector2;
  /** Minimum allowed value */
  min: number;
  /** Maximum allowed value */
  max: number;
  /** Whether dimension is in invalid state */
  invalid: boolean;
  /** Whether dimension direction is inverted */
  inverted: boolean;
}

/**
 * Complete dimension data for all four corners
 */
interface CornerDimensionDataSet {
  corenerADim: DimensionData;
  corenerBDim: DimensionData;
  corenerCDim: DimensionData;
  corenerDDim: DimensionData;
}

/**
 * Range constraints for corner window sides
 */
interface SideRangeData {
  sideARange: { min: number; max: number };
  sideBRange: { min: number; max: number };
  sideCRange: { min: number; max: number };
  sideDRange: { min: number; max: number };
}

/**
 * Corner window entity with positioning info
 */
interface CornerWindowEntity extends Entity {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Host wall or parent element */
  _host?: Entity;
  /** Parts bounding information */
  partsInfo: {
    boundings: {
      innerBound: Array<{ x: number; y: number }>;
    };
  };
  /** Get the host wall element */
  getHost(): Entity | undefined;
  /** Get side range constraints */
  getSideRangeData(): SideRangeData;
  /** Check if entity is instance of given class */
  instanceOf(className: string): boolean;
}

/**
 * Linear dimension visual component
 */
declare class LinearDimension extends HSApp.View.SVG.Gizmo {
  constructor(context: Context, parent: unknown, entity: Entity);
  
  /** Start point of dimension */
  start: THREE.Vector2;
  /** End point of dimension */
  end: THREE.Vector2;
  /** Text label position */
  textPosition: THREE.Vector2;
  /** Minimum constraint */
  min: number;
  /** Maximum constraint */
  max: number;
  /** Direction inversion flag */
  inverted: boolean;
  /** Current state */
  state: LinearDimensionStateEnum;
  
  /** Update dimension state */
  updateState(state: LinearDimensionStateEnum, value: boolean): void;
  
  /** Signal emitted when value change is committed */
  valueChangeCommit: Signal<{ value: number; oldValue: number; gizmo: LinearDimension }>;
  /** Signal emitted when switching between inputs */
  inputSwitching: Signal<void>;
  
  /** Check if element is a dimension input */
  static isDimensionInput(element: HTMLElement): boolean;
}

/**
 * Event data for value change
 */
interface ValueChangeEventData {
  value: number;
  oldValue: number;
  gizmo: LinearDimension;
}

/**
 * Event data for setting change
 */
interface SettingChangeEventData {
  fieldName: string;
  value: unknown;
}

/**
 * Gizmo for displaying and editing corner window dimensions
 * Shows four dimension controls for positioning a corner window on its host wall
 */
declare class CornerWindowDimensionGizmo extends HSApp.View.SVG.Gizmo {
  /**
   * @param context - Application context
   * @param parent - Parent view component
   * @param entity - Corner window entity to display dimensions for
   */
  constructor(context: Context, parent: unknown, entity: CornerWindowEntity);

  /** Gizmo type identifier */
  readonly type: 'hsw.view.svg.gizmo.CornerWindowDimension';
  
  /** Associated controller */
  controller: CornerWindowDimensionController;
  
  /** Dimension offset from wall edge in pixels */
  readonly kDimensionOffset: 24;
  
  /** Text label offset in pixels */
  readonly kDimensionTextOffset: 0;
  
  /** Dimension for corner A */
  corenerADim: LinearDimension;
  /** Dimension for corner B */
  corenerBDim: LinearDimension;
  /** Dimension for corner C */
  corenerCDim: LinearDimension;
  /** Dimension for corner D */
  corenerDDim: LinearDimension;
  
  /** Currently active/focused dimension */
  activeDim?: LinearDimension;
  
  /** Type of dimension display */
  dimensionType: string;
  
  /** Flag indicating gizmo needs redraw */
  gizmoDirty: boolean;
  
  /** Child gizmo items */
  childItems: LinearDimension[];
  
  /** The corner window entity */
  entity: CornerWindowEntity;
  
  /**
   * Called when gizmo is activated in the view
   * Sets up event listeners and initializes state
   */
  onActivate(): void;
  
  /**
   * Called when gizmo is deactivated
   * Cleans up event listeners
   */
  onDeactivate(): void;
  
  /**
   * Called during cleanup/disposal
   * Releases dimension references
   */
  onCleanup(): void;
  
  /**
   * Update gizmo visibility and state based on entity
   */
  update(): void;
  
  /**
   * Render the gizmo
   * Updates child dimensions if dirty
   */
  draw(): void;
  
  /**
   * Set the currently active/focused dimension
   * @param dimension - Dimension to activate
   */
  setActiveDimension(dimension: LinearDimension | undefined): void;
  
  /**
   * Find the wall that hosts this corner window
   * @returns The host wall entity or undefined
   */
  findReferenceWall(): Entity | undefined;
  
  /**
   * Handle application setting changes
   * @param event - Setting change event
   * @internal
   */
  _onSettingChanged(event: { data: SettingChangeEventData }): void;
  
  /**
   * Handle dimension value change commit
   * @param event - Value change event
   * @internal
   */
  _onValueChangeCommit(event: { data: ValueChangeEventData }): void;
  
  /**
   * Handle switching between dimension inputs (tab key)
   * @internal
   */
  _onInputSwitching(): void;
  
  /**
   * Update positions and constraints of child dimension gizmos
   * @internal
   */
  _updateChildGizmo(): void;
  
  /**
   * Compute dimension data for all four corners
   * @param wall - Reference wall entity
   * @returns Dimension data for all corners or undefined if invalid
   * @internal
   */
  _computeDimensionData(wall: Entity): CornerDimensionDataSet | undefined;
}

/**
 * Parameters for corner window edit command
 */
interface CornerWindowEditParams {
  sideA?: number;
  sideB?: number;
  sideC?: number;
  sideD?: number;
}

/**
 * Controller for corner window dimension gizmo
 * Handles user interactions and command dispatching
 */
declare class CornerWindowDimensionController extends HSApp.View.Base.DisplayController {
  /**
   * @param context - Application context
   * @param entity - Corner window entity
   * @param gizmo - Associated gizmo (set after construction)
   */
  constructor(context: Context, entity: CornerWindowEntity, gizmo?: CornerWindowDimensionGizmo);
  
  /** Associated gizmo instance */
  gizmo: CornerWindowDimensionGizmo;
  
  /** Current edit command being executed */
  _editCmd?: Command;
  
  /** Command manager reference */
  _cmdMgr: CommandManager;
  
  /**
   * Dispatch gizmo events to appropriate handlers
   * @param eventType - Type of event
   * @param entity - Target entity
   * @param eventData - Event data
   */
  dispatch(
    eventType: 'valueChangeStart' | 'valueChangeEnd' | 'valueChanged',
    entity: CornerWindowEntity,
    eventData: { data: ValueChangeEventData }
  ): void;
  
  /**
   * Launch an edit command for corner window modification
   * @param commandType - Command type identifier
   * @param controller - Controller instance
   * @param eventData - Value change event data
   * @param additionalParams - Optional additional parameters
   * @returns Created command instance
   * @internal
   */
  _launchCmd(
    commandType: string,
    controller: CornerWindowDimensionController,
    eventData: ValueChangeEventData,
    additionalParams?: unknown
  ): Command;
}

export default CornerWindowDimensionGizmo;
export { CornerWindowDimensionController };