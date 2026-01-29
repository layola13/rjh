import { combineReducers } from 'redux';
import isShownReducer from './isShown';
import positionsReducer from './positions';
import naviReducer from './navi';
import isAnimationReducer from './isAnimation';
import callPluginReducer from './callPlugin';
import isReadonlyReducer from './isReadonly';

const rootReducer = combineReducers({
  isReadonly: isReadonlyReducer,
  isShown: isShownReducer,
  navi: naviReducer,
  positions: positionsReducer,
  isAnimation: isAnimationReducer,
  callplugin: callPluginReducer
});

export default rootReducer;