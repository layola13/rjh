/**
 * Camera Position Plugin Module
 * Manages camera position snapshots and provides UI for viewing/editing camera positions
 */

import { Store } from 'redux';
import { IPlugin, PluginContext, PluginMetadata } from 'HSApp.Plugin';
import { App, FloorPlan, Snapshot } from 'HSApp.App';

/**
 * Error codes mapping for API responses
 */
interface CodeMessageMap {
  [statusCode: number]: string;
}

/**
 * Custom error class for RIBP API errors
 */
declare class RIBPApiError extends Error {
  constructor(message: string, status: number);
  status: number;
}

/**
 * API response status codes
 */
declare enum RIBPApiStatus {
  STATUS_GENERAL_ERROR = -1,
}

/**
 * Camera position data structure
 */
interface CameraPosition {
  /** Unique identifier for the camera position */
  id: string;
  /** Human-readable name */
  name: string;
  /** Camera position vector [x, y, z] */
  position: [number, number, number];
  /** Camera target/look-at point [x, y, z] */
  target: [number, number, number];
  /** Field of view in degrees */
  fov?: number;
  /** Camera up vector [x, y, z] */
  up?: [number, number, number];
}

/**
 * API response structure for camera positions
 */
interface CameraPositionResponse {
  /** Array of camera position snapshots */
  positions: CameraPosition[];
}

/**
 * Redux state for camera position plugin
 */
interface CameraPositionState {
  /** Whether the plugin UI is currently visible */
  isShown: boolean;
  /** Whether the plugin UI is pinned (won't auto-hide) */
  isPinned: boolean;
  /** Whether the plugin is in readonly mode */
  isReadonly: boolean;
}

/**
 * Redux action creators
 */
declare function showCameraPosition(data: unknown, isReadonly: boolean): { type: string; payload: unknown };
declare function hideCameraPosition(): { type: string };
declare function setReadonlyMode(isReadonly: boolean): { type: string; payload: boolean };

/**
 * Contextual tools plugin interface
 */
interface ContextualToolsPlugin {
  /** Signal dispatched when popup control state changes */
  signalContralPopup: {
    listen(callback: (isActive: boolean) => void): void;
  };
}

/**
 * Orbit view plugin interface
 */
interface OrbitViewPlugin {
  /** Signal dispatched when camera position popup state changes */
  signalCameraPositionPopup: {
    dispatch(payload: { isActive: boolean }): void;
  };
}

/**
 * Get the contextual tools plugin instance
 */
declare function getContextualToolsPlugin(): ContextualToolsPlugin;

/**
 * Redux store instance for camera position plugin
 */
declare const cameraPositionStore: Store<CameraPositionState>;

/**
 * Root div ID for React component mounting
 */
declare const rootDivId: string;

/**
 * Plugin constants
 */
declare namespace HSFPConstants {
  enum PluginType {
    ContextualTools = 'ContextualTools',
  }
}

/**
 * Camera Position Plugin
 * Provides functionality to list, view, and manage camera position snapshots
 * Integrates with the floorplan viewer and contextual tools system
 */
declare class CameraPositionPlugin extends IPlugin {
  /** Application instance */
  private app: App;
  
  /** Whether the plugin is in readonly mode (view only, no editing) */
  private isReadonly: boolean;

  constructor();

  /**
   * Called when the plugin is activated
   * Initializes UI, sets up event listeners, and loads camera data
   * @param context - Plugin activation context
   * @param metadata - Plugin metadata
   */
  onActive(context: PluginContext, metadata: PluginMetadata): void;

  /**
   * Loads camera position information from design metadata
   * Fetches camera positions from remote URL if no local snapshots exist
   * @throws {RIBPApiError} If the API request fails
   */
  loadCameraInfo(): Promise<void>;

  /**
   * Shows the camera position UI panel
   * @param data - Data to display in the panel
   */
  show(data: unknown): void;

  /**
   * Hides the camera position UI panel
   * Dispatches signals to notify other plugins
   */
  hide(): void;

  /**
   * Checks if the camera position panel is currently visible
   * @returns True if the panel is shown
   */
  isShown(): boolean;

  /**
   * Sets the plugin to edit mode (allows modifications)
   */
  setCameraPositionEditMode(): void;

  /**
   * Sets the plugin to readonly mode (view only)
   */
  setCameraPositionReadonlyMode(): void;

  /**
   * Checks if the panel is pinned (won't auto-hide)
   * @returns True if the panel is pinned
   */
  isPinned(): boolean;

  /**
   * Internal method to check and hide the panel if not pinned
   * Called in response to external events
   * @private
   */
  private _checkHide(): void;
}

/**
 * Plugin registration
 * Registers the Camera Position Plugin with the HSApp plugin system
 */
declare module 'HSApp.Plugin' {
  interface PluginRegistry {
    'hsw.plugin.cameraposition.Plugin': typeof CameraPositionPlugin;
  }
}

export { CameraPositionPlugin, CameraPosition, CameraPositionState };