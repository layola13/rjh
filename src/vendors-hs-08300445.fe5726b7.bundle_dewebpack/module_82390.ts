import { useContext, useReducer, useMemo, useRef, useDebugValue } from 'react';
import { useReduxContext } from './useReduxContext';
import { createSubscription, Subscription } from './createSubscription';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { ReactReduxContext, ReactReduxContextValue } from './ReactReduxContext';

type EqualityFn<T> = (a: T, b: T) => boolean;
type Selector<TState, TSelected> = (state: TState) => TSelected;

const defaultEqualityFn = <T>(a: T, b: T): boolean => a === b;

export function createSelectorHook<TState = unknown, TSelected = unknown>(
  context = ReactReduxContext
): <TSelected = unknown>(
  selector: Selector<TState, TSelected>,
  equalityFn?: EqualityFn<TSelected>
) => TSelected {
  const useDefaultReduxContext =
    context === ReactReduxContext
      ? useReduxContext
      : (): ReactReduxContextValue<TState> => useContext(context);

  return function <TSelected>(
    selector: Selector<TState, TSelected>,
    equalityFn: EqualityFn<TSelected> = defaultEqualityFn
  ): TSelected {
    const contextValue = useDefaultReduxContext();

    const selectedState = useSelectorWithStoreAndSubscription<TState, TSelected>(
      selector,
      equalityFn,
      contextValue.store,
      contextValue.subscription
    );

    useDebugValue(selectedState);

    return selectedState;
  };
}

function useSelectorWithStoreAndSubscription<TState, TSelected>(
  selector: Selector<TState, TSelected>,
  equalityFn: EqualityFn<TSelected>,
  store: { getState: () => TState },
  subscription: Subscription
): TSelected {
  const [, forceRender] = useReducer((count: number) => count + 1, 0);

  const subscriptionInstance = useMemo(
    () => createSubscription(store, subscription),
    [store, subscription]
  );

  const latestSelector = useRef<Selector<TState, TSelected>>();
  const latestStoreState = useRef<TState>();
  const latestSelectedState = useRef<TSelected>();
  const latestSubscriptionCallbackError = useRef<Error>();

  const storeState = store.getState();

  let selectedState: TSelected;

  try {
    if (
      selector !== latestSelector.current ||
      storeState !== latestStoreState.current ||
      latestSubscriptionCallbackError.current
    ) {
      const newSelectedState = selector(storeState);
      
      selectedState =
        latestSelectedState.current !== undefined &&
        equalityFn(newSelectedState, latestSelectedState.current)
          ? latestSelectedState.current
          : newSelectedState;
    } else {
      selectedState = latestSelectedState.current!;
    }
  } catch (error) {
    if (latestSubscriptionCallbackError.current) {
      (error as Error).message +=
        '\nThe error may be correlated with this previous error:\n' +
        latestSubscriptionCallbackError.current.stack +
        '\n\n';
    }
    throw error;
  }

  useIsomorphicLayoutEffect(() => {
    latestSelector.current = selector;
    latestStoreState.current = storeState;
    latestSelectedState.current = selectedState;
    latestSubscriptionCallbackError.current = undefined;
  });

  useIsomorphicLayoutEffect(() => {
    function checkForUpdates(): void {
      try {
        const newStoreState = store.getState();

        if (newStoreState === latestStoreState.current) {
          return;
        }

        const newSelectedState = latestSelector.current!(newStoreState);

        if (equalityFn(newSelectedState, latestSelectedState.current!)) {
          return;
        }

        latestSelectedState.current = newSelectedState;
        latestStoreState.current = newStoreState;
      } catch (error) {
        latestSubscriptionCallbackError.current = error as Error;
      }

      forceRender();
    }

    subscriptionInstance.onStateChange = checkForUpdates;
    subscriptionInstance.trySubscribe();

    checkForUpdates();

    return () => subscriptionInstance.tryUnsubscribe();
  }, [store, subscriptionInstance]);

  return selectedState;
}

export const useSelector = createSelectorHook();