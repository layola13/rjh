import React from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import map from 'lodash/map';
import reactCSS from 'reactcss';
import { ColorWrap, Raised } from '../common';
import CompactColor from './CompactColor';
import CompactFields from './CompactFields';

interface RGB {
  r: number;
  g: number;
  b: number;
  a?: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
  a?: number;
}

interface ColorResult {
  hex?: string;
  rgb?: RGB;
  hsl?: HSL;
  source?: string;
}

interface CompactStyles {
  Compact?: React.CSSProperties;
  compact?: React.CSSProperties;
  clear?: React.CSSProperties;
}

interface CompactProps {
  onChange: (color: ColorResult, event: React.SyntheticEvent) => void;
  onSwatchHover?: (color: ColorResult, event: React.MouseEvent) => void;
  colors?: string[];
  hex: string;
  rgb: RGB;
  styles?: CompactStyles;
  className?: string;
}

const Compact: React.FC<CompactProps> & {
  propTypes?: any;
  defaultProps?: Partial<CompactProps>;
} = (props) => {
  const {
    onChange,
    onSwatchHover,
    colors = [],
    hex,
    rgb,
    styles = {},
    className = ''
  } = props;

  const mergedStyles = reactCSS(
    merge(
      {
        default: {
          Compact: {
            background: '#f6f6f6',
            radius: '4px'
          },
          compact: {
            paddingTop: '5px',
            paddingLeft: '5px',
            boxSizing: 'initial' as const,
            width: '240px'
          },
          clear: {
            clear: 'both' as const
          }
        }
      },
      styles
    )
  );

  const handleChange = (color: ColorResult, event: React.SyntheticEvent): void => {
    if (color.hex) {
      if (isValidHex(color.hex)) {
        onChange(
          {
            hex: color.hex,
            source: 'hex'
          },
          event
        );
      }
    } else {
      onChange(color, event);
    }
  };

  const isValidHex = (hexValue: string): boolean => {
    const lh = String(hexValue).charAt(0) === '#' ? 1 : 0;
    return (
      hexValue.length !== 4 + lh &&
      hexValue.length < 7 + lh &&
      hexValue.length > 4 + lh
    ) === false;
  };

  return (
    <Raised style={mergedStyles.Compact} styles={styles}>
      <div style={mergedStyles.compact} className={`compact-picker ${className}`}>
        <div>
          {map(colors, (color) => (
            <CompactColor
              key={color}
              color={color}
              active={color.toLowerCase() === hex}
              onClick={handleChange}
              onSwatchHover={onSwatchHover}
            />
          ))}
          <div style={mergedStyles.clear} />
        </div>
        <CompactFields hex={hex} rgb={rgb} onChange={handleChange} />
      </div>
    </Raised>
  );
};

Compact.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  styles: PropTypes.object
};

Compact.defaultProps = {
  colors: [
    '#4D4D4D',
    '#999999',
    '#FFFFFF',
    '#F44E3B',
    '#FE9200',
    '#FCDC00',
    '#DBDF00',
    '#A4DD00',
    '#68CCCA',
    '#73D8FF',
    '#AEA1FF',
    '#FDA1FF',
    '#333333',
    '#808080',
    '#cccccc',
    '#D33115',
    '#E27300',
    '#FCC400',
    '#B0BC00',
    '#68BC00',
    '#16A5A5',
    '#009CE0',
    '#7B64FF',
    '#FA28FF',
    '#000000',
    '#666666',
    '#B3B3B3',
    '#9F0500',
    '#C45100',
    '#FB9E00',
    '#808900',
    '#194D33',
    '#0C797D',
    '#0062B1',
    '#653294',
    '#AB149E'
  ],
  styles: {}
};

export { Compact };
export default ColorWrap(Compact);