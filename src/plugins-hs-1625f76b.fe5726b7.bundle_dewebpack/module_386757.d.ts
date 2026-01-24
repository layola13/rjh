/**
 * Material replacement data structure
 */
interface MaterialData {
  seekId?: string;
  clone(): MaterialData;
}

/**
 * Entity with material management capabilities
 */
interface MaterialEntity {
  metadata?: {
    attributes?: Array<{
      id: string;
      values?: Array<{ id: string }>;
    }>;
  };
  getMaterialList(): Array<[string, MaterialData]>;
  getMaterial(meshName: string): MaterialData | undefined;
}

/**
 * Selected mesh object
 */
interface SelectedMesh {
  meshName?: string;
}

/**
 * Catalog item data
 */
interface CatalogItemData {
  // Catalog item properties
  [key: string]: unknown;
}

/**
 * Signal event data
 */
interface SignalEventData<T = unknown> {
  data?: T;
}

/**
 * Material replace signal data
 */
interface MaterialReplaceData {
  isShowIndependent?: boolean;
}

/**
 * Command manager interface
 */
interface CommandManager {
  current?: unknown;
  cancel(): void;
  createCommand(type: string, args: unknown[]): unknown;
  execute(command: unknown): void;
  complete(): void;
}

/**
 * Selection manager interface
 */
interface SelectionManager {
  signalSelectionChanged: Signal<SignalEventData>;
  selected(includeAll: boolean): SelectedMesh[];
  unselectAll(): void;
}

/**
 * Signal interface
 */
interface Signal<T = unknown> {
  dispatch(data: T): void;
}

/**
 * Plugin interface
 */
interface Plugin {
  signalContentMeshSelected: Signal<{ seekId: string }>;
}

/**
 * Plugin manager interface
 */
interface PluginManager {
  getPlugin(type: string): Plugin;
}

/**
 * Toolbar item interface
 */
interface ToolbarItem {
  enable(): void;
  disable(): void;
}

/**
 * Toolbar plugin interface
 */
interface ToolbarPlugin {
  getItem(name: string, toolbarId: string): ToolbarItem | undefined;
  addLinkedToolbar(id: string, parent: string, config: unknown): void;
  activateToolbar(id: string): void;
}

/**
 * Application context
 */
interface AppContext {
  cmdManager: CommandManager;
  selectionManager: SelectionManager;
  pluginManager: PluginManager;
}

/**
 * Catalog signal manager
 */
interface CatalogSignalManager {
  signalItemClicked: Signal<SignalEventData<CatalogItemData>>;
  signalIndependentPanelShow: Signal<SignalEventData<MaterialReplaceData>>;
}

/**
 * Content PBR material replace styler
 */
declare class ContentPBRMaterialReplaceStyler {
  init(entity: MaterialEntity): void;
  destroy(): void;
}

/**
 * Right property bar
 */
declare class RightPropertyBar {
  constructor(config: ContentMaterialReplaceConfig);
  init(entity: MaterialEntity): void;
}

/**
 * Signal hook utility
 */
declare class SignalHook {
  constructor(context: unknown);
  listen<T>(signal: Signal<T>, handler: (data: T) => void): void;
  unlistenAll(): void;
}

/**
 * Configuration for content material replace
 */
interface ContentMaterialReplaceConfig {
  handler: unknown;
  app: AppContext;
  contextualToolsPlugin: unknown;
  catalogPlugin: unknown;
  toolbarPlugin: ToolbarPlugin;
  resizeWidgetPlugin: unknown;
  viewSwitchPlugin: unknown;
}

/**
 * Content material replace styler
 * Manages material replacement functionality for 3D content entities
 */
declare class ContentMaterialReplaceStyler {
  private readonly _handler: unknown;
  private readonly _app: AppContext;
  private readonly _contextualToolsPlugin: unknown;
  private readonly _catalogPlugin: unknown;
  private readonly _toolbarPlugin: ToolbarPlugin;
  private readonly _resizeWidgetPlugin: unknown;
  private readonly _viewSwitchPlugin: unknown;
  private readonly _toolbarId: string;
  private readonly _signalHook: SignalHook;
  private readonly _rightPropertyBar: RightPropertyBar;
  private readonly contentPBRMaterialReplaceStyler: ContentPBRMaterialReplaceStyler;
  
  /** Whether the right bar is visible */
  isShow: boolean;
  
  /** Whether material replacement is triggered by dragging */
  isMaterialReplaceByDragging: boolean;
  
  /** Currently selected entity */
  private _selectedEntity?: MaterialEntity;
  
  /** Original material data map before modifications */
  private _oldMaterialdataMap?: Map<string, MaterialData>;
  
  /** Original right property bar map */
  private _oldRightPropertyBarMap?: unknown;

  /**
   * Creates a new content material replace styler
   * @param config - Configuration object
   */
  constructor(config: ContentMaterialReplaceConfig);

  /**
   * Enter the material replacement mode
   */
  enterStyler(): void;

  /**
   * Exit the material replacement mode
   */
  exitStyler(): void;

  /**
   * Set the currently selected entity
   * @param entity - The entity to select
   */
  private _setSelectedEntity(entity: MaterialEntity): void;

  /**
   * Handle material replace event
   * @param event - Event data
   */
  private _onMaterialReplace(event: SignalEventData<MaterialReplaceData>): void;

  /**
   * Get material map from entity
   * @param entity - Entity to extract materials from
   * @returns Map of material names to material data
   */
  getMaterialMap(entity: MaterialEntity): Map<string, MaterialData>;

  /**
   * Record the starting material state
   */
  recoreStartMaterial(): void;

  /**
   * Handle catalog item click event
   * @param event - Event containing catalog item data
   */
  onCatalogItemClick(event: SignalEventData<CatalogItemData>): void;

  /**
   * Initialize the right property bar
   */
  initRightBar(): void;

  /**
   * Handle selection changed event
   * @param event - Selection change event data
   */
  private _onSelectionChanged(event: SignalEventData): void;

  /**
   * Commit material change
   * @param meshName - Name of the mesh to apply material to
   * @param materialData - Material data to apply
   */
  commit(meshName: string, materialData: MaterialData): void;

  /**
   * Reset all materials to their original state
   */
  resetAll(): void;

  /**
   * Reset materials to default
   * @param meshNames - Optional array of mesh names to reset
   */
  resetDefaultMaterial(meshNames?: string[]): void;

  /**
   * Update toolbar reset item states
   * @param itemNames - Array of toolbar item names
   * @param enabledStates - Array of enabled states corresponding to items
   */
  updateToolbarResetItems(itemNames: string[], enabledStates: boolean[]): void;

  /**
   * Initialize the toolbar with material replacement controls
   */
  initToolbar(): void;

  /**
   * Show the right property bar
   */
  showRightBar(): void;

  /**
   * Hide the right property bar
   */
  hideRightBar(): void;

  /**
   * Activate the material replacement toolbar
   */
  activateToolbar(): void;

  /**
   * Check if the entity is a PBR model
   * @param attributes - Entity attributes to check
   * @returns True if entity is a PBR model
   */
  isPBRModel(attributes: Array<{ id: string; values?: Array<{ id: string }> }>): boolean;
}

export default ContentMaterialReplaceStyler;