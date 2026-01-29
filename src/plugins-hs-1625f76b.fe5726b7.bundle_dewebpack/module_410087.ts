import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';

interface AnimationState {
  isAnimating: boolean;
}

const initialState: AnimationState = {
  isAnimating: false
};

const animationReducer = handleActions<boolean, void>(
  {
    [actionTypes.START_ANIMATION]: (): boolean => {
      return true;
    },
    [actionTypes.END_ANIMATION]: (): boolean => {
      return false;
    }
  },
  false
);

export default animationReducer;