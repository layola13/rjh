import React from 'react';
import { Swatch } from './Swatch';

interface PresetColor {
  color: string;
  title?: string;
}

interface SketchPresetColorsProps {
  colors?: Array<string | PresetColor>;
  onClick?: (color: { hex: string; source: string }, event: React.MouseEvent) => void;
  onSwatchHover?: (color: { hex: string; source: string }, event: React.MouseEvent) => void;
}

interface ColorResult {
  hex: string;
  source: string;
}

interface Styles {
  colors: React.CSSProperties;
  swatchWrap: React.CSSProperties;
  swatch: React.CSSProperties;
}

const getStyles = (hasNoPresets: boolean): Styles => {
  const baseStyles: Styles = {
    colors: {
      margin: '0 -10px',
      padding: '10px 0 0 10px',
      borderTop: '1px solid #eee',
      display: 'flex',
      flexWrap: 'wrap',
      position: 'relative'
    },
    swatchWrap: {
      width: '16px',
      height: '16px',
      margin: '0 10px 10px 0'
    },
    swatch: {
      borderRadius: '3px',
      boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, .15)'
    }
  };

  if (hasNoPresets) {
    baseStyles.colors.display = 'none';
  }

  return baseStyles;
};

export const SketchPresetColors: React.FC<SketchPresetColorsProps> = ({
  colors = [],
  onClick = () => {},
  onSwatchHover
}) => {
  const hasNoPresets = !colors || colors.length === 0;
  const styles = getStyles(hasNoPresets);

  const handleSwatchClick = (hex: string, event: React.MouseEvent): void => {
    onClick({ hex, source: 'hex' }, event);
  };

  return (
    <div style={styles.colors} className="flexbox-fix">
      {colors.map((colorItem) => {
        const colorConfig: PresetColor = typeof colorItem === 'string'
          ? { color: colorItem }
          : colorItem;
        
        const key = `${colorConfig.color}${colorConfig.title || ''}`;

        return (
          <div key={key} style={styles.swatchWrap}>
            <Swatch
              color={colorConfig.color}
              title={colorConfig.title}
              style={styles.swatch}
              onClick={handleSwatchClick}
              onHover={onSwatchHover}
              focusStyle={{
                boxShadow: `inset 0 0 0 1px rgba(0, 0, 0, .15), 0 0 4px ${colorConfig.color}`
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SketchPresetColors;