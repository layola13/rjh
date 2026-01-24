/**
 * Action types for camera management and product collection
 * @module CameraActionTypes
 */

/**
 * Defines all action type constants for camera-related Redux actions
 */
interface CameraActionTypes {
  /** Dispatched when products are successfully collected */
  readonly COLLECT_PRODUCTS_SUCCEEDED: "COLLECT_PRODUCTS_SUCCEEDED";
  
  /** Dispatched to show the camera UI */
  readonly SHOW: "SHOW";
  
  /** Dispatched to hide the camera UI */
  readonly HIDE: "HIDE";
  
  /** Dispatched when an animation starts */
  readonly START_ANIMATION: "START_ANIMATION";
  
  /** Dispatched when an animation ends */
  readonly END_ANIMATION: "END_ANIMATION";
  
  /** Dispatched during camera creation process */
  readonly CREATING_CAMERA: "CREATING";
  
  /** Dispatched to create a new camera */
  readonly CREATE_CAMERA: "CREATE_CAMERA";
  
  /** Dispatched to delete an existing camera */
  readonly DELETE_CAMERA: "DELETE_CAMERA";
  
  /** Dispatched to rename a camera */
  readonly RENAME_CAMERA: "RENAME_CAMERA";
  
  /** Dispatched to select a camera */
  readonly SELECT_CAMERA: "SELECT_CAMERA";
  
  /** Dispatched to reset the state to initial values */
  readonly RESET_STATE: "RESET_STATE";
  
  /** Dispatched to invoke a plugin */
  readonly CALL_PLUGIN: "CALL_PLUGIN";
  
  /** Dispatched to change the starting index for pagination */
  readonly CHANGE_START_INDEX: "CHANGE_START_INDEX";
  
  /** Dispatched to resize the page length */
  readonly RESIZE_PAGE_LENGTH: "RESIZE_PAGE_LENGTH";
  
  /** Dispatched to set readonly mode */
  readonly SETREADONLY: "SET_READONLY";
}

/**
 * Frozen object containing all camera action type constants
 */
declare const cameraActionTypes: Readonly<CameraActionTypes>;

export default cameraActionTypes;

/**
 * Union type of all possible camera action type values
 */
export type CameraActionType = CameraActionTypes[keyof CameraActionTypes];