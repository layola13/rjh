import React, { Component, MouseEvent } from 'react';

interface ActiveState {
  active: boolean;
}

interface ActiveProps {
  [key: string]: unknown;
}

type ElementType = keyof JSX.IntrinsicElements | React.ComponentType<any>;

export function active<P extends object>(
  WrappedComponent: React.ComponentType<P & ActiveState>,
  elementType: ElementType = 'span'
): React.ComponentType<P> {
  return class ActiveWrapper extends Component<P, ActiveState> {
    constructor(props: P) {
      super(props);
      this.state = {
        active: false
      };
    }

    handleMouseDown = (): void => {
      this.setState({ active: true });
    };

    handleMouseUp = (): void => {
      this.setState({ active: false });
    };

    render(): React.ReactElement {
      return React.createElement(
        elementType,
        {
          onMouseDown: this.handleMouseDown,
          onMouseUp: this.handleMouseUp
        },
        React.createElement(WrappedComponent, {
          ...this.props,
          ...this.state
        } as P & ActiveState)
      );
    }
  };
}

export default active;