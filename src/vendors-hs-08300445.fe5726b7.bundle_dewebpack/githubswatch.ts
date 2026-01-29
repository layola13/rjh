import React from 'react';
import { Swatch } from './Swatch';

interface GithubSwatchProps {
  hover?: boolean;
  color: string;
  onClick?: (color: string, event: React.MouseEvent) => void;
  onSwatchHover?: (color: string, event: React.MouseEvent) => void;
}

const FOCUS_STYLE: React.CSSProperties = {
  position: 'relative',
  zIndex: 2,
  outline: '2px solid #fff',
  boxShadow: '0 0 5px 2px rgba(0, 0, 0, 0.25)'
};

export const GithubSwatch: React.FC<GithubSwatchProps> = ({
  hover = false,
  color,
  onClick,
  onSwatchHover
}) => {
  const swatchStyle: React.CSSProperties = {
    width: '25px',
    height: '25px',
    fontSize: '0',
    ...(hover ? FOCUS_STYLE : {})
  };

  return (
    <div style={swatchStyle}>
      <Swatch
        color={color}
        onClick={onClick}
        onHover={onSwatchHover}
        focusStyle={FOCUS_STYLE}
      />
    </div>
  );
};

export default GithubSwatch;