/**
 * Camera pagination state management module
 * Handles camera selection, pagination start index, and page size changes
 */

/**
 * State shape for camera pagination
 */
export interface CameraPaginationState {
  /** Currently active camera index, -1 indicates no camera selected */
  activeCamera: number;
  /** Starting index for pagination */
  startIndex: number;
  /** Number of items per page */
  pageSize: number;
}

/**
 * Payload for SELECT_CAMERA action
 */
export interface SelectCameraPayload {
  /** Index of the camera to select */
  selectIndex: number;
}

/**
 * Payload for CHANGE_START_INDEX action
 */
export interface ChangeStartIndexPayload {
  /** New starting index for pagination */
  startIndex: number;
}

/**
 * Payload for RESIZE_PAGE_LENGTH action
 */
export interface ResizePageLengthPayload {
  /** New page size */
  pageSize: number;
}

/**
 * Action types for camera pagination
 */
export interface CameraPaginationAction {
  type: string;
  payload?: SelectCameraPayload | ChangeStartIndexPayload | ResizePageLengthPayload;
}

/**
 * Redux reducer for camera pagination state
 * Handles SELECT_CAMERA, CHANGE_START_INDEX, and RESIZE_PAGE_LENGTH actions
 * 
 * @param state - Current camera pagination state
 * @param action - Dispatched action with optional payload
 * @returns Updated camera pagination state
 */
export default function cameraPaginationReducer(
  state: CameraPaginationState | undefined,
  action: CameraPaginationAction
): CameraPaginationState;

/**
 * Initial state for camera pagination
 */
export const initialState: CameraPaginationState;