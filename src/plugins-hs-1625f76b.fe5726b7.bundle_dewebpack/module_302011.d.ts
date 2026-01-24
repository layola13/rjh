/**
 * Material replacement styler module for 3D content editing.
 * Provides UI and command management for replacing materials on 3D entities.
 */

import { App } from './app';
import { Handler } from './handler';
import { MenuPlugin } from './plugins/menuPlugin';
import { ToolbarPlugin } from './plugins/toolbarPlugin';
import { CatalogPlugin } from './plugins/catalogPlugin';
import { PageHeaderPlugin } from './plugins/pageHeaderPlugin';
import { ViewSwitchPlugin } from './plugins/viewSwitchPlugin';
import { ResizeWidgetPlugin } from './plugins/resizeWidgetPlugin';
import { ContextualToolsPlugin } from './plugins/contextualToolsPlugin';
import { SignalHook } from './util/signalHook';
import { RightPropertyBar } from './rightPropertyBar';
import { MaterialData } from './material/materialData';
import { Entity } from './entity';

/**
 * Configuration options for initializing the material replace styler.
 */
export interface MaterialReplaceStylerOptions {
  /** Main application instance */
  app: App;
  /** Event handler instance */
  handler: Handler;
  /** Menu plugin instance */
  menuPlugin: MenuPlugin;
  /** Toolbar plugin instance */
  toolbarPlugin: ToolbarPlugin;
  /** Catalog plugin instance */
  catalogPlugin: CatalogPlugin;
  /** Page header plugin instance */
  pageheaderPlugin: PageHeaderPlugin;
  /** View switch plugin instance */
  viewSwitchPlugin: ViewSwitchPlugin;
  /** Resize widget plugin instance */
  resizeWidgetPlugin: ResizeWidgetPlugin;
  /** Contextual tools plugin instance */
  contextualToolsPlugin: ContextualToolsPlugin;
}

/**
 * Signal event data for catalog item clicks.
 */
export interface CatalogItemClickEventData {
  /** Event data payload */
  data: unknown;
}

/**
 * Signal event data for left menu population.
 */
export interface MenuPopulateEventData {
  /** Event data containing menu items */
  data: {
    /** Default menu items array */
    defaultItems: unknown[];
  };
}

/**
 * Toolbar configuration structure.
 */
export interface ToolbarConfig {
  /** Items to add to toolbar */
  addItems: Array<[ToolbarItemConfig, string]>;
  /** Items to include from default toolbar */
  includeItems: string[];
}

/**
 * Individual toolbar item configuration.
 */
export interface ToolbarItemConfig {
  /** Item type (button, divider, etc.) */
  type: string;
  /** Display label for the item */
  label?: string;
  /** Unique identifier */
  name: string;
  /** Icon identifier */
  icon?: string;
  /** Tooltip text */
  tooltip?: string;
  /** Sort order */
  order: number;
  /** Click handler callback */
  onclick?: (event: unknown) => void;
}

/**
 * Page header button render configuration.
 */
export interface PageHeaderButtonConfig {
  /** Environment display name */
  envName: string;
  /** Secondary display name */
  secondName: string;
  /** CSS class for secondary name */
  secondClass: string;
  /** Click handler callback */
  handleClick: () => void;
}

/**
 * Page header complete button interface.
 */
export interface PageHeaderCompleteButton {
  /** Returns the React element for rendering */
  getRenderItem: () => React.ReactElement;
}

/**
 * Material replacement styler class.
 * Manages the material replacement workflow including UI state, material tracking,
 * and command execution for applying materials to 3D entities.
 */
export default class MaterialReplaceStyler {
  /** Main application instance */
  readonly app: App;
  
  /** Camera instance (currently unused) */
  camera?: unknown;
  
  /** Session instance (currently unused) */
  session?: unknown;
  
  /** Rendering context (currently unused) */
  context?: unknown;
  
  /** Auxiliary canvas (currently unused) */
  auxCanvas?: unknown;
  
  /** Gizmo manager (currently unused) */
  gizmoManager?: unknown;
  
