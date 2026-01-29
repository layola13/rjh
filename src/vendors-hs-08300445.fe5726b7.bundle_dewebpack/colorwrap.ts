import React, { Component, PureComponent } from 'react';
import debounce from 'lodash/debounce';
import colorUtils from './color-utils';

interface ColorState {
  h: number;
  s: number;
  l: number;
  a: number;
  oldHue?: number;
}

interface ColorChangeData extends ColorState {
  hex?: string;
  rgb?: { r: number; g: number; b: number; a: number };
  hsl?: { h: number; s: number; l: number; a: number };
}

interface ColorWrapProps {
  color: ColorState | string;
  onChange?: (color: ColorChangeData, event: React.SyntheticEvent) => void;
  onChangeComplete?: (color: ColorChangeData, event: React.SyntheticEvent) => void;
  onSwatchHover?: (color: ColorChangeData, event: React.MouseEvent) => void;
}

interface WrappedComponentProps extends ColorWrapProps {
  [key: string]: unknown;
}

export function ColorWrap<P extends WrappedComponentProps>(
  WrappedComponent: React.ComponentType<P>
) {
  class ColorWrapper extends (PureComponent || Component)<ColorWrapProps, ColorState> {
    static propTypes = (WrappedComponent as any).propTypes;
    static defaultProps = {
      ...(WrappedComponent as any).defaultProps,
      color: {
        h: 250,
        s: 0.5,
        l: 0.2,
        a: 1
      }
    };

    private debounce: (
      callback: (color: ColorChangeData, event: React.SyntheticEvent) => void,
      color: ColorChangeData,
      event: React.SyntheticEvent
    ) => void;

    constructor(props: ColorWrapProps) {
      super(props);
      this.state = {
        ...colorUtils.toState(props.color, 0)
      };
      this.debounce = debounce(
        (
          callback: (color: ColorChangeData, event: React.SyntheticEvent) => void,
          color: ColorChangeData,
          event: React.SyntheticEvent
        ) => {
          callback(color, event);
        },
        100
      );
    }

    componentWillReceiveProps(nextProps: ColorWrapProps): void {
      this.setState({
        ...colorUtils.toState(nextProps.color, this.state.oldHue ?? 0)
      });
    }

    handleChange = (color: ColorState | string, event: React.SyntheticEvent): void => {
      if (colorUtils.simpleCheckForValidColor(color)) {
        const colorData = colorUtils.toState(
          color,
          (color as ColorState).h ?? this.state.oldHue ?? 0
        );
        this.setState(colorData);
        
        if (this.props.onChangeComplete) {
          this.debounce(this.props.onChangeComplete, colorData, event);
        }
        
        if (this.props.onChange) {
          this.props.onChange(colorData, event);
        }
      }
    };

    handleSwatchHover = (color: ColorState | string, event: React.MouseEvent): void => {
      if (colorUtils.simpleCheckForValidColor(color)) {
        const colorData = colorUtils.toState(
          color,
          (color as ColorState).h ?? this.state.oldHue ?? 0
        );
        
        if (this.props.onSwatchHover) {
          this.props.onSwatchHover(colorData, event);
        }
      }
    };

    render(): React.ReactElement {
      const optionalHandlers: Partial<Pick<ColorWrapProps, 'onSwatchHover'>> = {};
      
      if (this.props.onSwatchHover) {
        optionalHandlers.onSwatchHover = this.handleSwatchHover;
      }

      return React.createElement(WrappedComponent, {
        ...this.props,
        ...this.state,
        onChange: this.handleChange,
        ...optionalHandlers
      } as P);
    }
  }

  return ColorWrapper;
}

export default ColorWrap;