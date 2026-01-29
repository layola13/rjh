import React from 'react';
import { ColorWrap, Checkboard, EditableInput } from './common';
import BlockSwatches from './BlockSwatches';
import { getContrastingColor, isValidHex } from './helpers/color';

interface ColorResult {
  hex: string;
  source: string;
}

interface BlockPickerProps {
  onChange: (color: ColorResult, event: React.MouseEvent | React.ChangeEvent) => void;
  onSwatchHover?: (color: ColorResult, event: React.MouseEvent) => void;
  hex: string;
  colors?: string[];
  width?: string | number;
  triangle?: 'top' | 'hide';
  styles?: Partial<BlockPickerStyles>;
  className?: string;
}

interface BlockPickerStyles {
  card: React.CSSProperties;
  head: React.CSSProperties;
  body: React.CSSProperties;
  label: React.CSSProperties;
  triangle: React.CSSProperties;
  input: React.CSSProperties;
}

const DEFAULT_COLORS = [
  '#D9E3F0',
  '#F47373',
  '#697689',
  '#37D67A',
  '#2CCCE4',
  '#555555',
  '#dce775',
  '#ff8a65',
  '#ba68c8'
];

const DEFAULT_WIDTH = 170;

export const Block: React.FC<BlockPickerProps> = ({
  onChange,
  onSwatchHover,
  hex,
  colors = DEFAULT_COLORS,
  width = DEFAULT_WIDTH,
  triangle = 'top',
  styles = {},
  className = ''
}) => {
  const isTransparent = hex === 'transparent';

  const handleChange = (color: string, event: React.MouseEvent | React.ChangeEvent): void => {
    if (isValidHex(color)) {
      onChange({ hex: color, source: 'hex' }, event);
    }
  };

  const defaultStyles: BlockPickerStyles = {
    card: {
      width,
      background: '#fff',
      boxShadow: '0 1px rgba(0, 0, 0, .1)',
      borderRadius: '6px',
      position: 'relative'
    },
    head: {
      height: '110px',
      background: hex,
      borderRadius: '6px 6px 0 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    },
    body: {
      padding: '10px'
    },
    label: {
      fontSize: '18px',
      color: getContrastingColor(hex),
      position: 'relative'
    },
    triangle: {
      width: '0px',
      height: '0px',
      borderStyle: 'solid',
      borderWidth: '0 10px 10px 10px',
      borderColor: `transparent transparent ${hex} transparent`,
      position: 'absolute',
      top: '-10px',
      left: '50%',
      marginLeft: '-10px',
      ...(triangle === 'hide' && { display: 'none' })
    },
    input: {
      width: '100%',
      fontSize: '12px',
      color: '#666',
      border: '0px',
      outline: 'none',
      height: '22px',
      boxShadow: 'inset 0 0 0 1px #ddd',
      borderRadius: '4px',
      padding: '0 7px',
      boxSizing: 'border-box'
    }
  };

  const mergedStyles: BlockPickerStyles = {
    card: { ...defaultStyles.card, ...styles.card },
    head: { ...defaultStyles.head, ...styles.head },
    body: { ...defaultStyles.body, ...styles.body },
    label: { ...defaultStyles.label, ...styles.label },
    triangle: { ...defaultStyles.triangle, ...styles.triangle },
    input: { ...defaultStyles.input, ...styles.input }
  };

  return (
    <div style={mergedStyles.card} className={`block-picker ${className}`}>
      <div style={mergedStyles.triangle} />
      <div style={mergedStyles.head}>
        {isTransparent && <Checkboard borderRadius="6px 6px 0 0" />}
        <div style={mergedStyles.label}>{hex}</div>
      </div>
      <div style={mergedStyles.body}>
        <BlockSwatches colors={colors} onClick={handleChange} onSwatchHover={onSwatchHover} />
        <EditableInput style={{ input: mergedStyles.input }} value={hex} onChange={handleChange} />
      </div>
    </div>
  );
};

export default ColorWrap(Block);