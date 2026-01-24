/**
 * Handler for outdoor drawing environment
 * Manages drawing commands, requests, and UI interactions for outdoor drawing mode
 */

import type { HSCore } from './HSCore';
import type { HSApp } from './HSApp';
import type { CmdDrawLines } from './commands/CmdDrawLines';
import type { CmdDrawRectangle } from './commands/CmdDrawRectangle';
import type { CmdDrawRegularPolygon } from './commands/CmdDrawRegularPolygon';
import type { CmdDrawCircle } from './commands/CmdDrawCircle';
import type { CmdAddSplitPoints } from './commands/CmdAddSplitPoints';
import type { CmdAddGuideLines } from './commands/CmdAddGuideLines';
import type { CmdClearGuideLines } from './commands/CmdClearGuideLines';
import type { CmdDrawFillet } from './commands/CmdDrawFillet';
import type { CmdDeleteVertex } from './commands/CmdDeleteVertex';
import type { CmdMovePoint } from './commands/CmdMovePoint';
import type { CmdMoveCurve } from './commands/CmdMoveCurve';
import type { CmdMoveFaces } from './commands/CmdMoveFaces';
import type { DrawLineRequest } from './requests/DrawLineRequest';
import type { DrawRectangleRequest } from './requests/DrawRectangleRequest';
import type { DrawPolygonsRequest } from './requests/DrawPolygonsRequest';
import type { DrawRegularPolygonRequest } from './requests/DrawRegularPolygonRequest';
import type { DrawCircleRequest } from './requests/DrawCircleRequest';
import type { AddSplitPointRequest } from './requests/AddSplitPointRequest';
import type { AddGuideLineRequest } from './requests/AddGuideLineRequest';
import type { DeleteGuideLineRequest } from './requests/DeleteGuideLineRequest';
import type { DrawFilletRequest } from './requests/DrawFilletRequest';
import type { DeleteVertexRequest } from './requests/DeleteVertexRequest';
import type { MovePointRequest } from './requests/MovePointRequest';
import type { MoveCurveRequest } from './requests/MoveCurveRequest';
import type { OutdoorDrawingEnvironment } from './OutdoorDrawingEnvironment';

/**
 * Event data for selection change events
 */
interface SelectionChangedEventData {
  event?: MouseEvent;
}

/**
 * Event data for right-click menu customization
 */
interface RightMenuCustomizedEventData {
  /** Default menu items */
  defaultItems: MenuItem[];
  /** Customized menu items */
  customizedItems: MenuItem[];
}

/**
 * Menu item configuration
 */
interface MenuItem {
  /** Display label */
  label: string;
  /** Unique identifier */
  id: string;
  /** Icon source */
  src: string;
  /** Display order */
  order: number;
  /** UI modes where item is visible */
  uiMode: HSFPConstants.UIMode[];
  /** Whether item is disabled */
  disable?: boolean;
  /** Click handler */
  onClick: () => void;
}

/**
 * Event data for property bar population
 */
interface PropertyBarEventData {
  // Property bar configuration data
}

/**
 * Event data for status bar population
 */
interface StatusBarEventData {
  /** IDs of items to ignore */
  ignoredItemIds: PropertyBarControlTypeEnum[];
}

/**
 * Transaction event data
 */
interface TransactionEventData {
  request: unknown;
}

/**
 * Plugin dependencies map
 */
type PluginDependencies = Record<HSFPConstants.PluginType, any>;

/**
 * Main handler class for outdoor drawing environment
 * Manages commands, requests, UI state, and user interactions
 */
export declare class Handler {
  /** Signal hook for event listening */
  private _signalHook?: HSCore.Util.SignalHook;
  
  /** Main application instance */
  private _app?: HSApp.App;
  
  /** Plugin dependencies */
  private _dependencies?: PluginDependencies;
  
  /** ID of the previous environment before entering outdoor drawing */
  private _fromEnvironmentId?: HSFPConstants.Environment;
  
  /** Previous 2D view mode before entering outdoor drawing */
  private _prevEnv2DViewMode?: HSApp.View.ViewModeEnum;

