/**
 * Material brush handler plugin for managing material copying and application operations.
 * Provides functionality to suck material properties from objects and apply them to other surfaces.
 */

import type { 
  Application, 
  CommandManager, 
  PluginDependencies,
  Environment,
  Command,
  MaterialData,
  Mesh,
  SignalHook,
  EventTrack,
  PropertyBarPlugin,
  ToolbarPlugin,
  ContextualToolsPlugin,
  MaterialImagePlugin,
  FirstLoginPlugin,
  MarketingBadgePlugin
} from './types';

/**
 * Material information with texture and metadata
 */
interface Material {
  /** Material data including color, texture, and other properties */
  materialData: MaterialData;
  /** URI to the texture image */
  textureURI?: string;
}

/**
 * Event data when sucked material changes
 */
interface SuckedMaterialChangedEvent {
  data: {
    /** The newly sucked material */
    material: Material;
  };
}

/**
 * Command lifecycle event data
 */
interface CommandEvent {
  data: {
    /** The command instance */
    cmd: Command;
  };
}

/**
 * Environment change event data
 */
interface EnvironmentChangeEvent {
  data: {
    /** The new environment ID after change */
    newEnvironmentId: Environment;
  };
}

/**
 * Check rights result for entering material brush mode
 */
interface CheckEnterRightsResult {
  /** Whether the operation was successful */
  success: boolean;
  /** Remaining usage amount (-1 for unlimited) */
  amount: number;
  /** Whether user can enter the feature */
  canEnter: boolean;
}

/**
 * Property bar item configuration
 */
interface PropertyBarItem {
  /** Unique identifier for the item */
  id: string;
  /** Parent item ID for hierarchy */
  parentId?: string;
  /** Display label */
  label: string;
  /** Item type */
  type: string;
  /** Display order */
  order?: number;
  /** Custom CSS class */
  className?: string;
  /** Child items */
  items?: PropertyBarSubItem[];
}

/**
 * Property bar sub-item configuration
 */
interface PropertyBarSubItem {
  /** Unique identifier */
  id: string;
  /** Parent item ID */
  parentId: string;
  /** Sub-item type */
  type: string;
  /** Display order */
  order: number;
  /** Additional data */
  data: {
    /** Image source URL */
    src: string;
    /** Display label */
    label: string;
    /** Whether the item is disabled */
    disabled: boolean;
    /** Click handler */
    onclick: () => void;
    /** Error handler */
    onerror: (event: ErrorEvent) => void;
  };
}

/**
 * Strategy interface for sucking materials from different object types
 */
interface MaterialBrushStrategy {
  /**
   * Check if a mesh can have its material sucked
   * @param mesh - The mesh to check
   * @returns True if the mesh is suckable
   */
  isSuckable(mesh: Mesh): boolean;

  /**
   * Extract material from a mesh
   * @param mesh - The mesh to extract material from
   * @returns The extracted material or undefined
   */
  suck(mesh: Mesh): Material | undefined;
}

/**
 * Handler initialization options
 */
interface HandlerInitOptions {
  /** Plugin dependencies */
  dependencies: PluginDependencies;
  /** Main application instance */
  app: Application;
}

/**
 * Main handler class for material brush functionality.
 * Manages material copying operations, UI interactions, and command lifecycle.
 */
export declare class Handler {
  /** Currently sucked material */
  suckedMaterial?: Material;

  /** Plugin dependencies */
  private _dependencies: PluginDependencies;

  /** Main application instance */
  private _app: Application;

  /** Command manager */
  private _cmdMgr: CommandManager;

  /** Toolbar plugin reference */
  private _toolbarPlugin: ToolbarPlugin;

  /** Contextual tools plugin reference */
  private _contextualToolsPlugin: ContextualToolsPlugin;

  /** Material image plugin reference */
  private _materialImagePlugin: MaterialImagePlugin;

