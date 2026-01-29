import { useMemo, ReactNode, createElement } from 'react';
import { createSubscription } from './createSubscription';
import { ReactReduxContext } from './ReactReduxContext';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

interface Store<S = unknown, A = unknown> {
  getState(): S;
  dispatch(action: A): A;
  subscribe(listener: () => void): () => void;
}

interface Subscription {
  onStateChange: (() => void) | null;
  notifyNestedSubs(): void;
  trySubscribe(): void;
  tryUnsubscribe(): void;
}

interface ContextValue<S = unknown, A = unknown> {
  store: Store<S, A>;
  subscription: Subscription;
}

interface ProviderProps<S = unknown, A = unknown> {
  store: Store<S, A>;
  context?: React.Context<ContextValue<S, A> | null>;
  children: ReactNode;
}

export default function Provider<S = unknown, A = unknown>({
  store,
  context,
  children
}: ProviderProps<S, A>) {
  const contextValue = useMemo(() => {
    const subscription = createSubscription(store);
    return {
      store,
      subscription
    };
  }, [store]);

  const previousState = useMemo(() => {
    return store.getState();
  }, [store]);

  useIsomorphicLayoutEffect(() => {
    const { subscription } = contextValue;
    
    subscription.onStateChange = subscription.notifyNestedSubs;
    subscription.trySubscribe();

    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs();
    }

    return () => {
      subscription.tryUnsubscribe();
      subscription.onStateChange = null;
    };
  }, [contextValue, previousState]);

  const Context = context ?? ReactReduxContext;

  return createElement(Context.Provider, {
    value: contextValue
  }, children);
}