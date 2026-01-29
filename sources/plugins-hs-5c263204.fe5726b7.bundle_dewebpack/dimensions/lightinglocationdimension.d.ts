/**
 * Module: LightingLocationDimension
 * Original ID: 942493
 * Exports: LightingLocationDimension
 */

import { ContentDimension } from './ContentDimension';
import { LightingLocationHelper } from './LightingLocationHelper';

/**
 * Point representation in 3D space
 */
export interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Linear dimension gizmo data structure
 */
export interface LinearDimensionGizmoData {
  /** Starting point of the dimension line */
  startPoint: Point3D;
  /** Ending point of the dimension line */
  endPoint: Point3D;
}

/**
 * Light dimension information
 */
export interface LightDimensionInfo {
  /** Origin point of the light dimension */
  from: Point3D;
  /** Target point of the light dimension */
  to: Point3D;
}

/**
 * Dimension data returned by lighting alignment helper
 */
export interface DimensionData {
  /** Array of light dimension information */
  lightDimensionInfo?: LightDimensionInfo[];
  /** Extended helper linear data */
  extendsHelperLinearData?: unknown;
}

/**
 * Setting change event data
 */
export interface SettingChangedEventData {
  /** Name of the field that changed */
  fieldName?: string;
  /** Name of the setting */
  name?: string;
  /** Previous value before change */
  oldValue?: unknown;
  /** New value after change */
  value?: unknown;
}

/**
 * Event object for setting changes
 */
export interface SettingChangedEvent {
  data: SettingChangedEventData;
}

/**
 * Lighting location dimension gizmo for visualizing lighting alignment in the scene.
 * Extends ContentDimension to provide dimension visualization for lighting locations.
 */
export declare class LightingLocationDimension extends ContentDimension {
  /** Type identifier for the lighting location dimension gizmo */
  readonly type: 'hsw.view.svg.gizmo.LightingLocationDimension';

  /** Helper utility for calculating lighting alignment dimensions */
  protected lightingAlignmentHelper: LightingLocationHelper;

  /** Indicates whether the dimension is currently enabled */
  protected isEnable: boolean;

  /** Collection of linear dimension gizmo data to render */
  protected linearDimensionGizmoDatas: LinearDimensionGizmoData[];

  /** Extended helper linear data for advanced dimension rendering */
  protected extendsHelperLinearData?: unknown;

  /**
   * Creates a new lighting location dimension gizmo
   * @param param1 - First constructor parameter (inherited from ContentDimension)
   * @param param2 - Second constructor parameter (inherited from ContentDimension)
   * @param context - Context object used to initialize the lighting location helper
   */
  constructor(param1: unknown, param2: unknown, context: unknown);

  /**
   * Handles setting change events to update dimension visibility
   * @param event - Setting change event containing field name and values
   * @internal
   */
  protected _onSettingChanged(event: SettingChangedEvent): void;

  /**
   * Updates the enabled state of the dimension gizmo
   */
  updateIsEnable(): void;

  /**
   * Computes child gizmo information from lighting alignment helper
   * Populates linearDimensionGizmoDatas and extendsHelperLinearData
   */
  computeChildGizmoInfo(): void;

  /**
   * Updates the dimension visualization
   * @internal
   */
  protected update(): void;
}