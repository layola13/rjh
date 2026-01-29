import React, { PureComponent, Component, CSSProperties } from 'react';
import throttle from 'lodash/throttle';
import reactCSS from 'reactcss';
import * as calculateChangeUtil from './helpers/saturation';

interface HSL {
  h: number;
  s: number;
  l: number;
}

interface HSV {
  h: number;
  s: number;
  v: number;
}

interface StyleOverrides {
  color?: CSSProperties;
  white?: CSSProperties;
  black?: CSSProperties;
  pointer?: CSSProperties;
  circle?: CSSProperties;
}

interface SaturationProps {
  hsl: HSL;
  hsv: HSV;
  radius?: string;
  shadow?: string;
  style?: StyleOverrides;
  pointer?: React.ComponentType<SaturationProps>;
  onChange?: (data: unknown, event: React.MouseEvent | React.TouchEvent) => void;
}

export class Saturation extends (PureComponent || Component)<SaturationProps> {
  private container: HTMLDivElement | null = null;
  private throttle: ReturnType<typeof throttle>;

  constructor(props: SaturationProps) {
    super(props);

    this.throttle = throttle(
      (onChange: SaturationProps['onChange'], data: unknown, event: React.MouseEvent | React.TouchEvent) => {
        onChange?.(data, event);
      },
      50
    );
  }

  componentWillUnmount(): void {
    this.throttle.cancel();
    this.unbindEventListeners();
  }

  private handleChange = (event: React.MouseEvent | React.TouchEvent | MouseEvent): void => {
    if (typeof this.props.onChange === 'function') {
      this.throttle(
        this.props.onChange,
        calculateChangeUtil.calculateChange(event, this.props.hsl, this.container),
        event as React.MouseEvent | React.TouchEvent
      );
    }
  };

  private handleMouseDown = (event: React.MouseEvent): void => {
    this.handleChange(event);
    window.addEventListener('mousemove', this.handleChange);
    window.addEventListener('mouseup', this.handleMouseUp);
  };

  private handleMouseUp = (): void => {
    this.unbindEventListeners();
  };

  private unbindEventListeners(): void {
    window.removeEventListener('mousemove', this.handleChange);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  render(): React.ReactElement {
    const customStyle = this.props.style ?? {};
    const { color, white, black, pointer, circle } = customStyle;

    const styles = reactCSS(
      {
        default: {
          color: {
            absolute: '0px 0px 0px 0px',
            background: `hsl(${this.props.hsl.h}, 100%, 50%)`,
            borderRadius: this.props.radius,
          },
          white: {
            absolute: '0px 0px 0px 0px',
            borderRadius: this.props.radius,
          },
          black: {
            absolute: '0px 0px 0px 0px',
            boxShadow: this.props.shadow,
            borderRadius: this.props.radius,
          },
          pointer: {
            position: 'absolute',
            top: `${-100 * this.props.hsv.v + 100}%`,
            left: `${100 * this.props.hsv.s}%`,
            cursor: 'default',
          },
          circle: {
            width: '4px',
            height: '4px',
            boxShadow:
              '0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0, 0, 0, .3), 0 0 1px 2px rgba(0, 0, 0, .4)',
            borderRadius: '50%',
            cursor: 'hand',
            transform: 'translate(-2px, -2px)',
          },
        },
        custom: {
          color,
          white,
          black,
          pointer,
          circle,
        },
      },
      {
        custom: !!this.props.style,
      }
    );

    const PointerComponent = this.props.pointer;

    return (
      <div
        style={styles.color}
        ref={(ref) => (this.container = ref)}
        onMouseDown={this.handleMouseDown}
        onTouchMove={this.handleChange}
        onTouchStart={this.handleChange}
      >
        <style>
          {`
            .saturation-white {
              background: -webkit-linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
              background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
            }
            .saturation-black {
              background: -webkit-linear-gradient(to top, #000, rgba(0, 0, 0, 0));
              background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
            }
          `}
        </style>
        <div style={styles.white} className="saturation-white">
          <div style={styles.black} className="saturation-black" />
          <div style={styles.pointer}>
            {PointerComponent ? (
              <PointerComponent {...this.props} />
            ) : (
              <div style={styles.circle} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Saturation;