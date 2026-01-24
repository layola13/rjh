/**
 * Animation and camera creation action creator for rendering workflow.
 * Ensures document is saved before starting animation and creating camera.
 * 
 * @module CameraCreationAction
 */

import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

/**
 * Action types for camera creation workflow
 */
export enum CameraActionTypes {
  /** Indicates camera creation is in progress */
  CREATING_CAMERA = 'CREATING_CAMERA',
  /** Marks the start of animation sequence */
  START_ANIMATION = 'START_ANIMATION',
  /** Marks the end of animation sequence */
  END_ANIMATION = 'END_ANIMATION'
}

/**
 * Redux state shape for the store
 */
interface RootState {
  /** Animation state */
  isAnimation: boolean;
}

/**
 * Application plugin manager interface
 */
interface PluginManager {
  /**
   * Get a plugin instance by name
   * @param pluginName - Fully qualified plugin name
   */
  getPlugin(pluginName: string): PersistencePlugin;
}

/**
 * Persistence plugin interface for save operations
 */
interface PersistencePlugin {
  /**
   * Ensures the current document is saved
   * @returns Promise resolving to true if saved, false otherwise
   */
  ensureSaved(): Promise<boolean>;
}

/**
 * 3D view context information
 */
interface ViewContext {
  /** Client rectangle of the view */
  clientRect: {
    width: number;
    height: number;
  };
}

/**
 * Active 3D view interface
 */
interface Active3DView {
  context: ViewContext;
}

/**
 * HSApp application interface
 */
interface HSApplication {
  /** Plugin manager instance */
  pluginManager: PluginManager;
  /**
   * Get the active 3D view
   * @returns Active 3D view instance
   */
  getActive3DView(): Active3DView;
  /**
   * Save document with specified options
   * @param name - Document name/description
   * @param options - Save options
   * @param callback - Callback receiving saved image path
   */
  saveDocument(
    name: string,
    options: SaveDocumentOptions,
    callback: (imagePath: string) => void
  ): void;
}

/**
 * Options for saving document as image
 */
interface SaveDocumentOptions {
  /** Horizontal offset for rendering */
  offsetWidth: number;
  /** Image format (e.g., "image/png") */
  format: string;
  /** Image width in pixels */
  width: number;
  /** Image height in pixels */
  height: number;
  /** Whether to render foreground only */
  forground: boolean;
}

/**
 * Clipping bounds tuple [x, y, width, height]
 */
type ClipBounds = [number, number, number, number];

/**
 * Redux action creator function
 * @param type - Action type
 * @returns Action creator function
 */
declare function createAction<T = any>(type: string): (payload?: T) => Action & { payload?: T };

/**
 * Get current Redux state
 * @returns Current root state
 */
declare function getState(): RootState;

/**
 * Get the main application instance
 * @returns Application instance
 */
declare function getApp(): HSApplication;

/**
 * Get contextual tools plugin
 */
declare function getContextualToolsPlugin(): void;

/**
 * Calculate clipping bounds for an image
 * @param width - Image width
 * @param height - Image height
 * @param autoDetect - Whether to auto-detect bounds
 * @returns Clipping bounds array
 */
declare function getClipBound(width: number, height: number, autoDetect: boolean): ClipBounds;

/**
 * Extract clipped image data
 * @param image - Source image
 * @param width - Source width
 * @param height - Source height
 * @param clipWidth - Clipped width
 * @param clipHeight - Clipped height
 * @param offset - Horizontal offset
 * @returns Clipped image data
 */
declare function getClipData(
  image: any,
  width: number,
  height: number,
  clipWidth: number,
  clipHeight: number,
  offset: number
): any;

/**
 * Create camera in the 3D scene
 * @returns Promise resolving when camera is created
 */
declare function CreateCamera(): Promise<void>;

/**
 * Thunk action creator for camera creation workflow.
 * 
 * Workflow:
 * 1. Ensures document is saved via persistence plugin
 * 2. Checks if animation is not already running
 * 3. Dispatches START_ANIMATION action
 * 4. Optionally captures 3D viewport thumbnail
 * 5. Creates camera in the scene
 * 6. Dispatches END_ANIMATION and cleanup actions
 * 
 * @param thumbnailCallback - Optional callback to receive clipped thumbnail data
 * @returns Thunk function that executes the workflow
 */
declare function createCameraWithAnimation(
  thumbnailCallback?: (clippedImageData: any) => void
): ThunkAction<Promise<void>, RootState, unknown, Action>;

export default createCameraWithAnimation;