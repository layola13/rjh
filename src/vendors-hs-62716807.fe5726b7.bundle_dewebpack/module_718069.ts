import React from 'react';

interface Store {
  useSelector: <T>(selector: (state: any) => T) => T;
  useDispatch: () => any;
  getState: () => any;
  dispatch: any;
}

interface EffectState {
  isLoading: boolean;
  error: Error | null;
}

interface EffectsStateMap {
  [effectName: string]: EffectState;
}

interface ErrorState {
  effects: {
    [namespace: string]: {
      [effectName: string]: {
        error: Error;
      };
    };
  };
}

interface LoadingState {
  effects: {
    [namespace: string]: {
      [effectName: string]: boolean;
    };
  };
}

interface State {
  [namespace: string]: any;
  error?: ErrorState;
  loading?: LoadingState;
}

interface ModelAPIs<TState = any, TDispatchers = any> {
  useValue: () => [TState, TDispatchers];
  useState: () => TState;
  useDispatchers: () => TDispatchers;
  useEffectsState: () => EffectsStateMap;
  useEffectsError: () => Record<string, { error: Error }> | undefined;
  useEffectsLoading: () => Record<string, boolean> | undefined;
  getValue: () => [TState, TDispatchers];
  getState: () => TState;
  getDispatchers: () => TDispatchers;
  withValue: (mapModelToProps?: (value: [TState, TDispatchers]) => any) => (Component: React.ComponentType<any>) => React.ComponentType<any>;
  withDispatchers: (mapDispatchersToProps?: (dispatchers: TDispatchers) => any) => (Component: React.ComponentType<any>) => React.ComponentType<any>;
  withEffectsState: (mapEffectsStateToProps?: (effectsState: EffectsStateMap) => any) => (Component: React.ComponentType<any>) => React.ComponentType<any>;
  withEffectsError: (mapErrorToProps?: (error: any) => any) => (Component: React.ComponentType<any>) => React.ComponentType<any>;
  withEffectsLoading: (mapLoadingToProps?: (loading: any) => any) => (Component: React.ComponentType<any>) => React.ComponentType<any>;
}

interface Plugin {
  onStoreCreated: (store: Store) => {
    getModelAPIs: (namespace: string) => ModelAPIs;
    useModel: <TState, TDispatchers>(namespace: string) => [TState, TDispatchers];
    useModelState: <TState>(namespace: string) => TState;
    useModelDispatchers: <TDispatchers>(namespace: string) => TDispatchers;
    useModelEffectsState: (namespace: string) => EffectsStateMap;
    useModelEffectsError: (namespace: string) => Record<string, { error: Error }> | undefined;
    useModelEffectsLoading: (namespace: string) => Record<string, boolean> | undefined;
    getModel: <TState, TDispatchers>(namespace: string) => [TState, TDispatchers];
    getModelState: <TState>(namespace: string) => TState;
    getModelDispatchers: <TDispatchers>(namespace: string) => TDispatchers;
    withModel: (namespace: string, mapModelToProps?: (value: any) => any) => (Component: React.ComponentType<any>) => React.ComponentType<any>;
    withModelDispatchers: (namespace: string, mapDispatchersToProps?: (dispatchers: any) => any) => (Component: React.ComponentType<any>) => React.ComponentType<any>;
    withModelEffectsState: (namespace: string, mapEffectsStateToProps?: (effectsState: EffectsStateMap) => any) => (Component: React.ComponentType<any>) => React.ComponentType<any>;
    withModelEffectsError: (namespace: string, mapErrorToProps?: (error: any) => any) => (Component: React.ComponentType<any>) => React.ComponentType<any>;
    withModelEffectsLoading: (namespace: string, mapLoadingToProps?: (loading: any) => any) => (Component: React.ComponentType<any>) => React.ComponentType<any>;
  };
}

