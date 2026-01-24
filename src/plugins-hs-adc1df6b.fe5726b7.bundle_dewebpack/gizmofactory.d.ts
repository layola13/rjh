import { HSApp } from './518193';
import { HSCore } from './635589';

/**
 * Factory class for creating gizmos in the 2D sketch canvas.
 * Gizmos are visual aids for dimension display and face reshaping during selection.
 */
export declare class GizmoFactory extends HSApp.View.Base.GizmoFactory {
  /**
   * Reference to the main application instance.
   * @private
   */
  private _app: unknown;

  /**
   * Reference to the canvas instance where gizmos are rendered.
   * @private
   */
  private _canvas: {
    context: {
      frozen: boolean;
      [key: string]: unknown;
    };
    displayLayers: {
      temp: unknown;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };

  /**
   * Constructs a new GizmoFactory instance.
   * @param canvas - The canvas element or wrapper where gizmos will be displayed
   * @param app - The main application instance providing selection and context
   */
  constructor(canvas: unknown, app: unknown);

  /**
   * Creates appropriate gizmo instances based on the current selection.
   * 
   * Generates dimension gizmos for selected entities:
   * - Face2dDimension for ExtraordinaryFace2d
   * - Line2dDimension or BackgroundEdgeDimension for ExtraordinaryEdge with Line2d curve
   * - Arc2dDimension for ExtraordinaryEdge with CircleArc2d curve
   * - Point2dDimension for ExtraordinaryPoint2d
   * - ReshapeFace2d for single face selection
   * 
   * @param entities - Array of selected entities (must have length 1 to generate gizmos)
   * @returns Array of instantiated gizmo objects for rendering
   */
  createSelectionGizmo(entities: unknown[]): Array<
    | HSApp.ExtraordinarySketch2d.Gizmo.Face2dDimension
    | HSApp.ExtraordinarySketch2d.Gizmo.Arc2dDimension
    | HSApp.ExtraordinarySketch2d.Gizmo.Point2dDimension
    | typeof import('./695815').BackgroundEdgeDimension
    | typeof import('./495143').Line2dDimension
    | typeof import('./755518').ReshapeFace2d
  >;

  /**
   * Determines whether the factory is currently active.
   * Factory is active when the canvas context is not frozen.
   * 
   * @returns true if the canvas context is not frozen, false otherwise
   */
  isActive(): boolean;
}