import React from 'react';
import { ColorWrap, Raised, EditableInput } from './common';
import color from './helpers/color';

interface RGBColor {
  r: number;
  g: number;
  b: number;
}

interface MaterialStyles {
  material?: React.CSSProperties;
  HEXwrap?: React.CSSProperties;
  HEXinput?: React.CSSProperties;
  HEXlabel?: React.CSSProperties;
  Hex?: { style?: React.CSSProperties };
  RGBwrap?: React.CSSProperties;
  RGBinput?: React.CSSProperties;
  RGBlabel?: React.CSSProperties;
  split?: React.CSSProperties;
  third?: React.CSSProperties;
}

interface ColorChangeData {
  hex?: string;
  r?: number;
  g?: number;
  b?: number;
  source?: string;
}

interface MaterialProps {
  onChange: (data: ColorChangeData, event: React.SyntheticEvent) => void;
  hex: string;
  rgb: RGBColor;
  styles?: MaterialStyles;
  className?: string;
}

const Material: React.FC<MaterialProps> = ({
  onChange,
  hex,
  rgb,
  styles = {},
  className = ''
}) => {
  const computedStyles = {
    material: {
      width: '98px',
      height: '98px',
      padding: '16px',
      fontFamily: 'Roboto',
      ...styles.material
    },
    HEXwrap: {
      position: 'relative' as const,
      ...styles.HEXwrap
    },
    HEXinput: {
      width: '100%',
      marginTop: '12px',
      fontSize: '15px',
      color: '#333',
      padding: '0px',
      border: '0px',
      borderBottom: `2px solid ${hex}`,
      outline: 'none',
      height: '30px',
      ...styles.HEXinput
    },
    HEXlabel: {
      position: 'absolute' as const,
      top: '0px',
      left: '0px',
      fontSize: '11px',
      color: '#999999',
      textTransform: 'capitalize' as const,
      ...styles.HEXlabel
    },
    Hex: {
      style: {
        ...styles.Hex?.style
      }
    },
    RGBwrap: {
      position: 'relative' as const,
      ...styles.RGBwrap
    },
    RGBinput: {
      width: '100%',
      marginTop: '12px',
      fontSize: '15px',
      color: '#333',
      padding: '0px',
      border: '0px',
      borderBottom: '1px solid #eee',
      outline: 'none',
      height: '30px',
      ...styles.RGBinput
    },
    RGBlabel: {
      position: 'absolute' as const,
      top: '0px',
      left: '0px',
      fontSize: '11px',
      color: '#999999',
      textTransform: 'capitalize' as const,
      ...styles.RGBlabel
    },
    split: {
      display: 'flex',
      marginRight: '-10px',
      paddingTop: '11px',
      ...styles.split
    },
    third: {
      flex: '1',
      paddingRight: '10px',
      ...styles.third
    }
  };

  const handleChange = (data: ColorChangeData, event: React.SyntheticEvent): void => {
    if (data.hex) {
      if (color.isValidHex(data.hex)) {
        onChange({
          hex: data.hex,
          source: 'hex'
        }, event);
      }
    } else if (data.r !== undefined || data.g !== undefined || data.b !== undefined) {
      onChange({
        r: data.r ?? rgb.r,
        g: data.g ?? rgb.g,
        b: data.b ?? rgb.b,
        source: 'rgb'
      }, event);
    }
  };

  return (
    <Raised styles={styles}>
      <div style={computedStyles.material} className={`material-picker ${className}`}>
        <EditableInput
          style={{
            wrap: computedStyles.HEXwrap,
            input: computedStyles.HEXinput,
            label: computedStyles.HEXlabel
          }}
          label="hex"
          value={hex}
          onChange={handleChange}
        />
        <div style={computedStyles.split} className="flexbox-fix">
          <div style={computedStyles.third}>
            <EditableInput
              style={{
                wrap: computedStyles.RGBwrap,
                input: computedStyles.RGBinput,
                label: computedStyles.RGBlabel
              }}
              label="r"
              value={rgb.r}
              onChange={handleChange}
            />
          </div>
          <div style={computedStyles.third}>
            <EditableInput
              style={{
                wrap: computedStyles.RGBwrap,
                input: computedStyles.RGBinput,
                label: computedStyles.RGBlabel
              }}
              label="g"
              value={rgb.g}
              onChange={handleChange}
            />
          </div>
          <div style={computedStyles.third}>
            <EditableInput
              style={{
                wrap: computedStyles.RGBwrap,
                input: computedStyles.RGBinput,
                label: computedStyles.RGBlabel
              }}
              label="b"
              value={rgb.b}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </Raised>
  );
};

export { Material };
export default ColorWrap(Material);