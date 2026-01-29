import React, { Component, ComponentType, ReactElement } from 'react';

interface FocusState {
  focus: boolean;
}

type FocusProps<P> = P & FocusState;

export function handleFocus<P extends object>(
  WrappedComponent: ComponentType<FocusProps<P>>,
  WrapperTag: keyof JSX.IntrinsicElements = 'span'
): ComponentType<P> {
  return class FocusWrapper extends Component<P, FocusState> {
    state: FocusState = {
      focus: false,
    };

    handleFocus = (): void => {
      this.setState({ focus: true });
    };

    handleBlur = (): void => {
      this.setState({ focus: false });
    };

    render(): ReactElement {
      return React.createElement(
        WrapperTag,
        {
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
        },
        React.createElement(WrappedComponent, {
          ...this.props,
          ...this.state,
        } as FocusProps<P>)
      );
    }
  };
}