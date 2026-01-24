/**
 * Command for creating polygon tangent walls in the floor plan editor.
 * This command allows users to draw polygon-shaped rooms by creating walls along the polygon edges.
 */

import type { Command } from 'HSApp.Cmd';
import type { Polygon, Curve } from 'HSCore.Geometry';
import type { WallMode } from 'HSCore.Model';
import type { KeyCodes } from 'HSApp.Util.Keyboard';
import type { CreatePolygonTgWallGizmo } from './gizmos';
import type { Canvas2D, Context, DisplayLayer, GizmoManager } from './canvas';
import type { TransactionManager, Request } from './transaction';
import type { PluginManager, Plugin } from './plugin';
import type { SelectionManager } from './selection';
import type { AppSettings, SettingChangeEvent } from './settings';
import type { FloorPlan, Scene, Layer } from './floorplan';

/**
 * Settings interface for wall creation
 */
export interface WallSettings {
  /** Width of the wall in units */
  wallWidth: number;
  /** Wall positioning mode (Inner/Outer/Center) */
  wallMode: WallMode;
  /** Whether the wall is load-bearing */
  wallIsBearing: boolean;
  /** Save settings to persistent storage */
  save(): void;
}

/**
 * Parameters for updating wall settings
 */
export interface WallSettingUpdateParams {
  /** Optional: Whether the wall is load-bearing */
  wallIsBearing?: boolean;
  /** Optional: Width of the wall */
  wallWidth?: number;
  /** Optional: Wall positioning mode */
  wallMode?: WallMode;
}

/**
 * Event data for command receive events
 */
export interface CommandEventData {
  /** Mouse event data */
  event?: MouseEvent;
  /** Keyboard key code */
  keyCode?: KeyCodes;
  /** Array of curves for wall creation */
  curves?: Curve[];
}

/**
 * Application context interface
 */
export interface AppContext {
  /** Transaction manager for undo/redo operations */
  transManager: TransactionManager;
  /** The main application instance */
  app: {
    /** Selection manager for selecting entities */
    selectionManager: SelectionManager;
    /** Global application settings */
    appSettings: AppSettings;
    /** Plugin manager for accessing plugins */
    pluginManager: PluginManager;
    /** Current floor plan */
    floorplan: FloorPlan;
    /** Active rendering environment */
    activeEnvironment?: Canvas2D;
    /** Get the active 2D view canvas */
    getActive2DView(): Canvas2D;
  };
}

/**
 * Command for creating polygon-shaped tangent walls.
 * Extends the base Command class to provide polygon room drawing functionality.
 */
export declare class CmdCreatePolygonTgWall extends Command {
  /**
   * The polygon geometry defining the room shape
   */
  polygon: Polygon;

  /**
   * The 2D gizmo used for interactive drawing
   * @private
   */
  private _gizmo?: CreatePolygonTgWallGizmo;

  /**
   * Application context containing managers and services
   */
  context: AppContext;

  /**
   * Creates a new polygon tangent wall command
   * @param polygon - The polygon geometry to create walls from
   */
  constructor(polygon: Polygon);

  /**
   * Gets the wall settings utility
   */
  get setting(): WallSettings;

  /**
   * Executes the command, initializing the gizmo and listeners
   */
  onExecute(): void;

  /**
   * Handles command events from user interactions
   * @param eventType - Type of event (e.g., "click", "keydown", "gizmo.drawRoom")
   * @param eventData - Event-specific data
   * @returns True if the event was handled, false otherwise
   */
  onReceive(eventType: string, eventData: CommandEventData): boolean;

  /**
   * Handles keyboard input during command execution
   * @param keyCode - The keyboard key code
   */
  onKeyDown(keyCode: KeyCodes): void;

  /**
   * Processes wall creation request with the given curves
   * @param curves - Array of curves representing wall paths
   */
  doRequest(curves: Curve[]): void;

  /**
   * Gets the active 2D canvas for drawing
   * @returns The active Canvas2D instance
   */
  getCanvas2d(): Canvas2D | undefined;

  /**
   * Creates and initializes the 2D gizmo for interactive drawing
   */
  createGizmo(): void;

  /**
   * Creates the 2D gizmo instance
   * @param canvas - The canvas to attach the gizmo to
   * @returns The created gizmo instance
   * @private
   */
  private _create2DGizmo(canvas: Canvas2D): CreatePolygonTgWallGizmo;

  /**
   * Destroys and removes the gizmo from the canvas
   */
  destroyGizmo(): void;

  /**
   * Cleans up resources when the command is finished
   */
  onCleanup(): void;

  /**
   * Gets the localized description of this command
   * @returns Command description string
   */
  getDescription(): string;

  /**
   * Gets the logging category for this command
   * @returns The log group type
   */
  getCategory(): string;

  /**
   * Updates wall creation settings
   * @param params - Parameters to update (wallIsBearing, wallWidth, wallMode)
   */
  updateSetting(params?: WallSettingUpdateParams): void;

  /**
   * Callback for global settings changes
   * @param event - The settings change event
   * @private
   */
  private _updateByGlobal(event: SettingChangeEvent): void;
}