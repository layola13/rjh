type ActionCreator = (...args: any[]) => any;

type ActionCreatorsMapObject = {
  [key: string]: ActionCreator;
};

type BoundActionCreator<T extends ActionCreator> = (
  ...args: Parameters<T>
) => ReturnType<ReturnType<T>>;

type BoundActionCreatorsMapObject<T extends ActionCreatorsMapObject> = {
  [K in keyof T]: T[K] extends ActionCreator ? BoundActionCreator<T[K]> : never;
};

type Dispatch = (action: any) => any;

function bindActionCreator(
  actionCreator: ActionCreator,
  dispatch: Dispatch
): BoundActionCreator<ActionCreator> {
  return function (this: any, ...args: any[]): any {
    return dispatch(actionCreator.apply(this, args));
  };
}

function bindActionCreators<T extends ActionCreator>(
  actionCreator: T,
  dispatch: Dispatch
): BoundActionCreator<T>;
function bindActionCreators<T extends ActionCreatorsMapObject>(
  actionCreators: T,
  dispatch: Dispatch
): BoundActionCreatorsMapObject<T>;
function bindActionCreators<
  T extends ActionCreator | ActionCreatorsMapObject
>(
  actionCreators: T,
  dispatch: Dispatch
): T extends ActionCreator
  ? BoundActionCreator<T>
  : T extends ActionCreatorsMapObject
  ? BoundActionCreatorsMapObject<T>
  : never {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch) as any;
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${
        actionCreators === null ? 'null' : typeof actionCreators
      }. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
    );
  }

  const keys = Object.keys(actionCreators);
  const boundActionCreators: ActionCreatorsMapObject = {};

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators as any;
}

export default bindActionCreators;