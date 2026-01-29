import React from 'react';
import { handleHover, Styles } from 'reactcss';
import { Swatch } from './Swatch';

interface CircleSwatchProps {
  color: string;
  onClick?: (color: string, event: React.MouseEvent) => void;
  onSwatchHover?: (color: string, event: React.MouseEvent) => void;
  hover?: boolean;
  active?: boolean;
  circleSize?: number;
  circleSpacing?: number;
}

const CircleSwatch: React.FC<CircleSwatchProps> = ({
  color,
  onClick,
  onSwatchHover,
  hover = false,
  active = false,
  circleSize = 28,
  circleSpacing = 14
}) => {
  const styles = Styles({
    default: {
      swatch: {
        width: circleSize,
        height: circleSize,
        marginRight: circleSpacing,
        marginBottom: circleSpacing,
        transform: 'scale(1)',
        transition: '100ms transform ease'
      },
      Swatch: {
        borderRadius: '50%',
        background: 'transparent',
        boxShadow: `inset 0 0 0 ${circleSize / 2}px ${color}`,
        transition: '100ms box-shadow ease'
      }
    },
    hover: {
      swatch: {
        transform: 'scale(1.2)'
      }
    },
    active: {
      Swatch: {
        boxShadow: `inset 0 0 0 3px ${color}`
      }
    }
  }, {
    hover,
    active
  });

  return (
    <div style={styles.swatch}>
      <Swatch
        style={styles.Swatch}
        color={color}
        onClick={onClick}
        onHover={onSwatchHover}
        focusStyle={{
          boxShadow: `${styles.Swatch.boxShadow}, 0 0 5px ${color}`
        }}
      />
    </div>
  );
};

export default handleHover(CircleSwatch);
export { CircleSwatch };