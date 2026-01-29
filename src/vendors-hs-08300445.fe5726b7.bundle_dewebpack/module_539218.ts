interface Action<T = any> {
  type: string;
  error?: boolean;
  payload?: T;
}

interface ReducerHandler<S> {
  (state: S, action: Action): S;
}

interface ReducerObject<S> {
  next: ReducerHandler<S>;
  throw: ReducerHandler<S>;
}

type Reducer<S> = ReducerHandler<S> | ReducerObject<S>;

const ACTION_TYPE_DELIMITER = '/';

const identity = <T>(value: T): T => value;

const isFunction = (value: unknown): value is Function => 
  typeof value === 'function';

const isPlainObject = (value: unknown): value is Record<string, any> => 
  value !== null && typeof value === 'object' && value.constructor === Object;

const isUndefined = (value: unknown): value is undefined => 
  value === undefined;

const includes = <T>(array: T[], value: T): boolean => 
  array.indexOf(value) !== -1;

const invariant = (condition: boolean, message: string): void => {
  if (!condition) {
    throw new Error(message);
  }
};

export default function createReducer<S>(
  actionTypes: { toString: () => string },
  reducer: Reducer<S> = identity,
  defaultState: S
): ReducerHandler<S> {
  const actionTypeList = actionTypes.toString().split(ACTION_TYPE_DELIMITER);
  
  invariant(
    !isUndefined(defaultState),
    `defaultState for reducer handling ${actionTypeList.join(', ')} should be defined`
  );
  
  invariant(
    isFunction(reducer) || isPlainObject(reducer),
    'Expected reducer to be a function or object with next and throw reducers'
  );

  const handlers = isFunction(reducer)
    ? [reducer, reducer]
    : [reducer.next, reducer.throw].map(handler => 
        isUndefined(handler) ? identity : handler
      );

  const [nextHandler, throwHandler] = handlers;

  return function reducerFunction(
    state: S = defaultState,
    action: Action
  ): S {
    const { type } = action;
    
    if (type && includes(actionTypeList, type.toString())) {
      return action.error === true
        ? throwHandler(state, action)
        : nextHandler(state, action);
    }
    
    return state;
  };
}