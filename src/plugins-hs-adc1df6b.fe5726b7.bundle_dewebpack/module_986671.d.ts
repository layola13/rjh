/**
 * Molding Brush Plugin - Type Definitions
 * Provides material/molding sucking and brushing functionality in 3D view
 */

import type { HSApp } from './HSApp';
import type { HSCore } from './HSCore';
import type { HSFPConstants } from './HSFPConstants';

/**
 * Molding data structure containing entity and profile information
 */
interface MoldingData {
  entity: HSCore.Model.CustomizedModelMolding | HSCore.Model.NCustomizedModelMolding;
  profileData?: {
    iconImg?: string;
    iconSmallURI?: string;
    thumbnail?: string;
  };
  iconSmall?: string;
}

/**
 * Preview configuration for mini image display
 */
interface MiniImagePreviewConfig {
  icon: string;
}

/**
 * Mouse position coordinates
 */
interface Position {
  x: number;
  y: number;
}

/**
 * Entity interaction event data
 */
interface EntityEventData {
  entity?: HSCore.Model.CustomizedModelMolding | HSCore.Model.NCustomizedModelMolding;
  event?: MouseEvent | KeyboardEvent;
  mouseOver?: Array<{ viewObject?: unknown }>;
  keyCode?: number;
}

/**
 * Molding data with entity reference
 */
interface MoldingDataWithEntity {
  moldingData: MoldingData;
  entity: HSCore.Model.CustomizedModelMolding | HSCore.Model.NCustomizedModelMolding;
}

/**
 * Left menu item configuration
 */
interface LeftMenuItem {
  label: string;
  src: string;
  id: string;
  showHotKey?: boolean;
  onClick: () => void;
}

/**
 * Left menu population event data
 */
interface PopulateMenuEventData {
  data: {
    customizedItems: LeftMenuItem[];
  };
}

/**
 * Mini image preview controller
 * Handles the floating preview image when hovering over entities
 */
declare class MiniImagePreviewCtrl {
  constructor(config?: MiniImagePreviewConfig | false);
  
  /**
   * Initialize the preview controller
   */
  init(): void;
  
  /**
   * Render the preview at specified position
   * @param position - Screen coordinates for preview display
   */
  render(position: Position): void;
  
  /**
   * Clean up and destroy the preview controller
   */
  destroy(): void;
}

/**
 * Strategy interface for molding operations
 * Defines behavior for sucking and applying molding data
 */
interface MoldingBrushStrategy {
  /**
   * Strategy class name identifier
   */
  readonly ClassName: string;
  
  /**
   * Check if entity can have molding data sucked from it
   * @param viewObject - The 3D view object to check
   */
  isSuckable(viewObject: unknown): boolean;
  
  /**
   * Extract molding data from entity
   * @param entity - The entity event data
   */
  suck(entity: EntityEventData): MoldingData | false;
  
  /**
   * Check if molding data can be applied to entity
   * @param entity - The target entity event data
   * @param moldingData - The molding data to apply
   */
  isAppliable(entity: EntityEventData, moldingData: MoldingData | undefined): boolean;
  
  /**
   * Stop preview rendering if active
   */
  stopPreview?(): void;
}

/**
 * Plugin dependency map
 */
interface PluginDependencies {
  [HSFPConstants.PluginType.LeftMenu]: {
    hideLeftMenu(): void;
    signalPopulateCustomizedItems: HSCore.Util.Signal<PopulateMenuEventData>;
  };
}

/**
 * Molding brush command handler
 * Manages sucked molding data state
 */
interface MoldingBrushHandler {
  /**
   * Get currently sucked molding data
   */
  getSuckedMoldingData(): MoldingData | undefined;
  
  /**
   * Set molding data to be brushed
   * @param data - The molding data to store
   */
  setSuckedMoldingData(data: MoldingData): void;
  
  /**
   * Clear all sucked molding data
   */
  clearSuckedMoldingData(): void;
}

/**
 * Operation state enumeration
 */
declare enum StateEnum {
  /** Suck mode - extracting molding data from entities */
  Suck = 'Suck',
  /** Brush mode - applying molding data to entities */
  Brush = 'Brush'
}

/**
 * Cursor style definitions
 */
interface CursorStyles {
  /** Suck mode enabled cursor */
  suck_cursor: string;
  /** Suck mode disabled cursor */
  suck_disable_cursor: string;
  /** Brush mode enabled cursor */
  brush_cursor: string;
  /** Brush mode disabled cursor */
  brush_disable_cursor: string;
}

/**
 * MoldingBrush Plugin Command
 * 
 * Provides material/molding extraction (suck) and application (brush) functionality.
 * Users can extract material properties from one entity and apply them to others.
 * 
 * @remarks
 * - Suck State: Click on entity to extract molding data
 * - Brush State: Click on entities to apply the sucked molding data
 * - Press ALT to return to Suck state
 * - Right-click or ESC to cancel operation
 */
export default class MoldingBrushCommand extends HSApp.Cmd.Command {
  /**
   * State enumeration for command modes
   */
  static readonly StateEnum: typeof StateEnum;
  
  /**
   * Local storage key for "don't show again" preference
   */
  static readonly SUCK_AGAIN_NOT_SHOW_LIVEHINT: string;
  
  /**
   * First-time usage flag for live hint display
   * @internal
   */
  static _firstTime: boolean;
  
