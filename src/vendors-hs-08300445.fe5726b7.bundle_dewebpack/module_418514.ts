import { useContext } from 'react';
import { ReactReduxContext } from './ReactReduxContext';
import { useReduxContext } from './useReduxContext';
import type { Context } from 'react';
import type { ReactReduxContextValue } from './types';

export function createStoreHook<S = unknown, A extends Action = AnyAction>(
  context?: Context<ReactReduxContextValue<S, A>>
) {
  const useReduxContextHook =
    context === ReactReduxContext
      ? useReduxContext
      : function useProvidedContext() {
          return useContext(context!);
        };

  return function useStore(): Store<S, A> {
    const { store } = useReduxContextHook();
    return store;
  };
}

export const useStore = createStoreHook();

interface Store<S = unknown, A extends Action = AnyAction> {
  getState(): S;
  dispatch(action: A): A;
  subscribe(listener: () => void): () => void;
  replaceReducer(nextReducer: Reducer<S, A>): void;
}

interface Action<T = string> {
  type: T;
}

interface AnyAction extends Action {
  [extraProps: string]: unknown;
}

type Reducer<S = unknown, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;