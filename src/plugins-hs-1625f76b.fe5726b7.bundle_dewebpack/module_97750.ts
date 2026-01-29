import { handleActions } from 'redux-actions';
import { CALL_PLUGIN } from './constants';

interface PluginPayload {
  [key: string]: unknown;
}

interface CallPluginAction {
  type: typeof CALL_PLUGIN;
  payload?: PluginPayload;
}

type PluginState = PluginPayload | 'renderPlugin';

const initialState: PluginState = 'renderPlugin';

export default handleActions<PluginState, PluginPayload>(
  {
    [CALL_PLUGIN]: (state: PluginState, action: CallPluginAction): PluginState => {
      return action.payload ? action.payload : state;
    },
  },
  initialState
);