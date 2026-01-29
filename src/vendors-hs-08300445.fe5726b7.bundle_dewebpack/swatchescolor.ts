import React from 'react';
import { Swatch } from './Swatch';
import CheckIcon from './CheckIcon';

interface ColorUtils {
  getContrastingColor(color: string): string;
}

declare const colorUtils: ColorUtils;

interface StyleObject {
  [key: string]: React.CSSProperties | StyleObject;
}

interface ReactCSSOptions {
  first?: boolean;
  last?: boolean;
  active?: boolean;
  'color-#FFFFFF'?: boolean;
  transparent?: boolean;
}

declare function reactCSS(styles: StyleObject, options: ReactCSSOptions): {
  [key: string]: React.CSSProperties;
};

interface SwatchesColorProps {
  color: string;
  onClick?: (color: string) => void;
  onSwatchHover?: (color: string) => void;
  first?: boolean;
  last?: boolean;
  active?: boolean;
}

export const SwatchesColor: React.FC<SwatchesColorProps> = ({
  color,
  onClick = () => {},
  onSwatchHover,
  first,
  last,
  active
}) => {
  const styles = reactCSS(
    {
      default: {
        color: {
          width: '40px',
          height: '24px',
          cursor: 'pointer',
          background: color,
          marginBottom: '1px'
        },
        check: {
          color: colorUtils.getContrastingColor(color),
          marginLeft: '8px',
          display: 'none'
        }
      },
      first: {
        color: {
          overflow: 'hidden',
          borderRadius: '2px 2px 0 0'
        }
      },
      last: {
        color: {
          overflow: 'hidden',
          borderRadius: '0 0 2px 2px'
        }
      },
      active: {
        check: {
          display: 'block'
        }
      },
      'color-#FFFFFF': {
        color: {
          boxShadow: 'inset 0 0 0 1px #ddd'
        },
        check: {
          color: '#333'
        }
      },
      transparent: {
        check: {
          color: '#333'
        }
      }
    },
    {
      first,
      last,
      active,
      'color-#FFFFFF': color === '#FFFFFF',
      transparent: color === 'transparent'
    }
  );

  return (
    <Swatch
      color={color}
      style={styles.color}
      onClick={onClick}
      onHover={onSwatchHover}
      focusStyle={{
        boxShadow: `0 0 4px ${color}`
      }}
    >
      <div style={styles.check}>
        <CheckIcon />
      </div>
    </Swatch>
  );
};

export default SwatchesColor;