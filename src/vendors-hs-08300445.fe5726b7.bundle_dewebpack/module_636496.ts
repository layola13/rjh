import { Dispatch } from 'redux';
import { Context, ReactElement, ComponentType, useContext, useMemo, useReducer, useRef, memo, forwardRef, createElement } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { isContextConsumer } from './isContextConsumer';
import { createSubscription, Subscription } from './Subscription';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { ReactReduxContext, ReactReduxContextValue } from './Context';

interface ConnectAdvancedOptions {
  getDisplayName?: (name: string) => string;
  methodName?: string;
  renderCountProp?: string;
  shouldHandleStateChanges?: boolean;
  storeKey?: string;
  withRef?: boolean;
  forwardRef?: boolean;
  context?: Context<ReactReduxContextValue>;
  pure?: boolean;
  [key: string]: unknown;
}

interface SelectorFactoryOptions {
  getDisplayName: (name: string) => string;
  methodName: string;
  renderCountProp?: string;
  shouldHandleStateChanges: boolean;
  storeKey: string;
  displayName: string;
  wrappedComponentName: string;
  WrappedComponent: ComponentType<any>;
}

interface Store {
  getState: () => unknown;
  dispatch: Dispatch;
  subscribe?: (listener: () => void) => () => void;
}

interface SubscriptionState {
  error?: Error;
}

type ReducerAction = {
  type: 'STORE_UPDATED';
  payload: { error?: Error };
};

type ReducerState = [SubscriptionState | null, number];

const EXCLUDED_OPTIONS = [
  'getDisplayName',
  'methodName',
  'renderCountProp',
  'shouldHandleStateChanges',
  'storeKey',
  'withRef',
  'forwardRef',
  'context'
];

const EMPTY_ARRAY: readonly [null, null] = [null, null];

function stateReducer(state: ReducerState, action: ReducerAction): ReducerState {
  const updateCount = state[1];
  return [action.payload, updateCount + 1];
}

function initReducer(): ReducerState {
  return [null, 0];
}

function useIsomorphicLayoutEffectWithArgs(
  effectFunc: (...args: any[]) => void | (() => void),
  effectArgs: any[],
  dependencies?: any[]
): void {
  useIsomorphicLayoutEffect(() => {
    return effectFunc(...effectArgs);
  }, dependencies);
}

function updatePropsAndRefs(
  childPropsFromStoreUpdate: React.MutableRefObject<any>,
  lastChildProps: React.MutableRefObject<any>,
  notifyNestedSubsOnComponentDidUpdate: React.MutableRefObject<boolean>,
  currentProps: any,
  childProps: any,
  renderedChild: React.MutableRefObject<any>,
  notifyNestedSubs: () => void
): void {
  childPropsFromStoreUpdate.current = currentProps;
  lastChildProps.current = childProps;
  notifyNestedSubsOnComponentDidUpdate.current = false;
  
  if (renderedChild.current) {
    renderedChild.current = null;
    notifyNestedSubs();
  }
}

function subscribeToStore(
  shouldHandleStateChanges: boolean,
  store: Store,
  subscription: Subscription | null,
  selectorFactory: (state: unknown, props: any) => any,
  ownProps: React.MutableRefObject<any>,
  lastChildProps: React.MutableRefObject<any>,
  notifyNestedSubsOnComponentDidUpdate: React.MutableRefObject<boolean>,
  renderedChild: React.MutableRefObject<any>,
  notifyNestedSubs: () => void,
  forceComponentUpdateDispatch: Dispatch<ReducerAction>
): (() => void) | undefined {
  if (!shouldHandleStateChanges) {
    return undefined;
  }

  let unsubscribed = false;
  let latestError: Error | null = null;

  const checkForUpdates = (): void => {
    if (unsubscribed) {
      return;
    }

    const stateFromStore = store.getState();
    let newChildProps: any;
    let error: Error | undefined;

    try {
      newChildProps = selectorFactory(stateFromStore, ownProps.current);
    } catch (e) {
      error = e as Error;
      latestError = e as Error;
    }

    if (error) {
      return;
    }

    latestError = null;

    if (newChildProps === lastChildProps.current) {
      if (!notifyNestedSubsOnComponentDidUpdate.current) {
        notifyNestedSubs();
      }
    } else {
      lastChildProps.current = newChildProps;
      renderedChild.current = newChildProps;
      notifyNestedSubsOnComponentDidUpdate.current = true;
      
      forceComponentUpdateDispatch({
        type: 'STORE_UPDATED',
        payload: { error }
      });
    }
  };

  if (subscription) {
    subscription.onStateChange = checkForUpdates;
    subscription.trySubscribe();
    checkForUpdates();
  }

  return (): void => {
    unsubscribed = true;
    
    if (subscription) {
      subscription.tryUnsubscribe();
      subscription.onStateChange = null;
    }
    
    if (latestError) {
      throw latestError;
    }
  };
}