export default function (): Plugin {
  return {
    onStoreCreated(store: Store) {
      function useModel<TState = any, TDispatchers = any>(namespace: string): [TState, TDispatchers] {
        return [useModelState<TState>(namespace), useModelDispatchers<TDispatchers>(namespace)];
      }

      function useModelState<TState = any>(namespace: string): TState {
        const state = store.useSelector((state: State) => state[namespace]);
        if (state !== undefined) {
          return state;
        }
        throw new Error(`Not found model by namespace: ${namespace}.`);
      }

      function useModelDispatchers<TDispatchers = any>(namespace: string): TDispatchers {
        const dispatch = store.useDispatch();
        if (dispatch[namespace]) {
          return dispatch[namespace];
        }
        throw new Error(`Not found model by namespace: ${namespace}.`);
      }

      function useModelEffectsState(namespace: string): EffectsStateMap {
        const dispatchers = useModelDispatchers(namespace);
        const loadingState = useModelEffectsLoading(namespace);
        const errorState = useModelEffectsError(namespace);
        const effectsState: EffectsStateMap = {};

        Object.keys(dispatchers).forEach((effectName) => {
          effectsState[effectName] = {
            isLoading: loadingState?.[effectName] ?? false,
            error: errorState?.[effectName]?.error ?? null,
          };
        });

        return effectsState;
      }

      function useModelEffectsError(namespace: string): Record<string, { error: Error }> | undefined {
        return store.useSelector((state: State) => {
          return state.error?.effects[namespace];
        });
      }

      function useModelEffectsLoading(namespace: string): Record<string, boolean> | undefined {
        return store.useSelector((state: State) => {
          return state.loading?.effects[namespace];
        });
      }

      function getModel<TState = any, TDispatchers = any>(namespace: string): [TState, TDispatchers] {
        return [getModelState<TState>(namespace), getModelDispatchers<TDispatchers>(namespace)];
      }

      function getModelState<TState = any>(namespace: string): TState {
        return store.getState()[namespace];
      }

      function getModelDispatchers<TDispatchers = any>(namespace: string): TDispatchers {
        return store.dispatch[namespace];
      }

      function withModel(
        namespace: string,
        mapModelToProps?: (value: [any, any]) => any
      ): (Component: React.ComponentType<any>) => React.ComponentType<any> {
        const defaultMapModelToProps = mapModelToProps ?? ((model: [any, any]) => ({ [namespace]: model }));

        return (Component: React.ComponentType<any>) => {
          return (props: any) => {
            const model = useModel(namespace);
            const mappedProps = defaultMapModelToProps(model);
            return React.createElement(Component, { ...mappedProps, ...props });
          };
        };
      }

      const withModelDispatchers = (
        namespace: string,
        mapDispatchersToProps?: (dispatchers: any) => any
      ): ((Component: React.ComponentType<any>) => React.ComponentType<any>) => {
        const defaultPropName = 'Dispatchers';
        const defaultMapDispatchersToProps = mapDispatchersToProps ?? ((dispatchers: any) => ({
          [`${namespace}${defaultPropName}`]: dispatchers,
        }));

        return (Component: React.ComponentType<any>) => {
          return (props: any) => {
            const dispatchers = useModelDispatchers(namespace);
            const mappedProps = defaultMapDispatchersToProps(dispatchers);
            return React.createElement(Component, { ...mappedProps, ...props });
          };
        };
      };

      const withModelEffectsState = (
        namespace: string,
        mapEffectsStateToProps?: (effectsState: EffectsStateMap) => any
      ): ((Component: React.ComponentType<any>) => React.ComponentType<any>) => {
        const defaultPropName = 'EffectsState';
        const defaultMapEffectsStateToProps = mapEffectsStateToProps ?? ((effectsState: EffectsStateMap) => ({
          [`${namespace}${defaultPropName}`]: effectsState,
        }));

        return (Component: React.ComponentType<any>) => {
          return (props: any) => {
            const effectsState = useModelEffectsState(namespace);
            const mappedProps = defaultMapEffectsStateToProps(effectsState);
            return React.createElement(Component, { ...mappedProps, ...props });
          };
        };
      };

      function withModelEffectsError(
        namespace: string,
        mapErrorToProps?: (error: any) => any
      ): (Component: React.ComponentType<any>) => React.ComponentType<any> {
        const defaultMapErrorToProps = mapErrorToProps ?? ((error: any) => ({
          [`${namespace}EffectsError`]: error,
        }));

        return (Component: React.ComponentType<any>) => {
          return (props: any) => {
            const error = useModelEffectsError(namespace);
            const mappedProps = defaultMapErrorToProps(error);
            return React.createElement(Component, { ...mappedProps, ...props });
          };
        };
      }

      function withModelEffectsLoading(
        namespace: string,
        mapLoadingToProps?: (loading: any) => any
      ): (Component: React.ComponentType<any>) => React.ComponentType<any> {
        const defaultMapLoadingToProps = mapLoadingToProps ?? ((loading: any) => ({
          [`${namespace}EffectsLoading`]: loading,
        }));

        return (Component: React.ComponentType<any>) => {
          return (props: any) => {
            const loading = useModelEffectsLoading(namespace);
            const mappedProps = defaultMapLoadingToProps(loading);
            return React.createElement(Component, { ...mappedProps, ...props });
          };
        };
      }

      return {
        getModelAPIs(namespace: string): ModelAPIs {
          return {
            useValue: () => useModel(namespace),
            useState: () => useModelState(namespace),
            useDispatchers: () => useModelDispatchers(namespace),
            useEffectsState: () => useModelEffectsState(namespace),
            useEffectsError: () => useModelEffectsError(namespace),
            useEffectsLoading: () => useModelEffectsLoading(namespace),
            getValue: () => getModel(namespace),
            getState: () => getModelState(namespace),
            getDispatchers: () => getModelDispatchers(namespace),
            withValue: (mapModelToProps) => withModel(namespace, mapModelToProps),
            withDispatchers: (mapDispatchersToProps) => withModelDispatchers(namespace, mapDispatchersToProps),
            withEffectsState: (mapEffectsStateToProps) => withModelEffectsState(namespace, mapEffectsStateToProps),
            withEffectsError: (mapErrorToProps) => withModelEffectsError(namespace, mapErrorToProps),
            withEffectsLoading: (mapLoadingToProps) => withModelEffectsLoading(namespace, mapLoadingToProps),
          };
        },
        useModel,
        useModelState,
        useModelDispatchers,
        useModelEffectsState,
        useModelEffectsError,
        useModelEffectsLoading,
        getModel,
        getModelState,
        getModelDispatchers,
        withModel,
        withModelDispatchers,
        withModelEffectsState,
        withModelEffectsError,
        withModelEffectsLoading,
      };
    },
  };
}