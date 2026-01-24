/**
 * Module: BackgroundEdgeDimension
 * Represents a dimension gizmo for background edges in the sketch editor.
 * Manages dimension measurements for edges and their connected neighbors.
 */

import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { MathAlg } from './MathAlg';

/**
 * Enum representing the state of a linear dimension in the SVG view.
 */
declare enum LinearDimensionStateEnum {
  editable = 'editable',
  disabled = 'disabled',
  // Add other states as needed
}

/**
 * Interface for dimension gizmos that can be attached to entities.
 */
interface IDimensionGizmo {
  /** The entity this gizmo is attached to */
  entity: HSCore.Model.Edge2d;
  /** Minimum allowed value for the dimension */
  min: number;
  /** Maximum allowed value for the dimension */
  max: number;
  /** Event handler for value changes */
  valueChanged?: IEventHandler;
  /** Updates the state of the dimension */
  updateState(state: LinearDimensionStateEnum, value: boolean): void;
  /** Clears the dimension display */
  clear(): void;
}

/**
 * Event handler interface for dimension value changes.
 */
interface IEventHandler {
  listen(callback: Function, context: any): void;
  unlistenAll(): void;
}

/**
 * Data payload for dimension value change events.
 */
interface IDimensionValueChangeData {
  /** The gizmo that triggered the change */
  gizmo: IDimensionGizmo;
  /** New dimension value */
  value: number;
  /** Previous dimension value */
  oldValue: number;
}

/**
 * Event object for dimension value changes.
 */
interface IDimensionValueChangeEvent {
  data: IDimensionValueChangeData;
}

/**
 * 2D vector representing a coordinate offset.
 */
interface IVector2d {
  x: number;
  y: number;
}

/**
 * Manager for gizmos in the canvas.
 */
interface IGizmoManager {
  getAllGizmos(): IDimensionGizmo[];
  removeGizmo(gizmo: IDimensionGizmo): void;
}

/**
 * Canvas interface containing the gizmo manager.
 */
interface ICanvas {
  gizmoManager: IGizmoManager;
}

/**
 * BackgroundEdgeDimension class extends Line2dDimension to manage
 * dimension measurements for background edges and their neighbors.
 * 
 * This gizmo displays measurements for edges that are adjacent to the
 * currently selected edge, allowing users to see and edit related dimensions.
 */
export declare class BackgroundEdgeDimension extends HSApp.ExtraordinarySketch2d.Gizmo.Line2dDimension {
  /**
   * Collection of dimension gizmos that existed before this edit operation.
   * These dimensions are preserved and reused rather than recreated.
   */
  private _backgroundDimensions: IDimensionGizmo[];

  /**
   * Canvas containing the gizmo manager.
   */
  protected canvas: ICanvas;

  /**
   * The current edge being dimensioned.
   */
  protected edge: HSCore.Model.Edge2d;

  /**
   * The curve geometry of the current edge.
   */
  protected curve: HSCore.Model.ExtraordinaryLine2d | HSCore.Model.ExtraordinaryCircleArc2d;

  /**
   * Sketch builder for accessing the sketch model.
   */
  protected sketchBuilder: any;

  /**
   * Interactive model for creating modification commands.
   */
  protected interactiveModel: any;

  /**
   * Map of dimension gizmos keyed by edge ID.
   */
  protected dimensions: Record<string, IDimensionGizmo>;

  /**
   * Constructs a new BackgroundEdgeDimension gizmo.
   * 
   * @param canvas - The canvas containing the gizmo manager
   * @param edge - The edge to dimension
   * @param interactiveModel - The interactive model for commands
   */
  constructor(canvas: ICanvas, edge: HSCore.Model.Edge2d, interactiveModel: any);

  /**
   * Gets an existing dimension gizmo for an edge or creates a new one.
   * Existing gizmos from background dimensions are reused and configured.
   * 
   * @param edge - The edge to get or create a dimension for
   * @returns The dimension gizmo for the edge
   */
  private _getOrCreateEditDimension(edge: HSCore.Model.Edge2d): IDimensionGizmo;

  /**
   * Cleans up all dimension gizmos when the edit operation ends.
   * Background dimensions are reset to non-editable state.
   * New dimensions created during editing are removed from the canvas.
   */
  onCleanup(): void;

  /**
   * Updates all dimension displays for the current edge and its neighbors.
   * Finds edges connected to the endpoints of the current edge and
   * activates dimensions for them if they don't overlap.
   */
  updateDimensions(): void;

  /**
   * Activates or updates a dimension for a specific edge.
   * 
   * @param edge - The edge to activate dimension for
   * @param isEditable - Whether the dimension should be user-editable
   */
  private _activeDimension(edge: HSCore.Model.Edge2d, isEditable: boolean): void;

  /**
   * Handles dimension value change events from user interaction.
   * Calculates the offset needed to apply the dimension change and
   * creates a command to execute the modification.
   * 
   * @param event - The dimension value change event
   */
  dimensionValueChangeCommit(event: IDimensionValueChangeEvent): void;

  /**
   * Removes dimension gizmos that are no longer needed.
   * 
   * @param activeEdges - List of edges that should keep their dimensions
   */
  private _removeUnusedDimension(activeEdges: HSCore.Model.Edge2d[]): void;

  /**
   * Updates the position of dimension displays.
   * 
   * @param edge - The edge whose dimension position should be updated
   */
  private _updatePositionDimension(edge: HSCore.Model.Edge2d): void;

  /**
   * Creates a command to modify the geometry based on dimension changes.
   * 
   * @param offset - The 2D offset to apply to the geometry
   * @param model - The interactive model to execute the command on
   */
  private _createCommand(offset: IVector2d, model: any): void;
}