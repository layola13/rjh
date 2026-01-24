/**
 * Toolbar injection handler for space rebuild plugin
 * Manages the injection of default toolbar items for saving and editing original designs
 */

/**
 * Configuration for a toolbar button item
 */
interface ToolbarButtonConfig {
  /** The type of toolbar item */
  type: 'button';
  /** Display label for the button */
  label: string;
  /** Unique identifier name for the button */
  name: string;
  /** Display order in the toolbar */
  order: number;
  /** Visibility condition for the button */
  visible: boolean;
  /** Click event handler */
  onclick: () => void;
}

/**
 * Toolbar item container interface
 */
interface ToolbarItem {
  /**
   * Adds a new button configuration to the toolbar
   * @param config - The button configuration to add
   */
  add(config: ToolbarButtonConfig): void;
}

/**
 * Toolbar plugin interface for managing toolbar items
 */
interface ToolbarPlugin {
  /**
   * Retrieves a toolbar item by category and name
   * @param category - The toolbar category identifier
   * @param name - The specific toolbar item name
   * @returns The toolbar item container or null if not found
   */
  getItem(category: string, name: string): ToolbarItem | null;
}

/**
 * Handler interface for space rebuild operations
 */
interface SpaceRebuildHandler {
  /**
   * Callback when the "Save Origin Design" menu item is clicked
   */
  onSaveOriginDesignItemClicked(): void;

  /**
   * Callback when the "Edit Origin Design" menu item is clicked
   */
  onEditOriginDesignItemClicked(): void;
}

/**
 * Resource manager for retrieving localized strings
 */
declare const ResourceManager: {
  /**
   * Retrieves a localized string by key
   * @param key - The resource string key
   * @returns The localized string value
   */
  getString(key: string): string;
};

/**
 * Global HSApp configuration
 */
declare const HSApp: {
  Config: {
    /** Current tenant identifier */
    TENANT: string;
  };
};

/**
 * Default toolbar injector for the space rebuild plugin
 * Handles the injection of save and edit origin design toolbar buttons
 */
export default class ToolbarInjector {
  /** Space rebuild operation handler */
  private readonly _handler: SpaceRebuildHandler;
  
  /** Toolbar plugin instance for item management */
  private readonly _toolbarPlugin: ToolbarPlugin;
  
  /** Flag indicating whether toolbar has been injected */
  private toolbarInjected?: boolean;

  /**
   * Creates a new toolbar injector instance
   * @param handler - The space rebuild handler for button callbacks
   * @param toolbarPlugin - The toolbar plugin for item management
   */
  constructor(handler: SpaceRebuildHandler, toolbarPlugin: ToolbarPlugin);

  /**
   * Injects default toolbar items for space rebuild operations
   * Adds "Save Origin Design" and "Edit Origin Design" buttons to the construction toolbar
   * Only injects once; subsequent calls are ignored
   */
  injectDefaultToolbar(): void;
}