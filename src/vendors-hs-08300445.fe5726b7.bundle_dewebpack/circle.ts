import React from 'react';
import { ColorWrap } from './ColorWrap';
import CircleSwatch from './CircleSwatch';

interface MaterialColors {
  red: Record<number, string>;
  pink: Record<number, string>;
  purple: Record<number, string>;
  deepPurple: Record<number, string>;
  indigo: Record<number, string>;
  blue: Record<number, string>;
  lightBlue: Record<number, string>;
  cyan: Record<number, string>;
  teal: Record<number, string>;
  green: Record<number, string>;
  lightGreen: Record<number, string>;
  lime: Record<number, string>;
  yellow: Record<number, string>;
  amber: Record<number, string>;
  orange: Record<number, string>;
  deepOrange: Record<number, string>;
  brown: Record<number, string>;
  blueGrey: Record<number, string>;
}

const materialColors: MaterialColors = {
  red: { 500: '#f44336' },
  pink: { 500: '#e91e63' },
  purple: { 500: '#9c27b0' },
  deepPurple: { 500: '#673ab7' },
  indigo: { 500: '#3f51b5' },
  blue: { 500: '#2196f3' },
  lightBlue: { 500: '#03a9f4' },
  cyan: { 500: '#00bcd4' },
  teal: { 500: '#009688' },
  green: { 500: '#4caf50' },
  lightGreen: { 500: '#8bc34a' },
  lime: { 500: '#cddc39' },
  yellow: { 500: '#ffeb3b' },
  amber: { 500: '#ffc107' },
  orange: { 500: '#ff9800' },
  deepOrange: { 500: '#ff5722' },
  brown: { 500: '#795548' },
  blueGrey: { 500: '#607d8b' }
};

interface ColorResult {
  hex: string;
  source: string;
}

interface CirclePickerStyles {
  card?: React.CSSProperties;
}

interface CirclePickerProps {
  width?: string | number;
  onChange?: (color: ColorResult, event: React.MouseEvent) => void;
  onSwatchHover?: (color: ColorResult, event: React.MouseEvent) => void;
  colors?: string[];
  hex?: string;
  circleSize?: number;
  styles?: CirclePickerStyles;
  circleSpacing?: number;
  className?: string;
}

const DEFAULT_WIDTH = 252;
const DEFAULT_CIRCLE_SIZE = 28;
const DEFAULT_CIRCLE_SPACING = 14;

const DEFAULT_COLORS = [
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
];

export const Circle: React.FC<CirclePickerProps> = ({
  width = DEFAULT_WIDTH,
  onChange,
  onSwatchHover,
  colors = DEFAULT_COLORS,
  hex,
  circleSize = DEFAULT_CIRCLE_SIZE,
  styles = {},
  circleSpacing = DEFAULT_CIRCLE_SPACING,
  className = ''
}) => {
  const cardStyle: React.CSSProperties = {
    width,
    display: 'flex',
    flexWrap: 'wrap',
    marginRight: -circleSpacing,
    marginBottom: -circleSpacing,
    ...styles.card
  };

  const handleChange = (color: string, event: React.MouseEvent): void => {
    onChange?.({ hex: color, source: 'hex' }, event);
  };

  return (
    <div style={cardStyle} className={`circle-picker ${className}`}>
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

export default ColorWrap(Circle);