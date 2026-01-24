/**
 * Module: GizmoFactory
 * Creates and manages gizmos for 2D sketch selection and manipulation
 */

import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

/**
 * Factory class for creating interactive gizmos in the 2D sketch canvas.
 * Handles selection gizmos for different geometry types (faces, edges, points).
 */
export class GizmoFactory extends HSApp.View.Base.GizmoFactory {
  private _app: HSApp.Application;
  private _canvas: HSApp.Canvas;

  /**
   * Creates a new GizmoFactory instance
   * @param canvas - The canvas element where gizmos will be rendered
   * @param app - The main application instance
   */
  constructor(canvas: HSApp.Canvas, app: HSApp.Application);

  /**
   * Creates selection gizmos for the currently selected entities.
   * Supports creating dimension and reshape gizmos for:
   * - 2D faces (with reshape capability)
   * - Edges (lines and circular arcs)
   * - 2D points
   * 
   * @param selectedEntities - Array of selected entities (currently only processes arrays of length 1)
   * @returns Array of created gizmo instances
   */
  createSelectionGizmo(selectedEntities: unknown[]): HSApp.View.Base.Gizmo[];

  /**
   * Checks whether the gizmo factory is currently active.
   * Gizmos are inactive when the canvas context is frozen.
   * 
   * @returns true if the context is not frozen, false otherwise
   */
  isActive(): boolean;
}

/**
 * Namespace containing gizmo-related types
 */
declare namespace HSApp.ExtraordinarySketch2d.Gizmo {
  /**
   * Gizmo for reshaping 2D faces by manipulating vertices
   */
  class ReshapeFace2d extends HSApp.View.Base.Gizmo {
    constructor(
      context: HSApp.RenderContext,
      layer: HSApp.DisplayLayer,
      faces: Array<{ srcModel: HSCore.Model.ExtraordinaryFace2d }>
    );
  }

  /**
   * Gizmo for displaying and editing 2D face dimensions
   */
  class Face2dDimension extends HSApp.View.Base.Gizmo {
    constructor(
      context: HSApp.RenderContext,
      layer: HSApp.DisplayLayer,
      selection: { srcModel: HSCore.Model.ExtraordinaryFace2d }
    );
  }

  /**
   * Gizmo for displaying and editing 2D line dimensions
   */
  class Line2dDimension extends HSApp.View.Base.Gizmo {
    constructor(
      context: HSApp.RenderContext,
      layer: HSApp.DisplayLayer,
      selection: { srcModel: HSCore.Model.ExtraordinaryEdge }
    );
  }

  /**
   * Gizmo for displaying and editing circular arc dimensions
   */
  class Arc2dDimension extends HSApp.View.Base.Gizmo {
    constructor(
      context: HSApp.RenderContext,
      layer: HSApp.DisplayLayer,
      selection: { srcModel: HSCore.Model.ExtraordinaryEdge }
    );
  }

  /**
   * Gizmo for displaying 2D point coordinates
   */
  class Point2dDimension extends HSApp.View.Base.Gizmo {
    constructor(
      context: HSApp.RenderContext,
      layer: HSApp.DisplayLayer,
      selection: { srcModel: HSCore.Model.ExtraordinaryPoint2d }
    );
  }
}

/**
 * Gizmo for displaying dimensions of background (reference) edges
 */
declare class BackgroundEdgeDimension extends HSApp.View.Base.Gizmo {
  constructor(
    context: HSApp.RenderContext,
    layer: HSApp.DisplayLayer,
    selection: { srcModel: HSCore.Model.ExtraordinaryEdge }
  );
}

/**
 * Namespace for core geometry model types
 */
declare namespace HSCore.Model {
  /**
   * Represents a 2D face (closed region) in the sketch
   */
  class ExtraordinaryFace2d {}

  /**
   * Represents an edge (curve segment) in the sketch
   */
  class ExtraordinaryEdge {
    /** The underlying curve geometry of this edge */
    curve: ExtraordinaryLine2d | ExtraordinaryCircleArc2d;
    /** Whether this edge is a background/reference element */
    isBackground: boolean;
  }

  /**
   * Represents a 2D line segment
   */
  class ExtraordinaryLine2d {}

  /**
   * Represents a circular arc in 2D space
   */
  class ExtraordinaryCircleArc2d {}

  /**
   * Represents a 2D point
   */
  class ExtraordinaryPoint2d {}
}

/**
 * Application-level types
 */
declare namespace HSApp {
  interface Application {
    /** Manages entity selection state */
    selectionManager: SelectionManager;
  }

  interface Canvas {
    /** The rendering context */
    context: RenderContext;
    /** Layered display management */
    displayLayers: DisplayLayers;
  }

  interface RenderContext {
    /** Whether the context is frozen (non-interactive) */
    frozen: boolean;
  }

  interface DisplayLayers {
    /** Temporary drawing layer for transient graphics */
    temp: DisplayLayer;
  }

  interface DisplayLayer {}

  interface SelectionManager {
    /**
     * Gets the currently selected entities
     * @returns Array of selected entities with their source models
     */
    selected(): Array<SelectionEntry>;
  }

  interface SelectionEntry {
    /** The underlying model object for this selection */
    srcModel: 
      | HSCore.Model.ExtraordinaryFace2d 
      | HSCore.Model.ExtraordinaryEdge 
      | HSCore.Model.ExtraordinaryPoint2d;
  }

  namespace View.Base {
    /**
     * Base class for all gizmo implementations
     */
    class Gizmo {}

    /**
     * Base factory class for creating gizmos
     */
    class GizmoFactory {
      constructor(canvas: Canvas);
    }
  }
}