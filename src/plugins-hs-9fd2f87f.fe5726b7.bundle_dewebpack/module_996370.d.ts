/**
 * EditDesign plugin module for HSApp floorplan editor
 * Provides UI and functionality for editing design properties and metadata
 */

import type * as React from 'react';
import type * as ReactDOM from 'react-dom';

/**
 * Design metadata information
 */
interface DesignMetadata {
  /** Get a metadata value by key */
  get(key: 'documentStatus' | 'designId' | 'designName' | 'address' | 'basicAttributes'): any;
  /** Set a metadata value by key */
  set(key: 'documentStatus' | 'designId' | 'designName' | 'address' | 'basicAttributes', value: any): void;
}

/**
 * Design information validation result
 */
interface DesignInfoValidityResult {
  /** Whether the design info is valid */
  valid: boolean;
  /** Validation error message if invalid */
  message?: string;
}

/**
 * Design save event data
 */
interface DesignSaveData {
  /** Design name */
  name: string;
  /** Document status */
  status: string;
  /** Physical address */
  address?: string;
  /** Basic design attributes */
  basicAttributes?: Record<string, any>;
}

/**
 * Save process signal data
 */
interface SaveProcessSignalData {
  /** Process identifier */
  process: string;
  /** Process description */
  description: string;
  /** Type of save operation */
  saveType: 'create' | 'update' | 'delete';
  /** Whether to log this operation */
  needLog: boolean;
}

/**
 * Persistence plugin interface
 */
interface PersistencePlugin {
  /** Ensure all changes are saved before proceeding */
  ensureSaved(): Promise<boolean>;
  /** Signal for tracking save process events */
  signalSaveProcess: {
    dispatch(data: SaveProcessSignalData): void;
  };
}

/**
 * Popup window configuration
 */
interface PopupWindowConfig {
  /** Window identifier */
  windowname: string;
  /** Window title */
  title: string;
  /** React content to render */
  contents: React.ReactElement;
  /** Window width in pixels */
  width: number;
  /** Callback when submit button is clicked */
  submitcall: () => void;
  /** Callback when cancel button is clicked */
  cancelcall: () => void;
}

/**
 * CommonUI plugin interface
 */
interface CommonUIPlugin {
  /** Create a dropdown menu component */
  createDropdownMenu: React.ComponentType<any>;
  /** Create a popup window */
  createPopupwindow(config: PopupWindowConfig): React.ReactElement;
}

/**
 * Plugin dependency map
 */
interface PluginDependencies {
  [HSFPConstants.PluginType.CommonUI]: CommonUIPlugin;
  [HSFPConstants.PluginType.Persistence]: PersistencePlugin;
}

/**
 * Plugin metadata
 */
interface PluginMetadata {
  /** Plugin name */
  name: string;
  /** Plugin description */
  description: string;
  /** Array of plugin types this plugin depends on */
  dependencies: string[];
}

/**
 * Edit design dialog options
 */
interface ShowDialogOptions {
  /** Custom design info validation function */
  checkDesignInfoValidity?: (data: any) => DesignInfoValidityResult | Promise<DesignInfoValidityResult>;
}

/**
 * Edit design dialog component props
 */
interface EditDesignDialogProps {
  /** Asset/design identifier */
  assetid: string;
  /** Current document status */
  documentStatus: string;
  /** Dropdown menu component */
  dropdown: React.ComponentType<any>;
  /** Callback when design is saved */
  onSave: (data: DesignSaveData) => void;
  /** Callback when dialog is cancelled */
  onCancel: () => void;
  /** Custom validation function */
  checkDesignInfoValidity?: (data: any) => DesignInfoValidityResult | Promise<DesignInfoValidityResult>;
}

/**
 * Base plugin interface
 */
declare class IPlugin {
  constructor(metadata: PluginMetadata);
  
  /**
   * Called when plugin is activated
   * @param app Application instance
   * @param dependencies Map of dependent plugins
   */
  onActive(app: any, dependencies: PluginDependencies): void;
  
  /**
   * Called when plugin is deactivated
   */
  onDeactive(): void;
}

/**
 * EditDesign Plugin
 * Manages the edit design dialog for modifying floorplan properties
 */
declare class EditDesignPlugin extends IPlugin {
  /** CommonUI plugin instance */
  private commonUI: CommonUIPlugin;
  
  /** Persistence plugin instance */
  private persistPlugin: PersistencePlugin;
  
  /** Current document status */
  private documentStatus: string;
  
  /** Current asset/design ID */
  private assetId: string;
  
  /** User session ID */
  private sid: string;
  
  /** Currently active React page instance */
  private activePage: React.Component | null;

  constructor();

  /**
   * Activates the plugin and initializes dependencies
   * @param app Application instance
   * @param dependencies Map of dependent plugins
   */
  onActive(app: any, dependencies: PluginDependencies): void;

  /**
   * Deactivates the plugin and cleans up resources
   */
  onDeactive(): void;

  /**
   * Shows the edit design dialog
   * @param options Dialog configuration options
   * @returns Promise that resolves to true if saved, false if cancelled
   */
  showDialog(options?: ShowDialogOptions): Promise<boolean>;

  /**
   * Hides the edit design dialog
   */
  hideDialog(): void;
}

/**
 * Global HSApp namespace
 */
declare namespace HSApp {
  namespace Plugin {
    /** Base plugin interface */
    export { IPlugin };
    
    /**
     * Registers a plugin with the plugin system
     * @param pluginType Plugin type identifier
     * @param pluginClass Plugin class constructor
     */
    export function registerPlugin(pluginType: string, pluginClass: typeof IPlugin): void;
  }

  namespace App {
    interface AppInstance {
      /** Design metadata accessor */
      designMetadata: DesignMetadata;
    }
    
    /**
     * Gets the current application instance
     */
    export function getApp(): AppInstance;
  }
}

/**
 * HSFloorPlan constants
 */
declare namespace HSFPConstants {
  /** Plugin type identifiers */
  enum PluginType {
    CommonUI = 'CommonUI',
    Persistence = 'Persistence',
    EditDesign = 'EditDesign'
  }
}

/**
 * Resource manager for internationalization
 */
declare namespace ResourceManager {
  /**
   * Gets a localized string by key
   * @param key Resource key
   * @returns Localized string
   */
  export function getString(key: string): string;
}

/**
 * Current Autodesk user information
 */
declare const adskUser: {
  /** User session ID */
  sid: string;
};

export type {
  DesignMetadata,
  DesignInfoValidityResult,
  DesignSaveData,
  SaveProcessSignalData,
  PersistencePlugin,
  PopupWindowConfig,
  CommonUIPlugin,
  PluginDependencies,
  PluginMetadata,
  ShowDialogOptions,
  EditDesignDialogProps,
  IPlugin
};

export { EditDesignPlugin };