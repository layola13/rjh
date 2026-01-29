import React, { CSSProperties } from 'react';
import { Saturation, Hue, Alpha, Checkboard, ColorWrap } from './common';
import SketchFields from './SketchFields';
import SketchPresetColors from './SketchPresetColors';

interface RGB {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
  a: number;
}

interface HSV {
  h: number;
  s: number;
  v: number;
  a: number;
}

interface ColorResult {
  rgb: RGB;
  hsl: HSL;
  hsv: HSV;
  hex: string;
}

interface SketchStyles {
  picker?: CSSProperties;
  saturation?: CSSProperties;
  Saturation?: CSSProperties;
  controls?: CSSProperties;
  sliders?: CSSProperties;
  color?: CSSProperties;
  activeColor?: CSSProperties;
  hue?: CSSProperties;
  Hue?: CSSProperties;
  alpha?: CSSProperties;
  Alpha?: CSSProperties;
}

interface SketchProps {
  width?: string | number;
  rgb: RGB;
  hex: string;
  hsv: HSV;
  hsl: HSL;
  onChange: (color: ColorResult) => void;
  onSwatchHover?: (color: ColorResult) => void;
  disableAlpha?: boolean;
  presetColors?: string[];
  renderers?: unknown;
  styles?: SketchStyles;
  className?: string;
}

const DEFAULT_PRESET_COLORS = [
  '#D0021B',
  '#F5A623',
  '#F8E71C',
  '#8B572A',
  '#7ED321',
  '#417505',
  '#BD10E0',
  '#9013FE',
  '#4A90E2',
  '#50E3C2',
  '#B8E986',
  '#000000',
  '#4A4A4A',
  '#9B9B9B',
  '#FFFFFF'
];

export const Sketch: React.FC<SketchProps> = ({
  width = 200,
  rgb,
  hex,
  hsv,
  hsl,
  onChange,
  onSwatchHover,
  disableAlpha = false,
  presetColors = DEFAULT_PRESET_COLORS,
  renderers,
  styles = {},
  className = ''
}) => {
  const mergedStyles: SketchStyles = {
    picker: {
      width,
      padding: '10px 10px 0',
      boxSizing: 'initial',
      background: '#fff',
      borderRadius: '4px',
      boxShadow: '0 0 0 1px rgba(0, 0, 0, .15), 0 8px 16px rgba(0, 0, 0, .15)',
      ...styles.picker
    },
    saturation: {
      width: '100%',
      paddingBottom: '75%',
      position: 'relative',
      overflow: 'hidden',
      ...styles.saturation
    },
    Saturation: {
      borderRadius: '3px',
      boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, .15), inset 0 0 4px rgba(0, 0, 0, .25)',
      ...styles.Saturation
    },
    controls: {
      display: 'flex',
      ...styles.controls
    },
    sliders: {
      padding: '4px 0',
      flex: '1',
      ...styles.sliders
    },
    color: {
      width: '24px',
      height: disableAlpha ? '10px' : '24px',
      position: 'relative',
      marginTop: '4px',
      marginLeft: '4px',
      borderRadius: '3px',
      ...styles.color
    },
    activeColor: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      borderRadius: '2px',
      background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`,
      boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, .15), inset 0 0 4px rgba(0, 0, 0, .25)',
      ...styles.activeColor
    },
    hue: {
      position: 'relative',
      height: '10px',
      overflow: 'hidden',
      ...styles.hue
    },
    Hue: {
      borderRadius: '2px',
      boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, .15), inset 0 0 4px rgba(0, 0, 0, .25)',
      ...styles.Hue
    },
    alpha: {
      position: 'relative',
      height: '10px',
      marginTop: '4px',
      overflow: 'hidden',
      display: disableAlpha ? 'none' : undefined,
      ...styles.alpha
    },
    Alpha: {
      borderRadius: '2px',
      boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, .15), inset 0 0 4px rgba(0, 0, 0, .25)',
      ...styles.Alpha
    }
  };

  return (
    <div style={mergedStyles.picker} className={`sketch-picker ${className}`}>
      <div style={mergedStyles.saturation}>
        <Saturation style={mergedStyles.Saturation} hsl={hsl} hsv={hsv} onChange={onChange} />
      </div>
      <div style={mergedStyles.controls} className="flexbox-fix">
        <div style={mergedStyles.sliders}>
          <div style={mergedStyles.hue}>
            <Hue style={mergedStyles.Hue} hsl={hsl} onChange={onChange} />
          </div>
          <div style={mergedStyles.alpha}>
            <Alpha style={mergedStyles.Alpha} rgb={rgb} hsl={hsl} renderers={renderers} onChange={onChange} />
          </div>
        </div>
        <div style={mergedStyles.color}>
          <Checkboard />
          <div style={mergedStyles.activeColor} />
        </div>
      </div>
      <SketchFields rgb={rgb} hsl={hsl} hex={hex} onChange={onChange} disableAlpha={disableAlpha} />
      <SketchPresetColors colors={presetColors} onClick={onChange} onSwatchHover={onSwatchHover} />
    </div>
  );
};

export default ColorWrap(Sketch);