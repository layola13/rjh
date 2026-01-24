/**
 * Analytics Plugin Type Definitions
 * Provides analytics tracking functionality including GA, ALI, ARMS, and APLUS
 */

/**
 * Aplus mapping configuration object
 * Maps custom event names to Aplus tracking identifiers
 */
export interface AplusMapping {
  [key: string]: unknown;
}

/**
 * Analytics event tracking configuration
 */
export interface EventTrackConfig {
  /** Google Analytics tracking enabled */
  GA?: boolean;
  /** Alibaba tracking enabled */
  ALI?: boolean;
  /** APLUS tracking enabled */
  APLUS?: boolean;
}

/**
 * HSApp configuration interface
 */
export interface HSAppConfig {
  /** Event tracking type configuration */
  EVENTTRACKTYPE: EventTrackConfig;
  /** Enable ARMS monitoring */
  ENABLE_ARMS?: boolean;
}

/**
 * Plugin metadata
 */
export interface PluginMetadata {
  /** Plugin name */
  name: string;
  /** Plugin description */
  description: string;
  /** List of plugin dependencies */
  dependencies: string[];
}

/**
 * Base plugin interface
 */
export interface IPlugin {
  /**
   * Called when plugin becomes active
   * @param context - Plugin context
   * @param options - Plugin options
   */
  onActive(context: unknown, options: unknown): void;

  /**
   * Called when plugin is deactivated
   */
  onDeactive(): void;
}

/**
 * Google Analytics tracker
 */
export declare class GATracker {
  constructor();
  /** Start Google Analytics tracking */
  start(): void;
}

/**
 * Alibaba analytics tracker
 */
export declare class AliTracker {
  constructor();
  /** Start Alibaba tracking */
  start(): void;
}

/**
 * ARMS monitoring tracker
 */
export declare class ARMSTracker {
  constructor();
  /** Start ARMS monitoring */
  start(): void;
}

/**
 * APLUS analytics tracker
 */
export declare class AplusTracker {
  constructor();
  
  /** Start APLUS tracking */
  start(): void;
  
  /**
   * Send UV (Unique Visitor) event to APLUS
   * @param eventName - Event identifier
   * @param eventData - Event data payload
   */
  sendUV(eventName: string, eventData?: Record<string, unknown>): void;
}

/**
 * Analytics plugin for HSApp
 * Integrates multiple analytics services (GA, ALI, ARMS, APLUS)
 */
export declare class AnalyticsPlugin extends IPlugin {
  /**
   * APLUS tracker instance (private)
   * @private
   */
  private readonly aplusInstance?: AplusTracker;

  constructor();

  /**
   * Activates the analytics plugin and initializes configured trackers
   * @param context - Plugin activation context
   * @param options - Plugin activation options
   */
  onActive(context: unknown, options: unknown): void;

  /**
   * Combines custom event mappings with default APLUS mapping
   * @param mappings - Custom event name to identifier mappings
   * @example
   * plugin.combine({
   *   'custom_event': 'aplus_event_id',
   *   'button_click': 'button_tracking_id'
   * });
   */
  combine(mappings: Record<string, unknown>): void;

  /**
   * Sends a UV (Unique Visitor) event to APLUS analytics
   * @param eventName - Event identifier name
   * @param eventData - Optional event data payload
   * @example
   * plugin.sendAplusUV('page_view', { page: '/home' });
   */
  sendAplusUV(eventName: string, eventData?: Record<string, unknown>): void;

  /**
   * Deactivates the analytics plugin
   */
  onDeactive(): void;
}

/**
 * HSApp plugin system namespace
 */
export namespace HSApp {
  namespace Plugin {
    /**
     * Base plugin interface that all plugins must implement
     */
    export { IPlugin };

    /**
     * Registers a plugin with the HSApp plugin system
     * @param pluginType - Type of plugin from HSFPConstants.PluginType
     * @param pluginClass - Plugin class constructor
     */
    export function registerPlugin(
      pluginType: string,
      pluginClass: new () => IPlugin
    ): void;
  }

  namespace Config {
    export { HSAppConfig, EventTrackConfig };
  }
}

/**
 * HSApp plugin type constants
 */
export namespace HSFPConstants {
  export enum PluginType {
    /** Analytics plugin type identifier */
    Analytics = "analytics"
  }
}

/**
 * Global window extensions
 */
declare global {
  interface Window {
    /** Debug mode flag */
    DEBUG?: boolean;
    /** HSApp global instance */
    HSApp: typeof HSApp;
  }
}

export default AnalyticsPlugin;