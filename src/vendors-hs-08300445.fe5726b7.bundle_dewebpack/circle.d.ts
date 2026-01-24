/**
 * Circle color picker component that displays colors in a circular grid layout.
 * @module Circle
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ColorResult, CustomPickerInjectedProps } from 'react-color';
import { ColorWrap } from './ColorWrap';
import CircleSwatch from './CircleSwatch';
import * as materialColors from './material-colors';

/**
 * Style object structure for the Circle component
 */
interface CircleStyles {
  card?: React.CSSProperties;
  [key: string]: React.CSSProperties | undefined;
}

/**
 * Props for the Circle color picker component
 */
interface CircleProps extends Partial<CustomPickerInjectedProps> {
  /** Width of the picker container in pixels or CSS string */
  width?: string | number;
  
  /** Current selected color in hex format */
  hex?: string;
  
  /** Array of color strings to display */
  colors?: string[];
  
  /** Diameter of each color circle in pixels */
  circleSize?: number;
  
  /** Spacing between circles in pixels */
  circleSpacing?: number;
  
  /** Custom styles to override default styles */
  styles?: CircleStyles;
  
  /** Additional CSS class name */
  className?: string;
  
  /** Callback fired when a color is selected */
  onChange?: (color: ColorResult, event: React.MouseEvent) => void;
  
  /** Callback fired when hovering over a color swatch */
  onSwatchHover?: (color: ColorResult, event: React.MouseEvent) => void;
}

/**
 * Circle color picker component.
 * Displays a grid of circular color swatches that can be selected.
 * 
 * @param props - Component props
 * @returns React component
 */
export const Circle: React.FC<CircleProps> = (props) => {
  const {
    width,
    onChange,
    onSwatchHover,
    colors = [],
    hex,
    circleSize,
    styles = {},
    circleSpacing,
    className = ''
  } = props;

  // Merge default and custom styles
  const mergedStyles: { card: React.CSSProperties } = {
    card: {
      width,
      display: 'flex',
      flexWrap: 'wrap',
      marginRight: -circleSpacing!,
      marginBottom: -circleSpacing!,
      ...styles.card
    }
  };

  /**
   * Handle color selection
   * @param colorHex - Selected color in hex format
   * @param event - Mouse event
   */
  const handleChange = (colorHex: string, event: React.MouseEvent): void => {
    if (onChange) {
      onChange(
        {
          hex: colorHex,
          source: 'hex'
        } as ColorResult,
        event
      );
    }
  };

  return (
    <div style={mergedStyles.card} className={`circle-picker ${className}`}>
      {colors.map((color) => (
        <CircleSwatch
          key={color}
          color={color}
          onClick={handleChange}
          onSwatchHover={onSwatchHover}
          active={hex === color.toLowerCase()}
          circleSize={circleSize}
          circleSpacing={circleSpacing}
        />
      ))}
    </div>
  );
};

Circle.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  circleSize: PropTypes.number,
  circleSpacing: PropTypes.number,
  styles: PropTypes.object
};

Circle.defaultProps = {
  width: 252,
  circleSize: 28,
  circleSpacing: 14,
  colors: [
    materialColors.red[500],
    materialColors.pink[500],
    materialColors.purple[500],
    materialColors.deepPurple[500],
    materialColors.indigo[500],
    materialColors.blue[500],
    materialColors.lightBlue[500],
    materialColors.cyan[500],
    materialColors.teal[500],
    materialColors.green[500],
    materialColors.lightGreen[500],
    materialColors.lime[500],
    materialColors.yellow[500],
    materialColors.amber[500],
    materialColors.orange[500],
    materialColors.deepOrange[500],
    materialColors.brown[500],
    materialColors.blueGrey[500]
  ],
  styles: {}
};

/**
 * Circle picker wrapped with ColorWrap HOC for color management
 */
export default ColorWrap(Circle);