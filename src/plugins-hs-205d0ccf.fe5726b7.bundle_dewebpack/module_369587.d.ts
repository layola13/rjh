/**
 * Share Viewer Plugin
 * 
 * This plugin provides functionality to share floor plan designs through a viewer interface.
 * It handles saving the design, generating share URLs, and opening the share viewer in a new window.
 */

import { HSApp } from './HSApp';
import { IPlugin } from './IPlugin';

/**
 * Configuration for plugin dependencies
 */
interface PluginConfig {
  /** Plugin name */
  name: string;
  /** List of dependent plugin types */
  dependencies: string[];
}

/**
 * Design metadata interface
 */
interface DesignMetadata {
  /** Get metadata value by key */
  get(key: string): string | undefined;
}

/**
 * Application instance interface
 */
interface App {
  /** Design metadata accessor */
  designMetadata: DesignMetadata;
  /** Application parameters */
  appParams: AppParams;
  /** Flag indicating if floorplan has unsaved changes */
  isFloorplanDirty: boolean;
  /** Plugin manager instance */
  pluginManager: PluginManager;
}

/**
 * Application parameters
 */
interface AppParams {
  /** Current locale/language code */
  locale: string;
}

/**
 * Plugin manager interface
 */
interface PluginManager {
  /** Retrieve a registered plugin by type */
  getPlugin(pluginType: string): any;
}

/**
 * Persistence plugin interface
 */
interface PersistencePlugin {
  /**
   * Save the current design
   * @param param1 - Save option flag 1
   * @param param2 - Save option flag 2
   * @param param3 - Save option flag 3
   * @returns Promise resolving to true if save succeeded
   */
  save(param1: boolean, param2: boolean, param3: boolean): Promise<boolean>;
}

/**
 * Render plugin interface
 */
interface RenderPlugin {
  /** Get the render handler */
  getHandler(): RenderHandler;
}

/**
 * Render handler interface
 */
interface RenderHandler {
  /**
   * Upload scene data to cloud storage
   * @param url - Target upload URL
   * @param options - Upload options
   */
  uploadSceneData(url: string, options: UploadOptions): Promise<void>;
}

/**
 * Upload options for scene data
 */
interface UploadOptions {
  /** OSS (Object Storage Service) specific options */
  oss: {
    /** HTTP headers for the upload request */
    headers: {
      /** Access control level for the uploaded object */
      'x-oss-object-acl': string;
      /** Content type of the uploaded data */
      'Content-Type': string;
    };
  };
}

/**
 * Scene JSON URL response
 */
interface SceneJsonUrlResponse {
  /** Response data */
  data?: {
    /** ACL (Access Control List) URL for scene data upload */
    aclUrl?: string;
  };
}

/**
 * White label benefit metadata
 */
interface BenefitMeta {
  /** Custom share viewer URL */
  link?: string;
}

/**
 * Global user object interface
 */
interface AdskUser {
  /**
   * Get white label benefit metadata
   * @param category - Benefit category
   * @param key - Benefit key
   */
  getBenefitMeta(category: string, key: string): BenefitMeta | undefined;
}

/**
 * Global NWTK API interface
 */
interface NWTK {
  mtop: {
    Design: {
      /**
       * Get scene JSON URL for a design
       * @param params - Request parameters
       */
      sceneJsonUrl(params: { data: { designId: string } }): Promise<SceneJsonUrlResponse>;
    };
  };
}

/**
 * Global declarations
 */
declare global {
  const adskUser: AdskUser;
  const NWTK: NWTK;
  
  namespace HSFPConstants {
    enum PluginType {
      Persistence = 'hsw.plugin.persistence.Plugin',
      ShareViewer = 'hsw.plugin.shareViewer.Plugin',
    }
  }
}

/**
 * Share Viewer Plugin
 * 
 * Enables sharing of floor plan designs through a dedicated viewer interface.
 * Manages design persistence, scene data upload, and share URL generation.
 */
export declare class ShareViewerPlugin extends IPlugin {
  /**
   * Creates a new ShareViewerPlugin instance
   */
  constructor();

  /**
   * Called when the plugin becomes active
   * @param param1 - Activation parameter 1
   * @param param2 - Activation parameter 2
   */
  onActive(param1: unknown, param2: unknown): void;

  /**
   * Opens the share viewer in a new browser window
   * @param designId - Optional design ID to share (defaults to current design)
   */
  jumpToShareViewer(designId?: string): void;

  /**
   * Generates the share viewer URL for a design
   * @param designId - Optional design ID (defaults to current design)
   * @returns Complete share viewer URL with query parameters
   */
  getShareViewerUrl(designId?: string): string;

  /**
   * Ensures the current design is saved before sharing
   * 
   * If the design has unsaved changes or no design ID exists, triggers a save operation.
   * After saving, updates the scene URL for cloud access.
   * 
   * @returns Promise resolving to true when save and update complete
   */
  ensureSaved(): Promise<boolean>;

  /**
   * Updates the scene data URL in cloud storage
   * 
   * Retrieves the ACL URL for the design's scene data and uploads the current
   * scene JSON with public read permissions.
   * 
   * @param designId - Optional design ID (defaults to current design)
   * @returns Promise resolving to true if upload succeeded, false otherwise
   */
  updateSceneUrl(designId?: string): Promise<boolean>;
}

/**
 * Plugin registration
 */
export {};