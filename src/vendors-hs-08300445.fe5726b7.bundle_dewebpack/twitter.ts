import React from 'react';
import { ColorWrap, Swatch, EditableInput } from './common';

interface TwitterPickerProps {
  onChange: (color: { hex: string; source: string }, event: React.SyntheticEvent) => void;
  onSwatchHover?: (color: { hex: string }, event: React.MouseEvent) => void;
  hex: string;
  colors?: string[];
  width?: string | number;
  triangle?: 'hide' | 'top-left' | 'top-right';
  styles?: Record<string, React.CSSProperties>;
  className?: string;
}

interface StylesMap {
  card: React.CSSProperties;
  body: React.CSSProperties;
  label: React.CSSProperties;
  triangle: React.CSSProperties;
  triangleShadow: React.CSSProperties;
  hash: React.CSSProperties;
  input: React.CSSProperties;
  swatch: React.CSSProperties;
  clear: React.CSSProperties;
}

const DEFAULT_COLORS = [
  '#FF6900',
  '#FCB900',
  '#7BDCB5',
  '#00D084',
  '#8ED1FC',
  '#0693E3',
  '#ABB8C3',
  '#EB144C',
  '#F78DA7',
  '#9900EF'
];

const isValidHex = (hex: string): boolean => {
  return /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
};

const mergeStyles = (
  baseStyles: StylesMap,
  customStyles: Record<string, React.CSSProperties>,
  triangle: string
): StylesMap => {
  const merged = { ...baseStyles };
  
  if (triangle === 'hide') {
    merged.triangle = { ...merged.triangle, display: 'none' };
    merged.triangleShadow = { ...merged.triangleShadow, display: 'none' };
  } else if (triangle === 'top-left') {
    merged.triangle = { ...merged.triangle, top: '-10px', left: '12px' };
    merged.triangleShadow = { ...merged.triangleShadow, top: '-11px', left: '12px' };
  } else if (triangle === 'top-right') {
    merged.triangle = { ...merged.triangle, top: '-10px', right: '12px' };
    merged.triangleShadow = { ...merged.triangleShadow, top: '-11px', right: '12px' };
  }
  
  Object.keys(customStyles).forEach(key => {
    if (merged[key as keyof StylesMap]) {
      merged[key as keyof StylesMap] = { ...merged[key as keyof StylesMap], ...customStyles[key] };
    }
  });
  
  return merged;
};

export const Twitter: React.FC<TwitterPickerProps> = ({
  onChange,
  onSwatchHover,
  hex,
  colors = DEFAULT_COLORS,
  width = 276,
  triangle = 'top-left',
  styles = {},
  className = ''
}) => {
  const baseStyles: StylesMap = {
    card: {
      width,
      background: '#fff',
      border: '0 solid rgba(0, 0, 0, 0.25)',
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.25)',
      borderRadius: '4px',
      position: 'relative'
    },
    body: {
      padding: '15px 9px 9px 15px'
    },
    label: {
      fontSize: '18px',
      color: '#fff'
    },
    triangle: {
      width: '0px',
      height: '0px',
      borderStyle: 'solid',
      borderWidth: '0 9px 10px 9px',
      borderColor: 'transparent transparent #fff transparent',
      position: 'absolute'
    },
    triangleShadow: {
      width: '0px',
      height: '0px',
      borderStyle: 'solid',
      borderWidth: '0 9px 10px 9px',
      borderColor: 'transparent transparent rgba(0, 0, 0, .1) transparent',
      position: 'absolute'
    },
    hash: {
      background: '#F0F0F0',
      height: '30px',
      width: '30px',
      borderRadius: '4px 0 0 4px',
      float: 'left',
      color: '#98A1A4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    input: {
      width: '100px',
      fontSize: '14px',
      color: '#666',
      border: '0px',
      outline: 'none',
      height: '28px',
      boxShadow: 'inset 0 0 0 1px #F0F0F0',
      boxSizing: 'content-box',
      borderRadius: '0 4px 4px 0',
      float: 'left',
      paddingLeft: '8px'
    },
    swatch: {
      width: '30px',
      height: '30px',
      float: 'left',
      borderRadius: '4px',
      margin: '0 6px 6px 0'
    },
    clear: {
      clear: 'both'
    }
  };

  const mergedStyles = mergeStyles(baseStyles, styles, triangle);

  const handleChange = (hexValue: string, event: React.SyntheticEvent): void => {
    if (isValidHex(hexValue)) {
      onChange({ hex: hexValue, source: 'hex' }, event);
    }
  };

  return (
    <div style={mergedStyles.card} className={`twitter-picker ${className}`}>
      <div style={mergedStyles.triangleShadow} />
      <div style={mergedStyles.triangle} />
      <div style={mergedStyles.body}>
        {colors.map((color, index) => (
          <Swatch
            key={index}
            color={color}
            hex={color}
            style={mergedStyles.swatch}
            onClick={handleChange}
            onHover={onSwatchHover}
            focusStyle={{
              boxShadow: `0 0 4px ${color}`
            }}
          />
        ))}
        <div style={mergedStyles.hash}>#</div>
        <EditableInput
          label={null}
          style={{ input: mergedStyles.input }}
          value={hex.replace('#', '')}
          onChange={handleChange}
        />
        <div style={mergedStyles.clear} />
      </div>
    </div>
  );
};

export default ColorWrap(Twitter);