  /** Toolbar plugin for managing toolbar UI */
  readonly toolbarPlugin: ToolbarPlugin;
  
  /** Catalog plugin for material selection */
  readonly catalogPlugin: CatalogPlugin;
  
  /** Page header plugin for navigation UI */
  readonly pageHeaderPlugin: PageHeaderPlugin;
  
  /** View switch plugin for view management */
  readonly viewSwitchPlugin: ViewSwitchPlugin;
  
  /** Resize widget plugin for UI resizing */
  readonly resizeWidgetPlugin: ResizeWidgetPlugin;
  
  /** Contextual tools plugin for context-sensitive UI */
  readonly contextualToolsPlugin: ContextualToolsPlugin;
  
  /** Event handler instance */
  readonly handler: Handler;
  
  /** Menu plugin instance */
  readonly menuPlugin: MenuPlugin;
  
  /** Unique identifier for the toolbar */
  readonly toolbarId: string;
  
  /** Right-side property bar component */
  readonly rightPropertyBar: RightPropertyBar;
  
  /** Signal hook for managing event subscriptions */
  readonly signalHook: SignalHook;
  
  /** Currently selected 3D entity */
  selectedEntity?: Entity;
  
  /** Map of original material data for undo/reset functionality */
  oldMateriaDataMap?: Map<string, MaterialData>;

  /**
   * Creates a new material replace styler instance.
   * @param options - Configuration options
   */
  constructor(options: MaterialReplaceStylerOptions);

  /**
   * Enters the material replacement mode.
   * Hides unnecessary UI elements, activates the toolbar, and sets up event listeners.
   */
  enterStyler(): void;

  /**
   * Exits the material replacement mode.
   * Restores UI elements and cleans up event listeners.
   */
  exitStyler(): void;

  /**
   * Hides UI elements that are not needed during material replacement.
   */
  hideUIView(): void;

  /**
   * Shows UI elements after exiting material replacement mode.
   */
  showUIView(): void;

  /**
   * Sets the currently selected entity and records its initial material state.
   * @param entity - The entity to select
   */
  setSelectedEntity(entity: Entity): void;

  /**
   * Handles the left menu population event.
   * Clears default menu items during material replacement mode.
   * @param event - Menu populate event data
   */
  onPopulateLeftMenu(event: MenuPopulateEventData): void;

  /**
   * Retrieves a map of all materials currently applied to an entity.
   * @param entity - The entity to query
   * @returns Map of material IDs to cloned material data
   */
  getMaterialMap(entity: Entity): Map<string, MaterialData>;

  /**
   * Records the initial material state of the selected entity for undo functionality.
   */
  recordStartMaterial(): void;

  /**
   * Handles catalog item click events to apply selected materials.
   * @param event - Catalog item click event data
   */
  onCatalogItemClick(event: CatalogItemClickEventData): void;

  /**
   * Commits a material replacement command to the command manager.
   * @param meshName - Name of the mesh to apply material to
   * @param materialData - Material data to apply
   */
  commit(meshName: string, materialData: MaterialData): void;

  /**
   * Resets all materials on the selected entity to their original state.
   * Shows a hint if no changes have been made.
   */
  resetAll(): void;

  /**
   * Resets materials to their default state (removes custom materials).
   * @param materialKeys - Optional specific material keys to reset
   */
  resetDefaultMaterial(materialKeys?: Iterable<string>): void;

  /**
   * Updates the enabled/disabled state of toolbar items.
   * @param itemNames - Array of toolbar item names
   * @param enabledStates - Corresponding array of enabled states
   */
  updateToolbarResetItems(itemNames: string[], enabledStates: boolean[]): void;

  /**
   * Initializes the toolbar with material replacement controls.
   */
  initToolbar(): void;

  /**
   * Activates the material replacement toolbar and updates button states.
   */
  activateToolbar(): void;

  /**
   * Creates the page header complete button configuration.
   * @returns Page header button configuration object
   */
  getPageHeaderCompleteBtn(): PageHeaderCompleteButton;
}