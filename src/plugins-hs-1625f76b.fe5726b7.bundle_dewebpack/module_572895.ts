import { DeleteCamera } from './camera-api';
import { resetCameraAction } from './actions/reset-camera';
import { setActiveCameraAction } from './actions/set-active-camera';
import { updateStartIndexAction } from './actions/update-start-index';
import { store } from './store';

interface NaviState {
  activeCamera: number;
  startIndex: number;
  pageSize: number;
}

interface AppState {
  navi: NaviState;
  positions: {
    size: number;
  };
}

type ThunkDispatch = (action: unknown) => void;
type ThunkAction = (dispatch: ThunkDispatch) => Promise<void>;

export default function deleteCameraThunk(cameraId: number): ThunkAction {
  return async (dispatch: ThunkDispatch): Promise<void> => {
    await DeleteCamera(cameraId);
    
    dispatch(resetCameraAction());
    
    const state = store.getState() as AppState;
    const { activeCamera, startIndex, pageSize } = state.navi;
    
    if (cameraId < activeCamera) {
      const newActiveCamera = activeCamera > 0 ? activeCamera - 1 : activeCamera;
      dispatch(setActiveCameraAction(newActiveCamera));
    }
    
    if (cameraId === activeCamera) {
      dispatch(setActiveCameraAction(-1));
    }
    
    if (startIndex >= state.positions.size) {
      const newStartIndex = startIndex - pageSize;
      dispatch(updateStartIndexAction(newStartIndex));
    }
  };
}