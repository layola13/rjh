/**
 * Export floorplan command parameters
 */
export interface ExportFloorplanParams {
  /** Camera visibility toggle */
  cameraVisible?: boolean;
  /** Grid visibility toggle */
  gridVisible?: boolean;
  /** Cabinet door visibility toggle */
  cabinetDoorVisible?: boolean;
  /** Drawer panel visibility toggle */
  drawerPanelVisible?: boolean;
  /** Background visibility toggle */
  backgroundVisible?: boolean;
  /** Dimension lines visibility toggle */
  dimensionVisible?: boolean;
  /** Room area labels visibility toggle */
  roomAreaVisible?: boolean;
  /** Room type labels visibility toggle */
  roomTypeVisible?: boolean;
  /** Furniture visibility toggle */
  furnitureVisible?: boolean;
  /** Customized furniture visibility toggle */
  customizedFurnitureVisible?: boolean;
  /** Customized accessory visibility toggle */
  customizedAccessoryVisible?: boolean;
}

/**
 * Export format options
 */
export interface ExportOptions {
  /** Export image format (e.g., 'png', 'jpg') */
  format: string;
  /** Export image width in pixels */
  width: number;
  /** Export image height in pixels */
  height: number;
  /** Whether to center the view */
  center: boolean;
}

/**
 * Export command payload
 */
export interface ExportCommandPayload {
  /** Export parameters */
  params: ExportOptions;
  /** Callback function to invoke after export completes */
  callback: (result?: unknown) => void;
}

/**
 * View box coordinates and dimensions
 */
export interface ViewBox {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Width */
  width: number;
  /** Height */
  height: number;
}

/**
 * Saved view settings for restoration
 */
interface SavedViewSettings extends Partial<Record<ViewSettingKey, boolean>> {
  /** Saved view box state */
  viewBox?: ViewBox;
}

/**
 * Valid view setting keys
 */
type ViewSettingKey =
  | 'cameraVisible'
  | 'gridVisible'
  | 'cabinetDoorVisible'
  | 'drawerPanelVisible'
  | 'backgroundVisible'
  | 'dimensionVisiable'
  | 'roomAreaVisible'
  | 'roomTypeVisible'
  | 'furnitureVisible'
  | 'customizedFurnitureVisible'
  | 'customizedAccessoryVisible'
  | 'ceilingLightVisible'
  | 'ceilingVisible';

/**
 * Command for exporting floorplan with customizable view settings.
 * Extends the base HSApp Command class.
 * 
 * @remarks
 * This command handles:
 * - Toggling various view elements (camera, grid, furniture, etc.)
 * - Exporting 2D thumbnails with specified dimensions
 * - Saving and restoring view state during operations
 * - Managing selection state and layer ordering
 */
export default class ExportFloorplanCommand extends HSApp.Cmd.Command {
  /** Command parameters for view customization */
  params: ExportFloorplanParams;

  /** Cached view settings for restoration after command execution */
  private _savedViewSettings?: SavedViewSettings;

  /** Cached selection state for restoration */
  private _savedSelection?: unknown[];

  /**
   * Creates an instance of ExportFloorplanCommand
   * @param params - View settings to apply during export
   */
  constructor(params?: ExportFloorplanParams);

  /**
   * Indicates whether this command supports undo/redo functionality
   * @returns Always false - export operations cannot be undone
   */
  canUndoRedo(): boolean;

  /**
   * Executes the command: saves state, updates view, and prepares for export
   */
  onExecute(): void;

  /**
   * Handles messages received by the command
   * @param event - Event type ('parametersChanged', 'export', or custom)
   * @param payload - Event payload data
   */
  onReceive(event: string, payload: ExportFloorplanParams | ExportCommandPayload): void;

  /**
   * Cleanup operations: restores original view settings and selection state
   */
  onCleanup(): void;

  /**
   * Updates the application view based on provided parameters
   * @param params - View settings to apply
   * @private
   */
  private _updateView(params: ExportFloorplanParams): void;

  /**
   * Exports the floorplan as a 2D thumbnail
   * @param options - Export format and dimensions
   * @param callback - Callback invoked after export completion
   * @private
   */
  private _export(options: ExportOptions, callback: (result?: unknown) => void): void;

  /**
   * Returns list of all view setting keys affected by this command
   * @returns Array of setting key names
   * @private
   */
  private _getAffectedSettingKeys(): ViewSettingKey[];

  /**
   * Saves current view settings and viewbox state for later restoration
   * @private
   */
  private _saveViewSettings(): void;

  /**
   * Restores previously saved view settings and viewbox state
   * @private
   */
  private _restoreViewSettings(): void;

  /**
   * Clears current selection and caches it for restoration
   * @private
   */
  private _clearSelection(): void;

  /**
   * Restores previously saved selection state
   * @private
   */
  private _restoreSelection(): void;

  /**
   * Moves room dimension gizmos to the temporary top layer for export
   * @private
   */
  private _moveRoomDimensionOnTopLayer(): void;

  /**
   * Restores room dimension gizmos to their original floor layer
   * @private
   */
  private _restoreRoomDimensionLayer(): void;
}