  /**
   * Plugin dependencies (left menu, etc.)
   * @private
   */
  private readonly _dependencies: PluginDependencies;
  
  /**
   * Molding data handler
   * @private
   */
  private readonly _handler: MoldingBrushHandler;
  
  /**
   * Current command state (Suck or Brush)
   * @private
   */
  private _cmdState: StateEnum | undefined;
  
  /**
   * Strategy pattern implementations for different entity types
   * @private
   */
  private _strategies: MoldingBrushStrategy[];
  
  /**
   * Left menu plugin reference
   * @private
   */
  private readonly _leftMenuPlugin: PluginDependencies[HSFPConstants.PluginType.LeftMenu];
  
  /**
   * Signal hook for event management
   * @private
   */
  private readonly _signalHook: HSCore.Util.SignalHook;
  
  /**
   * Signal dispatched when sucked molding data changes
   */
  readonly signalSuckedMoldingChanged: HSCore.Util.Signal<MoldingDataWithEntity>;
  
  /**
   * Cursor style definitions
   * @private
   */
  private readonly _cursors: CursorStyles;
  
  /**
   * Whether cursor is in enabled state
   * @private
   */
  private _cursorEnabled: boolean;
  
  /**
   * Mini image preview controller instance
   * @private
   */
  private miniImagePreviewCtrl: MiniImagePreviewCtrl | null;
  
  /**
   * Local storage instance for user preferences
   * @private
   */
  private readonly _localStorage: HSApp.Util.Storage;
  
  /**
   * Last captured key code data
   * @private
   */
  private _keyCodeData: EntityEventData | null | undefined;
  
  /**
   * @param dependencies - Plugin dependencies
   * @param handler - Molding data handler
   */
  constructor(dependencies: PluginDependencies, handler: MoldingBrushHandler);
  
  /**
   * Execute command - initialize and enter Suck state
   */
  onExecute(): void;
  
  /**
   * Handle input events (mouse, keyboard)
   * @param eventType - Event type identifier
   * @param eventData - Event data payload
   * @returns Whether event was handled
   */
  onReceive(eventType: string, eventData?: EntityEventData): boolean;
  
  /**
   * Cleanup when command ends
   */
  onCleanup(): void;
  
  /**
   * Resume command after being suspended
   */
  onResume(): void;
  
  /**
   * Complete command successfully
   */
  complete(): void;
  
  /**
   * Cancel command
   */
  cancel(): void;
  
  /**
   * Check if currently in Suck state
   */
  isSuckState(): boolean;
  
  /**
   * Check if currently in Brush state
   */
  isBrushState(): boolean;
  
  /**
   * Switch to Suck state
   */
  switchToSuckState(): void;
  
  /**
   * Switch to Brush state
   */
  switchToBrushState(): void;
  
  /**
   * Get current environment mode
   */
  getMode(): string;
  
  /**
   * Update cursor based on current state and enabled status
   * @private
   */
  private _updateCursor(): void;
  
  /**
   * Apply cursor style to 3D view
   * @param cursorStyle - CSS cursor style string or cursor enum
   * @private
   */
  private _updateViewCursor(cursorStyle: string | HSApp.View.CursorEnum): void;
  
  /**
   * Update hint display based on current state
   * @private
   */
  private _updateHint(): void;
  
  /**
   * Ensure canvas element has focus for keyboard input
   * @private
   */
  private _makeCanvasFocused(): void;
  
  /**
   * Initialize strategy instances for different entity types
   * @private
   */
  private _initStrategies(): void;
  
  /**
   * Transition to new command state
   * @param newState - Target state to switch to
   * @private
   */
  private _switchToNextState(newState: StateEnum): void;
  
  /**
   * Update cursor enabled/disabled state
   * @param enabled - Whether cursor should be enabled
   * @private
   */
  private _switchToEnableState(enabled: boolean): void;
  
  /**
   * Handle mouse hover over entities
   * @param eventData - Entity event data
   * @private
   */
  private _onEntityHovered(eventData: EntityEventData): void;
  
  /**
   * Handle entity selection click
   * @param eventData - Entity event data
   * @private
   */
  private _onEntitySelected(eventData: EntityEventData): void;
  
  /**
   * Extract molding data from entity using strategies
   * @param eventData - Entity event data
   * @returns Molding data or false if unsuckable
   * @private
   */
  private _suckMoldingData(eventData: EntityEventData): MoldingData | false;
  
  /**
   * Apply molding data to entity using strategies
   * @param eventData - Entity event data
   * @returns Whether application succeeded
   * @private
   */
  private _applyMoldingData(eventData: EntityEventData): boolean;
  
  /**
   * Populate left menu with command-specific items
   * @param event - Menu population event
   * @private
   */
  private _onPopulateLeftMenuItems(event: { data: PopulateMenuEventData['data'] }): void;
  
  /**
   * Destroy mini image preview controller
   * @private
   */
  private _destroyMiniImagePreview(): void;
  
  /**
   * Create mini image preview for molding data
   * @param data - Molding data with entity reference
   * @private
   */
  private _createMiniImagePreview(data: MoldingDataWithEntity): void;
  
  /**
   * Render mini image preview at event position
   * @param eventData - Entity event data with mouse position
   * @private
   */
  private _renderMiniImagePreview(eventData?: EntityEventData): void;
}