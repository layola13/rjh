import React from 'react';
import reactCSS from 'reactcss';
import SliderSwatch from './SliderSwatch';

interface HSL {
  h: number;
  s: number;
  l: number;
}

interface SliderSwatchesProps {
  onClick: (offset: string) => void;
  hsl: HSL;
}

const ACTIVE_THRESHOLD = 0.1;
const SATURATION_TARGET = 0.5;

const LIGHTNESS_OFFSETS = [
  { value: 0.8, offset: '.80', first: true },
  { value: 0.65, offset: '.65' },
  { value: 0.5, offset: '.50' },
  { value: 0.35, offset: '.35' },
  { value: 0.2, offset: '.20', last: true }
] as const;

export const SliderSwatches: React.FC<SliderSwatchesProps> = ({ onClick, hsl }) => {
  const styles = reactCSS({
    default: {
      swatches: {
        marginTop: '20px'
      },
      swatch: {
        boxSizing: 'border-box' as const,
        width: '20%',
        paddingRight: '1px',
        float: 'left' as const
      },
      clear: {
        clear: 'both' as const
      }
    }
  });

  const isActive = (lightnessValue: number): boolean => {
    return (
      Math.abs(hsl.l - lightnessValue) < ACTIVE_THRESHOLD &&
      Math.abs(hsl.s - SATURATION_TARGET) < ACTIVE_THRESHOLD
    );
  };

  return (
    <div style={styles.swatches}>
      {LIGHTNESS_OFFSETS.map(({ value, offset, first, last }) => (
        <div key={offset} style={styles.swatch}>
          <SliderSwatch
            hsl={hsl}
            offset={offset}
            active={isActive(value)}
            onClick={onClick}
            first={first}
            last={last}
          />
        </div>
      ))}
      <div style={styles.clear} />
    </div>
  );
};

export default SliderSwatches;