/**
 * Camera selection action creator module
 * Handles camera transitions and view switching in the floorplan application
 */

import { Action } from 'redux';
import { createAction } from 'redux-actions';

/**
 * Camera position configuration
 */
interface CameraPosition {
  /** Camera view type: 'orbitview' for 3D, other values for 2D */
  type: string;
  /** Camera parameters */
  camera: CameraParameters;
}

/**
 * Camera configuration parameters
 */
interface CameraParameters {
  /** Horizontal field of view in degrees */
  horizontal_fov: number;
  /** Vertical pitch angle in degrees */
  pitch: number;
  /** Target X coordinate */
  target_x: number;
  /** Target Y coordinate */
  target_y: number;
  /** Camera X position */
  x: number;
  /** Camera Y position */
  y: number;
  /** Camera Z position */
  z: number;
  /** Near clipping plane distance */
  near: number;
}

/**
 * Floorplan camera object
 */
interface FloorplanCamera extends CameraParameters {
  /** Camera view type */
  type: string;
}

/**
 * Skybox controller interface
 */
interface Skybox {
  /** Enable or disable the skybox */
  setEnabled(enabled: boolean): void;
}

/**
 * Floorplan controller interface
 */
interface Floorplan {
  /** Currently active camera */
  active_camera: FloorplanCamera;
  /** Available cameras indexed by type or ID */
  cameras: Record<string, FloorplanCamera>;
  /** Skybox controller */
  skybox: Skybox;
}

/**
 * Plugin manager interface
 */
interface PluginManager {
  /** Retrieve a plugin by its type constant */
  getPlugin(pluginType: string): Plugin | undefined;
}

/**
 * Generic plugin interface
 */
interface Plugin {
  /** Display the plugin UI */
  show(): void;
}

/**
 * Render plugin interface
 */
interface RenderPlugin {
  /** Switch the image rendering type (e.g., "0" for 2D, "2" for 3D orbit) */
  selectImageType(imageType: string): void;
}

/**
 * Main application instance
 */
interface App {
  /** Active environment identifier */
  activeEnvironmentId: string;
  /** Floorplan controller */
  floorplan: Floorplan;
  /** Plugin manager */
  pluginManager: PluginManager;
}

/**
 * Global constants namespace
 */
declare const HSFPConstants: {
  Environment: {
    Render: string;
  };
  PluginType: {
    ViewSwitch: string;
  };
};

/**
 * TWEEN animation library
 */
declare const TWEEN: {
  Tween: new <T>(target: T) => {
    to(properties: Partial<T>, duration: number): {
      easing(easingFunction: (k: number) => number): {
        start(): void;
      };
    };
  };
  Easing: {
    Quadratic: {
      Out: (k: number) => number;
    };
  };
};

/**
 * Action payload for camera selection
 */
interface SelectCameraPayload {
  /** Selected camera index */
  selectIndex: number;
}

/**
 * Redux action for selecting a camera
 */
type SelectCameraAction = Action<string> & SelectCameraPayload;

/**
 * Retrieves the main application instance
 * @returns The application object
 */
export declare function getApp(): App;

/**
 * Retrieves all available camera positions
 * @returns Array of camera position configurations
 */
export declare function getCameraPositions(): CameraPosition[] | undefined;

/**
 * Retrieves the render plugin instance
 * @returns The render plugin controller
 */
export declare function getRenderPlugin(): RenderPlugin;

/**
 * Action type constant for camera selection
 */
export declare const SELECT_CAMERA: string;

/**
 * Selects and transitions to a camera at the specified index
 * 
 * This action:
 * 1. Validates the camera index against available positions
 * 2. Switches render mode if camera type changes (2D ↔ 3D)
 * 3. Manages skybox visibility based on environment
 * 4. Animates camera transition over 500ms with quadratic easing
 * 
 * @param cameraIndex - Zero-based index of the camera to select
 * @returns Redux action with camera selection metadata
 * 
 * @example
 *