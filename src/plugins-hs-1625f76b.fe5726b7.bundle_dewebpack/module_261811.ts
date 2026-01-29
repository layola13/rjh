import { handleActions } from 'redux-actions';

interface SetReadonlyAction {
  type: string;
  payload: boolean;
}

type State = boolean;

const SETREADONLY = 'SETREADONLY';

const readonlyReducer = handleActions<State, SetReadonlyAction>(
  {
    [SETREADONLY]: (state: State, action: SetReadonlyAction): State => {
      return state !== action.payload ? action.payload : state;
    }
  },
  false
);

export default readonlyReducer;