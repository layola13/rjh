import React, { Component, forwardRef, createElement, RefObject } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import shallowEqual from 'shallowequal';
import { MiniStoreContext } from './context';

interface Store<S = any> {
  getState(): S;
  subscribe(listener: () => void): () => void;
}

type MapStateToProps<S = any, P = any, R = any> = (state: S, props: P) => R;

interface ConnectOptions {
  forwardRef?: boolean;
}

interface ConnectedState<T> {
  subscribed: T;
  store: Store;
  props: any;
}

interface ConnectedProps {
  miniStoreForwardedRef?: RefObject<any>;
  [key: string]: any;
}

const defaultMapStateToProps = (): Record<string, never> => ({});

export function connect<S = any, P = any, R = any>(
  mapStateToProps?: MapStateToProps<S, P, R>,
  options: ConnectOptions = {}
): <C extends Component>(WrappedComponent: React.ComponentType<C>) => React.ComponentType<any> {
  const shouldSubscribe = !!mapStateToProps;
  const finalMapStateToProps = mapStateToProps || defaultMapStateToProps;

  return function wrapWithConnect<C extends Component>(
    WrappedComponent: React.ComponentType<C>
  ): React.ComponentType<any> {
    class ConnectedComponent extends Component<ConnectedProps, ConnectedState<R>> {
      static displayName = `Connect(${getDisplayName(WrappedComponent)})`;
      static contextType = MiniStoreContext;

      declare context: Store;
      private unsubscribe: (() => void) | null = null;

      constructor(props: ConnectedProps, context: Store) {
        super(props, context);
        this.store = this.context;
        this.state = {
          subscribed: finalMapStateToProps(this.store.getState(), props),
          store: this.store,
          props: props
        };
      }

      static getDerivedStateFromProps(
        nextProps: ConnectedProps,
        prevState: ConnectedState<R>
      ): Partial<ConnectedState<R>> {
        if (mapStateToProps && mapStateToProps.length === 2 && nextProps !== prevState.props) {
          return {
            subscribed: finalMapStateToProps(prevState.store.getState(), nextProps),
            props: nextProps
          };
        }
        return {
          props: nextProps
        };
      }

      componentDidMount(): void {
        this.trySubscribe();
      }

      componentWillUnmount(): void {
        this.tryUnsubscribe();
      }

      shouldComponentUpdate(nextProps: ConnectedProps, nextState: ConnectedState<R>): boolean {
        return (
          !shallowEqual(this.props, nextProps) ||
          !shallowEqual(this.state.subscribed, nextState.subscribed)
        );
      }

      private trySubscribe(): void {
        if (shouldSubscribe) {
          this.unsubscribe = this.store.subscribe(this.handleChange);
          this.handleChange();
        }
      }

      private tryUnsubscribe(): void {
        if (this.unsubscribe) {
          this.unsubscribe();
          this.unsubscribe = null;
        }
      }

      private handleChange = (): void => {
        if (this.unsubscribe) {
          const subscribed = finalMapStateToProps(this.store.getState(), this.props);
          this.setState({ subscribed });
        }
      };

      render(): React.ReactElement {
        const mergedProps = {
          ...this.props,
          ...this.state.subscribed,
          store: this.store
        };
        return createElement(WrappedComponent, {
          ...mergedProps,
          ref: this.props.miniStoreForwardedRef
        });
      }
    }

    if (options.forwardRef) {
      const ForwardedComponent = forwardRef<any, ConnectedProps>((props, ref) => {
        return createElement(ConnectedComponent, {
          ...props,
          miniStoreForwardedRef: ref
        });
      });
      return hoistNonReactStatics(ForwardedComponent, WrappedComponent);
    }

    return hoistNonReactStatics(ConnectedComponent, WrappedComponent);
  };
}

function getDisplayName(Component: React.ComponentType<any>): string {
  return Component.displayName || Component.name || 'Component';
}