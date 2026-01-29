export interface MapToProps<TStateProps = any, TOwnProps = any, TState = any> {
  (state: TState, ownProps?: TOwnProps): TStateProps;
  dependsOnOwnProps?: boolean;
}

export interface ProxyMapToProps<TStateProps = any, TOwnProps = any, TState = any> {
  (state: TState, ownProps: TOwnProps): TStateProps;
  dependsOnOwnProps: boolean;
  mapToProps: MapToProps<TStateProps, TOwnProps, TState>;
}

export function getDependsOnOwnProps<TStateProps, TOwnProps, TState>(
  mapToProps: MapToProps<TStateProps, TOwnProps, TState>
): boolean {
  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined
    ? Boolean(mapToProps.dependsOnOwnProps)
    : mapToProps.length !== 1;
}

export function wrapMapToPropsConstant<TStateProps, TOwnProps, TState>(
  getConstant: MapToProps<TStateProps, TOwnProps, TState>
) {
  return function initConstantSelector(state: TState, ownProps: TOwnProps) {
    const constant = getConstant(state, ownProps);

    function constantSelector(): TStateProps {
      return constant;
    }

    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
}

export function wrapMapToPropsFunc<TStateProps, TOwnProps, TState>(
  mapToPropsFactory: MapToProps<TStateProps, TOwnProps, TState>,
  _methodName: string
) {
  return function initProxySelector(
    _dispatch: TState,
    ownProps: TOwnProps & { displayName?: string }
  ): ProxyMapToProps<TStateProps, TOwnProps, TState> {
    const proxy: ProxyMapToProps<TStateProps, TOwnProps, TState> = function (
      state: TState,
      ownPropsArg: TOwnProps
    ): TStateProps {
      return proxy.dependsOnOwnProps
        ? proxy.mapToProps(state, ownPropsArg)
        : proxy.mapToProps(state);
    } as ProxyMapToProps<TStateProps, TOwnProps, TState>;

    proxy.dependsOnOwnProps = true;

    proxy.mapToProps = function detectFactoryAndVerify(
      state: TState,
      ownPropsArg: TOwnProps
    ): TStateProps {
      proxy.mapToProps = mapToPropsFactory;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToPropsFactory);

      let props = proxy(state, ownPropsArg);

      if (typeof props === 'function') {
        proxy.mapToProps = props as MapToProps<TStateProps, TOwnProps, TState>;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props as MapToProps<TStateProps, TOwnProps, TState>);
        props = proxy(state, ownPropsArg);
      }

      return props;
    };

    return proxy;
  };
}