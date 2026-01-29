import { createAction } from './createAction';
import actionTypes from './actionTypes';
import { getCameraPositions } from './cameraUtils';
import { Dispatch } from 'redux';

interface CameraPosition {
  x: number;
  y: number;
  z: number;
  [key: string]: unknown;
}

const collectProductsSucceeded = createAction(actionTypes.COLLECT_PRODUCTS_SUCCEEDED);

export default function collectProducts() {
  return function (dispatch: Dispatch): Promise<void> {
    const cameraPositions: CameraPosition[] | null = getCameraPositions();
    
    if (cameraPositions && cameraPositions.length !== 0) {
      dispatch(collectProductsSucceeded(cameraPositions));
      return Promise.resolve();
    }
    
    dispatch(collectProductsSucceeded([]));
    return Promise.resolve();
  };
}