import React from 'react';

interface SwatchesStyles {
  swatches: React.CSSProperties;
  swatch: React.CSSProperties;
  clear: React.CSSProperties;
}

interface BlockSwatchesProps {
  colors: string[];
  onClick?: (color: string, event: React.MouseEvent) => void;
  onSwatchHover?: (color: string, event: React.MouseEvent) => void;
}

interface SwatchProps {
  color: string;
  style?: React.CSSProperties;
  onClick?: (color: string, event: React.MouseEvent) => void;
  onHover?: (color: string, event: React.MouseEvent) => void;
  focusStyle?: React.CSSProperties;
}

const Swatch: React.FC<SwatchProps> = ({ color, style, onClick, onHover, focusStyle }) => {
  const handleClick = (event: React.MouseEvent) => {
    onClick?.(color, event);
  };

  const handleMouseEnter = (event: React.MouseEvent) => {
    onHover?.(color, event);
  };

  return (
    <div
      style={{ ...style, ...focusStyle }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    />
  );
};

const SWATCH_WIDTH = '22px';
const SWATCH_HEIGHT = '22px';
const SWATCH_MARGIN_RIGHT = '10px';
const SWATCH_MARGIN_BOTTOM = '10px';
const SWATCH_BORDER_RADIUS = '4px';

export const BlockSwatches: React.FC<BlockSwatchesProps> = ({
  colors,
  onClick,
  onSwatchHover
}) => {
  const styles: SwatchesStyles = {
    swatches: {
      marginRight: '-10px'
    },
    swatch: {
      width: SWATCH_WIDTH,
      height: SWATCH_HEIGHT,
      float: 'left',
      marginRight: SWATCH_MARGIN_RIGHT,
      marginBottom: SWATCH_MARGIN_BOTTOM,
      borderRadius: SWATCH_BORDER_RADIUS
    },
    clear: {
      clear: 'both'
    }
  };

  return (
    <div style={styles.swatches}>
      {colors.map((color) => (
        <Swatch
          key={color}
          color={color}
          style={styles.swatch}
          onClick={onClick}
          onHover={onSwatchHover}
          focusStyle={{
            boxShadow: `0 0 4px ${color}`
          }}
        />
      ))}
      <div style={styles.clear} />
    </div>
  );
};

export default BlockSwatches;