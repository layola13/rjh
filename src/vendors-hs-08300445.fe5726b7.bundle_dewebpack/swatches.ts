import React from 'react';
import * as materialColors from './material-colors';
import { Raised, ColorWrap } from './common';
import SwatchGroup from './SwatchGroup';
import colorValidator from './color-validator';

interface ColorChangeData {
  hex: string;
  source: string;
}

interface SwatchesStyles {
  picker?: React.CSSProperties;
  overflow?: React.CSSProperties;
  body?: React.CSSProperties;
  clear?: React.CSSProperties;
}

interface SwatchesProps {
  width?: string | number;
  height?: string | number;
  onChange?: (color: ColorChangeData, event: React.MouseEvent) => void;
  onSwatchHover?: (color: ColorChangeData, event: React.MouseEvent) => void;
  colors?: string[][];
  hex?: string;
  styles?: SwatchesStyles;
  className?: string;
}

const DEFAULT_WIDTH = 320;
const DEFAULT_HEIGHT = 240;
const BODY_PADDING = '16px 0 6px 16px';

const DEFAULT_COLORS: string[][] = [
  [materialColors.red[900], materialColors.red[700], materialColors.red[500], materialColors.red[300], materialColors.red[100]],
  [materialColors.pink[900], materialColors.pink[700], materialColors.pink[500], materialColors.pink[300], materialColors.pink[100]],
  [materialColors.purple[900], materialColors.purple[700], materialColors.purple[500], materialColors.purple[300], materialColors.purple[100]],
  [materialColors.deepPurple[900], materialColors.deepPurple[700], materialColors.deepPurple[500], materialColors.deepPurple[300], materialColors.deepPurple[100]],
  [materialColors.indigo[900], materialColors.indigo[700], materialColors.indigo[500], materialColors.indigo[300], materialColors.indigo[100]],
  [materialColors.blue[900], materialColors.blue[700], materialColors.blue[500], materialColors.blue[300], materialColors.blue[100]],
  [materialColors.lightBlue[900], materialColors.lightBlue[700], materialColors.lightBlue[500], materialColors.lightBlue[300], materialColors.lightBlue[100]],
  [materialColors.cyan[900], materialColors.cyan[700], materialColors.cyan[500], materialColors.cyan[300], materialColors.cyan[100]],
  [materialColors.teal[900], materialColors.teal[700], materialColors.teal[500], materialColors.teal[300], materialColors.teal[100]],
  ['#194D33', materialColors.green[700], materialColors.green[500], materialColors.green[300], materialColors.green[100]],
  [materialColors.lightGreen[900], materialColors.lightGreen[700], materialColors.lightGreen[500], materialColors.lightGreen[300], materialColors.lightGreen[100]],
  [materialColors.lime[900], materialColors.lime[700], materialColors.lime[500], materialColors.lime[300], materialColors.lime[100]],
  [materialColors.yellow[900], materialColors.yellow[700], materialColors.yellow[500], materialColors.yellow[300], materialColors.yellow[100]],
  [materialColors.amber[900], materialColors.amber[700], materialColors.amber[500], materialColors.amber[300], materialColors.amber[100]],
  [materialColors.orange[900], materialColors.orange[700], materialColors.orange[500], materialColors.orange[300], materialColors.orange[100]],
  [materialColors.deepOrange[900], materialColors.deepOrange[700], materialColors.deepOrange[500], materialColors.deepOrange[300], materialColors.deepOrange[100]],
  [materialColors.brown[900], materialColors.brown[700], materialColors.brown[500], materialColors.brown[300], materialColors.brown[100]],
  [materialColors.blueGrey[900], materialColors.blueGrey[700], materialColors.blueGrey[500], materialColors.blueGrey[300], materialColors.blueGrey[100]],
  ['#000000', '#525252', '#969696', '#D9D9D9', '#FFFFFF']
];

/**
 * Swatches color picker component
 * Displays a grid of material design color swatches for selection
 */
export const Swatches: React.FC<SwatchesProps> = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  onChange,
  onSwatchHover,
  colors = DEFAULT_COLORS,
  hex,
  styles = {},
  className = ''
}) => {
  const mergedStyles: SwatchesStyles = {
    picker: {
      width,
      height,
      ...styles.picker
    },
    overflow: {
      height,
      overflowY: 'scroll',
      ...styles.overflow
    },
    body: {
      padding: BODY_PADDING,
      ...styles.body
    },
    clear: {
      clear: 'both',
      ...styles.clear
    }
  };

  const handleColorChange = (colorHex: string, event: React.MouseEvent): void => {
    if (colorValidator.isValidHex(colorHex) && onChange) {
      onChange({
        hex: colorHex,
        source: 'hex'
      }, event);
    }
  };

  return (
    <div style={mergedStyles.picker} className={`swatches-picker ${className}`}>
      <Raised>
        <div style={mergedStyles.overflow}>
          <div style={mergedStyles.body}>
            {colors.map((colorGroup) => (
              <SwatchGroup
                key={colorGroup.toString()}
                group={colorGroup}
                active={hex}
                onClick={handleColorChange}
                onSwatchHover={onSwatchHover}
              />
            ))}
            <div style={mergedStyles.clear} />
          </div>
        </div>
      </Raised>
    </div>
  );
};

export default ColorWrap(Swatches);