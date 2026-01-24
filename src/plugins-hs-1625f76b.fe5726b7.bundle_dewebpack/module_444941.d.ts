/**
 * Camera products collection module
 * Collects camera position data and dispatches success action
 */

import { Action } from 'redux';

/**
 * Camera position data structure
 */
export interface CameraPosition {
  x?: number;
  y?: number;
  z?: number;
  rotation?: number;
  [key: string]: unknown;
}

/**
 * Redux action payload for camera products collection
 */
export interface CollectProductsSucceededAction extends Action {
  type: string;
  payload: CameraPosition[];
}

/**
 * Thunk action creator that collects camera products
 * Retrieves camera positions and dispatches a success action
 * 
 * @returns A thunk function that dispatches camera position data
 * 
 * @example
 *