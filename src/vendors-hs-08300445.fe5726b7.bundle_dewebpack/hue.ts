import React, { PureComponent, Component, CSSProperties, MouseEvent, TouchEvent } from 'react';
import reactCSS from 'reactcss';
import * as hueCalculations from './hue-calculations';

interface HSL {
  h: number;
  s: number;
  l: number;
  a?: number;
}

interface ColorChangeData {
  h?: number;
  s?: number;
  l?: number;
  a?: number;
  hsl?: HSL;
  hex?: string;
  rgb?: { r: number; g: number; b: number; a?: number };
  source?: string;
}

interface HueProps {
  hsl: HSL;
  direction?: 'horizontal' | 'vertical';
  radius?: string;
  shadow?: string;
  pointer?: React.ComponentType<HueProps>;
  onChange?: (color: ColorChangeData, event: MouseEvent | TouchEvent) => void;
}

interface HueState {}

interface StyleSheet {
  hue: CSSProperties;
  container: CSSProperties;
  pointer: CSSProperties;
  slider: CSSProperties;
}

export class Hue extends (PureComponent || Component)<HueProps, HueState> {
  private container: HTMLDivElement | null = null;

  /**
   * Handles color change based on user interaction
   */
  handleChange = (event: MouseEvent | TouchEvent): void => {
    const change = hueCalculations.calculateChange(
      event,
      this.props.direction,
      this.props.hsl,
      this.container
    );
    
    if (change && typeof this.props.onChange === 'function') {
      this.props.onChange(change, event);
    }
  };

  /**
   * Handles mouse down event and binds move/up listeners
   */
  handleMouseDown = (event: MouseEvent): void => {
    this.handleChange(event);
    window.addEventListener('mousemove', this.handleChange as any);
    window.addEventListener('mouseup', this.handleMouseUp);
  };

  /**
   * Handles mouse up event and unbinds listeners
   */
  handleMouseUp = (): void => {
    this.unbindEventListeners();
  };

  componentWillUnmount(): void {
    this.unbindEventListeners();
  }

  /**
   * Removes global mouse event listeners
   */
  unbindEventListeners(): void {
    window.removeEventListener('mousemove', this.handleChange as any);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  render(): JSX.Element {
    const { direction = 'horizontal' } = this.props;
    
    const styles = reactCSS<StyleSheet>(
      {
        default: {
          hue: {
            absolute: '0px 0px 0px 0px',
            borderRadius: this.props.radius,
            boxShadow: this.props.shadow,
          },
          container: {
            padding: '0 2px',
            position: 'relative',
            height: '100%',
            borderRadius: this.props.radius,
          },
          pointer: {
            position: 'absolute',
            left: `${(100 * this.props.hsl.h) / 360}%`,
          },
          slider: {
            marginTop: '1px',
            width: '4px',
            borderRadius: '1px',
            height: '8px',
            boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
            background: '#fff',
            transform: 'translateX(-2px)',
          },
        },
        vertical: {
          pointer: {
            left: '0px',
            top: `${-(100 * this.props.hsl.h) / 360 + 100}%`,
          },
        },
      },
      { vertical: direction === 'vertical' }
    );

    return (
      <div style={styles.hue}>
        <div
          className={`hue-${direction}`}
          style={styles.container}
          ref={(ref) => (this.container = ref)}
          onMouseDown={this.handleMouseDown}
          onTouchMove={this.handleChange as any}
          onTouchStart={this.handleChange as any}
        >
          <style>
            {`
              .hue-horizontal {
                background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
                background: -webkit-linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
              }

              .hue-vertical {
                background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
                background: -webkit-linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
              }
            `}
          </style>
          <div style={styles.pointer}>
            {this.props.pointer ? (
              <this.props.pointer {...this.props} />
            ) : (
              <div style={styles.slider} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Hue;