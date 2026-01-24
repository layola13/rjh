/**
 * Redux connected camera navigation component
 * Connects a camera display component with Redux store state and action handlers
 */

import { ComponentType } from 'react';
import { ConnectedComponent } from 'react-redux';

/**
 * Position information for camera placement or view
 */
export interface Position {
  x: number;
  y: number;
  z?: number;
  [key: string]: unknown;
}

/**
 * Camera identifier and metadata
 */
export interface Camera {
  id: string;
  name: string;
  [key: string]: unknown;
}

/**
 * Redux state structure for camera navigation
 */
export interface NavigationState {
  /** Starting index for pagination */
  startIndex: number;
  /** Currently active/selected camera */
  activeCamera: Camera | null;
  /** Number of items per page */
  pageSize: number;
}

/**
 * Global Redux store state
 */
export interface RootState {
  /** Read-only mode flag */
  isReadonly: boolean;
  /** Navigation state including camera selection */
  navi: NavigationState;
  /** Array of camera positions */
  positions: Position[];
}

/**
 * Props mapped from Redux state
 */
export interface StateProps {
  /** Indicates if UI is in read-only mode */
  isReadonly: boolean;
  /** Current pagination start index */
  startIndex: number;
  /** The currently selected camera */
  selectedCamera: Camera | null;
  /** List of all camera positions */
  positions: Position[];
  /** Items displayed per page */
  pageSize: number;
}

/**
 * Action handler for camera selection
 * @param camera - The camera to select
 */
export type ClickCameraHandler = (camera: Camera) => void;

/**
 * Action handler for deleting items
 * @param id - Identifier of the item to delete
 */
export type DeleteHandler = (id: string) => void;

/**
 * Action handler for window resize events
 * @param width - New window width
 * @param height - New window height
 */
export type ResizeWindowHandler = (width: number, height: number) => void;

/**
 * Action handler for pagination button clicks
 * @param pageNumber - Target page number (1-indexed)
 */
export type PageButtonHandler = (pageNumber: number) => void;

/**
 * Action creators bound to dispatch
 */
export interface DispatchProps {
  /** Handler for clicking/selecting a camera */
  clickCameraHandler: ClickCameraHandler;
  /** Handler for deleting items */
  deleteHandler: DeleteHandler;
  /** Handler for window resize events */
  resizeWindowHandler: ResizeWindowHandler;
  /** Handler for page navigation buttons */
  pageButtonHandler: PageButtonHandler;
}

/**
 * Combined props for the connected component
 */
export type ConnectedProps = StateProps & DispatchProps;

/**
 * The base presentational component (before Redux connection)
 */
export type CameraNavigationComponent = ComponentType<ConnectedProps>;

/**
 * Redux connected camera navigation component
 * Provides camera selection, pagination, and window resize capabilities
 */
declare const ConnectedCameraNavigation: ConnectedComponent<
  CameraNavigationComponent,
  Omit<ConnectedProps, keyof StateProps | keyof DispatchProps>
>;

export default ConnectedCameraNavigation;