/**
 * Camera deletion action creator module
 * 
 * This module provides a thunk action creator for deleting a camera
 * and handling the subsequent state updates.
 */

/**
 * State structure for the navigation slice
 */
interface NavigationState {
  /** Currently active camera index */
  activeCamera: number;
  /** Starting index for pagination */
  startIndex: number;
  /** Number of items per page */
  pageSize: number;
}

/**
 * State structure for positions
 */
interface PositionsState {
  /** Total number of positions/items */
  size: number;
}

/**
 * Root application state structure
 */
interface RootState {
  /** Navigation-related state */
  navi: NavigationState;
  /** Camera positions state */
  positions: PositionsState;
}

/**
 * Redux store with getState method
 */
interface ReduxStore {
  getState(): RootState;
}

/**
 * Redux dispatch function type
 */
type DispatchFunction = (action: unknown) => void;

/**
 * Thunk function type that receives dispatch
 */
type ThunkFunction = (dispatch: DispatchFunction) => Promise<void>;

/**
 * Deletes a camera from the API
 * @param cameraId - The ID of the camera to delete
 * @returns Promise that resolves when deletion is complete
 */
declare function DeleteCamera(cameraId: number): Promise<void>;

/**
 * Action creator for refreshing camera list
 * @returns Action object for camera list refresh
 */
declare function refreshCameraList(): unknown;

/**
 * Action creator for setting active camera
 * @param cameraIndex - Index of the camera to set as active
 * @returns Action object for setting active camera
 */
declare function setActiveCamera(cameraIndex: number): unknown;

/**
 * Action creator for updating pagination start index
 * @param startIndex - New start index for pagination
 * @returns Action object for updating start index
 */
declare function updateStartIndex(startIndex: number): unknown;

/**
 * Global store instance
 */
declare const store: ReduxStore;

/**
 * Creates a thunk action creator for deleting a camera
 * 
 * This function handles:
 * - Calling the delete API
 * - Refreshing the camera list
 * - Adjusting the active camera index if necessary
 * - Updating pagination if the current page becomes invalid
 * 
 * @param cameraId - The ID of the camera to delete
 * @returns A thunk function that performs the deletion and state updates
 * 
 * @example
 *