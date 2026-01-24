/**
 * Module: BackgroundEdgeDimension
 * Provides dimension editing capabilities for background edges in sketch views
 */

import { HSApp } from './518193';
import { HSCore } from './635589';
import { MathAlg } from './815362';

/**
 * Linear dimension state enumeration
 */
type LinearDimensionStateEnum = HSApp.View.SVG.LinearDimensionStateEnum;

/**
 * Dimension gizmo interface
 */
interface IDimensionGizmo {
  /** Associated geometric entity */
  entity: any;
  /** Minimum allowed dimension value */
  min: number;
  /** Maximum allowed dimension value */
  max: number;
  /** Event fired when dimension value changes */
  valueChanged?: {
    listen(callback: (data: IDimensionChangeEvent) => void, context: any): void;
    unlistenAll(): void;
  };
  /** Update the visual state of the dimension */
  updateState(state: LinearDimensionStateEnum, enabled: boolean): void;
  /** Clear dimension visual representation */
  clear(): void;
}

/**
 * Dimension value change event data
 */
interface IDimensionChangeEvent {
  data: {
    /** New dimension value */
    value: number;
    /** Previous dimension value */
    oldValue: number;
    /** Gizmo instance that triggered the change */
    gizmo: {
      entity: {
        curve: {
          /** Start point of the curve */
          from: { x: number; y: number };
          /** End point of the curve */
          to: { x: number; y: number };
        };
      };
    };
  };
}

/**
 * Canvas with gizmo manager interface
 */
interface ICanvas {
  gizmoManager: {
    /** Retrieve all active gizmos */
    getAllGizmos(): IDimensionGizmo[];
    /** Remove a gizmo from the canvas */
    removeGizmo(gizmo: IDimensionGizmo): void;
  };
}

/**
 * Geometric curve interface
 */
interface ICurve {
  /** Start point of the curve */
  from: { x: number; y: number };
  /** End point of the curve */
  to: { x: number; y: number };
  /** Convert to mathematical curve representation */
  toMathCurve(): {
    clone(): {
      /** Extend curve by specified factor in both directions */
      extendDouble(factor: number): any;
    };
  };
}

/**
 * Edge entity interface
 */
interface IEdge {
  /** Unique identifier */
  id: string | number;
  /** Geometric curve of the edge */
  curve: ICurve;
}

/**
 * Sketch builder interface
 */
interface ISketchBuilder {
  sketchable: {
    /** Get the current sketch */
    getSketch(): any;
  };
}

/**
 * Interactive model interface for command creation
 */
interface IInteractiveModel {
  // Model-specific properties would be defined here
}

/**
 * Manages dimension gizmos for background edges in a 2D sketch view.
 * Extends the base Line2dDimension to provide specialized handling for
 * background edge dimensions, including automatic creation, positioning,
 * and user interaction.
 */
export declare class BackgroundEdgeDimension extends HSApp.ExtraordinarySketch2d.Gizmo.Line2dDimension {
  /**
   * Collection of dimension gizmos for background edges
   * @private
   */
  private _backgroundDimensions: IDimensionGizmo[];

  /**
   * Canvas instance containing the gizmo manager
   */
  protected canvas: ICanvas;

  /**
   * Currently active edge being dimensioned
   */
  protected edge: IEdge;

  /**
   * Geometric curve of the active edge
   */
  protected curve: ICurve;

  /**
   * Builder for sketch operations
   */
  protected sketchBuilder: ISketchBuilder;

  /**
   * Interactive model for command execution
   */
  protected interactiveModel: IInteractiveModel;

  /**
   * Collection of all dimension gizmos keyed by entity ID
   */
  protected dimensions: Record<string, IDimensionGizmo>;

  /**
   * Creates a new BackgroundEdgeDimension instance
   * @param canvas - Canvas containing the gizmo manager
   * @param sketchBuilder - Builder for sketch operations
   * @param interactiveModel - Model for interactive command execution
   */
  constructor(
    canvas: ICanvas,
    sketchBuilder: ISketchBuilder,
    interactiveModel: IInteractiveModel
  );

  /**
   * Retrieves an existing dimension gizmo for the entity or creates a new one.
   * Sets dimension constraints (min/max) based on wall length constants.
   * @param entity - The geometric entity to dimension
   * @returns The dimension gizmo instance
   * @private
   */
  private _getOrCreateEditDimension(entity: IEdge): IDimensionGizmo;

  /**
   * Cleans up all dimension gizmos when editing is complete.
   * Background dimensions are reset to non-editable state, while
   * temporary dimensions are removed from the canvas.
   */
  onCleanup(): void;

  /**
   * Updates all dimension gizmos based on the current edge selection.
   * Activates dimensions for the selected edge and adjacent connected edges,
   * removing any dimensions that are no longer relevant.
   */
  updateDimensions(): void;

  /**
   * Activates or updates a dimension gizmo for the specified edge.
   * @param edge - The edge to dimension
   * @param editable - Whether the dimension should be user-editable
   * @private
   */
  private _activeDimension(edge: IEdge, editable: boolean): void;

  /**
   * Handles dimension value changes from user interaction.
   * Calculates the offset vector and creates a command to apply the change.
   * @param event - Event data containing old and new dimension values
   */
  dimensionValueChangeCommit(event: IDimensionChangeEvent): void;

  /**
   * Removes dimension gizmos that are no longer associated with visible edges.
   * @param activeEdges - List of edges that should retain dimensions
   * @private
   */
  private _removeUnusedDimension(activeEdges: IEdge[]): void;

  /**
   * Updates the visual position of dimension gizmos for the specified edge.
   * @param edge - The edge whose dimension positions should be updated
   * @private
   */
  private _updatePositionDimension(edge: IEdge): void;

  /**
   * Creates and executes a command to modify the geometry based on dimension changes.
   * @param offset - 2D offset vector to apply
   * @param model - Interactive model to execute the command on
   * @private
   */
  private _createCommand(
    offset: { x: number; y: number },
    model: IInteractiveModel
  ): void;
}