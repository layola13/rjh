/**
 * EZHome Persistence Plugin
 * Handles design data persistence and synchronization with EZHome host
 */

declare module 'hsw.brand.ezhome.persistence.Plugin' {
  import { IPlugin, PluginActivationContext, PluginMetadata } from 'HSApp.Plugin';
  import { SignalHook } from 'HSCore.Util';
  import { App } from 'HSApp.App';
  import { DesignMetadata } from 'HSApp.DesignMetadata';

  /**
   * Message types received from EZHome host via postMessage API
   */
  type EZHomeMessageType = 'changeStatusFromSJJ' | 'changNameFromSJJ';

  /**
   * Structure of messages received from EZHome host window
   */
  interface EZHomeMessage {
    /** Event type identifier */
    eType: EZHomeMessageType;
    /** Design status value (for changeStatusFromSJJ) */
    statusValue?: string;
    /** Design name (for changNameFromSJJ) */
    designName?: string;
  }

  /**
   * Design information structure sent to EZHome
   */
  interface DesignInfo {
    /** Unique identifier for the design */
    designId: string;
    /** Design attributes metadata */
    designAttributes: Record<string, unknown>;
    /** Design title/name */
    title: string;
    /** Current document status */
    status: string;
  }

  /**
   * Metadata change event structure
   */
  interface MetadataChangedEvent {
    /** Changed data properties */
    data: {
      documentStatus?: string;
      designName?: string;
      [key: string]: unknown;
    };
  }

  /**
   * EZHome Persistence Plugin
   * 
   * Manages persistence of floorplan design data and synchronizes
   * design state between the application and EZHome host system.
   * 
   * Features:
   * - Listens for design status and name changes from EZHome host
   * - Syncs metadata changes back to EZHome
   * - Handles cross-origin communication via postMessage API
   */
  export class EZHomePersistencePlugin extends IPlugin {
    /**
     * Constructs the EZHome persistence plugin with metadata
     */
    constructor();

    /**
     * Activates the plugin and sets up event listeners
     * 
     * @param context - Plugin activation context
     * @param app - Application instance
     * 
     * Responsibilities:
     * 1. Sets up window message listener for EZHome host communication
     * 2. Handles incoming status and name change events
     * 3. Listens to internal metadata changes and syncs to EZHome
     */
    onActive(context: PluginActivationContext, app: App): void;

    /**
     * Plugin metadata
     */
    protected metadata: PluginMetadata;
  }

  /**
   * Plugin registration with the application framework
   */
  export function registerPlugin(): void;
}

/**
 * Global plugin registration
 */
declare global {
  namespace HSApp {
    namespace Plugin {
      /**
       * Plugin registry key for EZHome persistence
       */
      const EZHomePersistencePluginKey: 'hsw.brand.ezhome.persistence.Plugin';
    }
  }
}