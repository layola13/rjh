/**
 * Opening Pocket Plugin - Adds and manages decorative pocket (trim/casing) functionality for doors and windows
 * @module AddOpeningPocketPlugin
 */

import { IPlugin } from 'HSApp.Plugin';
import { SignalHook } from 'HSCore.Util';
import { App } from 'HSApp.App';
import { SelectionManager } from 'HSApp.SelectionManager';
import { CommandManager } from 'HSApp.CommandManager';
import { CatalogManager } from 'HSApp.CatalogManager';
import { TransactionManager } from 'HSApp.TransactionManager';
import { Entity, Opening, Door, Window, Face, Hole } from 'HSCore.Model';
import { DefaultItemTypeEnum } from 'HSCatalog';
import { PropertyBarType, CommandType, PluginType, RequestType, Environment } from 'HSFPConstants';

/**
 * Metadata interface for catalog items
 */
interface CatalogItemMetadata {
  seekId: string;
  thumbnail: string;
  categories: string[];
  defaultPocketMaterial?: MaterialMetadata;
  colors?: Array<{
    seekId: string;
    defaultPocketMaterial?: MaterialMetadata;
  }>;
}

/**
 * Material metadata interface
 */
interface MaterialMetadata {
  seekId: string;
  textureURI: string;
  rotation?: number;
}

/**
 * Pocket entity interface
 */
interface Pocket {
  metadata: CatalogItemMetadata;
  XLength: number;
  YLength: number;
  height: number;
  thickness: number;
  outerHeight?: number;
  outerThickness?: number;
  side: PocketSideType;
  dirtyGeometry(): void;
  dirtyMaterial(): void;
  getMaterial(): MaterialMetadata;
}

/**
 * Pocket side type enumeration
 */
declare enum PocketSideType {
  Inner = 'inner',
  Outer = 'outer',
  Both = 'both'
}

/**
 * Plugin dependency map
 */
interface PluginDependencies {
  [PluginType.ContextualTools]: any;
  [PluginType.PropertyBar]: any;
  [PluginType.Catalog]: any;
  [PluginType.ContentStyler]: any;
  [PluginType.Ngmmixpaint]: any;
}

/**
 * Property bar item configuration
 */
interface PropertyBarItem {
  id: string;
  parentId?: string;
  label?: string;
  type: PropertyBarType;
  order: number;
  status?: boolean;
  items?: PropertyBarItem[];
  className?: string;
  data?: Record<string, unknown>;
  onStatusChange?: (checked: boolean) => void;
  resetItem?: {
    text: string;
    onResetClick: () => void;
  };
}

/**
 * Request event data
 */
interface RequestEvent {
  data: {
    request: {
      type: RequestType;
      oldContent?: Opening;
      content?: Opening;
      result?: Opening;
    };
  };
}

/**
 * Property bar populate event
 */
interface PopulatePropertyBarEvent {
  data: {
    xInsertCollection(index: number, items: PropertyBarItem[]): void;
  };
}

/**
 * Plugin for adding and managing opening pockets (decorative trim/casing) on doors and windows
 */
export declare class AddOpeningPocketPlugin extends IPlugin {
  constructor();

  /**
   * Called when plugin is activated
   * @param environment - Plugin environment context
   * @param dependencies - Map of dependent plugins
   */
  onActive(environment: any, dependencies: PluginDependencies): void;

  /**
   * Called when plugin is deactivated
   */
  onDeactive(): void;
}

/**
 * Core plugin manager handling pocket operations
 */
declare class PluginManager {
  /** Application instance */
  private app: App;
  
  /** Selection manager */
  private selectionMgr: SelectionManager;
  
  /** Command manager */
  private cmdMgr: CommandManager;
  
  /** Catalog manager */
  private catalogMgr: CatalogManager;
  
  /** Transaction manager */
  private transMgr: TransactionManager;
  
  /** Contextual tools plugin reference */
  private contextualToolsPlugin: any;
  
  /** Property bar plugin reference */
  private propertyBarPlugin: any;
  
  /** Catalog plugin reference */
  private catalogPlugin: any;
  
  /** Content styler plugin reference */
  private contentStylerPlugin: any;
  
  /** Mix paint plugin reference */
  private mixpaintPlugin: any;
  
  /** Default pocket metadata from catalog */
  private defaultPocketMeta: CatalogItemMetadata;
  
  /** Default material metadata from catalog */
  private defaultMaterialMeta: MaterialMetadata;
  
  /** Currently selected entity */
  private entity: Opening;
  
  /** Flag indicating if replaced product had pocket */
  private hasReplaceProductPocket: boolean;
  
  /** Signal hook for managing event listeners */
  private _signalHook: SignalHook;
  
  /** Signal hook for opening-specific events */
  private _openingSignalHook: SignalHook;

  /**
   * Initialize plugin manager
   * @param environment - Plugin environment
   * @param dependencies - Plugin dependencies
   */
  init(environment: any, dependencies: PluginDependencies): void;

  /**
   * Clean up and remove all event listeners
   */
  uninit(): void;

  /**
   * Generate property bar items for the given opening entity
   * @param entity - The opening (door/window) entity
   * @returns Array of property bar configuration items
   */
  private _getPropertyBarV2Items(entity: Opening): PropertyBarItem[];

  /**
   * Handle request committing event
   * @param event - Request event data
   */
  private onRequestCommitting(event: RequestEvent): void;

  /**
   * Handle request committed event - auto-adds pocket to new openings
   * @param event - Request event data
   */
  private onRequestCommitted(event: RequestEvent): void;

  /**
   * Populate property bar with pocket-related controls
   * @param event - Property bar populate event
   */
  private _onPopulatePropertyBarV2(event: PopulatePropertyBarEvent): void;

  /**
   * Open material assignment interface for pocket
   */
  private _onAssignMaterial(): void;

  /**
   * Open geometry/style assignment interface for pocket
   */
  private _onAssignGeometry(): void;

  /**
   * Apply current pocket configuration to all openings in scene
   */
  private _onApplyToAllHandler(): void;

  /**
   * Clean up last command status and close panels
   */
  private _cleanLaststatus(): void;

  /**
   * Add or remove pocket from opening
   * @param event - Checkbox change event
   */
  onAddOpeningPocket(event: { target: { checked: boolean } }): void;
}

/**
 * Constants for pocket geometry constraints
 */
declare namespace PocketConstants {
  const MIN_HEIGHT: number;
  const MAX_HEIGHT: number;
}

/**
 * Register plugin with the application
 */
declare function registerPlugin(name: string, pluginClass: typeof AddOpeningPocketPlugin): void;