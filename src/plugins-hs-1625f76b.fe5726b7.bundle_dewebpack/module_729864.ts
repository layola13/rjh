import { createAction } from './actionCreator';
import actionTypes from './actionTypes';

interface ChangeStartIndexPayload {
  startIndex: number;
}

const changeStartIndexAction = createAction<ChangeStartIndexPayload>(
  actionTypes.CHANGE_START_INDEX
);

export default function changeStartIndex(startIndex: number) {
  return function(dispatch: (action: unknown) => void): void {
    dispatch(
      changeStartIndexAction({
        startIndex
      })
    );
  };
}