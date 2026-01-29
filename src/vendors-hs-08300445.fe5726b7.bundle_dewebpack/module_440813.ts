import { ReactReduxContext } from './module_392879';
import { useStore, createStoreHook } from './module_418514';
import type { Context } from 'react';
import type { Store, Dispatch, AnyAction } from 'redux';

export function createDispatchHook<S = unknown, A extends AnyAction = AnyAction>(
  context?: Context<{ store: Store<S, A> }>
): () => Dispatch<A> {
  const contextToUse = context ?? ReactReduxContext;
  
  const useStoreHook = contextToUse === ReactReduxContext 
    ? useStore 
    : createStoreHook(contextToUse);
  
  return function useDispatchWithContext(): Dispatch<A> {
    return useStoreHook().dispatch;
  };
}

export const useDispatch = createDispatchHook();