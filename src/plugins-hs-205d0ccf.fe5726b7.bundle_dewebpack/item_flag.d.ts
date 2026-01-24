/**
 * Item flag constants and toolbar status management
 * @module ITEM_FLAG
 */

/**
 * Edit operation flags for item actions
 */
export const ITEM_FLAG = Object.freeze({
  /** Flag for replace operation */
  FLAG_EDIT_REPLEASE: 1,
  /** Flag for cut operation */
  FLAG_EDIT_CUT: 2,
  /** Flag for copy operation */
  FLAG_EDIT_COPY: 4,
  /** Flag for paste operation */
  FLAG_EDIT_PASTE: 8,
  /** Flag for duplicate operation */
  FLAG_EDIT_DUPLATE: 16,
  /** Flag for mirror/flip operation */
  FLAG_EDIT_MIRROR: 32,
  /** Flag for group operation */
  FLAG_EDIT_GROUP: 64,
  /** Flag for ungroup operation */
  FLAG_EDIT_UNGROUP: 128,
  /** Flag for hide operation */
  FLAG_EDIT_HIDE: 256,
  /** Flag for reset operation */
  FLAG_EDIT_RESET: 512,
  /** Flag for delete operation */
  FLAG_EDIT_DELETE: 1024,
  /** Flag for empty furniture operation */
  FLAG_EDIT_EMPLETY_FURNITURE: 2048,
  /** Flag for empty floorplan operation */
  FLAG_EDIT_EMPLETY_FLOORPLAN: 4096,
} as const);

/**
 * Status flags for different content types and selection states
 */
export const ITEM_STATUS = Object.freeze({
  /** Status when no content is selected */
  FLAG_STATUS_NONE_CONTENT_SELECT: 6144,
  /** Status for common content selection */
  FLAG_STATUS_COMMON_CONTENT_SELECT: 7999,
  /** Status for DIY content */
  FLAG_STATUS_DIY_CONTENT: 7999,
  /** Status for wall content */
  FLAG_STATUS_WALL_CONTENT: 7424,
  /** Status for opening content (doors, windows) */
  FLAG_STATUS_OPENING_CONTENT: 7967,
  /** Status for room content */
  FLAG_STATUS_ROOM_CONTENT: 7168,
  /** Status for custom content */
  FLAG_STATUS_CUSTOM_CONTENT: 7486,
  /** Status for multiple selection */
  FLAG_STATUS_MULTISELECT: 7518,
  /** Status for group selection */
  FLAG_STATUS_GROUP_SELECT: 7615,
  /** Status for corner window */
  FLAG_STATUS_CORNER_WINDOW: 7967,
  /** Status for wall face selection */
  FLAG_STATUS_WALL_FACE_SELECT: 7936,
  /** Status for room face selection */
  FLAG_STATUS_ROOM_FACE_SELECT: 7680,
  /** Status for floorplan cabinet */
  FLAG_STATUS_FP_CABINET: 1301,
} as const);

/**
 * Application instance interface
 */
interface IHSApp {
  selectionManager: ISelectionManager;
  activeEnvironmentId: string;
}

/**
 * Selection manager interface
 */
interface ISelectionManager {
  selected(): IModelItem[];
}

/**
 * Base model item interface
 */
interface IModelItem {
  metadata?: IMetadata;
}

/**
 * Metadata interface for model items
 */
interface IMetadata {
  categories?: unknown[];
}

/**
 * Toolbar item interface
 */
interface IToolbarItem {
  enable(): void;
  disable(): void;
}

/**
 * Toolbar controller interface
 */
interface IToolbarController {
  _getItemOnDefaultToolbar(itemPath: string): IToolbarItem | null;
}

/**
 * Toolbar item identifiers
 */
type ToolbarItemId =
  | 'toolBar_edit_replace'
  | 'toolBar_edit_copy'
  | 'toolBar_edit_cut'
  | 'toolBar_edit_flip'
  | 'toolBar_edit_duplicate'
  | 'toolBar_edit_hide'
  | 'toolBar_edit_delete'
  | 'toolBar_edit_emptyFurniture'
  | 'toolBar_edit_group'
  | 'toolBar_edit_ungroup';

/**
 * Manages toolbar status based on item selection and flags
 */
export default class ItemFlagManager {
  /**
   * Updates toolbar status based on current selection
   * @param toolbarController - The toolbar controller instance
   */
  static updateToolbarStatus(toolbarController: IToolbarController): void;

  /**
   * Determines the edit case flags based on current selection
   * @param app - The application instance
   * @returns Status flags representing available operations
   */
  static getEditCase(app: IHSApp): number;

  /**
   * Updates toolbar item statuses based on provided flags
   * @param toolbarController - The toolbar controller instance
   * @param statusFlags - Bitwise flags indicating which operations are available
   */
  static updateStatues(
    toolbarController: IToolbarController,
    statusFlags?: number
  ): void;

  /**
   * Sets the enabled/disabled state of a specific toolbar item
   * @param toolbarController - The toolbar controller instance
   * @param itemId - The toolbar item identifier
   * @param enabled - Whether the item should be enabled
   */
  static setStatus(
    toolbarController: IToolbarController,
    itemId: ToolbarItemId,
    enabled: boolean
  ): void;
}

export { ITEM_FLAG, ITEM_STATUS };