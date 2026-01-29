import { createAction } from './createAction';
import actionTypes from './actionTypes';
import { getPageSize } from './utils';

interface PageSize {
  pageSize: {
    width: number;
    height: number;
  };
}

type AppDispatch = (action: unknown) => void;

const resizePageLength = createAction(actionTypes.RESIZE_PAGE_LENGTH);

export default function (): (dispatch: AppDispatch) => void {
  return function (dispatch: AppDispatch): void {
    const pageSize = getPageSize();
    dispatch(resizePageLength({ pageSize }));
  };
}