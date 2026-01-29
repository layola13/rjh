import React, { Component, ComponentType, createElement } from 'react';

interface HoverState {
  hover: boolean;
}

interface HoverInjectedProps {
  hover: boolean;
}

type ElementType = keyof JSX.IntrinsicElements;

function hover<P extends object>(
  WrappedComponent: ComponentType<P & HoverInjectedProps>,
  WrapperElement: ElementType = 'span'
): ComponentType<P> {
  return class HoverWrapper extends Component<P, HoverState> {
    state: HoverState = {
      hover: false,
    };

    handleMouseOver = (): void => {
      this.setState({ hover: true });
    };

    handleMouseOut = (): void => {
      this.setState({ hover: false });
    };

    render() {
      return createElement(
        WrapperElement,
        {
          onMouseOver: this.handleMouseOver,
          onMouseOut: this.handleMouseOut,
        },
        createElement(WrappedComponent, {
          ...this.props,
          ...this.state,
        })
      );
    }
  };
}

export { hover };
export default hover;