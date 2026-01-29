import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';
import { getPageSize } from './pageUtils';

interface CameraState {
  activeCamera: number;
  startIndex: number;
  pageSize: number;
}

interface SelectCameraPayload {
  selectIndex: number;
}

interface ChangeStartIndexPayload {
  startIndex: number;
}

interface ResizePageLengthPayload {
  pageSize: number;
}

interface Action<T = unknown> {
  type: string;
  payload?: T;
}

const initialState: CameraState = {
  activeCamera: -1,
  startIndex: 0,
  pageSize: getPageSize()
};

export default handleActions<CameraState, unknown>(
  {
    [actionTypes.SELECT_CAMERA]: (
      state: CameraState,
      action: Action<SelectCameraPayload>
    ): CameraState => {
      return action.payload
        ? {
            ...state,
            activeCamera: action.payload.selectIndex
          }
        : state;
    },

    [actionTypes.CHANGE_START_INDEX]: (
      state: CameraState,
      action: Action<ChangeStartIndexPayload>
    ): CameraState => {
      return action.payload
        ? {
            ...state,
            startIndex: action.payload.startIndex
          }
        : state;
    },

    [actionTypes.RESIZE_PAGE_LENGTH]: (
      state: CameraState,
      action: Action<ResizePageLengthPayload>
    ): CameraState => {
      return action.payload
        ? {
            ...state,
            pageSize: action.payload.pageSize
          }
        : state;
    }
  },
  initialState
);