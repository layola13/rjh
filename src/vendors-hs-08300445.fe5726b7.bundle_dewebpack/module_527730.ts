interface Action {
  type: string;
  [key: string]: any;
}

interface ReducersMapObject<S = any> {
  [key: string]: (state: S[Extract<keyof S, string>] | undefined, action: Action) => S[Extract<keyof S, string>];
}

type Reducer<S = any> = (state: S | undefined, action: Action) => S;

const ActionTypes = {
  INIT: '@@redux/INIT'
};

function getUndefinedStateErrorMessage(reducerKey: string, action: Action): string {
  const actionType = action?.type;
  const actionDescription = actionType ? `"${actionType.toString()}"` : "an action";
  return `Given action ${actionDescription}, reducer "${reducerKey}" returned undefined. To ignore an action, you must explicitly return the previous state.`;
}

function assertReducerShape(reducers: ReducersMapObject): void {
  Object.keys(reducers).forEach((reducerKey) => {
    const reducer = reducers[reducerKey];
    const initialState = reducer(undefined, { type: ActionTypes.INIT });

    if (initialState === undefined) {
      throw new Error(
        `Reducer "${reducerKey}" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.`
      );
    }

    const probeActionType = `@@redux/PROBE_UNKNOWN_ACTION_${Math.random()
      .toString(36)
      .substring(7)
      .split("")
      .join(".")}`;

    if (reducer(undefined, { type: probeActionType }) === undefined) {
      throw new Error(
        `Reducer "${reducerKey}" returned undefined when probed with a random type. Don't try to handle ${ActionTypes.INIT} or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined.`
      );
    }
  });
}

export default function combineReducers<S>(reducers: ReducersMapObject<S>): Reducer<S> {
  const reducerKeys = Object.keys(reducers);
  const finalReducers: ReducersMapObject<S> = {};

  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }

  const finalReducerKeys = Object.keys(finalReducers);

  let shapeAssertionError: Error | undefined;
  try {
    assertReducerShape(finalReducers);
  } catch (error) {
    shapeAssertionError = error as Error;
  }

  return function combination(state: S = {} as S, action: Action): S {
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    let hasChanged = false;
    const nextState: any = {};

    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];
      const previousStateForKey = (state as any)[key];
      const nextStateForKey = reducer(previousStateForKey, action);

      if (nextStateForKey === undefined) {
        const errorMessage = getUndefinedStateErrorMessage(key, action);
        throw new Error(errorMessage);
      }

      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    return hasChanged ? nextState : state;
  };
}