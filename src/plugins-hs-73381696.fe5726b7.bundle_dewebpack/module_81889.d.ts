/**
 * Loading Feedback Plugin Module
 * Handles loading states, feedback messages, and document lifecycle events
 */

declare namespace HSW.Plugin.LoadingFeedback {
  /**
   * Loading feedback type enumeration
   */
  type LoadingFeedbackType =
    | 'start'
    | 'completed'
    | 'contenterror'
    | 'designerror'
    | 'designerror_deleted'
    | 'opened'
    | 'openreadonly';

  /**
   * Signal payload for hide loading event
   */
  interface HideLoadingSignalPayload {
    /** Type of loading feedback */
    type: LoadingFeedbackType;
  }

  /**
   * Design metadata interface
   */
  interface DesignMetadata {
    /** Unique design identifier */
    designId: string;
    /** Human-readable design name */
    designName: string;
  }

  /**
   * Skybox configuration interface
   */
  interface SkyboxConfig {
    /** Whether skybox is enabled */
    enabled: boolean;
    /** Whether initial setup is complete */
    initialSet?: boolean;
  }

  /**
   * Design API response structure
   */
  interface DesignApiResponse {
    data?: {
      item?: {
        /** Thumbnail image URL */
        thumbnail?: string;
      };
    };
  }

  /**
   * Storage options configuration
   */
  interface StorageOptions {
    /** Whether storage is temporary */
    temp: boolean;
  }

  /**
   * Plugin configuration arguments
   */
  interface PluginConfig {
    /** Plugin display name */
    name: string;
    /** Plugin description */
    description: string;
  }

  /**
   * Main handler for loading feedback operations
   */
  interface Handler {
    /** Internal signal hook for event management */
    _signalHook?: HSCore.Util.SignalHook;

    /** Flag indicating if design was opened from floorplan library */
    _openDesignFromFloorplanLib: boolean;

    /** Signal dispatched when loading should be hidden */
    signalHideLoading?: HSCore.Util.Signal<HideLoadingSignalPayload>;

    /**
     * Initialize the loading feedback handler
     * @param app - Application instance
     */
    init(app: HSApp.App): void;

    /**
     * Handle task flush completion event
     * Checks for failed tasks and displays error feedback
     */
    onTaskFlushed(): void;

    /**
     * Control design loading UI states
     * @param show - Whether to show loading UI
     * @param feedbackType - Type of feedback to display
     * @param customMessage - Optional custom error message (for 'designerror' type)
     */
    designloading(
      show: boolean,
      feedbackType: LoadingFeedbackType,
      customMessage?: string
    ): void;

    /**
     * Retrieve value from temporary storage
     * @param key - Storage key
     * @param useTemp - Whether to use temporary storage
     * @returns Stored value or null
     */
    getFromStorage<T = unknown>(key: string, useTemp: boolean): T | null;

    /**
     * Store value in temporary storage
     * @param key - Storage key
     * @param value - Value to store (auto-serialized if object)
     * @param useTemp - Whether to use temporary storage
     */
    setToStorage(
      key: string,
      value: string | object | null,
      useTemp: boolean
    ): void;

    /**
     * Handle document opened event
     * Tracks special designs and manages import state
     */
    onDocumentOpened(): void;

    /**
     * Handle document resources loaded event
     * Displays 'opened' feedback when not in loading state
     */
    onDocumentResourceLoaded(): void;

    /**
     * Fetch and display underlay image for design
     * @param designId - Design identifier
     * @returns Promise resolving when image is loaded
     */
    showUnderlayImage(designId: string): Promise<void>;
  }

  /**
   * Loading Feedback Plugin class
   * Manages UI feedback during design loading operations
   */
  class Plugin extends HSApp.Plugin.IPlugin {
    /**
     * Create a new Loading Feedback Plugin instance
     */
    constructor();

    /**
     * Called when plugin is activated
     * @param context - Plugin activation context containing app reference
     */
    onActive(context: { app: HSApp.App }): void;

    /**
     * Called when plugin is deactivated
     */
    onDeactive(): void;
  }
}

/**
 * Global handler instance for loading feedback operations
 */
declare const LoadingFeedbackHandler: HSW.Plugin.LoadingFeedback.Handler;

/**
 * Plugin registration constant
 */
declare const LOADING_FEEDBACK_PLUGIN_ID = 'hsw.plugin.loadingfeedback';