  /**
   * Gets plugin dependencies
   */
  get dependencies(): PluginDependencies | undefined;

  /**
   * Initializes the handler with application and dependencies
   * @param app - Main application instance
   * @param dependencies - Plugin dependencies map
   */
  init(app: HSApp.App, dependencies: PluginDependencies): void;

  /**
   * Registers all drawing commands with the command manager
   */
  registerCommands(): void;

  /**
   * Registers all drawing requests with the transaction manager
   */
  registerRequests(): void;

  /**
   * Handles selection change events
   * Updates UI based on selected sketch elements
   * @param event - Selection changed event data
   */
  private _onSelectionChanged(event: { data: SelectionChangedEventData }): void;

  /**
   * Initializes the outdoor drawing environment
   */
  private _initEnviroment(): void;

  /**
   * Enters outdoor drawing environment
   * @param layer - Active layer to work on
   */
  enterEnvironment(layer: HSCore.Model.Layer): void;

  /**
   * Exits outdoor drawing environment and restores previous state
   */
  exitEnvironment(): void;

  /**
   * Populates customized right-click context menu items
   * @param event - Menu population event data
   */
  private _onPopulateRightmenuCustomized(event: { data: RightMenuCustomizedEventData }): void;

  /**
   * Populates property bar for selected elements
   * @param event - Property bar population event data
   */
  private _onPopulatePropertyBar(event: { data: PropertyBarEventData }): void;

  /**
   * Populates status bar and hides specific widgets
   * @param event - Status bar population event data
   */
  private _onPopulateStatusBar(event: { data: StatusBarEventData }): void;

  /**
   * Listens to transaction state changes (commit, undo, redo)
   */
  private _listenStateChanged(): void;

  /**
   * Cancels current command during undo/redo operations
   */
  private _cancelCmdOnRootTransSession(): void;

  /**
   * Switches view to 2D plane mode
   */
  private _switchTo2DViewPlane(): void;

  /**
   * Registers hotkeys for delete operations
   */
  registerHotkeys(): void;

  /**
   * Unregisters hotkeys for delete operations
   */
  unregisterHotkeys(): void;

  /**
   * Registers mouse event callback with left menu plugin
   * @param callback - Mouse event callback function
   */
  registerLeftMenuMouseEvent(callback: (event: MouseEvent) => void): void;

  /**
   * Unregisters mouse event callback from left menu plugin
   * @param callback - Mouse event callback function
   */
  unregisterLeftMenuMouseEvent(callback: (event: MouseEvent) => void): void;

  /**
   * Saves current state via persistence plugin
   */
  onApplySave(): void;

  /**
   * Handles delete key press
   * Deletes currently selected sketch model
   */
  onDelete(): void;

  /**
   * Deletes a sketch model (guideline, face, or vertex)
   * @param interactiveModel - Interactive model to delete
   * @param checkValidity - Whether to validate deletion before executing (default: true)
   */
  deleteSketchModel(
    interactiveModel: HSApp.ExtraordinarySketch2d.InteractiveModel,
    checkValidity?: boolean
  ): void;

  /**
   * Starts drawing lines command
   */
  onAddLine(): void;

  /**
   * Starts drawing rectangle command
   */
  onAddRect(): void;

  /**
   * Starts drawing regular polygon command
   */
  onAddPolygon(): void;

  /**
   * Starts drawing circle command
   */
  onAddCircle(): void;

  /**
   * Starts drawing fillet command
   */
  onFillet(): void;

  /**
   * Starts adding guideline command
   */
  onAddGuideLine(): void;

  /**
   * Clears all guidelines from sketch
   */
  onClearGuideLines(): void;

  /**
   * Activates measure tool (2D or 3D based on current view)
   */
  onMeasureTool(): void;

  /**
   * Initializes UI state when entering environment
   * Hides layer editor and left status bar
   */
  private _InitUIs(): void;

  /**
   * Restores UI state when exiting environment
   * Shows layer editor and left status bar
   */
  private _destroyUIs(): void;
}