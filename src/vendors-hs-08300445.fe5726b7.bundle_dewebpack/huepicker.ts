import React from 'react';
import { Hue, ColorWrap, HSL } from './color-utils';
import DefaultPointer from './default-pointer';

interface HuePickerStyles {
  picker?: React.CSSProperties;
  hue?: React.CSSProperties;
}

interface HuePickerProps {
  width?: string;
  height?: string;
  onChange: (color: { h: number; s: number; l: number; a: number }) => void;
  hsl: HSL;
  direction?: 'horizontal' | 'vertical';
  pointer?: React.ComponentType<any>;
  styles?: HuePickerStyles;
  className?: string;
}

const DEFAULT_WIDTH = '316px';
const DEFAULT_HEIGHT = '16px';
const DEFAULT_DIRECTION = 'horizontal';
const DEFAULT_SATURATION = 1;
const DEFAULT_LIGHTNESS = 0.5;
const DEFAULT_ALPHA = 1;

export const HuePicker: React.FC<HuePickerProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  onChange,
  hsl,
  direction = DEFAULT_DIRECTION,
  pointer = DefaultPointer,
  styles = {},
  className = ''
}) => {
  const defaultStyles: HuePickerStyles = {
    picker: {
      position: 'relative',
      width,
      height
    },
    hue: {
      borderRadius: '2px'
    }
  };

  const mergedStyles: HuePickerStyles = {
    picker: { ...defaultStyles.picker, ...styles.picker },
    hue: { ...defaultStyles.hue, ...styles.hue }
  };

  const handleChange = (color: { h: number }): void => {
    onChange({
      h: color.h,
      s: DEFAULT_SATURATION,
      l: DEFAULT_LIGHTNESS,
      a: DEFAULT_ALPHA
    });
  };

  return (
    <div style={mergedStyles.picker} className={`hue-picker ${className}`}>
      <Hue
        {...mergedStyles.hue}
        hsl={hsl}
        pointer={pointer}
        onChange={handleChange}
        direction={direction}
      />
    </div>
  );
};

export default ColorWrap(HuePicker);