  /** Property bar plugin reference */
  propertyBarPlugin: PropertyBarPlugin;

  /** Signal hook for event management */
  private _signalHook: SignalHook;

  /** Event tracking instance */
  private _eventTrack: EventTrack;

  /** Material extraction strategies */
  private _strategies: MaterialBrushStrategy[];

  /** First login plugin for benefit checks */
  private firstLoginPlugin?: FirstLoginPlugin;

  /**
   * Initialize the handler with application context and dependencies
   * @param options - Initialization options containing app and dependencies
   */
  init(options: HandlerInitOptions): void;

  /**
   * Inject default toolbar button for material brush
   * @private
   */
  private _injectDefaultToolbar(): void;

  /**
   * Enter material brush mode, checking permissions and initializing command
   * @returns Promise that resolves when mode is entered
   */
  enterMaterialBrush(): Promise<void>;

  /**
   * Check if benefit checking is needed based on tenant and environment
   * @returns True if benefit check is required
   */
  needCheckBenefit(): boolean;

  /**
   * Get remaining benefit amount for material brush feature
   * @returns Remaining usage count or -1 for unlimited
   */
  getBenefitAmount(): number | undefined;

  /**
   * Check user rights to enter material brush mode
   * @returns Check result with success status and remaining amount
   */
  checkEnterRights(): CheckEnterRightsResult | Promise<CheckEnterRightsResult>;

  /**
   * Deduct trial cost for using material brush feature
   * @returns Promise resolving when cost is paid
   */
  payTrialCost(): Promise<void>;

  /**
   * Show marketing modal for material brush feature
   */
  showMarketModal(): void;

  /**
   * Handle environment change events
   * @param event - Environment change event data
   * @private
   */
  private _onEnvironmentChange(event: EnvironmentChangeEvent): void;

  /**
   * Check if material brush is valid in the given environment
   * @param environmentId - Environment ID to check
   * @returns True if environment supports material brush
   * @private
   */
  private _isValidEnvironment(environmentId: Environment): boolean;

  /**
   * Check if 2D view is valid for the given environment
   * @param environmentId - Environment ID to check
   * @returns True if environment supports 2D view material brush
   */
  is2DViewValidEnvironment(environmentId: Environment): boolean;

  /**
   * Handle command start event
   * @param event - Command event data
   * @private
   */
  private _onCmdStart(event: CommandEvent): void;

  /**
   * Handle command end event
   * @param event - Command event data
   * @private
   */
  private _onCmdEnd(event: CommandEvent): void;

  /**
   * Handle sucked material change event
   * @param event - Sucked material changed event data
   * @private
   */
  private _onSuckedMaterialChanged(event: SuckedMaterialChangedEvent): void;

  /**
   * Initialize property bar items for displaying sucked material
   * @param data - Sucked material data
   * @returns Property bar item configuration
   * @private
   */
  private _initPropertyBarMaterialItemsV2(data: { material: Material }): PropertyBarItem[];

  /**
   * Clean up resources and unlisten all signals
   */
  uninit(): void;

  /**
   * Execute material brush command with optional initial material
   * @param initialMaterial - Optional pre-selected material to start with
   */
  execute(initialMaterial?: Material): void;

  /**
   * Register a new material extraction strategy
   * @param strategy - Strategy to register
   */
  registerStrategy(strategy: MaterialBrushStrategy): void;

  /**
   * Unregister an existing material extraction strategy
   * @param strategy - Strategy to unregister
   */
  unregisterStrategy(strategy: MaterialBrushStrategy): void;

  /**
   * Get all registered material extraction strategies
   * @returns Array of registered strategies
   */
  getStrategies(): MaterialBrushStrategy[];

  /**
   * Extract material from a mesh using registered strategies
   * @param mesh - Mesh to extract material from
   * @returns Extracted material or undefined if no strategy applies
   */
  suckMaterialFromMesh(mesh: Mesh): Material | undefined;
}