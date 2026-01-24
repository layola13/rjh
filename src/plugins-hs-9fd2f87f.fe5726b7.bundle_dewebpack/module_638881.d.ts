/**
 * Gizmo factory for customized modeling plugin
 * Handles creation of command-specific gizmos for 2D canvas views
 */

import { GizmoFactory as BaseGizmoFactory } from 'HSApp.View.Base';
import { MoveRoomAttachedGizmo } from './MoveRoomAttachedGizmo';

/**
 * Context interface for gizmo operations
 */
interface IGizmoContext {
  // Add specific context properties based on usage
  [key: string]: unknown;
}

/**
 * Canvas interface representing a 2D view
 */
interface ICanvas {
  /** Rendering context for the canvas */
  context: CanvasRenderingContext2D | unknown;
  /** Display layers for rendering */
  displayLayers: {
    /** Temporary layer for transient graphics */
    temp: unknown;
    [key: string]: unknown;
  };
}

/**
 * Command output structure
 */
interface ICommandOutput {
  /** Content data for the command */
  content?: unknown;
  [key: string]: unknown;
}

/**
 * Command interface for gizmo creation
 */
interface ICommand {
  /** Type of command being executed */
  type: string;
  /** Output data from command execution */
  output: ICommandOutput;
}

/**
 * Base gizmo interface
 */
interface IGizmo {
  // Add gizmo-specific methods and properties
}

/**
 * Application interface
 */
interface IApp {
  /** Get the currently active 2D view */
  getActive2DView(): ICanvas | null;
}

/**
 * Gizmo factory for customized modeling operations
 * Creates appropriate gizmos based on command types
 */
export class GizmoFactory extends BaseGizmoFactory {
  private readonly _context: IGizmoContext;
  private readonly _canvas: ICanvas;

  /**
   * Creates a new GizmoFactory instance
   * @param canvas - The 2D canvas view to operate on
   * @param context - Context data for gizmo operations
   */
  constructor(canvas: ICanvas, context: IGizmoContext) {
    super(canvas);
    this._context = context;
  }

  /**
   * Creates a gizmo for the given command
   * @param command - The command to create a gizmo for
   * @returns Array of created gizmos (empty if not applicable)
   */
  public createCommandGizmo(command: ICommand): IGizmo[] {
    const app: IApp = HSApp.App.getApp();
    
    // Only create gizmos for the active 2D view
    if (this._canvas !== app.getActive2DView()) {
      return [];
    }

    const canvas = this._canvas;
    const context = canvas.context;
    const tempLayer = canvas.displayLayers.temp;

    let gizmo: IGizmo | undefined;

    // Create MoveRoomAttachedGizmo for move content or place product commands
    const isMoveCommand = 
      command.type === HSFPConstants.CommandType.MoveContent ||
      command.type === HSFPConstants.CommandType.PlaceProduct;
    
    const hasContent = command.output.content ?? command.output;

    if (isMoveCommand && hasContent) {
      gizmo = new MoveRoomAttachedGizmo(context, tempLayer, command);
    }

    return gizmo ? [gizmo] : [];
  }
}

/**
 * Module namespace for customized modeling plugin
 */
declare namespace hsw.plugin.customizedmodeling {
  export { GizmoFactory };
}