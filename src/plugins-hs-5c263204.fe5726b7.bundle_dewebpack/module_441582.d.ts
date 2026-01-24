/**
 * Historical Version Plugin Type Definitions
 * Provides version history viewing and recovery functionality for designs
 */

import type { IPlugin } from 'HSApp.Plugin';
import type { App } from 'HSApp';
import type { ToolbarPlugin } from 'HSFPConstants.PluginType';
import type { PersistencePlugin } from 'HSFPConstants.PluginType';

/**
 * Design version information returned from the API
 */
export interface DesignVersionItem {
  /** Unique version identifier */
  versionId: string;
  /** Timestamp when this version was created */
  createdAt: string | number;
  /** Preview image URL for this version */
  image?: string;
  /** Type of save operation (auto-save, manual, etc.) */
  saveType: string;
  /** Model tag identifier */
  modelTag?: string;
  /** Magic number/identifier for version validation */
  magic?: string;
  /** Source type of the design version */
  fromSource?: string;
}

/**
 * Formatted version data for display in the UI
 */
export interface FormattedVersionItem {
  /** Unique version identifier */
  versionId: string;
  /** Human-readable formatted creation date/time */
  createdAt: string;
  /** Preview image URL */
  image?: string;
  /** Type of save operation */
  saveType: string;
  /** Model tag identifier */
  modelTag?: string;
  /** Magic number for validation */
  magic?: string;
  /** Whether this is a hidden/audit version */
  auditTag: boolean;
}

/**
 * Paginated response from version history API
 */
export interface VersionHistoryResponse {
  /** Array of version items for current page */
  items: DesignVersionItem[];
  /** Total number of versions available */
  total: number;
}

/**
 * Formatted paginated data for UI consumption
 */
export interface FormattedVersionData {
  /** Formatted version list */
  list: FormattedVersionItem[];
  /** Total count */
  total: number;
}

/**
 * Pagination parameters for fetching version history
 */
export interface PaginationParams {
  /** Page number (0-indexed or 1-indexed depending on API) */
  page?: number;
  /** Number of items per page */
  pageSize?: number;
  /** Sort order */
  sort?: 'asc' | 'desc';
}

/**
 * Query parameters for fetching design version history
 */
export interface VersionHistoryQuery extends PaginationParams {
  /** Design ID to fetch versions for */
  designId: string;
}

/**
 * Plugin activation context containing app instance
 */
export interface PluginActivationContext {
  /** Main application instance */
  app: App;
}

/**
 * Map of activated plugin dependencies
 */
export interface PluginDependencyMap {
  [HSFPConstants.PluginType.Toolbar]: ToolbarPlugin;
  [HSFPConstants.PluginType.Persistence]: PersistencePlugin;
  [HSFPConstants.PluginType.CommonUI]: unknown;
  [key: string]: unknown;
}

/**
 * Props for the HistoricalVersionFrame React component
 */
export interface HistoricalVersionFrameProps {
  /**
   * Function to fetch paginated version history data
   * @param params - Pagination parameters
   * @returns Promise resolving to formatted version data
   */
  getListData: (params: PaginationParams) => Promise<FormattedVersionData>;
  
  /**
   * Callback when user selects a version to restore
   * @param versionId - ID of the version to open/restore
   */
  onOpen: (versionId: string) => void;
  
  /**
   * Callback when user cancels the operation
   * @param reason - Optional reason for cancellation
   */
  onCancel: (reason?: string) => void;
}

/**
 * Modal configuration options
 */
export interface ModalOptions {
  /** Modal title text */
  title: string;
  /** CSS class name for styling */
  className?: string;
  /** React element to render as modal content */
  content: React.ReactElement;
  /** Whether to show footer buttons */
  showFooter?: boolean;
  /** Enable checkbox functionality */
  enableCheckbox?: boolean;
  /**
   * Callback when modal is closed
   */
  onClose?: () => void;
}

/**
 * User tracking log entry data
 */
export interface UserTrackLogData {
  /** Human-readable description of the action */
  description: string;
  /** Log group category */
  group: string;
  /** Action type identifier */
  type: string;
  /** Display name for the action type */
  typeName: string;
  /** Optional trigger metadata */
  triggerType?: 'start' | 'end';
}

/**
 * Historical Version Plugin
 * Allows users to view and restore previous versions of their designs
 */
export declare class HistoricalVersionPlugin extends IPlugin {
  /** Main application instance */
  private app: App;
  
  /** Reference to the toolbar plugin */
  private toolbarPlugin: ToolbarPlugin;
  
  /** Reference to the persistence plugin for data operations */
  private persistPlugin: PersistencePlugin;
  
  /** Currently active version ID */
  private currentversion?: string;
  
  /** Cached list of available versions */
  private versions?: FormattedVersionItem[];
  
  /**
   * Plugin constructor - initializes plugin metadata
   */
  constructor();
  
  /**
   * Called when the plugin is activated
   * Sets up UI components and event listeners
   * @param context - Activation context containing app reference
   * @param dependencies - Map of activated dependency plugins
   */
  onActive(
    context: PluginActivationContext,
    dependencies: PluginDependencyMap
  ): void;
  
  /**
   * Injects the "Load Historical Version" button into the toolbar
   * @private
   */
  private injectToobar(): void;
  
  /**
   * Opens the version history modal for the current design
   */
  open(): void;
  
  /**
   * Displays the version history modal for a specific design
   * @param designId - ID of the design to show versions for
   */
  show(designId: string): void;
}

/**
 * Plugin registration
 * Registers the HistoricalVersionPlugin with the plugin system
 */
declare module 'HSApp.Plugin' {
  interface PluginRegistry {
    'hsw.plugin.historicalversion.Plugin': typeof HistoricalVersionPlugin;
  }
}

export default HistoricalVersionPlugin;