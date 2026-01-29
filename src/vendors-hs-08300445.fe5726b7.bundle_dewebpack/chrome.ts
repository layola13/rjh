import React from 'react';
import { ColorWrap, Saturation, Checkboard, Hue, Alpha } from './common';
import ChromeFields from './ChromeFields';
import ChromePointer from './ChromePointer';
import ChromePointerCircle from './ChromePointerCircle';

interface RGBColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface HSLColor {
  h: number;
  s: number;
  l: number;
  a: number;
}

interface HSVColor {
  h: number;
  s: number;
  v: number;
  a: number;
}

interface ChromePickerStyles {
  picker?: React.CSSProperties;
  saturation?: React.CSSProperties;
  Saturation?: React.CSSProperties;
  body?: React.CSSProperties;
  controls?: React.CSSProperties;
  color?: React.CSSProperties;
  swatch?: React.CSSProperties;
  active?: React.CSSProperties;
  toggles?: React.CSSProperties;
  hue?: React.CSSProperties;
  Hue?: React.CSSProperties;
  alpha?: React.CSSProperties;
  Alpha?: React.CSSProperties;
}

interface ChromePickerProps {
  width?: string | number;
  onChange: (color: any) => void;
  disableAlpha?: boolean;
  rgb: RGBColor;
  hsl: HSLColor;
  hsv: HSVColor;
  hex: string;
  renderers?: any;
  styles?: ChromePickerStyles;
  className?: string;
}

const Chrome: React.FC<ChromePickerProps> = ({
  width = 225,
  onChange,
  disableAlpha = false,
  rgb,
  hsl,
  hsv,
  hex,
  renderers,
  styles = {},
  className = ''
}) => {
  const mergedStyles: ChromePickerStyles = {
    picker: {
      width,
      background: '#fff',
      borderRadius: '2px',
      boxShadow: '0 0 2px rgba(0, 0, 0, .3), 0 4px 8px rgba(0, 0, 0, .3)',
      boxSizing: 'initial',
      fontFamily: 'Menlo',
      ...styles.picker
    },
    saturation: {
      width: '100%',
      paddingBottom: '55%',
      position: 'relative',
      borderRadius: '2px 2px 0 0',
      overflow: 'hidden',
      ...styles.saturation
    },
    Saturation: {
      borderRadius: '2px 2px 0 0',
      ...styles.Saturation
    },
    body: {
      padding: '16px 16px 12px',
      ...styles.body
    },
    controls: {
      display: 'flex',
      ...styles.controls
    },
    color: {
      width: disableAlpha ? '22px' : '32px',
      ...styles.color
    },
    swatch: {
      marginTop: disableAlpha ? '0px' : '6px',
      width: disableAlpha ? '10px' : '16px',
      height: disableAlpha ? '10px' : '16px',
      borderRadius: '8px',
      position: 'relative',
      overflow: 'hidden',
      ...styles.swatch
    },
    active: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      borderRadius: '8px',
      boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, .1)',
      background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`,
      zIndex: 2,
      ...styles.active
    },
    toggles: {
      flex: '1',
      ...styles.toggles
    },
    hue: {
      height: '10px',
      position: 'relative',
      marginBottom: disableAlpha ? '0px' : '8px',
      ...styles.hue
    },
    Hue: {
      borderRadius: '2px',
      ...styles.Hue
    },
    alpha: {
      height: '10px',
      position: 'relative',
      display: disableAlpha ? 'none' : undefined,
      ...styles.alpha
    },
    Alpha: {
      borderRadius: '2px',
      ...styles.Alpha
    }
  };

  return (
    <div style={mergedStyles.picker} className={`chrome-picker ${className}`}>
      <div style={mergedStyles.saturation}>
        <Saturation
          style={mergedStyles.Saturation}
          hsl={hsl}
          hsv={hsv}
          pointer={ChromePointerCircle}
          onChange={onChange}
        />
      </div>
      <div style={mergedStyles.body}>
        <div style={mergedStyles.controls} className="flexbox-fix">
          <div style={mergedStyles.color}>
            <div style={mergedStyles.swatch}>
              <div style={mergedStyles.active} />
              <Checkboard renderers={renderers} />
            </div>
          </div>
          <div style={mergedStyles.toggles}>
            <div style={mergedStyles.hue}>
              <Hue
                style={mergedStyles.Hue}
                hsl={hsl}
                pointer={ChromePointer}
                onChange={onChange}
              />
            </div>
            <div style={mergedStyles.alpha}>
              <Alpha
                style={mergedStyles.Alpha}
                rgb={rgb}
                hsl={hsl}
                pointer={ChromePointer}
                renderers={renderers}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <ChromeFields
          rgb={rgb}
          hsl={hsl}
          hex={hex}
          onChange={onChange}
          disableAlpha={disableAlpha}
        />
      </div>
    </div>
  );
};

export { Chrome };
export default ColorWrap(Chrome);