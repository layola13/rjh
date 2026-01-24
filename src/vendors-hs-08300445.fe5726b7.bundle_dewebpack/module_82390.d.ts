/**
 * React-Redux selector hooks module
 * Provides hooks for selecting state from Redux store with optimized re-rendering
 */

import { Context, useContext, useReducer, useMemo, useRef, useDebugValue } from 'react';
import { Subscription } from './subscription';

/**
 * Redux store interface
 */
export interface Store<S = any, A extends Action = AnyAction> {
  getState(): S;
  dispatch(action: A): A;
  subscribe(listener: () => void): () => void;
  replaceReducer(nextReducer: Reducer<S, A>): void;
}

/**
 * Redux context value containing store and optional subscription
 */
export interface ReactReduxContextValue<S = any, A extends Action = AnyAction> {
  store: Store<S, A>;
  subscription?: Subscription;
}

/**
 * Selector function that extracts a value from state
 * @template State - Redux state type
 * @template Selected - Selected value type
 */
export type Selector<State, Selected> = (state: State) => Selected;

/**
 * Equality comparison function
 * @template Selected - Type of values being compared
 */
export type EqualityFn<Selected> = (a: Selected, b: Selected) => boolean;

/**
 * Default equality comparison using strict equality
 */
const defaultEqualityFn: EqualityFn<any> = (a, b) => a === b;

/**
 * Internal function to manage selector subscriptions and memoization
 * @param selector - Function to select state slice
 * @param equalityFn - Function to compare previous and current selected values
 * @param store - Redux store instance
 * @param contextSubscription - Optional parent subscription
 * @returns Selected state value
 */
function useSelectorWithStoreAndSubscription<State, Selected>(
  selector: Selector<State, Selected>,
  equalityFn: EqualityFn<Selected>,
  store: Store<State>,
  contextSubscription: Subscription | undefined
): Selected {
  const [, forceRender] = useReducer((count: number) => count + 1, 0);

  const subscription = useMemo(
    () => createSubscription(store, contextSubscription),
    [store, contextSubscription]
  );

  const latestSelector = useRef<Selector<State, Selected>>();
  const latestStoreState = useRef<State>();
  const latestSelectedState = useRef<Selected>();
  const latestSubscriptionCallbackError = useRef<Error>();

  const storeState = store.getState();

  let selectedState: Selected;

  try {
    if (
      selector !== latestSelector.current ||
      storeState !== latestStoreState.current ||
      latestSubscriptionCallbackError.current
    ) {
      const newSelectedState = selector(storeState);
      
      if (
        latestSelectedState.current !== undefined &&
        equalityFn(newSelectedState, latestSelectedState.current)
      ) {
        selectedState = latestSelectedState.current;
      } else {
        selectedState = newSelectedState;
      }
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
    function checkForUpdates() {
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

    subscription.onStateChange = checkForUpdates;
    subscription.trySubscribe();

    checkForUpdates();

    return () => subscription.tryUnsubscribe();
  }, [store, subscription]);

  return selectedState;
}

/**
 * Creates a custom useSelector hook bound to a specific context
 * @param context - React context containing Redux store (defaults to ReactReduxContext)
 * @returns useSelector hook bound to the provided context
 * 
 * @example
 *