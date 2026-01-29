import React from 'react';
import reactCSS from 'reactcss';
import color from './color';
import { EditableInput } from './EditableInput';

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

interface ColorChangeData {
  hex?: string;
  r?: number;
  g?: number;
  b?: number;
  a?: number;
  h?: number;
  s?: number;
  l?: number;
  source: 'hex' | 'rgb';
}

interface SketchFieldsProps {
  onChange: (data: ColorChangeData, event: React.SyntheticEvent) => void;
  rgb: RGBColor;
  hsl: HSLColor;
  hex: string;
  disableAlpha?: boolean;
}

export const SketchFields: React.FC<SketchFieldsProps> = ({
  onChange,
  rgb,
  hsl,
  hex,
  disableAlpha
}) => {
  const styles = reactCSS(
    {
      default: {
        fields: {
          display: 'flex',
          paddingTop: '4px'
        },
        single: {
          flex: '1',
          paddingLeft: '6px'
        },
        alpha: {
          flex: '1',
          paddingLeft: '6px'
        },
        double: {
          flex: '2'
        },
        input: {
          width: '80%',
          padding: '4px 10% 3px',
          border: 'none',
          boxShadow: 'inset 0 0 0 1px #ccc',
          fontSize: '11px'
        },
        label: {
          display: 'block',
          textAlign: 'center' as const,
          fontSize: '11px',
          color: '#222',
          paddingTop: '3px',
          paddingBottom: '4px',
          textTransform: 'capitalize' as const
        }
      },
      disableAlpha: {
        alpha: {
          display: 'none'
        }
      }
    },
    {
      disableAlpha
    }
  );

  const handleChange = (data: Partial<ColorChangeData>, event: React.SyntheticEvent): void => {
    if (data.hex) {
      if (color.isValidHex(data.hex)) {
        onChange(
          {
            hex: data.hex,
            source: 'hex'
          },
          event
        );
      }
    } else if (data.r !== undefined || data.g !== undefined || data.b !== undefined) {
      onChange(
        {
          r: data.r ?? rgb.r,
          g: data.g ?? rgb.g,
          b: data.b ?? rgb.b,
          a: rgb.a,
          source: 'rgb'
        },
        event
      );
    } else if (data.a !== undefined) {
      let alpha = data.a;
      
      if (alpha < 0) {
        alpha = 0;
      } else if (alpha > 100) {
        alpha = 100;
      }
      
      alpha /= 100;
      
      onChange(
        {
          h: hsl.h,
          s: hsl.s,
          l: hsl.l,
          a: alpha,
          source: 'rgb'
        },
        event
      );
    }
  };

  return (
    <div style={styles.fields} className="flexbox-fix">
      <div style={styles.double}>
        <EditableInput
          style={{
            input: styles.input,
            label: styles.label
          }}
          label="hex"
          value={hex.replace('#', '')}
          onChange={handleChange}
        />
      </div>
      <div style={styles.single}>
        <EditableInput
          style={{
            input: styles.input,
            label: styles.label
          }}
          label="r"
          value={rgb.r}
          onChange={handleChange}
          dragLabel="true"
          dragMax="255"
        />
      </div>
      <div style={styles.single}>
        <EditableInput
          style={{
            input: styles.input,
            label: styles.label
          }}
          label="g"
          value={rgb.g}
          onChange={handleChange}
          dragLabel="true"
          dragMax="255"
        />
      </div>
      <div style={styles.single}>
        <EditableInput
          style={{
            input: styles.input,
            label: styles.label
          }}
          label="b"
          value={rgb.b}
          onChange={handleChange}
          dragLabel="true"
          dragMax="255"
        />
      </div>
      <div style={styles.alpha}>
        <EditableInput
          style={{
            input: styles.input,
            label: styles.label
          }}
          label="a"
          value={Math.round(100 * rgb.a)}
          onChange={handleChange}
          dragLabel="true"
          dragMax="100"
        />
      </div>
    </div>
  );
};

export default SketchFields;