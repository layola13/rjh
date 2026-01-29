import React from 'react';
import { ColorWrap, Alpha } from './common';
import AlphaPointer from './AlphaPointer';

interface RGB {
  r: number;
  g: number;
  b: number;
  a?: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
  a?: number;
}

interface AlphaPickerProps {
  rgb: RGB;
  hsl: HSL;
  width?: string;
  height?: string;
  onChange: (color: any) => void;
  direction?: 'horizontal' | 'vertical';
  style?: React.CSSProperties;
  renderers?: any;
  pointer?: React.ComponentType<any>;
  className?: string;
}

const AlphaPicker: React.FC<AlphaPickerProps> = ({
  rgb,
  hsl,
  width = '316px',
  height = '16px',
  onChange,
  direction = 'horizontal',
  style,
  renderers,
  pointer = AlphaPointer,
  className = ''
}) => {
  const styles = {
    picker: {
      position: 'relative' as const,
      width,
      height
    },
    alpha: {
      radius: '2px',
      style
    }
  };

  return (
    <div style={styles.picker} className={`alpha-picker ${className}`}>
      <Alpha
        {...styles.alpha}
        rgb={rgb}
        hsl={hsl}
        pointer={pointer}
        renderers={renderers}
        onChange={onChange}
        direction={direction}
      />
    </div>
  );
};

export { AlphaPicker };
export default ColorWrap(AlphaPicker);