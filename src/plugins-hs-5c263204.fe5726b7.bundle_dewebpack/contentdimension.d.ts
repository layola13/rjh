/**
 * ContentDimension Module
 * Provides dimension measurement and gizmo visualization for content entities in a 2D/3D space
 */

import { HSCore } from 'path-to-hscore';
import { BaseDimension } from './BaseDimension';

/**
 * Data structure for linear dimension gizmo configuration
 */
export interface LinearDimensionGizmoData {
  /** Starting point of dimension line */
  start: { x: number; y: number };
  /** Ending point of dimension line */
  end: { x: number; y: number };
  /** Current dimension value in meters */
  value: number;
  /** Previous value before update */
  oldValue: number;
  /** Reference to the gizmo instance */
  gizmo: unknown;
}

/**
 * Boundary box element attributes for SVG rendering
 */
export interface BoundaryBoxAttributes {
  /** Left position in meters */
  x: number;
  /** Top position in meters (inverted Y-axis) */
  y: number;
  /** Width in meters */
  width: number;
  /** Height in meters */
  height: number;
}

/**
 * Content entities that can be dimensioned
 */
export type DimensionableContent =
  | HSCore.Model.NCustomizedStructure
  | HSCore.Model.NCustomizedBeam
  | HSCore.Model.Opening
  | HSCore.Model.ParametricOpening
  | HSCore.Model.NgContent;

/**
 * Main dimension visualization controller for content entities
 * Manages interactive measurement gizmos and helper visualizations
 */
export declare class ContentDimension extends BaseDimension {
  /** Type identifier for the dimension class */
  static readonly type: 'hsw.view.svg.gizmo.ContentDimension';
  
  /** Logger instance for debugging */
  static readonly logger: Logger;

  /** Collection of linear dimension gizmo data */
  protected linearDimensionGizmoDatas: LinearDimensionGizmoData[];
  
  /** Collection of child dimension items */
  protected childItems: unknown[];
  
  /** Helper box visualization elements */
  protected BoundaryboxElement: SVGElement[];
  
  /** Data for boundary box helper lines */
  protected boxHelpLineData: DimensionableContent[];
  
  /** Data for outline helper visualization */
  protected outlineHelpData: unknown;

  /**
   * Creates a new ContentDimension controller
   * @param context - Rendering context with application state
   * @param entity - The content entity to measure
   * @param options - Additional configuration options
   */
  constructor(
    context: unknown,
    entity: DimensionableContent,
    options: unknown
  );

  /**
   * Checks if content is inside a hidden room
   * @returns True if content is in a hidden ceiling environment
   */
  protected _isContentInHiddenRoom(): boolean;

  /**
   * Updates all dimension gizmos for visible content
   * Skips update if content is in hidden room, frozen, or not in a valid layer
   */
  protected _updateGizmos(): void;

  /**
   * Updates helper box visualizations for each boundary element
   * Converts pixel coordinates to meters and applies coordinate transformations
   */
  protected _updateHelperBoxs(): void;

  /**
   * Updates a single child gizmo with new dimension data
   * @param gizmoData - The gizmo configuration to update
   * @param childItem - The child item being measured
   */
  protected _updateChildGizmo(
    gizmoData: LinearDimensionGizmoData,
    childItem: unknown
  ): void;

  /**
   * Updates helper line visualizations
   * Should be overridden in subclasses for specific implementations
   */
  protected _updateHelperLinears(): void;

  /**
   * Draws outline helper visualization
   * @param data - Outline visualization data
   */
  protected drawOutlineHelpData(data: unknown): void;

  /**
   * Computes gizmo information for child elements
   * Abstract method that must be implemented by subclasses
   * @throws Warning if not overridden
   */
  computeChildGizmoInfo(): void;
}

/**
 * Display controller that handles dimension value changes and entity movement
 * Dispatches commands to update entity positions based on dimension modifications
 */
declare class ContentDimensionDisplayController extends HSApp.View.Base.DisplayController {
  /** The content entity being controlled */
  protected entity: DimensionableContent;
  
  /** Rendering context */
  protected context: unknown;

  /**
   * Creates a new display controller
   * @param context - Rendering context
   * @param entity - The entity to control
   */
  constructor(context: unknown, entity: DimensionableContent);

  /**
   * Handles dimension change events and updates entity position
   * @param event - Event containing old and new dimension values
   * 
   * Workflow:
   * 1. Calculates delta between new and old values
   * 2. Converts delta to movement vector
   * 3. Creates appropriate move command based on entity type
   * 4. Executes command and updates entity position
   * 5. Cleans up and removes temporary gizmos
   */
  dispatch(event: {
    data: {
      /** New dimension value in meters */
      value: number;
      /** Previous dimension value in meters */
      oldValue: number;
      /** Associated gizmo data */
      gizmo: LinearDimensionGizmoData;
    };
  }): void;
}

/**
 * Logger interface for debugging
 */
interface Logger {
  warning(message: string): void;
  info(message: string): void;
  error(message: string): void;
}

/**
 * Constants for unit conversion
 */
declare namespace HSFPConstants.Constants {
  /** Conversion factor from pixels to meters */
  const PIXEL_TO_M_FACTOR: number;
}

/**
 * Command types for entity manipulation
 */
declare namespace HSFPConstants.CommandType {
  const MoveStructure: string;
  const MoveBeam: string;
  const MoveOpening: string;
  const MoveContent: string;
}

/**
 * Model class identifiers
 */
declare namespace HSConstants.ModelClass {
  const NgContent: string;
}