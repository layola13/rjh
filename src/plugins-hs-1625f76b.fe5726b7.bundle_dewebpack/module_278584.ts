import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';

interface ShowHideState {
  isVisible: boolean;
}

const initialState: boolean = false;

export default handleActions<boolean, void>(
  {
    [actionTypes.SHOW]: (): boolean => {
      return true;
    },
    [actionTypes.HIDE]: (): boolean => {
      return false;
    }
  },
  initialState
);