import React from 'react';
import { Hue, ColorWrap, HSL, ColorResult } from './color-utils';
import SliderPointer from './SliderPointer';
import SliderSwatches from './SliderSwatches';

interface SliderStyles {
  wrap?: React.CSSProperties;
  hue?: React.CSSProperties;
  Hue?: React.CSSProperties;
  swatches?: React.CSSProperties;
}

interface SliderProps {
  hsl: HSL;
  onChange: (color: ColorResult) => void;
  pointer?: React.ComponentType<any>;
  styles?: SliderStyles;
  className?: string;
}

const DEFAULT_STYLES: SliderStyles = {
  hue: {
    height: '12px',
    position: 'relative'
  },
  Hue: {
    borderRadius: '2px'
  }
};

export const Slider: React.FC<SliderProps> = ({
  hsl,
  onChange,
  pointer,
  styles = {},
  className = ''
}) => {
  const mergedStyles: SliderStyles = {
    ...DEFAULT_STYLES,
    ...styles
  };

  return (
    <div 
      style={mergedStyles.wrap ?? {}} 
      className={`slider-picker ${className}`}
    >
      <div style={mergedStyles.hue}>
        <Hue
          style={mergedStyles.Hue}
          hsl={hsl}
          pointer={pointer}
          onChange={onChange}
        />
      </div>
      <div style={mergedStyles.swatches}>
        <SliderSwatches
          hsl={hsl}
          onClick={onChange}
        />
      </div>
    </div>
  );
};

Slider.defaultProps = {
  pointer: SliderPointer,
  styles: {}
};

export default ColorWrap(Slider);