export default function connectAdvanced<TProps, TSelectedState>(
  selectorFactory: (dispatch: Dispatch, options: SelectorFactoryOptions) => (state: unknown, props: TProps) => TSelectedState,
  options: ConnectAdvancedOptions = {}
): (WrappedComponent: ComponentType<TProps & TSelectedState>) => ComponentType<TProps> {
  const {
    getDisplayName = (name: string) => `ConnectAdvanced(${name})`,
    methodName = 'connectAdvanced',
    renderCountProp = undefined,
    shouldHandleStateChanges = true,
    storeKey = 'store',
    forwardRef: enableForwardRef = false,
    context = ReactReduxContext,
    ...restOptions
  } = options;

  const Context = context;

  return function wrapWithConnect(WrappedComponent: ComponentType<TProps & TSelectedState>): ComponentType<TProps> {
    const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    const displayName = getDisplayName(wrappedComponentName);
    
    const selectorFactoryOptions: SelectorFactoryOptions = {
      ...restOptions,
      getDisplayName,
      methodName,
      renderCountProp,
      shouldHandleStateChanges,
      storeKey,
      displayName,
      wrappedComponentName,
      WrappedComponent
    };

    const pure = restOptions.pure ?? true;
    const usePureOnlyMemo = pure ? useMemo : <T>(factory: () => T): T => factory();

    function ConnectFunction(props: TProps & { reactReduxForwardedRef?: React.Ref<any>; context?: Context<ReactReduxContextValue> }): ReactElement {
      const [propsContext, forwardedRef, wrapperProps] = useMemo(() => {
        const { reactReduxForwardedRef, context: propsContext, ...rest } = props;
        return [propsContext, reactReduxForwardedRef, rest];
      }, [props]);

      const ContextToUse = useMemo(() => {
        return propsContext && propsContext.Consumer && isContextConsumer(createElement(propsContext.Consumer, null))
          ? propsContext
          : Context;
      }, [propsContext, Context]);

      const contextValue = useContext(ContextToUse);
      
      const didStoreComeFromProps = Boolean(props.store) && Boolean(props.store.getState) && Boolean(props.store.dispatch);
      const didStoreComeFromContext = Boolean(contextValue) && Boolean(contextValue.store);
      const store: Store = didStoreComeFromProps ? props.store : contextValue.store;

      const childPropsSelector = useMemo(() => {
        return selectorFactory(store.dispatch, selectorFactoryOptions);
      }, [store]);

      const [subscription, notifyNestedSubs] = useMemo(() => {
        if (!shouldHandleStateChanges) {
          return EMPTY_ARRAY as unknown as [Subscription, () => void];
        }

        const subscription = createSubscription(store, didStoreComeFromProps ? null : contextValue.subscription);
        const notifyNestedSubs = subscription.notifyNestedSubs.bind(subscription);

        return [subscription, notifyNestedSubs];
      }, [store, didStoreComeFromProps, contextValue]);

      const overriddenContextValue = useMemo(() => {
        if (didStoreComeFromProps) {
          return contextValue;
        }

        return {
          ...contextValue,
          subscription
        };
      }, [didStoreComeFromProps, contextValue, subscription]);

      const [[previousStateUpdateResult], forceComponentUpdateDispatch] = useReducer(
        stateReducer,
        EMPTY_ARRAY as unknown as ReducerState,
        initReducer
      );

      if (previousStateUpdateResult?.error) {
        throw previousStateUpdateResult.error;
      }

      const lastChildProps = useRef<any>();
      const ownProps = useRef<any>(wrapperProps);
      const renderedChild = useRef<any>();
      const notifyNestedSubsOnComponentDidUpdate = useRef<boolean>(false);

      const actualChildProps = usePureOnlyMemo(() => {
        if (renderedChild.current && wrapperProps === ownProps.current) {
          return renderedChild.current;
        }

        return childPropsSelector(store.getState(), wrapperProps);
      }, [store, previousStateUpdateResult, wrapperProps]);

      useIsomorphicLayoutEffectWithArgs(
        updatePropsAndRefs,
        [ownProps, lastChildProps, notifyNestedSubsOnComponentDidUpdate, wrapperProps, actualChildProps, renderedChild, notifyNestedSubs]
      );

      useIsomorphicLayoutEffectWithArgs(
        subscribeToStore,
        [
          shouldHandleStateChanges,
          store,
          subscription,
          childPropsSelector,
          ownProps,
          lastChildProps,
          notifyNestedSubsOnComponentDidUpdate,
          renderedChild,
          notifyNestedSubs,
          forceComponentUpdateDispatch
        ],
        [store, subscription, childPropsSelector]
      );

      const renderedWrappedComponent = useMemo(() => {
        return createElement(WrappedComponent, {
          ...actualChildProps,
          ref: forwardedRef
        });
      }, [forwardedRef, WrappedComponent, actualChildProps]);

      const renderedChild = useMemo(() => {
        if (shouldHandleStateChanges) {
          return createElement(ContextToUse.Provider, { value: overriddenContextValue }, renderedWrappedComponent);
        }

        return renderedWrappedComponent;
      }, [ContextToUse, renderedWrappedComponent, overriddenContextValue]);

      return renderedChild;
    }

    const Connect = pure ? memo(ConnectFunction) : ConnectFunction;

    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = ConnectFunction.displayName = displayName;

    if (enableForwardRef) {
      const ForwardedConnect = forwardRef<any, TProps>((props, ref) => {
        return createElement(Connect, {
          ...props,
          reactReduxForwardedRef: ref
        });
      });

      ForwardedConnect.displayName = displayName;
      ForwardedConnect.WrappedComponent = WrappedComponent;

      return hoistStatics(ForwardedConnect, WrappedComponent) as any;
    }

    return hoistStatics(Connect, WrappedComponent) as any;
  };
}