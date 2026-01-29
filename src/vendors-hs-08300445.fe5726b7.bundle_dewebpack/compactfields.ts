import React from 'react';
import reactCSS from 'reactcss';
import { EditableInput } from './common';

interface RGBColor {
  r: number;
  g: number;
  b: number;
}

interface CompactFieldsProps {
  hex: string;
  rgb: RGBColor;
  onChange: (color: Partial<RGBColor> & { hex?: string; source: string }, event?: React.ChangeEvent) => void;
}

interface ColorChange {
  r?: number;
  g?: number;
  b?: number;
  hex?: string;
}

export const CompactFields: React.FC<CompactFieldsProps> = ({ hex, rgb, onChange }) => {
  const styles = reactCSS({
    default: {
      fields: {
        display: 'flex',
        paddingBottom: '6px',
        paddingRight: '5px',
        position: 'relative' as const,
      },
      active: {
        position: 'absolute' as const,
        top: '6px',
        left: '5px',
        height: '9px',
        width: '9px',
        background: hex,
      },
      HEXwrap: {
        flex: '6',
        position: 'relative' as const,
      },
      HEXinput: {
        width: '80%',
        padding: '0px',
        paddingLeft: '20%',
        border: 'none',
        outline: 'none',
        background: 'none',
        fontSize: '12px',
        color: '#333',
        height: '16px',
      },
      HEXlabel: {
        display: 'none',
      },
      RGBwrap: {
        flex: '3',
        position: 'relative' as const,
      },
      RGBinput: {
        width: '70%',
        padding: '0px',
        paddingLeft: '30%',
        border: 'none',
        outline: 'none',
        background: 'none',
        fontSize: '12px',
        color: '#333',
        height: '16px',
      },
      RGBlabel: {
        position: 'absolute' as const,
        top: '3px',
        left: '0px',
        lineHeight: '16px',
        textTransform: 'uppercase' as const,
        fontSize: '12px',
        color: '#999',
      },
    },
  });

  const handleChange = (colorChange: ColorChange, event?: React.ChangeEvent): void => {
    if (colorChange.r || colorChange.g || colorChange.b) {
      onChange(
        {
          r: colorChange.r ?? rgb.r,
          g: colorChange.g ?? rgb.g,
          b: colorChange.b ?? rgb.b,
          source: 'rgb',
        },
        event
      );
    } else {
      onChange(
        {
          hex: colorChange.hex,
          source: 'hex',
        },
        event
      );
    }
  };

  return (
    <div style={styles.fields} className="flexbox-fix">
      <div style={styles.active} />
      <EditableInput
        style={{
          wrap: styles.HEXwrap,
          input: styles.HEXinput,
          label: styles.HEXlabel,
        }}
        label="hex"
        value={hex}
        onChange={handleChange}
      />
      <EditableInput
        style={{
          wrap: styles.RGBwrap,
          input: styles.RGBinput,
          label: styles.RGBlabel,
        }}
        label="r"
        value={rgb.r}
        onChange={handleChange}
      />
      <EditableInput
        style={{
          wrap: styles.RGBwrap,
          input: styles.RGBinput,
          label: styles.RGBlabel,
        }}
        label="g"
        value={rgb.g}
        onChange={handleChange}
      />
      <EditableInput
        style={{
          wrap: styles.RGBwrap,
          input: styles.RGBinput,
          label: styles.RGBlabel,
        }}
        label="b"
        value={rgb.b}
        onChange={handleChange}
      />
    </div>
  );
};

export default CompactFields;